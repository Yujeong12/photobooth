import { BACKGROUNDS } from "@/constants/background";
import { LOGO } from "@/constants/callmecam";
import { ASSETS } from "@/constants/assets";

type Props = {
  children: React.ReactNode;
};

const decoHover =
  "deco-hover cursor-pointer transition-transform duration-300 ease-out";

export default function BackgroundUI({ children }: Props) {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${BACKGROUNDS.MAIN})`,
      }}
    >
      {/* 로고 영역 */}
      <div className="pointer-events-none absolute left-[8%] top-[7%] z-10 flex flex-col items-start">
        <div className="mb-2 font-mono text-[clamp(11px,0.9vw,14px)] font-bold uppercase tracking-[0.18em] text-pink-300 drop-shadow-[0_0_8px_rgba(255,80,190,0.9)]">
          WEB PHOTOBOOTH ◎
        </div>

        <img
          src={LOGO.imageSrc}
          alt="Call Me Cam"
          className="w-[clamp(190px,33vw,380px)] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
          draggable={false}
        />

        <div className="mb-2 ml-9 font-mono text-[clamp(10px,0.9vw,14px)] font-bold uppercase tracking-[0.18em] text-white drop-shadow-[0_1_8px_black]">
          Your world, your rules.
          <br /> Take it. Save it. Love it.
        </div>

        <div className="mb-2 ml-9 inline-block rounded-md border border-pink-300 px-3 py-1 font-mono text-[clamp(10px,0.9vw,14px)] font-bold uppercase tracking-[0.18em] text-pink-300 drop-shadow-[0_1_8px_black]">
          Y2K IS CALLING
        </div>
      </div>

      {/* 데코 assets */}
      <div className="absolute left-[5%] top-[66%] max-md:left-[1%] max-md:top-[50%] z-30 flex w-[clamp(10px,19vw,240px)] items-start drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
        <div className={decoHover}>
          <img src={ASSETS.SPACE} draggable={false} />
        </div>
      </div>

      <div className="absolute left-[20%] top-[83%] max-md:left-[11%] max-md:top-[60%] z-30 flex w-[clamp(10px,9vw,80px)] items-start drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
        <div className={decoHover}>
          <img src={ASSETS.STAR} draggable={false} />
        </div>
      </div>

      <div className="absolute left-[40%] top-[-3%] z-30 flex w-[clamp(10px,12vw,100px)] rotate-[320deg] items-start drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
        <div className={`${decoHover} origin-top`}>
          <img src={ASSETS.HEART_KEYRING} draggable={false} />
        </div>
      </div>

      <div className="absolute bottom-[5%] right-[3%] z-30 flex items-start gap-3 drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] max-md:hidden">
        <div className={`${decoHover} w-[clamp(28px,5vw,70px)]`}>
          <img src={ASSETS.HEART} draggable={false} className="w-full" />
        </div>
        <div className={`${decoHover} w-[clamp(28px,5vw,70px)]`}>
          <img src={ASSETS.SPACE} draggable={false} className="w-full" />
        </div>
        <div className={`${decoHover} w-[clamp(28px,5vw,70px)]`}>
          <img src={ASSETS.STAR} draggable={false} className="w-full" />
        </div>
        <div className={`${decoHover} w-[clamp(28px,5vw,70px)]`}>
          <img src={ASSETS.PHONE} draggable={false} className="w-full" />
        </div>
      </div>

      {/* 실제 카메라 영역 */}
      <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
