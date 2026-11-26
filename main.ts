// The Funniest Out-of-Office: a single line, written to /output/entry.txt.
// The joke is the auto-reply itself going on leave and leaving a plant in charge.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I'm out of office until Monday. This auto-reply is on leave too, so please email my desk plant — it has seniority and has never replied.";

function guard(text: string): void {
  const n = [...text].length;
  if (n < 1 || n > 140) {
    throw new Error(`out-of-office line is ${n} chars; the gate allows 1-140`);
  }
  if (text.trim().length === 0) {
    throw new Error("out-of-office line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("out-of-office line must be exactly one line");
  }
}

function main(): void {
  guard(LINE);
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
}

main();
