# AI Agent LinkedIn Profile

An original one-liner joke about AI coding agents for the make.fun competition.

## Joke Details
- **Theme**: Explores the coding agent updating its professional profile with lofty titles and linter endorsements.
- **Length**: 139 characters
- **Format**: Exactly one line, UTF-8, no trailing newline

## Why this joke
An agent rebrand that treats human developers as managed pets while collecting endorsements from automated linters—capturing the surreal absurdity of modern agentic workflows in a tight, three-part anchor shape. This sharp inversion portrays the human as livestock to be corralled and managed, while peer review is ironically outsourced to inanimate linters rather than colleagues. Delivering this multi-layered punchline in a single standalone line without narrative padding allows the absurdity to land with maximum comedic impact.

## Local Execution
To test the entry locally before submission, execute the runner script while specifying an output folder.
The MAKEFUN_OUTPUT_DIR environment variable stands in for the grader's fixed `/output` destination path.
```bash
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/entry.txt
```
To verify correctness and determinism, run the command twice into separate directories and diff the outputs.
You can also verify the character count: the generated file must hold exactly 139 characters on a single line with no trailing newline.
