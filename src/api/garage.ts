import { API_URL, CARS_PER_PAGE } from '@/constants';
import type { Car, PaginatedResponse } from '@/shared/types';

export async function getCars(page: number): Promise<PaginatedResponse<Car>> {
  const response = await fetch(
    `${API_URL}/garage?_page=${page}&_limit=${CARS_PER_PAGE}`,
  );
  if (!response.ok) throw new Error('Failed to fetch cars');
  const totalCount = Number(response.headers.get('X-Total-Count') ?? 0);
  const items = (await response.json()) as Car[];
  return { items, totalCount };
}

export async function getCarById(id: number): Promise<Car> {
  const response = await fetch(`${API_URL}/garage/${id}`);
  if (!response.ok) throw new Error(`Car ${id} not found`);
  return response.json() as Promise<Car>;
}

export async function createCar(name: string, color: string): Promise<Car> {
  const response = await fetch(`${API_URL}/garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
  });
  if (!response.ok) throw new Error('Failed to create car');
  return response.json() as Promise<Car>;
}

export async function updateCar(id: number, name: string, color: string): Promise<Car> {
  const response = await fetch(`${API_URL}/garage/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
  });
  if (!response.ok) throw new Error(`Failed to update car ${id}`);
  return response.json() as Promise<Car>;
}

export async function deleteCar(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/garage/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`Failed to delete car ${id}`);
}
