import prevPurchases from '../helpers/prevPurchases';
import filterResults from '../helpers/filterResults';

const fetchAndStore = (cb) => {
  let pageCount = 0;
  let ran = 0;
  let records = [];
  const purchases = prevPurchases();
  purchases.then((result) => {
    // Get total number of pages
    if (result._metadata) {
      pageCount = result._metadata.totalPages;
    }
    if (pageCount >= 1) {
      // Get next pages...
      for (let i = 0; pageCount > i; i += 1) {
        if (i === 6) {
          break;
        }
        const subPurchases = prevPurchases(i);
        subPurchases.then((subResult) => {
          if (subResult.records) {
            
            // Get items that have actually despatched
            const despatchedResults = subResult.records.filter((result) => result.despatched.length > 0);
            const justDespatched = despatchedResults.map((res) => {
              return res.despatched;
            });


            // Filter each order to check for returned OR cancelled status
            const productSkus = filterResults(justDespatched);

            // Push to local Arr.
            records.push(productSkus.flat(2));
            
            // // Store these results in LS.
            localStorage.setItem('BV007-orders', JSON.stringify(records.flat()));

            ran += 1;
            if (ran === pageCount) {
              // Should be ready now
              cb();
            }
          }
        }); 
      }
    }
  });
}; 

export default fetchAndStore;
