export const MobileData = (isLoggedIn) => {
  return [{
      name: `${window.userObj.isLoggedIn === "false" ? 'Login/Register' : 'Account'}`,
      link: `${window.userObj.isLoggedIn === "false" ? 'https://www.boots.com/webapp/wcs/stores/servlet/LogonForm' : 'https://www.boots.com/AjaxLogonForm?myAcctMain=1&catalogId=28501&langId=-1&storeId=11352'}`,
      hasSubmenu: false,
      desktop: false,
      icon: 'https://boots.scene7.com/is/image/Boots/Account-1?scl=1&fmt=png-alpha',
      noneCat: true,
    },
    {
      name: 'Advantage Card',
      link: 'https://www.boots.com/advantage-card',
      hasSubmenu: false,
      desktop: false,
      colour: '#b8237b',
      icon: 'https://boots.scene7.com/is/image/Boots/Ad%20Card-1?scl=1&fmt=png-alpha',
      noneCat: true,
    },

    // Christmas
    {
      name: 'christmas',
      regex: '/christmas',
      link: 'https://www.boots.com/christmas',
      hasSubmenu: true,
      children: [{
          name: 'visit christmas',
          allLink: true,
          link: 'https://www.boots.com/christmas',
          hasSubmenu: false,
        },
        {
          name: '3 for 2 mix & match',
          link: 'https://www.boots.com/christmas/christmas-3-for-2',
          hasSubmenu: false,
        },
        {
          name: 'star gifts',
          link: 'https://www.boots.com/christmas/christmas-weekly-offers',
          hasSubmenu: false,
        },
        {
          name: 'shop christmas',
          link: 'https://www.boots.com/christmas/all-christmas',
          hasSubmenu: false,
          children: [{
              name: 'all christmas',
              allLink: true,
              link: 'https://www.boots.com/christmas/all-christmas',
              hasSubmenu: false,
            },
            // categories
            {
              name: 'shop by recipient',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [{
                  name: 'all christmas',
                  link: 'https://www.boots.com/christmas/all-christmas',
                },
                {
                  name: 'gifts for her',
                  link: 'https://www.boots.com/christmas/gifts-for-her',
                },
                {
                  name: 'gifts for him',
                  link: 'https://www.boots.com/christmas/gifts-for-him',
                },
                {
                  name: 'gifts for kids',
                  link: 'https://www.boots.com/christmas/christmas-gifts-for-kids',
                },
              ],
            },
            // offers
            {
              name: 'Shop by category',
              hasSubmenu: true,
              type: 'list', // or bannerimages
              heading: true,
              type: 'one-column',
              children: [
                {
                  name: 'advent calendars',
                  link: 'https://www.boots.com/christmas/advent-calendars',
                },
                {
                  name: 'stocking fillers',
                  link: 'https://www.boots.com/christmas/stocking-fillers',
                },
                {
                  name: 'secret santa',
                  link: 'https://www.boots.com/christmas/secret-santa',
                },
                {
                  name: 'personalised gifts',
                  link: 'https://www.boots.com/christmas/personalised-gifts',
                },
              ],
            },
            // shop by
            {
              name: "special offers",
              hasSubmenu: true,
              heading: true,
              all: false,
              type: 'half-column',
              children: [
                {
                  name: 'star gifts',
                  bgStyle: 'yellow',
                  link: 'https://www.boots.com/christmas/christmas-weekly-offers',
                },
                {
                  name: '3 for 2 mix & match',
                  link: 'https://www.boots.com/christmas/christmas-3-for-2',
                },
              ],
            },
          ],
        },
        {
          name: '100 best christmas gifts 2021',
          link: 'https://www.boots.com/christmas/best-christmas-gifts',
          hasSubmenu: false,
        },
        {
          name: 'christmas inspiration',
          link: 'https://www.boots.com/christmas-gift-guide',
          hasSubmenu: false,
        },
      ],
    },

    // Black Friday
    {
      name: 'black friday',
      regex: '/black-friday',
      link: 'https://www.boots.com/black-friday',
      hasSubmenu: true,
      children: [{
          name: 'visit black friday',
          allLink: true,
          link: 'https://www.boots.com/black-friday',
          hasSubmenu: false,
        },
        {
          name: 'all black friday deals',
          link: 'https://www.boots.com/black-friday/all-blackfriday-deals',
          hasSubmenu: false,
        },
        {
          name: 'shop black friday offers',
          link: 'https://www.boots.com/black-friday',
          hasSubmenu: true,
          children: [{
              name: 'all black friday deals',
              allLink: true,
              link: 'https://www.boots.com/black-friday',
              hasSubmenu: false,
            },
            // categories
            {
              name: 'shop by category',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [{
                  name: 'all fragrance black friday deals',
                  link: 'https://www.boots.com/black-friday/blackfriday-fragrance',
                },
                {
                  name: 'all electrical beauty black friday deals',
                  link: 'https://www.boots.com/black-friday/blackfriday-electrical',
                },
                {
                  name: 'all premium beauty black friday deals',
                  link: 'https://www.boots.com/black-friday/blackfriday-luxury-beauty',
                },
                {
                  name: 'all beauty black friday deals',
                  link: 'https://www.boots.com/black-friday/blackfriday-beauty',
                },
                {
                  name: 'all gifting black friday deals',
                  link: 'https://www.boots.com/black-friday/blackfriday-gifting',
                },
                {
                  name: 'all health black friday deals',
                  link: 'https://www.boots.com/black-friday/blackfriday-health',
                },
                {
                  name: 'all baby black friday deals',
                  link: 'https://www.boots.com/black-friday/blackfriday-baby',
                },
                {
                  name: 'all toiletries black friday deals',
                  link: 'https://www.boots.com/black-friday/blackfriday-toiletries',
                },
              ],
            },
          ],
        },
      ],
    },

    // Beauty
    {
      name: 'beauty',
      regex: '/beauty',
      link: 'https://www.boots.com/beauty',
      hasSubmenu: true,
      children: [{
        name: 'visit beauty',
        allLink: true,
        link: 'https://www.boots.com/beauty',
        hasSubmenu: false,
        },
        {
          name: 'new in beauty',
          link: 'https://www.boots.com/new-to-boots/new-in-beauty-skincare',
          hasSubmenu: false,
        },
        {
          name: 'beauty offers',
          colour: '#b8237b',
          link: 'https://www.boots.com/beauty/beauty-skincare-offers',
          hasSubmenu: false,
        },
        {
          name: 'make up',
          link: 'https://www.boots.com/beauty/makeup',
          hasSubmenu: false,
          children: [{
            name: 'all makeup',
            allLink: true,
            link: 'https://www.boots.com/beauty/makeup',
            hasSubmenu: false,
          },
          // categories
          {
            name: 'shop by body area',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [{
                name: 'face',
                link: 'https://www.boots.com/beauty/makeup/face',
              },
              {
                name: 'eyes',
                link: 'https:f//www.boots.com/beauty/makeup/eyes',
              },
              {
                name: 'lips',
                link: 'https://www.boots.com/beauty/makeup/lips',
              },
              {
                name: 'nails',
                link: 'https://www.boots.com/beauty/makeup/nails',
              }
            ],
          },
          // offers
          {
            name: 'shop by category',
            hasSubmenu: true,
            type: 'list', // or bannerimages
            heading: true,
            type: 'one-column',
            children: [{
                name: 'beauty gift sets',
                link: 'https://www.boots.com/beauty/makeup/make-up-gift-sets',
              },
              {
                name: 'brushes & sponges',
                link: 'https://www.boots.com/beauty/makeup/brushes-sponges',
              },
              {
                name: 'glitter and accessories',
                link: 'https://www.boots.com/beauty/makeup/glitter-accessories',
              },
              {
                name: 'palettes',
                link: 'https://www.boots.com/beauty/makeup/palettes',
              },
              {
                name: 'make-up remover',
                link: 'https://www.boots.com/beauty/makeup/make-up-remover-',
              },
              {
                name: 'mirrors',
                link: 'https://www.boots.com/beauty/makeup/make-up-mirrors',
              },
              {
                name: 'wash bags & organisers',
                link: 'https://www.boots.com/beauty/makeup/wash-bags',
              },
              {
                name: 'vegan makeup',
                link: 'https://www.boots.com/beauty/makeup/vegan-makeup-products',
              },
            ],
          },
        ],
        },
        {
          name: 'hair',
          link: 'https://www.boots.com/beauty/hair',
          hasSubmenu: false,
          children: [{
            name: 'all hair',
            allLink: true,
            link: 'https://www.boots.com/beauty/hair/all-hair',
            hasSubmenu: false,
          },
          // categories
          {
            name: 'shop hair',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              {
                name: 'visit hair',
                link: 'https://www.boots.com/beauty/hair',
              },
              {
                name: 'all hair',
                link: 'https://www.boots.com/beauty/hair/all-hair',
              },
              {
                name: 'new in hair',
                link: 'https://www.boots.com/beauty/hair/new-in-hair',
              },
              {
                name: 'premium hair',
                link: 'https://www.boots.com/beauty/hair/luxury-beauty-hair',
              },
            ],
          },
          // offers
          {
            name: 'shop by category',
            hasSubmenu: true,
            type: 'list', // or bannerimages
            heading: true,
            type: 'one-column',
            children: [
              {
                name: 'hair dye',
                link: 'https://www.boots.com/beauty/hair/hair-dye',
              },
              {
                name: 'hair styling',
                link: 'https://www.boots.com/beauty/hair/hair-styling',
              },
              {
                name: 'shampoo',
                link: 'https://www.boots.com/beauty/hair/shampoo',
              },
              {
                name: 'conditioner',
                link: 'https://www.boots.com/beauty/hair/conditioner',
              },
              {
                name: 'hair treatments and masks',
                link: 'https://www.boots.com/beauty/hair/hair-treatments-and-masks',
              },
              {
                name: 'hair accessories',
                link: 'https://www.boots.com/beauty/hair/hair-accessories',
              },
              {
                name: 'brushes & combs',
                link: 'https://www.boots.com/beauty/hair/brushes-and-combs',
              },
              {
                name: 'hair value packs and bundles',
                link: 'https://www.boots.com/beauty/hair/hair-value-packs-and-bundles',
              },
              {
                name: 'curls, kinks and coils',
                link: 'https://www.boots.com/beauty/hair/textured-hair',
              },
              {
                name: 'hair health vitamins',
                link: 'https://www.boots.com/beauty/hair/hair-health-vitamins',
              },
              {
                name: 'thinning hair',
                link: 'https://www.boots.com/beauty/hair/thinning-hair',
              },
              {
                name: 'men\'s hair',
                link: 'https://www.boots.com/beauty/hair/mens-hair',
              },
            ],
          },
        ],
        },
        {
          name: 'toiletries',
          link: 'https://www.boots.com/toiletries',
          hasSubmenu: false,
          children: [{
            name: 'all toiletries',
            allLink: true,
            link: 'https://www.boots.com/toiletries',
            hasSubmenu: false,
          },
          // categories
          {
            name: 'shop toiletries',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [{
                name: 'new in toiletries',
                link: 'https://www.boots.com/toiletries/new-in-toiletries',
              },
              {
                name: 'toiletries offers',
                link: 'https://www.boots.com/toiletries/toiletries-offers',
              },
              {
                name: 'toiletries value packs & bundles',
                link: 'https://www.boots.com/toiletries/toiletries-value-packs-and-bundles',
              },
              {
                name: 'men\'s toiletries',
                link: 'https://www.boots.com/toiletries/mens-toiletries',
              },
            ],
          },
          // offers
          {
            name: 'shop by category',
            hasSubmenu: true,
            type: 'list', // or bannerimages
            heading: true,
            type: 'one-column',
            children: [
              {
                name: 'skincare',
                link: 'https://www.boots.com/beauty/skincare',
              },
              {
                name: 'shampoo',
                link: 'https://www.boots.com/toiletries/hair/shampoo',
              },
              {
                name: 'conditioner',
                link: 'https://www.boots.com/beauty/hair/conditioner',
              },
              {
                name: 'suncare',
                link: 'https://www.boots.com/holidays/suncare',
              },
              {
                name: 'fake & gradual tan',
                link: 'https://www.boots.com/toiletries/fake-gradual-tan',
              },
              {
                name: 'female hair removal',
                link: 'https://www.boots.com/toiletries/skincare-female-hair-removal',
              },
            ],
          },
          // shop by
          {
            name: "bathroom essentials",
            hasSubmenu: true,
            heading: true,
            all: false,
            type: 'half-column',
            children: [{
                name: 'all bathroom essentials',
                link: 'https://www.boots.com/toiletries/washing-bathing',
              },
              {
                name: 'shower gels & scrubs',
                link: 'https://www.boots.com/toiletries/washing-bathing/shower-gel',
              },
              {
                name: 'soap & hand wash',
                link: 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash',
              },
              {
                name: 'body scrub',
                link: 'https://www.boots.com/toiletries/washing-bathing/body-scrub',
              },
              {
                name: 'face wash',
                link: 'https://www.boots.com/toiletries/washing-bathing/face-wash',
              },
              {
                name: 'tissues, wipes & sanitisers',
                link: 'https://www.boots.com/toiletries/washing-bathing/tissues-wipes-sanitisers',
              },
              {
                name: 'baby & child toiletries',
                link: 'https://www.boots.com/toiletries/washing-bathing/baby-child-toiletries',
              },
              {
                name: 'luxury bath & body',
                link: 'https://www.boots.com/toiletries/luxury-bath-body',
              },
              {
                name: 'feminine hygiene',
                link: 'https://www.boots.com/toiletries/feminine-hygiene',
              },
              {
                name: 'deodorants & antiperspirants',
                link: 'https://www.boots.com/toiletries/deodorants-antiperspirants',
              },
              {
                name: 'men\'s toiletries',
                link: 'https://www.boots.com/toiletries/mens-toiletries',
              },
            ],
          },
          {
            name: "dental",
            hasSubmenu: true,
            heading: true,
            all: false,
            type: 'half-column',
            children: [
              {
                name: 'mouthwash',
                link: 'https://www.boots.com/toiletries/bootsdental/mouthwash',
              },
              {
                name: 'kids dental',
                link: 'https://www.boots.com/toiletries/bootsdental/kids-dental',
              },
              {
                name: 'oral health',
                link: 'https://www.boots.com/toiletries/bootsdental/oral-health',
              },
              {
                name: 'toothpaste',
                link: 'https://www.boots.com/toiletries/bootsdental/toothpaste',
              },
              {
                name: 'electrical dental',
                link: 'https://www.boots.com/toiletries/bootsdental/electrical-dental',
              },
              {
                name: 'toothbrushes',
                link: 'https://www.boots.com/toiletries/bootsdental/toothbrushes',
              },
            ],
          },
        ],
        },
        {
          name: 'premium beauty',
          link: 'https://www.boots.com/beauty/luxury-beauty-skincare',
          hasSubmenu: false,
          children: [{
            name: 'all premium beauty',
            allLink: true,
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare',
            hasSubmenu: false,
          },
          // categories
          {
            name: 'shop premium beauty',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              {
                name: 'premium beauty gifts',
                link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-gift',
              },
              {
                name: 'Boss Beauty Deals',
                link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-offers',
              },
              {
                name: 'new in premium beauty & skincare',
                link: 'https://www.boots.com/beauty/luxury-beauty-skincare/new-in-luxury--1',
              },
              {
                name: 'premium skincare',
                link: 'https://www.boots.com/beauty/luxury-beauty-skincare/all-luxury-skincare',
              },
              {
                name: 'premium makeup',
                link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-makeup',
              },
              {
                name: 'premium value packs & bundles',
                link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-value-packs-and-bundles',
              },
              {
                name: 'premium makeup tools',
                link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-makeup-tools',
              },
              {
                name: 'men\'s premium',
                link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-makeup-tools',
              },
              {
                name: 'premium suncare & SPF',
                link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-suncare-tanning-travel',
              },
              {
                name: 'premium beauty book an appointment',
                link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-suncare-tanning-travel',
              },
              {
                name: 'premium hair',
                link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-hair',
              },
            ],
          },
        ],
        },
        {
          name: 'electrical beauty',
          link: 'https://www.boots.com/electrical/beauty-tools',
          hasSubmenu: false,
          children: [{
            name: 'all electrical',
            allLink: true,
            link: 'https://www.boots.com/electrical',
            hasSubmenu: false,
          },
          // categories
          {
            name: 'hair styling tools',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [{
                name: 'visit hair styling tools',
                link: 'https://www.boots.com/electrical/hair-styling-tools',
              },
              {
                name: 'hair curlers',
                link: 'https://www.boots.com/electrical/hair-styling-tools/hair-curlers',
              },
              {
                name: 'hair dryers',
                link: 'https://www.boots.com/electrical/hair-styling-tools/hair-dryers',
              },
              {
                name: 'hair straighteners',
                link: 'https://www.boots.com/electrical/hair-styling-tools/hair-straighteners',
              },
              {
                name: 'hot brushes & air stylers',
                link: 'https://www.boots.com/electrical/hair-styling-tools/hot-brushes-air-stylers',
              },
              {
                name: 'accessories & spares',
                link: 'https://www.boots.com/electrical/hair-styling-tools/hair-tools-accessories-spares',
              },
              {
                name: 'all hair styling tools',
                link: 'https://www.boots.com/electrical/hair-styling-tools/all-electrical-hair-styling-tools',
              },
            ],
          },
          // offers
          {
            name: 'electrical dental',
            hasSubmenu: true,
            type: 'list', // or bannerimages
            heading: true,
            type: 'one-column',
            children: [
              {
                name: 'visit electrical dental',
                link: 'https://www.boots.com/electrical/electrical-dental',
              },
              {
                name: 'all electrical dental',
                link: 'https://www.boots.com/electrical/electrical-dental/all-electrical-dental-',
              },              {
                name: 'electric toothbrushes',
                link: 'https://www.boots.com/electrical/electrical-dental/electric-toothbrushes',
              },
              {
                name: 'kids electric toothbrushes',
                link: 'https://www.boots.com/electrical/electrical-dental/kids-electric-toothbrushes',
              },              {
                name: 'brush heads',
                link: 'https://www.boots.com/electrical/electrical-dental/dental-brush-heads',
              },
              {
                name: 'electric flossers',
                link: 'https://www.boots.com/electrical/electrical-dental/electric-flossers',
              },              
            ],
          },
          // shop by
          {
            name: "beauty tools",
            hasSubmenu: true,
            heading: true,
            all: false,
            type: 'half-column',
            children: [
              {
                name: 'visit beauty tools',
                link: 'https://www.boots.com/electrical/beauty-tools',
              },
              {
                name: 'acne treatments',
                link: 'https://www.boots.com/electrical/beauty-tools/acne-treatments',
              },
              {
                name: 'anti-ageing',
                link: 'https://www.boots.com/electrical/beauty-tools/anti-ageing',
              },
              {
                name: 'facial beauty tools',
                link: 'https://www.boots.com/electrical/beauty-tools/facial-beauty-tools',
              },
              {
                name: 'facial cleansing brushes',
                link: 'https://www.boots.com/electrical/beauty-tools/facial-cleansing-brush',
              },
              {
                name: 'manicure & pedicure tools',
                link: 'https://www.boots.com/electrical/beauty-tools/manicure-pedicure-tools',
              },
              {
                name: 'all beauty tools',
                link: 'https://www.boots.com/electrical/beauty-tools/all-electrical-beauty-tools',
              },
            ],
          },
          {
            name: "male grooming",
            hasSubmenu: true,
            heading: true,
            all: false,
            type: 'half-column',
            children: [
              {
                name: 'visit male grooming tools',
                link: 'https://www.boots.com/electrical/male-grooming-tools',
              },
              {
                name: 'shavers',
                link: 'https://www.boots.com/electrical/male-grooming-tools/shavers',
              },
              {
                name: 'beard & stubble trimmers',
                link: 'https://www.boots.com/electrical/male-grooming-tools/beard-stubble-trimmers',
              },
              {
                name: 'hair clippers',
                link: 'https://www.boots.com/electrical/male-grooming-tools/mens-hair-clippers',
              },
              {
                name: 'body groomers',
                link: 'https://www.boots.com/electrical/male-grooming-tools/body-groomers',
              },
              {
                name: 'nose & ear trimmers',
                link: 'https://www.boots.com/electrical/male-grooming-tools/nose-ear-trimmers',
              },
              {
                name: 'accessories & spares',
                link: 'https://www.boots.com/electrical/male-grooming-tools/male-grooming-accessories-spares',
              },
              {
                name: 'all male grooming',
                link: 'https://www.boots.com/electrical/male-grooming-tools/all-electrical-male-grooming',
              },
            ],
          },
          {
            name: "female hair removal",
            hasSubmenu: true,
            heading: true,
            all: false,
            type: 'half-column',
            children: [
              {
                name: 'visit female hair removal tools',
                link: 'https://www.boots.com/electrical/female-hair-removal-tools',
              },
              {
                name: 'all female hair removal tools',
                link: 'https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-',
              },
              {
                name: 'all female hair removal',
                link: 'https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-remov',
              },
              {
                name: 'epilators',
                link: 'https://www.boots.com/electrical/female-hair-removal-tools/epilators',
              },
              {
                name: 'IPL hair removal',
                link: 'https://www.boots.com/electrical/female-hair-removal-tools/ipl-hair-removal',
              },
              {
                name: 'lady shavers',
                link: 'https://www.boots.com/electrical/female-hair-removal-tools/lady-shavers',
              },
              {
                name: 'body and face trimmers',
                link: 'https://www.boots.com/electrical/female-hair-removal-tools/body-face-trimmers',
              },
              {
                name: 'accessories & spares',
                link: 'https://www.boots.com/electrical/female-hair-removal-tools/hair-removal-accessories-spares',
              },
            ],
          },
        ],
        },
        {
          name: 'vegan beauty',
          link: 'https://www.boots.com/beauty/vegan-range',
          hasSubmenu: false,
        },
        {
          name: 'accessories',
          link: 'https://www.boots.com/beauty/beauty-accessories',
          hasSubmenu: false,
        },
        {
          name: 'beauty minis',
          link: 'https://www.boots.com/beauty/travel-beauty-minis',
          hasSubmenu: false,
        },
        {
          name: 'skincare',
          link: 'https://www.boots.com/beauty/skincare',
          hasSubmenu: false,
        },
        {
          name: 'beauty inspiration',
          link: 'https://www.boots.com/skincare-beauty-advice',
          hasSubmenu: false,
        },
      ],
    },

    // Skincare
    {
      name: 'skincare',
      regex: 'beauty/skincare',
      link: 'https://www.boots.com/beauty/skincare',
      hasSubmenu: true,
      children: [{
          name: 'visit skincare',
          allLink: true,
          link: 'https://www.boots.com/beauty/skincare',
          hasSubmenu: false,
        },
        {
          name: 'new in skincare',
          link: 'https://www.boots.com/beauty/new-in-beauty-skincare',
          hasSubmenu: false,
        },
        {
          name: 'skincare offers',
          link: 'https://www.boots.com/beauty/beauty-skincare-offers',
          colour: '#b8237b',
          hasSubmenu: false,
        },
        {
          name: 'shop skincare',
          link: 'https://www.boots.com/beauty/skincare',
          hasSubmenu: false,
          children: [
            {
              name: 'shop by product',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [{
                  name: 'premium skincare',
                  link: 'https://www.boots.com/beauty/luxury-beauty-skincare/all-luxury-skincare',
                },
                {
                  name: 'vegan skincare',
                  link: 'https://www.boots.com/beauty/skincare/vegan-skincare-products',
                },
                {
                  name: 'men\'s skincare & body',
                  link: 'https://www.boots.com/beauty/skincare/skincare-body',
                },
                
              ],
            },
            // offers
            {
              name: 'shop by category',
              hasSubmenu: true,
              type: 'list', // or bannerimages
              heading: true,
              type: 'one-column',
              children: [{
                name: 'facial skincare',
                link: 'https://www.boots.com/beauty/skincare/facial-skincare',
              },
              {
                name: 'body skincare',
                link: 'https://www.boots.com/beauty/skincare/body-skincare',
              },
              {
                name: 'fake & gradual tan',
                link: 'https://www.boots.com/beauty/skincare/fake-gradual-tan',
              },
              {
                name: 'female hair removal',
                link: 'https://www.boots.com/beauty/skincare/skincare-female-hair-removal',
              },
              {
                name: 'expert skincare & treatments',
                link: 'https://www.boots.com/beauty/skincare/expert-skincare-',
              },
              
              ],
            },
          ],
        },
        {
          name: 'skincare inspiration',
          link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice',
          hasSubmenu: false,
        },
      ],
    },

    // Fragrance
    {
      name: 'fragrance',
      regex: '/fragrance',
      link: 'https://www.boots.com/fragrance',
      hasSubmenu: true,
      children: [{
          name: 'visit fragrance',
          allLink: true,
          link: 'https://www.boots.com/fragrance',
          hasSubmenu: false,
        },
        {
          name: 'new in fragrance',
          link: 'https://www.boots.com/fragrance/new-in-fragrance',
          hasSubmenu: false,
        },
        {
          name: 'shop fragrance',
          link: 'https://www.boots.com/fragrance/fragrance-offers',
          hasSubmenu: false,
          children: [{
              name: 'all fragrance ',
              allLink: true,
              link: 'https://www.boots.com/fragrance',
              hasSubmenu: false,
            },
            // categories
            {
              name: 'fragrance offers',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [{
                  name: 'save up to half price',
                  link: 'https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-save-up-to-half-price',
                },
                {
                  name: 'save 10 pounds',
                  link: 'https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-save-10-pounds',
                },
                {
                  name: 'free gifts',
                  link: 'https://www.boots.com/fragrance/fragrance-offers/complimentary-free-gifts-and-offers-with-selected-purchases',
                },
                {
                  name: 'everyday low prices',
                  link: 'https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-every-day-low-prices',
                },
                {
                  name: 'clearance',
                  link: 'https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-clearance',
                },
              ],
            },
            // offers
            {
              name: 'shop by category',
              hasSubmenu: true,
              type: 'list', // or bannerimages
              heading: true,
              type: 'one-column',
              children: [{
                  name: 'perfume',
                  link: 'https://www.boots.com/fragrance/perfume',
                },
                {
                  name: 'aftershave',
                  link: 'https://www.boots.com/fragrance/aftershave',
                },
                {
                  name: 'fragrance gift sets',
                  link: 'https://www.boots.com/fragrance/fragrance-gift-sets',
                },
                {
                  name: 'luxury fragrance',
                  link: 'https://www.boots.com/fragrance/luxury-fragrance',
                },
                {
                  name: 'vegan fragrance',
                  link: 'https://www.boots.com/fragrance/vegan-fragrances',
                },
                {
                  name: 'home fragrance',
                  link: 'https://www.boots.com/fragrance/fragrance-home-fragrances',
                },
              ],
            },
            
          ],
        },
        {
          name: 'fragrance inspiration',
          link: 'https://www.boots.com/fragrance-advice',
          hasSubmenu: false,
        },
      ],
    },    

    // Baby & Child
    {
      name: 'baby & child',
      regex: '/baby-child',
      link: 'https://www.boots.com/baby-child',
      hasSubmenu: true,
      children: [{
        name: 'visit baby & child',
        allLink: true,
        link: 'https://www.boots.com/baby-child',
        hasSubmenu: false,
        },
        {
          name: 'baby value packs and bundles',
          link: 'https://www.boots.com/baby-child/baby-value-packs-and-bundles',
          hasSubmenu: false,
        },
        {
          name: 'baby & child offers',
          colour: '#b8237b',
          link: 'https://www.boots.com/baby-child/baby-child-offers',
          hasSubmenu: false,
        },
        {
          name: 'Boots Parenting Club',
          link: 'https://www.boots.com/baby-child/parenting-club',
          hasSubmenu: false,
        },
        {
          name: 'baby event',
          link: 'https://www.boots.com/baby-child/baby-child-offers',
          hasSubmenu: false,
        },
        {
          name: 'travel & nursery',
          link: 'https://www.boots.com/baby-child/pushchairs-car-seats',
          hasSubmenu: false,
          children: [{
            name: 'all travel',
            allLink: true,
            link: 'https://www.boots.com/baby-child/pushchairs-car-seats',
            hasSubmenu: false,
          },
          {
            name: 'all nursery',
            allLink: true,
            link: 'https://www.boots.com/baby-child/nursery-furniture',
            hasSubmenu: false,
          },
          // categories
          {
            name: 'travel',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [{
                name: 'pushchairs, strollers, prams & doubles',
                link: 'https://www.boots.com/baby-child/pushchairs-car-seats/pushchairs-strollers-prams-doubles',
              },
              {
                name: 'car seats & accessories',
                link: 'https://www.boots.com/baby-child/pushchairs-car-seats/car-seats-accessories',
              },
              {
                name: 'travel systems',
                link: 'https://www.boots.com/baby-child/pushchairs-car-seats/travel-systems',
              },
              {
                name: 'travel accessories',
                link: 'https://www.boots.com/baby-child/pushchairs-car-seats/travel-accessories',
              },
            ],
          },
          // offers
          {
            name: 'nursery',
            hasSubmenu: true,
            type: 'list', // or bannerimages
            heading: true,
            type: 'one-column',
            children: [{
                name: 'nursery furniture',
                link: 'https://www.boots.com/baby-child/nursery-furniture/furniture-sets',
              },
              {
                name: 'cots & cot beds',
                link: 'https://www.boots.com/baby-child/nursery-furniture/cots-cot-beds',
              },
              {
                name: 'cribs & moses baskets',
                link: 'https://www.boots.com/baby-child/nursery-furniture/cribs-moses-baskets',
              },
              {
                name: 'thermometers',
                link: 'https://www.boots.com/baby-child/nursery-furniture/thermometers',
              },
              {
                name: 'baby safety',
                link: 'https://www.boots.com/baby-child/nursery-furniture/baby-safety',
              },
              {
                name: 'bedside sleeping',
                link: 'https://www.boots.com/baby-child/nursery-furniture/bedside-sleeping',
              },
              {
                name: 'mobiles & night lights',
                link: 'https://www.boots.com/baby-child/nursery-furniture/mobiles-night-lights',
              },
              {
                name: 'baby monitors',
                link: 'https://www.boots.com/baby-child/nursery-furniture/baby-monitors',
              },
              {
                name: 'bedding',
                link: 'https://www.boots.com/baby-child/nursery-furniture/baby-bedding',
              },
              {
                name: 'bouncers, swings & play gyms',
                link: 'https://www.boots.com/baby-child/nursery-furniture/bouncers-swings-play-gyms',
              },
            ],
          },
        ],
        },
        {
          name: 'clothing',
          link: 'https://www.boots.com/baby-child/mothercare-clothing',
          hasSubmenu: false,
          children: [{
            name: 'all clothing',
            allLink: true,
            link: 'https://www.boots.com/baby-child/mothercare-clothing',
            hasSubmenu: false,
          },
          // categories
          {
            name: 'shop by product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [{
                name: 'shop all baby & kids clothing',
                link: 'https://www.boots.com/baby-child/mothercare-clothing/shop-all-baby-kids-clothing',
              },
              {
                name: 'new in baby & kids clothes',
                link: 'https://www.boots.com/baby-child/mothercare-clothing/new-clothing-collection',
              },
            ],
          },
          // offers
          {
            name: 'shop by category',
            hasSubmenu: true,
            type: 'list', // or bannerimages
            heading: true,
            type: 'one-column',
            children: [{
                name: 'baby clothes 0-24 months',
                link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months',
              },
              {
                name: 'girls clothes 9 months - 6 years',
                link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-girls-clothes-9-months-6-years',
              },
              {
                name: 'boys clothes 9 months - 6 years',
                link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-boys-clothes-9-months-6-years',
              },
              {
                name: 'nightwear & underwear',
                link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-nightwear-underwear',
              },
              {
                name: 'maternity bras',
                link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-maternity-bras',
              },
              {
                name: 'premature baby range',
                link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-premature-baby-range',
              },
            ],
          },
        ],
        },
        {
          name: 'feeding',
          link: 'https://www.boots.com/baby-child/babyfeeding',
          hasSubmenu: false,
          children: [{
            name: 'all feeding',
            allLink: true,
            link: 'https://www.boots.com/baby-child/babyfeeding',
            hasSubmenu: false,
          },
          // categories
          {
            name: 'shop offers',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [{
                name: 'baby value packs & bundles',
                link: 'https://www.boots.com/baby-child/babyfeeding/baby-value-packs-and-bundles',
              },
            ],
          },
          // offers
          {
            name: 'shop by category',
            hasSubmenu: true,
            type: 'list', // or bannerimages
            heading: true,
            type: 'one-column',
            children: [{
                name: 'baby milk & formula',
                link: 'https://www.boots.com/baby-child/babyfeeding/baby-milk-formula',
              },
              {
                name: 'baby food & weaning',
                link: 'https://www.boots.com/baby-child/babyfeeding/baby-food-weaning',
              },
              {
                name: 'breastfeeding',
                link: 'https://www.boots.com/baby-child/babyfeeding/breastfeeding-pumps',
              },
              {
                name: 'toddler food & drink',
                link: 'https://www.boots.com/baby-child/babyfeeding/toddler-food-drink',
              },
              {
                name: 'bottle feeding',
                link: 'https://www.boots.com/baby-child/babyfeeding/baby-bottles-teats',
              },
              {
                name: 'cups',
                link: 'https://www.boots.com/baby-child/babyfeeding/baby-cups',
              },
              {
                name: 'soothers & teethers',
                link: 'https://www.boots.com/baby-child/babyfeeding/soothers-teethers',
              },
              {
                name: 'dinnerware',
                link: 'https://www.boots.com/baby-child/babyfeeding/child-dinnerware',
              },
              {
                name: 'sterilising',
                link: 'https://www.boots.com/baby-child/babyfeeding/sterilising',
              },
              {
                name: 'bibs & muslins',
                link: 'https://www.boots.com/baby-child/babyfeeding/bibs-muslins',
              },
              {
                name: 'highchairs & booster seats',
                link: 'https://www.boots.com/baby-child/babyfeeding/highchairs-booster-seats',
              },
              {
                name: 'lunch bags',
                link: 'https://www.boots.com/baby-child/babyfeeding/lunch-bags',
              },
            ],
          },
        ],
        },
        {
          name: 'bathing & changing',
          link: 'https://www.boots.com/baby-child/bathing-changing',
          hasSubmenu: false,
          children: [{
            name: 'all bathing & changing',
            allLink: true,
            link: 'https://www.boots.com/baby-child/bathing-changing',
            hasSubmenu: false,
          },
          // categories
          {
            name: 'shop by category',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [{
                name: 'kids dental',
                link: 'https://www.boots.com/baby-child/bathing-changing/kids-dental',
              },
              {
                name: 'changing bag essentials',
                link: 'https://www.boots.com/baby-child/bathing-changing/changing-bag-essentials',
              },
              {
                name: 'baby value packs & bundles',
                link: 'https://www.boots.com/baby-child/bathing-changing/baby-value-packs-and-bundles',
              },
              {
                name: 'baby & child toiletries',
                link: 'https://www.boots.com/baby-child/bathing-changing/baby-child-toiletries',
              },
              {
                name: 'nappies',
                link: 'https://www.boots.com/baby-child/bathing-changing/nappies',
              },
              {
                name: 'baby baths & accessories',
                link: 'https://www.boots.com/baby-child/bathing-changing/baby-baths-accessories',
              },
              {
                name: 'baby wipes',
                link: 'https://www.boots.com/baby-child/bathing-changing/baby-wipes',
              },
              {
                name: 'changing bags & mats',
                link: 'https://www.boots.com/baby-child/bathing-changing/changing-bags-mats',
              },
              {
                name: 'potty training',
                link: 'https://www.boots.com/baby-child/bathing-changing/potty-training',
              },
              {
                name: 'nappy disposal',
                link: 'https://www.boots.com/baby-child/bathing-changing/nappy-disposal',
              },
              {
                name: 'cotton wool',
                link: 'https://www.boots.com/baby-child/bathing-changing/baby-cotton-wool',
              },
            ],
          },
        ],
        },
        {
          name: 'pregnancy & maternity',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity',
          hasSubmenu: false,
          children: [{
            name: 'visit pregnancy & maternity',
            allLink: true,
            link: 'https://www.boots.com/baby-child/pregnancy-maternity',
            hasSubmenu: false,
          },
          // categories
          {
            name: 'shop by category',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [{
                name: 'all premature baby',
                link: 'https://www.boots.com/baby-child/pregnancy-maternity/all-premature-baby',
              },
              {
                name: 'hospital bag essentials',
                link: 'https://www.boots.com/baby-child/pregnancy-maternity/hospital-bag-essentials',
              },
              {
                name: 'new mum toiletries',
                link: 'https://www.boots.com/baby-child/pregnancy-maternity/new-mum-toiletries',
              },
              {
                name: 'maternity & nursing clothes',
                link: 'https://www.boots.com/baby-child/pregnancy-maternity/maternity-nursing-clothing',
              },
              {
                name: 'pregnancy tests',
                link: 'https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-tests',
              },
              {
                name: 'pregnancy supplements',
                link: 'https://www.boots.com/baby-child/pregnancy-maternity/pregnancysupplements',
              },
              {
                name: 'maternity TENs machines',
                link: 'https://www.boots.com/baby-child/pregnancy-maternity/maternity-tens-machine',
              },
              {
                name: 'pillows',
                link: 'https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-maternity-pillows',
              },
              {
                name: 'ovulation & fertility tests',
                link: 'https://www.boots.com/baby-child/pregnancy-maternity/ovulation-fertility-tests',
              },
              {
                name: 'baby shower gifting',
                link: 'https://www.boots.com/baby-child/pregnancy-maternity/gift-baby-shower',
              },
            ],
          },
        ],
        },
        {
          name: 'baby & child health',
          link: 'https://www.boots.com/baby-child/baby-child-health',
          hasSubmenu: false,
          children: [{
            name: 'visit baby & child health',
            allLink: true,
            link: 'https://www.boots.com/baby-child/baby-child-health',
            hasSubmenu: false,
          },
          // categories
          {
            name: 'shop by category',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [{
                name: 'baby & child vitamins',
                link: 'https://www.boots.com/baby-child/baby-child-health/baby-child-vitamins',
              },
              {
                name: 'fever & pain relief',
                link: 'https://www.boots.com/baby-child/baby-child-health/fever-pain-relief',
              },
              {
                name: 'cough, cold & flu',
                link: 'https://www.boots.com/baby-child/baby-child-health/child-cough-cold-flu',
              },
              {
                name: 'skincare conditions',
                link: 'https://www.boots.com/baby-child/baby-child-health/skincare-conditions',
              },
              {
                name: 'teething',
                link: 'https://www.boots.com/baby-child/baby-child-health/teething',
              },
              {
                name: 'allergy & hayfever',
                link: 'https://www.boots.com/baby-child/baby-child-health/allergy-hayfever-children',
              },
              {
                name: 'first aid',
                link: 'https://www.boots.com/baby-child/baby-child-health/child-first-aid',
              },
              {
                name: 'nits, lice & worms',
                link: 'https://www.boots.com/baby-child/baby-child-health/nits-lice-worms',
              },
              {
                name: 'colic management',
                link: 'https://www.boots.com/baby-child/baby-child-health/colic',
              },
            ],
          },
        ],
        },
        {
          name: 'toys',
          link: 'https://www.boots.com/toys',
          hasSubmenu: false,
        },
        {
          name: 'Nursery Advice Service',
          link: 'https://www.boots.com/baby-child/nursery-advice-service',
          hasSubmenu: false,
        },
      ],
    },

    // Health & Wellness
    {
      name: 'health & wellness',
      regex: '/health-pharmacy',
      link: 'https://www.boots.com/health-pharmacy',
      hasSubmenu: true,
      children: [{
          name: 'health & wellness offers',
          link: 'https://www.boots.com/health-pharmacy/health-offers',
          hasSubmenu: false,
          children: [
          {
            name: 'shop offers',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [{
                name: 'health offers',
                link: 'https://www.boots.com/health-pharmacy/health-offers',
              },
              {
                name: 'new in health',
                link: 'https://www.boots.com/health-pharmacy/new-in-health',
              },
              {
                name: 'new in wellness',
                link: 'https://www.boots.com/wellness/new-in-wellness',
              },
            ],
          },
        ],
        },
        {
          name: 'shop health',
          link: 'https://www.boots.com/health-pharmacy',
          hasSubmenu: false,
          children: [
          {
            name: 'women\'s health',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [{
                name: 'visit women\'s health',
                link: 'https://www.boots.com/health-pharmacy/womenshealth',
              },
              {
                name: 'planning for a baby',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/familyplanning',
              },
              {
                name: 'intimate dryness',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/intimate-dryness--1',
              },
              {
                name: 'bacterial vaginosis',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/vaginitis',
              },
              {
                name: 'female incontinence',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/female-incontinence',
              },
              {
                name: 'feminine wash & wipes',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/feminine-wash-wipes',
              },
              {
                name: 'thrush',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/thrush',
              },
              {
                name: 'menopause',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/menopause-support',
              },
              {
                name: 'women\'s health supplements',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/womenshealth-supplements',
              },
              {
                name: 'Morning After Pill',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/morning-after-pill',
              },
              {
                name: 'Period Delay Online Clinic',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/period-delay-clinic',
              },
              {
                name: 'cystitis & urinary tract infections',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/cystitis-urinary-tract-infections',
              },
              {
                name: 'hair loss',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/womens-hair-loss',
              },
              {
                name: 'period pain',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/period-pain',
              },
              {
                name: 'Cervical Cancer Vaccination Service',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/cervicalcancer',
              },
              {
                name: 'alternative therapy',
                link: 'https://www.boots.com/health-pharmacy/womenshealth/womens-alternative-therapy',
              },
            ],
          },
          // offers
          {
            name: 'men\'s health',
            hasSubmenu: true,
            type: 'list', // or bannerimages
            heading: true,
            type: 'one-column',
            children: [
              {
                name: 'visit men\'s health',
                link: 'https://www.boots.com/health-pharmacy/menshealth',
              },
              {
                name: 'men\'s sexual health',
                link: 'https://www.boots.com/health-pharmacy/menshealth/mens-sexual-health',
              },
              {
                name: 'male incontinence',
                link: 'https://www.boots.com/health-pharmacy/menshealth/male-incontinence',
              },
              {
                name: 'hair loss',
                link: 'https://www.boots.com/health-pharmacy/menshealth/mens-hair-loss',
              },
              {
                name: 'men\'s health supplements',
                link: 'https://www.boots.com/health-pharmacy/menshealth/menshealth-supplements',
              },
              {
                name: 'jock rash',
                link: 'https://www.boots.com/health-pharmacy/menshealth/jock-rash',
              },
            ],
          },
          // shop by
          {
            name: "baby & child health",
            hasSubmenu: true,
            heading: true,
            all: false,
            type: 'half-column',
            children: [
              {
                name: 'visit baby & child health',
                link: 'https://www.boots.com/health-pharmacy/baby-child-health',
              },
              {
                name: 'baby & child vitamins',
                link: 'https://www.boots.com/health-pharmacy/baby-child-health/baby-child-vitamins',
              },
              {
                name: 'fever & pain relief',
                link: 'https://www.boots.com/health-pharmacy/baby-child-health/fever-pain-relief',
              },
              {
                name: 'cough, cold & flu',
                link: 'https://www.boots.com/health-pharmacy/baby-child-health/child-cough-cold-flu',
              },
              {
                name: 'skincare conditions',
                link: 'https://www.boots.com/health-pharmacy/baby-child-health/skincare-conditions',
              },
              {
                name: 'teething',
                link: 'https://www.boots.com/health-pharmacy/baby-child-health/teething',
              },
              {
                name: 'allergy & hayfever',
                link: 'https://www.boots.com/health-pharmacy/baby-child-health/allergy-hayfever-children',
              },
              {
                name: 'first aid',
                link: 'https://www.boots.com/health-pharmacy/baby-child-health/child-first-aid',
              },
              {
                name: 'nits, lice & worms',
                link: 'https://www.boots.com/health-pharmacy/baby-child-health/nits-lice-worms',
              },
              {
                name: 'colic management',
                link: 'https://www.boots.com/health-pharmacy/baby-child-health/colic',
              },
            ],
          },
          {
            name: "sexual pleasure & wellbeing",
            hasSubmenu: true,
            heading: true,
            all: false,
            type: 'half-column',
            children: [
              {
                name: 'visit sexual pleasure & wellbeing',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health',
              },
              {
                name: 'adult toys',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/adult-toys',
              },
              {
                name: 'condoms',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/condoms',
              },
              {
                name: 'lubricants & gels',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/lubricants-massagers-gels',
              },
              {
                name: 'feminine hygiene & health',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/feminine-hygiene-and-health',
              },
              {
                name: 'men\'s hygiene & health',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/mens-hygiene-and-health',
              },
              {
                name: 'intimate hair removal & grooming',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/intimate-hair-removal',
              },
            ],
          },
        ],
        },
        {
          name: 'medicines & treatments',
          link: 'https://www.boots.com/health-pharmacy/medicines-treatments',
          hasSubmenu: false,
          children: [{
            name: 'visit medicines & treatments',
            allLink: true,
            link: 'https://www.boots.com/health-pharmacy/medicines-treatments',
            hasSubmenu: false,
          },
          // categories
          {
            name: 'shop by category',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              {
                name: 'pain',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/painrelief',
              },
              {
                name: 'eyecare',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/eye-care',
              },
              {
                name: 'stomach & bowel',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/digestion',
              },
              {
                name: 'heartburn & indigestion',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/heartburn-indigestion-',
              },
              {
                name: 'footcare',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/footcare',
              },
              {
                name: 'allergy & hayfever',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/allergy-hayfever',
              },
              {
                name: 'specialist skincare',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/skin-problems',
              },
              {
                name: 'first aid',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/first-aid',
              },
              {
                name: 'cough, cold & flu',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/cold-flu-medication',
              },
              {
                name: 'mouth & oral care',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/mouth-oral-care',
              },
              {
                name: 'sleep',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/sleep',
              },
              {
                name: 'earcare',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/ear-care',
              },
              {
                name: 'hair loss',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/mens-hair-loss',
              },
              {
                name: 'diabetes',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/diabetes',
              },
              {
                name: 'heart health',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments/healthyheart',
              },
              {
                name: 'pharmacy medicines',
                link: 'https://www.boots.com/health-pharmacy/pharmacy-medicines',
              },
            ],
          },
        ],
        },
        {
          name: 'vitamins & supplements',
          link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements',
          hasSubmenu: false,
          children: [{
            name: 'visit vitamins & supplements',
            allLink: true,
            link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements',
            hasSubmenu: false,
          },
          // offers
          {
            name: 'vitamins',
            hasSubmenu: true,
            type: 'list', // or bannerimages
            heading: true,
            type: 'one-column',
            children: [{
                name: 'vitamin selector',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vitamin-selector-tool',
              },
              {
                name: 'multivitamins',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/multivitamins',
              },
              {
                name: 'immune health',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/immunehealth',
              },
              {
                name: 'baby & child vitamins',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/baby-child-vitamins',
              },
              {
                name: 'hair health vitamins',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/hair-health-vitamins',
              },
              {
                name: 'vegan vitamins',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vegan-vitamins',
              },
              {
                name: '50+ multivitamins',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/50plus-multivitamins',
              },
            ],
          },
          // shop by
          {
            name: "supplements",
            hasSubmenu: true,
            heading: true,
            all: false,
            type: 'half-column',
            children: [
              {
                name: 'pregnancy supplements',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/pregnancysupplements',
              },
              {
                name: 'CBD',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/cannabidiol-cbd-oil',
              },
              {
                name: 'beauty supplements',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/beautysupplements',
              },
              {
                name: 'men\'s health supplements',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/menshealth-supplements',
              },
            ],
          },
          {
            name: "shop by problem",
            hasSubmenu: true,
            heading: true,
            all: false,
            type: 'half-column',
            children: [{
                name: 'digestive health',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/digestive-health',
              },
              {
                name: 'energy support',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/supplements-for-energy',
              },
              {
                name: 'eye health',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/eyehealth',
              },
              {
                name: 'bone health',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/bonehealth',
              },
              {
                name: 'brain health',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/brainhealth',
              },
              {
                name: 'joint health',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/jointhealth',
              },
            ],
          },
        ],
        },
        {
          name: 'wellness',
          link: 'https://www.boots.com/wellness',
          hasSubmenu: false,
          children: [
          {
            name: 'lifestyle & wellbeing',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              {
                name: 'visit lifestyle & wellbeing',
                link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing',
              },
              {
                name: 'alternative therapies',
                link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/wellness-supplements',
              },
              {
                name: 'diet & weight management',
                link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/weightloss',
              },
              {
                name: 'dental',
                link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/bootsdental',
              },
              {
                name: 'smoking control',
                link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/stopsmoking',
              },
              {
                name: 'health food',
                link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/health-food',
              },
              {
                name: 'fitness equipment & activity trackers',
                link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/fitness',
              },
              {
                name: 'planning for a baby',
                link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/familyplanning',
              },
              {
                name: 'sports nutrition',
                link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/sports-nutrition',
              },
              {
                name: 'home & pet care',
                link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/home-pet-care',
              },
            ],
          },
          {
            name: 'diet & weight management',
            hasSubmenu: true,
            type: 'list', // or bannerimages
            heading: true,
            type: 'one-column',
            children: [
              {
                name: 'visit diet & weight management',
                link: 'https://www.boots.com/wellness/weightloss',
              },
              {
                name: 'new in diet & weight management',
                link: 'https://www.boots.com/wellness/weightloss/new-in-diet-and-weight-management',
              },
              {
                name: 'slimming aids',
                link: 'https://www.boots.com/wellness/weightloss/diet-weight-slimming-aids',
              },
              {
                name: 'meal replacements',
                link: 'https://www.boots.com/wellness/weightloss/meal-replacements',
              },
              {
                name: 'bars & snacks',
                link: 'https://www.boots.com/wellness/weightloss/weight-management-bars-snacks',
              },
              {
                name: 'weighing scales & body fat monitors',
                link: 'https://www.boots.com/wellness/weightloss/weighing-scales-body-fat-monitors',
              },
              {
                name: 'sports nutrition',
                link: 'https://www.boots.com/wellness/sports-nutrition',
              },
              {
                name: 'recipe books & accessories',
                link: 'https://www.boots.com/wellness/recipe-book-accessories',
              },
            ],
          },
          // shop by
          {
            name: "sexual pleasure",
            hasSubmenu: true,
            heading: true,
            all: false,
            type: 'half-column',
            children: [
              {
                name: 'visit sexual pleasure & wellbeing',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health',
              },
              {
                name: 'adult toys',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/adult-toys',
              },
              {
                name: 'condoms',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/condoms',
              },
              {
                name: 'lubricants & gels',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/lubricants-massagers-gels',
              },
              {
                name: 'feminine hygiene & health',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/feminine-hygiene-and-health',
              },
              {
                name: 'men\'s hygiene & health',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/mens-hygiene-and-health',
              },
              {
                name: 'intimate hair removal & grooming',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health/intimate-hair-removal',
              },
            ],
          },
        ],
        },
        {
          name: 'incontinence',
          link: 'https://www.boots.com/health-pharmacy/incontinence',
          hasSubmenu: false,
        },
        {
          name: 'health hub',
          link: 'https://www.boots.com/healthhub',
          hasSubmenu: false,
          children: [
          {
            name: 'Health Hub',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              {
                name: 'Boots online doctor',
                link: 'https://onlinedoctor.boots.com/?utm_source=Boots&utm_medium=referral&utm_campaign=Boots_nav_Online_Doctor',
              },
              {
                name: 'appointment booking',
                link: 'https://www.boots.com/appointment-booking',
              },
              {
                name: 'COVID-19 testing',
                link: 'https://www.boots.com/covid-19-testing',
              },
              {
                name: 'Winter Flu Jab Service',
                link: 'https://www.boots.com/flujab',
              },
              {
                name: 'opticians',
                link: 'https://www.boots.com/opticians',
              },
              {
                name: 'health & pharmacy',
                link: 'https://www.boots.com/healthhub',
              },
              {
                name: 'hearingcare',
                link: 'https://www.boots.com/hearingcare',
              },
            ],
          },
          // offers
          {
            name: 'Boots online doctor',
            hasSubmenu: true,
            type: 'list', // or bannerimages
            heading: true,
            type: 'one-column',
            children: [
              {
                name: 'visit boots online doctor',
                link: 'https://onlinedoctor.boots.com/?utm_source=Boots&utm_medium=referral&utm_campaign=Boots_nav_Online_Doctor',
              },
              {
                name: 'mens health',
                link: 'https://onlinedoctor.boots.com/mens-health?utm_source=Boots&utm_medium=referral&utm_campaign=Boots_nav_mens_health',
              },
              {
                name: 'womens health',
                link: 'https://onlinedoctor.boots.com/womens-health?utm_source=Boots&utm_medium=referral&utm_campaign=Boots_nav_womens_health',
              },
              {
                name: 'general health',
                link: 'https://onlinedoctor.boots.com/general-health?utm_source=Boots&utm_medium=referral&utm_campaign=Boots_nav_general_health',
              },
              {
                name: 'acne & skin conditions',
                link: 'https://onlinedoctor.boots.com/acne-skin-conditions?utm_source=Boots&utm_medium=referral&utm_campaign=Boots_nav_acne_skin_conditions',
              },
              {
                name: 'sexual health',
                link: 'https://onlinedoctor.boots.com/sexual-health?utm_source=Boots&utm_medium=referral&utm_campaign=Boots_nav_sexual_health',
              },
              {
                name: 'testing services',
                link: 'https://onlinedoctor.boots.com/home-testing-kits?utm_source=Boots&utm_medium=referral&utm_campaign=Boots_nav_home_testing_kits',
              },
            ],
          },
          // shop by
          {
            name: "COVID-19 ",
            hasSubmenu: true,
            heading: true,
            all: false,
            type: 'half-column',
            children: [
              {
                name: 'visit covid-19 testing',
                link: 'https://www.boots.com/covid-19-testing',
              },
              {
                name: 'At-Home COVID-19 Testing Kits',
                link: 'https://www.boots.com/covid-19-testing/covid-19-at-home-testing-kits',
              },
              {
                name: 'COVID-19 PCR Testing Service',
                link: 'https://www.boots.com/covid-19-testing/covid-19-testing-service',
              },
            ],
          },
        ],
        },
        {
          name: 'COVID-19 Information, Products & Testing',
          link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing',
          hasSubmenu: false,
          children: [
          {
            name: 'view services',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              {
                name: 'visit covid-19 information, products & testing',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing',
              },
              {
                name: 'COVID-19 testing',
                link: 'https://www.boots.com/covid-19-testing',
              },
              {
                name: 'what is a COVID-19 vaccination?',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/covid-vaccination',
              },
              {
                name: 'how to help prevent the spread of COVID-19',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/how-to-stop-covid-spreading',
              },
              {
                name: 'recognising symptoms',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/recognising-coronavirus-symptoms',
              },
              {
                name: 'long-term effects of COVID-19',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/what-is-long-covid',
              },
              {
                name: 'coronavirus (COVID-19)',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/covid-19',
              },
              {
                name: 'Winter Flu Jab Service',
                link: 'https://www.boots.com/online/pharmacy-services/winter-flu-jab-services',
              },
            ],
          },
          // offers
          {
            name: 'products',
            hasSubmenu: true,
            type: 'list', // or bannerimages
            heading: true,
            type: 'one-column',
            children: [
              {
                name: 'At-Home COVID-19 Testing Kits',
                link: 'https://www.boots.com/covid-19-testing/covid-19-at-home-testing-kits',
              },
              {
                name: 'reusable & disposable face masks',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/surgical-reusable-face-masks',
              },
              {
                name: 'thermometers',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/thermometers',
              },
              {
                name: 'immune health',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/immunehealth',
              },
              {
                name: 'cough, cold & flu',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/cold-flu-medication',
              },
              {
                name: 'antibacterial & disinfectants',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/hand-sanitiser-antibacterial-cleaners-disinfectants',
              },
              {
                name: 'specialist skincare',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/skin-problems',
              },
              {
                name: 'multivitamins',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/multivitamins',
              },
              {
                name: 'baby & child vitamins',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/baby-child-vitamins',
              },
              {
                name: 'sleep',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/sleep',
              },
              {
                name: 'first aid',
                link: 'https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/first-aid',
              },
            ],
          },
        ],
        },
        {
          name: 'electrical health & diagnostics',
          link: 'https://www.boots.com/electrical/electrical-health-diagnostics',
          hasSubmenu: false,
          children: [{
            name: 'visit electrical health & diagnostics',
            allLink: true,
            link: 'https://www.boots.com/electrical/electrical-health-diagnostics',
            hasSubmenu: false,
          },
          // categories
          {
            name: 'shop by product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              {
                name: 'blood pressure monitors',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/blood-pressure-monitors',
              },
              {
                name: 'diabetes',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/diabetes',
              },
              {
                name: 'back & neck massagers',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/back-neck-massagers',
              },
              {
                name: 'activity trackers',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/activity-trackers-1',
              },
              {
                name: 'foot massagers & spas',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/foot-massagers-spas',
              },
              {
                name: 'test kits',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/dna-test-kits',
              },
              {
                name: 'thermometers',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/thermometers',
              },
              {
                name: 'electrical footcare',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/electrical-footcare',
              },
              {
                name: 'TENS machines',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/tens-machines',
              },
              {
                name: 'air filters, humidifiers, de-humidifiers & fans',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/air-filters-humidifiers-de-humidifiers',
              },
              {
                name: 'heart health',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/healthyheart',
              },
              {
                name: 'light therapy, wake up & SAD lights',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/light-therapy',
              },
              {
                name: 'weighing scales & body fat monitors',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/weighing-scales-body-fat-monitors',
              },
              {
                name: 'heated bedding & hot water bottles',
                link: 'https://www.boots.com/electrical/electrical-health-diagnostics/electric-blankets',
              },
              {
                name: 'mobility & daily living aids',
                link: 'https://www.boots.com/health-pharmacy/livingaids',
              },
            ],
          },
        ],
        },
        {
          name: 'travel health',
          link: 'https://www.boots.com/health-pharmacy/travel-health',
          hasSubmenu: false,
        },
        {
          name: 'health & wellness advice',
          link: 'https://www.boots.com/health',
          hasSubmenu: false,
        },
      ],
    },

    // brands
    {
      name: 'brand A-Z',
      regex: '/health-pharmacy',
      link: 'https://www.boots.com/brands',
      hasSubmenu: false,
    },


    {
      name: 'Help',
      link: 'https://www.boots.com/advantage-card',
      hasSubmenu: false,
      desktop: false,
      icon: 'https://boots.scene7.com/is/image/Boots/Help-1?scl=1&fmt=png-alpha',
      noneCat: true,
    },
    {
      name: '',
      hasSubmenu: false,
      desktop: false,
      noneCat: true,
      currency: true,
    },

  ];
}
