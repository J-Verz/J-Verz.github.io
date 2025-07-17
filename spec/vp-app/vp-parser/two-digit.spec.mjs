import parse from "../../../vp-app/vp-parser.mjs"

const validVPsToTest = [
  { "vp": "14", "expectedResult": [1, 2, 3, 4] },
  { "vp": "12", "expectedResult": [1, 2] },
  { "vp": "17", "expectedResult": [1, 2, 3, 4, 5, 6, 7] },
  { "vp": "10", "expectedResult": [1, 3] },
  { "vp": "70", "expectedResult": [2, 7] },
  { "vp": "52", "expectedResult": [5, 6, 7, 1, 2] },
];

const invalidVPsToTest = [
  { "vp": "18", "expectedError": "Getallen mogen niet groter dan 7 zijn" },
  { "vp": "91", "expectedError": "Getallen mogen niet groter dan 7 zijn" },
  { "vp": "65", "expectedError": "Getallen moeten oplopen" },
  { "vp": "05", "expectedError": "Bestaat niet" },
];

describe("VP Parser - Two digits", () => {
  validVPsToTest.forEach((_case) => {
    it(`parses '${_case.vp}' correctly`, () => {
      expect(parse(_case.vp)).toEqual(_case.expectedResult);
    });
  });

  invalidVPsToTest.forEach((_case) => {
    it(`throws an error for '${_case.vp}'`, () => {
      expect(() => parse(_case.vp)).toThrow(_case.expectedError);
    });
  });
});
