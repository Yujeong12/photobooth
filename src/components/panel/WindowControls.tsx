type Props = {
  onClose: () => void;
};

export default function WindowControls({ onClose }: Props) {
  return (
    <div className="flex gap-1">
      <button
        onClick={onClose}
        className="h-5 w-5 border bg-pink-200 cursor-pointer hover:bg-pink-400"
      >
        -
      </button>
      {/* <button
        onClick={onClose}
        className="h-5 w-5 border bg-pink-200 cursor-pointer hover:bg-pink-400"
      >
        □
      </button> */}
      <button
        onClick={onClose}
        className="h-5 w-5 border bg-pink-200 cursor-pointer hover:bg-pink-400"
      >
        ×
      </button>
    </div>
  );
}
