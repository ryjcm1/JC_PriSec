//Inserts a new price quote into an array of price quotes
const insertPriceQuote = (arrayOfInputs, priceQuotes) => {
  const operator = arrayOfInputs[0];
  const prefix = arrayOfInputs[1];
  const price = parseFloat(arrayOfInputs[2]);
  const newPriceQuote = { operator, prefix, price };

  //edge cases to abort function when there are not enough inputs or when price is not a number
  if (arrayOfInputs.length !== 3 || isNaN(price) || !Array.isArray(priceQuotes))
    return "invalid insert";

  //inserts new price quote object into the array of price quotes when array is empty
  if (priceQuotes.length < 1) {
    priceQuotes.push(newPriceQuote);
    return "inserted into the array of price quotes";

    //checks to see if the price quote already exists within the array
  } else {
    for (priceQuote of priceQuotes) {
      if (
        operator === priceQuote.operator &&
        prefix === priceQuote.prefix &&
        price === priceQuote.price
      ) {
        return "price quote already exists";
      }
    }
  }

  //insert the new price quote into the array if it is unique
  priceQuotes.push(newPriceQuote);
  return "inserted into the array of price quotes";
};

//searches for the longest prefix availiable in the list of price quotes for a given phone number
const queryPhoneNumber = (phoneNumber, listOfPriceQuotes) => {
  //edge case to abort function
  if (typeof phoneNumber !== "string" || !Array.isArray(listOfPriceQuotes))
    return "invalid query";

  //assign temporary value for validation
  let bestPriceQuote = { operator: null, prefix: "", price: null };

  //Sort list by operator
  const sortedListOfPriceQuotes = listOfPriceQuotes.sort(
    (a, b) => a.operator - b.operator
  );

  //iterates the list of price quotes and checks for longest prefix and or best price
  for (priceQuote of sortedListOfPriceQuotes) {
    const prefix = priceQuote.prefix.toString();
    const price = priceQuote.price;
    const operator = priceQuote.operator;

    //matching prefix will be checked with the current bestPriceQuote prefix and compare its length and price
    if (phoneNumber.startsWith(prefix)) {
      //same operator, price is different
      if (operator == bestPriceQuote.operator && price < bestPriceQuote.price) {
        bestPriceQuote = priceQuote;
      }
      //different operator, prefix length is different
      else if (
        operator != bestPriceQuote.operator &&
        prefix.length > bestPriceQuote.prefix.length
      ) {
        bestPriceQuote = priceQuote;
      }
    }
  }

  //outputs query result if a match is found
  return bestPriceQuote.operator
    ? `${phoneNumber} ${bestPriceQuote.operator} ${bestPriceQuote.prefix} ${bestPriceQuote.price}`
    : `${phoneNumber} NA`;
};

module.exports = { insertPriceQuote, queryPhoneNumber };
