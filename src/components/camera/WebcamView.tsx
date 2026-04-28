"use client";

import { useRouter } from "next/navigation";

import { useRef } from "react";
import { useWebcam } from "@/hooks/useWebcam";
import { usePixiCamera } from "@/hooks/usePixiCamera";
import { usePhotoBooth } from "@/hooks/usePhotoBooth";

import CameraFrame from "@/components/camera/CameraFrame";
import BackgroundUI from "../BackgroundUI";
import FilterPanel from "@/components/filters/FilterPanel";
import SidePanel from "@/components/panel/SidePanel";
import GalleryPanel from "@/components/gallery/GalleryPanel";
import { SELECTBTN } from "@/constants/selectBtn";
import { CAMERABTN } from "@/constants/cameraButton";
import { FILTERS } from "@/constants/filters";

export default function WebcamView() {
  const router = useRouter();

  const screenRef = useRef<HTMLDivElement>(null);

  const { videoRef } = useWebcam();

  const {
    selectedFilterId,
    panelMode,
    photos,
    previewImage,

    capturePhoto,
    selectPhoto,
    selectFilter,
    setPanelMode,
    setPreviewImage,
  } = usePhotoBooth();

  const { capture } = usePixiCamera({
    video: videoRef.current,
    container: screenRef.current,
    filterId: selectedFilterId,
  });

  const handleCapture = () => {
    if (previewImage) {
      localStorage.setItem("editingImage", previewImage);
      router.push("/edit");
      return;
    }

    // 📸 촬영 상태
    const image = capture();
    if (!image) return;

    capturePhoto(image);
  };

  return (
    <BackgroundUI>
      <div
        className="
          translate-x-[2vw] translate-y-[5vh]
          max-md:translate-y-[0vh]
          max-md:translate-x-0
        "
      >
        <CameraFrame
          onCapture={handleCapture}
          onOpenGallery={() => setPanelMode("gallery")}
          onOpenFilters={() => {
            setPreviewImage(null);
            setPanelMode("filters");
          }}
          isPreviewMode={!!previewImage}
          captureButtonImageSrc={
            previewImage ? SELECTBTN.imageSrc : CAMERABTN.imageSrc
          }
        >
          {/* 캠 화면은 항상 존재 */}
          <div ref={screenRef} className="absolute inset-0 h-full w-full" />

          {/* 사진 선택했을 때만 위에 덮기 */}
          {previewImage && (
            <img
              src={previewImage}
              alt="selected photo"
              className="absolute inset-0 z-10 h-full w-full object-cover"
              draggable={false}
            />
          )}
        </CameraFrame>
      </div>

      <SidePanel
        title={panelMode === "filters" ? "CHOOSE YOUR FILTER" : "YOUR MEMORIES"}
      >
        {panelMode === "filters" ? (
          <FilterPanel
            selectedFilterId={selectedFilterId}
            onSelectFilter={selectFilter}
          />
        ) : (
          <GalleryPanel photos={photos} onSelectPhoto={selectPhoto} />
        )}
      </SidePanel>
    </BackgroundUI>
  );
}
