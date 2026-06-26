import { useRef } from 'react';
import { startEngine, stopEngine, driveEngine } from '@/api/engine';
import { useAppDispatch, useAppSelector } from '@/store';
import { setEngineState } from '@/store/garageSlice';

/**
 * Controls a single car's engine lifecycle.
 *
 * Responsibilities:
 *  - API calls (start / stop / drive)
 *  - Redux state updates (EngineStatus + duration)
 *  - AbortController lifecycle for in-flight drive requests
 *
 * The component (CarRow) watches `engineState.status` and controls
 * the CSS animation — this hook never touches the DOM.
 */
export function useCarEngine(carId: number) {
  const dispatch = useAppDispatch();
  const engineState = useAppSelector((s) => s.garage.engineStates[carId]);
  const abortRef = useRef<AbortController | null>(null);

  async function start() {
    dispatch(setEngineState({ id: carId, status: 'starting', duration: 0 }));
    try {
      const { velocity, distance } = await startEngine(carId);
      const duration = distance / velocity; // milliseconds
      dispatch(setEngineState({ id: carId, status: 'driving', duration }));
      fireDriveRequest(duration);
    } catch {
      dispatch(setEngineState({ id: carId, status: 'idle', duration: 0 }));
    }
  }

  /** Fires PATCH /drive concurrently with the animation — not awaited by caller. */
  function fireDriveRequest(duration: number) {
    abortRef.current = new AbortController();
    driveEngine(carId, abortRef.current.signal)
      .then((result) => {
        const status = result === null ? 'broken' : 'finished';
        dispatch(setEngineState({ id: carId, status, duration }));
      })
      .catch((err: unknown) => {
        if ((err as Error).name !== 'AbortError') {
          dispatch(setEngineState({ id: carId, status: 'broken', duration }));
        }
      });
  }

  async function stop() {
    abortRef.current?.abort();
    dispatch(setEngineState({ id: carId, status: 'stopping', duration: 0 }));
    try {
      await stopEngine(carId);
    } finally {
      dispatch(setEngineState({ id: carId, status: 'idle', duration: 0 }));
    }
  }

  return { engineState, start, stop, abortRef };
}
