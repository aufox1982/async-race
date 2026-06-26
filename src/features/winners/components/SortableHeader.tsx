import type { SortField, SortOrder } from '@/shared/types';
import styles from './SortableHeader.module.css';

interface SortableHeaderProps {
  field: SortField;
  label: string;
  currentSort: SortField;
  currentOrder: SortOrder;
  onSort: (field: SortField) => void;
}

/**
 * A <th> that toggles server-side sort when clicked.
 * Shows ▲ (ASC) or ▼ (DESC) when this column is active.
 */
function SortableHeader({
  field,
  label,
  currentSort,
  currentOrder,
  onSort,
}: SortableHeaderProps) {
  const isActive = currentSort === field;
  const indicator = isActive ? (currentOrder === 'ASC' ? ' ▲' : ' ▼') : '';

  return (
    <th
      className={`${styles.th} ${isActive ? styles.active : ''}`}
      onClick={() => onSort(field)}
      role="columnheader"
      aria-sort={
        isActive
          ? currentOrder === 'ASC'
            ? 'ascending'
            : 'descending'
          : 'none'
      }
    >
      {label}
      {indicator && <span className={styles.indicator}>{indicator}</span>}
    </th>
  );
}

export default SortableHeader;
