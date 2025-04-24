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

  // beauty
  {
    name: 'Beauty & Skincare',
    regex: '/beauty',
    link: 'https://www.boots.com/beauty',
    hasSubmenu: true,
    children: [
      // categories
      {
        name: 'Shop Category',
        hasSubmenu: true,
        all: false,
        type: 'two-columns',
        children: 
        [
          {
            name: 'All Skincare',
            link: 'https://www.boots.com/beauty/skincare',
          },
          {
            name: 'Facial Skincare',
            link: 'https://www.boots.com/facial-skincare',
          },
          {
            name: 'Body Skincare',
            link: 'https://www.boots.com/beauty/skincare/body-skincare',
          },
          {
            name: 'Hair',
            link: 'https://www.boots.com/beauty/hair',
          },
          {
            name: 'New In',
            link: 'https://www.boots.com/beauty/new-in-beauty-skincare',
          },
          {
            name: 'Premium Skincare and Beauty',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare',
          },
          {
            name: 'Accessories',
            link: 'https://www.boots.com/beauty/beauty-accessories',
          },
          {
            name: 'Makeup',
            link: 'https://www.boots.com/beauty/makeup',
          },
          {
            name: 'Makeup - Face',
            link: 'https://www.boots.com/beauty/makeup/face',
          },
          {
            name: 'Makeup - Eyes',
            link: 'https://www.boots.com/beauty/makeup/eyes',
          },
          {
            name: 'Makeup - Lips',
            link: 'https://www.boots.com/beauty/makeup/lips',
          },
          {
            name: 'Makeup - Nails',
            link: 'https://www.boots.com/beauty/makeup/nails',
          },
        ],
      },
      // offers
      {
        name: 'Top Offers',
        hasSubmenu: true,
        type: 'list', // or bannerimages
        all: false,
        type: 'one-column',
        children: 
        [
          {
            name: 'Shop All Offers',
            link: 'https://www.boots.com/beauty/beauty-skincare-offers',
          },
          {
            name: 'Beauty Value Packs & Bundles',
            link: 'https://www.boots.com/beauty/beauty-value-packs-and-bundles',
          },
          {
            name: 'Boss Beauty Deals',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-offers',
          },
          {
            name: 'No7 Clearance',
            link: 'https://www.boots.com/beauty/no7/no7-clearance-range',
          },   
        ],
      },
      // shop by
      {
        name: 'Shop By',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          {
            name: 'Vegan Beauty',
            link: 'https://www.boots.com/beauty/vegan-range',
          },
          {
            name: 'Beauty Minis',
            link: 'https://www.boots.com/beauty/travel-beauty-minis',
          },
          {
            name: 'Beauty Services',
            link: 'https://www.boots.com/beauty/makeup/lips',
          },
        ],
      },
    ],
  },

  {
    name: 'Toiletries',
    regex: '/toiletries',
    link: 'https://www.boots.com/toiletries',
    hasSubmenu: true,
    children: [
      // categories
      {
        name: 'Shop Category',
        hasSubmenu: true,
        all: false,
        type: 'two-columns',
        children: 
        [
          {
            name: 'New In Toiletries',
            link: 'https://boots.com/toiletries/new-in-toiletries',
          },
          {
            name: 'Skincare',
            link: 'https://www.boots.com/toiletries/skincare',
          },
          {
            name: 'Hair',
            link: 'https://www.boots.com/toiletries/hair',
          },
          {
            name: 'Dental',
            link: 'https://www.boots.com/toiletries/bootsdental',
          },
          {
            name: 'Bathroom Essentials',
            link: 'https://www.boots.com/toiletries/washing-bathing',
          },
          {
            name: 'Luxury Bath & Body',
            link: 'https://www.boots.com/toiletries/luxury-bath-body',
          },
          {
            name: "Men's Toiletries",
            link: 'https://www.boots.com/toiletries/mens-toiletries',
          },
          {
            name: "Feminine Hygiene",
            link: 'https://www.boots.com/toiletries/feminine-hygiene',
          },
          {
            name: "Sun & Holiday",
            link: 'https://www.boots.com/toiletries/suncare',
          },
          {
            name: "Fake & Gradual Tan",
            link: 'https://www.boots.com/toiletries/fake-gradual-tan',
          },
          {
            name: "Deodorants and Anti-Perspirant",
            link: 'https://www.boots.com/toiletries/deodorants-antiperspirants',
          },
          {
            name: "Shampoo",
            link: 'https://www.boots.com/toiletries/hair/shampoo',
          },
          {
            name: "Hair Dye",
            link: 'https://www.boots.com/toiletries/hair/hair-dye',
          },
          
        ],
      },
       // offers
      {
        name: 'Top Offers',
        hasSubmenu: true,
        type: 'list',
        all: false,
        type: 'one-column',
        children: 
        [
          {
            name: 'Shop All Offers',
            link: 'https://www.boots.com/toiletries/toiletries-offers',
          },
          {
            name: 'Toiletries Value Packs & Bundles',
            link: 'https://www.boots.com/toiletries/toiletries-value-packs-and-bundles',
          },
          
        ],
      },
    ],
  },

  // baby child
  {
    name: 'Baby & Child',
    regex: '/baby-child',
    link: 'https://www.boots.com/baby-child',
    hasSubmenu: true,
    children: [
      // categories
      {
        name: 'Shop Category',
        hasSubmenu: true,
        all: false,
        type: 'two-columns',
        children: 
        [
          {
            name: 'Travel',
            link: 'https://www.boots.com/baby-child/pushchairs-car-seats',
          },
          {
            name: 'Nursery & Bedding',
            link: 'https://www.boots.com/baby-child/nursery-furniture',
          },
          {
            name: 'Clothing',
            link: 'https://www.boots.com/baby-child/mothercare-clothing',
          },
          {
            name: 'Feeding',
            link: 'https://www.boots.com/baby-child/babyfeeding',
          },
          {
            name: 'Bathing & Changing',
            link: 'https://www.boots.com/baby-child/bathing-changing',
          },
          {
            name: "Pregnancy & Maternity",
            link: 'https://www.boots.com/baby-child/pregnancy-maternity',
          },
          {
            name: "Baby & Child Health",
            link: 'https://www.boots.com/baby-child/baby-child-health',
          },
          {
            name: "Toys",
            link: 'https://www.boots.com/baby-child/toys',
          },
          {
            name: "Sustainable Baby",
            link: 'https://www.boots.com/baby-child/sustainable-baby',
          },
        ],
      },
       // offers
      {
        name: 'Top Offers',
        hasSubmenu: true,
        type: 'list',
        all: false,
        type: 'one-column',
        children: 
        [
          {
            name: 'Shop all offers',
            link: 'https://www.boots.com/baby-child/baby-child-offers',
          },
          {
            name: 'Baby Value Packs & Bundles',
            link: 'https://www.boots.com/baby-child/baby-value-packs-and-bundles',
          },
                       
        ],
      },
       // More
       {
        name: 'More In Baby',
        hasSubmenu: true,
        type: 'list',
        all: false,
        type: 'one-column',
        children: 
        [
          {
            name: 'Pregnancy, Baby & Child Advice',
            link: 'https://www.boots.com/parentingadvice',
          },
          {
            name: 'Boots Parenting Club',
            link: 'https://www.boots.com/baby-child/parenting-club',
          },
          {
            name: 'Baby Event',
            link: 'https://www.boots.com/baby-child/baby-event',
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
      // categories
      {
        name: 'Shop Health & Pharmacy',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          {
            name: 'Health Offers',
            link: 'https://www.boots.com/health-pharmacy/health-offers',
          },
          {
            name: 'Health Value Packs & Bundles',
            link: 'https://www.boots.com/health-pharmacy/health-value-packs-and-bundles',
          },
          {
            name: 'Reusable and disposable face masks',
            link: 'https://www.boots.com/health-pharmacy/reusable-and-disposable-face-masks',
          },
          {
            name: 'Antibacterial & Disinfectants',
            link: 'https://www.boots.com/health-pharmacy/hand-sanitiser-antibacterial-cleaners-disinfectants',
          },
          {
            name: 'Medicines & Treatments',
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments',
          },
          {
            name: "Vitamins & Supplements",
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplementsy',
          },
          {
            name: "Baby & Child Health",
            link: 'https://www.boots.com/health-pharmacy/baby-child-health',
          },
          {
            name: "Women's Health",
            link: 'https://www.boots.com/health-pharmacy/womenshealth',
          },
          {
            name: "Men's Health",
            link: 'https://www.boots.com/health-pharmacy/menshealth',
          },
          {
            name: "Lifestyle & Wellbeing",
            link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing',
          },
          {
            name: "Sexual Health & Wellbeing",
            link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health',
          },
          {
            name: "Incontinence",
            link: 'https://www.boots.com/health-pharmacy/incontinence',
          },
          {
            name: "Electrical Health & Diagnostics",
            link: 'https://www.boots.com/health-pharmacy/electrical-health-diagnostics',
          },
          {
            name: "Mobility & Living Aids",
            link: 'https://www.boots.com/health-pharmacy/livingaidsy',
          },
          {
            name: "Travel Health",
            link: 'https://www.boots.com/health-pharmacy/travel-health',
          },
          {
            name: "Brands",
            link: 'https://www.boots.com/health-pharmacy/all-health-and-pharmacy-brands',
          },
        ],
      },
       //wellness
      {
        name: 'Shop Wellness',
        hasSubmenu: true,
        type: 'list',
        all: false,
        type: 'one-column',
        children: 
        [
          {
            name: 'Immunity & Protection',
            link: 'https://www.boots.com/wellness/immunity-protection',
          },
          {
            name: 'Sleep',
            link: 'https://www.boots.com/wellness/sleep',
          },
          {
            name: 'Everyday Stress',
            link: 'https://www.boots.com/wellness/everyday-stress',
          },
          {
            name: 'CBD',
            link: 'https://www.boots.com/wellness/cannabidiol-cbd-oil',
          },
          {
            name: 'Diet & Weight Management',
            link: 'https://www.boots.com/wellness/weightloss',
          },
          {
            name: 'Alternative Therapies',
            link: 'https://www.boots.com/wellness/wellness-supplements',
          },
          {
            name: 'Digestive Health',
            link: 'https://www.boots.com/wellness/digestive-health',
          },
          {
            name: 'Energy Support',
            link: 'https://www.boots.com/wellness/supplements-for-energy',
          },
          {
            name: 'Food & Drink',
            link: 'https://www.boots.com/wellness/food-and-drink',
          },
          {
            name: 'Sustainable Living',
            link: 'https://www.boots.com/wellness/sustainable-living',
          },
          {
            name: 'Beauty Supplements',
            link: 'https://www.boots.com/wellness/beautysupplements',
          },
          {
            name: 'Activity Trackers',
            link: 'https://www.boots.com/wellness/activity-trackers-1',
          },
          {
            name: 'Recipe Books & Accessories',
            link: 'https://www.boots.com/wellness/recipe-book-accessories',
          },
          {
            name: 'All Vegan Products',
            link: 'https://www.boots.com/wellness/all-vegan-products',
          },
          
        ],
      },
       // More
       {
        name: 'Boots Health Hub',
        link: 'https://www.boots.com/healthhub',
        hasSubmenu: true,
        type: 'list',
        all: false,
        type: 'one-column',
        children: 
        [
          {
            name: 'Prescriptions',
            //link: 'https://www.boots.com/parentingadvice',
          },
          {
            name: 'NHS Repeat Prescriptions',
            link: 'https://www.boots.com/online-prescriptions',
          },
          {
            name: 'Prescription Support',
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
            name: 'Prescription Delivery',
            link: 'https://www.boots.com/prescription-support/prescription-delivery-service',
          },
          {
            name: 'Advice',
            //link: 'https://www.boots.com/parentingadvice',
          },
          {
            name: 'Health',
            link: 'https://www.boots.com/health',
          },
          {
            name: 'Wellness Inspiration',
            link: 'https://www.boots.com/wellness-advice',
          },
        ],
      },
    ],
  },

    // gifts
    {
      name: 'Gifts',
      regex: '/gifts',
      link: 'https://www.boots.com/gift',
      hasSubmenu: true,
      children: [
         //categories
         {
          name: 'Shop Category',
          hasSubmenu: true,
          type: 'list',
          all: false,
          type: 'two-column',
          children: 
          [
            {
              name: 'Beauty gift sets',
              link: 'https://www.boots.com/gift/her/make-up-gift-sets',
            },
            {
              name: 'Premium Beauty gifts',
              link: 'https://www.boots.com/gift/her/luxury-beauty-gift',
            },
            {
              name: 'All Perfumes',
              link: 'https://www.boots.com/gift/her/all-perfume',
            },
            {
              name: 'All Aftershave',
              link: 'https://www.boots.com/gift/him/mens-aftershave',
            },
            
            {
              name: 'Men\'s gift sets',
              link: 'https://www.boots.com/gift/him/mens-gift-sets',
            },
            {
              name: 'Candles & home fragrance',
              link: 'https://www.boots.com/gift/candles-home-fragrance-for-her',
            },
            {
              name: 'Luxury Gifts',
              link: 'https://www.boots.com/gift/luxury-gifts',
            },
            {
              name: 'Luxury Bath & Body',
              link: 'https://www.boots.com/gift/her/bath-body-gifts-',
            },
            {
              name: 'Experience days',
              link: 'https://www.boots.com/gift/experience-days',
            },
            {
              name: 'Gift experience',
              link: 'https://www.boots.com/gift/gift-experience',
            },
            {
              name: 'Personalised photo gifts',
              link: 'https://www.boots.com/gift/personalised-photo-gifts',
            },
            {
              name: 'Gift cards',
              link: 'https://www.boots.com/gift/gift-cards',
            },          
          ],
        },
        // Recipient
        {
          name: 'Shop by Recipient',
          hasSubmenu: true,
          all: false,
          type: 'one-column',
          children: 
          [
            {
              name: 'Gifts for her',
              link: 'https://www.boots.com/gift/her',
            },
            {
              name: 'Gifts for him',
              link: 'https://www.boots.com/gift/him',
            },
            {
              name: 'Gifts for teachers',
              link: 'https://www.boots.com/gift/teacher-gifts',
            },
          ],
        },
        
         // More
        //  {
        //   name: 'Shop by Occasion',
        //   link: 'https://www.boots.com/healthhub',
        //   hasSubmenu: true,
        //   type: 'list',
        //   all: false,
        //   type: 'one-column',
        //   children: 
        //   [
            
        //     {
        //       name: 'Birthday gifts',
        //       link: 'https://www.boots.com/gift/birthday-gifts',
        //     },
        //     {
        //       name: 'Fathers day gifts',
        //       link: 'https://www.boots.com/gift/fathers-day',
        //     },
            
        //   ],
        // },
      ],
    },
  
    // Fragrance
    {
      name: 'Fragrance',
      regex: '/fragrance',
      link: 'https://www.boots.com/fragrance',
      hasSubmenu: true,
      children: [
         //categories
         {
          name: 'Shop by Category',
          hasSubmenu: true,
          type: 'list',
          all: false,
          type: 'one-column',
          children: 
          [
            {
              name: 'Perfume',
              link: 'https://www.boots.com/fragrance/perfume',
            },
            {
              name: 'Aftershave',
              link: 'https://www.boots.com/fragrance/aftershave',
            },
            {
              name: 'Fragrance Gift Sets',
              link: 'https://www.boots.com/fragrance/fragrance-gift-sets',
            },
            {
              name: 'Luxury Fragrance',
              link: 'https://www.boots.com/fragrance/luxury-fragrance',
            },
            {
              name: 'Celebrity Fragrance',
              link: 'https://www.boots.com/fragrance/celebrity-fragrance',
            },
            {
              name: 'New In',
              link: 'https://www.boots.com/fragrance/new-in-fragrance',
            },
            {
              name: 'Home Fragrance',
              link: 'https://www.boots.com/fragrance/fragrance-home-fragrances',
            },
                    
          ],
        },
        // Recipient
        {
          name: 'Offers',
          hasSubmenu: true,
          all: false,
          type: 'one-column',
          children: 
          [
            {
              name: 'View all offers',
              link: 'https://www.boots.com/fragrance/fragrance-offers',
            },
            {
              name: 'Save up to 1/2 price on selected fragrances',
              link: 'https://www.boots.com/fragrance-offers-save-up-to-half-price',
            },
            {
              name: 'Free gift',
              link: 'https://www.boots.com/fragrance/fragrance-offers/complimentary-free-gifts-and-offers-with-selected-purchases',
            },
            {
              name: 'Everyday low prices',
              link: 'https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-every-day-low-prices',
            },
            {
              name: 'Clearance',
              link: 'https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-clearance',
            },
            
          ],
        },
        
         // More
         {
          name: 'Shop by',
          hasSubmenu: true,
          type: 'list',
          all: false,
          type: 'one-column',
          children: 
          [
            {
              name: 'Vegan Fragrance',
              link: 'https://www.boots.com/fragrance/vegan-fragrances',
            },
            {
              name: 'Recommended',
              link: 'https://www.boots.com/fragrance/recommended-fragrances',
            },
            {
              name: '5* Rated Fragrance',
              link: 'https://www.boots.com/fragrance/top-rated-fragrance',
            },
            {
              name: 'Fragrance Exclusives',
              link: 'https://www.boots.com/fragrance/fragrance-exclusives',
            },
            
          ],
        },
      ],
    },
  
    // Offers
    {
      name: 'Offers',
      regex: '/offers',
      link: 'https://www.boots.com/offers',
      hasSubmenu: false,
      allBrands: false,
    },
  
    // Electrical & photo
    {
      name: 'Electrical & Photo',
      regex: '/gifts',
      link: 'https://www.boots.com/electrical',
      hasSubmenu: true,
      children: [
         //photo
         {
          name: 'Photo',
          hasSubmenu: true,
          type: 'list',
          all: false,
          type: 'one-column',
          children: 
          [
            {
              name: 'Photo Offers',
              link: 'https://www.boots.com/photo/photo-offers',
            },
            {
              name: 'Photo Printing',
              link: 'https://www.boots.com/photo/photo-printing',
            },
            {
              name: 'Albums & Frames',
              link: 'https://www.boots.com/photo/photo-albums-frames',
            },
            {
              name: 'Audio and Visual Tech',
              link: 'https://www.boots.com/photo/headphones-cameras-accessories',
            },
            {
              name: 'Novelty Photo Gifts',
              link: 'https://www.boots.com/photo/novelty-photo-gifts',
            }, 
            {
                name: 'New In Photo',
                link: 'https://www.boots.com/photo/new-in-photo',
              },                 
          ],
        },
        // Electrical
        {
          name: 'Electrical',
          hasSubmenu: true,
          all: false,
          type: 'one-column',
          children: 
          [
            {
              name: 'All Electrical',
              link: 'https://www.boots.com/electrical/price-match-promise',
            },
            {
              name: 'Hair Styling Tools',
              link: 'https://www.boots.com/electrical/hair-styling-tools',
            },
            {
              name: 'Electrical Dental',
              link: 'https://www.boots.com/electrical/electrical-dental',
            },
            {
              name: 'Female Hair Removal',
              link: 'https://www.boots.com/electrical/female-hair-removal-tools',
            },
            {
              name: 'Male Grooming Tools',
              link: 'https://www.boots.com/electrical/male-grooming-tools',
            },
            {
              name: 'Beauty Tools',
              link: 'https://www.boots.com/electrical/beauty-tools',
            },
            {
              name: 'Electrical Wellbeing',
              link: 'https://www.boots.com/electrical/electrical-wellbeing',
            },
            {
              name: 'Electrical Health & Diagnostics',
              link: 'https://www.boots.com/electrical/electrical-health-diagnostics',
            },
            {
              name: 'Boots Kitchen Appliances',
              link: 'https://www.bootskitchenappliances.com/',
            },
            {
                name: 'New In Electrical',
                link: 'https://www.boots.com/electrical/new-in-electrical',
            },
          ],
        },
        
         // More
         {
          name: 'Electrical Offers',
          hasSubmenu: true,
          type: 'list',
          all: false,
          type: 'one-column',
          children: 
          [
            
            {
              name: 'View all offers',
              link: 'https://www.boots.com/electrical/electrical-offers',
            },
            {
              name: 'Recycle Your Electricals',
              link: 'https://www.boots.com/electrical/recycle-your-electricals',
            },
          ],
        },
      ],
    },
        {
          name: 'Christmas',
          regex: '/christmas',
          link: 'https://www.boots.com/christmas',
          hasSubmenu: false,
          allBrands: false,
        },
    {
      name: 'Brand A-Z',
      regex: '/brands',
      link: 'https://www.boots.com/brands',
      hasSubmenu: false,
      allBrands: true,
    },
  
    ];
  }