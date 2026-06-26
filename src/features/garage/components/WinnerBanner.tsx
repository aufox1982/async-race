import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import CarIcon from '@/shared/components/CarIcon';
import Button from '@/shared/components/Button';
import { WINNER_BANNER_DURATION_MS, MS_PER_SECOND, TIME_DECIMAL_PLACES } from '@/constants';
import type { Car } from '@/shared/types';
import styles from './WinnerBanner.module.css';

interface WinnerBannerProps {
  winner: Car;
  duration: number; /** ms */
  onClose: () => void;
}

/**
 * Displayed when a car wins a race.
 * Rendered into document.body via React Portal so it overlays everything.
 * Auto-dismisses after WINNER_BANNER_DURATION_MS.
 */
function WinnerBanner({ winner, duration, onClose }: WinnerBannerProps) {
  const timeSeconds = (duration / MS_PER_SECOND).toFixed(TIME_DECIMAL_PLACES);

  useEffect(() => {
    const timer = setTimeout(onClose, WINNER_BANNER_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.banner}>
        <h2 className={styles.title}>🏆 Winner!</h2>
        <CarIcon color={winner.color} className={styles.car} />
        <p className={styles.name}>{winner.name}</p>
        <p className={styles.time}>{timeSeconds}s</p>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>,
    document.body,
  );
}

export default WinnerBanner;
