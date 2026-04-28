import { useState } from "react";

export type CapturedPhoto = {
  id: string;
  image: string;
  filterId: string;
};

export function usePhotoBooth() {
  const [selectedFilterId, setSelectedFilterId] = useState("03");
  const [panelMode, setPanelMode] = useState<"filters" | "gallery">("filters");
  const [photos, setPhotos] = useState<CapturedPhoto[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const capturePhoto = (image: string) => {
    const newPhoto: CapturedPhoto = {
      id: crypto.randomUUID(),
      image,
      filterId: selectedFilterId,
    };

    setPhotos((prev) => [newPhoto, ...prev]);
    setPanelMode("gallery");
  };

  const selectPhoto = (photo: CapturedPhoto) => {
    setPreviewImage(photo.image);
    setPanelMode("gallery");
  };

  const selectFilter = (id: string) => {
    setSelectedFilterId(id);
    setPreviewImage(null);
    setPanelMode("filters");
  };

  return {
    selectedFilterId,
    panelMode,
    photos,
    previewImage,

    setPanelMode,
    capturePhoto,
    selectPhoto,
    setPreviewImage,
    selectFilter,
  };
}
