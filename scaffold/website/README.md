# Task Manager App

A small task management application built with TypeScript and Vite.

## Features

- Create tasks with low, medium, or high priority.
- Mark tasks as active or completed.
- Filter the list by all, active, or completed tasks.
- Persist tasks in browser local storage.
- Switch between English and French translation catalogs.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Testing

Run the unit test suite:

```bash
npm run test
```

Generate the coverage report:

```bash
npm run test:coverage
```

The test suite covers task operations, rendering, storage, translations, and UI event handlers.

## Contributing

1. Create a branch for your change.
2. Install dependencies with `npm install`.
3. Run `npm run test`, `npm run test:coverage`, and `npm run build`.
4. Keep user-facing strings in both translation catalogs.
5. Open a pull request with a clear summary and test results.
