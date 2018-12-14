// @flow strict

import { differenceInYears, addYears, getYear } from "date-fns";

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
  const now = new Date();
  if (date > now) return "unborn!";
  if (date < now) {
    const age = differenceInYears(now, date);
    if (age === 0) return "an infant.";
    if (age > 0 && age < 6) return `${age} years old.`;
    if (age === 6) return "in Kindergarten.";
    if (age > 6) return `in ${ordinal(age - 6)} grade.`;
  }
  return "I dunno.";
}

export function graduatesIn(date: Date): number {
  return getYear(addYears(date, 18));
}
