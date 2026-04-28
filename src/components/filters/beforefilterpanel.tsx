"use client";

import { useState } from "react";
import { FILTERS } from "@/constants/filters";
import FilterWindow from "@/components/FilterWindow";
import FilterCard from "@/components/filters/FilterCard";

export default function FilterPanel() {
  const [selectedFilterId, setSelectedFilterId] = useState("03");
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
                hover:scale-105 hover:shadow-[0_0_18px_rgba(255,90,190,0.9),4px_4px_0_rgba(0,0,0,0.45)]
                transition

                /* PC */
                right-[4%] top-[16%] w-[clamp(260px,18vw,340px)]

                /* 모바일 */
                max-md:left-1/2 max-md:bottom-4 max-md:top-auto max-md:right-auto
                max-md:-translate-x-1/2
                max-md:w-[90%] max-md:max-w-[380px]
                "
      >
        {/* title bar */}
        <div className="flex h-7 items-center justify-between border-b-1 border-[#5f4a66] bg-gradient-to-r from-pink-500 to-pink-300 px-2 text-left text-[11px] font-bold uppercase text-white">
          <span>SYSTEM MESSAGE</span>
          <span className="flex h-4 w-4 items-center justify-center border border-[#5f4a66] bg-[#d7b3d7] text-[#3a263d]">
            ×
          </span>
        </div>

        {/* body */}
        <div className="flex items-center gap-2 px-3 py-3 md:px-7 md:py-7 text-left ">
          <span className="text-2xl md:text-4xl lg:text-5xl drop-shadow-[0_0_6px_rgba(255,80,190,0.9)]">
            💗
          </span>

          <div className="text-[clamp(12px,0.9vw,16px)] md:text-[clamp(14px,1vw,18px)]] leading-snug">
            Don&apos;t forget to
            <br />
            choose your filter.
            <div className="mx-auto mt-2 w-fit border border-[#6c5770] bg-[#e8c9e5] px-3 py-0.5 text-[11px] md:text-[12px] lg:text-[13px] shadow-[inset_1px_1px_0_rgba(255,255,255,0.7)]">
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
      <FilterWindow onClose={() => setIsOpen(false)}>
        <div
          className="
                    space-y-3

                    max-md:flex max-md:gap-3 max-md:space-y-0
                    max-md:overflow-x-auto max-md:overflow-y-hidden
                    max-md:pb-2
                "
        >
          {FILTERS.map((filter) => (
            <FilterCard
              key={filter.id}
              filter={filter}
              isSelected={filter.id === selectedFilterId}
              onClick={() => setSelectedFilterId(filter.id)}
            />
          ))}
        </div>
      </FilterWindow>
    </div>
  );
}
