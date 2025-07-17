import parse from "../../../vp-app/vp-parser.mjs"

const validVPsToTest = [
  { "vp": "135", "expectedResult": [1, 3, 5] },
  { "vp": "128", "expectedResult": [1, 2, 4, 6] },
  { "vp": "162", "expectedResult": [1, 3, 4, 5, 6] },
];

const invalidVPsToTest = [
  { "vp": "168", "expectedError": "Getal y moet gelijk zijn aan x+1" },
];

describe("VP Parser - Three digits", () => {
  validVPsToTest.forEach((_case) => {
    it(`can parse ${_case.vp}`, () => {
      expect(parse(_case.vp)).toEqual(_case.expectedResult);
    });
  });

  invalidVPsToTest.forEach((_case) => {
    it(`can parse ${_case.vp}`, () => {
      expect(() => parse(_case.vp)).toThrow(_case.expectedError);
    });
  });
}); 
