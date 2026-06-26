import { API_URL, WINNERS_PER_PAGE } from '@/constants';
import type { Winner, PaginatedResponse, SortField, SortOrder } from '@/shared/types';

export async function getWinners(
  page: number,
  sort: SortField,
  order: SortOrder,
): Promise<PaginatedResponse<Winner>> {
  const url =
    `${API_URL}/winners` +
    `?_page=${page}&_limit=${WINNERS_PER_PAGE}&_sort=${sort}&_order=${order}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch winners');
  const totalCount = Number(response.headers.get('X-Total-Count') ?? 0);
  const items = (await response.json()) as Winner[];
  return { items, totalCount };
}

export async function getWinnerById(id: number): Promise<Winner | null> {
  const response = await fetch(`${API_URL}/winners/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to fetch winner ${id}`);
  return response.json() as Promise<Winner>;
}

export async function createWinner(winner: Winner): Promise<Winner> {
  const response = await fetch(`${API_URL}/winners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winner),
  });
  if (!response.ok) throw new Error('Failed to create winner record');
  return response.json() as Promise<Winner>;
}

export async function updateWinner(
  id: number,
  wins: number,
  time: number,
): Promise<Winner> {
  const response = await fetch(`${API_URL}/winners/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ wins, time }),
  });
  if (!response.ok) throw new Error(`Failed to update winner ${id}`);
  return response.json() as Promise<Winner>;
}

export async function deleteWinner(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/winners/${id}`, {
    method: 'DELETE',
  });
  // 404 is acceptable — the car may never have won a race
  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to delete winner ${id}`);
  }
}

/**
 * Upserts a winner record after a race finish.
 * Increments win count; keeps best time only if it improves.
 */
export async function saveWinner(id: number, timeMs: number): Promise<void> {
  const timeSec = parseFloat((timeMs / 1000).toFixed(2));
  const existing = await getWinnerById(id);

  if (existing === null) {
    await createWinner({ id, wins: 1, time: timeSec });
  } else {
    await updateWinner(
      id,
      existing.wins + 1,
      Math.min(existing.time, timeSec),
    );
  }
}
