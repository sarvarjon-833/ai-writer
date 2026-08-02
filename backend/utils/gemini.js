// import { GoogleGenAI } from "@google/genai";
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_KEY });

const geminiAnswerFunction = async (title, description) => {
  const userInput = `
    Please create an article based on the following information. here is the list of information:
    Detect the language of the user's input (title and description).
    If the input is written in Uzbek, respond in Uzbek.
    If the input is written in English, respond in English.
    Do NOT change the language.
    Do NOT translate unless necessary.
    Keep the response fully in the same language as the user's input.
    \ntitle: ${title}
    \ndescription: ${description}
    Remember the post should be based on the information that I have mentioned above. Output should be Markdown text format 
    strictly.Clean markdown without ''' formatting.`;

  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: userInput,
  });

  return interaction.output_text;
  // console.log(interaction.output_text);
};

module.exports = geminiAnswerFunction;
