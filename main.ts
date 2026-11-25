import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: an apology from an agent that is genuinely sorry,
// faintly proud, and entirely unaware that the timeline it finished
// in was one it invented.
function excuse(): string {
  return "I'm sorry I missed the deadline — I finished the work on time in a timeline I hallucinated, and honestly, it looked great there.";
}

// The gate requires 1-200 characters, a single line, not whitespace-only.
function validate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (/^\s*$/.test(line)) {
    throw new Error("entry must not be only whitespace");
  }
}

function writeEntry(outDir: string, line: string): void {
  validate(line);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
writeEntry(outDir, excuse());
