# Accessible ReactJS Tic Tac Toe Engine

### _Frontend Technical Assessment Submission_

A production-grade, highly performant browser-based **Tic Tac Toe application** built with **React JS (v19)**. This implementation features an automated strategic computer mode, fully deterministic dual-mode history undo pipelines, session scoreboards, and full **WCAG 2.1 & WAI-ARIA** accessibility standard compliances.

---

## 1. Project Overview

This project is a highly responsive, enterprise-grade implementation of the classic Tic Tac Toe game. It supports both standard local two-player matches and an intelligent single-player mode against a rule-prioritized computer opponent. The application is engineered with an immutable snapshot history stack that powers a contextual multi-turn undo operation. It stands out by strictly implementing accessibility standards, ensuring an inclusive experience for users relying on screen readers or keyboard navigation.

## 2. Tech Stack

- **Core Framework:** React JS (v19.3.1)
- **Build System & Dev Server:** Vite
- **Testing Suite:** Jest, Jest-Environment-JSDOM, and React Testing Library
- **Compilation Pipeline:** Babel (`@babel/preset-env`, `@babel/preset-react`)
- **Styling:** CSS-in-JS (Inline Style Objects for zero external dependency overhead)
- **Code Quality Guardrails:** ESLint (Flat Config environment)

## 3. Features Implemented

- **Interactive 3x3 Game Board:** A locked cell matrix that tracks coordinates accurately and prevents overriding inputs.
- **Dual Game Modes:** Supports standard local **Two Player Mode** and a reactive **Play Against Computer** mode.
- **Strategic AI Engine:** An automated computer opponent programmed with a tactical decision tree (Win, Block, Center, Corners, Fallback).
- **Granular Move History Log:** Displays move index number, player icon token, and human-readable position coordinates (e.g., _Row 2, Column 2_) updated after every turn.
- **Contextual Undo Last Move Pipeline:**
    - In _Two-Player Mode_, it undoes exactly one move.
    - In _Computer Mode_, it rolls back the AI turn and the human move as a paired sequence instantly.
- **Persistent Session Scoreboard:** Tracks X wins, O wins, and draws utilizing `localStorage` memory to survive browser reloads, alongside independent reset systems for both active board workflows and overall score logs.
- **Enterprise Accessibility (WCAG 2.1 Compliance):** Native keyboard tab controls, customized dynamic screen reader descriptors (`aria-label`), and automated state broadcast networks (`aria-live`).

## 4. How to Run the Frontend Locally

Ensure you have [Node.js](https://nodejs.org) installed, then execute these commands in your project root:

### 1. Extract and Install Dependencies

```bash
npm install --legacy-peer-deps
```

> _Note: The `--legacy-peer-deps` flag safely resolves React 19 testing library peer requirements across package trees._

### 2. Launch the Development Server

```bash
npm run dev
```

Open the local server address displayed in your terminal (typically `http://localhost:5173`) inside a laptop browser.

## 5. How to Run Tests

The repository packages a 16-point comprehensive automated assertion testing layout splitting structural unit logic calculations from UI integrations.

Run all tests concurrently via:

```bash
npm test
```

To active the background watch runner for instant sub-second change verification, execute:

```bash
npx jest --watchAll
```

## 6. AI Tools and Prompt Summary

- **AI Tool Utilized:** Specialized AI Collaborator Language Model.
- **Prompt Progression Summary:**
    1. _Initial Request:_ Prompted to build a complete functional spec matching all core features (board layout, undo pipeline, score rules, AI priority tree).
    2. _Refinement & Modularity:_ Ordered to split the architecture out into highly readable, clean, isolated child components (`Board`, `Scoreboard`, `MoveHistory`) when long monolithic text blocks threatened to truncate output limits.
    3. _Testing Suite Hooks:_ Requested automated testing scripts through Jest. Solved issues regarding text matching hooks by introducing regular expression query boundaries.
    4. _Accessibility Standard Enforcement:_ Prompted to apply robust WAI-ARIA grid design rules and `aria-live` announcement regions across all operational files.
    5. _Optimization Phase:_ Directed to stabilize references and prevent wasted re-renders using `React.memo` and `useCallback` frameworks.

## 7. Design Decisions

- **Pure Functional Decoupling:** The win-state evaluator (`calculateGameState`) and AI strategy engine (`getComputerMove`) are completely decoupled from the React rendering engine. This design allows for fast, isolated unit testing without mounting or mocking visual components.
- **Immutable Snapshot Strategy for History:** Rather than writing manual array inversion logic for the undo engine, the history system stores a full state snapshot (`boardState` and `isXNext`) for each turn. This makes undoing moves simple and highly reliable, as the engine just replaces the current board array with a previous array snapshot.
- **Component Memoization Layout:** The grid uses isolated `Cell` components wrapped in `React.memo`. When a player claims a cell, only that specific square re-renders. The other 8 cells skip rendering, keeping memory usage minimal.
- **Semantic Accessible Wrappers:** Picked HTML native elements (like description lists `<dl>` for key-value pair metrics and tables `<table>` for chronological log patterns) rather than standard nested styling divisions (`<div>`) to guarantee assistive tool transparency.

## 8. Clarifications and Assumptions

- **AI Assignment Choice:** The functional spec defines that in computer mode, the Human player is always assigned `X` and plays first, while the computer plays as `O`.
- **AI Delay Injection:** A short 400ms calculation delay (`setTimeout`) was added to the computer's turn sequence. This prevents an instantaneous, jarring layout shift and gives the user a more natural, responsive feel.
- **Score Alteration Invariance:** Assumed that switching game modes mid-session should not reset the overall scoreboard metrics, allowing players to compare scores across different game modes. However, switching modes does clear the active board to keep the state clean.

## 9. Known Limitations

- **Local Storage Domain Binding:** The scoreboard is saved via browser `localStorage`. This memory is isolated to a single browser environment, meaning scores do not synchronize across different devices or incognito sessions.
- **Fixed AI Grid Target Scale:** The tactical AI heuristic logic engine is custom-tailored specifically for a standard 3x3 layout. Scaling the engine to larger grid variants (e.g., 4x4 or 5x5 boards) would require rewriting the combination vector scanners.

## 10. Future Improvements

- **Unbeatable Minimax Engine Integration:** Upgrade the computer's tactical decision tree to a full Minimax lookahead algorithm with alpha-beta pruning, allowing for an "Unbeatable" difficulty setting.
- **Theming Infrastructure:** Add standard high-contrast accessibility visual profiles alongside dark-mode toggle variants to better serve visually sensitive users.
- **Multiplayer Synchronization Engine:** Migrate the standard local two-player game mode into an online room architecture using WebSockets (e.g., Socket.io) for remote cross-device gameplay.
