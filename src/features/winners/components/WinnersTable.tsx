import CarIcon from '@/shared/components/CarIcon';
import { WINNERS_PER_PAGE } from '@/constants';
import type { WinnerWithCar, SortField, SortOrder } from '@/shared/types';
import SortableHeader from './SortableHeader';
import styles from './WinnersTable.module.css';

interface WinnersTableProps {
  winners: WinnerWithCar[];
  page: number;
  sort: SortField;
  order: SortOrder;
  onSort: (field: SortField) => void;
}

function WinnersTable({ winners, page, sort, order, onSort }: WinnersTableProps) {
  if (winners.length === 0) {
    return (
      <p className={styles.empty}>
        No winners yet — start a race on the Garage page!
      </p>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>#</th>
          <th className={styles.th}>Car</th>
          <th className={styles.th}>Name</th>
          <SortableHeader
            field="wins"
            label="Wins"
            currentSort={sort}
            currentOrder={order}
            onSort={onSort}
          />
          <SortableHeader
            field="time"
            label="Best Time"
            currentSort={sort}
            currentOrder={order}
            onSort={onSort}
          />
        </tr>
      </thead>

      <tbody>
        {winners.map((winner, index) => {
          const globalRank = (page - 1) * WINNERS_PER_PAGE + index + 1;
          return (
            <tr key={winner.id} className={styles.row}>
              <td className={styles.td}>{globalRank}</td>
              <td className={styles.td}>
                <CarIcon color={winner.car.color} className={styles.carIcon} />
              </td>
              <td className={styles.td}>{winner.car.name}</td>
              <td className={styles.td}>{winner.wins}</td>
              <td className={styles.td}>{winner.time}s</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default WinnersTable;
