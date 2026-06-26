// API
export const API_URL = import.meta.env.VITE_API_URL as string;

// Pagination
export const CARS_PER_PAGE = 7;
export const WINNERS_PER_PAGE = 10;

// Race
export const RANDOM_CARS_COUNT = 100;
export const MS_PER_SECOND = 1000;

// Car name generation — at least 10 parts each (task requirement)
export const CAR_BRANDS = [
  'Tesla',
  'Ford',
  'BMW',
  'Mercedes',
  'Audi',
  'Toyota',
  'Honda',
  'Chevrolet',
  'Dodge',
  'Ferrari',
  'Lamborghini',
  'Porsche',
] as const;

export const CAR_MODELS = [
  'Model S',
  'Mustang',
  'M3',
  'C63 AMG',
  'RS6',
  'Supra',
  'Civic Type R',
  'Camaro',
  'Challenger',
  'F40',
  'Huracan',
  '911 GT3',
] as const;

// Default color for new cars
export const DEFAULT_CAR_COLOR = '#e74c3c';
