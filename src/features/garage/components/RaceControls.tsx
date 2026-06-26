import Button from '@/shared/components/Button';
import styles from './RaceControls.module.css';

interface RaceControlsProps {
  raceStatus: 'idle' | 'racing' | 'finished';
  onStartRace: () => Promise<void>;
  onResetRace: () => Promise<void>;
  onGenerate: () => Promise<void>;
}

/**
 * Race-level controls: start race, reset race, generate 100 random cars.
 * Buttons are disabled appropriately during each phase.
 */
function RaceControls({
  raceStatus,
  onStartRace,
  onResetRace,
  onGenerate,
}: RaceControlsProps) {
  const isRacing = raceStatus === 'racing';
  const isIdle = raceStatus === 'idle';

  return (
    <div className={styles.controls}>
      <Button
        variant="primary"
        disabled={!isIdle}
        onClick={() => void onStartRace()}
      >
        Race
      </Button>

      <Button
        variant="secondary"
        disabled={isIdle}
        onClick={() => void onResetRace()}
      >
        Reset
      </Button>

      <Button
        variant="secondary"
        disabled={isRacing}
        onClick={() => void onGenerate()}
      >
        Generate 100
      </Button>
    </div>
  );
}

export default RaceControls;
