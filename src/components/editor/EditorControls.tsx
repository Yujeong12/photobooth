import ButtonUI from "@/components/camera/ButtonUI";
import { BACKBTN } from "@/constants/backBtn";
import { SELECTBTN } from "@/constants/selectBtn";

type Props = {
  onBack: () => void;
  onSelect: () => void;
};

export default function EditorControls({ onBack, onSelect }: Props) {
  return (
    <div className="fixed bottom-[1%] right-[6%] z-40 flex items-center gap-8 max-md:bottom-4 max-md:right-1/2 max-md:translate-x-1/2 max-md:top-[30%]">
      <ButtonUI
        onClick={onBack}
        imageSrc={BACKBTN.imageSrc}
        sizeClass="w-[clamp(90px,15vw,170px)]"
      />

      <ButtonUI
        onClick={onSelect}
        imageSrc={SELECTBTN.imageSrc}
        sizeClass="w-[clamp(70px,12vw,110px)] animate-select-pulse"
      />
    </div>
  );
}
