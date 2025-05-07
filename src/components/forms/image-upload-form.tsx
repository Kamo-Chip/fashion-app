"use client";

import { uploadPhoto } from "@/actions";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import YtBadge from "../yt-badge";

function ImageUploadForm() {
  const [state, action, isPending] = useActionState(uploadPhoto, {
    status: "idle",
    message: "",
    data: "",
  });
  const [feedback, setFeedback] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (state.status === "idle") return;

    if (!state.data) {
      toast.error(state.message);
    } else {
      toast(state.message);
      setFeedback(state.data);
    }
  }, [state]);

  return (
    <form action={action}>
      {/* Image Preview or Upload Prompt */}
      <div className="border border-dashed border-gray-300 rounded-xl aspect-video flex items-center justify-center overflow-hidden">
        <a
          href="https://youtube.com/@kamoio"
          target="_blank"
          className="absolute top-4 right-4 z-50"
        >
          <YtBadge />
        </a>
         
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="preview"
            className="w-[1000px] h-full object-cover"
            width={100}
            height={100}
          />
        ) : (
          <label
            htmlFor="photo"
            className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
          >
            Click to upload an image
          </label>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        name="photo"
        id="photo"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
          }
        }}
      />

      {previewUrl && (
        <div className="grid grid-cols-1 gap-4 mt-4">
          <Button
            type="submit"
            disabled={isPending || !previewUrl}
            className="w-full"
          >
            {isPending ? "Generating feedback..." : "Upload"}
          </Button>
          <Button
            disabled={isPending}
            variant={"secondary"}
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              setPreviewUrl("");
              setFeedback("");
            }}
          >
            Clear
          </Button>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 whitespace-pre-line">
          {feedback}
        </div>
      )}
    </form>
  );
}

export default ImageUploadForm;
