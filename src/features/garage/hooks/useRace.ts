import { useEffect, useRef } from 'react';
import { startEngine, driveEngine, stopEngine } from '@/api/engine';
import { saveWinner } from '@/api/winners';
import { useAppDispatch, useAppSelector } from '@/store';
import { setEngineState, setRaceStatus, setWinnerId, resetRace } from '@/store/garageSlice';
import type { Car } from '@/shared/types';

/**
 * Orchestrates the full race for all cars on the current page.
 *
 * Winner detection: watches engineStates in a useEffect.
 * The first car whose status becomes 'finished' while raceStatus is 'racing' wins.
 */
export function useRace(cars: Car[]) {
  const dispatch = useAppDispatch();
  const { engineStates, raceStatus, winnerId } = useAppSelector((s) => s.garage);
  const abortControllersRef = useRef<Map<number, AbortController>>(new Map());
  const winnerSavedRef = useRef(false);

  // Detect winner
  useEffect(() => {
    if (raceStatus !== 'racing' || winnerSavedRef.current) return;
    const winner = cars.find((c) => engineStates[c.id]?.status === 'finished');
    if (!winner || winnerId !== null) return;

    winnerSavedRef.current = true;
    const { duration } = engineStates[winner.id];
    dispatch(setWinnerId(winner.id));
    dispatch(setRaceStatus('finished'));
    void saveWinner(winner.id, duration);
  }, [engineStates, raceStatus, winnerId, cars, dispatch]);

  async function startSingleCar(car: Car) {
    dispatch(setEngineState({ id: car.id, status: 'starting', duration: 0 }));
    try {
      const { velocity, distance } = await startEngine(car.id);
      const duration = distance / velocity;
      dispatch(setEngineState({ id: car.id, status: 'driving', duration }));

      const controller = new AbortController();
      abortControllersRef.current.set(car.id, controller);

      const result = await driveEngine(car.id, controller.signal);
      const status = result === null ? 'broken' : 'finished';
      dispatch(setEngineState({ id: car.id, status, duration }));
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        dispatch(setEngineState({ id: car.id, status: 'broken', duration: 0 }));
      }
    }
  }

  async function startRace() {
    winnerSavedRef.current = false;
    dispatch(resetRace());
    dispatch(setRaceStatus('racing'));
    abortControllersRef.current.clear();
    await Promise.allSettled(cars.map(startSingleCar));
  }

  /** Stops all engines via API and resets Redux race state. */
  async function resetRaceAll() {
    abortControllersRef.current.forEach((c) => c.abort());
    abortControllersRef.current.clear();
    winnerSavedRef.current = false;
    dispatch(resetRace());
    await Promise.allSettled(cars.map((c) => stopEngine(c.id).catch(() => {})));
  }

  /** Closes the winner banner without re-calling stopEngine (race already done). */
  function dismissWinner() {
    winnerSavedRef.current = false;
    dispatch(resetRace());
  }

  return { raceStatus, winnerId, startRace, resetRaceAll, dismissWinner };
}
