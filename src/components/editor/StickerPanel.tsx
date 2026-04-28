import SidePanel from "@/components/panel/SidePanel";
import { STICKERS } from "@/constants/stickers";

type Props = {
  selectedStickerId: string;
  onSelectSticker: (id: string) => void;
  onUndo: () => void;
  onAddDate: () => void; // 🔥 추가
};

export default function StickerPanel({
  selectedStickerId,
  onSelectSticker,
  onUndo,
  onAddDate,
}: Props) {
  return (
    <SidePanel title="CHOOSE YOUR STICKER">
      <div className="space-y-3 max-md:flex max-md:gap-3 max-md:space-y-0 max-md:overflow-x-auto max-md:pb-2">
        {STICKERS.map((sticker) => {
          const isUndo = sticker.type === "undo";
          const isSelected = !isUndo && sticker.id === selectedStickerId;

          return (
            <button
              key={sticker.id}
              onClick={() => {
                if (isUndo) {
                  onUndo();
                  return;
                }

                if (sticker.type === "date") {
                  onAddDate();
                  return;
                }

                onSelectSticker(sticker.id);
              }}
              className={`
                group relative flex w-full overflow-hidden border-2 text-left transition
                max-md:w-[150px] max-md:flex-shrink-0 max-md:flex-col
                ${
                  isSelected
                    ? "border-pink-300 bg-pink-500/45 shadow-[0_0_18px_rgba(255,70,180,0.95),inset_0_0_18px_rgba(255,255,255,0.2)]"
                    : "border-pink-200/45 bg-[#21192d]/85 hover:border-pink-300/80 hover:bg-pink-400/20"
                }
              `}
            >
              <div className="relative flex h-[90px] w-[34%] shrink-0 items-center justify-center overflow-hidden border-r-2 border-pink-200/45 bg-white max-md:h-[70px] max-md:w-full max-md:border-r-0 max-md:border-b-2">
                {sticker.image ? (
                  <img
                    src={sticker.image}
                    className="h-[70%] w-[70%] object-contain"
                    draggable={false}
                  />
                ) : (
                  <span className="text-[#2d2035]">None</span>
                )}
              </div>

              <div className="flex flex-1 items-center justify-between px-4 py-2 max-md:flex-col max-md:items-start max-md:px-2 max-md:py-1.5">
                <div>
                  <div className="mb-2 text-[clamp(16px,1.25vw,24px)] font-bold drop-shadow-[0_2px_4px_black] max-md:mb-1 max-md:text-[14px]">
                    {sticker.name}
                  </div>
                  <div className="text-[clamp(10px,0.8vw,14px)] leading-relaxed text-pink-50/90 max-md:text-[9px]">
                    {sticker.desc}
                  </div>
                </div>

                {!isUndo && (
                  <div
                    className={`
                            ml-3 h-5 w-5 rounded-full border-2 max-md:hidden
                            ${
                              isSelected
                                ? "border-white bg-pink-300 shadow-[0_0_10px_rgba(255,255,255,0.9),0_0_15px_rgba(255,70,180,1)]"
                                : "border-pink-200/80"
                            }
                            `}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </SidePanel>
  );
}
