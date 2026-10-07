import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, fitSize } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type BeatProps = {
  word: string;
  label: string;
  bg: string;
  fg: string;
  bar: string;
  barText: string;
  index: number;
};

// One beat = one huge word + one small label. Slams in, whips out.
export const Beat: React.FC<BeatProps> = ({
  word,
  label,
  bg,
  fg,
  bar,
  barText,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const dir = index % 2 === 0 ? 1 : -1;

  const slam = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 420, mass: 0.6 },
  });
  const scale = interpolate(slam, [0, 1], [1.7, 1]);
  const enterX = interpolate(slam, [0, 1], [260 * dir, 0]);
  const exitX = interpolate(
    frame,
    [durationInFrames - 5, durationInFrames],
    [0, -1400 * dir],
    clamp,
  );
  const skew = interpolate(slam, [0, 1], [-14 * dir, 0]) +
    interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 18 * dir], clamp);

  const barGrow = spring({
    frame: frame - 4,
    fps,
    config: { damping: 18, stiffness: 300 },
  });
  const labelY = interpolate(barGrow, [0, 1], [60, 0]);

  // 2-frame inverted flash on the cut.
  const flash = frame < 2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: flash ? fg : bg,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: fitSize(word),
          lineHeight: 1,
          color: flash ? bg : fg,
          letterSpacing: -4,
          transform: `translateX(${enterX + exitX}px) scale(${scale}) skewX(${skew}deg)`,
        }}
      >
        {word}
      </div>
      <div
        style={{
          position: "absolute",
          top: "62%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          transform: `translateX(${exitX * 0.6}px)`,
        }}
      >
        <div
          style={{
            backgroundColor: bar,
            padding: "14px 36px",
            transform: `scaleX(${barGrow})`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontSize: 72,
              letterSpacing: 6,
              color: barText,
              transform: `translateY(${labelY}px)`,
            }}
          >
            {label}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
