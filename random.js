const fs = require("fs");
 let data;

try {
  // reading a JSON file synchronously
  data = fs.readFileSync("questions.json");
} catch (error) {
  // logging the error
  console.error(error);

  throw error;
}

// parsing the JSON content
const questions = JSON.parse(data);

let randomValue = Math.floor(Math.random() * 222);

// to-do
//check the length of the obj, generated random int by indicated min and max values
//delete answered questions from an obj

console.log(questions[`${randomValue}`]);

