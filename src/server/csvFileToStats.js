const fs = require("fs");
const csvStringToJson = require("../digest/csvStringToJson");
const statsReducer = require("./statsReducer");

fs.readFile("PrintList.csv", "utf8", (err, data) => {
  if (err) throw err;
  const jsonData = csvStringToJson(data);
  const result = jsonData.reduce(statsReducer);
  console.log(result);
});
