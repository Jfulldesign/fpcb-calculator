// @flow strict

type PlanID = "U4" | "U1" | "P2" | "C4" | "C2" | "D1";

export type Plan = {|
  id: PlanID,
  title: string,
  prices: {|
    single: Array<number>,
    monthly: Array<number>,
    short: Array<number>
  |}
|};
