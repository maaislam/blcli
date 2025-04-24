/* eslint-disable no-script-url */

/**
 * Change image reference to production when going live:
 * Production: #$(ContentManager:{{name}})!
 * Development: https://ab-test-sandbox.userconversion.com/experiments/{{name}}
 */


export default [
  {
    name: 'Sale',
    url: 'javascript:void(0)',
    sub: [
      {
        name: 'ALL SALE',
        url: '/webstore/l/search/select%7Csale/',
      },
      {
        name: 'SALE DIAMOND JEWELLERY',
        url: '/webstore/l/diamonds/category%7Cjewellery/select%7Csale/',
      },
      {
        name: 'SALE DIAMOND RINGS',
        url: '/webstore/l/diamonds/category%7Crings/select%7Csale/',
      },
      {
        name: 'SALE JEWELLERY',
        url: '/webstore/l/jewellery/select%7Csale/',
      },
      {
        name: 'SALE WATCHES',
        url: '/webstore/l/watches/select%7Csale/',
      },
      {
        name: 'SALE FOR HIM',
        url: '/webstore/l/search/select%7Csale/recipient%7Chim/',
      },
      {
        name: 'SALE FOR HER',
        url: '/webstore/l/search/select%7Csale/recipient%7Cher/',
      },
    ],
  },
  {
    name: 'Watches',
    url: 'javascript:void(0)',
    sub: [
      {
        name: 'Watches By Collection',
        url: 'javascript:void(0)',
        sub: [
          {
            name: 'All Watches',
            url: '/webstore/l/watches',
          },
          {
            name: 'Men\'s Watches',
            url: '/webstore/l/watches/recipient%7Chim/',
          },
          {
            name: 'Ladies Watches',
            url: '/webstore/l/watches/recipient%7Cher/',
          },
          {
            name: 'Luxury Watches',
            url: '/webstore/shops/luxury-watches-boutique.cdo',
          },
          {
            name: 'Smart Watches',
            url: '/webstore/l/watches/category%7Csmart+watches/',
          },
          {
            name: 'New Watches',
            url: '/webstore/l/watches/select%7Cnew/',
          },
          {
            name: 'Top Rated Watches',
            url: '/webstore/l/watches/rating%7C5+stars/?Nf=P_Current_Price%7CBTWN+0+100000',
          },
          {
            name: 'Sale Watches',
            url: '/webstore/l/watches/select%7Csale/?icid=ej-dd-sale-watches',
          },
        ],
      },
      {
        name: 'Popular For Him',
        url: 'javascript:void(0)',
        sub: [
          {
            name: 'All Watches For Him',
            url: '/webstore/l/watches/recipient%7Chim/',
          },
          {
            name: 'TAG Heuer',
            url: '/webstore/l/watches/brand%7Ctag+heuer/recipient%7Chim/',
          },
          {
            name: 'Omega',
            url: '/webstore/l/watches/brand%7Comega/recipient%7Chim/',
          },
          {
            name: 'Breitling',
            url: '/webstore/l/watches/brand%7Cbreitling/recipient%7Chim/',
          },
          {
            name: 'Tissot',
            url: '/webstore/l/watches/brand%7Ctissot/recipient%7Chim/',
          },
          {
            name: 'Hugo Boss',
            url: '/webstore/l/watches/brand%7Chugo+boss/recipient%7Chim/',
          },
          {
            name: 'Emporio Armani',
            url: '/webstore/l/watches/brand%7Cemporio+armani/recipient%7Chim/',
          },
        ],
      },
      {
        name: 'Popular For Her',
        url: 'javascript:void(0)',
        sub: [
          {
            name: 'All Watches For Her',
            url: '/webstore/l/watches/recipient%7Cher/',
          },
          {
            name: 'Gucci',
            url: '/webstore/l/watches/brand%7Cgucci+watches/recipient%7Cher/',
          },
          {
            name: 'Longines',
            url: '/webstore/l/watches/brand%7Clongines/recipient%7Cher/',
          },
          {
            name: 'Chanel',
            url: '/webstore/l/watches/brand%7Cchanel/recipient%7Cher/',
          },
          {
            name: 'TAG Heuer',
            url: '/webstore/l/watches/brand%7Ctag+heuer/recipient%7Cher/',
          },
          {
            name: 'Michael Kors',
            url: '/webstore/l/watches/brand%7Cmichael+kors/recipient%7Cher/?icid=Shop-ej-kors_ladies_watches',
          },
          {
            name: 'Olivia Burton',
            url: '/webstore/l/watches/brand%7Colivia+burton/recipient%7Cher/',
          },
        ],
      },
    ],
  },
  {
    name: 'Jewellery',
    url: 'javascript:void(0)',
    sub: [
      {
        name: 'For Her',
        url: 'javascript:void(0)',
        sub: [
          {
            name: 'Engagement Rings',
            url: '/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/recipient%7Cher/',
          },
          {
            name: 'Wedding Rings',
            url: '/webstore/l/jewellery/category%7Crings/occasion%7Cwedding/recipient%7Cher/',
          },
          {
            name: 'Eternity Rings',
            url: '/webstore/l/jewellery/category%7Crings/recipient%7Cher/style%7Ceternity/',
          },
          {
            name: 'Earrings',
            url: '/webstore/l/jewellery/category%7Cearrings/recipient%7Cher/',
          },
          {
            name: 'Bracelets',
            url: '/webstore/l/jewellery/category%7Cbracelets/recipient%7Cher/',
          },
          {
            name: 'Necklaces',
            url: '/webstore/l/jewellery/category%7Cnecklaces/recipient%7Cher/',
          },
          {
            name: 'Rings',
            url: '/webstore/l/jewellery/category%7Crings/recipient%7Cher/',
          },
          {
            name: 'Beads and Charms',
            url: '/webstore/l/jewellery/category%7Cbeads+%26+charms/recipient%7Cher/',
          },
          {
            name: 'Jewellery Sets',
            url: '/webstore/l/jewellery/category%7Cjewellery+sets/recipient%7Cher/',
          },
          {
            name: 'Gifts For Her',
            url: '/webstore/l/jewellery/recipient%7Cher/',
          },
          {
            name: 'Sale',
            url: '/webstore/l/jewellery/recipient%7Cher/select%7Csale/',
          },
        ],
      },
      {
        name: 'For Him',
        url: 'javascript:void(0)',
        sub: [
          {
            name: 'Wedding Rings',
            url: '/webstore/l/jewellery/category%7Crings/occasion%7Cwedding/recipient%7Chim/',
          },
          {
            name: 'Rings',
            url: '/webstore/l/jewellery/category%7Crings/recipient%7Chim/',
          },
          {
            name: 'Cufflinks',
            url: '/webstore/l/search/category%7Ccufflinks/recipient%7Chim/',
          },
          {
            name: 'Bracelets',
            url: '/webstore/l/jewellery/category%7Cbracelets/recipient%7Chim/',
          },
          {
            name: 'Necklaces',
            url: '/webstore/l/jewellery/category%7Cnecklaces/recipient%7Chim/',
          },
          {
            name: 'Sale',
            url: '/webstore/l/jewellery/recipient%7Chim/select%7Csale/',
          },
        ],
      },
      {
        name: 'By Occasion',
        url: 'javascript:void(0)',
        sub: [
          {
            name: 'Engagement',
            url: '/webstore/l/jewellery/occasion%7Cengagement/',
          },
          {
            name: 'Wedding',
            url: '/webstore/l/jewellery/occasion%7Cwedding/',
          },
          {
            name: 'Anniversary',
            url: '/webstore/l/jewellery/occasion%7Canniversary/',
          },
          {
            name: 'Gifts For Her',
            url: '/webstore/l/jewellery/recipient%7Cher/',
          },
          {
            name: 'Gifts For Him',
            url: '/webstore/l/jewellery/recipient%7Chim/',
          },
        ],
      },
      {
        name: 'Brands',
        url: 'javascript:void(0)',
        sub: [
          {
            name: 'Gucci',
            url: '/webstore/l/jewellery/brand%7Cgucci%7Cgucci+jewellery/',
          },
          {
            name: 'Vera Wang',
            url: '/webstore/l/search/brand%7Cvera+wang/stock+position%7Cin+stock/',
          },
          {
            name: 'Le Vian',
            url: '/webstore/l/search/brand%7Cle+vian/stock+position%7Cin+stock/',
          },
          {
            name: 'Links of London',
            url: '/webstore/l/jewellery/brand%7Clinks+of+london/',
          },
          {
            name: 'Swarovski',
            url: '/webstore/l/jewellery/brand%7Cswarovski/',
          },
          {
            name: 'Thomas Sabo',
            url: '/webstore/l/jewellery/brand%7Cthomas+sabo/',
          },
          {
            name: 'Michael Kors',
            url: '/webstore/l/jewellery/brand%7Cmichael+kors/',
          },
          {
            name: 'Carat',
            url: '/webstore/l/jewellery/brand%7Ccarat/',
          },
          {
            name: 'View All Brands',
            url: '/webstore/brand-index.do',
          },
        ],
      },
    ],
  },
  {
    name: 'Diamonds',
    url: 'javascript:void(0)',
    sub: [
      {
        name: 'Diamond Rings',
        url: 'javascript:void(0)',
        sub: [
          {
            name: 'All Diamond Rings',
            url: '/webstore/l/diamonds/category%7Crings/?Nf=P_Current_Price%7CBTWN+15+9999999',
          },
          {
            name: 'Engagement Rings',
            url: '/webstore/l/diamonds/category%7Crings/occasion%7Cengagement/',
          },
          {
            name: 'Bridal Sets',
            url: '/webstore/l/diamonds/style%7Cbridal+set/category%7Cjewellery/',
          },
          {
            name: 'Wedding Rings',
            url: '/webstore/l/diamonds/occasion%7Cwedding/category%7Cjewellery%7Crings/',
          },
          {
            name: 'Eternity Rings',
            url: '/webstore/l/diamonds/style%7Ceternity/category%7Cjewellery%7Crings/',
          },
        ],
      },
      {
        name: 'By Category',
        url: 'javascript:void(0)',
        sub: [
          {
            name: 'Diamond Earrings',
            url: '/webstore/l/diamonds/category%7Cearrings/',
          },
          {
            name: 'Diamond Necklaces',
            url: '/webstore/l/diamonds/category%7Cnecklaces/',
          },
          {
            name: 'Diamond Bracelets',
            url: '/webstore/l/diamonds/category%7Cbracelets/',
          },
          {
            name: 'Diamond Bangles',
            url: '/webstore/l/diamonds/category%7Cbangles/',
          },
          {
            name: 'Diamond Rings',
            url: '/webstore/l/diamonds/category%7Crings/?Nf=P_Current_Price%7CBTWN+15+9999999',
          },
          {
            name: 'Diamond Set Watches',
            url: '/webstore/l/watches/stone+type%7Cdiamond/',
          },
        ],
      },
      {
        name: 'By Metal Type',
        url: 'javascript:void(0)',
        sub: [
          {
            name: 'White Gold',
            url: '/webstore/l/diamonds/material%7Cwhite+gold/category%7Cjewellery/',
          },
          {
            name: 'Yellow Gold',
            url: '/webstore/l/diamonds/material%7Cyellow+gold/category%7Cjewellery/',
          },
          {
            name: 'Rose Gold',
            url: '/webstore/l/diamonds/material%7Crose+gold/category%7Cjewellery/',
          },
          {
            name: 'Platinum',
            url: '/webstore/l/diamonds/material%7Cplatinum/category%7Cjewellery/',
          },
          {
            name: 'Silver',
            url: '/webstore/l/diamonds/material%7Call+silver/category%7Cjewellery/',
          },
        ],
      },
      {
        name: 'Brands',
        url: 'javascript:void(0)',
        sub: [
          {
            name: 'Vera Wang',
            url: '/webstore/l/diamonds/brand%7Cvera+wang+love/',
          },
          {
            name: 'Tolkowsky',
            url: '/webstore/l/diamonds/brand%7Ctolkowsky/',
          },
          {
            name: 'Leo Diamond',
            url: '/webstore/l/diamonds/brand%7Cleo+diamond/',
          },
          {
            name: 'Neil Lane Bridal',
            url: '/webstore/l/search/?Ntk=PRIMARY&Ntt=Neil+Lane+Bridal/',
          },
          {
            name: 'Neil Lane Designs',
            url: '/webstore/l/search/?Ntk=PRIMARY&Ntt=Neil+Lane+Designs/',
          },
          {
            name: 'The Diamond Story',
            url: '/webstore/l/diamonds/brand%7Cthe+diamond+story/',
          },
          {
            name: 'Le Vian',
            url: '/webstore/l/diamonds/brand%7Cle+vian/',
          },
          {
            name: 'Ernest Jones',
            url: '/webstore/l/diamonds/brand%7Cernest+jones/',
          },
        ],
      },
    ],
  },
  {
    name: 'Brands',
    url: '/webstore/brand-index.do?icid=ej-tn-summer-bi',
  },
];
