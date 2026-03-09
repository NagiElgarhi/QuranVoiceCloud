import { GoogleGenAI } from "@google/genai";
import fs from "fs";

async function generate() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  console.log("Generating image...");
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: 'A majestic and spiritual scene featuring an open Quran resting on a beautifully carved wooden stand (Rehal) over a calm, reflective body of water. In the background, there are distant mountains. Above the Quran, a large, fluffy white cloud floats in a starry night sky with a crescent moon. A glowing blue audio waveform (equalizer) emanates from the Quran, symbolizing recitation. The text "Quran Voice Cloud" is elegantly written in the sky, with "Quran" in gold and "Voice Cloud" in white. The overall atmosphere is serene, divine, and ethereal.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "9:16",
        imageSize: "1K"
      }
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64EncodeString = part.inlineData.data;
      fs.writeFileSync('public/landing-bg.png', Buffer.from(base64EncodeString, 'base64'));
      console.log('Image saved to public/landing-bg.png');
      return;
    }
  }
}

generate().catch(console.error);
