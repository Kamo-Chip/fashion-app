"use server";

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateFeedback(base64Image: string) {
  const SYSTEM_PROMPT =
    "You are a fashion expert who gives snarky but constructive feedback on outfits. Your advice should be helpful but entertaining. Keep it concise, no more than 20 words. Your response will be converted to speech, so avoid emojis, markdown, or any formatting that could confuse a speech synthesis model.";

  try {
    if (!base64Image) throw new Error("Image path required");

    console.log("Generating feedback...");
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Judge this outfit and give constructive feedback",
            },
            {
              type: "input_image",
              image_url: `${base64Image}`,
              detail: "auto",
            },
          ],
        },
      ],
    });

    console.log("Successfully generated feedback");
    return response.output_text;
  } catch (error: unknown) {
    console.error("Failed to generated feedback: ", error);
  }
}
