// @flow

import pluralize from "pluralize";
import { differenceInYears, addYears, getYear, isFuture } from "date-fns";

const currentYear = getYear(new Date());
export const cutoff = isFuture(new Date(currentYear, 8, 1))
  ? new Date(currentYear, 8, 1)
  : new Date(currentYear, 8, 1);

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

export function describeChild(date: Date, cut?: Date = cutoff): ?string {
  if (isFuture(date)) return;
  const age = differenceInYears(cut, date);
  if (age >= 18) return;
  if (date > cut) return "a newborn";
  if (age === 0) return "an infant";
  if (age > 0 && age < 5) return `${age} ${pluralize("years", age)} old`;
  if (age === 5) return "in Kindergarten";
  if (age > 5 && age < 18) return `in ${ordinal(age - 5)} grade`;
}

export function graduatesIn(date: Date, cut?: Date = cutoff): ?number {
  if (isFuture(date)) return;
  const age = differenceInYears(cut, date);
  if (age > 17) return;
  if (Object.is(age, -0) && date > cut) return getYear(addYears(cut, 19 - age));
  return getYear(addYears(cut, 18 - age));
}

export function getAge(date: Date, cut?: Date = cutoff): number {
  return differenceInYears(cut, date);
}

export function priceIndex(date: Date): number {
  if (isFuture(date)) return 0;
  if (date > cutoff) return 0;
  return differenceInYears(cutoff, date) + 1;
}

export function isValidDate(d: ?Date): boolean {
  return (
    d instanceof Date &&
    !isNaN(d) &&
    !isFuture(d) &&
    differenceInYears(cutoff, d) < 17
  );
}

export function formatMoney(n: number): string {
  return "$" + n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
