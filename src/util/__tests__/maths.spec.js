import { describeChild } from "../maths";

describe("maths", () => {
  describe("describeChild", () => {
    const cutoff = new Date("9/1/2018");
    test("invalid", () => {
      const unborn = describeChild(new Date("1/1/2020"), cutoff);
      const old = describeChild(new Date("1/1/2000"), cutoff);
      expect(unborn).toBeUndefined();
      expect(old).toBeUndefined();
    });

    test("infant", () => {
      expect(describeChild(new Date("8/1/2018"), cutoff)).toBe("an infant");
      expect(describeChild(new Date("9/1/2018"), cutoff)).toBe("an infant");
    });

    test("newborn", () => {
      expect(describeChild(new Date("10/1/2018"), cutoff)).toBe("a newborn");
    });

    test("matt", () => {
      const first = describeChild(new Date("8/18/2012"), cutoff);
      const kinder = describeChild(new Date("9/18/2012"), cutoff);
      expect(first).toBe("in 1st grade");
      expect(kinder).toBe("in Kindergarten");
    });
  });
});
