// @flow strict

import React from "react";
import type { Plan, PlanID } from "util/types.flow.js";
import award from "assets/icon-award.png";

export const PLANS: Map<PlanID, Plan> = new Map([
  [
    "U4",
    {
      id: "U4",
      title: "4-Year University Plan",
      description:
        "Covers a Bachelor’s Degree at a State University, allowing your student to graduate debt free.",
      dorm: true,
      note: (
        <span className="note-inner">
          <span className="icon">
            <img src={award} />
          </span>
          Most Popular
        </span>
      ),
      credits: {
        state: 120,
        college: 0
      },
      prices: {
        single: [
          29471.26,
          29472.26,
          29466.16,
          29447.83,
          29418.97,
          29374.97,
          29312.56,
          29231.63,
          29134.57,
          29024.67,
          28901.39,
          28770.84,
          28638.61,
          28502.3,
          28360.86,
          28207.92,
          28026.68,
          27796.51,
          27470.67
        ],
        monthly: [
          186.28,
          191.76,
          198.14,
          205.7,
          214.37,
          224.54,
          236.52,
          250.92,
          268.14,
          289.27,
          315.65,
          349.56,
          394.18,
          455.38,
          543.99,
          682.89,
          929.5,
          1487.14,
          3950.22
        ],
        short: [
          565.31,
          565.31,
          565.19,
          564.84,
          564.29,
          563.44,
          562.25,
          560.69,
          558.83,
          556.72,
          554.36,
          551.86,
          549.32,
          546.71,
          543.99
        ]
      }
    }
  ],
  [
    "U1",
    {
      id: "U1",
      title: "1-Year University Plan",
      description:
        "Covers one year of State University tuition and can be bought separately, allowing family members to contribute to college savings.",
      dorm: true,
      credits: {
        state: 30,
        college: 0
      },
      prices: {
        single: [
          7373.92,
          7373.92,
          7373.92,
          7367.18,
          7361.47,
          7353.59,
          7343.19,
          7325.9,
          7300.47,
          7273.83,
          7244.44,
          7214.11,
          7177.1,
          7139.95,
          7109.76,
          7077.17,
          7035.52,
          6992.29,
          6936.93
        ],
        monthly: [
          46.61,
          47.98,
          49.59,
          51.46,
          53.64,
          56.21,
          59.25,
          62.88,
          67.19,
          72.49,
          79.12,
          87.65,
          98.78,
          114.08,
          136.37,
          171.33,
          233.33,
          374.09,
          997.52
        ],
        short: [
          141.44,
          141.44,
          141.44,
          141.31,
          141.2,
          141.05,
          140.85,
          140.52,
          140.03,
          139.52,
          138.96,
          138.37,
          137.66,
          136.95,
          136.37
        ]
      }
    }
  ],
  [
    "P2",
    {
      id: "P2",
      title: "2 + 2 Florida Plan",
      description:
        "Covers a Bachelor’s Degree from a State University for less by starting at a State College and transferring to a State University.",
      dorm: true,
      credits: {
        state: 60,
        college: 60
      },
      prices: {
        single: [
          23644.14,
          23613.12,
          23569.81,
          23518.57,
          23457.15,
          23383.83,
          23295.58,
          23190.64,
          23073.8,
          22946.2,
          22811.46,
          22668.88,
          22418.09,
          22187.81,
          22041.98,
          21891.69,
          21724.38,
          21534.2,
          21303.07
        ],
        monthly: [
          149.45,
          153.64,
          158.49,
          164.29,
          170.93,
          178.74,
          187.97,
          199.07,
          212.36,
          228.69,
          249.14,
          275.43,
          308.56,
          354.5,
          422.79,
          529.98,
          720.48,
          1152.1,
          3063.33
        ],
        short: [
          453.52,
          452.93,
          452.09,
          451.11,
          449.93,
          448.53,
          446.83,
          444.82,
          442.58,
          440.13,
          437.55,
          434.81,
          430.0,
          425.59,
          422.79
        ]
      }
    }
  ],
  [
    "C4",
    {
      id: "C4",
      title: "4-Year Florida College Plan",
      description:
        "Covers the equivalent of a Bachelor’s Degree. Students attending Florida colleges are guaranteed admission to state universities.",
      dorm: false,
      credits: {
        state: 0,
        college: 120
      },
      prices: {
        single: [
          18924.02,
          18924.02,
          18924.02,
          18853.57,
          18783.12,
          18687.4,
          18606.94,
          18522.52,
          18459.47,
          18340.29,
          18209.03,
          17940.0,
          17715.35,
          17628.9,
          17538.28,
          17428.12,
          17261.91,
          16931.93,
          16694.32
        ],
        monthly: [
          119.61,
          123.13,
          127.25,
          131.7,
          136.87,
          142.84,
          150.14,
          159.0,
          169.89,
          182.79,
          198.87,
          217.97,
          243.83,
          281.66,
          336.4,
          421.92,
          572.49,
          905.87,
          2400.61
        ],
        short: [
          362.98,
          362.98,
          362.98,
          361.63,
          360.28,
          358.44,
          356.9,
          355.28,
          354.07,
          351.79,
          349.27,
          344.11,
          339.8,
          338.14,
          336.4
        ]
      }
    }
  ],
  [
    "C2",
    {
      id: "C2",
      title: "2-Year Florida College Plan",
      description:
        "Covers the equivalent of an Associate’s Degree. Students attending Florida colleges are guaranteed admission to state universities.",
      dorm: false,
      credits: {
        state: 0,
        college: 60
      },
      prices: {
        single: [
          8767.54,
          8728.67,
          8689.44,
          8655.11,
          8620.8,
          8596.37,
          8595.65,
          8539.58,
          8477.37,
          8423.3,
          8364.3,
          8300.03,
          8148.65,
          8129.22,
          8075.28,
          7987.68,
          7879.29,
          7786.42,
          7717.3
        ],
        monthly: [
          55.42,
          56.79,
          58.43,
          60.46,
          62.82,
          65.71,
          69.36,
          73.3,
          78.02,
          83.95,
          91.35,
          100.84,
          112.16,
          129.88,
          154.89,
          193.37,
          261.31,
          416.58,
          1109.73
        ],
        short: [
          168.17,
          167.43,
          166.67,
          166.01,
          165.36,
          164.89,
          164.87,
          163.8,
          162.61,
          161.57,
          160.44,
          159.2,
          156.3,
          155.93,
          154.89
        ]
      }
    }
  ],
  [
    "D1",
    {
      id: "D1",
      title: "University Dormitory Plan One Year",
      credits: {
        state: 0,
        college: 0
      },
      prices: {
        single: [
          7576.71,
          7576.71,
          7576.71,
          7509.64,
          7467.28,
          7467.28,
          7441.91,
          7370.03,
          7333.99,
          7276.28,
          7231.64,
          7220.25,
          7197.17,
          7124.57,
          7041.81,
          6977.26,
          6898.47,
          6792.35,
          6659.17
        ],
        monthly: [
          47.89,
          49.3,
          50.95,
          52.46,
          54.41,
          57.08,
          60.05,
          63.26,
          67.5,
          72.52,
          78.98,
          87.73,
          99.06,
          113.83,
          135.07,
          168.91,
          228.79,
          363.4,
          957.57
        ],
        short: [
          145.33,
          145.33,
          145.33,
          144.04,
          143.23,
          143.23,
          142.74,
          141.37,
          140.67,
          139.57,
          138.71,
          138.49,
          138.05,
          136.66,
          135.07
        ]
      }
    }
  ]
]);