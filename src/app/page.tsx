import ImageUploadForm from "@/components/forms/image-upload-form";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f1f1f1] px-4">
      <h1 className="font-bold text-center mb-6 text-gray-800 text-2xl lg:text-4xl">
        Get Feedback On Your Fit
      </h1>
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 relative border border-gray-200 z-[2]">
        <ImageUploadForm />
      </div>
      <Image
        src="/assets/wave-bg.svg"
        className="fixed z-[1] bottom-0 2xl:bottom-[-5rem] w-full"
        width={100}
        height={100}
        alt="wave"
      />
    </main>
  );
}
