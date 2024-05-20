import Image from "next/image";
import { Inter } from "next/font/google";
import Webcam from "react-webcam";
import { useState, useRef, useCallback } from "react";
import { IconCamera, IconCameraOff } from "@tabler/icons-react";

const inter = Inter({ subsets: ["latin"] });

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

export default function Home() {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<any>(null);
  const [facingMode, setFacingMode] = useState<string>(FACING_MODE_USER);

  const onCapture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  let videoConstraints: MediaTrackConstraints = {
    facingMode: facingMode,
    width: 500,
    height: 480,
  };

  const toggleCamera = useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start gap-6 p-[1.5rem] md:p-20 ${inter.className}`}
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
        {imgSrc && <Image src={imgSrc} width={500} height={500} alt="webcam" />}
        {isCameraActive && !imgSrc && (
          <Webcam
            height={500}
            width={500}
            ref={webcamRef}
            mirrored
            videoConstraints={videoConstraints}
          />
        )}
        <div className="my-3 flex gap-3">
          <button
            className="p-3 border-2 border-gray-400 hover:bg-slate-400"
            onClick={imgSrc ? () => setImgSrc(null) : onCapture}
          >
            {imgSrc ? "Retake photo" : "Capture photo"}
          </button>
          <button
            className="p-3 border-2 border-gray-400 hover:bg-slate-400"
            onClick={toggleCamera}
          >
            Switch camera
          </button>
        </div>
      </div>
    </main>
  );
}
