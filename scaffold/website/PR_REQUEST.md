# PR: Prepare scaffold for release

## Summary

Prepare the task manager scaffold for review by completing translations, improving source quality, expanding automated coverage, and documenting the project workflow.

## Changes

- Completed the French translation catalog with all 14 English keys.
- Formatted the submit handler and documented the public functions.
- Refactored task rendering and made task text safe to display.
- Added recovery for malformed local storage data.
- Added tests for task operations, filters, rendering, storage, translations, and UI handlers.
- Added README guidance, changelog, and this PR request.

## Quality checklist

- [x] French catalog contains all 14 translation keys.
- [x] Source is consistently formatted.
- [x] `npm run test` passes: 14 tests.
- [x] `npm run test:coverage` passes: 99.56% statements, 100% branches, 100% functions.
- [x] `npm run build` passes.
- [x] Public functions have JSDoc documentation.
- [x] README includes Features, Testing, and Contributing sections.
- [x] CHANGELOG.md is included.

## Validation

```text
npm run test          3 files passed, 14 tests passed
npm run test:coverage 99.56% statements, 100% branches, 100% functions
npm run build         TypeScript compilation and Vite build passed
```

## Conventional commit

`feat: prepare task manager scaffold for pull request`