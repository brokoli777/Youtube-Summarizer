'use server'

import { YoutubeTranscript } from 'youtube-transcript';

const { GoogleGenerativeAI } = require("@google/generative-ai");

interface Sentence {
    text: string;
  }

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Please summarize the content of this YouTube video in bullet points. Show it as regular text, DON'T USE MARKDOWN BULLET POINTS. Focus on the key points, main ideas, and any important details or action items mentioned. Ensure the summary is easy to read and highlights the most important aspects of the video.:\n\n";

export async function processVideo (youtubeURL:string): Promise<string> {
  try {
    console.log("Processing Video: ", youtubeURL);

    const doc:Sentence[] = await YoutubeTranscript.fetchTranscript(youtubeURL);
    const combinedText:string = doc.map((sentence:Sentence) => sentence.text).join(" ");
    
    const result = await model.generateContent(prompt + combinedText);
    console.log(result.response.text());

    return result.response.text()

  } catch (error) {
    console.error('Error processing video:', error);
    return "Error Summarizing Video. The video might be too long or has transcription disabled."
  }
}






