"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { STICKERS } from "@/constants/stickers";
import type { StickerItem } from "@/constants/stickers";
import CameraFrame from "@/components/camera/CameraFrame";
import StickerPanel from "@/components/editor/StickerPanel";
import EditorControls from "@/components/editor/EditorControls";
import { BACKGROUNDS } from "@/constants/background";
import { LOGO } from "@/constants/callmecam";

type PlacedSticker = {
  id: string;
  sticker: StickerItem;
  x: number;
  y: number;
  type: "sticker" | "date";
};

export default function PhotoEditor() {
  const router = useRouter();

  const exportRef = useRef<HTMLDivElement>(null);
  const photoAreaRef = useRef<HTMLDivElement>(null);

  const [image, setImage] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState("star");
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);

  const selectedSticker = STICKERS.find((s) => s.id === selectedStickerId);

  useEffect(() => {
    const savedImage = localStorage.getItem("editingImage");
    setImage(savedImage);
  }, []);

  const handleUndo = () => {
    setPlacedStickers((prev) => prev.slice(0, -1));
  };

  const handlePhotoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedSticker) return;

    if (selectedSticker.type === "undo") return;

    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (selectedSticker.type === "date") {
      setPlacedStickers((prev) => {
        const withoutDate = prev.filter((item) => item.type !== "date");

        return [
          ...withoutDate,
          {
            id: crypto.randomUUID(),
            sticker: selectedSticker,
            x: 0,
            y: 0,
            type: "date",
          },
        ];
      });

      return;
    }

    if (!selectedSticker.image) return;

    setPlacedStickers((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sticker: selectedSticker,
        x,
        y,
        type: "sticker",
      },
    ]);
  };

  const handleBack = () => {
    router.back();
  };

  const handleAddDate = () => {
    const dateSticker = STICKERS.find((s) => s.type === "date");
    if (!dateSticker) return;

    setPlacedStickers((prev) => {
      const withoutDate = prev.filter((item) => item.type !== "date");

      return [
        ...withoutDate,
        {
          id: crypto.randomUUID(),
          sticker: dateSticker,
          x: 85,
          y: 92,
          type: "date",
        },
      ];
    });
  };

  const downloadImage = (image: string) => {
    const link = document.createElement("a");
    link.href = image;

    // 📅 날짜 만들기
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(now.getDate()).padStart(2, "0")}`;

    // 🔤 필터명 정리 (공백 제거 + 소문자)
    link.download = `☆${date}_#meangirls☆.png`;

    link.click();
  };

  const handleDownload = async () => {
    if (!photoAreaRef.current || !image) return;

    const html2canvas = (await import("html2canvas")).default;

    const canvas = await html2canvas(photoAreaRef.current, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
    });

    const dataUrl = canvas.toDataURL("image/png");

    downloadImage(dataUrl); // 🔥 여기로 통일
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${BACKGROUNDS.MAIN})`,
      }}
    >
      {/* 모바일 전용 로고 */}
      <img
        src={LOGO.imageSrc}
        alt="logo"
        className="
                    absolute top-[8%] left-1/2 -translate-x-1/2
                    w-[70vw]
                    max-w-[220px]
                    z-30
                    md:hidden
                    opacity-90
                "
      />
      <div className="relative z-20 flex min-h-screen w-full items-center justify-center gap-10 p-4 max-md:flex-col">
        <div className="-translate-y-[2vh] -translate-x-[17vw] max-md:-translate-x-[2vw]">
          <CameraFrame
            hideControls
            frameClassName="w-[min(80vw,1000px)] max-md:w-[min(95vw,560px)]"
          >
            <div
              ref={photoAreaRef}
              onClick={handlePhotoClick}
              className="absolute inset-0 h-full w-full cursor-crosshair overflow-hidden bg-white"
            >
              {image && (
                <img
                  src={image}
                  alt="editing photo"
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
              )}

              {placedStickers.map((item) => {
                if (item.type === "date") {
                  const now = new Date();
                  const dateText = `${now.getFullYear()}.${String(
                    now.getMonth() + 1,
                  ).padStart(2, "0")}.${String(now.getDate()).padStart(
                    2,
                    "0",
                  )}`;

                  return (
                    <div
                      className="
                    absolute z-30 
                    select-none
                    text-[clamp(8px,0.9vw,12px)]
                    text-yellow-400
                    tracking-wider
                    drop-shadow-[0_2px_3px_rgba(0,0,0,1),0_0_6px_rgba(0,0,0,0.9)]
                  "
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        letterSpacing: "0.5px",
                        right: "13%",
                        bottom: "3%",
                      }}
                    >
                      {dateText}
                    </div>
                  );
                }

                return (
                  <img
                    key={item.id}
                    src={item.sticker.image}
                    className="absolute z-30 -translate-x-1/2 -translate-y-1/2 select-none"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      width: `${item.sticker.size ?? 12}%`,
                    }}
                    draggable={false}
                  />
                );
              })}
            </div>
          </CameraFrame>
        </div>

        <div className="flex flex-col items-center">
          <StickerPanel
            selectedStickerId={selectedStickerId}
            onSelectSticker={setSelectedStickerId}
            onUndo={handleUndo}
            onAddDate={handleAddDate} // 🔥 추가
          />

          <div className="mt-3 w-full flex justify-center">
            <EditorControls onBack={handleBack} onSelect={handleDownload} />
          </div>
        </div>
      </div>
    </div>
  );
}
