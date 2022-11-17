const { insertPriceQuote, queryPhoneNumber } = require("../helperFunctions");

describe("Tests for the helper function: InsertPriceQuote", () => {
  test("invalid number of arguments should output an error message (less than three)", () => {
    const mockInsertInputs = ["A", "123"];
    const listOfPriceQuotes = [
      { operator: "A", prefix: "1", price: 0.85 },
      { operator: "A", prefix: "17", price: 2.23 },
      { operator: "A", prefix: "1787", price: 2.86 },
      { operator: "A", prefix: "81", price: 0.0 },
      { operator: "B", prefix: "1", price: 1.0 },
      { operator: "B", prefix: "178", price: 2.0 },
      { operator: "B", prefix: "44", price: 3.0 },
    ];

    expect(insertPriceQuote(mockInsertInputs, listOfPriceQuotes)).toMatch(
      /invalid insert/
    );
  });

  test("invalid number of arguments should output an error message (more than three)", () => {
    const mockInsertInputs = ["A", "123", "4", "extra input"];
    let listOfPriceQuotes = [
      { operator: "A", prefix: "1", price: 0.85 },
      { operator: "A", prefix: "17", price: 2.23 },
      { operator: "A", prefix: "1787", price: 2.86 },
      { operator: "A", prefix: "81", price: 0.0 },
      { operator: "B", prefix: "1", price: 1.0 },
      { operator: "B", prefix: "178", price: 2.0 },
      { operator: "B", prefix: "44", price: 3.0 },
    ];

    expect(insertPriceQuote(mockInsertInputs, listOfPriceQuotes)).toMatch(
      /invalid insert/
    );
  });

  test("invalid data type for the list of price quote should result in an error message", () => {
    const mockInsertInputs = ["A", "123", "4", "extra input"];
    let listOfPriceQuotes = "not an array";

    expect(insertPriceQuote(mockInsertInputs, listOfPriceQuotes)).toMatch(
      /invalid insert/
    );
  });

  test("non-number inserted into the price argument should output an error message", () => {
    const mockInsertInputs = ["A", "123", "not a number"];
    let listOfPriceQuotes = [
      { operator: "A", prefix: "1", price: 0.85 },
      { operator: "A", prefix: "17", price: 2.23 },
      { operator: "A", prefix: "1787", price: 2.86 },
      { operator: "A", prefix: "81", price: 0.0 },
      { operator: "B", prefix: "1", price: 1.0 },
      { operator: "B", prefix: "178", price: 2.0 },
      { operator: "B", prefix: "44", price: 3.0 },
    ];

    expect(insertPriceQuote(mockInsertInputs, listOfPriceQuotes)).toMatch(
      /invalid insert/
    );
  });

  test("inserting into an empty list of price quotes", () => {
    const mockInsertInputs = ["A", "123", "5"];
    let listOfPriceQuotes = [];

    const insertResult = insertPriceQuote(mockInsertInputs, listOfPriceQuotes);

    expect(listOfPriceQuotes.length).toEqual(1);
  });

  test("Inserting an entry that already exists should output an error message", () => {
    const mockInsertInputs = ["A", "1", "0.85"];
    let listOfPriceQuotes = [
      { operator: "A", prefix: "1", price: 0.85 },
      { operator: "A", prefix: "17", price: 2.23 },
      { operator: "A", prefix: "1787", price: 2.86 },
      { operator: "A", prefix: "81", price: 0.0 },
      { operator: "B", prefix: "1", price: 1.0 },
      { operator: "B", prefix: "178", price: 2.0 },
      { operator: "B", prefix: "44", price: 3.0 },
    ];

    expect(insertPriceQuote(mockInsertInputs, listOfPriceQuotes)).toMatch(
      /price quote already exists/
    );
  });

  test("Inserting an entry into a list of price quotes", () => {
    const mockInsertInputs = ["C", "123", "14"];
    let listOfPriceQuotes = [
      { operator: "A", prefix: "1", price: 0.85 },
      { operator: "A", prefix: "17", price: 2.23 },
      { operator: "A", prefix: "1787", price: 2.86 },
      { operator: "A", prefix: "81", price: 0.0 },
      { operator: "B", prefix: "1", price: 1.0 },
      { operator: "B", prefix: "178", price: 2.0 },
      { operator: "B", prefix: "44", price: 3.0 },
    ];

    const insertResult = insertPriceQuote(mockInsertInputs, listOfPriceQuotes);

    expect(listOfPriceQuotes).toEqual([
      { operator: "A", prefix: "1", price: 0.85 },
      { operator: "A", prefix: "17", price: 2.23 },
      { operator: "A", prefix: "1787", price: 2.86 },
      { operator: "A", prefix: "81", price: 0.0 },
      { operator: "B", prefix: "1", price: 1.0 },
      { operator: "B", prefix: "178", price: 2.0 },
      { operator: "B", prefix: "44", price: 3.0 },
      { operator: "C", prefix: "123", price: 14 },
    ]);
  });
});

describe("Tests for helper function: queryPhoneNumber", () => {
  test("non string variable as a phone number argument should return an error message", () => {
    const phoneNumber = 123;
    const listOfPriceQuotes = [
      { operator: "A", prefix: "1", price: 0.85 },
      { operator: "A", prefix: "17", price: 2.23 },
      { operator: "A", prefix: "1787", price: 2.86 },
      { operator: "A", prefix: "81", price: 0.0 },
      { operator: "B", prefix: "1", price: 1.0 },
      { operator: "B", prefix: "178", price: 2.0 },
      { operator: "B", prefix: "44", price: 3.0 },
    ];

    expect(queryPhoneNumber(phoneNumber, listOfPriceQuotes)).toMatch(
      /invalid query/
    );
  });

  test("When list of price quotes is not an array and error message should be output", () => {
    const phoneNumber = "123";
    const listOfPriceQuotes = "not an array";

    expect(queryPhoneNumber(phoneNumber, listOfPriceQuotes)).toMatch(
      /invalid query/
    );
  });

  test("When no match is found", () => {
    const phoneNumber = "999";
    const listOfPriceQuotes = [
      { operator: "A", prefix: "1", price: 0.85 },
      { operator: "A", prefix: "17", price: 2.23 },
      { operator: "A", prefix: "1787", price: 2.86 },
      { operator: "A", prefix: "81", price: 0.0 },
      { operator: "B", prefix: "1", price: 1.0 },
      { operator: "B", prefix: "178", price: 2.0 },
      { operator: "B", prefix: "44", price: 3.0 },
    ];

    expect(queryPhoneNumber(phoneNumber, listOfPriceQuotes)).toMatch(/999 NA/);
  });

  test("Only one match is found", () => {
    const phoneNumber = "44567";
    const listOfPriceQuotes = [
      { operator: "A", prefix: "1", price: 0.85 },
      { operator: "A", prefix: "17", price: 2.23 },
      { operator: "A", prefix: "1787", price: 2.86 },
      { operator: "A", prefix: "81", price: 0.0 },
      { operator: "B", prefix: "1", price: 1.0 },
      { operator: "B", prefix: "178", price: 2.0 },
      { operator: "B", prefix: "44", price: 3.0 },
    ];

    expect(queryPhoneNumber(phoneNumber, listOfPriceQuotes)).toMatch(
      /44567 B 44 3/
    );
  });

  test("Multiple matches found, cheaper one is selected", () => {
    const phoneNumber = "1725473";
    const listOfPriceQuotes = [
      { operator: "A", prefix: "1", price: 0.85 },
      { operator: "A", prefix: "17", price: 2.23 },
      { operator: "A", prefix: "1787", price: 2.86 },
      { operator: "A", prefix: "81", price: 0.0 },
      { operator: "B", prefix: "1", price: 1.0 },
      { operator: "B", prefix: "178", price: 2.0 },
      { operator: "B", prefix: "44", price: 3.0 },
      { operator: "C", prefix: "17", price: 2.22 },
    ];

    expect(queryPhoneNumber(phoneNumber, listOfPriceQuotes)).toMatch(
      /1725473 C 17 2.22/
    );
  });

  test("Multiple matches found, longest prefix is selected", () => {
    const phoneNumber = "178742";
    const listOfPriceQuotes = [
      { operator: "A", prefix: "1", price: 0.85 },
      { operator: "A", prefix: "17", price: 2.23 },
      { operator: "A", prefix: "1787", price: 2.86 },
      { operator: "A", prefix: "81", price: 0.0 },
      { operator: "B", prefix: "1", price: 1.0 },
      { operator: "B", prefix: "178", price: 2.0 },
      { operator: "B", prefix: "44", price: 3.0 },
      { operator: "C", prefix: "17", price: 2.22 },
    ];

    expect(queryPhoneNumber(phoneNumber, listOfPriceQuotes)).toMatch(
      /178742 A 1787 2.86/
    );
  });
});
