// ----
// The data for EJ is in json format, we want it in the format as we had for HS:
//
// 1000772	2 Years
// 1000772	Quartz
// 1000772	Day & Date
// 1000772	Stainless Steel
//
// This file takes 
// ----
const fs = require('fs');
const csv = require('csv-parser');
const { compress } = require('compress-json');

const resultData1 = {}; // skus beginning with 0,1,2,3
const resultData2 = {}; // skus beginning with 4,5,6
const resultData3 = {}; // skus beginning with 7,8,9

fs.readFile('./EJ_json.json', 'utf8', (err, data) => {
  const json = JSON.parse(data);

  let result = '';

  json.forEach((x) => {
    Object.keys(x).forEach((k, idx) => {
      if(k == 'SKU' || k == 'category') {
        return;
      }

      if(x[k]) {
        result += x['SKU'] + "\t" + x[k] + "\n";
      }
    });
  });

  fs.writeFileSync('rawdata.tsv', result);
});
