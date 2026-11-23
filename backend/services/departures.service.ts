/**
 * Departure Dates & Seat Availability Business Rules
 * Enforces:
 * - 0 <= available_seats <= capacity
 * - Automatic status categorization (available, few_seats, sold_out)
 * - Informational timestamping (no automated seat lock)
 */

import { DepartureStatus, PackageDeparture } from '@backend/types/database.types';

export function computeDepartureStatus(capacity: number, availableSeats: number): DepartureStatus {
  if (availableSeats <= 0) {
    return 'sold_out';
  }
  if (availableSeats <= 5) {
    return 'few_seats';
  }
  return 'available';
}

export function validateDepartureData(
  capacity: number,
  availableSeats: number,
  departureDate: string
): { valid: boolean; error?: string } {
  if (capacity < 1) {
    return { valid: false, error: 'Capacity must be at least 1.' };
  }
  if (availableSeats < 0) {
    return { valid: false, error: 'Available seats cannot be negative.' };
  }
  if (availableSeats > capacity) {
    return { valid: false, error: 'Available seats cannot exceed total capacity.' };
  }

  const parsedDate = new Date(departureDate);
  if (isNaN(parsedDate.getTime())) {
    return { valid: false, error: 'Invalid departure date format.' };
  }

  return { valid: true };
}

export function isDepartureUpcoming(departureDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const depDate = new Date(departureDate);
  return depDate >= today;
}
