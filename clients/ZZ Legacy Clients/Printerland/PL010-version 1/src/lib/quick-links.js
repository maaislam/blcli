/**
 * @desc Creates Quicklinks
 */

export default function quicklinks () {
  /**
   * @desc Quick Links
   */
  // Quick Link Details
  const quicklinks = {
    colourLaserPrinters : {
      quickLink: 'Colour Laser Printers',
      id: 'colourLaserPrinters',
      url: '/Printers.aspx?papersize=&technology=Laser&type=Colour&extras=&interface=&d=&minPrice=0&maxPrice=16000&Brand=&a=&ds=',
    },
    monoLaserPrinters : {
      quickLink: 'Mono Laser Printers',
      id: 'monoLaserPrinters',
      url: '/Printers.aspx?papersize=&technology=Laser&type=Mono&extras=&interface=&d=&minPrice=0&maxPrice=16000&Brand=&compatible=&a=&ds=',
    },
    A4ColourLaserPrinters : {
      quickLink: 'A4 Colour Laser Printers',
      id: 'A4ColourLaserPrinters',
      url: '/Printers.aspx?papersize=A4&technology=Laser&type=Colour&extras=&interface=&d=&minPrice=0&maxPrice=16000&Brand=&a=&ds=',
    },
    A3ColourLaserPrinters : {
      quickLink: 'A3 Colour Laser Printers',
      id: 'A3ColourLaserPrinters',
      url: '/Printers.aspx?papersize=a3&technology=Laser&type=Colour&extras=&interface=&d=&minPrice=0&maxPrice=16000&Brand=&compatible=&a=&ds=',
    },
    colourLaserPrintersLowRunningCosts : {
      quickLink: 'Colour Laser Printers with Low Running Costs',
      id: 'colourLaserPrintersLowRunningCosts',
      url: '/Colour-Laser-Printers-with-Low-Running-Costs-C32496.aspx',
    },
    wirelessColourLaserPrinters : {
      quickLink: 'Wireless Colour Laser Printers',
      id: 'wirelessColourLaserPrinters',
      url: '/Printers.aspx?papersize=&technology=Laser&type=Colour&extras=&interface=Wireless&d=&minPrice=0&maxPrice=16000&Brand=&compatible=&a=&ds=',
    },
    A4MonoLaserPrinters : {
      quickLink: 'A4 Mono Laser Printers',
      id: 'A4MonoLaserPrinters',
      url: '/Printers.aspx?papersize=A4&technology=Laser&type=Mono&extras=&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=',
    },
    A3MonoLaserPrinters : {
      quickLink: 'A3 Mono Laser Printers',
      id: 'A3MonoLaserPrinters',
      url: '/Printers.aspx?papersize=a3&technology=Laser&type=Mono&extras=&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=',
    },
    monoLaserPrintersLowRunningCosts : {
      quickLink: 'Mono Laser Printers with Low Running Costs',
      id: 'monoLaserPrintersLowRunningCosts',
      url: '/Mono-Laser-Printers-with-Low-Running-Costs-C32498.aspx',
    },
    wirelessMonoLaserPrinters : {
      quickLink: 'Wireless Mono Laser Printers',
      id: 'wirelessMonoLaserPrinters',
      url: '/Printers.aspx?papersize=&technology=Laser&type=Mono&extras=&interface=Wireless&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=',
    },
    lowCostPerPageInkjetPrinters : {
      quickLink: 'Low Cost Per Page Inkjet Printers',
      id: 'lowCostPerPageInkjetPrinters',
      url: '/Low-Cost-Per-Page-Inkjet-Printers-C24765.aspx',
    },
    inkjetPrintersForBusiness : {
      quickLink: 'Inkjet Printers for Business',
      id: 'inkjetPrintersForBusiness',
      url: '/Inkjet-Printers-for-Business-C32043.aspx',
    },
    inkjetPrintersForHome : {
      quickLink: 'Inkjet Printers for Home Use',
      id: 'inkjetPrintersForBusiness',
      url: '/Inkjet-Printers-for-Home-Use-C32044.aspx',
    },
    colourMultifunctionPrinters : {
      quickLink: 'Colour Multifunction Printers',
      id: 'colourMultifunctionPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=Colour&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=&a=&ds=',
    },
    monoMultifunctionPrinters : {
      quickLink: 'Mono Multifunction Printers',
      id: 'monoMultifunctionPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=mono&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=&compatible=&a=&ds=',
    },
    wirelessMultifunctionPrinters : {
      quickLink: 'Wireless Multifuntion Printers',
      id: 'wirelessMultifunctionPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=Wireless&d=&minPrice=0&maxPrice=16000&Brand=&compatible=&a=&ds=',
    },
    airprintCompatiblePrinters : {
      quickLink: 'Airprint Compatible Printers',
      id: 'airprintCompatiblePrinters',
      url: '/Printers.aspx?papersize=&technology=&type=&extras=&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=Airprint&ds=',
    },
    airPrintColourLaserPrinters : {
      quickLink: 'AirPrint Colour Laser Printers',
      id: 'airPrintColourLaserPrinters',
      url: '/Printers.aspx?papersize=&technology=Laser&type=Colour&extras=&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=Airprint&ds=',
    },
    airPrintInkjetPrinters : {
      quickLink: 'AirPrint Inkjet Printers',
      id: 'airPrintInkjetPrinters',
      url: '/Printers.aspx?papersize=&technology=Inkjet&type=&extras=&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=Airprint&ds=',
    },
    A3AirPrintPrinters : {
      quickLink: 'A3 AirPrint Printers',
      id: 'A3AirPrintPrinters',
      url: '/Printers.aspx?papersize=A3&technology=&type=&extras=&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=Airprint&ds=',
    },
    airPrintMultifunctionPrinters : {
      quickLink: 'AirPrint Multifuntion Printers',
      id: 'airPrintMultifunctionPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=Airprint&ds=',
    },
    A3inkjetPrinters : {
      quickLink: 'A3 Inkjet Printers',
      id: 'A3inkjetPrinters',
      url: '/Printers.aspx?papersize=A3&technology=inkjet&type=&extras=&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=',
    },
    A3MultifunctionPrinters : {
      quickLink: 'A3 Multifunction Printers',
      id: 'A3MultifunctionPrinters',
      url: '/Printers.aspx?papersize=A3&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=',
    },
    A3ColourLaserMfpPrinters : {
      quickLink: 'A3 Colour Laser MFP',
      id: 'A3ColourLaserMfpPrinters',
      url: '/Printers.aspx?papersize=A3&technology=Laser&type=Colour&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=&a=&ds=',
    },
    A3MonoLaserMfpPrinters : {
      quickLink: 'A3 Mono Laser MFP',
      id: 'A3MonoLaserMfpPrinters',
      url: '/Printers.aspx?papersize=A3&technology=Laser&type=Mono&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=&compatible=&a=&ds=',
    },
    A3InkjetMfpPrinters : {
      quickLink: 'A3 Inkjet MFP',
      id: 'A3InkjetMfpPrinters',
      url: '/Printers.aspx?papersize=A3&technology=inkjet&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=&compatible=&a=&ds=',
    },
    okiColourMultifunctionPrinters : {
      quickLink: 'OKI Colour Multifunction Printers',
      id: 'okiColourMultifunctionPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=Colour&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=OKI&compatible=&a=&ds=',
    },
    okiMonoMultifunctionPrinters : {
      quickLink: 'OKI Mono Multifunction Printers',
      id: 'okiMonoMultifunctionPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=mono&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=OKI&compatible=&a=&ds=',
    },
    xeroxColourMultifunctionPrinters : {
      quickLink: 'Xerox Colour Multifunction Printers',
      id: 'xeroxColourMultifunctionPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=colour&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Xerox&compatible=&a=&ds=',
    },
    xeroxMonoMultifunctionPrinters : {
      quickLink: 'Xerox Mono Multifunction Printers',
      id: 'xeroxColourMultifunctionPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=mono&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Xerox&compatible=&a=&ds=',
    },
    lexmarkColourLaserMfpPrinters : {
      quickLink: 'Lexmark Colour Laser MFP',
      id: 'lexmarkColourLaserMfpPrinters',
      url: '/Printers.aspx?papersize=&technology=Laser&type=colour&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Lexmark&compatible=&a=&ds=',
    },
    lexmarkMonoLaserMfpPrinters : {
      quickLink: 'Lexmark Mono Laser MFP',
      id: 'lexmarkMonoLaserMfpPrinters',
      url: '/Printers.aspx?papersize=&technology=Laser&type=Mono&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Lexmark&compatible=&a=&ds=',
    },
    samsungColourMultifunctionPrinters : {
      quickLink: 'Samsung Colour Multifunction Printers',
      id: 'samsungColourMultifunctionPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=colour&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Samsung&compatible=&a=&ds=',
    },
    samsungMonoMultifunctionPrinters : {
      quickLink: 'Samsung Mono Multifunction Printers',
      id: 'samsungMonoMultifunctionPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=Mono&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Samsung&compatible=&a=&ds=',
    },
    hpColourMfpPrinters : {
      quickLink: 'HP Colour MFP',
      id: 'hpColourMfpPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=colour&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=HP&compatible=&a=&ds=',
    },
    hpMonoMfpPrinters : {
      quickLink: 'HP Mono MFP',
      id: 'hpMonoMfpPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=Mono&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=HP&compatible=&a=&ds=',
    },
    hpColourLaserMfpPrinters : {
      quickLink: 'HP Colour Laser MFP',
      id: 'hpColourLaserMfpPrinters',
      url: '/Printers.aspx?papersize=&technology=Laser&type=Colour&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=HP&compatible=&a=&ds=',
    },
    hpInkjetMfpPrinters : {
      quickLink: 'HP Inkjet MFP',
      id: 'hpInkjetMfpPrinters',
      url: '/Printers.aspx?papersize=&technology=Inkjet&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=HP&compatible=&a=&ds=',
    },
    kyoceraColourMultifunctionPrinters : {
      quickLink: 'Kyocera Colour Multifunction Printers',
      id: 'kyoceraColourMultifunctionPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=Colour&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Kyocera&compatible=&a=&ds=',
    },
    kyoceraMonoMultifunctionPrinters : {
      quickLink: 'Kyocera Mono Multifunction Printers',
      id: 'kyoceraMonoMultifunctionPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=Mono&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Kyocera&compatible=&a=&ds=',
    },
    epsonColourInkjetPrinters : {
      quickLink: 'Epson Colour Inkjet MFP',
      id: 'epsonColourInkjetPrinters',
      url: '/Printers.aspx?papersize=&technology=Inkjet&type=Colour&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Epson&compatible=&a=&ds=',
    },
    epsonColourLaserPrinters : {
      quickLink: 'Epson Colour Laser MFP',
      id: 'epsonColourLaserPrinters',
      url: '/Printers.aspx?papersize=&technology=Laser&type=Colour&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Epson&compatible=&a=&ds=',
    },
    epsonMonoMfpPrinters : {
      quickLink: 'Epson Mono MFP',
      id: 'epsonMonoMfpPrinters',
      url: '/Printers.aspx?papersize=&technology=&type=Mono&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Epson&compatible=&a=&ds=',
    },
    brotherInkjetMfpPrinters : {
      quickLink: 'Brother Inkjet MFP',
      id: 'brotherInkjetMfpPrinters',
      url: '/Printers.aspx?papersize=&technology=Inkjet&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Brother&compatible=&a=&ds=',
    },
    brotherColourLaserMfpPrinters : {
      quickLink: 'Brother Colour Laser MFP',
      id: 'brotherColourLaserMfpPrinters',
      url: '/Printers.aspx?papersize=&technology=Laser&type=Colour&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Brother&compatible=&a=&ds=',
    },
    brotherColourLaserMfpPrinters : {
      quickLink: 'Brother Colour Laser MFP',
      id: 'brotherColourLaserMfpPrinters',
      url: '/Printers.aspx?papersize=&technology=Laser&type=Colour&extras=Copy&interface=&d=&minPrice=0&maxPrice=16000&Brand=Brother&compatible=&a=&ds=',
    },
  }

  let quicklinkObj1, quicklinkObj2, quicklinkObj3, quicklinkObj4
  URL = window.location.href;

  const pageMatch = [
    {
      matchString: '/Printers.aspx?papersize=&technology=Laser&type=&extras=&interface=&d=&minPrice=0&maxPrice=16000&Brand=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.colourLaserPrinters;
        quicklinkObj2 = quicklinks.monoLaserPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=Laser&type=Colour&extras=&interface=&d=&minPrice=0&maxPrice=16000&Brand=&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.A4ColourLaserPrinters;
        quicklinkObj2 = quicklinks.A3ColourLaserPrinters;
        quicklinkObj3 = quicklinks.colourLaserPrintersLowRunningCosts;
        quicklinkObj4 = quicklinks.wirelessColourLaserPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=Laser&type=mono&extras=&interface=&d=&minPrice=0&maxPrice=16000&Brand=&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.A4MonoLaserPrinters;
        quicklinkObj2 = quicklinks.A3MonoLaserPrinters;
        quicklinkObj3 = quicklinks.monoLaserPrintersLowRunningCosts;
        quicklinkObj4 = quicklinks.wirelessMonoLaserPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=Inkjet&type=&extras=&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.lowCostPerPageInkjetPrinters;
        quicklinkObj2 = quicklinks.inkjetPrintersForBusiness;
        quicklinkObj3 = quicklinks.inkjetPrintersForHome;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.colourMultifunctionPrinters;
        quicklinkObj2 = quicklinks.monoMultifunctionPrinters;
        quicklinkObj3 = quicklinks.wirelessMultifunctionPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=&type=&extras=&interface=Wireless&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.wirelessColourLaserPrinters;
        quicklinkObj2 = quicklinks.wirelessMonoLaserPrinters;
        quicklinkObj3 = quicklinks.wirelessMultifunctionPrinters;
        quicklinkObj4 = quicklinks.airPrintCompatiblePrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=&type=&extras=&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=Airprint&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.airPrintColourLaserPrinters;
        quicklinkObj2 = quicklinks.airPrintInkjetPrinters;
        quicklinkObj3 = quicklinks.A3AirPrintPrinters;
        quicklinkObj4 = quicklinks.airPrintMultifunctionPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=A3&technology=&type=&extras=&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.A3ColourLaserPrinters;
        quicklinkObj2 = quicklinks.A3MonoLaserPrinters;
        quicklinkObj3 = quicklinks.A3inkjetPrinters;
        quicklinkObj4 = quicklinks.A3MultifunctionPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=A3&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.A3ColourLaserMfpPrinters;
        quicklinkObj2 = quicklinks.A3MonoLaserMfpPrinters;
        quicklinkObj3 = quicklinks.A3InkjetMfpPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=OKI&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.okiColourMultifunctionPrinters;
        quicklinkObj2 = quicklinks.okiMonoMultifunctionPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=Xerox&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.xeroxColourMultifunctionPrinters;
        quicklinkObj2 = quicklinks.xeroxMonoMultifunctionPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=Lexmark&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.lexmarkColourLaserMfpPrinters;
        quicklinkObj2 = quicklinks.lexmarkMonoLaserMfpPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=Samsung&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.samsungColourMultifunctionPrinters;
        quicklinkObj2 = quicklinks.samsungMonoMultifunctionPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=HP&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.hpColourMfpPrinters;
        quicklinkObj2 = quicklinks.hpMonoMfpPrinters;
        quicklinkObj3 = quicklinks.hpColourLaserMfpPrinters;
        quicklinkObj4 = quicklinks.hpInkjetMfpPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=Kyocera&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.kyoceraColourMultifunctionPrinters;
        quicklinkObj2 = quicklinks.kyoceraMonoMultifunctionPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=Epson&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.epsonColourInkjetPrinters;
        quicklinkObj2 = quicklinks.epsonColourLaserPrinters;
        quicklinkObj3 = quicklinks.epsonMonoMfpPrinters;
      }
    },
    {
      matchString: '/Printers.aspx?papersize=&technology=&type=&extras=Copy&interface=&d=&minPrice=0&maxPrice=17000&Brand=Brother&compatible=&a=&ds=',
      execute: function() {
        quicklinkObj1 = quicklinks.brotherInkjetMfpPrinters;
        quicklinkObj2 = quicklinks.brotherColourLaserMfpPrinters;
        quicklinkObj3 = quicklinks.brotherColourLaserMfpPrinters;
      }
    },
  ];
  
  let newQuickLink = '';
  let quickLinks;
  pageMatch.forEach((item) => {
    if(URL.indexOf(item.matchString) > -1) {
      item.execute();
      quickLinks = [quicklinkObj1, quicklinkObj2, quicklinkObj3, quicklinkObj4];

      [].forEach.call(quickLinks, (link) => {
        if (link) {
          newQuickLink += `<a class='PL010-link' href='${link.url}'>
          <li class='PL010-link__item' id='PL010-${link.id}'>
            <p class='PL010-link'>${link.quickLink} <span id='${link.id}Count'><span class='PL010-resultsCount'></span></span></p>
            <span class='PL010-rightArrow'></span>
          </li>
          </a>`;
        }
      });
    }
  });

  /**
   * @desc Makes a GET request to a category URL and retrieves the product count
   * @param {String} url URL to retrieve the product count from
   * @param {Function} callback Function to run when the request was successful
   */
  const getProductCount = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            const temp = document.createElement('html');
            temp.innerHTML = request.responseText;
            const productCount = temp.querySelector('.results').innerText;
            callback(productCount);
        }
    };
    request.send();
  };

  // Creates Quick Links
  if (newQuickLink !== '') {
    const quickLinksWrapper = `<div class='PL010-quickLinksWrapper'>
      <div class='PL010-quickLinksContainer'>
        <ul>
          <p class='PL010-links'>Quick links:</p>
          ${newQuickLink}
        </ul>
      </div>
    </div>`;
    document.querySelector('.itemcontainer.leaf_level > .toggle_price').insertAdjacentHTML('afterend', quickLinksWrapper);
  }

  if (quickLinks) {
    [].forEach.call(quickLinks, (link) => {
      if (link) {
        const url = link.url;
        getProductCount(url, (productCount) => {
          document.querySelector(`#${link.id}Count`).innerHTML = `(${productCount})`;
        });
      }
    });
  }
}