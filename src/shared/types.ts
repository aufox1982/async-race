// ─── Domain entities ──────────────────────────────────────────────────────────

export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

/** Winner record enriched with the full Car data for display in the table. */
export interface WinnerWithCar extends Winner {
  car: Car;
}

// ─── API response shapes ──────────────────────────────────────────────────────

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export interface DriveResponse {
  success: boolean;
}

/** Generic wrapper that pairs a page of items with the server's total count. */
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
}

// ─── UI / Redux types ─────────────────────────────────────────────────────────

export type SortField = 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';

/**
 * Per-car engine lifecycle:
 *  idle → starting → driving → finished (race winner or normal finish)
 *                            → broken   (API returned 500 on /drive)
 *  any → stopping → idle
 */
export type EngineStatus =
  | 'idle'
  | 'starting'
  | 'driving'
  | 'broken'
  | 'stopping'
  | 'finished';

export interface CarEngineState {
  status: EngineStatus;
  /** Duration in ms, set once the /started response arrives. Used for CSS animation. */
  duration: number;
}
