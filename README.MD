# Async Race

**Self-estimated score: ~290 / 300 pts** *(code-quality 100 pts is reviewer-discretionary and excluded from self-check)*

**Live demo:** https://aufox1982.github.io/async-race/

## Backend

Clone and run the mock server locally before testing:

```bash
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start
```

The server listens on `http://localhost:3000`.

---

## Checklist ≈ 290 / 300 pts (self-assessed)

### 🚀 UI Deployment

- [x] Deployment Platform: UI is deployed on GitHub Pages — https://aufox1982.github.io/async-race/

### ✅ Requirements to Commits and Repository

- [x] Commit guidelines compliance: all commits follow the Conventional Commits format (`feat:`, `fix:`, `refactor:`, `docs:`, etc.)
- [x] Checklist included in README.md
- [x] Score calculation included in README.md
- [x] UI Deployment link in README.md

### Basic Structure (80 points)

- [x] **Two Views (10 points):** "Garage" and "Winners" views implemented with React Router (HashRouter for GH Pages compatibility).
- [x] **Garage View Content (30 points):** Displays view name, car creation & editing panel, race control panel, and garage section with car list.
- [x] **Winners View Content (10 points):** Displays view name ("Winners"), winners table with all required columns, and pagination.
- [x] **Persistent State (30 points):** All state lives in Redux — page numbers, form inputs (createForm / editForm), sort order, and selected car are preserved when navigating between views.

### Garage View (90 points)

- [x] **Car Creation And Editing Panel. CRUD Operations (20 points):** Create, update, and delete cars. Name is validated (empty + too long). Deleting a car also removes it from the winners table.
- [x] **Color Selection (10 points):** Native `<input type="color">` provides an RGB color picker; the chosen color is applied to the SVG car icon immediately.
- [x] **Random Car Creation (20 points):** "Generate" button creates 100 cars at once. Names are assembled from two arrays of 12 parts each (12 brands × 12 models); colors are randomly generated hex values.
- [x] **Car Management Buttons (10 points):** Each car row has Select and Delete buttons. Select populates the edit form; Delete removes the car (blocked during a race).
- [x] **Pagination (10 points):** 7 cars per page, implemented with a shared Pagination component driven by Redux page state.
- [x] **EXTRA — Empty Garage (10 points):** When no cars exist, a friendly "No cars in the garage yet" message is shown instead of an empty list.
- [x] **EXTRA — Empty Page Navigation (10 points):** Deleting the last car on a page automatically navigates to the previous page.

### 🏆 Winners View (50 points)

- [x] **Display Winners (15 points):** After a car wins a race, its record is created (or updated) via the API and appears in the Winners table.
- [x] **Pagination for Winners (10 points):** 10 winners per page.
- [x] **Winners Table (15 points):** Columns: №, car icon (colored SVG), name, wins, best time (seconds). Win count increments on repeat wins; best time is only updated when the new time is faster.
- [x] **Sorting Functionality (10 points):** Clicking "Wins" or "Best Time" column headers sorts the full dataset server-side (via `_sort` / `_order` query params). Clicking the same column toggles ASC ↔ DESC; switching columns resets to DESC.

### 🚗 Race (170 points)

- [x] **Start Engine Animation (20 points):** Clicking A (start) calls `PATCH /engine?status=started`, receives velocity + distance, calculates duration, sets a CSS `animation-duration`, then fires `PATCH /engine?status=drive`. On a 500 response the car freezes at its current position via `getComputedStyle`.
- [x] **Stop Engine Animation (20 points):** Clicking B (stop) aborts the in-flight drive request, calls `PATCH /engine?status=stopped`, and resets the car's transform to `translateX(0)`.
- [x] **Responsive Animation (30 points):** Track width is measured at runtime with `offsetWidth`, so the finish line distance adapts to any screen size down to 500 px.
- [x] **Start Race Button (10 points):** Starts all cars on the current page simultaneously using `Promise.allSettled`.
- [x] **Reset Race Button (15 points):** Aborts all in-flight drive requests, calls `stopEngine` for every car, and resets Redux race state so all cars return to start.
- [x] **Winner Announcement (5 points):** A banner appears naming the first car to reach `status === 'finished'` and showing its time in seconds.
- [x] **Button States (20 points):** Start (A) is disabled unless the car is idle; Stop (B) is disabled when the car is idle or stopping. Race start button is disabled while racing; reset is available once a race has started.
- [x] **Actions during the race (50 points):** Delete button is disabled for all cars while a race is running. The edit form (name input, color picker, Update button) is also fully disabled during a race. This prevents any car data mutation mid-race.

### 🎨 Prettier and ESLint Configuration (10 points)

- [x] **Prettier Setup (5 points):** `.prettierrc` present. `package.json` includes `"format": "prettier --write ."` and `"ci:format": "prettier --check ."`.
- [x] **ESLint Configuration (5 points):** `.eslintrc.cjs` extends `airbnb`, `airbnb-typescript`, and `@typescript-eslint/recommended-requiring-type-checking`. `lint` script runs ESLint with `--max-warnings 0`. `max-lines-per-function` enforced at 40 lines; `no-magic-numbers` warns on unexplained literals.

### 🌟 Overall Code Quality (100 points — reviewer-discretionary, skipped in self-check)

- Modular architecture: API layer (`src/api/`), Redux slices (`src/store/`), feature modules (`src/features/garage/`, `src/features/winners/`), and shared components (`src/shared/`) are cleanly separated.
- Logic extracted into custom hooks: `useCars`, `useCarEngine`, `useRace`, `useWinners`.
- No magic numbers — all constants live in `src/constants/index.ts`.
- TypeScript `strict: true` and `noImplicitAny: true` enforced in `tsconfig.json`.
- Functions kept under 40 lines (enforced by ESLint rule).
