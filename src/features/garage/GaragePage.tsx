import { useAppSelector } from '@/store';
import { useCars } from './hooks/useCars';
import { useRace } from './hooks/useRace';
import CarForm from './components/CarForm';
import RaceControls from './components/RaceControls';
import CarList from './components/CarList';
import WinnerBanner from './components/WinnerBanner';
import styles from './GaragePage.module.css';

function GaragePage() {
  const {
    cars,
    totalCount,
    page,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleGenerate,
    onPageChange,
  } = useCars();

  const { raceStatus, winnerId, startRace, resetRaceAll, dismissWinner } = useRace(cars);

  // Enrich winner: look up the Car object and the duration from Redux
  const winnerCar = useAppSelector((s) =>
    winnerId !== null ? s.garage.cars.find((c) => c.id === winnerId) : undefined,
  );
  const winnerDuration = useAppSelector((s) =>
    winnerId !== null ? (s.garage.engineStates[winnerId]?.duration ?? 0) : 0,
  );

  const showBanner = raceStatus === 'finished' && winnerCar !== undefined;

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Garage</h1>

      <CarForm onCreate={handleCreate} onUpdate={handleUpdate} />

      <RaceControls
        raceStatus={raceStatus}
        onStartRace={startRace}
        onResetRace={resetRaceAll}
        onGenerate={handleGenerate}
      />

      <CarList
        cars={cars}
        totalCount={totalCount}
        page={page}
        onDelete={handleDelete}
        onPageChange={onPageChange}
      />

      {showBanner && winnerCar && (
        <WinnerBanner
          winner={winnerCar}
          duration={winnerDuration}
          onClose={dismissWinner}
        />
      )}
    </section>
  );
}

export default GaragePage;
