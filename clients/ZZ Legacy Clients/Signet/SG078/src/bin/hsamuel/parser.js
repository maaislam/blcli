// ----
// Parse the raw data
//
// To run this: `node parser.js`
// ----
const fs = require('fs');
const csv = require('csv-parser');
const { compress } = require('compress-json');

const resultData1 = {}; // skus beginning with 0,1,2,3
const resultData2 = {}; // skus beginning with 4,5,6
const resultData3 = {}; // skus beginning with 7,8,9

fs.createReadStream('rawdata.tsv')
  .pipe(csv({ separator: '\t', headers: ['sku', 'attribute'] }))
  .on('data', (data) => {
    const sku = data.sku;
    const attribute = data.attribute;

    if(sku.match(/^[0-3]/)) {
      if(!resultData1[sku]) {
        resultData1[sku] = [];
      }

      resultData1[sku].push(attribute);
    } else if(sku.match(/^[4-6]/)) {
      if(!resultData2[sku]) {
        resultData2[sku] = [];
      }

      resultData2[sku].push(attribute);
    } else {
      if(!resultData3[sku]) {
        resultData3[sku] = [];
      }

      resultData3[sku].push(attribute);
    }
  })
  .on('end', () => {
    fs.writeFileSync('outputData1.json', JSON.stringify(compress(resultData1)));
    fs.writeFileSync('outputData2.json', JSON.stringify(compress(resultData2)));
    fs.writeFileSync('outputData3.json', JSON.stringify(compress(resultData3)));
  })
