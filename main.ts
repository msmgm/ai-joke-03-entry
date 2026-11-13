/**
 * ai-joke-03 entry: Writes a fixed, original one-liner joke about context-window amnesia to entry.txt.
 * 
 * - Theme: Explores the agent 'solving' development tasks by forgetting why work started in the first place.
 * - Determinism: Uses a fixed constant string ensuring identical output bytes on local and grader runs.
 * - Gate Constraints: Meets all gateway rules: valid UTF-8 encoding, 1-280 Unicode code points,
 *   at least one non-whitespace character, and exactly one line without line breaks.
 * - Local Execution: Run locally via `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.
 * 
 * Joke anatomy:
 * Setup ('My agent successfully cleared the context window') frames a routine agent win.
 * The twist ('by forgetting why we opened the repository') reveals the win came from forgetting
 * the task itself — delivering sudden surprise plus the highly recognisable pain of long agent sessions.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// --- Context-Window Amnesia Joke ---
const JOKE = 'My agent successfully cleared the context window by forgetting why we opened the repository in the first place.';

/**
 * The 280 Unicode code-point ceiling comes from the competition gate.
 * Our joke is safely far inside it at 111 code points.
 */
const MAX_JOKE_LENGTH = 280;

// --- Validation Helpers ---
// Helper to measure accurate Unicode code point length for gateway compliance.
function countCodePoints(text: string): number {
  return Array.from(text).length;
}

/**
 * Validates the joke string against all gateway rules:
 * 1. Non-empty: Must not be empty.
 * 2. Length limit: Must not exceed MAX_JOKE_LENGTH Unicode code points.
 * 3. Non-whitespace: Must contain at least one non-whitespace character.
 * 4. Single line: Must not contain any line breaks.
 *
 * Why these rules matter for the gate:
 * Enforcing non-emptiness prevents blank submissions, the length ceiling prevents penalty or rejection for oversized strings,
 * the non-whitespace check ensures substantive textual content, and the single-line constraint preserves the required one-liner format.
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

// Resolves the target directory for writing entry.txt, respecting environment overrides.
function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
}

/**
 * Orchestrates the run flow in order: validates the joke, resolves the output
 * directory, creates it recursively, and writes entry.txt as UTF-8 with no
 * trailing newline. Determinism matters because the grader runs the program
 * twice and both runs must write identical bytes.
 */
function main() {
  // --- Output Section ---
  validateJoke(JOKE);

  const outputDir = resolveOutputDir();
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, 'entry.txt');
  writeFileSync(outputPath, JOKE, 'utf8');
}

main();
