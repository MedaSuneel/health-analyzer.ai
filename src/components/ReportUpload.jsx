  import React, { useState } from 'react';
  import { analyzeWithGemini } from './geminiapi';
  import Tesseract from 'tesseract.js';
  import * as pdfjsLib from 'pdfjs-dist';
  import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url';

  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

  function ReportUpload({ setResponse, response }) {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [extractedText, setExtractedText] = useState('');
    const [userInputText, setUserInputText] = useState('');

    const extractTextFromImage = async (file) => {
      const result = await Tesseract.recognize(file, 'eng');
      return result.data.text;
    };

    const pdfToImages = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const imageBlobs = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      imageBlobs.push(blob);
    }

    return imageBlobs;
    };

    const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => item.str)
        .filter((str) => str && str.trim().length > 0)
        .join(' ');

      fullText += pageText + '\n';
    }

    // If no actual text extracted, use OCR fallback
    if (fullText.trim().length === 0) {
      console.warn('No selectable text found in PDF. Falling back to OCR.');

      const images = await pdfToImages(file);
      const ocrResults = await Promise.all(
        images.map((image) => Tesseract.recognize(image, 'eng'))
      );

      fullText = ocrResults.map(res => res.data.text).join('\n');
    }

    return fullText.trim();
    };


    const removeBulletPoints = (text) => {
      return text
        .split('\n')
        .map(line => line.replace(/^[-•➤▪●★*]+\s*/, ''))
        .join('\n');
    };

    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setLoading(true);
      setFileName(file.name);

      try {
        let text = '';
        if (file.type.startsWith('image/')) {
          text = await extractTextFromImage(file);
        } else if (file.type === 'application/pdf') {
          text = await extractTextFromPDF(file);
        } else {
          alert('Unsupported file type. Please upload a PDF or Image.');
          setLoading(false);
          return;
        }

        setExtractedText(text);
        setUserInputText(text); // populate editable textarea
      } catch (err) {
        console.error('Extraction failed:', err);
        alert('Failed to extract text.');
      }

      setLoading(false);
    };

    const handleAnalyze = async () => {
      if (!userInputText.trim()) {
        alert('Please upload a file and ensure the text is not empty.');
        return;
      }

      setLoading(true);
      
      try {
        const prompt = `
                You are a highly skilled AI medical assistant designed to analyze lab test reports.Do NOT use conversational phrases like “I think”, “Sure”, or “Let me help you”. Be direct and informative.
                  Avoid using symbols like -, *, •.

                Given the full text of a medical report, your task is to:
                1. Analyze each test category mentioned in the report.
                2. For each test:
                  - Explain briefly what it measures and why it's important.
                  - Extract the patient's value from the report.
                  - Compare with the medically accepted normal range.
                  - Determine whether the result is LOW, NORMAL, or HIGH.
                  - Suggest relevant advice, remedies, or actions to take if abnormal (e.g., increase iron intake for low hemoglobin, stay hydrated for high creatinine, etc.).

                3. After analyzing all categories, provide an overall health verdict with one of these: **Normal**, **Slightly Abnormal**, **Serious**, or **Emergency**.

                ### Output Format:
                📄 **Overall Verdict**:
                <One-line summary of overall health condition>

                🩺 **Detailed Report Analysis**:
                For each test category in the report, follow this format:

                **<Test Name>**  
                🧪 What it is: <Brief explanation of the test>  
                📊 Patient Value: <Extracted value from the report>  
                ✅ Normal Range: <Mention the typical range>  
                📌 Verdict: <Low / Normal / High>  
                💡 Advice: <Suggestions, lifestyle changes, diet, or medications if needed>

                ---

                📄 Report to analyze:
                ${userInputText}
                `;


        const geminiResponse = await analyzeWithGemini(prompt);

        // Split using the new structure of your Gemini prompt
        const [verdictPart, detailedPart] = geminiResponse.split('🩺 **Detailed Report Analysis**:');

        // Extract the overall verdict text
        const overallVerdict = verdictPart
        ?.replace('📄 **Overall Verdict**:', '')
        ?.trim() || 'Not available';

        // Extract and clean the detailed analysis
        const detailedAnalysis = removeBulletPoints(detailedPart?.trim() || 'No details available');

        // Set the response to state
        setResponse({
        type: 'report',
        verdict: overallVerdict,
        detailed: detailedAnalysis,
        });

      } catch (err) {
        console.error('Analysis failed:', err);
        alert('Failed to analyze report.');
      }

      setLoading(false);
    };

    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Report Analyzer
        </h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Upload Medical Report (PDF/Image):
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileUpload}
          className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
        />

        {fileName && (
          <p className="text-sm mt-2 text-gray-600">Uploaded: {fileName}</p>
        )}

        {loading && (
          <p className="mt-4 text-blue-600 text-sm font-semibold">Processing...</p>
        )}

        <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full"
            >
              {loading ? 'Analyzing...' : 'Analyze Report'}
          </button>

        {extractedText && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Extracted Text (Editable):
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg text-sm h-60 resize-y"
              value={userInputText}
              onChange={(e) => setUserInputText(e.target.value)}
            />
            
          </div>
        )}

        {response?.type === 'report' && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <h3 className="font-semibold text-green-800">📄 Verdict:</h3>
            <p className="mb-2 text-gray-800 whitespace-pre-line">{response.verdict}</p>
            <h4 className="font-semibold text-green-800">💊 Details:</h4>
            <p className="text-gray-800 whitespace-pre-line">{response.detailed}</p>
          </div>
        )}
      </div>
    </div>
    );
  }

  export default ReportUpload;
