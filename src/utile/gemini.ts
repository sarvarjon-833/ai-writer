import { GoogleGenAI } from '@google/genai';

let gemini: GoogleGenAI | null = null;

export const GenerateArticle = async (title: string, description: string) => {
  if (!gemini) {
    gemini = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_KEY });
  }

  const result = await gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `
    Please create an article based on the following information. here is the list of information:
    \ntitle: ${title}
    \ndescription: ${description}
    Remember the post should be based on the information that I have mentioned above. Output should be Markdown text format strictly.`,
  });

  return result.text;
};

export default GenerateArticle;
