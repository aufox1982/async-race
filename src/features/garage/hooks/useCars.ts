import { useCallback, useEffect } from 'react';
import {
  getCars,
  createCar,
  updateCar,
  deleteCar,
} from '@/api/garage';
import { deleteWinner } from '@/api/winners';
import { CARS_PER_PAGE, RANDOM_CARS_COUNT } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { setCars, setPage } from '@/store/garageSlice';
import { generateRandomCarName, generateRandomColor } from '../utils';

/** Manages the car list: fetching, CRUD, and random generation. */
export function useCars() {
  const dispatch = useAppDispatch();
  const { page, cars, totalCount } = useAppSelector((s) => s.garage);

  const fetchCars = useCallback(async () => {
    const result = await getCars(page);
    dispatch(setCars({ cars: result.items, totalCount: result.totalCount }));
  }, [page, dispatch]);

  useEffect(() => {
    void fetchCars();
  }, [fetchCars]);

  async function handleCreate(name: string, color: string) {
    await createCar(name, color);
    await fetchCars();
  }

  async function handleUpdate(id: number, name: string, color: string) {
    await updateCar(id, name, color);
    await fetchCars();
  }

  async function handleDelete(id: number) {
    await deleteCar(id);
    // Also remove from winners (404 is silently ignored inside deleteWinner)
    await deleteWinner(id);
    // If the deleted car was the last one on the page, move back one page
    const isLastOnPage = cars.length === 1 && page > 1;
    if (isLastOnPage) {
      dispatch(setPage(page - 1));
    } else {
      await fetchCars();
    }
  }

  async function handleGenerate() {
    const newCars = Array.from({ length: RANDOM_CARS_COUNT }, () => ({
      name: generateRandomCarName(),
      color: generateRandomColor(),
    }));
    await Promise.all(newCars.map((c) => createCar(c.name, c.color)));
    await fetchCars();
  }

  return {
    cars,
    totalCount,
    page,
    perPage: CARS_PER_PAGE,
    fetchCars,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleGenerate,
    onPageChange: (p: number) => dispatch(setPage(p)),
  };
}
