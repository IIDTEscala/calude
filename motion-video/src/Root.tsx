import React from "react";
import { Composition, registerRoot } from "remotion";
import { MainVideo } from "./Video";
import { FPS, HEIGHT, WIDTH } from "./theme";

const RemotionRoot: React.FC = () => (
  <Composition
    id="MainVideo"
    component={MainVideo}
    durationInFrames={10 * FPS}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);

registerRoot(RemotionRoot);
