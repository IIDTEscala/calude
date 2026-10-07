import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Three colours only: maximum contrast, minimum noise.
export const BLACK = "#000000";
export const WHITE = "#FFFFFF";
export const ACCENT = "#FFE600";

export const FONT = "Anton";

loadFont({ family: FONT, url: staticFile("anton.woff2"), weight: "400" });

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const BEAT = 30; // one idea per second

// Anton glyphs average ~0.46em wide; size each word to fill ~88% of the frame.
export const fitSize = (text: string, max = 360) =>
  Math.min(max, (WIDTH * 0.88) / (text.length * 0.46));
