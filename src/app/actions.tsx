'use server'

import { Innertube } from 'youtubei.js/web';

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Please summarize the following YouTube video transcript. Use spaces when needed to make it more readable. DON'T USE MARKDOWN\n\n";

const getTranscript = async ( url: string): Promise<(string | undefined)[] | undefined> => {
  const youtube = await Innertube.create({
    lang: "en",
    location: "US",
    retrieve_player: false,
  });

  try {
    const info = await youtube.getInfo(url);
    const transcriptData = await info.getTranscript();
    return transcriptData?.transcript?.content?.body?.initial_segments.map(
      (segment) => segment.snippet.text
    );
  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw error;
  }
};

async function getCombinedYoutubeTranscript(videoUrl: string) {
  const videoId = new URL(videoUrl).searchParams.get("v") as string;
  const transcript = await getTranscript(videoId);
  return transcript?.join(" ");
}

export async function processVideo(youtubeURL: string): Promise<string> {
  try {
    console.log("Processing Video: ", youtubeURL);

    const doc = await getCombinedYoutubeTranscript(youtubeURL);

    const result = await model.generateContent(prompt + doc);
    console.log(result.response.text());

    return result.response.text()

  } catch (error) {
    console.error('Error processing video:', error);
    return "Error Summarizing Video. The video might be too long or has transcription disabled."
  }
}






