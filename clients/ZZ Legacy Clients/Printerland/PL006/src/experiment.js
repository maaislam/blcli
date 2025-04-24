import { fullStory, events } from '../../../../lib/utils';

/**
 * {{PL006}} - {{SEO Side Facet Validation (Null Hypothesis)}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PL006',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const redirects = {
      laserPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=Laser&type=&extras=&interface=&d=&minPrice=0&maxPrice=16000&Brand=&a=&ds=&cat=laser',
      },
      colourLaserPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=Laser&type=Colour&extras=&interface=&d=&minPrice=0&maxPrice=16000&Brand=&compatible=&a=&ds=&cat=laser',
      },
      monoLaserPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=Laser&type=mono&extras=&interface=&d=&minPrice=0&maxPrice=16000&Brand=&compatible=&a=&ds=&cat=laser',
      },
      inkjetPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=Inkjet&type=&extras=&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=&cat=laser',
      },
      allInOnePrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=&cat=laser',
      },
      wirelessPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=&type=&extras=&interface=Wireless&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=&cat=laser',
      },
      airPrintPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=&type=&extras=&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=Airprint&ds=&cat=laser',
      },
      a3Printers: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=A3&technology=&type=&extras=&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=&cat=laser',
      },
      a3AllInOnePrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=A3&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=&cat=laser',
      },
      okiMultiPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=OKI&compatible=&a=&ds=&cat=laser',
      },
      xeroxMultiPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=Xerox&compatible=&a=&ds=&cat=laser',
      },
      lexmarkMultiPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=Lexmark&compatible=&a=&ds=&cat=laser',
      },
      samsungkMultiPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=Samsung&compatible=&a=&ds=&cat=laser',
      },
      hpMultiPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=HP&compatible=&a=&ds=&cat=laser',
      },
      kyoceraMultiPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=Kyocera&compatible=&a=&ds=&cat=laser',
      },
      epsonMultiPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=Epson&compatible=&a=&ds=&cat=laser',
      },
      brotherMultiPrinters: {
        href: 'https://www.printerland.co.uk/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=Brother&compatible=&a=&ds=&cat=laser',
      },
    };

    let printerObj;
    /*eslint-disable */
    const pageMatch = [
      {
        matchString: 'https://www.printerland.co.uk/Laser-Printers-C2.aspx',
        execute: function() {
          printerObj = redirects.laserPrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/Colour-Laser-Printers-C3.aspx',
        execute: function() {
          printerObj = redirects.colourLaserPrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/Mono-Laser-Printers-C4.aspx',
        execute: function() {
          printerObj = redirects.monoLaserPrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/Inkjet-Printers-C8.aspx',
        execute: function() {
          printerObj = redirects.inkjetPrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/Multifunction-Printers-C5.aspx',
        execute: function() {
          printerObj = redirects.allInOnePrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/Wireless-Printers-C23805.aspx',
        execute: function() {
          printerObj = redirects.wirelessPrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/AirPrint-Compatible-Printers-C25128.aspx',
        execute: function() {
          printerObj = redirects.airPrintPrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/A3-Printers-C23718.aspx',
        execute: function() {
          printerObj = redirects.a3Printers;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/A3-MFP-All-in-One-Printers-C23728.aspx',
        execute: function() {
          printerObj = redirects.a3AllInOnePrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/Oki-Multifunction-Printers-C22051.aspx',
        execute: function() {
          printerObj = redirects.okiMultiPrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/Xerox-Multifunction-Printers-C11349.aspx',
        execute: function() {
          printerObj = redirects.xeroxMultiPrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/Lexmark-Multifunction-Laser-Printers-C22052.aspx',
        execute: function() {
          printerObj = redirects.lexmarkMultiPrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/Samsung-Multifunction-Printers-C22055.aspx',
        execute: function() {
          printerObj = redirects.samsungMultiPrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/HP-Multifunction-Printers-C22054.aspx',
        execute: function() {
          printerObj = redirects.hpMultiPrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/Kyocera-Multifunction-Printers-C11307.aspx',
        execute: function() {
          printerObj = redirects.kyoceraMultiPrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/Epson-Multifunction-Printers-C11326.aspx',
        execute: function() {
          printerObj = redirects.epsonMultiPrinters;
        },
      },
      {
        matchString: 'https://www.printerland.co.uk/Brother-Multifunction-Printers-C11815.aspx',
        execute: function() {
          printerObj = redirects.brotherMultiPrinters;
        },
      },
    ];
    /* eslint-enable */

    pageMatch.forEach((item) => {
      if (window.location.href.indexOf(item.matchString) > -1) {
        item.execute();
        const redirectUrl = printerObj.href;
        const loaderContent = `<div class='PL006-loader'><p class='PL006-loadingText'>Checking Stock Levels...</p></div>`;// eslint-disable-line quotes
        document.querySelector('div.form_master').insertAdjacentHTML('beforebegin', loaderContent);
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1000);
      }
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
