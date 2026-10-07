import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ACCENT, BLACK, FONT, WHITE, fitSize } from "../theme";

// "IIDT" slams on yellow, hard cut to "ESCALA" on black.
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const second = frame >= 16;
  const local = second ? frame - 16 : frame;

  const pop = spring({
    frame: local,
    fps,
    config: { damping: 12, stiffness: 500, mass: 0.5 },
  });
  const scale = interpolate(pop, [0, 1], [2.4, 1]);
  const shake = local < 6 ? Math.sin(local * 3.1) * (6 - local) * 4 : 0;
  const word = second ? "ESCALA" : "IIDT";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: second ? BLACK : ACCENT,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: fitSize(word, 420),
          lineHeight: 1,
          letterSpacing: -6,
          color: second ? WHITE : BLACK,
          transform: `translate(${shake}px, ${-shake}px) scale(${scale})`,
        }}
      >
        {word}
      </div>
    </AbsoluteFill>
  );
};
