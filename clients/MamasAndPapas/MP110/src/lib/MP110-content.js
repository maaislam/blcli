/**
 * @desc Creates Quicklinks
 */

export default function highPriorityProducts () {
  /**
   * @desc Product SKUs
   */
  const products = {
    parasols : {
      skus: ['5728t1401', '2062x0501', '5728v7001', '206225301', '206230500', '2062x5400', '5387t5300', '8951f3800'],
    },
    bouncers : {
      skus: ['210105500', '4591u7700', '449946201', '4011g4801', '210125300', '210104200', '4011by400', '4591cn705'],
    },
    blankets : {
      skus: ['7831v0700', '783135000', '785002702', '780109401', '7883d4102', '7883f3903', '392490900', '7883b0800'],
    },
    cots : {
      skus: ['ctpe02700', 'cbat65100', 'cbatay600', 'cbjuc6000', 'cblwc6000', 'pkms46800', 'cbsp98600', 'pkms03300'],
    },
  }

  let productsObj
  URL = window.location.href;

  const pageMatch = [
    {
      matchString: '/en-gb/c/parasols-raincovers',
      result: 
        products.parasols.skus,
    },
    {
      matchString: '/en-gb/c/rockers-bouncers-swings',
      result:
        products.bouncers.skus,
    },
    {
      matchString: '/en-gb/c/blankets',
      result:
        products.blankets.skus,
    },
    {
      matchString: '/en-gb/c/cots-cribs-cotbeds',
      result:
        products.cots.skus,
    },
  ];
  
  let productSkus = null;
  pageMatch.forEach((item) => {
    if(URL.indexOf(item.matchString) > -1) {
      productSkus = item.result;
    }
  });
  return productSkus;
}