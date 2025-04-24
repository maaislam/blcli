const data = [
  {
    name: 'Watch Our Story',
    link: '/pages/neom-is-here-for-you',
    hasSubmenu: false,
  },
  {
    name: 'Our Best Sellers',
    link: '/collections/bestsellers',
    hasSubmenu: false,
  },
  {
    name: 'Home Fragrance',
    hasSubmenu: true,
    children: [
      {
        name: 'All Home Fragrance',
        link: '/collections/home',
      },
      {
        name: 'Essential Oil Blends',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/PNS_Essential_Oil_box_and_product_750x750.jpg',
        link: '/collections/essential-oil-blends',
      },
      {
        name: 'Wellbeing Pod',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/PodwithWire_750x750.jpg',
        link: '/collections/wellbeing-pod',
      },
      {
        name: 'Candles',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Real_Luxuxury_3_wick_product_750x750.jpg',
        link: '/collections/candles',
      },
      {
        name: 'Reed Diffusers',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/PNS_Reed_Diffuser_product_750x750.jpg',
        link: '/collections/reed-diffusers',
      },
      {
        name: 'Pillow Mists',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/PNSPillowMistBox_Product_jpg_c7a3a202-d4cc-495a-9556-0459eee6a8a5_750x750.png',
        link: '/collections/pillow-mist',
      },
      {
        name: 'Home Mists',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Real_Luxury_Home_Mist_box_and_product_750x750.jpg',
        link: '/collections/mists',
      },
      {
        name: 'Best Sellers in Home Fragrance',
        link: '/collections/our-home-fragrance-heroes',
      },
    ],
  },
  {
    name: 'Bath & Body',
    hasSubmenu: true,
    children: [
      {
        name: 'All Bath & Body',
        link: '/collections/bath-body',
      },
      {
        name: 'Anti-bacterial Hand Sanitisers',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Clean_Happyhandsanitiserspraybox_product_750x750.jpg',
        link: '/collections/anti-bacterial-hand-sanitiser-gel',
      },
      {
        name: 'Hand & Body Washes',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/CompleteBlissWash_Lotion_750x750.jpg',
        link: '/collections/body-washes-lotions',
      },
      {
        name: 'Natural Soap Bar',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/GreatDaySoapBox_Product_750x750.jpg',
        link: '/collections/natural-soap',
      },
      {
        name: 'Hand Balms',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/30mlhandbalms_750x750.jpg',
        link: '/collections/hand-balms',
      },
      {
        name: 'Intensive Skin Treatment Candle',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Real_Luxury_Intensive_skin_candle_box_and_product_750x750.jpg',
        link: '/collections/intensive-skin-treatment-candles',
      },
      {
        name: 'Magnesium Body Butter',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/BedtimeHeroMagButter_750x750.jpg',
        link: '/collections/body-butter',
      },
      {
        name: 'Bath Salts, Oils & Foams',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/sleep_bath_salts_750x750.jpg',
        link: '/collections/bath-oils-foams',
      },
      {
        name: 'Body Oils & Scrubs',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/PNSBodyOilBoxandProduct_750x750.jpg',
        link: '/collections/body-oils-scrubs',
      },
      {
        name: 'Best Sellers in Bath & Body',
        link: '/collections/bath-body-bestsellers',
      },
    ],
  },
  {
    name: 'Skincare',
    hasSubmenu: true,
    children: [
      {
        name: 'All Skincare',
        link: '/collections/skincare',
      },
      {
        name: 'The Wonder Balm',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/GreatDayWonderBalmBoxandProduct_750x750.png',
        link: '/collections/wonder-balm',
      },
      {
        name: 'Cleansers',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Great_Day_Glow_Face_Wash_750x750.jpg',
        link: '/collections/cleansing-balm',
      },
      {
        name: 'Face Oil',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/neom-perfect-night_s-sleep-face-oil_750x750.jpg',
        link: '/collections/face-oil',
      },
      {
        name: 'Face Serum',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Great_Day_Glow_Serum_750x750.jpg',
        link: '/collections/face-serum',
      },
      {
        name: 'SPF Moisturiser',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Great_Day_Glow_Face_SPF_750x750.jpg',
        link: '/collections/spf-moisturiser',
      },
      {
        name: 'Personal Skincare Finder',
        link: '/pages/personal-skincare-finder',
      },
    ],
  },
  {
    name: 'Perfume',
    hasSubmenu: true,
    children: [
      {
        name: 'Natural Perfume',
        image: 'https://cdn.shopify.com/s/files/1/0028/2568/3008/products/HappinessWellbeingFragranceProduct_Box_750x750.jpg',
        link: '/collections/wellbeing-fragrances'
      }
    ],
  },
  {
    name: 'Gifts',
    hasSubmenu: false,
    link: '/pages/feel-good-gifts'
  }
];

export default data;
