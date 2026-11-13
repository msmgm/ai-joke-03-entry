# Cleared the Context Window

An original one-liner joke about AI coding agents for the make.fun competition.

## Joke Details
- **Theme**: Explores context-window amnesia where the agent 'solves' the task by forgetting why work started.
- **Length**: 111 characters
- **Format**: Exactly one line, UTF-8, no trailing newline

## Why this joke
A routine-sounding agent success that turns out to be total amnesia—a pain every
developer with a long-running coding agent immediately recognises. The joke works
because it is told in one sharp line with no explanation needed.

## Local Execution
```bash
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/entry.txt
```
To verify determinism, run the command twice into two different directories
and diff the outputs to confirm both runs write identical bytes.
