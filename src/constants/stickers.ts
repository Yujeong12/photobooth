import { STICKERASSETS } from "./stickerAssets";

export type StickerItem = {
  id: string;
  name: string;
  desc: string;
  image?: string;
  size?: number;
  type?: "sticker" | "date" | "undo";
};

export const STICKERS: StickerItem[] = [
  {
    id: "undo",
    name: "undo",
    desc: "Can I resest my life?",
    type: "undo",
  },
  {
    id: "date",
    name: "date",
    desc: "Today is...",
    type: "date",
  },
  {
    id: "star",
    name: "star",
    desc: "I'm a rock star",
    image: STICKERASSETS.STAR_STICKER,
    size: 10,
    type: "sticker",
  },
  {
    id: "mini_star",
    name: "mini star",
    desc: "When will I be a star?",
    image: STICKERASSETS.STAR_STICKER,
    size: 8,
    type: "sticker",
  },
  {
    id: "heart",
    name: "heart",
    desc: "This heart is for Nick",
    image: STICKERASSETS.HEART_STICKER,
    size: 10,
    type: "sticker",
  },
  {
    id: "mini heart",
    name: "mini heart",
    desc: "I'm not ready for love.",
    image: STICKERASSETS.HEART_STICKER,
    size: 8,
    type: "sticker",
  },
  {
    id: "pixel_heart",
    name: "pixel_heart",
    desc: "Bug, Drug, Y2K, love",
    image: STICKERASSETS.PIXEL_HEART_STICKER,
    size: 10,
    type: "sticker",
  },
  {
    id: "mini pixel_heart",
    name: "mini pixel_heart",
    desc: "Catch me if you can",
    image: STICKERASSETS.PIXEL_HEART_STICKER,
    size: 8,
    type: "sticker",
  },
  {
    id: "pixel_full_heart",
    name: "pixel_full_heart",
    desc: "This is not a coin",
    image: STICKERASSETS.FULL_PIXEL_HEART_STICKER,
    size: 10,
    type: "sticker",
  },
  {
    id: "mini pixel_full_heart",
    name: "mini pixel_full_heart",
    desc: "Yes, It's yours",
    image: STICKERASSETS.FULL_PIXEL_HEART_STICKER,
    size: 8,
    type: "sticker",
  },
  {
    id: "clova",
    name: "clova",
    desc: "lucky is always mine",
    image: STICKERASSETS.CLOVA_STICKER,
    size: 8,
    type: "sticker",
  },
];
