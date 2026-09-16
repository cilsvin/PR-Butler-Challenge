---
name: pr-butler
description: Automate comprehensive pre-commit / PR preparation — translations, code cleanup, tests, documentation, and quality gates.
---

## Overview

The PR Butler automates the complete pre-commit checklist for web projects, ensuring code is ship-ready before PR submission. It orchestrates translation fixes, code cleanup, test generation, documentation updates, and quality validation in a single pass.

### When to Invoke

- User runs "prepare for PR" or "pre-commit check"
- User asks to "fix the scaffold" or "make this PR-ready"
- Before any pull request submission

---

## Instructions

<!-- 
  YOUR TASK: Fill in the detailed step-by-step instructions for each of the 6 steps below.
  Each step should tell the AI agent exactly what to do, what files to touch, 
  and what output to produce. Be specific — vague instructions produce vague results.
-->

### Step 1: Translation Detection & Fix

- Compare keys in src/translations/en.json vs src/translations/fr.json
- Generate missing French translations using context from the English values
- Update fr.json — validate all 14 keys are present

### Step 2: Code Cleanup

- Format all source files consistently (Prettier or equivalent)
- Fix auto-fixable lint violations
- Fix the handleSubmit function formatting in main.ts

### Step 3: Test Automation

- Run existing tests: npm run test
- Generate test cases for: toggleTask, deleteTask, setFilter, render, saveToStorage, loadFromStorage
- Re-run to confirm all pass
- Achieve >80% coverage: npm run test:coverage

### Step 4: Documentation Updates

| Document | What to Do |
|----------|-----------|
| **Source docstrings** | JSDoc/TSDoc on all 9 undocumented public functions in `src/` |
| **`scaffold/website/README.md`** | Add Features, Testing, and Contributing sections |
| **`CHANGELOG.md`** | Summarize all fixes made by the Skill |
| **`PR_REQUEST.md`** | Conventional PR description with title, summary, checklist, coverage report |

### Step 5: Quality Gates

- Coverage ≥ 80% — fail if below
- Zero critical lint errors
- All tests pass
- If any gate fails: report the failure and stop

### Step 6: PR Preparation

- Generate a conventional commit message from the changes
- Finalize `PR_REQUEST.md` with all quality metrics
- Confirm all Step 4 deliverables are complete

---

## Examples

<!-- 
  YOUR TASK: Provide at least 2 example scenarios showing input and expected output.
  Example: "Make the scaffold PR-ready" → what the agent reports at each step.
-->

### Example 1: Full PR Preparation

**Input:** "Make the scaffold PR-ready"

**Expected output:**

OVERALL: 6 / 6 steps passed
GRADE: A

### Example 2: Translation-Only Run

**Input:** "Fix the missing French translations"

**Expected output:** "Added the 12 missing French translations in fr.json. All 14 keys are now present."

---

## Success Criteria

<!-- 
  YOUR TASK: Define the checklist the agent uses to verify everything passed.
  At minimum, cover all 6 steps.
-->

- [ ] All 14 French translation keys present in `fr.json`
- [ ] Code formatted consistently
- [ ] No lint violations
- [ ] Test coverage ≥ 80%
- [ ] All tests pass
- [ ] JSDoc/TSDoc on all public functions
- [ ] `README.md` has Features, Testing, and Contributing sections
- [ ] `CHANGELOG.md` generated
- [ ] `PR_REQUEST.md` generated with summary and checklist
- [ ] Conventional commit message prepared

---

<!-- ⚠️ DO NOT MODIFY ANYTHING BELOW THIS LINE ⚠️ -->
<!-- ================================================ -->
<!-- REPORT CARD — Auto-grading step                  -->
<!-- This step runs automatically after your Skill    -->
<!-- completes. It generates a progress report card   -->
<!-- so you can track how well your Skill is doing.   -->
<!-- ================================================ -->

## Step 7: Report Card (Do Not Modify)

After completing all steps above, generate a **Report Card** summarizing the results. Output the report card in the following exact format:

```
═══════════════════════════════════════════════
  PR BUTLER — REPORT CARD
═══════════════════════════════════════════════

  📋 Step 1: Translation Detection & Fix
     Status:  [PASS / FAIL]
     Details: [X of 14 French keys added to fr.json]

  📋 Step 2: Code Cleanup
     Status:  [PASS / FAIL]
     Details: [X files formatted, X lint violations fixed]

  📋 Step 3: Test Automation
     Status:  [PASS / FAIL]
     Details: [Coverage: X% → Y%, X new test cases added]

  📋 Step 4: Documentation Updates
     Status:  [PASS / FAIL]
     Details: [X functions documented, README updated: Y/N,
               CHANGELOG.md: Y/N, PR_REQUEST.md: Y/N]

  📋 Step 5: Quality Gates
     Status:  [PASS / FAIL]
     Details: [Coverage ≥ 80%: Y/N, Lint clean: Y/N,
               All tests pass: Y/N]

  📋 Step 6: PR Preparation
     Status:  [PASS / FAIL]
     Details: [Commit message: Y/N, PR_REQUEST.md finalized: Y/N]

  ─────────────────────────────────────────────
  OVERALL:   [X / 6 steps passed]
  GRADE:     [A / B / C / F]
             A = 6/6 passed
             B = 5/6 passed
             C = 4/6 passed
             F = 3 or fewer passed
═══════════════════════════════════════════════
```

**Grading rules:**
- A step passes only if ALL its success criteria are met
- Do not skip any step in the report — mark it FAIL if not attempted
- Be honest in the details — the evaluator will verify against actual file contents
- Output this report card as the very last thing your Skill does
