export const getData = (isLoggedIn) => {
  return [
  {
    name: `${window.userObj.isLoggedIn === "false" ? 'Login/Register' : 'Account'}`,
    link: `${window.userObj.isLoggedIn === "false" ? 'https://www.boots.com/webapp/wcs/stores/servlet/LogonForm' : 'https://www.boots.com/AjaxLogonForm?myAcctMain=1&catalogId=28501&langId=-1&storeId=11352'}`,
    hasSubmenu: false,
    desktop: false,
  },
  {
    name: 'Advantage Card',
    link: 'https://www.boots.com/advantage-card',
    hasSubmenu: false,
    desktop: false,
    colour: '#b8237b',
  },
  {
    name: 'A-Z Brands',
    regex: '/brands',
    link: 'https://www.boots.com/brands',
    hasSubmenu: false,
    allBrands: true,
  },
  // beauty
  {
    name: 'Beauty & Skincare',
    regex: '/beauty',
    link: 'https://www.boots.com/beauty',
    hasSubmenu: true,
    children: [
      {
        name: 'Brands',
        link: 'https://www.boots.com/beauty/all-beauty-and-skincare-brands',
        hasSubmenu: false,
      },
      {
        name: 'Offers',
        link: 'https://www.boots.com/beauty/beauty-skincare-offers',
        hasSubmenu: false,
      },
      {
        name: 'New in',
        link: 'https://www.boots.com/beauty/new-in-beauty-skincare',
        hasSubmenu: false,
      },
      {
        name: 'Beauty minis',
        link: 'https://www.boots.com/beauty/travel-beauty-minis',
        hasSubmenu: false,
      },
      {
        name: 'Vegan beauty',
        link: 'https://www.boots.com/beauty/vegan-range',
        hasSubmenu: false,
      },
      // makeup
      {
        name: 'Makeup',
        link: 'https://www.boots.com/beauty/makeup',
        hasSubmenu: true,
        children: [
          {
            name: 'Face',
            link: 'https://www.boots.com/beauty/makeup/face',
          },
          {
            name: 'Eyes',
            link: 'https://www.boots.com/beauty/makeup/eyes',
          },
          {
            name: 'Lips',
            link: 'https://www.boots.com/beauty/makeup/lips',
          },
          {
            name: 'Nails',
            link: 'https://www.boots.com/beauty/makeup/nails',
          },
          {
            name: 'Palettes',
            link: 'https://www.boots.com/beauty/makeup/palettes',
          },
          {
            name: 'Beauty gift sets',
            link: 'https://www.boots.com/beauty/makeup/make-up-gift-sets',
          },
          {
            name: 'Brushes & sponges',
            link: 'https://www.boots.com/beauty/makeup/brushes-sponges',
          },
          {
            name: 'Makeup remover',
            link: 'https://www.boots.com/beauty/makeup/make-up-remover-',
          },
          {
            name: 'Mirrors',
            link: 'https://www.boots.com/beauty/makeup/make-up-mirrors',
          },
          {
            name: 'Wash bags & organisers',
            link: 'https://www.boots.com/beauty/makeup/wash-bags',
          },
          {
            name: 'Glitter & accessories',
            link: 'https://www.boots.com/beauty/makeup/glitter-accessories',
          },
        ],
      },
      // hair
      {
        name: 'Hair',
        link: 'https://www.boots.com/beauty/hair',
        hasSubmenu: true,
        children: [
          {
            name: 'Hair dye',
            link: 'https://www.boots.com/beauty/hair/hair-dye',
          },
          {
            name: 'Hair treatments & masks',
            link: 'https://www.boots.com/beauty/hair/hair-treatments-and-masks',
          },
          {
            name: 'Shampoo',
            link: 'https://www.boots.com/beauty/hair/shampoo',
          },
          {
            name: 'Hair styling',
            link: 'https://www.boots.com/beauty/hair/hair-styling',
          },
          {
            name: 'Conditioner',
            link: 'https://www.boots.com/beauty/hair/conditioner',
          },
          {
            name: 'Curls, kinks & coils',
            link: 'https://www.boots.com/beauty/hair/textured-hair',
          },
          {
            name: 'Hair accessories',
            link: 'https://www.boots.com/beauty/hair/hair-accessories',
          },
          {
            name: 'Brushes & combs',
            link: 'https://www.boots.com/beauty/hair/brushes-and-combs',
          },
          {
            name: 'New in hair',
            link: 'https://www.boots.com/beauty/hair/new-in-hair',
          },
          {
            name: 'Premium hair',
            link: 'https://www.boots.com/beauty/hair/luxury-beauty-hair',
          },
          {
            name: 'Hair health vitamins',
            link: 'https://www.boots.com/beauty/hair/hair-health-vitamins',
          },
          {
            name: 'Hair value packs & bundles',
            link: 'https://www.boots.com/beauty/hair/hair-value-packs-and-bundles',
          },
          {
            name: 'Thinning hair',
            link: 'https://www.boots.com/beauty/hair/thinning-hair',
          },
          {
            name: 'Mens hair',
            link: 'https://www.boots.com/beauty/hair/mens-hair',
          },
        ],
      },
      // skincare
      {
        name: 'Skincare',
        link: 'https://www.boots.com/beauty/skincare',
        hasSubmenu: true,
        children: [
          {
            name: 'Facial skincare',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare',
          },
          {
            name: 'All skincare',
            link: 'https://www.boots.com/beauty/skincare/skincare-all-skincare',
          },
          {
            name: 'Body skincare',
            link: 'https://www.boots.com/beauty/skincare/body-skincare',
          },
          {
            name: 'Expert skincare & treatments',
            link: 'https://www.boots.com/beauty/skincare/expert-skincare-',
          },
          {
            name: 'Fake & gradual tan',
            link: 'https://www.boots.com/beauty/skincare/fake-gradual-tan',
          },
          {
            name: 'Female hair removal',
            link: 'https://www.boots.com/beauty/skincare/skincare-female-hair-removal',
          },
          {
            name: 'Mens skincare & body',
            link: 'https://www.boots.com/beauty/skincare/skincare-body',
          },
        ],
      },
      // premium beauty
      {
        name: 'Premium beauty & skincare',
        link: 'https://www.boots.com/beauty/luxury-beauty-skincare',
        hasSubmenu: true,
        children: [
          {
            name: 'Premium skincare',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/all-luxury-skincare',
          },
          {
            name: 'Premium makeup',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-makeup',
          },
          {
            name: 'Premium beauty gifts',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-gift',
          },
          {
            name: 'New in premium',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/new-in-luxury--1',
          },
          {
            name: 'Premium suncare & SPF',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-suncare-tanning-travel',
          },
          {
            name: 'Premium value packs & bundles',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-value-packs-and-bundles',
          },
          {
            name: 'Boss beauty deals',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-offers',
          },
          {
            name: 'Premium hair',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-hair',
          },
          {
            name: "Men's premium",
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-men',
          },
          {
            name: 'Premium beauty book an appointment',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-premium-beauty-book-an-appointment',
          },
          {
            name: 'Premium makeup tools',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-makeup-tools',
          },
        ],
      },
    ],
  },

  // baby & child
  {
    name: 'Baby & Child',
    regex: '/baby-child',
    link: 'https://www.boots.com/baby-child',
    hasSubmenu: true,
    children: [
      // event
      {
        name: 'Baby event',
        link: 'https://www.boots.com/baby-child/baby-event',
        hasSubmenu: false,
      },
      // offers
      {
        name: 'Offers',
        link: 'https://www.boots.com/baby-child/baby-child-offers',
        hasSubmenu: false,
      },
       // toys
      {
        name: 'Toys',
        link: 'https://www.boots.com/baby-child/toys',
        hasSubmenu: false,
      },
       // value packs
      {
        name: 'Value packs & bundles',
        link: 'https://www.boots.com/baby-child/baby-value-packs-and-bundles',
        hasSubmenu: false,
      },
       // Parenting Club
      {
        name: 'Boots Parenting Club',
        link: 'https://www.boots.com/baby-child/parenting-club',
        hasSubmenu: false,
      },
      // new in
      {
        name: 'New in',
        link: 'https://www.boots.com/baby-child/new-in-baby-child',
        hasSubmenu: false,
      },
      // Sustainable baby
      {
        name: 'Sustainable baby',
        link: 'https://www.boots.com/baby-child/sustainable-baby',
        hasSubmenu: false,
      },
      // clothing
      {
        name: 'Clothing',
        link: 'https://www.boots.com/baby-child/mothercare-clothing',
        hasSubmenu: true,
        children: [
          {
            name: 'Baby clothes 0-24 months',
            link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months',
          },
          {
            name: 'All baby & kids clothing',
            link: 'https://www.boots.com/baby-child/mothercare-clothing/shop-all-baby-kids-clothing',
          },
          {
            name: 'Girls clothes 9 months - 6 years',
            link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-girls-clothes-9-months-6-years',
          },
          {
            name: 'Boys clothes 9 months - 6 years',
            link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-boys-clothes-9-months-6-years',
          },
          {
            name: 'New clothing collection',
            link: 'https://www.boots.com/baby-child/mothercare-clothing/new-clothing-collection',
          },
          {
            name: 'Maternity bras',
            link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-maternity-bras',
          },
          {
            name: 'Nightwear & underwear',
            link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-nightwear-underwear',
          },
          {
            name: 'Premature baby range',
            link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-premature-baby-range',
          },
        ],
      },
      // feeding
      {
        name: 'Feeding',
        link: 'https://www.boots.com/baby-child/babyfeeding',
        hasSubmenu: true,
        children: [
          {
            name: 'Baby food & weaning',
            link: 'https://www.boots.com/baby-child/babyfeeding/baby-food-weaning',
          },
          {
            name: 'Bottle feeding',
            link: 'https://www.boots.com/baby-child/babyfeeding/baby-bottles-teats',
          },
          {
            name: 'Baby milk & formula',
            link: 'https://www.boots.com/baby-child/babyfeeding/baby-milk-formula',
          },
          {
            name: 'Toddler food & drink',
            link: 'https://www.boots.com/baby-child/babyfeeding/toddler-food-drink',
          },
          {
            name: 'Breastfeeding',
            link: 'https://www.boots.com/baby-child/babyfeeding/breastfeeding-pumps',
          },
          {
            name: 'Cups',
            link: 'https://www.boots.com/baby-child/babyfeeding/baby-cups',
          },
          {
            name: 'Highchairs & booster seats',
            link: 'https://www.boots.com/baby-child/babyfeeding/highchairs-booster-seats',
          },
          {
            name: 'Dinnerware',
            link: 'https://www.boots.com/baby-child/babyfeeding/child-dinnerware',
          },
          {
            name: 'Lunch bags',
            link: 'https://www.boots.com/baby-child/babyfeeding/lunch-bags',
          },
          {
            name: 'Sterilising',
            link: 'https://www.boots.com/baby-child/babyfeeding/sterilising',
          },
          {
            name: 'Baby value packs & bundles',
            link: 'https://www.boots.com/baby-child/babyfeeding/baby-value-packs-and-bundles',
          },
          {
            name: 'Bibs & muslins',
            link: 'https://www.boots.com/baby-child/babyfeeding/bibs-muslins',
          },
          {
            name: 'Soothers & teethers',
            link: 'https://www.boots.com/baby-child/babyfeeding/soothers-teethers',
          },
        ],
      },
      // bathing & changing
      {
        name: 'Bathing & changing',
        link: 'https://www.boots.com/baby-child/bathing-changing',
        hasSubmenu: true,
        children: [
          {
            name: 'Baby & child toiletries',
            link: 'https://www.boots.com/baby-child/bathing-changing/baby-child-toiletries',
          },
          {
            name: 'Baby baths & accessories',
            link: 'https://www.boots.com/baby-child/bathing-changing/baby-baths-accessories',
          },
          {
            name: 'Changing bags & mats',
            link: 'https://www.boots.com/baby-child/bathing-changing/changing-bags-mats',
          },
          {
            name: 'Nappies',
            link: 'https://www.boots.com/baby-child/bathing-changing/nappies',
          },
          {
            name: 'Baby wipes',
            link: 'https://www.boots.com/baby-child/bathing-changing/baby-wipes',
          },
          {
            name: 'Changing bag essentials',
            link: 'https://www.boots.com/baby-child/bathing-changing/changing-bags-mats',
          },
          {
            name: 'Nappy disposal',
            link: 'https://www.boots.com/baby-child/bathing-changing/nappy-disposal',
          },
          {
            name: 'Kids dental',
            link: 'https://www.boots.com/baby-child/bathing-changing/kids-dental',
          },
          {
            name: 'Potty training',
            link: 'https://www.boots.com/baby-child/bathing-changing/potty-training',
          },
          
        ],
      },
    ],
  },

  // toiletries
  {
    name: 'Toiletries',
    regex: '/toiletries',
    link: 'https://www.boots.com/toiletries/',
    hasSubmenu: true,
    children: [
      //offers
      {
        name: 'Offers',
        link: 'https://www.boots.com/toiletries/toiletries-offers',
        hasSubmenu: false,
      },
      // deodorant
      {
        name: 'Deodorants',
        link: 'https://www.boots.com/toiletries/deodorants-antiperspirants',
        hasSubmenu: false,
      },
      // value packs
      {
        name: 'Value packs & bundles',
        link: 'https://www.boots.com/toiletries/toiletries-value-packs-and-bundles',
        hasSubmenu: false,
      },
      // hair
      {
        name: 'Hair',
        link: 'https://www.boots.com/toiletries/hair',
        hasSubmenu: true,
        children: [
          // hair
          {
            name: 'Shampoo',
            link: 'https://www.boots.com/beauty/hair/shampoo',
          },
          {
            name: 'Hair dye',
            link: 'https://www.boots.com/beauty/hair/hair-dye',
          },
          {
            name: 'All hair',
            link: 'https://www.boots.com/beauty/hair/hair-treatments-and-masks',
          },
          {
            name: 'New in hair',
            link: 'https://www.boots.com/beauty/hair/new-in-hair',
          },
          {
            name: 'Hair styling',
            link: 'https://www.boots.com/beauty/hair/hair-styling',
          },
          {
            name: 'Conditioner',
            link: 'https://www.boots.com/beauty/hair/conditioner',
          },
          {
            name: 'Hair treatments & masks',
            link: 'https://www.boots.com/beauty/hair/hair-treatments-and-masks',
          },
          {
            name: 'Brushes & combs',
            link: 'https://www.boots.com/beauty/hair/brushes-and-combs',
          },
          {
            name: 'Curls, kinks & coils',
            link: 'https://www.boots.com/beauty/hair/textured-hair',
          },
          {
            name: 'Hair accessories',
            link: 'https://www.boots.com/beauty/hair/hair-accessories',
          },
          {
            name: 'Thinning hair',
            link: 'https://www.boots.com/beauty/hair/thinning-hair',
          },
          {
            name: 'Mens hair',
            link: 'https://www.boots.com/beauty/hair/mens-hair',
          },
          {
            name: 'Hair value packs & bundles',
            link: 'https://www.boots.com/beauty/hair/hair-value-packs-and-bundles',
          },
          {
            name: 'Premium hair',
            link: 'https://www.boots.com/beauty/hair/luxury-beauty-hair',
          },
          
        ],
      },
      // dental
      {
        name: 'Dental',
        link: 'https://www.boots.com/toiletries/bootsdental',
        hasSubmenu: true,
        children: [
          {
            name: 'Toothpaste',
            link: 'https://www.boots.com/toiletries/bootsdental/toothpaste',
          },
          {
            name: 'Flossing & accessories',
            link: 'https://www.boots.com/toiletries/bootsdental/flossing-accessories',
          },
          {
            name: 'Mouthwash',
            link: 'https://www.boots.com/toiletries/bootsdental/mouthwash',
          },
          {
            name: 'Electrical dental',
            link: 'https://www.boots.com/toiletries/bootsdental/electrical-dental',
          },
          {
            name: 'Toothbrushes',
            link: 'https://www.boots.com/toiletries/bootsdental/toothbrushes',
          },
          {
            name: 'Denture care',
            link: 'https://www.boots.com/toiletries/bootsdental/denture-care',
          },
          {
            name: 'Oral health',
            link: 'https://www.boots.com/toiletries/bootsdental/oral-health',
          },
          {
            name: 'Teeth whitening',
            link: 'https://www.boots.com/toiletries/bootsdental/teeth-whitening',
          },
          {
            name: 'At home dentistry',
            link: 'https://www.boots.com/toiletries/bootsdental/at-home-dentistry',
          },
          {
            name: 'Kids dental',
            link: 'https://www.boots.com/toiletries/bootsdental/kids-dental',
          },
        ],
      },
      // bath essential
      {
        name: 'Bathroom essentials',
        link: 'https://www.boots.com/toiletries/washing-bathing',
        hasSubmenu: true,
        children: [
          {
            name: 'Bath acccessories',
            link: 'https://www.boots.com/toiletries/washing-bathing/bath-accessories',
          },
          {
            name: 'Shower gels & scrubs',
            link: 'https://www.boots.com/toiletries/washing-bathing/shower-gel',
          },
          {
            name: 'Soap & hand wash',
            link: 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash',
          },
          {
            name: 'Bubble bath salts & oil',
            link: 'https://www.boots.com/toiletries/washing-bathing/bubble-bath-oil',
          },
          {
            name: 'Natural toiletries',
            link: 'https://www.boots.com/toiletries/washing-bathing/natural-toiletries',
          },
          {
            name: 'Tissues, wipes & sanitisers',
            link: 'https://www.boots.com/toiletries/washing-bathing/tissues-wipes-sanitisers',
          },
          {
            name: 'Body scrub',
            link: 'https://www.boots.com/toiletries/washing-bathing/body-scrub',
          },
          {
            name: 'Face wash',
            link: 'https://www.boots.com/toiletries/washing-bathing/face-wash',
          },
          {
            name: 'Wash bags & organisers',
            link: 'https://www.boots.com/toiletries/washing-bathing/wash-bags',
          },
          {
            name: 'Baby & child toiletries',
            link: 'https://www.boots.com/toiletries/washing-bathing/baby-child-toiletries',
          },
          {
            name: 'Bath sets',
            link: 'https://www.boots.com/toiletries/washing-bathing/toiletries-bath-sets',
          },
        ],
      },
      // Feminine hygiene
      {
        name: 'Feminine hygiene',
        link: 'https://www.boots.com/toiletries/feminine-hygiene',
        hasSubmenu: true,
        children: [
          {
            name: 'Sanitary towels',
            link: 'https://www.boots.com/toiletries/feminine-hygiene/sanitary-towels',
          },
          {
            name: 'Panty liners',
            link: 'https://www.boots.com/toiletries/feminine-hygiene/panty-liners',
          },
          {
            name: 'Female incontience',
            link: 'https://www.boots.com/toiletries/feminine-hygiene/female-incontinence',
          },
          {
            name: 'Feminine wash & wipes',
            link: 'https://www.boots.com/toiletries/feminine-hygiene/feminine-wash-wipes',
          },
          {
            name: 'Menstural cups',
            link: 'https://www.boots.com/toiletries/feminine-hygiene/menstrual-cups',
          },
          {
            name: 'Tampons',
            link: 'https://www.boots.com/toiletries/feminine-hygiene/tampons',
          },
          {
            name: 'Bladder weakness',
            link: 'https://www.boots.com/toiletries/feminine-hygiene/bladder-weaknes',
          },
        ],
      },
       // Luxury bath & body
      {
        name: 'Luxury bath & body',
        link: 'https://www.boots.com/toiletries/luxury-bath-body',
        hasSubmenu: true,
        children: [
          {
            name: 'All luxury bath & body',
            link: 'https://www.boots.com/toiletries/luxury-bath-body/bath-body-gifts-',
          },
          {
            name: 'Gifts',
            link: 'https://www.boots.com/toiletries/luxury-bath-body/gifts-luxury-bath-body',
          },
          {
            name: 'New',
            link: 'https://www.boots.com/toiletries/luxury-bath-body/new-in-luxury-bath-body',
          },
          {
            name: 'Vegan',
            link: 'https://www.boots.com/toiletries/luxury-bath-body/vegan-luxury-bath-body',
          },
        ],
      },
      // Men's toiletries
      {
        name: "Men's toiletries",
        link: 'https://www.boots.com/toiletries/mens-toiletries',
        hasSubmenu: true,
        children: [
          {
            name: 'Deodorants & antiperspirants',
            link: 'https://www.boots.com/toiletries/mens-toiletries/mens-deodorants-antiperspirants',
          },
          {
            name: 'Washing & bathing',
            link: 'https://www.boots.com/toiletries/mens-toiletries/mens-washing-bathing',
          },
          {
            name: "Men's skincare & body",
            link: 'https://www.boots.com/toiletries/mens-toiletries/skincare-body',
          },
          {
            name: 'Shaving & grooming',
            link: 'https://www.boots.com/toiletries/mens-toiletries/shaving-grooming',
          },
          {
            name: "Men's gift sets",
            link: 'https://www.boots.com/toiletries/mens-toiletries/mens-gift-sets',
          },
        ],
      },
      // Female hair removal
      {
        name: 'Female hair removal',
        link: 'https://www.boots.com/toiletries/skincare-female-hair-removal',
        hasSubmenu: true,
        children: [
          {
            name: 'Razors',
            link: 'https://www.boots.com/toiletries/skincare-female-hair-removal/womens-razors',
          },
          {
            name: 'Hair removal cream',
            link: 'https://www.boots.com/toiletries/skincare-female-hair-removal/hair-removal-cream',
          },
          {
            name: 'Shaving cream & gel',
            link: 'https://www.boots.com/toiletries/skincare-female-hair-removal/shaving-cream-gel',
          },
          {
            name: 'Epilators',
            link: 'https://www.boots.com/toiletries/skincare-female-hair-removal/epilators',
          },
          {
            name: 'Body & face trimmers',
            link: 'https://www.boots.com/toiletries/skincare-female-hair-removal/body-face-trimmers',
          },
          {
            name: 'IPL hair removal',
            link: 'https://www.boots.com/toiletries/skincare-female-hair-removal/ipl-hair-removal',
          },
          {
            name: 'Wax strips',
            link: 'https://www.boots.com/toiletries/skincare-female-hair-removal/wax-strips',
          },
        ],
      },
    ],
  },

  // wellness
  {
    name: 'Wellness',
    regex: '/wellness',
    link: 'https://www.boots.com/wellness',
    hasSubmenu: true,
    children: [
      {
        name: 'Sleep',
        link: 'https://www.boots.com/wellness/sleep',
        hasSubmenu: false,
      },
      {
        name: 'Everyday stress',
        link: 'https://www.boots.com/wellness/everyday-stress',
        hasSubmenu: false,
      },
      {
        name: 'CBD',
        link: 'https://www.boots.com/wellness/cannabidiol-cbd-oil',
        hasSubmenu: false,
      },
      {
        name: 'New in wellness',
        link: 'https://www.boots.com/wellness/new-in-wellness',
        hasSubmenu: false,
      },
      {
        name: 'Immunity & protection',
        link: 'https://www.boots.com/wellness/immunity-protection',
        hasSubmenu: false,
      },
      {
        name: 'Digestive health',
        link: 'https://www.boots.com/wellness/digestive-health',
        hasSubmenu: false,
      },
      {
        name: 'Beauty supplements',
        link: 'https://www.boots.com/wellness/beautysupplements',
        hasSubmenu: false,
      },
      {
        name: 'Activity trackers',
        link: 'https://www.boots.com/wellness/activity-trackers-1',
        hasSubmenu: false,
      },
      {
        name: 'Energy support',
        link: 'https://www.boots.com/wellness/supplements-for-energy',
        hasSubmenu: false,
      },
      {
        name: 'All vegan products',
        link: 'https://www.boots.com/wellness/all-vegan-products',
        hasSubmenu: false,
      },
    ],
  },

  // fragrance
  {
    name: 'Fragrance',
    regex: '/fragrance',
    link: 'https://www.boots.com/fragrance',
    hasSubmenu: true,
    children: [
      {
        name: 'Brands',
        link: 'https://www.boots.com/fragrance/all-fragrance-brands',
        hasSubmenu: false,
      },
      {
        name: 'Luxury fragrance',
        link: 'https://www.boots.com/fragrance/luxury-fragrance',
        hasSubmenu: false,
      },
      {
        name: 'New in',
        link: 'https://www.boots.com/fragrance/new-in-fragrance',
        hasSubmenu: false,
      },
      {
        name: 'Home fragrance',
        link: 'https://www.boots.com/fragrance/fragrance-home-fragrances',
        hasSubmenu: false,
      },
      {
        name: 'Vegan fragrance',
        link: 'https://www.boots.com/fragrance/vegan-fragrances',
        hasSubmenu: false,
      },
      {
        name: 'Celebrity fragrance',
        link: 'https://www.boots.com/fragrance/celebrity-fragrance',
        hasSubmenu: false,
      },
      {
        name: 'Fragrance exclusives',
        link: 'https://www.boots.com/fragrance/fragrance-exclusives',
        hasSubmenu: false,
      },
      {
        name: 'Perfume',
        link: 'https://www.boots.com/fragrance/perfume',
        hasSubmenu: true,
        children: [
          {
            name: 'All perfumes',
            link: 'https://www.boots.com/fragrance/perfume/all-perfume',
          },
          {
            name: 'Perfume gift sets',
            link: 'https://www.boots.com/fragrance/perfume/perfume-gift-sets',
          },
          {
            name: 'Body mists',
            link: 'https://www.boots.com/fragrance/perfume/body-mists-',
          },
          {
            name: 'Scented bath & body',
            link: 'https://www.boots.com/fragrance/perfume/scented-bath-shower',
          },
        ],
      },
      {
        name: 'Offers',
        link: 'https://www.boots.com/fragrance/fragrance-offers',
        hasSubmenu: true,
        children: [
          {
            name: 'Save up to 1/2 price',
            link: 'https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-save-up-to-half-price',
          },
          {
            name: 'Clearance',
            link: 'https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-clearance',
          },
          {
            name: 'Save £10',
            link: 'https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-save-10-pounds',
          },
          {
            name: 'Free gifts',
            link: 'https://www.boots.com/fragrance/fragrance-offers/complimentary-free-gifts-and-offers-with-selected-purchases',
          },
          {
            name: 'Everyday low prices',
            link: 'https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-every-day-low-prices',
          },
        ],
      },
      {
        name: 'Aftershave',
        link: 'https://www.boots.com/fragrance/aftershave',
        hasSubmenu: true,
        children: [
          {
            name: 'All aftershave',
            link: 'https://www.boots.com/fragrance/aftershave/mens-aftershave',
          },
          {
            name: 'Aftershave gift sets',
            link: 'https://www.boots.com/fragrance/aftershave/aftershave-gift-sets',
          },
          {
            name: 'Cologne',
            link: 'https://www.boots.com/fragrance/aftershave/cologne',
          },
          {
            name: 'Fragrance bath & shower',
            link: 'https://www.boots.com/fragrance/aftershave/fragrance-bath-shower',
          },
        ],
      },
    ],
  },

  // mens
  {
    name: 'Men\'s',
    regex: '/mens',
    link: 'https://www.boots.com/mens',
    hasSubmenu: true,
    children: [
      {
        name: "Skincare & body",
        link: 'https://www.boots.com/mens/skincare-body',
        hasSubmenu: false,
      },
      {
        name: "Men's gift sets",
        link: 'https://www.boots.com/mens/mens-gift-sets',
        hasSubmenu: false,
      },
      {
        name: "Shaving & grooming",
        link: 'https://www.boots.com/mens/shaving-grooming',
        hasSubmenu: true,
        children: [
          {
            name: 'Shaving foams & pre-shave',
            link: 'https://www.boots.com/mens/shaving-grooming/shaving-foams-pre-shave',
          },
          {
            name: 'Razors',
            link: 'https://www.boots.com/mens/shaving-grooming/mens-razors',
          },
          {
            name: 'Razor blades',
            link: 'https://www.boots.com/mens/shaving-grooming/mens-razor-blades',
          },
          {
            name: 'Post shave',
            link: 'https://www.boots.com/mens/shaving-grooming/post-shave',
          },
          {
            name: 'Beard care',
            link: 'https://www.boots.com/mens/shaving-grooming/beardcare',
          },
          {
            name: 'Shaving brushes',
            link: 'https://www.boots.com/mens/shaving-grooming/shaving-brushes',
          },
        ],
      },
      {
        name: "Men's toiletries",
        link: 'https://www.boots.com/toiletries/mens-toiletries',
        hasSubmenu: true,
        children: [
          {
            name: 'Deodorants & antiperspirants',
            link: 'https://www.boots.com/toiletries/mens-toiletries/mens-deodorants-antiperspirants',
          },
          {
            name: "Men's hair",
            link: 'https://www.boots.com/toiletries/mens-toiletries/mens-hair',
          },
          {
            name: 'Washing & bathing',
            link: 'https://www.boots.com/toiletries/mens-toiletries/mens-washing-bathing',
          },
          {
            name: "Men's skincare & body",
            link: 'https://www.boots.com/toiletries/mens-toiletries/skincare-body',
          },
          {
            name: "Shaving & grooming",
            link: 'https://www.boots.com/toiletries/mens-toiletries/shaving-grooming',
          },
          {
            name: "Aftershave",
            link: 'https://www.boots.com/toiletries/mens-toiletries/aftershave',
          },
          {
            name: "Hair loss",
            link: 'https://www.boots.com/toiletries/mens-toiletries/mens-hair-loss',
          },
          {
            name: "Men's gift sets",
            link: 'https://www.boots.com/toiletries/mens-toiletries/mens-gift-sets',
          },
        ],
      },
      {
        name: "Male grooming tools",
        link: 'https://www.boots.com/mens/male-grooming-tools',
        hasSubmenu: true,
        children: [
          {
            name: 'Hair clippers',
            link: 'https://www.boots.com/mens/male-grooming-tools/mens-hair-clippers',
          },
          {
            name: 'All male grooming',
            link: 'https://www.boots.com/mens/male-grooming-tools/all-electrical-male-grooming',
          },
          {
            name: 'Shavers',
            link: 'https://www.boots.com/mens/male-grooming-tools/shavers',
          },
          {
            name: 'Beard & stubble trimmers',
            link: 'https://www.boots.com/mens/male-grooming-tools/beard-stubble-trimmers',
          },
          {
            name: 'Nose & ear trimmers',
            link: 'https://www.boots.com/mens/male-grooming-tools/nose-ear-trimmers',
          },
        ],
      },
      {
        name: "Male incontinence",
        link: 'https://www.boots.com/mens/male-incontinence',
        hasSubmenu: true,
        children: [
          {
            name: 'Pants',
            link: 'https://www.boots.com/mens/male-incontinence/male-incontinence-pants',
          },
          {
            name: 'Pads',
            link: 'https://www.boots.com/mens/male-incontinence/male-incontinence-pads',
          },
          {
            name: 'Slips',
            link: 'https://www.boots.com/mens/male-incontinence/male-incontinence-slips',
          },
        ],
      },
      {
        name: "Aftershave",
        link: 'https://www.boots.com/mens/aftershave',
        hasSubmenu: true,
        children: [
          {
            name: 'All aftershave',
            link: 'https://www.boots.com/mens/aftershave/mens-aftershave',
          },
          {
            name: 'Aftershave gift sets',
            link: 'https://www.boots.com/mens/aftershave/aftershave-gift-sets',
          },
          {
            name: 'Cologne',
            link: 'https://www.boots.com/mens/aftershave/cologne',
          },
          {
            name: 'Fragrance bath & shower',
            link: 'https://www.boots.com/mens/aftershave/fragrance-bath-shower',
          },
        ],
      },
      {
        name: "Men's health",
        link: 'https://www.boots.com/mens/menshealth',
        hasSubmenu: true,
        children: [
          {
            name: "Men's health supplements",
            link: 'https://www.boots.com/mens/menshealth/menshealth-supplements',
          },
          {
            name: 'Hair loss',
            link: 'https://www.boots.com/mens/menshealth/mens-hair-loss',
          },
          {
            name: "Men's sexual health",
            link: 'https://www.boots.com/mens/menshealth/mens-sexual-health',
          },
        ],
      },
    ],
  },

  // health & pharmacy
  {
    name: 'Health & Pharmacy',
    regex: '/health-pharmacy',
    link: 'https://www.boots.com/health-pharmacy',
    hasSubmenu: true,
    children: [
      {
        name: 'Face masks',
        link: 'https://www.boots.com/health-pharmacy/reusable-and-disposable-face-masks',
        hasSubmenu: false,
      },
      {
        name: 'Offers',
        link: 'https://www.boots.com/health-pharmacy/health-offers',
        hasSubmenu: false,
      },
      {
        name: 'Brands',
        link: 'https://www.boots.com/health-pharmacy/all-health-and-pharmacy-brands',
        hasSubmenu: false,
      },
      {
        name: 'New in',
        link: 'https://www.boots.com/health-pharmacy/new-in-health',
        hasSubmenu: false,
      },
      // vitamins
      {
        name: 'Vitamins & supplements',
        link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements',
        hasSubmenu: true,
        children: [
          {
            name: 'Multivitamins',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/multivitamins',
          },
          {
            name: 'Shop by ingredient',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vitamins-supplements-shop-by-ingredient',
          },
          {
            name: 'Immune health',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/immunehealth',
          },
          {
            name: "Women's health supplements",
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/womenshealth-supplements',
          },
          {
            name: 'Joint health',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/jointhealth',
          },
          {
            name: 'Baby & child vitamins',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/baby-child-vitamins',
          },
          {
            name: 'Brain health',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/brainhealth',
          },
          {
            name: 'Digestive health',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/digestive-health',
          },
          {
            name: 'Pregnancy supplements',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/pregnancysupplements',
          },
          {
            name: '50+ multivitamins',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/50plus-multivitamins',
          },
          {
            name: 'Hair health vitamins',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/hair-health-vitamins',
          },
          {
            name: 'Beauty supplements',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/beautysupplements',
          },
          {
            name: 'Eye health',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/eyehealth',
          },
          {
            name: 'Vegan vitamins',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vegan-vitamins',
          },
          {
            name: 'CBD',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/cannabidiol-cbd-oil',
          },
          {
            name: 'Energy support',
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/supplements-for-energy',
          },
          {
            name: "Men's health supplements",
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/menshealth-supplements',
          },
          {
            name: "Bone health",
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/bonehealth',
          },
        ],
      },
      // medicines
      {
        name: 'Medicines & treatments',
        link: 'https://www.boots.com/health-pharmacy/medicines-treatments',
        hasSubmenu: true,
        children: [
          {
            name: 'Footcare',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/footcare',
          },
          {
            name: 'Pain',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/painrelief',
          },
          {
            name: 'Stomach & bowel',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/digestion',
          },
          {
            name: 'Cough, cold & flu',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/cold-flu-medication',
          },
          {
            name: 'Heartburn & indigestion',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/heartburn-indigestion-',
          },
          {
            name: 'Specialist skincare',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/skin-problems',
          },
          {
            name: 'Diabetes',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/diabetes',
          },
          {
            name: 'Earcare',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/ear-care',
          },
          {
            name: 'First aid',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/first-aid',
          },
          {
            name: 'Heart health',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/healthyheart',
          },
          {
            name: 'Mouth & oral care',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/mouth-oral-care',
          },
          {
            name: 'Eyecare',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/eye-care',
          },
          {
            name: 'Hair loss',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/mens-hair-loss',
          },
          {
            name: 'Sleep',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments/sleep',
          },
        ],
      },
      // womens health
      {
        name: "Women's health",
        link: 'https://www.boots.com/health-pharmacy/womenshealth',
        hasSubmenu: true,
        children: [
          {
            name: 'Cystitis & urinary tract infections',
            link: 'https://www.boots.com/health-pharmacy/womenshealth/cystitis-urinary-tract-infections',
          },
          {
            name: 'Thrush',
            link: 'https://www.boots.com/health-pharmacy/womenshealth/thrush',
          },
          {
            name: 'Female incontience',
            link: 'https://www.boots.com/health-pharmacy/womenshealth/female-incontinence',
          },
          {
            name: 'Feminine wash & wipes',
            link: 'https://www.boots.com/health-pharmacy/womenshealth/feminine-wash-wipes',
          },
          {
            name: 'Planning for a baby',
            link: 'https://www.boots.com/health-pharmacy/womenshealth/familyplanning',
          },
          {
            name: 'Menopause',
            link: 'https://www.boots.com/health-pharmacy/womenshealth/menopause',
          },
          {
            name: "Women's health supplements",
            link: 'https://www.boots.com/health-pharmacy/womenshealth/womenshealth-supplements',
          },
          {
            name: 'Bacterial vaginosis',
            link: 'https://www.boots.com/health-pharmacy/womenshealth/vaginitis',
          },
          {
            name: 'Period pain',
            link: 'https://www.boots.com/health-pharmacy/womenshealth/period-pain',
          },
          {
            name: 'Hair loss',
            link: 'https://www.boots.com/health-pharmacy/womenshealth/womens-hair-loss',
          },

        ],
      },
      // covid
      {
        name: "Covid hub",
        link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing',
        hasSubmenu: true,
        children: [
          {
            name: 'COVID-19 testing',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/covid-19-testing',
          },
          {
            name: 'Reusable & disposable face masks',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/surgical-reusable-face-masks',
          },
          {
            name: 'At home testing kits',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/covid-19-at-home-testing-kits',
          },
          {
            name: 'Specialist skincare',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/skin-problems',
          },
          {
            name: 'What is a COVID-19 vaccination?',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/covid-vaccination',
          },
          {
            name: 'Immune health',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/immunehealth',
          },
          {
            name: 'Antibacterials & disinfectants',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/hand-sanitiser-antibacterial-cleaners-disinfectants',
          },
          {
            name: 'Cough, cold & flu',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/cold-flu-medication',
          },
          {
            name: 'Thermometers',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/thermometers',
          },
          {
            name: 'Baby & child vitamins',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/baby-child-vitamins',
          },
          {
            name: 'Pneumonia Vaccination Service',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/pneumonia-vaccination-service',
          },
          {
            name: 'Sleep',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/sleep',
          },
          {
            name: 'Coronavirus (COVID-19)',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/covid-19',
          },
          {
            name: 'First aid',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/first-aid',
          },
          {
            name: 'Help to prevent the spread of COVID-19',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/how-to-stop-covid-spreading',
          },
          {
            name: 'Long term effects of COVID-19',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/what-is-long-covid',
          },
          {
            name: 'Multivitamins',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/multivitamins',
          },
          {
            name: 'Recognising symptoms',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/recognising-coronavirus-symptoms',
          },
          {
            name: 'Vitamin D',
            link: 'https://www.boots.com/wellness/vitaminsandsupplements/vitamins-supplements-shop-by-ingredient/vitamin-D',
          },
          {
            name: 'Winter Flu Jab Service',
            link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/flujab',
          },
        ],
      },
      // sexual pleasure
      {
        name: "Sexual pleasure & wellbeing",
        link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health',
        hasSubmenu: true,
        children: [
          {
            name: 'Adult toys',
            link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/adult-toys',
          },
          {
            name: 'Lubricants & gels',
            link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/lubricants-massagers-gels',
          },
          {
            name: 'Condoms',
            link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/condoms',
          },
          {
            name: 'Feminine hygiene & health',
            link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/feminine-hygiene-and-health',
          },
          {
            name: "Men's hygiene and health",
            link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/mens-hygiene-and-health',
          },
          {
            name: 'Shop all',
            link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/sexual-pleasure-shop-all',
          },
          {
            name: 'Intimate hair removal & grooming',
            link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/intimate-hair-removal',
          },
        ],
      },
      // Incontinence
      {
        name: "Incontinence",
        link: 'https://www.boots.com/health-pharmacy/incontinence',
        hasSubmenu: true,
        children: [
          {
            name: 'Female incontience',
            link: 'https://www.boots.com/health-pharmacy/incontinence/female-incontinence',
          },
          {
            name: 'Pads',
            link: 'https://www.boots.com/health-pharmacy/incontinence/incontinence-pads',
          },
          {
            name: 'Bladder weakness',
            link: 'https://www.boots.com/health-pharmacy/incontinence/bladder-weakness',
          },
          {
            name: 'Male incontinence',
            link: 'https://www.boots.com/health-pharmacy/incontinence/male-incontinence',
          },
          {
            name: "Bed & seat protection",
            link: 'https://www.boots.com/health-pharmacy/incontinence/bed-and-seat-protection',
          },
          {
            name: 'Hygiene & accessories',
            link: 'https://www.boots.com/health-pharmacy/incontinence/hygine-accessories',
          },
          {
            name: 'Slips',
            link: 'https://www.boots.com/health-pharmacy/incontinence/incontinence-slips',
          },
          {
            name: 'Find the right product for you',
            link: 'https://www.boots.com/health-pharmacy/incontinence/staydry-product-finder',
          },
          {
            name: 'Incontinence bundles',
            link: 'https://www.boots.com/health-pharmacy/incontinence/incontinence-multipacks',
          },
          {
            name: 'Liners',
            link: 'https://www.boots.com/health-pharmacy/incontinence/incontinence-liners',
          },
          {
            name: 'Pelvic floor strength',
            link: 'https://www.boots.com/health-pharmacy/incontinence/pelvic-floor-strength',
          },
        ],
      },
    ],
  },

  // gifts
  {
    name: 'Gifts',
    regex: '/gift/',
    link: 'https://www.boots.com/gift',
    hasSubmenu: true,
    children: [
      {
        name: "Birthday gifts",
        link: 'https://www.boots.com/gift/birthday-gifts',
        hasSubmenu: false,
      },
      {
        name: "Candles & home fragrance",
        link: 'https://www.boots.com/gift/candles-home-fragrance-for-her',
        hasSubmenu: false,
      },
      {
        name: "Personalised photo gifts",
        link: 'https://www.boots.com/gift/personalised-photo-gifts',
        hasSubmenu: false
      },
      {
        name: "Gift experience",
        link: 'https://www.boots.com/gift/gift-experience',
        hasSubmenu: false,
      },
      {
        name: "Luxury gifts",
        link: 'https://www.boots.com/gift/luxury-gifts',
        hasSubmenu: false,
      },
      {
        name: "Wrapped gifts",
        link: 'https://www.boots.com/sitesearch?searchTerm=gift%20wrapped%20sets',
        hasSubmenu: false,
      },
      {
        name: "Gifts for her",
        link: 'https://www.boots.com/gift/her',
        hasSubmenu: true,
        children: [
          {
            name: 'All luxury bath & body',
            link: 'https://www.boots.com/gift/her/bath-body-gifts-',
          },
          {
            name: 'Beauty gift sets',
            link: 'https://www.boots.com/gift/her/make-up-gift-sets',
          },
          {
            name: 'Premium beauty gifts',
            link: 'https://www.boots.com/gift/her/luxury-beauty-gift',
          },
          {
            name: 'All perfumes',
            link: 'https://www.boots.com/gift/her/all-perfume',
          },
          {
            name: 'All beauty tools',
            link: 'https://www.boots.com/gift/her/all-electrical-beauty-tools',
          },
          {
            name: 'All hair styling tools',
            link: 'https://www.boots.com/gift/her/all-electrical-hair-styling-tools',
          },
        ],
      },
      {
        name: "Gifts for him",
        link: 'https://www.boots.com/gift/him',
        hasSubmenu: true,
        children: [
          {
            name: "Men's gift sets",
            link: 'https://www.boots.com/gift/him/mens-gift-sets',
          },
          {
            name: 'All aftershave',
            link: 'https://www.boots.com/gift/him/mens-aftershave',
          },
          {
            name: 'All male grooming',
            link: 'https://www.boots.com/gift/him/all-electrical-male-grooming',
          },
        ],
      },
    ]
  },
  
  // electrical
  {
    name: 'Electrical',
    hasSubmenu: true,
    regex: '/electrical',
    link: 'https://www.boots.com/electrical',
    children: [
      {
        name: "Offers",
        link: 'https://www.boots.com/electrical/electrical-offers',
        hasSubmenu: false,
      },
      {
        name: "All electrical",
        link: 'https://www.boots.com/electrical/price-match-promise',
        hasSubmenu: false,
      },
      {
        name: "New in",
        link: 'https://www.boots.com/electrical/new-in-electrical',
        hasSubmenu: false,
      },
      {
        name: "Recycle your electricals",
        link: 'https://www.boots.com/electrical/recycle-your-electricals',
        hasSubmenu: false,
      },
      {
        name: "Hair styling tools",
        link: 'https://www.boots.com/electrical/hair-styling-tools',
        hasSubmenu: true,
        children: [
          {
            name: 'Hot brushes & hair stylers',
            link: 'https://www.boots.com/electrical/hair-styling-tools/hot-brushes-air-stylers',
          },
          {
            name: 'Hair dryers',
            link: 'https://www.boots.com/electrical/hair-styling-tools/hair-dryers',
          },
          {
            name: 'Hair curlers',
            link: 'https://www.boots.com/electrical/hair-styling-tools/hair-curlers',
          },
          {
            name: 'All hair styling tools',
            link: 'https://www.boots.com/electrical/hair-styling-tools/all-electrical-hair-styling-tools',
          },
          {
            name: 'Hair straighteners',
            link: 'https://www.boots.com/electrical/hair-styling-tools/hair-straighteners',
          },
          {
            name: 'Accessories & spares',
            link: 'https://www.boots.com/electrical/hair-styling-tools/hair-tools-accessories-spares',
          },
        ],
      },
      {
        name: "Female hair removal tools",
        link: 'https://www.boots.com/electrical/female-hair-removal-tools',
        hasSubmenu: true,
        children: [
          {
            name: 'IPL hair removal',
            link: 'https://www.boots.com/electrical/female-hair-removal-tools/ipl-hair-removal',
          },
          {
            name: 'Lady shavers',
            link: 'https://www.boots.com/electrical/female-hair-removal-tools/lady-shavers',
          },
          {
            name: 'Epilators',
            link: 'https://www.boots.com/electrical/female-hair-removal-tools/epilators',
          },
          {
            name: 'Body & face trimmers',
            link: 'https://www.boots.com/electrical/female-hair-removal-tools/body-face-trimmers',
          },
          {
            name: 'All female hair removal tools',
            link: 'https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-',
          },
          {
            name: 'All female hair removal',
            link: 'https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-remov',
          },
          {
            name: 'Accessories & spares',
            link: 'https://www.boots.com/electrical/female-hair-removal-tools/hair-removal-accessories-spares',
          },
        ],
      },
      {
        name: "Male grooming tools",
        link: 'https://www.boots.com/electrical/male-grooming-tools',
        hasSubmenu: true,
        children: [
          {
            name: 'Shavers',
            link: 'https://www.boots.com/electrical/male-grooming-tools/shavers',
          },
          {
            name: 'Hair clippers',
            link: 'https://www.boots.com/electrical/male-grooming-tools/mens-hair-clippers',
          },
          {
            name: 'Beard & stubble trimmers',
            link: 'https://www.boots.com/electrical/male-grooming-tools/beard-stubble-trimmers',
          },
          {
            name: 'All male grooming',
            link: 'https://www.boots.com/electrical/male-grooming-tools/all-electrical-male-grooming',
          },
          {
            name: 'Accessories & spares',
            link: 'https://www.boots.com/electrical/male-grooming-tools/male-grooming-accessories-spares',
          },
          {
            name: 'Body groomers',
            link: 'https://www.boots.com/electrical/male-grooming-tools/body-groomers',
          },
          {
            name: 'Nose & ear trimmers',
            link: 'https://www.boots.com/electrical/male-grooming-tools/nose-ear-trimmers',
          },
        ],
      },
      {
        name: "Electrical dental",
        link: 'https://www.boots.com/electrical/electrical-dental',
        hasSubmenu: true,
        children: [
          {
            name: "Electric toothbrushes",
            link: 'https://www.boots.com/electrical/electrical-dental/electric-toothbrushes',
          },
          {
            name: 'Electric flossers',
            link: 'https://www.boots.com/electrical/electrical-dental/electric-flossers',
          },
          {
            name: 'Brush heads',
            link: 'https://www.boots.com/electrical/electrical-dental/dental-brush-heads',
          },
          {
            name: 'Kids electric toothbrushes',
            link: 'https://www.boots.com/electrical/electrical-dental/kids-electric-toothbrushes',
          },
          {
            name: 'All electrical dental',
            link: 'https://www.boots.com/electrical/electrical-dental/all-electrical-dental-',
          },
        ],
      },
      {
        name: "Kitchen Appliances",
        link: 'https://www.boots.com/electrical/boots-kitchen-appliances',
        hasSubmenu: true,
        children: [
          {
            name: 'Washers & dryers',
            link: 'https://www.boots.com/electrical/boots-kitchen-appliances/washers-and-dryers-',
          },
          {
            name: 'Cooking',
            link: 'https://www.boots.com/electrical/boots-kitchen-appliances/cooking-',
          },
          {
            name: 'All products',
            link: 'https://www.boots.com/electrical/boots-kitchen-appliances/kitchen-appliances-all-products',
          },
          {
            name: 'Fridges & freezers',
            link: 'https://www.boots.com/electrical/boots-kitchen-appliances/fridges-and-freezers-',
          },
          {
            name: 'Dishwashers',
            link: 'https://www.boots.com/electrical/boots-kitchen-appliances/dishwashers-',
          },
          {
            name: 'Sound & vision',
            link: 'https://www.boots.com/electrical/boots-kitchen-appliances/sound-and-vision-',
          },
        ],
      },
      {
        name: "Beauty tools",
        link: 'https://www.boots.com/electrical/beauty-tools',
        hasSubmenu: true,
        children: [
          {
            name: 'Anti-ageing',
            link: 'https://www.boots.com/electrical/beauty-tools/anti-ageing',
          },
          {
            name: 'Facial beauty tools',
            link: 'https://www.boots.com/electrical/beauty-tools/facial-beauty-tools',
          },
          {
            name: 'All beauty tools',
            link: 'https://www.boots.com/electrical/beauty-tools/all-electrical-beauty-tools',
          },
          {
            name: 'Facial cleansing brushes',
            link: 'https://www.boots.com/electrical/beauty-tools/facial-cleansing-brush',
          },
          {
            name: 'Manicure & pedicure tools',
            link: 'https://www.boots.com/electrical/beauty-tools/manicure-pedicure-tools',
          },
          {
            name: 'Acne treatments',
            link: 'https://www.boots.com/electrical/beauty-tools/acne-treatments',
          },
        ],
      },
    ]
  },

  // opticians
  {
    name: 'Opticians',
    hasSubmenu: true,
    regex: '/opticians',
    link: 'https://www.boots.com/webapp/wcs/stores/servlet/opticians',
    children: [
      {
        name: "Book an eye test",
        link: 'https://www.boots.com/webapp/wcs/stores/servlet/opticians/eyetest',
        hasSubmenu: false,
      },
      {
        name: "Brands",
        link: 'https://www.boots.com/webapp/wcs/stores/servlet/opticians/all-opticians-brands',
        hasSubmenu: false,
      },
      {
        name: "Hearingcare",
        link: 'https://www.boots.com/webapp/wcs/stores/servlet/opticians/hearingcare',
        hasSubmenu: false,
      },
      {
        name: "Glasses frames",
        link: 'https://www.boots.com/webapp/wcs/stores/servlet/opticians/glasses',
        hasSubmenu: true,
        children: [
          {
            name: 'Womens',
            link: 'https://www.boots.com/opticians/glasses/opticians-glasses-womens',
          },
          {
            name: 'Mens',
            link: 'https://www.boots.com/opticians/glasses/mens-glasses',
          },
          {
            name: 'All frames',
            link: 'https://www.boots.com/opticians/glasses/all-frames-boots-opticians',
          },
          {
            name: 'Kids & teens',
            link: 'https://www.boots.com/opticians/glasses/kids-teens-glasses',
          },
          {
            name: 'Ready readers',
            link: 'https://www.boots.com/opticians/glasses/ready-readers',
          },
        ],
      },
      {
        name: "Contact lenses",
        link: 'https://www.boots.com/opticians/contactlenses/',
        hasSubmenu: true,
        children: [
          {
            name: 'Contact lens solutions',
            link: 'https://www.boots.com/opticians/contactlenses/lens-cleaning-solutions',
          },
          {
            name: 'Buying contact lenses',
            link: 'https://www.boots.com/opticians/contactlenses/buying-contact-lenses-',
          },
          {
            name: 'Contact Lens Reward Scheme',
            link: 'https://www.boots.com/opticians/contactlenses/contact-lens-rewards-plan',
          },
          {
            name: 'Acuvue Contact Lenses',
            link: 'https://www.boots.com/opticians/contactlenses/acuvue-contact-lenses',
          },
        ],
      },
      {
        name: "Boots Opticians Sunglasses",
        link: 'https://www.boots.com/electrical/female-hair-removal-tools',
        hasSubmenu: true,
        children: [
          {
            name: 'Womens',
            link: 'https://www.boots.com/opticians/prescription-sunglasses/womens-prescription-sunglasses',
          },
          {
            name: 'Mens',
            link: 'https://www.boots.com/opticians/prescription-sunglasses/mens-prescription-sunglasses',
          },
          {
            name: 'All opticians sunglasses',
            link: 'https://www.boots.com/opticians/prescription-sunglasses/all-sunglasses-boots-opticians',
          },
          {
            name: 'Polaroid Sunglasses',
            link: 'https://www.boots.com/opticians/prescription-sunglasses/polaroid-sunglasses-',
          },
          {
            name: 'Kids & teens',
            link: 'https://www.boots.com/opticians/prescription-sunglasses/kids-teens-prescription-sunglasses',
          },
        ],
      },
      {
        name: "Opticians offers",
        link: 'https://www.boots.com/electrical/male-grooming-tools',
        hasSubmenu: true,
        children: [
          {
            name: 'Great value glasses',
            link: 'https://www.boots.com/opticians/opticians-offers/great-value-glasses-',
          },
          {
            name: 'Offers for over 60s',
            link: 'https://www.boots.com/opticians/opticians-offers/opticians-offers-over-60s',
          },
          {
            name: 'Free contact lens trial',
            link: 'https://www.boots.com/opticians/opticians-offers/free-contact-lens-assessment-trial-service',
          },
          {
            name: 'Offers for students',
            link: 'https://www.boots.com/opticians/opticians-offers/opticians-offers-students',
          },
          {
            name: 'Klarna pay in 3',
            link: 'https://www.boots.com/opticians/opticians-offers/pay-with-klarna',
          },
        ],
      },
      {
        name: "Glasses lenses",
        link: 'https://www.boots.com/electrical/electrical-dental',
        hasSubmenu: true,
        children: [
          {
            name: 'Glasses lenses guide',
            link: 'https://www.boots.com/opticians/prescription-lenses/guide-to-your-glasses-lenses',
          },
          {
            name: 'Transitions lenses',
            link: 'https://www.boots.com/opticians/prescription-lenses/transitions-lenses',
          },
          {
            name: 'Zeiss Drivesafe Lenses',
            link: 'https://www.boots.com/opticians/prescription-lenses/zeiss-drivesafe-lenses-',
          },
          {
            name: 'Varifocal lenses explained',
            link: 'https://www.boots.com/opticians/prescription-lenses/varifocal-lenses',
          },
          {
            name: 'Varilux Varifocal Lenses',
            link: 'https://www.boots.com/opticians/prescription-lenses/varifocal-varilux-lenses',
          },
        ],
      },
    ]
  },
  
  {
    name: 'Services',
    hasSubmenu: true,
    children: [
      {
        name: 'Prescriptions',
        link: '#',
        hasSubmenu: true,
        children: [
          {
            name: 'NHS repeat prescriptions',
            link: 'https://www.boots.com/online-prescriptions',
          },
          {
            name: 'Prescription support',
            link: 'https://www.boots.com/prescription-support',
          },
          {
            name: 'Managing your condition',
            link: 'https://www.boots.com/managing-your-condition',
          },
          {
            name: 'NHS Services',
            link: 'https://www.boots.com/nhs-services',
          },
          {
            name: 'Prescription delivery service',
            link: 'https://www.boots.com/prescription-delivery-service',
          },
        ],
      },
      {
        name: 'Health Hub',
        link: '#',
        hasSubmenu: true,
        children: [
          {
            name: 'Visit health hub',
            link: 'https://www.boots.com/healthhub',
          },
          {
            name: 'Appointment booking',
            link: 'https://www.boots.com/appointment-booking',
          },
          {
            name: 'COVID-19 testing',
            link: 'https://www.boots.com/covid-19-testing',
          },
          {
            name: 'Health & pharmacy',
            link: 'https://www.boots.com/health-pharmacy-advice',
          },
          {
            name: 'Opticians',
            link: 'https://www.boots.com/opticians-service',
          },
          {
            name: 'Boots for business',
            link: 'https://www.boots.com/boots-for-business',
          },
        ],
      },
      {
        name: 'Advice',
        link: '#',
        hasSubmenu: true,
        children: [
          {
            name: 'Health',
            link: 'https://www.boots.com/health',
          },
          {
            name: 'Wellness',
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/wellness-advice',
          },
          {
            name: 'Beauty & skincare',
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/skincare-beauty-advice',
          },
          {
            name: 'Self-care at home',
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/self-care-at-home',
          },
          {
            name: 'Fragrance',
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/fragrance-advice',
          },
          {
            name: 'Baby & child',
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/parentingadvice',
          },
          {
            name: 'Electrical',
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/electrical-inspiration-and-advice',
          },
          {
            name: 'Opticians advice',
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/opticians-advice',
          },
          {
            name: 'Sun & holiday',
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/sun-and-holiday-inspiration',
          },
          {
            name: 'Gifting',
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/gifting-',
          },
          {
            name: 'Health & Beauty magazine',
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/health-beauty-magazine',
          },
          {
            name: 'Boots Beauty Specialists',
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/boots-beauty-specialists',
          },
          {
            name: 'Glamour Beauty Festival',
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/glamour-beauty',
          },
          {
            name: "Boots & women's football",
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/womens-football',
          },
          {
            name: 'Recycle at Boots',
            link: 'https://www.boots.com/webapp/wcs/stores/servlet/boots-recycling-scheme',
          },
        ],
      },
     
    ],
  },
  ];
}

