import WindowControls from "@/components/panel/WindowControls";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function FilterWindow({ children, onClose }: Props) {
  return (
    <div className="p-[1.5px] rounded-xl bg-gradient-to-r from-pink-300 via-fuchsia-400 to-pink-200 shadow-[0_0_10px_rgba(255,120,200,0.4)]">
      <div className="border border-transparent bg-[#231c2f]/80 rounded-xl backdrop-blur-sm">
        <div className="flex h-9 max-md:h-7 items-center justify-between border-b-2 rounded-t-xl border-pink-200/60 bg-gradient-to-r from-[#6c5878] to-[#2a2238] px-3">
          <div className="flex items-center gap-2 text-[clamp(11px,0.9vw,15px)] font-bold uppercase tracking-wide">
            <span className="text-pink-100">▣</span>
            <span>CHOOSE YOUR FILTER</span>
          </div>

          <WindowControls onClose={onClose} />
        </div>

        <div className="relative max-h-[70vh] overflow-y-auto p-3 pr-5 max-md:p-2 max-md:pr-3 scrollbar-thin scrollbar-track-[#171020] scrollbar-thumb-pink-400">
          {children}
        </div>
      </div>
    </div>
  );
}
