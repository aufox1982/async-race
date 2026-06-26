import { useEffect, useRef } from 'react';
import Button from '@/shared/components/Button';
import CarIcon from '@/shared/components/CarIcon';
import { CAR_ICON_WIDTH_PX } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { setSelectedCar } from '@/store/garageSlice';
import type { Car } from '@/shared/types';
import { useCarEngine } from '../hooks/useCarEngine';
import styles from './CarRow.module.css';

interface CarRowProps {
  car: Car;
  onDelete: (id: number) => Promise<void>;
}

function CarRow({ car, onDelete }: CarRowProps) {
  const dispatch = useAppDispatch();
  const raceStatus = useAppSelector((s) => s.garage.raceStatus);
  const selectedCar = useAppSelector((s) => s.garage.selectedCar);
  const { engineState, start, stop } = useCarEngine(car.id);

  const carRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const status = engineState?.status ?? 'idle';
  const isRacing = raceStatus === 'racing';

  // Drive animation — triggered by Redux status changes, not by direct API calls
  useEffect(() => {
    const el = carRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    if (status === 'driving' && engineState?.duration) {
      const dist = track.offsetWidth - CAR_ICON_WIDTH_PX;
      el.style.setProperty('--drive-distance', `${dist}px`);
      el.style.animationDuration = `${engineState.duration}ms`;
      el.style.animationName = 'drive';
    }

    if (status === 'broken') {
      // Freeze car at current position by locking computed transform
      const frozen = getComputedStyle(el).transform;
      el.style.animationName = 'none';
      el.style.transform = frozen;
    }

    if (status === 'idle') {
      el.style.animationName = 'none';
      el.style.transform = 'translateX(0)';
      el.style.removeProperty('--drive-distance');
    }
  }, [status, engineState?.duration]);

  const isSelected = selectedCar?.id === car.id;
  const canStart = status === 'idle';
  const canStop = status !== 'idle' && status !== 'stopping';

  return (
    <div className={`${styles.row} ${isSelected ? styles.selected : ''}`}>
      <div className={styles.controls}>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => dispatch(setSelectedCar(isSelected ? null : car))}
        >
          Select
        </Button>
        <Button
          size="sm"
          variant="danger"
          disabled={isRacing}
          onClick={() => void onDelete(car.id)}
        >
          Delete
        </Button>
      </div>

      <span className={styles.name} title={car.name}>{car.name}</span>

      <div className={styles.engineControls}>
        <Button size="sm" variant="primary" disabled={!canStart} onClick={() => void start()}>
          A
        </Button>
        <Button size="sm" variant="secondary" disabled={!canStop} onClick={() => void stop()}>
          B
        </Button>
      </div>

      <div className={styles.track} ref={trackRef}>
        <div className={styles.car} ref={carRef}>
          <CarIcon color={car.color} className={styles.carIcon} />
        </div>
        <span className={styles.flag} aria-label="Finish">🏁</span>
      </div>
    </div>
  );
}

export default CarRow;
