"use server";

import { cookies } from "next/headers";
import { generateFeedback } from "./lib/openai";

type UploadResult = {
  status: "success" | "error" | "idle";
  message: string;
  data?: string;
};

export async function uploadPhoto(
  prevState: UploadResult,
  formData: FormData
): Promise<UploadResult> {
  const cookieStore = cookies();
  const raw = (await cookieStore).get("upload_count")?.value;
  const count = raw ? parseInt(raw) : 0;

  try {
    if (count >= 2) {
      return {
        status: "error",
        message: "Upload limit reached",
      };
    }

    const fields = Object.fromEntries(formData.entries());
    const file = fields.photo as File;

    console.log(fields)

    if (!file || typeof file === "string") {
      return {
        status: "error",
        message: "Invalid file upload",
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const feedback = await generateFeedback(dataUri);

    (await cookieStore).set("upload_count", String(count + 1), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
    });

    return {
      status: "success",
      message: "Feedback generated",
      data: feedback,
    };
  } catch (error: unknown) {
    console.error(error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return {
      status: "error",
      message,
    };
  }
}
