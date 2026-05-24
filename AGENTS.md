Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Design & brand:** Before changing UI, layout, colors, or copy patterns, read [DESIGN.md](DESIGN.md) — it defines the Tosaporn Pompan luxury artisan aesthetic, hero rules, and content workflow.

**Auto skills:** When a task matches a skill or project doc below, read and follow it immediately — do not wait for the user to remind you.

| If the user wants… | Auto-read |
|--------------------|-----------|
| UI / hero / luxury styling | [DESIGN.md](DESIGN.md) — **approved look, locked** |
| New product photo or copy | [content/README.md](content/README.md) |
| Cursor rules | create-rule skill |
| PR comments / CI fixes | babysit skill |
| Canvas / rich report output | canvas skill |

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. Dev & deploy (this project)

- **500 / broken page locally:** run `npm run dev:clean` (clears `.next` cache). Kill stale `next dev` processes if ports are in use.
- **Static site:** `output: 'export'` — use `npm run preview` to test `out/`, not `next start`.
- **Vercel:** root directory should be `crochet` if the repo parent is not the app folder.
- **Content changes:** edit `content/site.json` or `content/products.json`, add JPGs to `public/products/`, then push to redeploy.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
