import { describeChild } from "../maths";

describe("maths", () => {
  describe("describeChild", () => {
    const cutoff = new Date(2018, 9, 1);
    test("invalid", () => {
      const unborn = describeChild(new Date(2020, 1, 1), cutoff);
      const old = describeChild(new Date(2000, 1, 1), cutoff);
      expect(unborn).toBeUndefined();
      expect(old).toBeUndefined();
    });

    test("infant", () => {
      expect(describeChild(new Date(2018, 8, 1), cutoff)).toBe("an infant");
      expect(describeChild(new Date(2018, 9, 1), cutoff)).toBe("an infant");
    });

    test("newborn", () => {
      expect(describeChild(new Date(2018, 10, 1), cutoff)).toBe("a newborn");
    });

    test("matt", () => {
      const first = describeChild(new Date(2012, 8, 18), cutoff);
      const kinder = describeChild(new Date(2012, 9, 18), cutoff);
      expect(first).toBe("in 1st grade");
      expect(kinder).toBe("in Kindergarten");
    });
  });
});
