import React, {useState} from 'react'
import { analyzeWithGemini } from './geminiapi';

function SymptomForm({setResponse, response}) {
    const[symptoms, setSymptoms] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true);

    const prompt = `You are a strict and professional medical assistant AI. Based on the user's symptoms, return the top possible diagnoses along with severity percentage estimates. Also provide three types of advice:

                  💊 Medical Advice: Standard treatment or preventive measures.
                  🌿 Indian Traditional Remedies: Ayurvedic or natural methods common in Indian households.
                  💡 General Advice: Lifestyle and health tips.

                  ⚠️ Follow this exact output format:

                  🩺 Possible Diagnoses (with estimated severity %):
                  <Diagnosis 1>: <short description> — Severity: <percentage>%
                  <Diagnosis 2>: <short description> — Severity: <percentage>%
                  <Diagnosis 3>: <short description> — Severity: <percentage>%

                  💊 Medical Advice:
                  - Advice 1
                  - Advice 2
                  - Advice 3

                  🌿 Indian Traditional Remedies:
                  - Remedy 1
                  - Remedy 2
                  - Remedy 3

                  💡 General Advice:
                  - Advice 1
                  - Advice 2

                  Do NOT use conversational phrases like “I think”, “Sure”, or “Let me help you”. Be direct and informative.
                  Avoid using symbols like -, *, •. Return plain text in separate lines.

                  Symptoms: ${symptoms}`;


        
    const geminiResponse = await analyzeWithGemini(prompt);

    // Parse the response if needed
    const [diagnosisSection, rest1] = geminiResponse.split('💊 Medical Advice:');
    const [medicalAdviceSection, rest2] = rest1.split('🌿 Indian Traditional Remedies:');
    const [traditionalRemediesSection, generalAdviceSection] = rest2.split('💡 General Advice:');

    setResponse({
    type: "symptoms",
    diagnosis: diagnosisSection?.replace('🩺 Possible Diagnoses (with estimated severity %):', '').trim() || "Unknown",
    medicalAdvice: medicalAdviceSection?.trim() || "No medical advice available.",
    traditionalRemedies: traditionalRemediesSection?.trim() || "No traditional remedies available.",
    generalAdvice: generalAdviceSection?.trim() || "No general advice available.",
    });

    setLoading(false);
  };


    return (
      <div className='bg-gray-50 min-h-screen flex items-center justify-center'>
        {/* Left Section – Image (30%)
        <div className="hidden md:flex w-[30%] items-center justify-center p-6">
          <div>
            <img src="/Symptom-image.jpg" alt="Symptom Illustration" className="w-full h-auto rounded-xl lg:m-12" />
          </div>
        </div> */}
        
        {/* Right Section – Symptom Analyzer Form (70%) */}
        <div className=" w-full flex items-center justify-center bg-gray-50 p-8">
          <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
              Symptom Analyzer
            </h2>
           
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
            >
          
              <label htmlFor="symptoms" className="block mb-2 text-sm font-medium text-gray-700">
                Describe your symptoms:
              </label>
              <textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="E.g., fever, headache, sore throat..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 active:scale-95 transition-transform duration-200"
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Analyze Symptoms"}
              </button>
            </form>

      
            {response?.type === 'symptoms' && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-4">
                
                <div>
                  <h3 className="font-semibold text-blue-800">🩺 Diagnosis:</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {response.diagnosis.split('\n').map((line, index) => {
                      const cleaned = line.replace(/\*\*/g, '').replace(/^[-•]\s*/, '').trim();
                      return cleaned && <li key={index}>{cleaned}</li>;
                    })}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-800">💊 Medical Advice:</h4>
                  <ul className="list-disc list-inside text-gray-800">
                    {response.medicalAdvice.split('\n').map((line, index) => {
                      const cleaned = line.replace(/\*\*/g, '').replace(/^[-•]\s*/, '').trim();
                      return cleaned && <li key={index}>{cleaned}</li>;
                    })}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-800">🌿 Indian Traditional Remedies:</h4>
                  <ul className="list-disc list-inside text-gray-800">
                    {response.traditionalRemedies.split('\n').map((line, index) => {
                      const cleaned = line.replace(/\*\*/g, '').replace(/^[-•]\s*/, '').trim();
                      return cleaned && <li key={index}>{cleaned}</li>;
                    })}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-800">💡 General Advice:</h4>
                  <ul className="list-disc list-inside text-gray-800">
                    {response.generalAdvice.split('\n').map((line, index) => {
                      const cleaned = line.replace(/\*\*/g, '').replace(/^[-•]\s*/, '').trim();
                      return cleaned && <li key={index}>{cleaned}</li>;
                    })}
                  </ul>
                </div>
              </div>
            )}

        </div>
      </div>
    </div>
    )
}

export default SymptomForm