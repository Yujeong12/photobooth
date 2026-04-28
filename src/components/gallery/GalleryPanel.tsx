import type { CapturedPhoto } from "@/hooks/usePhotoBooth";
import GalleryCard from "@/components/gallery/GalleryCard";

type Props = {
  photos: CapturedPhoto[];
  onSelectPhoto: (photo: CapturedPhoto) => void;
};

export default function GalleryPanel({ photos, onSelectPhoto }: Props) {
  if (photos.length === 0) {
    return (
      <div className="p-4 text-sm text-pink-100/80">아직 찍은 사진이 없음!</div>
    );
  }

  return (
    <div
      className="
        space-y-3
        max-md:flex max-md:gap-3 max-md:space-y-0
        max-md:overflow-x-auto max-md:overflow-y-hidden
        max-md:pb-2
      "
    >
      {photos.map((photo, index) => (
        <GalleryCard
          key={photo.id}
          photo={photo}
          index={photos.length - index}
          onClick={() => onSelectPhoto(photo)}
        />
      ))}
    </div>
  );
}
