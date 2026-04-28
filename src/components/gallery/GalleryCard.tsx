import type { CapturedPhoto } from "@/hooks/usePhotoBooth";

type Props = {
  photo: CapturedPhoto;
  index: number;
  onClick: () => void;
};

export default function GalleryCard({ photo, index, onClick }: Props) {
  const photoNumber = String(index).padStart(2, "0");

  return (
    <button
      onClick={onClick}
      className="
        group relative flex w-full overflow-hidden border-2 border-pink-200/45 bg-[#21192d]/85 text-left transition
        shadow-[inset_0_0_14px_rgba(255,255,255,0.08)]
        hover:border-pink-300/80 hover:bg-pink-400/20 hover:shadow-[0_0_18px_rgba(255,70,180,0.7)]
        max-md:w-[150px] max-md:flex-shrink-0 max-md:flex-col
      "
    >
      <div
        className="
                    relative min-h-[90px] h-[100px] w-[34%]
                    shrink-0 overflow-hidden border-r-2 border-pink-200/45

                    max-md:h-[70px] max-md:w-full max-md:border-r-0 max-md:border-b-2
                "
      >
        <img
          src={photo.image}
          alt={`photo ${photoNumber}`}
          className="w-full h-full object-cover block"
        />
        {/* <img src={photo.image} className="h-full w-full object-cover" /> */}

        <div className="absolute left-2 top-2 text-[clamp(18px,1.4vw,25px)] font-bold text-white drop-shadow-[0_2px_4px_black]">
          {photoNumber}
        </div>

        {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-pink-500/25" /> */}
      </div>

      <div
        className="
          flex flex-1 items-center justify-between px-4 py-2
          max-md:flex-col max-md:items-start max-md:justify-start max-md:px-2 max-md:py-1.5
        "
      >
        <div>
          <div className="mb-2 text-[clamp(16px,1.25vw,24px)] font-bold drop-shadow-[0_2px_4px_black] max-md:mb-1 max-md:text-[14px]">
            Photo {photoNumber}
          </div>

          <div className="whitespace-pre-line text-[clamp(10px,0.8vw,14px)] leading-relaxed text-pink-50/90 drop-shadow-[0_1px_3px_black] max-md:text-[9px] max-md:leading-snug">
            Filter {photo.filterId}
            <br />
            Click to preview.
          </div>
        </div>
      </div>
    </button>
  );
}
