// @flow strict

import pluralize from "pluralize";
import { differenceInYears, addYears, getYear, isFuture } from "date-fns";

const currentYear = getYear(new Date());
const cutoff = isFuture(new Date(currentYear, 9, 1))
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
  const age = differenceInYears(new Date(), date);
  if (age === 0) return "an infant";
  if (age > 0 && age < 5) return `${age} ${pluralize("years", age)} old`;
  if (age === 5) return "in Kindergarten";
  if (age > 5 && age < 18) return `in ${ordinal(age - 5)} grade`;
  if (age >= 18) return "grown";
}

export function graduatesIn(date: Date): number {
  return getYear(addYears(date, 18));
}

export function priceIndex(date: Date): ?number {
  if (isFuture(date)) return undefined;
  if (date > cutoff) return 0;
  const age = differenceInYears(new Date(), date);
  return age > 18 ? undefined : age;
}
