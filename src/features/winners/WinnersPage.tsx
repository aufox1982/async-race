import Pagination from '@/shared/components/Pagination';
import { WINNERS_PER_PAGE } from '@/constants';
import { useWinners } from './hooks/useWinners';
import WinnersTable from './components/WinnersTable';
import styles from './WinnersPage.module.css';

function WinnersPage() {
  const {
    winners,
    totalCount,
    page,
    sort,
    order,
    handleSort,
    handlePageChange,
  } = useWinners();

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Winners</h1>

      <p className={styles.count}>
        Total winners: <strong>{totalCount}</strong>
      </p>

      <WinnersTable
        winners={winners}
        page={page}
        sort={sort}
        order={order}
        onSort={handleSort}
      />

      <Pagination
        currentPage={page}
        totalCount={totalCount}
        perPage={WINNERS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default WinnersPage;
