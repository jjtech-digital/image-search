import Image from "next/image";
import { Inter } from "next/font/google";
import Webcam from "react-webcam";
import { useState, useRef, useCallback } from "react";
import { IconCamera, IconCameraOff } from "@tabler/icons-react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const webcamRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<any>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current.getScreenshot();
    console.log("image", imageSrc);
    setImgSrc(imageSrc);
  }, [webcamRef]);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start gap-6 p-20 ${inter.className}`}
    >
      <div className="flex">
        <input
          type="search"
          placeholder="search"
          className="p-3 outline-none"
        />
        <button
          className="p-2 "
          onClick={() => setIsCameraActive(!isCameraActive)}
        >
          {isCameraActive ? (
            <IconCameraOff stroke={2} size={38} />
          ) : (
            <IconCamera stroke={2} size={38} />
          )}
        </button>
      </div>

      <div>
        {imgSrc && <img src={imgSrc} alt="webcam" />}
        {isCameraActive && !imgSrc && (
          <Webcam height={500} width={500} ref={webcamRef} />
        )}
        <div className="p-4">
          {imgSrc ? (
            <button
              className="p-3 border-2 border-gray-400 hover:bg-slate-400"
              onClick={() => setImgSrc(null)}
            >
              Retake photo
            </button>
          ) : (
            <button
              className="p-3 border-2 border-gray-400 hover:bg-slate-400"
              onClick={capture}
            >
              Capture photo
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
