import parse from "../../../vp-app/vp-parser.mjs"

const validVPsToTest = [
  { "vp": "135", "expectedResult": [1, 3, 5] },
  { "vp": "128", "expectedResult": [1, 2, 4, 6] },
  { "vp": "718", "expectedResult": [7, 1, 3, 5] },
  { "vp": "162", "expectedResult": [1, 3, 4, 5, 6] },
  { "vp": "169", "expectedResult": [1, 2, 3, 4, 5, 6] },
  { "vp": "107", "expectedResult": [1, 7] },
  { "vp": "176", "expectedResult": [1, 2, 3, 4, 5, 7] },
  { "vp": "742", "expectedResult": [7, 1, 3, 4] },
  { "vp": "476", "expectedResult": [4, 5, 7] },
];

const invalidVPsToTest = [
  { "vp": "168", "expectedError": "Getal y moet gelijk zijn aan x+1" },
  { "vp": "170", "expectedError": "Bestaat niet" },
  { "vp": "000", "expectedError": "Bestaat niet" },
  { "vp": "111", "expectedError": "Bestaat niet" },
  { "vp": "112", "expectedError": "Bestaat niet" },
  { "vp": "999", "expectedError": "Bestaat niet" },
  { "vp": "216", "expectedError": "Bestaat niet" },
  { "vp": "453", "expectedError": "Bestaat niet" },
  { "vp": "714", "expectedError": "Bestaat niet" },
  { "vp": "472", "expectedError": "Bestaat niet" },
  { "vp": "956", "expectedError": "Getallen mogen niet groter dan 7 zijn" },
  { "vp": "9", "expectedError": "Verkeerde lengte" },
  { "vp": "9999", "expectedError": "Verkeerde lengte" },
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
