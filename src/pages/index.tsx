import Image from "next/image";
import { Inter } from "next/font/google";
import Webcam from "react-webcam";
import { useState, useRef, useCallback } from "react";
import {
  IconCamera,
  IconCameraOff,
  IconCameraRotate,
} from "@tabler/icons-react";

const inter = Inter({ subsets: ["latin"] });

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

export default function Home() {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<any>(null);
  const [facingMode, setFacingMode] = useState<string>(FACING_MODE_USER);
  const fileInputRef = useRef<HTMLInputElement>(null);

  let videoConstraints: MediaTrackConstraints = {
    facingMode: facingMode,
    width: 500,
    height: 480,
  };

  const onCapture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const toggleCamera = useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  // upload image
  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImgSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImgSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
          onClick={() => {
            if (imgSrc !== null) {
              setImgSrc(null);
            }
            setIsCameraActive(!isCameraActive);
          }}
        >
          {isCameraActive ? (
            <IconCameraOff
              stroke={2}
              size={38}
              className="hover:text-gray-600"
            />
          ) : (
            <IconCamera stroke={2} size={38} className="hover:text-gray-600" />
          )}
        </button>
        <button className="p-2" onClick={toggleCamera}>
          <IconCameraRotate
            stroke={2}
            size={38}
            className="hover:text-gray-600"
          />
        </button>
      </div>

      {/* display image */}
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

        {isCameraActive && (
          <button
            className="p-3 my-3 border-2 border-gray-400 hover:bg-slate-400"
            onClick={imgSrc ? () => setImgSrc(null) : onCapture}
          >
            {imgSrc ? "Retake photo" : "Capture photo"}
          </button>
        )}
      </div>
      {/* upload image */}
      <div className="min-w-[350px] flex flex-col gap-3 border-2 border-dashed border-gray-400 rounded text-center  p-8">
        <button
          onClick={handleButtonClick}
          className="text-blue-600 hover:text-blue-800"
        >
          Choose a File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleChange}
        />
        <p>OR</p>
        <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          Drag and drop your image here
        </div>
      </div>
    </main>
  );
}
