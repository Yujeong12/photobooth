import { useEffect, useRef, useState } from "react";

function waitForVideoReady(video: HTMLVideoElement) {
  return new Promise<void>((resolve) => {
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      resolve();
      return;
    }

    video.onloadedmetadata = () => {
      resolve();
    };
  });
}

export function useWebcam() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;

    const start = async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720,
          facingMode: "user",
        },
        audio: false,
      });

      const video = document.createElement("video");
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;
      video.muted = true;

      await video.play();
      await waitForVideoReady(video);

      if (cancelled) return;

      videoRef.current = video;
      setIsReady(true);
    };

    start();

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((track) => track.stop());
      videoRef.current = null;
    };
  }, []);

  return { videoRef, isReady };
}
