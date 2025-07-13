const threeDigitVPLookup = {
  "10": "103",
  "14*": "104",
  "51*": "105",
  "60": "106",
  "11*": "119",
  "14*": "124",
  "15*": "125",
  "62*": "126",
  "16*": "128",
  "12*": "129",
  "14*": "134",
  "15*": "135",
  "63*": "136",
  "73*": "137",
  "13*": "139",
  "15*": "145",
  "41*": "146",
  "74*": "147",
  "14*": "149",
  "15*": "152",
  "15*": "153",
  "15*": "154",
  "51*": "156",
  "51*": "157",
  "68": "159",
  "16*": "162",
  "16*": "163",
  "16*": "164",
  "16*": "165",
  "16*": "169",
  "20": "204",
  "25*": "205",
  "62*": "206",
  "70": "207",
  "22*": "229",
  "25*": "235",
  "26*": "236",
  "73*": "237",
  "75*": "238",
  "23*": "239",
  "25*": "245",
  "26*": "246",
  "74*": "247",
  "24*": "249",
  "26*": "256",
  "52*": "257",
  "25*": "259",
  "26*": "263",
  "26*": "264",
  "26*": "265",
  "62*": "267",
  "26*": "269",
  "27*": "273",
  "27*": "274",
  "27*": "275",
  "27*": "276",
  "27*": "279",
  "30": "305",
  "36*": "306",
  "73*": "307",
  "31*": "314",
  "31*": "315",
  "75*": "316",
  "31*": "319",
  "33*": "339",
  "36*": "346",
  "74*": "347",
  "16*": "348",
  "34*": "349",
  "36*": "356",
  "37*": "357",
  "35*": "359",
  "37*": "367",
  "36*": "369",
  "37*": "374",
  "37*": "375",
  "37*": "376",
  "37*": "379",
  "40": "406",
  "47*": "407",
  "41*": "415",
  "41*": "416",
  "41*": "417",
  "41*": "419",
  "42*": "425",
  "75*": "426",
  "42*": "429",
  "44*": "449",
  "47*": "457",
  "75*": "458",
  "45*": "459",
  "47*": "467",
  "46*": "469",
  "47*": "479",
  "50": "507",
  "51*": "519",
  "52*": "521",
  "52*": "526",
  "52*": "527",
  "52*": "529",
  "75*": "536",
  "53*": "539",
  "55*": "559",
  "16*": "568",
  "79": "569",
  "57*": "579",
  "61*": "619",
  "62*": "629",
  "63*": "631",
  "63*": "632",
  "63*": "637",
  "63*": "639",
  "64*": "649",
  "66*": "669",
  "27*": "678",
  "69": "679",
  "75*": "718",
  "71*": "719",
  "72*": "729",
  "73*": "739",
  "74*": "741",
  "74*": "742",
  "74*": "743",
  "78": "749",
  "75*": "759",
  "77*": "779"
};

export default function parse(vp) {
  if (threeDigitVPLookup[vp] !== undefined) {
    vp = threeDigitVPLookup[vp];
  }
  vp = stringToArray(vp);
  if (vp.length == 3) {
    return parseThreeDigitVP(vp);
  } else if (vp.length == 2) {
    return parseTwoDigitVP(vp);
  } else {
    throw "Verkeerde lengte";
  }
}

function stringToArray(vp) {
  let parsedVP = vp.split("").map((digit) => parseInt(digit));
  if (parsedVP.some(isNaN)) {
    throw "Bestaat niet";
  }
  return parsedVP;
}

function parseThreeDigitVP(vp) {
  const [x, y, z] = vp;

  switch (true) {
    // first handle some special cases
    case y == 0:
      // x0z
      // only days x and z
      return [x, z];
    case z == 8:
      // xy8
      if (y !== x + 1) {
        throw "Getal y moet gelijk zijn aan x+1"
      }
      // only days x, y, x+3 and y+4
      let days = [x, y, x + 3, y + 4];
      return days.map((day) => day > 7 ? day - 7 : day);
    case z == 9:
      // xy9
      // works like two digit VP (I think?)
      return parseTwoDigitVP([x, y]);
    case isSortedAscending([x, y, z]): // digits are ascending
      // xyz
      // only days x, y and z
      if ([x, y, z].some((digit) => digit == 0)) {
        throw "Bestaat niet";
      }
      return [x, y, z];
    default:
      // xyz
      // days x till y except z
      if ([x, y, z].some((digit) => digit == 0)) {
        throw "Bestaat niet";
      }

      let i = x;
      let result = [i];
      while (i != y) {
        i = (i % 7) + 1;
        if (i !== z) {
          result.push(i);
        }
      }
      return result;
  }
}

function parseTwoDigitVP(vp) {
  const [x, y] = vp;

  if (x == 0) {
    throw "Bestaat niet";
  }

  if ([x, y].some((digit) => digit > 7)) {
    throw "Getallen mogen niet groter dan 7 zijn";
  }

  if (!isSortedAscending([x, y]) && x <= y + 1) {
    throw "Getallen moeten oplopen";
  }

  let result = [x];
  let i = x;
  while (i !== y) {
    i = (i % 7) + 1;
    result.push(i);
  }
  return result;
}

function isSortedAscending(array) {
  return array.every((item, index, array) => index == 0 || item >= array[index - 1]);
}
