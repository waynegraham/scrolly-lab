import React from "react";

type Mode = "chars" | "words";

export function SplitTextLite({
  text,
  mode = "chars",
  className,
  tokenClassName = "scrolly-token"
}: {
  text: string;
  mode?: Mode;
  className?: string;
  tokenClassName?: string;
}) {
  const parts = mode === "words" ? text.split(/(\s+)/) : Array.from(text);

  return (
    <span className={className} aria-label={text} role="text">
      {parts.map((p, i) => (
        <span key={i} className={tokenClassName} aria-hidden="true">
          {p}
        </span>
      ))}
    </span>
  );
}
