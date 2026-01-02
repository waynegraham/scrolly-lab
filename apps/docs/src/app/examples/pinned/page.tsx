"use client";

import React from "react";
import { PinnedStage, SplitTextLite } from "@waynegraham/scrolly";

export default function PinnedExample() {
  return (
    <div style={{ height: "300vh", padding: 40 }}>
      <PinnedStage>
        <h1 style={{ fontSize: 48 }}>
          <SplitTextLite text="Next.js client component" mode="words" />
        </h1>
      </PinnedStage>
    </div>
  );
}
