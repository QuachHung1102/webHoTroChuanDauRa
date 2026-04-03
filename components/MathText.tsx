"use client";

import { InlineMath, BlockMath } from "react-katex";

// Render text có thể chứa LaTeX: $...$ hoặc $$...$$
export function MathText({ text, className }: { text: string; className?: string }) {
  // Split by $$...$$ (block) then $...$ (inline)
  const parts = splitMath(text);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.type === "block") {
          return (
            <span key={i} className="block my-1">
              <BlockMath math={part.value} />
            </span>
          );
        }
        if (part.type === "inline") {
          return <InlineMath key={i} math={part.value} />;
        }
        return <span key={i}>{part.value}</span>;
      })}
    </span>
  );
}

type Part = { type: "text" | "inline" | "block"; value: string };

function splitMath(input: string): Part[] {
  const result: Part[] = [];
  // Match $$...$$ first, then $...$
  const pattern = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(input)) !== null) {
    if (match.index > lastIndex) {
      result.push({ type: "text", value: input.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined) {
      result.push({ type: "block", value: match[1] });
    } else if (match[2] !== undefined) {
      result.push({ type: "inline", value: match[2] });
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < input.length) {
    result.push({ type: "text", value: input.slice(lastIndex) });
  }

  return result;
}
