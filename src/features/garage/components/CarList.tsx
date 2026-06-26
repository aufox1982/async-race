import Pagination from '@/shared/components/Pagination';
import { CARS_PER_PAGE } from '@/constants';
import type { Car } from '@/shared/types';
import CarRow from './CarRow';
import styles from './CarList.module.css';

interface CarListProps {
  cars: Car[];
  totalCount: number;
  page: number;
  onDelete: (id: number) => Promise<void>;
  onPageChange: (page: number) => void;
}

function CarList({ cars, totalCount, page, onDelete, onPageChange }: CarListProps) {
  if (totalCount === 0) {
    return (
      <div className={styles.empty}>
        <p>No cars in the garage yet.</p>
        <p>Create one above or generate 100 random cars!</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <h2 className={styles.count}>
        Garage <span className={styles.badge}>{totalCount}</span>
      </h2>

      <p className={styles.pageLabel}>Page #{page}</p>

      <div className={styles.cars}>
        {cars.map((car) => (
          <CarRow key={car.id} car={car} onDelete={onDelete} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalCount={totalCount}
        perPage={CARS_PER_PAGE}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default CarList;
