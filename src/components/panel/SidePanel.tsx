"use client";

import { useState } from "react";
import WindowControls from "@/components/panel/WindowControls";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function SidePanel({ title, children }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed z-30 overflow-hidden rounded-sm
          border-2 border-pink-200/80
          bg-[#d9b4d8]
          font-mono text-[#3a263d]
          shadow-[0_0_12px_rgba(255,120,200,0.55),4px_4px_0_rgba(0,0,0,0.45)]
          transition
          hover:scale-105 hover:shadow-[0_0_18px_rgba(255,90,190,0.9),4px_4px_0_rgba(0,0,0,0.45)]

          right-[4%] top-[16%] w-[clamp(260px,18vw,340px)]

          max-md:left-1/2 max-md:bottom-4 max-md:top-auto max-md:right-auto
          max-md:-translate-x-1/2
          max-md:w-[90%] max-md:max-w-[380px]
        "
      >
        <div className="flex h-7 items-center justify-between border-b border-[#5f4a66] bg-gradient-to-r from-pink-500 to-pink-300 px-2 text-left text-[11px] font-bold uppercase text-white">
          <span>SYSTEM MESSAGE</span>

          <span className="flex h-4 w-4 items-center justify-center border border-[#5f4a66] bg-[#d7b3d7] text-[#3a263d]">
            ×
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-3 text-left md:px-7 md:py-7">
          <span className="text-2xl drop-shadow-[0_0_6px_rgba(255,80,190,0.9)] md:text-4xl lg:text-5xl">
            💗
          </span>

          <div className="text-[clamp(12px,0.9vw,16px)] leading-snug md:text-[clamp(14px,1vw,18px)]">
            Open panel
            <div className="mx-auto mt-2 w-fit border border-[#6c5770] bg-[#e8c9e5] px-3 py-0.5 text-[11px] shadow-[inset_1px_1px_0_rgba(255,255,255,0.7)] md:text-[12px] lg:text-[13px]">
              Open it !
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      className="
        fixed z-30 font-mono text-white
        right-[2.5%] top-[7%] w-[clamp(260px,24vw,420px)]

        max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-auto
        max-md:w-full max-md:rounded-none
      "
    >
      <div className="rounded-xl bg-gradient-to-r from-pink-300 via-fuchsia-400 to-pink-200 p-[1.5px] shadow-[0_0_10px_rgba(255,120,200,0.4)]">
        <div className="rounded-xl border border-transparent bg-[#231c2f]/80 backdrop-blur-sm">
          <div className="flex h-9 items-center justify-between rounded-t-xl border-b border-pink-200/60 bg-gradient-to-r from-[#6c5878] to-[#2a2238] px-3 max-md:h-7 max-md:px-2">
            <div className="flex items-center gap-2 text-[clamp(11px,0.9vw,15px)] font-bold uppercase tracking-wide">
              <span className="text-pink-100">▣</span>
              <span>{title}</span>
            </div>

            <WindowControls onClose={() => setIsOpen(false)} />
          </div>

          <div className="relative max-h-[70vh] overflow-y-auto p-3 pr-5 max-md:max-h-[55vh] max-md:p-2 max-md:pr-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
