type Props = {
  onClick: () => void;
  imageSrc: string;
  sizeClass?: string; // 추가
};

export default function ButtonUI({ onClick, imageSrc, sizeClass }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        ${sizeClass ?? "w-[clamp(7px,12vw,130px)]"}
        aspect-square
        bg-no-repeat bg-contain bg-center
        transition hover:scale-110 active:scale-95
        cursor-pointer
        drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]
      `}
      style={{
        backgroundImage: `url(${imageSrc})`,
      }}
    />
  );
}
