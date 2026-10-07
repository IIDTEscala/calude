import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ACCENT, BLACK, FONT, WHITE } from "../theme";

// End card held long enough to read: brand + promise.
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const top = spring({ frame, fps, config: { damping: 13, stiffness: 400, mass: 0.5 } });
  const bottom = spring({
    frame: frame - 6,
    fps,
    config: { damping: 15, stiffness: 300 },
  });
  const line = spring({ frame: frame - 12, fps, config: { damping: 20, stiffness: 200 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: frame < 2 ? ACCENT : WHITE,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 150,
            letterSpacing: 24,
            color: BLACK,
            transform: `translateY(${interpolate(top, [0, 1], [-120, 0])}px)`,
            opacity: top,
          }}
        >
          IIDT
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 330,
            lineHeight: 0.95,
            letterSpacing: -6,
            color: BLACK,
            transform: `scale(${interpolate(top, [0, 1], [1.6, 1])})`,
          }}
        >
          ESCALA
        </div>
        <div
          style={{
            width: 860,
            height: 22,
            backgroundColor: BLACK,
            marginTop: 30,
            transform: `scaleX(${line})`,
          }}
        />
        <div
          style={{
            marginTop: 44,
            fontFamily: FONT,
            fontSize: 110,
            color: BLACK,
            backgroundColor: ACCENT,
            padding: "6px 34px 14px",
            transform: `translateY(${interpolate(bottom, [0, 1], [140, 0])}px)`,
            opacity: bottom,
          }}
        >
          SCALE FASTER.
        </div>
      </div>
    </AbsoluteFill>
  );
};
