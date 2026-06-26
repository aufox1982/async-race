import { API_URL } from '@/constants';
import type { EngineResponse, DriveResponse } from '@/shared/types';

export async function startEngine(id: number): Promise<EngineResponse> {
  const response = await fetch(
    `${API_URL}/engine?id=${id}&status=started`,
    { method: 'PATCH' },
  );
  if (!response.ok) throw new Error(`Failed to start engine for car ${id}`);
  return response.json() as Promise<EngineResponse>;
}

export async function stopEngine(id: number): Promise<EngineResponse> {
  const response = await fetch(
    `${API_URL}/engine?id=${id}&status=stopped`,
    { method: 'PATCH' },
  );
  if (!response.ok) throw new Error(`Failed to stop engine for car ${id}`);
  return response.json() as Promise<EngineResponse>;
}

/**
 * Switches the engine to drive mode.
 *
 * Returns null in two non-error scenarios:
 *  - 500 → engine randomly broke down mid-race (stop animation in place)
 *  - 429 → engine is already driving (not a bug per spec, safe to ignore)
 *
 * An AbortSignal can be passed so the request is cancelled when the user
 * stops the engine or navigates away while a race is in progress.
 */
export async function driveEngine(
  id: number,
  signal?: AbortSignal,
): Promise<DriveResponse | null> {
  const response = await fetch(
    `${API_URL}/engine?id=${id}&status=drive`,
    { method: 'PATCH', signal },
  );

  if (response.status === 500) return null; // car broke down
  if (response.status === 429) return null; // already driving — harmless

  if (!response.ok) throw new Error(`Drive request failed for car ${id}`);
  return response.json() as Promise<DriveResponse>;
}
