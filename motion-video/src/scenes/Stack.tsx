import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ACCENT, BLACK, FONT, WHITE } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Every verb stacks up fast, then collapses into one line: ONE FLOW.
export const Stack: React.FC<{ words: string[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const collapseAt = words.length * 3 + 8;

  const collapse = interpolate(frame, [collapseAt, collapseAt + 5], [1, 0], clamp);
  const final = spring({
    frame: frame - collapseAt - 3,
    fps,
    config: { damping: 12, stiffness: 380, mass: 0.6 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BLACK,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scaleY(${collapse})`,
          opacity: collapse > 0.02 ? 1 : 0,
        }}
      >
        {words.map((w, i) => {
          const visible = frame >= i * 3;
          const isLast = i === Math.min(words.length - 1, Math.floor(frame / 3));
          return (
            <div
              key={w}
              style={{
                fontFamily: FONT,
                fontSize: 190,
                lineHeight: 1.02,
                color: isLast ? ACCENT : WHITE,
                opacity: visible ? 1 : 0,
              }}
            >
              {w}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          fontFamily: FONT,
          fontSize: 300,
          lineHeight: 0.95,
          color: BLACK,
          backgroundColor: ACCENT,
          padding: "10px 40px 24px",
          textAlign: "center",
          transform: `scale(${interpolate(final, [0, 1], [0, 1])}) rotate(${interpolate(final, [0, 1], [-8, -3])}deg)`,
        }}
      >
        ONE
        <br />
        FLOW.
      </div>
    </AbsoluteFill>
  );
};
