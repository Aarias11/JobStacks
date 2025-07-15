import ParsedJob from '../models/ParsedJob.js'
import dotenv from 'dotenv';
dotenv.config();

import { JSDOM } from 'jsdom';
import axios from 'axios';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function parseJobDescriptionFromUrl(url) {
  if (!/^https?:\/\/\S+$/.test(url)) {
    throw new Error("Invalid URL format");
  }

  console.log(`🔍 Fetching HTML from: ${url}`);
  const { data: html } = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  const dom = new JSDOM(html);
  const text = dom.window.document.body.textContent.replace(/\s+/g, ' ').trim();
  const snippet = text.slice(0, 8000);

  const prompt = `
You're an AI that extracts structured data from job postings.

Return ONLY a valid JSON object with these fields:
- title
- company
- companyLogo
- location
- salary
- techStack (array)
- requirements (array)
- responsibilities (array)
- niceToHaves (string)
- description (string)
- tags (array)

No commentary. No explanations. Only valid JSON.

Job Posting:
---
${snippet}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2
  });

  const rawOutput = completion.choices[0].message.content.trim();

  // Attempt to extract JSON from potentially noisy output
  const jsonStart = rawOutput.indexOf('{');
  const jsonEnd = rawOutput.lastIndexOf('}');
  const jsonString = rawOutput.slice(jsonStart, jsonEnd + 1);

  try {
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("❌ Failed to parse GPT output:", rawOutput);
    throw new Error("OpenAI returned invalid JSON");
  }
}