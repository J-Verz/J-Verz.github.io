import parse from "../../../vp-app/vp-parser.mjs"

const validVPsToTest = [
  { "vp": "135", "expectedResult": [1, 3, 5] },
  { "vp": "128", "expectedResult": [1, 2, 4, 6] },
  { "vp": "718", "expectedResult": [7, 1, 3, 5] },
  { "vp": "162", "expectedResult": [1, 3, 4, 5, 6] },
  { "vp": "169", "expectedResult": [1, 2, 3, 4, 5, 6] },
  { "vp": "107", "expectedResult": [1, 7] },
  { "vp": "526", "expectedResult": [5, 7, 1, 2] },
  { "vp": "216", "expectedResult": [2, 3, 4, 5, 7, 1] },
];

const invalidVPsToTest = [
  { "vp": "168", "expectedError": "Getal y moet gelijk zijn aan x+1" },
  { "vp": "170", "expectedError": "Bestaat niet" },
  { "vp": "000", "expectedError": "Bestaat niet" },
  { "vp": "111", "expectedError": "Bestaat niet" },
  { "vp": "112", "expectedError": "Bestaat niet" },
  { "vp": "999", "expectedError": "Bestaat niet" },
  { "vp": "956", "expectedError": "Getallen mogen niet groter dan 7 zijn" },
];

describe("VP Parser - Three digits", () => {
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
