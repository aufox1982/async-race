import Button from './Button';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

/**
 * Generic pagination control.
 * Knows nothing about what it's paginating — pass current page,
 * total item count, items-per-page, and a callback.
 */
function Pagination({
  currentPage,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / perPage);

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Prev
      </Button>

      <span className={styles.info}>
        Page {currentPage} / {totalPages}
      </span>

      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next →
      </Button>
    </div>
  );
}

export default Pagination;
