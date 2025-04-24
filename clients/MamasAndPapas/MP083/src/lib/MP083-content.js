export default function productsDetails (productCard, productUrl) {
  // console.log('* STEP 1 *');
  // console.log(productUrl);
  const products = {
    carSeat1 : {
      protection: `<li class='MP083-productDetails__item'>Telescopic linear side impact protection</li>`,
      isofix: `<li class='MP083-productDetails__item'>ISOFIX compatible</li>`,
    },
    carSeat2 : {
      protection: `<li class='MP083-productDetails__item'>SIP+ Side Impact Protection</li>`,
      isofix: `<li class='MP083-productDetails__item'>ISOFIX-compatible</li>`,
    },
    carSeat2a : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX Compatible</li>`,
      protection: `<li class='MP083-productDetails__item'>Side Impact Protection System</li>`,
      age: `<li class='MP083-productDetails__item'>From birth to 4 years (Approx 105cm)</li>`,
    },
    carSeat2b : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX Base Included</li>`,
      protection: `<li class='MP083-productDetails__item'>Side Impact Protection System</li>`,
      age: `<li class='MP083-productDetails__item'>From birth to 4 years (Approx 105cm)</li>`,
    },
    carSeat2c : {
      base: `<li class='MP083-productDetails__item'>Compatible with Base Z</li>`,
      protection: `<li class='MP083-productDetails__item'>Integrated Linear Side Impact Protection</li>`,
      age: `<li class='MP083-productDetails__item'>Birth - 4 years approx. (0 - 18kg)</li>`,
    },
    carSeat2d : {
      isofix: `<li class='MP083-productDetails__item'>On-Click ISOFIX included</li>`,
      protection: `<li class='MP083-productDetails__item'>Side Impact Protection System</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from birth to 105cm tall (4 years approx)</li>`,
    },
    carSeat3 : {
      protection: `<li class='MP083-productDetails__item'>Impact shield</li>`,
      isofix: `<li class='MP083-productDetails__item'>ISOFIX connectors</li>`,
    },
    carSeat4 : {
      isofix: `<li class='MP083-productDetails__item'>Equipped with ISOFIX Connect</li>`,
      protection: `<li class='MP083-productDetails__item'>Side Impact Protection System</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable for 9 months up to 12 years (9 - 36kg approx.)</li>`,
    },
    carSeat5 : {
      protection: `<li class='MP083-productDetails__item'>L.S.P. System (side-impact protection)</li>`,
      isofix: `<li class='MP083-productDetails__item'>ISOFIX-compatible</li>`,
    },
    carSeat5a : {
      base: `<li class='MP083-productDetails__item'>Compatible with Base M</li>`,
      protection: `<li class='MP083-productDetails__item'>Linear Side-impact Protection (L.S.P. System)</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable for 45 cm to 87 cm (max. 13 kg)</li>`,
    },
    carSeat5b : {
      base: `<li class='MP083-productDetails__item'>Compatible with bases or adapters</li>`,
      protection: `<li class='MP083-productDetails__item'>Side Impact Protection System</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable for 0 - 13 kg (approx. 18 months)</li>`,
    },
    carSeat5c : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX-compatible</li>`,
      protection: `<li class='MP083-productDetails__item'>Telescopic linear side impact protection</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable for 45cm to 75cm (max. 13kg)</li>`,
    },
    carSeat6 : {
      protection: `<li class='MP083-productDetails__item'>Side impact protection</li>`,
      isofix: `<li class='MP083-productDetails__item'>ISOFIX connectors</li>`,
    },
    carSeat6a : {
      isofix: `<li class='MP083-productDetails__item'>Equipped with ISOFIX Connect</li>`,
      protection: `<li class='MP083-productDetails__item'>Side Impact Protection System</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable for approx. 3 up to 12 years, 15 - 36 kg</li>`,
    },
    carSeat6b : {
      isofix: `<li class='MP083-productDetails__item'>Equipped with ISOFIX Connect</li>`,
      protection: `<li class='MP083-productDetails__item'>Side Impact Protection System</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable for 3 to 12 years (15 - 36kg approx.)</li>`,
    },
    carSeat6c : {
      protection: `<li class='MP083-productDetails__item'>Award-winning safety</li>`,
      base: `<li class='MP083-productDetails__item'>CYBEX patented reclining headrest</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable for approx. 3 up to 12 years, 15 - 36 kg</li>`,
    },
    carSeat7 : {
      protection: `<li class='MP083-productDetails__item'>Side impact protection</li>`,
      isofix: `<li class='MP083-productDetails__item'>ISOFIX-compatible</li>`,
    },
    carSeat7a : {
      base: `<li class='MP083-productDetails__item'>Compatible with Base Z</li>`,
      protection: `<li class='MP083-productDetails__item'>Integrated Linear Side-Impact Protection</li>`,
      age: `<li class='MP083-productDetails__item'>Birth - 18 months approx. 45-87cm</li>`,
    },
    carSeat8 : {
      base: `<li class='MP083-productDetails__item'>Joie i-Base Compatible</li>`,
      protection: `<li class='MP083-productDetails__item'>Tri-Protect headrest</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable for 40cm to 85cm</li>`,
    },
    carSeat9 : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX base included</li>`,
      protection: `<li class='MP083-productDetails__item'>Winner of a Made for Mums Gold Award 2018</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from birth up to 12 years</li>`,
    },
    carSeat10 : {
      protection: `<li class='MP083-productDetails__item'>Side impact security</li>`,
    },
    carSeat11 : {
      protection: `<li class='MP083-productDetails__item'>i-Anchor Tri-Protect headrest</li>`,
      base: `<li class='MP083-productDetails__item'>Free i-Base</li>`,
    },
    carSeat12 : {
      protection: `<li class='MP083-productDetails__item'>i-Anchor Tri-Protect headrest (not online)</li>`,
      base: `<li class='MP083-productDetails__item'>Free i-Base</li>`,
    },
    carSeat13 : {
      protection: `<li class='MP083-productDetails__item'>3 point seat belt installation</li>`,
      base: `<li class='MP083-productDetails__item'>Added safety of rear-facing seat up to 4 years</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from birth up to 12 years</li>`,
    },
    carSeat14 : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX base included</li>`,
      base: `<li class='MP083-productDetails__item'>Added safety of rear-facing seat up to 4 years</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from birth up to 4 years</li>`,
    },
    carSeat15 : {
      isosafe: `<li class='MP083-productDetails__item'>ISOSAFE connectors</li>`,
      protection: `<li class='MP083-productDetails__item'>11 Position Headrest</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable for 9kg to 36kg (9 months to 12 years approx.)</li>`,
    },
    carSeat16 : {
      base: `<li class='MP083-productDetails__item'>Adapters sold separately</li>`,
      protection: `<li class='MP083-productDetails__item'>Side Impact Protection System</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from birth to 13kg</li>`,
    },
    carSeat17 : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX compatible</li>`,
      protection: `<li class='MP083-productDetails__item'>Side impact protection shock absorbers</li>`,
      age: `<li class='MP083-productDetails__item'>from 6 months to 4 years approx.</li>`,
    },
    carSeat18 : {
      protection: `<li class='MP083-productDetails__item'>Side impact AirProtect&reg;</li>`,
    },
    carSeat19 : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX compatible</li>`,
      protection: `<li class='MP083-productDetails__item'>Side Impact Protection System</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable for 15kg to 36kg (3.5 to 12 years approx.)</li>`,
    },
    carSeat20 : {
      protection: `<li class='MP083-productDetails__item'>Side impact AirProtect&reg;</li>`,
      isofix: `<li class='MP083-productDetails__item'>ISOFIX compatible</li>`,
    },
    carSeat20a : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX compatible</li>`,
      protection: `<li class='MP083-productDetails__item'>AirProtect&reg; technology</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable for 15kg to 36kg (3.5 to 12 years approx.)</li>`,
    },
    carSeat22 : {
      isofix: `<li class='MP083-productDetails__item'>Compatible with ISOFIX 2wayFix base</li>`,
      protection: `<li class='MP083-productDetails__item'>Extra-padded seat</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from birth to 75cm (12 months approx.)</li>`,
    },
    carSeat23 : {
      base: `<li class='MP083-productDetails__item'>Maxi-Cosi FamilyFix Base included</li>`,
      protection: `<li class='MP083-productDetails__item'>Side Impact Protection System</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from birth - 13kg</li>`,
    },
    carSeat24 : {
      base: `<li class='MP083-productDetails__item'>FamilyFix base compatible</li>`,
    },
    carSeat25 : {
      base: `<li class='MP083-productDetails__item'>ISOFIX Maxi-Cosi&reg; FamilyFix base included</li>`,
      protection: `<li class='MP083-productDetails__item'>5 Reclining Positions</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from 9 to 18kg (9 months to 4 years approx.)</li>`,
    },
    carSeat26 : {
      protection: `<li class='MP083-productDetails__item'>360° rotating Seat</li>`,
      isofix: `<li class='MP083-productDetails__item'>ISOFIX compatible</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from 45cm to 105cm (birth to 4 years approx.)</li>`,
    },
    carSeat27 : {
      base: `<li class='MP083-productDetails__item'>i-Size Maxi-Cosi&reg; 2wayFix base compatible</li>`,
      protection: `<li class='MP083-productDetails__item'>Side Impact Protection System</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from 9kg to 18kg</li>`,
    },
    carSeat28 : {
      base: `<li class='MP083-productDetails__item'>2wayFix base included</li>`,
      age: `<li class='MP083-productDetails__item'>From birth up to 4 years</li>`,
      
    },
    carSeat29 : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX compatible</li>`,
      protection: `<li class='MP083-productDetails__item'>Superior side impact protection</li>`,
    },
    carSeat29a : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX compatible</li>`,
      base: `<li class='MP083-productDetails__item'>Seat reducer</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from birth to 13kg (18 months approx.)</li>`,
    },
    carSeat29b : {
      base: `<li class='MP083-productDetails__item'>Maxi-Cosi EasyFix Base included</li>`,
      protection: `<li class='MP083-productDetails__item'>Seat reducer</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from birth to 13kg (18 months approx.)</li>`,
    },
    carSeat30 : {
      base: `<li class='MP083-productDetails__item'>Compatible with 3 point car seat belt</li>`,
      protection: `<li class='MP083-productDetails__item'>Easy-reach safety features</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from 9kg to 18kg (9 months to 4 years approx.)</li>`,
    },
    carSeat31 : {
      belt: `<li class='MP083-productDetails__item'>3 point car seat belt</li>`,
      protection: `<li class='MP083-productDetails__item'>Accessible safety features</li>`,
      age: `<li class='MP083-productDetails__item'>9 months to 4 years approx.</li>`,
    },
    carSeat32 : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX compatible</li>`,
      protection: `<li class='MP083-productDetails__item'>Side Impact Protection System</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from birth to 12months approx.</li>`,
    },
    carSeat33 : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX compatible plus ISOSAFE connections</li>`,
      protection: `<li class='MP083-productDetails__item'>Added safety of rear-facing seat up to 4 years</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from birth up to 12 years</li>`,
    },
    carSeat34 : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX base included</li>`,
      protection: `<li class='MP083-productDetails__item'>Added safety of rear-facing seat up to 4 years</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from birth up to 4 years</li>`,
    },
    carSeat35 : {
      isofix: `<li class='MP083-productDetails__item'>ISOFIX base included</li>`,
      protection: `<li class='MP083-productDetails__item'>Added safety of rear-facing seat up to 4 years</li>`,
      age: `<li class='MP083-productDetails__item'>Suitable from birth up to 4 years</li>`,
    },
  }

  let productObj,
  URL = window.location.pathname;

   const productMatch = [
    {
      matchString: '/cybex-cloud-q-lie-flat-baby-car-seat-and-carry-cot-stardust-black',
      execute: function() {
          productObj = products.carSeat1;
      }
    },
    // {
    //   matchString: '/cybex-sirona',
    //   execute: function() {
    //       productObj = products.carSeat2;
    //   }
    // },
    {
      matchString: '/cybex-sirona-m2',
      execute: function() {
          productObj = products.carSeat2a;
      }
    },
    {
      matchString: '/cybex-sirona-m2-i-size-baby-to-toddler-car-seat-with-base',
      execute: function() {
          productObj = products.carSeat2b;
      }
    },
    {
      matchString: '/cybex-sirona-z',
      execute: function() {
          productObj = products.carSeat2c;
      }
    },
    {
      matchString: '/cybex-sirona-s',
      execute: function() {
          productObj = products.carSeat2d;
      }
    },
    // {
    //   matchString: '/cybex-pallas-2-fix',
    //   execute: function() {
    //       productObj = products.carSeat3;
    //   }
    // },
    {
      matchString: '/cybex-pallas-m-sl',
      execute: function() {
          productObj = products.carSeat4;
      }
    },
    // {
    //   matchString: '/cybex-aton',
    //   execute: function() {
    //       productObj = products.carSeat5;
    //   }
    // },
    {
      matchString: '/cybex-aton-m',
      execute: function() {
          productObj = products.carSeat5a;
      }
    },
    {
      matchString: '/cybex-aton-5',
      execute: function() {
          productObj = products.carSeat5b;
      }
    },
    {
      matchString: '/cybex-aton-q',
      execute: function() {
          productObj = products.carSeat5c;
      }
    },
    // {
    //   matchString: '/cybex-solution',
    //   execute: function() {
    //       productObj = products.carSeat6;
    //   }
    // },
    {
      matchString: '/cybex-solution-m',
      execute: function() {
          productObj = products.carSeat6a;
      }
    },
    {
      matchString: '/cybex-solution-z',
      execute: function() {
          productObj = products.carSeat6b;
      }
    },
    {
      matchString: '/cybex-solution-x',
      execute: function() {
          productObj = products.carSeat6c;
      }
    },
    {
      matchString: '/cybex-cloud-q-plus',
      execute: function() {
          productObj = products.carSeat7;
      }
    },
    {
      matchString: '/cybex-cloud-z',
      execute: function() {
          productObj = products.carSeat7a;
      }
    },
    {
      matchString: '/joie-i-gemm',
      execute: function() {
          productObj = products.carSeat8;
      }
    },
    {
      matchString: '/joie-i-level-i-size',
      execute: function() {
          productObj = products.carSeat9;
      }
    },
    {
      matchString: '/joie-stages',
      execute: function() {
          productObj = products.carSeat10;
      }
    },
    // {
    //   matchString: '/joie-i-anchor-advance-baby-toddlers',
    //   execute: function() {
    //       productObj = products.carSeat11;
    //   }
    // },
    // {
    //   matchString: '/joie-i-anchor-advance-i-size',
    //   execute: function() {
    //       productObj = products.carSeat12;
    //   }
    // },
    {
      matchString: '/joie-every-stage',
      execute: function() {
          productObj = products.carSeat13;
      }
    },
    {
      matchString: '/joie-spin-360',
      execute: function() {
          productObj = products.carSeat14;
      }
    },
    {
      matchString: '/joie-bold-3-stage',
      execute: function() {
          productObj = products.carSeat15;
      }
    },
    {
      matchString: '/besafe-joolz-izi-go-modular',
      execute: function() {
          productObj = products.carSeat16;
      }
    },
    // {
    //   matchString: 'besafe-izi-modular-i-size',
    //   execute: function() {
    //       productObj = products.carSeat17;
    //   }
    // },
    {
      matchString: '/maxi-cosi-rodi-airprotect',
      execute: function() {
          productObj = products.carSeat18;
      }
    },
    {
      matchString: 'maxi-cosi-rodi-xp',
      execute: function() {
          productObj = products.carSeat19;
      }
    },
    // {
    //   matchString: '/maxi-cosi-rodifix',
    //   execute: function() {
    //       productObj = products.carSeat20;
    //   }
    // },
    {
      matchString: '/maxi-cosi-rodifix-airprotect',
      execute: function() {
          productObj = products.carSeat20a;
      }
    },
    {
      matchString: '/maxi-cosi-pebble-plus',
      execute: function() {
          productObj = products.carSeat22;
      }
    },
    {
      matchString: '/maxi-cosi-pebble-and-familyfix-base',
      execute: function() {
          productObj = products.carSeat23;
      }
    },
    {
      matchString: '/maxi-cosi-pearl',
      execute: function() {
          productObj = products.carSeat24;
      }
    },
    {
      matchString: '/maxi-cosi-pearl-isofix',
      execute: function() {
          productObj = products.carSeat25;
      }
    },
    {
      matchString: '/maxi-cosi-axissfix',
      execute: function() {
          productObj = products.carSeat26;
      }
    },
    {
      matchString: '/maxi-cosi-2waypearl',
      execute: function() {
          productObj = products.carSeat27;
      }
    },
    {
      matchString: '/maxi-cosi-2wayfix-isofix-i-size',
      execute: function() {
          productObj = products.carSeat28;
      }
    },
    // {
    //   matchString: '/maxi-cosi-cabriofix',
    //   execute: function() {
    //       productObj = products.carSeat29;
    //   }
    // },
    {
      matchString: '/maxi-cosi-cabriofix-baby-car-travel-seat',
      execute: function() {
          productObj = products.carSeat29a;
      }
    },
    {
      matchString: '/maxi-cosi-cabriofix-baby-car-seat-easyfix-base',
      execute: function() {
          productObj = products.carSeat29b;
      }
    },
    {
      matchString: '/maxi-cosi-rock-i-size',
      execute: function() {
          productObj = products.carSeat30;
      }
    },
    {
      matchString: '/maxi-cosi-tobi-reclining',
      execute: function() {
          productObj = products.carSeat31;
      }
    },
    {
      matchString: '/babyzen-izi-go',
      execute: function() {
          productObj = products.carSeat32;
      }
    },
    {
      matchString: '/joie-everystage',
      execute: function() {
          productObj = products.carSeat33;
      }
    },
    {
      matchString: '/joie-360-spin',
      execute: function() {
          productObj = products.carSeat34;
      }
    },
    {
      matchString: '/nuna-rebl-plus-i-size',
      execute: function() {
          productObj = products.carSeat35;
      }
    },
  ];
  
  let listItems = '';
  let newListEl;

  productMatch.forEach((item) => {
      if(productUrl.indexOf(item.matchString) > -1) {
        item.execute();
        let product = productObj;

        for (const key in product) {
          if (product.hasOwnProperty(key)) {
            const element = product[key];

            if (element !== '') {
              newListEl = element;
              listItems = listItems.concat(newListEl);
            }
          }
        }
      }
  });
  return listItems;
} 