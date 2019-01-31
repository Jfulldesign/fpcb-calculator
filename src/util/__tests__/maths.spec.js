import { describeChild, graduatesIn } from "../maths";

const cutoff = new Date("9/1/2018");

describe("maths", () => {
  describe("describeChild", () => {
    test("returns undefined for invalid dates", () => {
      const unborn = describeChild(new Date("1/1/2020"), cutoff);
      const old = describeChild(new Date("1/1/2000"), cutoff);
      expect(unborn).toBeUndefined();
      expect(old).toBeUndefined();
    });

    test("describes infant", () => {
      expect(describeChild(new Date("8/1/2018"), cutoff)).toBe("an infant");
      expect(describeChild(new Date("9/1/2018"), cutoff)).toBe("an infant");
    });

    test("describes newborn", () => {
      expect(describeChild(new Date("9/2/2018"), cutoff)).toBe("a newborn");
    });

    test("describes matt", () => {
      const first = describeChild(new Date("8/18/2012"), cutoff);
      const kinder = describeChild(new Date("9/18/2012"), cutoff);
      expect(first).toBe("in 1st grade");
      expect(kinder).toBe("in Kindergarten");
    });

    test("describes ages", () => {
      const one = describeChild(new Date("1/1/2017"), cutoff);
      const two = describeChild(new Date("1/1/2016"), cutoff);
      expect(one).toBe("1 year old");
      expect(two).toBe("2 years old");
    });
  });

  describe("graduatesIn", () => {
    test("newborn", () => {
      const newborn = graduatesIn(new Date("9/1/2018"), cutoff);
      expect(newborn).toBe(2037);
    });

    test("infant", () => {
      const infant = graduatesIn(new Date("9/2/2018"), cutoff);
      const infantPlus = graduatesIn(new Date("1/1/2019"), cutoff);
      expect(infant).toBe(2036);
      expect(infantPlus).toBe(2036);
    });

    test("one", () => {
      const one = graduatesIn(new Date("9/1/2017"), cutoff);
      expect(one).toBe(2035);
    });

    test("two", () => {
      const two = graduatesIn(new Date("9/1/2016"), cutoff);
      expect(two).toBe(2034);
    });
  });
});
