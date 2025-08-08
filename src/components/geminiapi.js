import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyAdCLNnqbSCoejjV47fzApybkUHJ7Aj32g'; // Replace securely
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const analyzeWithGemini = async (prompt) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const result = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return result || 'No meaningful response.';
  } catch (error) {
    console.error('❌ Gemini API Error:', error.response?.data || error.message);
    return '❌ Gemini API call failed.';
  }
};
