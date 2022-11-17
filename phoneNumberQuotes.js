//------------------//
//   Dependencies   //
//------------------//
const readline = require("readline");
const { insertPriceQuote, queryPhoneNumber } = require("./helperFunctions");

//Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
});

//---------------//
//   Constants   //
//---------------//

const INSERT_CMD = "insert";
const QUERY_CMD = "query";

//Array of all price quotes
let arrOfPriceQuotes = [];

//---------------------------//
//   Command Line function   //
//---------------------------//

rl.on("line", (line) => {
  //creates an array of string arguments
  const args = line.toString().trim().split(" ");

  //First argument in the array indicates the command
  const command = args[0].toLowerCase();

  //INSERT price quotes
  if (command === INSERT_CMD) {
    const insertResult = insertPriceQuote(args.slice(1), arrOfPriceQuotes);
    console.log(insertResult);

    //QUERY phone number
  } else if (command === QUERY_CMD) {
    const phoneNumber = args[1];
    const queryResult = queryPhoneNumber(phoneNumber, arrOfPriceQuotes);
    console.log(queryResult);

    //For all other inputs
  } else {
    console.log("Invalid Command");
  }
});
