// @flow

import pluralize from "pluralize";
import { differenceInYears, addYears, getYear, isFuture } from "date-fns";

const currentYear = getYear(new Date());
export const cutoff = isFuture(new Date(currentYear, 9, 1))
  ? new Date(currentYear - 1, 9, 1)
  : new Date(currentYear, 9, 1);

export function ordinal(i: number): string {
  const j = i % 10;
  const k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

export function describeChild(date: Date) {
  if (isFuture(date)) return "unborn";
  if (date > cutoff) return "a newborn";
  const age = differenceInYears(cutoff, date);
  if (age === 0) return "an infant";
  if (age > 0 && age < 5) return `${age} ${pluralize("years", age)} old`;
  if (age === 5) return "in Kindergarten";
  if (age > 5 && age < 18) return `in ${ordinal(age - 5)} grade`;
  if (age >= 18) return "grown";
}

export function graduatesIn(date: Date): number {
  return getYear(addYears(date, 18));
}

export function priceIndex(date: Date): number {
  if (isFuture(date)) return 0;
  return differenceInYears(new Date(), date);
}

export function isValidDate(d: ?Date): boolean {
  return (
    d instanceof Date &&
    !isNaN(d) &&
    !isFuture(d) &&
    differenceInYears(new Date(), d) < 18
  );
}
