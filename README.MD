# Async Race

**Live demo:** https://aufox1982.github.io/async-race/

**Self-estimated score: ~375/400 pts** (code quality 100 pts excluded from self-check — reviewer discretion)

---

## Backend

Clone and run the server locally before using the app:

```bash
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start
```

The server starts on `http://localhost:3000`. The frontend reads `VITE_API_URL` from `.env`.

---

## Checklist ~375/400 pts

### 🚀 UI Deployment

- [x] **Deployment Platform:** Deployed to GitHub Pages — https://aufox1982.github.io/async-race/

### ✅ Requirements to Commits and Repository

- [x] **Commit guidelines compliance:** All commits follow Conventional Commits format (`feat:`, `fix:`, `refactor:`, `docs:`, etc.), present tense, imperative mood.
- [x] **Checklist included in README.md:** This file.
- [x] **Score calculation:** ~375/400 pts (self-check, excluding 100 pt reviewer code quality).
- [x] **UI Deployment link in README.md:** Link at the top of this file.

---

### Basic Structure — 80/80 pts

- [x] **Two Views (10 pts):** "Garage" (`/#/garage`) and "Winners" (`/#/winners`) implemented with React Router v6 and HashRouter (required for GitHub Pages).
- [x] **Garage View Content (30 pts):** Displays: view name ("Garage"), car creation and editing panel (CarForm), race control panel (RaceControls), and garage section (CarList with car rows, total count, and pagination).
- [x] **Winners View Content (10 pts):** Displays: view name ("Winners"), winners table with all required columns, and pagination.
- [x] **Persistent State (30 pts):** All UI state (page numbers, form inputs, sort order, engine states) lives in Redux store and persists across view switches without any reset.

---

### Garage View — 90/90 pts

- [x] **Car Creation And Editing Panel / CRUD (20 pts):** Create, update, and delete cars via REST API. Name validated for empty string and length >50 characters. Deleting a car also removes its winner record (cascade delete).
- [x] **Color Selection (10 pts):** `<input type="color">` RGB picker; selected color is shown live on the car SVG icon.
- [x] **Random Car Creation (20 pts):** "Generate 100" button creates 100 cars with random names assembled from two arrays — 12 brands × 12 models (≥10 each per requirement) — and random hex colors.
- [x] **Car Management Buttons (10 pts):** Each car row has "Select" (loads car into edit form) and "Delete" (removes car; Delete is disabled during a race).
- [x] **Pagination (10 pts):** 7 cars per page; page number persists when navigating between views.
- [x] **Empty Garage (extra +10 pts):** When the garage has no cars, a user-friendly message is shown: "No cars in the garage yet. Create one above or generate 100 random cars!"
- [x] **Empty Garage Page (extra +10 pts):** Deleting the last car on a page (when `page > 1`) automatically decrements the page so the user never sees an empty numbered page.

---

### 🏆 Winners View — 50/50 pts

- [x] **Display Winners (15 pts):** After a race the winner is upserted into the winners store. Winner data appears in the Winners table automatically.
- [x] **Pagination for Winners (10 pts):** 10 winners per page; page number persists across view switches.
- [x] **Winners Table (15 pts):** Columns: №, car SVG icon (color-matched), name, wins, best time in seconds. Win count increments on every win; best time is only updated if the new time is faster than the stored one.
- [x] **Sorting Functionality (10 pts):** Click column headers "Wins" or "Best Time" to sort ascending/descending. Sorting is applied server-side via `?_sort=wins&_order=ASC` query params so it applies to the full dataset, not just the current page.

---

### 🚗 Race — ~145/170 pts

- [x] **Start Engine Animation (20 pts):** Clicking "A" calls `PATCH /engine?status=started` to get velocity and distance, then fires `PATCH /engine?status=drive` concurrently with the CSS animation. Animation duration is calculated as `distance / velocity` ms. If drive returns HTTP 500 (car broke down), the car freezes at its current position.
- [x] **Stop Engine Animation (20 pts):** Clicking "B" calls `PATCH /engine?status=stopped`, cancels the in-flight drive request via `AbortController`, and returns the car to its start position.
- [x] **Responsive Animation (30 pts):** Car travel distance is computed at runtime from `track.offsetWidth - CAR_ICON_WIDTH_PX`, so animations scale correctly on any screen width down to 500px (`min-width: 500px` set globally).
- [x] **Start Race Button (10 pts):** "Race" starts all cars on the current page simultaneously using `Promise.allSettled`. Button is disabled while race is in progress or finished.
- [x] **Reset Race Button (15 pts):** "Reset" aborts all in-flight drive requests, calls `stopEngine` for every car in parallel, and resets all positions and Redux state. Disabled when race is idle.
- [x] **Winner Announcement (5 pts):** A full-screen React Portal overlay announces the winning car's name and finish time. Auto-dismisses after 4 seconds; can also be closed manually.
- [x] **Button States (20 pts):** "A" disabled when engine is not idle; "B" disabled when engine is idle or stopping; "Race" disabled unless `raceStatus === 'idle'`; "Reset" disabled when `raceStatus === 'idle'`; "Generate 100" and "Delete" disabled during a race.
- [x] **Actions During Race (50 pts):** Delete and Generate are blocked during a race. The edit form (name input, color picker, Update button) is disabled during a race. Car creation is not blocked (adding a car mid-race is safe — it does not join the current race). Page/view navigation is not blocked; the race continues in Redux state when switching views and resumes correctly on return.

---

### 🎨 Prettier and ESLint — 10/10 pts

- [x] **Prettier Setup (5 pts):** `format` script for auto-formatting and `ci:format` script for CI checks, both in `package.json`. `.prettierrc` configured with `singleQuote`, `semi`, `trailingComma: "all"`, `printWidth: 100`.
- [x] **ESLint Configuration (5 pts):** Extends `airbnb` + `airbnb-typescript`. `lint` script in `package.json`. `max-lines-per-function: 40` enforced as error. `no-magic-numbers` enforced as warning. Strict TypeScript settings (`strict: true`, `noImplicitAny: true`, `noUnusedLocals: true`, `noUnusedParameters: true`) in `tsconfig.json`.

---

### 🌟 Overall Code Quality — (reviewer, up to 100 pts)

- **Modular Design:** Clear layer separation — `src/api/` (HTTP), `src/store/` (Redux slices), `src/features/` (UI by domain), `src/shared/` (reusable components/types).
- **Function Modularization:** Business logic extracted into custom hooks (`useRace`, `useCarEngine`, `useCars`, `useWinners`). Helper functions in `utils.ts`. No function exceeds 40 lines (enforced by ESLint).
- **No Magic Numbers/Strings:** All constants in `src/constants/index.ts` — pagination limits, animation dimensions, timeouts, brand/model arrays.
- **Readability:** Descriptive names, JSDoc on non-obvious functions, TypeScript strict typing throughout. All types defined in `src/shared/types.ts`.
- **Extra Features:** Custom hooks, React Portal (winner banner), React Router v6, `AbortController` for cancellation, `Promise.allSettled` for parallel races.
