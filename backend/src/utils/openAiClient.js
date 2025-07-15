// utils/openAiClient.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;

// Helper function to parse job descriptions into structured JSON
export async function parseJobDescription(jobText) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that extracts structured job application data from raw text.`,
        },
        {
          role: "user",
          content: `Parse the following job description and return a JSON with:
{
 {
  "title": "",
  "company": "",
  "companyLogo": "", // leave empty, will be filled by Clearbit
  "location": "",
  "sourceUrl": "", // include if known
  "salary": "",
  "techStack": [],
  "requirements": [],
  "responsibilities": [],
  "niceToHaves": "",
  "resumeUsedUrl": "",
  "notes": "",
  "tags": []
 }
}

Job description:
${jobText}
          `,
        },
      ],
    });

    const parsed = response.choices[0]?.message?.content;
    return JSON.parse(parsed);
  } catch (err) {
    console.error("Error parsing job description:", err.message);
    throw err;
  }
}
