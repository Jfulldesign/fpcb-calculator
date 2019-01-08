// @flow strict

type PlanID = "U4" | "U1" | "P2" | "C4" | "C2" | "D1";

export type PaymentSchedule = "single" | "monthly" | "short";
export type Plan = {|
  id: PlanID,
  title: string,
  description: string,
  dorm: boolean,
  note?: string,
  prices: {|
    single: Array<number>,
    monthly: Array<number>,
    short: Array<number>
  |},
  credits: {|
    state: number,
    college: number
  |}
|};
