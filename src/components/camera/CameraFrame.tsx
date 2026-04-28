import { CAMERA_FRAME } from "@/constants/cameraFrame";
import ButtonUI from "./ButtonUI";
import { CAMERABTN } from "@/constants/cameraButton";
import { GALLERYBTN } from "@/constants/galleryBtn";
import { FILTERBTN } from "@/constants/filterBtn";

type CameraFrameProps = {
  children: React.ReactNode;
  onCapture?: () => void;
  onOpenGallery?: () => void;
  onOpenFilters?: () => void;
  isPreviewMode?: boolean;
  captureButtonImageSrc?: string;
  hideControls?: boolean;
  frameClassName?: string;
};

export default function CameraFrame({
  children,
  onCapture,
  onOpenGallery,
  onOpenFilters,
  isPreviewMode,
  captureButtonImageSrc,
  hideControls = false,
  frameClassName = "w-[min(80vw,740px)]",
}: CameraFrameProps) {
  return (
    <div
      className={`relative ${frameClassName}`}
      style={{ aspectRatio: CAMERA_FRAME.aspectRatio }}
    >
      {/* 1층: 캠 화면 */}
      <div
        className="absolute z-0 overflow-hidden bg-black"
        style={{
          left: CAMERA_FRAME.screen.left,
          top: CAMERA_FRAME.screen.top,
          width: CAMERA_FRAME.screen.width,
          height: CAMERA_FRAME.screen.height,
        }}
      >
        {children}
      </div>

      {/* 2층: 구멍 뚫린 카메라 프레임 PNG */}
      <img
        src={CAMERA_FRAME.imageSrc}
        alt="camera frame"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none object-contain"
        draggable={false}
      />
      {!hideControls && onCapture && captureButtonImageSrc && (
        <div className="absolute bottom-[-20%] left-1/2 z-20 -translate-x-1/2">
          <ButtonUI
            onClick={onCapture}
            imageSrc={captureButtonImageSrc}
            sizeClass={`${
              isPreviewMode
                ? "w-[clamp(70px,13vw,130px)] animate-select-pulse"
                : "w-[clamp(70px,12vw,130px)]"
            } `}
          />
        </div>
      )}
      {!hideControls && onOpenGallery && (
        <div className="absolute bottom-[-27%] left-1/6 -translate-x-1 z-20">
          <ButtonUI
            onClick={onOpenGallery}
            imageSrc={GALLERYBTN.imageSrc}
            sizeClass="w-[clamp(60px,15vw,170px)]"
          />
        </div>
      )}

      {!hideControls && onOpenFilters && (
        <div className="absolute bottom-[-27%] right-1/7 -translate-x-1 z-20">
          <ButtonUI
            onClick={onOpenFilters}
            imageSrc={FILTERBTN.imageSrc}
            sizeClass="w-[clamp(60px,15vw,170px)]"
          />
        </div>
      )}
    </div>
  );
}
