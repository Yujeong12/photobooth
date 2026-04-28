"use client";

import { useEffect, useRef } from "react";
import { type Application } from "pixi.js";
import { createPixiApp } from "@/lib/pixi/createPixiApp";
import {
  DreamyFilter,
  Y2KPinkFilter,
  CoolblueFilter,
  GrainyFilter,
} from "@/lib/pixi/filters/CamerFilters";

type Props = {
  video: HTMLVideoElement | null;
  container: HTMLDivElement | null;
  filterId: string;
};

function getPixiFilters(filterId: string) {
  switch (filterId) {
    case "01":
      return []; // Original

    case "02":
      return [DreamyFilter()];

    case "03":
      return [CoolblueFilter()];

    case "04":
      return [Y2KPinkFilter()];

    case "05":
      return [GrainyFilter()];

    default:
      return [];
  }
}

export function usePixiCamera({ video, container, filterId }: Props) {
  const appRef = useRef<Application | null>(null);
  const destroyRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!video || !container) return;

    let mounted = true;

    const init = async () => {
      const filters = getPixiFilters(filterId);

      const pixi = await createPixiApp({
        container,
        video,
        filters,
      });

      if (!mounted) {
        pixi.destroy();
        return;
      }

      appRef.current = pixi.app;
      destroyRef.current = pixi.destroy;
    };

    init();

    return () => {
      mounted = false;
      destroyRef.current?.();
      destroyRef.current = null;
      appRef.current = null;

      container.innerHTML = "";
    };
  }, [video, container, filterId]);

  const capture = () => {
    if (!appRef.current) return null;

    const app = appRef.current;
    app.renderer.render(app.stage);

    return app.canvas.toDataURL("image/png");
  };

  return { capture };
}
