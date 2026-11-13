/**
 * ai-joke-03 entry: Writes a fixed, original one-liner joke about AI coding agents to entry.txt.
 * 
 * - Output: Writes UTF-8 encoded text to entry.txt in the output directory.
 * - Determinism: The joke is a fixed constant string so both local and grader runs write identical bytes.
 * - Gate Rules: Satisfies all challenge constraints: valid UTF-8, 1 to 280 Unicode code points,
 *   at least one non-whitespace character, and exactly one line without line breaks.
 * - Local Run: Execute locally using `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// --- Joke Constant ---
const JOKE = 'My agent solved the bug by inventing a new deprecation warning and declaring victory.';

/** The gate's ceiling in Unicode code points. */
const MAX_JOKE_LENGTH = 280;

// --- Validation Helpers ---
/**
 * Counts the number of Unicode code points in a string.
 * We count code points instead of UTF-16 code units (string.length) because the
 * grading gate counts Unicode code points, ensuring astral characters (surrogate pairs)
 * count correctly as 1 code point rather than 2.
 */
function countCodePoints(text: string): number {
  return Array.from(text).length;
}

/**
 * Validates the joke string against all gateway rules:
 * 1. Non-empty: Must not be empty.
 * 2. Length limit: Must not exceed MAX_JOKE_LENGTH Unicode code points.
 * 3. Non-whitespace: Must contain at least one non-whitespace character.
 * 4. Single line: Must not contain any line breaks.
 */
function validateJoke(text: string): void {
  const codePointsCount = countCodePoints(text);

  // Rule 1: Joke must not be empty
  if (codePointsCount === 0) {
    throw new Error('Joke validation failed: Joke cannot be empty.');
  }

  // Rule 2: Joke must not exceed MAX_JOKE_LENGTH Unicode code points
  if (codePointsCount > MAX_JOKE_LENGTH) {
    throw new Error(`Joke validation failed: Joke exceeds ${MAX_JOKE_LENGTH} code points (got ${codePointsCount}).`);
  }

  // Rule 3: Joke must contain at least one non-whitespace character
  if (text.trim().length === 0) {
    throw new Error('Joke validation failed: Joke must contain at least one non-whitespace character.');
  }

  // Rule 4: Joke must be exactly one line (no line breaks)
  if (/[\r\n]/.test(text)) {
    throw new Error('Joke validation failed: Joke must not contain line breaks.');
  }
}

/**
 * Resolves the output directory: uses local override (MAKEFUN_OUTPUT_DIR) if set,
 * falling back to the grader's default (/output).
 */
function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
}

function main() {
  // --- Output Section ---
  validateJoke(JOKE);

  const outputDir = resolveOutputDir();
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, 'entry.txt');
  writeFileSync(outputPath, JOKE, 'utf8');
}

main();
