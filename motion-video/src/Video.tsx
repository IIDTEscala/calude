import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Beat } from "./components/Beat";
import { beats } from "./data/content";
import { Intro } from "./scenes/Intro";
import { Outro } from "./scenes/Outro";
import { Stack } from "./scenes/Stack";
import { BEAT } from "./theme";

const INTRO = 36;
const STACK = 42;
const BEATS_END = INTRO + beats.length * BEAT; // 216
const OUTRO_START = BEATS_END + STACK; // 258

export const MainVideo: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={INTRO}>
        <Intro />
      </Sequence>
      {beats.map((b, i) => (
        <Sequence key={b.word} from={INTRO + i * BEAT} durationInFrames={BEAT}>
          <Beat {...b} index={i} />
        </Sequence>
      ))}
      <Sequence from={BEATS_END} durationInFrames={STACK}>
        <Stack words={beats.map((b) => b.word)} />
      </Sequence>
      <Sequence from={OUTRO_START} durationInFrames={durationInFrames - OUTRO_START}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
