module.exports = function triggers (options, cb) { // eslint-disable-line no-unused-vars
  if (!window.Promise) return false;

  // Only run on GB
  if (window.location.href.indexOf('/en-gb/') === -1) return false;

  // Pushchairs and buggies without included footmuffs
  const includedBundles = ['5775as4', '5775552', '5775356', '5775x74', '5775v70', '5775x05', '5492056', '5492u76', '5576t14', '5576t83', '5576v70'];
  const includedSkus = ['781825302', '5492525', '5492525w1', '5955bz400', '584847700', '5939t0400', '302625201', '5535j8300', '2241x0500', '224120704', '557235600', '557254300', '5573x5400', '5572h7400', '657225301', '557330500', '657289801', '557120700', '5572b3100', '5939x7700', '2241x5500', '781887f02', '3026u7700', '539303200', '5392w5700', '5393w5700', '5393w5800', '5393w5701', '125925301', '125952501', '1259k2101', '1259f3001', '1259n5801', '1259m2301', '1259r8201', '1259r4701', '1259r8601', '1259r8501', '1259r8401', '1455p8701', '145525301', '5531u7703', '5531u7702', '557425300', '5847t0400', '5848t0600', '5934bk100', '5934h0400', '5934u7700', '5934bh800', '5492h74w1', '8974j8300', '587200000', '5939t0401', '5939x7701', '5955bz401', '5897w5701', '5959af701', '595925301', '6224t2600', '568525300', '5685p8700', '5685f3000', '568552500', '5685u7700', '6047az101', '6044u7700', '6045u7701', '6045u7700', '568525301', '6046u7700', '6046u7701', '6044h0400', '604696300', '604496300', '6044h0401', '604596300', '6081u7700', '7818u7701', '781825301', '7818u7702', '5847x7700', '5394w5700', '5397w5700', '5398w5701', '5398p7700', '604525300', '604425300', '604625301', '604425301', '604525301', '604625300'];
  const sku = window.universal_variable.product.sku_code;
  const poller = require('@qubit/poller');
  const opts = options.meta;

  /* Check for bundles separately as they may have extra characters on the end
    depending on the option selected */
  const isBundle = (() => {
    const matches = includedBundles.filter(item => sku.indexOf(item) > -1);
    return !!matches.length;
  })();

  function sendGAEvent() {
    const id = opts.variationMasterId;
    const variation = (() => {
      let label;
      switch (id) {
        case 687622:
          label = 'V1';
          break;

        case 702419:
          label = 'V2';
          break;

        default:
          label = 'Control';
          break;
      }
      return label;
    })();

    poller([
      () => {
        try {
          return !!window.ga.getAll(); // Wait for getAll to exist as a function
        } catch (err) {}
      },
    ], () => {
      const trackerName = window.ga.getAll()[0].get('name');
      window.ga(`${trackerName}.send`, 'event', 'MP062', 'Page View', `MP062---${variation}`, { nonInteraction: true });
    });
  }

  if (isBundle || includedSkus.indexOf(sku) > -1) {
    if (!opts.isPreview) sendGAEvent();
    cb();
  }
};
