var Airtable = require('airtable');

var Merchoid = new Promise((res, rej) => {
  var base = new Airtable({apiKey: 'keyudhIxxIM29ffdI'}).base('app0xcLqVRnuqHXtl');
  base('Initiatives').select({
      // Selecting the first 3 records in Measurement:
      // maxRecords: 40,
      view: "Measurement"
  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      // records.forEach(function(record) {
      // console.log('RECORD!, ', record);
      // console.log('Retrieved', record.get('Initiative'));
      //     res(record);
      // });
      res(records);
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

  }, function done(err) {
      
      if (err) { 
        console.error(err); 
        rej(err);
        return; 
      }
  });
});

var Technogym = new Promise((res, rej) => {
  var base = new Airtable({apiKey: 'keyudhIxxIM29ffdI'}).base('appoxLKntbvGozw1j');
  base('Initiatives').select({
      // Selecting the first 3 records in Measurement:
      // maxRecords: 40,
      view: "Measurement"
  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      res(records);

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

  }, function done(err) {
      if (err) { 
        console.error(err); 
        rej(err);
        return; 
      }
  });
});

Promise.all([Merchoid, Technogym]).then((result) => {
  console.log(result);
});