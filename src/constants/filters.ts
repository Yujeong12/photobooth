export const FILTERS = [
  {
    id: "01",
    name: "Original",
    desc: "The classic vibe.\nPure and simple.",
    image: "/sample/sample.png",
  },
  {
    id: "02",
    name: "Dreamy",
    desc: "Soft glow for\ndreamy days.",
    image: "/sample/sample.png",
  },
  {
    id: "03",
    name: "Cool blue",
    desc: "The main\ncharacter filter.",
    image: "/sample/sample.png",
  },
  {
    id: "04",
    name: "Y2K Pink",
    desc: "Cool tone for\na cold heart.",
    image: "/sample/sample.png",
  },
  {
    id: "05",
    name: "Grainy",
    desc: "Old cam, real\nnostalgia.",
    image: "/sample/sample.png",
  },
];

export type FilterItem = (typeof FILTERS)[number];
