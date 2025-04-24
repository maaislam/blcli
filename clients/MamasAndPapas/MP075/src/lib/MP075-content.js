export default function productsDetails () {
  const products = {
    ocarro : {
      weight: '13.3kg',
      foldedSize: 'H: 37; W: 58; D: 76cm; approx.',
      suitabilityLabel: 'Birth to 15K'
    },
    flip :{
      weight: '11.1kg',
      foldedSize: 'H: 68" W: 55" D: 50" approx',
      suitabilityLabel: 'Birth to 15kg approx'
    },
    armadillo :{
      weight: '9.1kg',
      foldedSize: 'H: 68" W: 55" D: 50" approx',
      suitabilityLabel: 'Birth to 15kg approx'
    },
    voyage :{
      weight: '8.4kg',
      foldedSize: 'H: 43" W: 36" D: 111" approx',
      suitabilityLabel: 'Birth to 15kg approx'
    },
    armadilloSport :{
      weight: '10.1kg approx.',
      foldedSize: 'H:70.5cm x W:57.5cm x L:48cm approx.',
      suitabilityLabel: 'Suitable from birth to 15kg/33lbs'
    },
    sola :{
      weight: '10.8kg',
      foldedSize: 'H: 48" W:61" D:85" approx',
      suitabilityLabel: 'Birth to 15kg approx'
    },
    urbo :{
      weight: '10.8kg',
      foldedSize: 'H: 49" W:54" D:85" approx',
      suitabilityLabel: 'Birth to 15kg approx'
    },
    acro :{
      weight: '4.9kg Approx.',
      foldedSize: 'H: 19 x W: 41.5 x L: 57cm Approx.',
      suitabilityLabel: '6 months- 15kg/33lb'
    },
    cruisePractical :{
      weight: '7.9kg approx.',
      foldedSize: 'H:31cm x W:26cm x L:110cm approx.',
      suitabilityLabel: 'Suitable from birth to 15kg'
    },
    cruiseTwin :{
      weight: '14.9kg approx.',
      foldedSize: 'H:49cm x W:43cm x L:108cm approx.',
      suitabilityLabel: 'Suitable from birth to 15kg/33lbs'
    },
    bugabooDonkeyMono :{
      weight: '13kg',
      foldedSize: 'H:52cm x W:60cm x L:93cm',
      suitabilityLabel: 'Birth - 17kg'
    },
    bugabooDonkeyDuo :{
      weight: '15kg',
      foldedSize: 'H:52cm x W:74cm x L:93cm',
      suitabilityLabel: 'Birth - 17kg'
    },
    bugabooDonkeyTwin :{
      weight: '15kg',
      foldedSize: 'H:52cm x W:74cm x L:93cm',
      suitabilityLabel: 'Birth - 17kg'
    },
    bugabooBuffalo :{
      weight: '12.3kg Approx.',
      foldedSize: 'H: 34 x W: 54 x L: 88cm Approx.',
      suitabilityLabel: 'Birth - 17kg.'
    },
    bugabooCameleon :{
      weight: '9.6kg approx.',
      foldedSize: 'H:30.5cm x W:60cm x L:90cm approx.',
      suitabilityLabel: 'Suitable from birth to 17kg'
    },
    bugabooBees :{
      weight: '8.9kg approx.',
      foldedSize: 'H:32cm x W:53cm x L:90cm approx.',
      suitabilityLabel: 'Suitable from birth to 17kg'
    },
    cybex :{
      weight: '11.5kg Approx.',
      suitabilityLabel: 'Birth - 17kg.'
    },
    joolzGeo :{
      weight: '13.3kg approx.',
      foldedSize: 'H:42cm x W:60cm x L:97cm approx.',
      suitabilityLabel: 'Suitable from birth to 15kg'
    },
    joolzDay :{
      weight: '12.9kg approx.',
      foldedSize: 'H:95cm x W:59cm x L:90cm approx.',
    },
    joolzDayStudio :{
      weight: '12.9 kg Approx.',
      foldedSize: 'H: 95 x W: 59 x L: 43cm Approx.',
      suitabilityLabel: 'Birth - 15kg'
    },
    stokke :{
      weight: '8.4kg',
      foldedSize: 'H: 34 x W: 56 x L: 99 cm Approx.',
      suitabilityLabel: 'From 6 months to 15kg'
    },
    babyzenNewborn :{
      weight: '6.4 Kgs Approx.',
      foldedSize: 'H: 52 x W: 44 x D: 18 cm Approx.',
      suitabilityLabel: 'from birth to 9kg'
    },
    babyzenColour :{
      weight: '6.4 Kgs Approx.',
      foldedSize: 'H: 52 x W: 44 x D: 18 cm Approx.',
      suitabilityLabel: 'from 6 months to 18kg'
    }, 
    cotbed : {
      graphic: 'Converts to toddler bed',
    },
    cot : {
      suitabilityLabel: 'Suitable from birth'
    },
    crib : {
      suitabilityLabel: 'Suitable from birth'
    },
  }

  let productObj,
  URL = window.location.pathname;

   const productMatch = [
    {
      matchString: '/ocarro',
      execute: function() {
          productObj = products.ocarro;
      }
    },
   {
      matchString: '/flip-xt-',
      execute: function() {
          productObj = products.flip;
      }
    },
    {
      matchString: '/armadillo-folding-pushchair',
      execute: function() {
          productObj = products.armadillo;
      }
    },
    {
      matchString: '/voyage-everyday-travel-buggy',
      execute: function() {
          productObj = products.voyage;
      }
    },
    {
      matchString: '/armadillo-sport-3-wheel-pushchair',
      execute: function() {
          productObj = products.armadilloSport;
      }
    },
    {
      matchString: '/sola',
      execute: function() {
          productObj = products.sola;
      }
    },
    {
      matchString: '/new-exclusive-sola',
      execute: function() {
          productObj = products.sola;
      }
    },
    {
      matchString: '/urbo',
      execute: function() {
          productObj = products.urbo;
      }
    },
    {
      matchString: '/acro-compact-pushchair',
      execute: function() {
          productObj = products.acro;
      }
    },
    {
      matchString: '/cruise-practical-folding-buggy',
      execute: function() {
          productObj = products.cruisePractical;
      }
    },
    {
      matchString: '/cruise-twin-folding-buggy',
      execute: function() {
          productObj = products.cruiseTwin;
      }
    },
    {
      matchString: '/bugaboo-donkey-mono',
      execute: function() {
          productObj = products.bugabooDonkeyMono;
      }
    },
    {
      matchString: '/bugaboo-donkey-duo',
      execute: function() {
          productObj = products.bugabooDonkeyDuo;
      }
    },
    {
      matchString: '/bugaboo-donkey-twin',
      execute: function() {
          productObj = products.bugabooDonkeyTwin;
      }
    },
    {
      matchString: '/bugaboo-buffalo',
      execute: function() {
          productObj = products.bugabooBuffalo;
      }
    },
    {
      matchString: '/bugaboo-cameleon',
      execute: function() {
          productObj = products.bugabooCameleon;
      }
    },
    {
      matchString: '/bugaboo-beesup5sup',
      execute: function() {
          productObj = products.bugabooBees;
      }
    },
    {
      matchString: '/cybex-priam',
      execute: function() {
          productObj = products.cybex;
      }
    },
    {
      matchString: '/joolz-geo-mono-pushchair',
      execute: function() {
          productObj = products.joolzGeo;
      }
    },
    {
      matchString: '/joolz-day2',
      execute: function() {
          productObj = products.joolzDay;
      }
    },
    {
      matchString: '/joolz-day-studio',
      execute: function() {
          productObj = products.joolzDayStudio;
      }
    },
    {
      matchString: '/stokke-xplory',
      execute: function() {
          productObj = products.stokke;
      }
    },
    {
      matchString: '/babyzen-yoyo-newborn-pack',
      execute: function() {
          productObj = products.babyzenNewborn;
      }
    },
    {
      matchString: '/babyzen-yoyo-colour-pack-6',
      execute: function() {
          productObj = products.babyzenColour;
      }
    },
    {
      matchString: '-cotbed-',
      execute: function() {
          productObj = products.cotbed;
      }
    },
    {
      matchString: '-cot-bed-',
      execute: function() {
          productObj = products.cotbed;
      }
    },
    {
      matchString: '-cot-toddler-bed-',
      execute: function() {
          productObj = products.cotbed;
      }
    },
    {
      matchString: '-cot-',
      execute: function() {
          productObj = products.cot;
      }
    },
    {
      matchString: '-crib-',
      execute: function() {
          productObj = products.crib;
      }
    },
  ];
  
  const iconWrapper = document.querySelector('.MP075_icon-wrapper');
  const breadcrumbs = window.universal_variable.page.breadcrumb;
  let count = 0;
  if (count < 1) {
    if (breadcrumbs.indexOf("Nursery") > -1){
      const newIcons = document.createElement('div');
      newIcons.classList.add('MP075-newIcon');
      newIcons.innerHTML = `<div class="MP075-icon MP075-guarantee"><p>2 Year Guarantee</p></div>`;
      iconWrapper.appendChild(newIcons);
    }
    count++;
  }
  
  productMatch.forEach((item) => {
        if(window.location.pathname.indexOf(item.matchString) > -1) {
            item.execute();
            let productWeight;
            let productFoldedSize;
            let productSuitabilityLabel;

            productWeight = productObj.weight,
            productFoldedSize = productObj.foldedSize;
            productSuitabilityLabel = productObj.suitabilityLabel;

          // Checks if it is a furniture page and appends the 2 year guarantee icon
            if (count < 1) {
              if (breadcrumbs.indexOf("Nursery") > -1){
                const newIcons = document.createElement('div');
                newIcons.classList.add('MP075-newIcon');
                newIcons.innerHTML = `<div class="MP075-icon MP075-guarantee"><p>2 Year Guarantee</p></div>`;
                iconWrapper.appendChild(newIcons);
              }
              count++;
            }

            for (const key in productObj) {
              if (productObj.hasOwnProperty(key)) {
                const element = productObj[key];
                const newIcons = document.createElement('div');
                newIcons.classList.add('MP075-newIcon');
                if (key != 'graphic') {
                  newIcons.innerHTML = `<div class="MP075-icon MP075-${key}"><p>${element}</p></div>`;
                  iconWrapper.appendChild(newIcons);
                } else {
                  newIcons.innerHTML = `<div class="MP075-icon MP075-${key}"><p>${element}</p></div><span class="MP075-dimensions">See dimensions</span>`;
                  iconWrapper.appendChild(newIcons);
                }
              }
            }
          return;  
        }
    });
} 