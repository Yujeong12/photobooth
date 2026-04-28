import type { FilterItem } from "@/constants/filters";

type Props = {
  filter: FilterItem;
  isSelected: boolean;
  onClick: () => void;
};

export default function FilterCard({ filter, isSelected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex w-full overflow-hidden border-2 text-left transition
        max-md:w-[150px] max-md:flex-shrink-0 max-md:flex-col

        ${
          isSelected
            ? "border-pink-300 bg-pink-500/45 shadow-[0_0_18px_rgba(255,70,180,0.95),inset_0_0_18px_rgba(255,255,255,0.2)]"
            : "border-pink-200/45 bg-[#21192d]/85 shadow-[inset_0_0_14px_rgba(255,255,255,0.08)] hover:border-pink-300/80 hover:bg-pink-400/20 cursor-pointer"
        }
      `}
    >
      {/* 이미지 영역 */}
      <div
        className="
          relative h-[clamp(78px,6vw,105px)] w-[34%] shrink-0 overflow-hidden border-r-2 border-pink-200/45
          max-md:h-[70px] max-md:w-full max-md:border-r-0 max-md:border-b-2 
        "
      >
        <img
          src={filter.image}
          alt={filter.name}
          className={`
            h-full w-full object-cover max-md:object-[center_38%]
            ${filter.id === "04" ? "rotate-[180deg] saturate-75" : ""}
            ${filter.id === "05" ? "grayscale contrast-125" : ""}
            ${filter.id === "03" ? "saturate-150 brightness-110" : ""}
          `}
        />

        <div className="absolute left-2 top-2 text-[clamp(18px,1.4vw,25px)] font-bold text-white drop-shadow-[0_2px_4px_black]">
          {filter.id}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-pink-500/25" />
      </div>

      {/* 텍스트 영역 */}
      <div
        className="
          flex flex-1 items-center justify-between px-4 py-2
           max-md:flex-col max-md:items-start max-md:justify-start max-md:px-2 max-md:py-2
        "
      >
        <div>
          <div className="mb-2 text-[clamp(16px,1.25vw,24px)] font-bold drop-shadow-[0_2px_4px_black] max-md:mb-1 max-md:text-[14px]">
            {filter.name}
          </div>

          <div className="whitespace-pre-line text-[clamp(10px,0.8vw,14px)] leading-relaxed text-pink-50/90 drop-shadow-[0_1px_3px_black] max-md:text-[9px] max-md:leading-snug">
            {filter.desc}
          </div>
        </div>

        {/* 선택 원 */}
        <div
          className={`
            ml-3 h-5 w-5 rounded-full border-2
            max-md:hidden max-md:bottom-2 max-md:right-2 max-md:ml-0

            ${
              isSelected
                ? "border-white bg-pink-300 shadow-[0_0_10px_rgba(255,255,255,0.9),0_0_15px_rgba(255,70,180,1)]"
                : "border-pink-200/80 bg-transparent"
            }
          `}
        />
      </div>
    </button>
  );
}
