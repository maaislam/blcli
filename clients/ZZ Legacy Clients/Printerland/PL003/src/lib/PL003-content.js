export default function productsDetails () {
  const printers = {
    printer1 : {
      buyAndTry: '',
      warranty: `Free Lifetime On-Site Warranty*`,
      points: 'Claim Genuine Xerox Reward Points',
      cashback: '',
      freeGift: '',
    },
    printer2 : {
      buyAndTry: '',
      warranty: `Free 3 Year Warranty`,
      cashback: '',
      freeGift: '',
    },
    printer3 : {
      buyAndTry: `40 Day Buy & Try Offer*`,
      warranty: `Free 3 Year Warranty`,
      cashback: `Purchase Additional CMYK Toners for up to £100 Cashback*`,
      freeGift: '',
    },
    printer4 : {
      buyAndTry: '',
      warranty: `Free 3 Year Warranty`,
      cashback: ``,
      freeGift: '',
    },
    printer5 : {
      buyAndTry: '',
      warranty: `Free 3 Year Warranty`,
      cashback: ``,
      freeGift: '',
    },
    printer6 : {
      buyAndTry: '',
      warranty: '',
      cashback: `£20 Cashback`,
      freeGift: '',
    },
    printer7 : {
      buyAndTry: `40 Day Buy & Try Offer*`,
      warranty: `Free 3 Year Warranty`,
      cashback: `Purchase Additional CMYK Toners for up to £100 Cashback*`,
      freeGift: '',
    },
    printer8 : {
      buyAndTry: '',
      warranty: `Free 3 Year Warranty`,
      cashback: `Purchase Additional CMYK Toners for up to £100 Cashback*`,
      freeGift: '',
    },
    printer9 : {
      buyAndTry: '',
      warranty: `Free 3 Year Warranty worth £49.99`,
      cashback: '',
      freeGift: '',
    },
    printer10 : {
      buyAndTry: '',
      warranty: `Free 3 Year Warranty`,
      cashback: ``,
      freeGift: '',
    },
    printer11 : {
      buyAndTry: '',
      warranty: '',
      cashback: `Purchase 4 Additional Toner Cartridges & Receive £40 Cashback`,
      freeGift: `Free Bluetooth Speaker`,
    },
    printer12 : {
      buyAndTry: '',
      warranty: `Free 3 Year On-Site Warranty`,
      cashback: `£90 Trade-In Cashback*`,
      freeGift: `Free Sonos One Smart Speaker`,
    },
    printer13 : {
      buyAndTry: '',
      warranty: '',
      cashback: `Purchase 2 Additional Black Toner Cartridges & Receive up to £20 Cashback`,
      freeGift: `Free Bluetooth Speaker`,
    },
    printer14 : {
      buyAndTry: '',
      warranty: `Free 3 Year On-Site Warranty`,
      cashback: '',
      freeGift: `Free 8GB Memory Stick`,
    },
    printer15 : {
      buyAndTry: '',
      warranty: '',
      cashback: `£20 Cashback`,
      freeGift: '',
    },
    printer17 : {
      buyAndTry: '',
      cashback: `£45 Cashback`,
      points: `Claim Genuine Xerox Reward Points`,
      cashback2: `£40 Off`,
      warranty: '',
      freeGift: '',
    },
    printer18 : {
      buyAndTry: '',
      cashback: '',
      warranty: `Free 3 Year Warranty`,
      freeGift: '',
    },
    printer19 : {
      cashback: `£50 Cashback`,
      buyAndTry: `90 Day Money Back Guarantee`,
      warranty: '',
      freeGift: '',
    },
    printer20 : {
      warranty: `Free 3 Year On-Site Warranty`,
      cashback: '',
      buyAndTry: '',
      freeGift: `Free 8GB Memory Stick`,
      freeGift2: `Shipped with 2k Toners`,
    },
    printer21 : {
      warranty: `Free 3 Year Warranty worth £49.99`,
      cashback: '',
      buyAndTry: '',
      freeGift: `Free 8GB Memory Stick`,
    },
    printer22 : {
      cashback: `£40 Cashback`,
      buyAndTry: `40 Day Buy & Try Offer*`,
      warranty: `Free 3 Year Warranty`,
      cashback2: `Purchase Additional CMYK Toners for up to £100 Cashback*`,
      freeGift: '',
    },
    printer23 : {
      buyAndTry: '',
      warranty: `Free 3 Year Warranty`,
      cashback: `£80 Cashback`,
      cashback2: `Purchase Additional CMYK Toners for up to £100 Cashback*`,
      freeGift: '',
    },
    printer24 : {
      buyAndTry: '',
      warranty: `Free 3 Year Warranty`,
      cashback: '',
      cashback2: '',
      freeGift: '',
    },
    printer25 : {
      buyAndTry: '',
      warranty: `Free Lifetime On-Site Warranty*`,
      points: `Claim Genuine Xerox Reward Points`,
      cashback: '',
      freeGift: '',
    },
    printer26 : {
      cashback: `£50 Cashback`,
      buyAndTry: `40 Day Buy & Try Offer*`,
      warranty: `Free 3 Year Warranty`,
      points: '',
      cashback2: `Purchase Additional CMYK Toners for up to £100 Cashback*`,
      freeGift: '',
    },
    printer27 : {
      buyAndTry: '',
      warranty: '',
      cashback: '',
      freeGift: `Free Bluetooth Speaker`,
    },
    printer28 : {
      cashback: `£20 Off`,
      buyAndTry: '',
      warranty: `Free 4 Year Warranty`,
      freeGift: `Free 8GB Memory Stick`,
    },
    printer29 : {
      buyAndTry: '',
      cashback: `£50 Cashback`,
      warranty: '',
      freeGift: `Free Bluetooth Speaker`,
      freeGift2: `Shipped with 2k Black & 1.5k CMY Toners`,
    },
    printer30 : {
      buyAndTry: '',
      cashback: '',
      warranty: `Free 3 Year Warranty`,
      freeGift: '',
    },
  }

  let printerObj,
  URL = window.location.pathname;

   const productMatch = [
    {
      matchString: '/product/xerox-phaser-6510dn/138514',
      execute: function() {
          printerObj = printers.printer1;
      }
    },
    {
      matchString: '/product/Epson-Workforce-WF-100W/135248',
      execute: function() {
          printerObj = printers.printer2;
      }
    },
    {
      matchString: '/product/hp-color-laserjet-pro-m452dn/136338',
      execute: function() {
          printerObj = printers.printer3;
      }
    },
    {
      matchString: '/product/Epson-EcoTank-ET-7700/140206',
      execute: function() {
          printerObj = printers.printer4;
      }
    },
    {
      matchString: '/product/Epson-EcoTank-ET-7750/140211',
      execute: function() {
          printerObj = printers.printer5;
      }
    },
    {
      matchString: '/product/HP-Officejet-Pro-6230/135289',
      execute: function() {
          printerObj = printers.printer6;
      }
    },
    {
      matchString: '/product/hp-color-laserjet-pro-m452nw/136336',
      execute: function() {
          printerObj = printers.printer7;
      }
    },
    {
      matchString: '/product/HP-Color-LaserJet-Pro-M254nw/140446',
      execute: function() {
          printerObj = printers.printer8;
      }
    },
    {
      matchString: '/product/epson-workforce-pro-wf-4740dtwf/138935',
      execute: function() {
          printerObj = printers.printer9;
      }
    },
    {
      matchString: '/product/Epson-EcoTank-ET-2750/140199',
      execute: function() {
          printerObj = printers.printer10;
      }
    },
    {
      matchString: '/product/Samsung-Xpress-C1810W/133386',
      execute: function() {
          printerObj = printers.printer11;
      }
    },
    {
      matchString: '/product/OKI-MC853dnct/135696',
      execute: function() {
          printerObj = printers.printer12;
      }
    },
    {
      matchString: '/product/Samsung-M4020ND/132687',
      execute: function() {
          printerObj = printers.printer13;
      }
    },
    {
      matchString: '/product/OKI-Microline-3320eco/113800',
      execute: function() {
          printerObj = printers.printer14;
      }
    },
    {
      matchString: '/product/HP-Laserjet-Pro-M130a/138191',
      execute: function() {
          printerObj = printers.printer15;
      }
    },
    {
      matchString: '/product/Xerox-Workcentre-3335DNi/138070',
      execute: function() {
          printerObj = printers.printer17;
      }
    },
    {
      matchString: '/product/epson-workforce-wf-7210dtw-/140022',
      execute: function() {
          printerObj = printers.printer18;
      }
    },
    {
      matchString: '/product/HP-PageWide-Pro-477dw/137063',
      execute: function() {
          printerObj = printers.printer19;
      }
    },
    {
      matchString: '/product/OKI-C511dn/122973',
      execute: function() {
          printerObj = printers.printer20;
      }
    },
    {
      matchString: '/product/Epson-WorkForce-Pro-WF-4720DWF/138954',
      execute: function() {
          printerObj = printers.printer21;
      }
    },
    // {
    //   matchString: '/product/HP-LaserJet-Pro-M477fdn/136342',
    //   execute: function() {
    //       printerObj = printers.printer22;
    //   }
    // },
    {
      matchString: '/product/HP-Color-Laserjet-Pro-MFP-M281fdw/140456',
      execute: function() {
          printerObj = printers.printer23;
      }
    },
    {
      matchString: '/product/Epson-WorkForce-WF-7710DWF/140023',
      execute: function() {
          printerObj = printers.printer24;
      }
    },
    {
      matchString: '/product/Xerox-WorkCentre-6515DNI/138526',
      execute: function() {
          printerObj = printers.printer25;
      }
    },
    {
      matchString: '/product/HP-LaserJet-Pro-M477fdw/136341',
      execute: function() {
          printerObj = printers.printer26;
      }
    },
    {
      matchString: '/product/Samsung-CLX-6260ND/123373',
      execute: function() {
          printerObj = printers.printer27;
      }
    },
    {
      matchString: '/product/Lexmark-MS317dn/139613',
      execute: function() {
          printerObj = printers.printer28;
      }
    },
    {
      matchString: '/product/Samsung-CLP-680ND/123372',
      execute: function() {
          printerObj = printers.printer29;
      }
    },
    {
      matchString: '/product/Epson-WorkForce-WF-7720DTWF/140265',
      execute: function() {
          printerObj = printers.printer30;
      }
    },
  ];
  
  productMatch.forEach((item) => {
        URL = URL.toLowerCase();
        const urlToCheck = item.matchString.toLowerCase();
        if(URL.indexOf(urlToCheck) > -1) {
          item.execute();
          let printer = printerObj;
          
          const listContainer = document.querySelector('.PL003-offers__list > ul');

          for (const key in printer) {
            if (printer.hasOwnProperty(key)) {
              const element = printer[key];
              if (element !== '') {
                const newBadge = document.createElement('li');
                newBadge.classList.add('PL003-offers__item');
                newBadge.innerHTML = `<div class='PL003-badge__${key}'></div><div class='PL003-text'>${element}</div>`;
                listContainer.appendChild(newBadge);
              }
            }
          }
          return;
        }
    });
} 