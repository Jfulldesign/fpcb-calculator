import { describeChild } from "../maths";

describe("maths", () => {
  describe("describeChild", () => {
    test("unborn", () => {
      // date > now
      expect(describeChild(new Date(2020, 1, 1))).toBe("unborn");
    });

    test("newborn", () => {
      // cutoff < date > now
      expect(describeChild(new Date())).toBe("a newborn");
    });

    test("infant", () => {
      // cutoff > date < 1 year
      expect(describeChild(new Date(2018, 6, 1))).toBe("an infant");
    });

    test("age 1", () => {
      expect(describeChild(new Date(2017, 9, 16))).toBe("1 year old");
    });

    test("age 2", () => {
      expect(describeChild(new Date(2016, 9, 16))).toBe("2 years old");
    });

    test("age 3", () => {
      expect(describeChild(new Date(2015, 9, 16))).toBe("3 years old");
    });

    test("age 4", () => {
      expect(describeChild(new Date(2014, 9, 16))).toBe("4 years old");
    });

    test("kindergarten", () => {
      expect(describeChild(new Date(2013, 9, 16))).toBe("in Kindergarten");
    });

    test("1st grade", () => {
      expect(describeChild(new Date(2012, 9, 16))).toBe("in 1st grade");
    });

    test("2nd grade", () => {
      expect(describeChild(new Date(2011, 9, 16))).toBe("in 2nd grade");
    });

    test("3rd grade", () => {
      expect(describeChild(new Date(2010, 9, 16))).toBe("in 3rd grade");
    });

    test("4th grade", () => {
      expect(describeChild(new Date(2009, 9, 16))).toBe("in 4th grade");
    });

    test("5th grade", () => {
      expect(describeChild(new Date(2008, 9, 16))).toBe("in 5th grade");
    });

    test("6th grade", () => {
      expect(describeChild(new Date(2007, 9, 16))).toBe("in 6th grade");
    });

    test("7th grade", () => {
      expect(describeChild(new Date(2006, 9, 16))).toBe("in 7th grade");
    });

    test("8th grade", () => {
      expect(describeChild(new Date(2005, 9, 16))).toBe("in 8th grade");
    });

    test("9th grade", () => {
      expect(describeChild(new Date(2004, 9, 16))).toBe("in 9th grade");
    });

    test("10th grade", () => {
      expect(describeChild(new Date(2003, 9, 16))).toBe("in 10th grade");
    });

    test("11th grade", () => {
      expect(describeChild(new Date(2002, 9, 16))).toBe("in 11th grade");
    });

    test("12th grade", () => {
      expect(describeChild(new Date(2001, 9, 16))).toBe("in 12th grade");
    });

    test("invalid; too old", () => {
      expect(describeChild(new Date(2000, 9, 16))).toBe("grown");
    });
  });
});
