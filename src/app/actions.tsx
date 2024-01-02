'use server'
 

import { HfInference } from "@huggingface/inference"

const hf = new HfInference('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')

import { YoutubeTranscript } from 'youtube-transcript';

interface Sentence {
    text: string;
    // Other properties if needed
  }

export async function processVideo (youtubeURL:string): Promise<string> {
    try {
    //   const doc:Sentence[] = await YoutubeTranscript.fetchTranscript(youtubeURL);
    //   const combinedText:string = doc.map((sentence:Sentence) => sentence.text).join(" ");

    //   const output = await hf.textGeneration({ //combinedText.substring(0,(combinedText.length)/2)
    //     model: 'openchat/openchat-3.5-1210',
    //     inputs: 
    //     `GPT4 Correct User: Hello
    //     <|end_of_turn|>
    //     GPT4 Correct Assistant: Hi
    //     <|end_of_turn|>
    //     GPT4 Correct User: Give a comprehensive overview using bullet points from this text:
    //     ${combinedText} 
    //     <|end_of_turn|>
    //     GPT4 Correct Assistant:`,
    //     parameters: { max_new_tokens: 500, return_full_text:false}
    //   })
    

    //   return output.generated_text
    return "abcd 123"
  
    } catch (error) {
      console.error('Error processing video:', error);
      return ""
    }
}






