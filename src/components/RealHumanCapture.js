"use client"; // Ensure this is a client-side component

import { useEffect, useRef, useState } from "react";

const RealHumanCapture = () => {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        // Request access to the camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        // Set the video element's source to the camera stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraOn(true);
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
        setErrorMessage("Unable to access camera. Please check permissions.");
      }
    };

    startCamera();

    // Cleanup function to stop the camera stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop()); // Stop all the camera tracks
      }
    };
  }, []);

  return (
    <div>
      <h1>Capture Human Photo</h1>
      <h2>Real-Time Camera Preview</h2>
      {isCameraOn ? (
        <video ref={videoRef} width="640" height="480" autoPlay playsInline></video>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};

export default RealHumanCapture;
