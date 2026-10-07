import { ACCENT, BLACK, WHITE } from "../theme";
import type { BeatProps } from "../components/Beat";

// One verb per tool in the IIDT Escala workspace.
export const beats: Omit<BeatProps, "index">[] = [
  { word: "DESIGN", label: "CANVA + FIGMA", bg: WHITE, fg: BLACK, bar: BLACK, barText: ACCENT },
  { word: "BUILD", label: "WIX", bg: BLACK, fg: WHITE, bar: ACCENT, barText: BLACK },
  { word: "MEASURE", label: "SUPERMETRICS", bg: ACCENT, fg: BLACK, bar: BLACK, barText: WHITE },
  { word: "BILL", label: "ZOHO BOOKS", bg: BLACK, fg: ACCENT, bar: WHITE, barText: BLACK },
  { word: "SHARE", label: "GOOGLE DRIVE", bg: WHITE, fg: BLACK, bar: ACCENT, barText: BLACK },
  { word: "SKETCH", label: "TLDRAW", bg: BLACK, fg: WHITE, bar: ACCENT, barText: BLACK },
];
