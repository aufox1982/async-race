import { useCallback, useEffect } from 'react';
import { getWinners } from '@/api/winners';
import { getCarById } from '@/api/garage';
import { useAppDispatch, useAppSelector } from '@/store';
import { setWinners, setWinnersPage, setSort } from '@/store/winnersSlice';
import type { SortField } from '@/shared/types';

/**
 * Fetches the current page of winners and enriches each record with car data.
 *
 * Why parallel enrichment: /winners returns {id, wins, time} only.
 * We need car name + color for the table. Fetching all 10 cars concurrently
 * with Promise.all costs one render cycle and avoids a waterfall.
 */
export function useWinners() {
  const dispatch = useAppDispatch();
  const { winners, totalCount, page, sort, order } = useAppSelector(
    (s) => s.winners,
  );

  const fetchWinners = useCallback(async () => {
    const { items, totalCount: count } = await getWinners(page, sort, order);

    // Enrich each winner record with its car data in parallel
    const cars = await Promise.all(items.map((w) => getCarById(w.id)));
    const enriched = items.map((w, i) => ({ ...w, car: cars[i] }));

    dispatch(setWinners({ winners: enriched, totalCount: count }));
  }, [page, sort, order, dispatch]);

  // Re-fetches automatically when page, sort, or order changes
  useEffect(() => {
    void fetchWinners();
  }, [fetchWinners]);

  function handleSort(field: SortField) {
    dispatch(setSort(field)); // toggles order if same field, resets to DESC otherwise
  }

  function handlePageChange(p: number) {
    dispatch(setWinnersPage(p));
  }

  return {
    winners,
    totalCount,
    page,
    sort,
    order,
    handleSort,
    handlePageChange,
  };
}
