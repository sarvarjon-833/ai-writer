import { GoogleGenAI } from '@google/genai';

type GeneralResult = string;

let gemini: GoogleGenAI | null = null;

export const GenerateArticle = async (title: string, description: string) => {
  if (!import.meta.env.VITE_GEMINI_KEY) {
    return new Promise<GeneralResult>((resolve) => {
      setTimeout(() => {
        resolve(`
                  An h1 header
        ============

        Paragraphs are separated by a blank line.

        2nd paragraph. *Italic*, **bold**, and monospace. Itemized lists
        look like:

          * this one
          * that one
          * the other one

        Note that --- not considering the asterisk --- the actual text
        content starts at 4-columns in.

        > Block quotes are
        > written like so.
        >
        > They can span multiple paragraphs,
        > if you like.

        Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
        in chapters 12--14"). Three dots ... will be converted to an ellipsis.
        Unicode is supported. ☺



        An h2 header
        ------------

        Here's a numbered list:

        1. first item
        2. second item
        3. third item

        Note again how the actual text starts at 4 columns in (4 characters
        from the left side). Here's a code sample:

          `);
      }, 2000);
    });
  }

  if (!gemini) {
    gemini = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_KEY });
  }

  const result = await gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `
    Please create an article based on the following information. here is the list of information:
    \ntitle: ${title}
    \ndescription: ${description}
    Remember the post should be based on the information that I have mentioned above. Output should be Markdown text format strictly.Clean markdown without ''' formatting.`,
  });

  return result.text ?? null;
};

export default GenerateArticle;
