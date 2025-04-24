import shared from "../../../../../../core-files/shared";

const { VARIATION } = shared;


// data for all except v5
const allMobileVariationData = (isLoggedIn) => {
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

  // Make Up
  {
    name: 'Makeup',
    link: 'https://www.boots.com/beauty/makeup',
    hasSubmenu: true,
    children: [{
      name: 'Visit Makeup',
      allLink: true,
      link: 'https://www.boots.com/beauty/makeup',
      hasSubmenu: false,
    },
    {
      name: 'Beauty Offers',
      colour: '#b8237b',
      link: 'https://www.boots.com/beauty/beauty-skincare-offers',
      hasSubmenu: false,
    },
    {
      name: 'Vegan Makeup',
      link: 'https://www.boots.com/beauty/makeup/vegan-makeup-products',
      hasSubmenu: false,
    },
    {
      name: 'Beauty Gift Sets',
      link: 'https://www.boots.com/beauty/makeup/make-up-gift-sets',
      hasSubmenu: false,
    },
    {
      name: 'Face',
      link: 'https://www.boots.com/beauty/makeup/face/all-face',
      hasSubmenu: false,
      children: [{
        name: 'Shop All Face',
        allLink: true,
        link: 'https://www.boots.com/beauty/makeup/face/all-face',
        hasSubmenu: false,
      },
      // Face
      {
        name: 'Face',
        hasSubmenu: true,
        heading: true,
        type: 'two-columns',
        children: [{
          name: 'Foundation',
          link: 'https://www.boots.com/beauty/makeup/face/foundation',
        },
        {
          name: 'Blusher',
          link: 'https://www.boots.com/beauty/makeup/face/blusher',
        },
        {
          name: 'Bronzer',
          link: 'https://www.boots.com/beauty/makeup/face/bronzer',
        },
        {
          name: 'Powder',
          link: 'https://www.boots.com/beauty/makeup/face/powder',
        },
        {
          name: 'Primer',
          link: 'https://www.boots.com/beauty/makeup/face/primer',
        },
        {
          name: 'Tinted Moisturisers',
          link: 'https://www.boots.com/beauty/makeup/face/tinted-moisturisers',
        }
        ],
      },
      ],
    },
    {
      name: 'Eyes',
      link: 'https://www.boots.com/beauty/makeup/eyes/all-eyes',
      hasSubmenu: false,
      children: [{
        name: 'Shop All Eyes',
        allLink: true,
        link: 'https://www.boots.com/beauty/makeup/eyes/all-eyes',
        hasSubmenu: false,
      },
      // categories
      {
        name: 'Shop Eyes',
        hasSubmenu: true,
        heading: true,
        type: 'two-columns',
        children: [
          {
            name: 'Brows',
            link: 'https://www.boots.com/beauty/makeup/eyes/eyebrows',
          },
          {
            name: 'Eye Liner',
            link: 'https://www.boots.com/beauty/makeup/eyes/eye-liner',
          },
          {
            name: 'Eye Shadow',
            link: 'https://www.boots.com/beauty/makeup/eyes/eye-shadow',
          },
          {
            name: 'Mascara',
            link: 'https://www.boots.com/beauty/makeup/eyes/mascara',
          },
          {
            name: 'Eye Primers & Base',
            link: 'https://www.boots.com/beauty/makeup/eyes/eye-primers-base',
          },
          {
            name: 'Eye Palettes',
            link: 'https://www.boots.com/beauty/makeup/eyes/eye-palettes',
          }
        ],
      },
      ],
    },
    {
      name: 'Lips',
      link: 'https://www.boots.com/beauty/makeup/lips',
      hasSubmenu: false,
      children: [{
        name: 'Shop All Lips',
        allLink: true,
        link: 'https://www.boots.com/beauty/makeup/lips/all-lips',
        hasSubmenu: false,
      },
      // categories
      {
        name: 'Shop Lips',
        hasSubmenu: true,
        heading: true,
        type: 'two-columns',
        children: [{
          name: 'Lipsticks',
          link: 'https://www.boots.com/beauty/makeup/lips/lipsticks',
        },
        {
          name: 'Lip Balms & Creams',
          link: 'https://www.boots.com/beauty/makeup/lips/lip-balms-creams',
        },
        {
          name: 'Liquid Lipsticks',
          link: 'https://www.boots.com/beauty/makeup/lips/liquid-lipsticks',
        },
        {
          name: 'Lip Gloss & Plumpers',
          link: 'https://www.boots.com/beauty/makeup/lips/lip-gloss-plumpers',
        },
        {
          name: 'Lip & Cheek Tints',
          link: 'https://www.boots.com/beauty/makeup/lips/lip-cheek-tints',
        },
        {
          name: 'Lipstick Sealers',
          link: 'https://www.boots.com/beauty/makeup/lips/lipstick-sealers',
        },
        ],
      },
      ],
    },
    {
      name: 'Nails',
      link: 'https://www.boots.com/beauty/makeup/nails',
      hasSubmenu: false,
      children: [{
        name: 'Shop All Nails',
        allLink: true,
        link: 'https://www.boots.com/beauty/makeup/nails',
        hasSubmenu: false,
      },
      // categories
      {
        name: 'Shop Nails',
        hasSubmenu: true,
        heading: true,
        type: 'two-columns',
        children: [{
          name: 'Nail Polish',
          link: 'https://www.boots.com/beauty/makeup/nails/nail-polish',
        },
        {
          name: 'Gel Nails',
          link: 'https://www.boots.com/beauty/makeup/nails/gel-nails',
        },
        {
          name: 'False Nails',
          link: 'https://www.boots.com/beauty/makeup/nails/false-nails',
        },
        {
          name: 'Nail Sets',
          link: 'https://www.boots.com/beauty/makeup/nails/nail-sets',
        },
        ],
      },
      ],
    },
    {
      name: 'Premium Makeup',
      link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-makeup',
      hasSubmenu: false,
      children: [{
        name: 'All Premium Makeup',
        allLink: true,
        link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-makeup',
        hasSubmenu: false,
      },
      // categories
      {
        name: 'Shop Premium Beauty',
        hasSubmenu: true,
        heading: true,
        type: 'two-columns',
        children: [
          {
            name: 'Premium Makeup Tools',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-makeup-tools',
          },
          {
            name: 'Premium Beauty Gifts',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-gift',
          },
        ],
      },
      ],
    },
    {
      name: 'Accessories',
      link: 'https://www.boots.com/beauty/beauty-accessories',
      hasSubmenu: false,
    },
    {
      name: 'Skincare',
      link: 'https://www.boots.com/beauty/skincare',
      hasSubmenu: false,
    },
    {
      name: 'Beauty Inspiration',
      link: 'https://www.boots.com/skincare-beauty-advice',
      hasSubmenu: false,
    },
    ],
  },

  // Skincare
  {
    name: 'Skincare',
    link: 'https://www.boots.com/beauty/skincare',
    hasSubmenu: true,
    children: [{
      name: 'All Skincare',
      allLink: true,
      link: 'https://www.boots.com/beauty/skincare/skincare-all-skincare',
      hasSubmenu: false,
    },
    {
      name: 'Vegan Skincare',
      link: 'https://www.boots.com/beauty/skincare/vegan-skincare-products',
      hasSubmenu: false,
    },
    {
      name: 'Premium Skincare',
      link: 'https://www.boots.com/beauty/luxury-beauty-skincare/all-luxury-skincare',
      hasSubmenu: false,
    },
    {
      name: 'Men\'s Skincare & Body',
      link: 'https://www.boots.com/beauty/skincare/skincare-body',
      hasSubmenu: false,
    },
    {
      name: 'Facial Skincare',
      link: 'https://www.boots.com/beauty/skincare',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Moisturiser',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/moisturiser',
          },
          {
            name: 'Cleansers',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/cleanser-toner',
          },
          {
            name: 'Serums',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/serum-and-treatments',
          },
          {
            name: 'Face Masks',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/masks',
          },
          {
            name: 'Eye Cream',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/eye-cream',
          },
          {
            name: 'Makeup Remover',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/make-up-remover-',
          },
          {
            name: 'Skincare Tools',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/skincare-tools',
          },
          ],
        },
      ],
    },
    {
      name: 'Body Skincare',
      link: 'https://www.boots.com/beauty/skincare/body-skincare',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'All Body Skincare',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/skincare-all-body-skincare',
          },
          {
            name: 'Body Moisturiser',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/body-moisturiser',
          },
          {
            name: 'Neck & Chest Cream',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/neck-chest-cream',
          },
          {
            name: 'Body Scrub & Exfoliator',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/body-scrub-exfoliator',
          },
          {
            name: 'Foot Creams & Lotions',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/foot-creams-lotions',
          },
          {
            name: 'Hand Cream & Lotion',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/hand-cream-lotions',
          },
          {
            name: 'Body Butter',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/body-butter',
          },
          ],
        },
      ],
    },
    {
      name: 'Expert Skincare & Treatments',
      link: 'https://www.boots.com/beauty/skincare/expert-skincare-',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Shop Expert Skincare',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/beauty-expert-skincare-expert-skincare-shop-all',
          },
          {
            name: 'Expert Suncare',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/beauty-expert-skincare-expert-skincare-expert-suncare',
          },
          {
            name: 'Acne Prone Skin',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/acne-prone-skin',
          },
          {
            name: 'Anti-Redness',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/anti-redness',
          },
          {
            name: 'Pigmentation',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/pigmentation',
          },
          {
            name: 'Dry Skin',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/dry-skin-',
          },
          {
            name: 'Eczema Prone Skin',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/eczema-prone-skin',
          },
          ],
        },
      ],
    },
    {
      name: 'Inspiration',
      link: 'https://www.boots.com/beauty/skincare',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Skincare Advice',
            link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice',
          },
          {
            name: 'Anti-ageing Advice',
            link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice/anti-ageing-advice',
          },
          {
            name: 'Face Masks Advice',
            link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice/face-masks-advice',
          },
          {
            name: 'Skin Concerns',
            link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice/skin-concerns',
          },
          {
            name: 'Skincare Basics',
            link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice/skincare-basics',
          },
          ],
        },
      ],
    },
    ],
  },

  // Hair
  {
    name: 'Hair',
    link: 'https://www.boots.com/beauty/hair',
    hasSubmenu: true,
    children: [{
      name: 'All Hair',
      allLink: true,
      link: 'https://www.boots.com/beauty/hair/all-hair',
      hasSubmenu: false,
    },
    {
      name: 'New in Hair',
      link: 'https://www.boots.com/beauty/hair/new-in-hair',
      hasSubmenu: false,
    },
    {
      name: 'Hair Value Packs & Bundles',
      link: 'https://www.boots.com/beauty/hair/hair-value-packs-and-bundles',
      hasSubmenu: false,
    },
    {
      name: 'Premium Hair',
      link: 'https://www.boots.com/beauty/hair/luxury-beauty-hair',
      hasSubmenu: false,
    },
    {
      name: 'Shampoo',
      link: 'https://www.boots.com/beauty/hair/shampoo',
      hasSubmenu: false,
    },
    {
      name: 'Conditioner',
      link: 'https://www.boots.com/beauty/hair/conditioner',
      hasSubmenu: false,
    },
    {
      name: 'Men\'s Hair',
      link: 'https://www.boots.com/beauty/hair/mens-hair',
      hasSubmenu: false,
    },
    {
      name: 'Hair Treatments & Masks',
      link: 'https://www.boots.com/beauty/hair/hair-treatments-and-masks',
      hasSubmenu: false,
    },
    {
      name: 'Hair Accessories',
      link: 'https://www.boots.com/beauty/hair/hair-accessories',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Brushes & Combs',
            link: 'https://www.boots.com/beauty/hair/brushes-and-combs',
          },
          {
            name: 'Curls, Kinks & Coils',
            link: 'https://www.boots.com/beauty/hair/textured-hair',
          },
          {
            name: 'Hair Health Vitamin',
            link: 'https://www.boots.com/beauty/hair/hair-health-vitamins',
          },
          {
            name: 'Thinning Hair',
            link: 'https://www.boots.com/beauty/hair/thinning-hair',
          },
          ],
        },
      ],
    },
    {
      name: 'Hair Styling Tools',
      link: 'https://www.boots.com/electrical/hair-styling-tools',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'All Hair Styling Tools',
            link: 'https://www.boots.com/electrical/hair-styling-tools/all-electrical-hair-styling-tools',
          },
          {
            name: 'Hair Curlers',
            link: 'https://www.boots.com/electrical/hair-styling-tools/hair-curlers',
          },
          {
            name: 'Hair Dryers',
            link: 'https://www.boots.com/electrical/hair-styling-tools/hair-dryers',
          },
          {
            name: 'Hair Straighteners',
            link: 'https://www.boots.com/electrical/hair-styling-tools/hair-straighteners',
          },
          {
            name: 'Hot Brushes & Air Stylers',
            link: 'https://www.boots.com/electrical/hair-styling-tools/hot-brushes-air-stylers',
          },
          {
            name: 'Accessories & Spares',
            link: 'https://www.boots.com/electrical/hair-styling-tools/hair-tools-accessories-spares',
          },
          ],
        },
      ],
    },
    {
      name: 'Hair Dye',
      link: 'https://www.boots.com/beauty/hair/hair-dye',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'All Hair Dye',
            link: 'https://www.boots.com/beauty/hair/hair-dye/all-hair-dye-at-home-for-men-women',
          },
          {
            name: 'Permanent',
            link: 'https://www.boots.com/beauty/hair/hair-dye/hair-dye-permanent',
          },
          {
            name: 'Semi Permanent',
            link: 'https://www.boots.com/beauty/hair/hair-dye/semi-permanent',
          },
          {
            name: 'Temporary',
            link: 'https://www.boots.com/beauty/hair/hair-dye/temporary-hair-dye',
          },
          {
            name: 'Root Touch Up',
            link: 'https://www.boots.com/beauty/hair/hair-dye/root-touch-up',
          },
          {
            name: 'Hair Highlighters',
            link: 'https://www.boots.com/beauty/hair/hair-dye/hair-highlighters',
          },
          {
            name: 'Hair Colour Remover',
            link: 'https://www.boots.com/beauty/hair/hair-dye/hair-colour-remover',
          },
          ],
        },
      ],
    },
    ],
  },

  // Toiletries
  {
    name: 'Toiletries',
    link: 'https://www.boots.com/toiletries',
    hasSubmenu: true,
    children: [{
      name: 'New In Toietries',
      allLink: true,
      link: 'https://www.boots.com/toiletries/new-in-toiletries',
      hasSubmenu: false,
    },
    {
      name: 'Toiletries Offers',
      link: 'https://www.boots.com/toiletries/toiletries-offers',
      hasSubmenu: false,
    },
    {
      name: 'Toiletries Value Packs & Bundles',
      link: 'https://www.boots.com/toiletries/toiletries-value-packs-and-bundles',
      hasSubmenu: false,
    },
    {
      name: 'Bathroom Essentials',
      link: 'https://www.boots.com/toiletries/washing-bathing',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'All Bathroom Essentials',
            link: 'https://www.boots.com/toiletries/washing-bathing',
          },
          {
            name: 'Shower Gels & Scrubs',
            link: 'https://www.boots.com/toiletries/washing-bathing/shower-gel',
          },
          {
            name: 'Soap & Hand Wash',
            link: 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash',
          },
          {
            name: 'Deodorants & Antiperspirants',
            link: 'https://www.boots.com/toiletries/deodorants-antiperspirants',
          },
          {
            name: 'Body Scrub',
            link: 'https://www.boots.com/toiletries/washing-bathing/body-scrub',
          },
          {
            name: 'Face Wash',
            link: 'https://www.boots.com/toiletries/washing-bathing/face-wash',
          },
          {
            name: 'Tissues, Wipes & Sanitisers',
            link: 'https://www.boots.com/toiletries/washing-bathing/tissues-wipes-sanitisers',
          },
          {
            name: 'Baby & Child Toiletries',
            link: 'https://www.boots.com/toiletries/washing-bathing/baby-child-toiletries',
          },
          {
            name: 'Bath Sets',
            link: 'https://www.boots.com/toiletries/washing-bathing/toiletries-bath-sets',
          },
          {
            name: 'Natural Toiletries',
            link: 'https://www.boots.com/toiletries/washing-bathing/natural-toiletries',
          },
          {
            name: 'Bath Accessories',
            link: 'https://www.boots.com/toiletries/washing-bathing/bath-accessories',
          },
          {
            name: 'Talcum Powder',
            link: 'https://www.boots.com/toiletries/washing-bathing/talcum-powder',
          },
          {
            name: 'Cotton Wool',
            link: 'https://www.boots.com/baby-child/bathing-changing/baby-cotton-wool',
          },
          ],
        },
      ],
    },
    {
      name: 'Dental',
      link: 'https://www.boots.com/toiletries/bootsdental',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Shop Dental',
            link: 'https://www.boots.com/toiletries/bootsdental',
          },
          {
            name: 'At Home Dentistry',
            link: 'https://www.boots.com/toiletries/bootsdental/at-home-dentistry',
          },
          {
            name: 'Mouthwash',
            link: 'https://www.boots.com/toiletries/bootsdental/mouthwash',
          },
          {
            name: 'Kids Dental',
            link: 'https://www.boots.com/toiletries/bootsdental/kids-dental',
          },
          {
            name: 'Oral Health',
            link: 'https://www.boots.com/toiletries/bootsdental/oral-health',
          },
          {
            name: 'Toothpaste',
            link: 'https://www.boots.com/toiletries/bootsdental/toothpaste',
          },
          {
            name: 'Electrical Dental',
            link: 'https://www.boots.com/toiletries/bootsdental/electrical-dental',
          },
          {
            name: 'Toothbrushes',
            link: 'https://www.boots.com/toiletries/bootsdental/toothbrushes',
          },
          ],
        },
      ],
    },

    {
      name: 'Men\'s Toiletries',
      link: 'https://www.boots.com/beauty/skincare',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Visit Men\'s Toiletries',
            link: 'https://www.boots.com/toiletries/mens-toiletries',
          },
          {
            name: 'Men\'s Value Packs',
            link: 'https://www.boots.com/toiletries/mens-toiletries/mens-value-packs-and-bundles',
          },
          {
            name: 'Washing & Bathing',
            link: 'https://www.boots.com/toiletries/mens-toiletries/mens-washing-bathing',
          },
          {
            name: 'Male Incontinence',
            link: 'https://www.boots.com/toiletries/mens-toiletries/male-incontinence',
          },
          ],
        },
      ],
    },
    ],
  },

  // Baby & Child
  {
    name: 'Baby & Child',

    link: 'https://www.boots.com/baby-child',
    hasSubmenu: true,
    children: [{
      name: 'Visit Baby & Child',
      allLink: true,
      link: 'https://www.boots.com/baby-child',
      hasSubmenu: false,
    },
    {
      name: 'Baby Value Packs and Bundles',
      link: 'https://www.boots.com/baby-child/baby-value-packs-and-bundles',
      hasSubmenu: false,
    },
    {
      name: 'Baby & Child Offers',
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
      name: 'Baby Event',
      link: 'https://www.boots.com/baby-child/baby-child-offers',
      hasSubmenu: false,
    },
    {
      name: 'Travel & Nursery',
      link: 'https://www.boots.com/baby-child/pushchairs-car-seats',
      hasSubmenu: false,
      children: [{
        name: 'All Travel',
        allLink: true,
        link: 'https://www.boots.com/baby-child/pushchairs-car-seats',
        hasSubmenu: false,
      },
      {
        name: 'All Nursery',
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
          name: 'Pushchairs, Strollers, Prams & Doubles',
          link: 'https://www.boots.com/baby-child/pushchairs-car-seats/pushchairs-strollers-prams-doubles',
        },
        {
          name: 'Car Seats & Accessories',
          link: 'https://www.boots.com/baby-child/pushchairs-car-seats/car-seats-accessories',
        },
        {
          name: 'Travel Systems',
          link: 'https://www.boots.com/baby-child/pushchairs-car-seats/travel-systems',
        },
        {
          name: 'Travel Accessories',
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
          name: 'Nursery Furniture',
          link: 'https://www.boots.com/baby-child/nursery-furniture/furniture-sets',
        },
        {
          name: 'Cots & Cot Beds',
          link: 'https://www.boots.com/baby-child/nursery-furniture/cots-cot-beds',
        },
        {
          name: 'Cribs & Moses Baskets',
          link: 'https://www.boots.com/baby-child/nursery-furniture/cribs-moses-baskets',
        },
        {
          name: 'Thermometers',
          link: 'https://www.boots.com/baby-child/nursery-furniture/thermometers',
        },
        {
          name: 'Baby Safety',
          link: 'https://www.boots.com/baby-child/nursery-furniture/baby-safety',
        },
        {
          name: 'Bedside Sleeping',
          link: 'https://www.boots.com/baby-child/nursery-furniture/bedside-sleeping',
        },
        {
          name: 'Mobiles & Night Lights',
          link: 'https://www.boots.com/baby-child/nursery-furniture/mobiles-night-lights',
        },
        {
          name: 'Baby Monitors',
          link: 'https://www.boots.com/baby-child/nursery-furniture/baby-monitors',
        },
        {
          name: 'Bedding',
          link: 'https://www.boots.com/baby-child/nursery-furniture/baby-bedding',
        },
        {
          name: 'Bouncers, Swings & Play Gyms',
          link: 'https://www.boots.com/baby-child/nursery-furniture/bouncers-swings-play-gyms',
        },
        ],
      },
      ],
    },
    {
      name: 'Clothing',
      link: 'https://www.boots.com/baby-child/mothercare-clothing',
      hasSubmenu: false,
      children: [{
        name: 'All Clothing',
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
          name: 'Shop All Baby & Kids Clothing',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/shop-all-baby-kids-clothing',
        },
        {
          name: 'New In Baby & Kids Clothes',
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
          name: 'Baby Clothes 0-24 Months',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months',
        },
        {
          name: 'Girls Clothes 9 months - 6 Years',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-girls-clothes-9-months-6-years',
        },
        {
          name: 'Boys Clothes 9 months - 6 Years',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-boys-clothes-9-months-6-years',
        },
        {
          name: 'Nightwear & Underwear',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-nightwear-underwear',
        },
        {
          name: 'Maternity Bras',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-maternity-bras',
        },
        {
          name: 'Premature Baby Range',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-premature-baby-range',
        },
        ],
      },
      ],
    },
    {
      name: 'Feeding',
      link: 'https://www.boots.com/baby-child/babyfeeding',
      hasSubmenu: false,
      children: [{
        name: 'All Feeding',
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
          name: 'Baby Value Packs & Bundles',
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
          name: 'Baby Milk & Formula',
          link: 'https://www.boots.com/baby-child/babyfeeding/baby-milk-formula',
        },
        {
          name: 'Baby Food & Weaning',
          link: 'https://www.boots.com/baby-child/babyfeeding/baby-food-weaning',
        },
        {
          name: 'Breastfeeding',
          link: 'https://www.boots.com/baby-child/babyfeeding/breastfeeding-pumps',
        },
        {
          name: 'Toddler Food & Drink',
          link: 'https://www.boots.com/baby-child/babyfeeding/toddler-food-drink',
        },
        {
          name: 'Bottle Feeding',
          link: 'https://www.boots.com/baby-child/babyfeeding/baby-bottles-teats',
        },
        {
          name: 'Cups',
          link: 'https://www.boots.com/baby-child/babyfeeding/baby-cups',
        },
        {
          name: 'Soothers & Teethers',
          link: 'https://www.boots.com/baby-child/babyfeeding/soothers-teethers',
        },
        {
          name: 'Dinnerware',
          link: 'https://www.boots.com/baby-child/babyfeeding/child-dinnerware',
        },
        {
          name: 'Sterilising',
          link: 'https://www.boots.com/baby-child/babyfeeding/sterilising',
        },
        {
          name: 'Bibs & Muslins',
          link: 'https://www.boots.com/baby-child/babyfeeding/bibs-muslins',
        },
        {
          name: 'Highchairs & Booster Seats',
          link: 'https://www.boots.com/baby-child/babyfeeding/highchairs-booster-seats',
        },
        {
          name: 'Lunch Bags',
          link: 'https://www.boots.com/baby-child/babyfeeding/lunch-bags',
        },
        ],
      },
      ],
    },
    {
      name: 'Bathing & Changing',
      link: 'https://www.boots.com/baby-child/bathing-changing',
      hasSubmenu: false,
      children: [{
        name: 'All Bathing & Changing',
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
          name: 'Kids Dental',
          link: 'https://www.boots.com/baby-child/bathing-changing/kids-dental',
        },
        {
          name: 'Changing Bag Essentials',
          link: 'https://www.boots.com/baby-child/bathing-changing/changing-bag-essentials',
        },
        {
          name: 'Baby Value Packs & Bundles',
          link: 'https://www.boots.com/baby-child/bathing-changing/baby-value-packs-and-bundles',
        },
        {
          name: 'Baby & Child Toiletries',
          link: 'https://www.boots.com/baby-child/bathing-changing/baby-child-toiletries',
        },
        {
          name: 'Nappies',
          link: 'https://www.boots.com/baby-child/bathing-changing/nappies',
        },
        {
          name: 'Baby Baths & Accessories',
          link: 'https://www.boots.com/baby-child/bathing-changing/baby-baths-accessories',
        },
        {
          name: 'Baby Wipes',
          link: 'https://www.boots.com/baby-child/bathing-changing/baby-wipes',
        },
        {
          name: 'Changing Bags & Mats',
          link: 'https://www.boots.com/baby-child/bathing-changing/changing-bags-mats',
        },
        {
          name: 'Potty Training',
          link: 'https://www.boots.com/baby-child/bathing-changing/potty-training',
        },
        {
          name: 'Nappy Disposal',
          link: 'https://www.boots.com/baby-child/bathing-changing/nappy-disposal',
        },
        {
          name: 'Cotton Wool',
          link: 'https://www.boots.com/baby-child/bathing-changing/baby-cotton-wool',
        },
        ],
      },
      ],
    },
    {
      name: 'Pregnancy & Maternity',
      link: 'https://www.boots.com/baby-child/pregnancy-maternity',
      hasSubmenu: false,
      children: [{
        name: 'Visit Pregnancy & Maternity',
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
          name: 'All Premature Baby',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/all-premature-baby',
        },
        {
          name: 'Hospital Bag Essentials',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/hospital-bag-essentials',
        },
        {
          name: 'New Mum Toiletries',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/new-mum-toiletries',
        },
        {
          name: 'Maternity & Nursing Clothes',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/maternity-nursing-clothing',
        },
        {
          name: 'Pregnancy Tests',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-tests',
        },
        {
          name: 'Pregnancy Supplements',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/pregnancysupplements',
        },
        {
          name: 'Maternity TENs Machines',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/maternity-tens-machine',
        },
        {
          name: 'Pillows',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-maternity-pillows',
        },
        {
          name: 'Ovulation & Fertility Tests',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/ovulation-fertility-tests',
        },
        {
          name: 'Baby Shower Gifting',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/gift-baby-shower',
        },
        ],
      },
      ],
    },
    {
      name: 'Baby & Child Health',
      link: 'https://www.boots.com/baby-child/baby-child-health',
      hasSubmenu: false,
      children: [{
        name: 'Visit Baby & Child Health',
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
          name: 'Baby & Child Vitamins',
          link: 'https://www.boots.com/baby-child/baby-child-health/baby-child-vitamins',
        },
        {
          name: 'Fever & Pain Relief',
          link: 'https://www.boots.com/baby-child/baby-child-health/fever-pain-relief',
        },
        {
          name: 'Cough, Cold & Flu',
          link: 'https://www.boots.com/baby-child/baby-child-health/child-cough-cold-flu',
        },
        {
          name: 'Skincare Conditions',
          link: 'https://www.boots.com/baby-child/baby-child-health/skincare-conditions',
        },
        {
          name: 'Teething',
          link: 'https://www.boots.com/baby-child/baby-child-health/teething',
        },
        {
          name: 'Allergy & Hayfever',
          link: 'https://www.boots.com/baby-child/baby-child-health/allergy-hayfever-children',
        },
        {
          name: 'First Aid',
          link: 'https://www.boots.com/baby-child/baby-child-health/child-first-aid',
        },
        {
          name: 'Nits, Lice & Worms',
          link: 'https://www.boots.com/baby-child/baby-child-health/nits-lice-worms',
        },
        {
          name: 'Colic Management',
          link: 'https://www.boots.com/baby-child/baby-child-health/colic',
        },
        ],
      },
      ],
    },
    {
      name: 'Toys',
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

  // Fragrance
  {
    name: 'Fragrance',
    link: 'https://www.boots.com/fragrance',
    hasSubmenu: true,
    children: [{
      name: 'Shop Fragrance',
      allLink: true,
      link: 'https://www.boots.com/fragrance',
      hasSubmenu: false,
    },
    {
      name: 'Fragrance Offers',
      link: 'https://www.boots.com/fragrance/fragrance-offers',
      hasSubmenu: false,
    },
    {
      name: 'Fragrance Exclusives',
      link: 'https://www.boots.com/fragrance/fragrance-exclusives',
      hasSubmenu: false,
    },
    {
      name: 'Vegan Fragrance',
      link: 'https://www.boots.com/fragrance/vegan-fragrances',
      hasSubmenu: false,
    },
    {
      name: 'Luxury Fragrance',
      link: 'https://www.boots.com/fragrance/luxury-fragrance',
      hasSubmenu: false,
    },
    {
      name: 'New in Fragrance',
      link: 'https://www.boots.com/fragrance/new-in-fragrance',
      hasSubmenu: false,
    },
    {
      name: 'Perfume',
      link: 'https://www.boots.com/fragrance/perfume',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Visit Perfume',
            link: 'https://www.boots.com/fragrance/perfume',
          },
          {
            name: 'All Perfume',
            link: 'https://www.boots.com/fragrance/perfume/all-perfume',
          },
          {
            name: 'Gift Sets',
            link: 'https://www.boots.com/fragrance/perfume/perfume-gift-sets',
          },
          {
            name: 'Body Mists',
            link: 'https://www.boots.com/fragrance/perfume/body-mists-',
          },
          ],
        },
      ],
    },
    {
      name: 'Aftershave',
      link: 'https://www.boots.com/fragrance/aftershave',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Visit Aftershave',
            link: 'https://www.boots.com/fragrance/aftershave',
          },
          {
            name: 'All Aftershave',
            link: 'https://www.boots.com/fragrance/aftershave/mens-aftershave',
          },
          {
            name: 'Aftershave Gift Sets',
            link: 'https://www.boots.com/fragrance/aftershave/aftershave-gift-sets',
          },
          {
            name: 'Cologne',
            link: 'https://www.boots.com/fragrance/aftershave/cologne',
          },
          {
            name: 'Fragrance Bath & Shower',
            link: 'https://www.boots.com/fragrance/aftershave/fragrance-bath-shower',
          },
          ],
        },
      ],
    },
    {
      name: 'Fragrance Gift Sets',
      link: 'https://www.boots.com/fragrance/fragrance-gift-sets',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Fragrance Gift Sets',
            link: 'https://www.boots.com/fragrance/fragrance-gift-sets',
          },
          {
            name: 'Gift Wrapped Sets',
            link: 'https://www.boots.com/fragrance/fragrance-gift-sets/gift-wrapped-sets',
          },
          {
            name: 'Perfume Gift Sets',
            link: 'https://www.boots.com/fragrance/fragrance-gift-sets/perfume-gift-sets',
          },
          {
            name: 'Aftershave Gift Sets',
            link: 'https://www.boots.com/fragrance/fragrance-gift-sets/aftershave-gift-sets',
          },
          ],
        },
      ],
    },
    ],
  },

  // Health & Pharmacy
  {
    name: 'Health & Pharmacy',
    link: 'https://www.boots.com/health-pharmacy',
    hasSubmenu: true,
    children: [{
      name: 'Health & Pharmacy',
      allLink: true,
      link: 'https://www.boots.com/health-pharmacy',
      hasSubmenu: false,
    },
    {
      name: 'Health Offers',
      link: 'https://www.boots.com/health-pharmacy/health-offers',
      hasSubmenu: false,
    },
    {
      name: 'New in Health',
      link: 'https://www.boots.com/health-pharmacy/new-in-health',
      hasSubmenu: false,
    },
    {
      name: 'Online Pharmacy',
      link: 'https://www.boots.com/online/pharmacy/',
      hasSubmenu: false,
    },
    {
      name: 'Health Hub',
      link: 'https://www.boots.com/healthhub',
      hasSubmenu: false,
    },
    {
      name: 'Boots Online Doctor',
      link: 'https://onlinedoctor.boots.com/?utm_source=Boots&utm_medium=referral&utm_campaign=Boots_nav_Online_Doctor',
      hasSubmenu: false,
    },
    {
      name: 'Shop Health',
      link: 'https://www.boots.com/health-pharmacy',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Visit Women\'s Health', link: 'https://www.boots.com/health-pharmacy/womenshealth', },
            { name: 'Planning for a Baby', link: 'https://www.boots.com/health-pharmacy/womenshealth/familyplanning', },
            { name: 'Intimate Dryness', link: 'https://www.boots.com/health-pharmacy/womenshealth/intimate-dryness--1', },
            { name: 'Bacterial Vaginosis', link: 'https://www.boots.com/health-pharmacy/womenshealth/vaginitis', },
            { name: 'Female Incontinence', link: 'https://www.boots.com/health-pharmacy/womenshealth/female-incontinence', },
            { name: 'Feminine Wash & Wipes', link: 'https://www.boots.com/health-pharmacy/womenshealth/feminine-wash-wipes', },
            { name: 'Thrush', link: 'https://www.boots.com/health-pharmacy/womenshealth/thrush', },
            { name: 'Menopause', link: 'https://www.boots.com/health-pharmacy/womenshealth/menopause-support', },
            { name: 'Women\'s Health Supplements', link: 'https://www.boots.com/health-pharmacy/womenshealth/womenshealth-supplements', },
            { name: 'Morning After Pill', link: 'https://www.boots.com/health-pharmacy/womenshealth/morning-after-pill', },
            { name: 'Period Delay Online Clinic', link: 'https://www.boots.com/health-pharmacy/womenshealth/period-delay-clinic', },
            { name: 'Cystitis & Urinary Tract Infections', link: 'https://www.boots.com/health-pharmacy/womenshealth/cystitis-urinary-tract-infections', },
            { name: 'Hair Loss', link: 'https://www.boots.com/health-pharmacy/womenshealth/womens-hair-loss', },
            { name: 'Period Pain', link: 'https://www.boots.com/health-pharmacy/womenshealth/period-pain', },
            { name: 'Cervical Cancer Vaccination Service', link: 'https://www.boots.com/health-pharmacy/womenshealth/cervicalcancer', },
            { name: 'Alternative Therapy', link: 'https://www.boots.com/health-pharmacy/womenshealth/womens-alternative-therapy', },
          ],
        },
      ],
    },
    {
      name: 'Men\'s Health',
      link: 'https://www.boots.com/health-pharmacy/menshealth',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Visit Men\'s Health', link: 'https://www.boots.com/health-pharmacy/menshealth', },
            { name: 'Men\'s Sexual Health', link: 'https://www.boots.com/health-pharmacy/menshealth/mens-sexual-health', },
            { name: 'Male Incontinence', link: 'https://www.boots.com/health-pharmacy/menshealth/male-incontinence', },
            { name: 'Hair Loss', link: 'https://www.boots.com/health-pharmacy/menshealth/mens-hair-loss', },
            { name: 'Men\'s Health Supplements', link: 'https://www.boots.com/health-pharmacy/menshealth/menshealth-supplements', },
            { name: 'Jock Rash', link: 'https://www.boots.com/health-pharmacy/menshealth/jock-rash', },
          ],
        },
      ],
    },
    {
      name: 'Medicines & Treatments',
      link: 'https://www.boots.com/health-pharmacy/medicines-treatments',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Pain', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/painrelief', },
            { name: 'Eyecare', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/eye-care', },
            { name: 'Stomach & Bowel', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/digestion', },
            { name: 'Heartburn & Indigestion', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/heartburn-indigestion-', },
            { name: 'Footcare', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/footcare', },
            { name: 'Allergy & Hayfever', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/allergy-hayfever', },
            { name: 'Specialist Skincare', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/skin-problems', },
            { name: 'First Aid', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/first-aid', },
            { name: 'Cough, Cold & Flu', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/cold-flu-medication', },
            { name: 'Mouth & Oral Care', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/mouth-oral-care', },
            { name: 'Sleep', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/sleep', },
            { name: 'Earcare', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/ear-care', },
            { name: 'Hair Loss', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/mens-hair-loss', },
            { name: 'Diabetes', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/diabetes', },
            { name: 'Heart Health', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/healthyheart', },
            { name: 'Pharmacy Medicines', link: 'https://www.boots.com/health-pharmacy/pharmacy-medicines', },
          ],
        },
      ],
    },
    {
      name: 'Vitamins',
      link: 'https://www.boots.com/health-pharmacy/medicines-treatments',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Vitamin Selector', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vitamin-selector-tool', },
            { name: 'Multivitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/multivitamins', },
            { name: 'Immune Health', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/immunehealth', },
            { name: 'Baby & Child Vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/baby-child-vitamins', },
            { name: 'Hair Health Vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/hair-health-vitamins', },
            { name: 'Vegan Vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vegan-vitamins', },
            { name: '50+ Multivitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/50plus-multivitamins', },
            { name: 'Pregnancy Dupplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/pregnancysupplements', },
            { name: 'CBD', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/cannabidiol-cbd-oil', },
            { name: 'Beauty Supplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/beautysupplements', },
            { name: 'Men\'s Health Supplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/menshealth-supplements', },
          ],
        },
      ],
    },
    ],
  },

  // Wellness
  {
    name: 'Wellness',
    link: 'https://www.boots.com/wellness',
    hasSubmenu: true,
    children: [{
      name: 'All Wellness',
      allLink: true,
      link: 'https://www.boots.com/wellness',
      hasSubmenu: false,
    },
    {
      name: 'New In Wellness',
      link: 'https://www.boots.com/wellness/new-in-wellness',
      hasSubmenu: false,
    },
    {
      name: 'Immunity Protection',
      link: 'https://www.boots.com/wellness/immunity-protection',
      hasSubmenu: false,
    },
    {
      name: 'Wellness',
      link: 'https://www.boots.com/wellness',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [

            { name: 'Sleep', link: 'https://www.boots.com/wellness/sleep', },
            { name: 'Digestive Health', link: 'https://www.boots.com/wellness/digestive-health', },
            { name: 'Everyday Stress', link: 'https://www.boots.com/wellness/everyday-stress', },
            { name: 'Visit Lifestyle & Wellbeing', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing', },
            { name: 'Alternative Therapies', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/wellness-supplements', },
            { name: 'Diet & Weight Management', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/weightloss', },
            { name: 'Dental', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/bootsdental', },
            { name: 'Smoking Control', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/stopsmoking', },
            { name: 'Health Food', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/health-food', },
            { name: 'Fitness Equipment & Activity Trackers', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/fitness', },
            { name: 'Planning for a Baby', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/familyplanning', },
            { name: 'Sports Nutrition', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/sports-nutrition', },
            { name: 'Home & Pet Care', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/home-pet-care', },
          ],
        },
      ],
    },
    {
      name: 'Vitamins',
      link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Vitamin Selector', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vitamin-selector-tool', },
            { name: 'Multivitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/multivitamins', },
            { name: 'Immune Health', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/immunehealth', },
            { name: 'Baby & Child Vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/baby-child-vitamins', },
            { name: 'Hair Health Vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/hair-health-vitamins', },
            { name: 'Vegan Vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vegan-vitamins', },
            { name: '50+ Multivitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/50plus-multivitamins', },
            { name: 'Pregnancy Dupplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/pregnancysupplements', },
            { name: 'CBD', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/cannabidiol-cbd-oil', },
            { name: 'Beauty Supplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/beautysupplements', },
            { name: 'Men\'s Health Supplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/menshealth-supplements', },
          ],
        },
      ],
    },
    {
      name: 'Sexual Wellness',
      link: 'https://www.boots.com/wellness/condoms-sexual-health',
      hasSubmenu: false,
    },
    ],
  },

  // Electrical
  {
    name: 'Electrical',
    link: 'https://www.boots.com/electrical',
    hasSubmenu: true,
    children: [{
      name: 'All Electrical',
      allLink: true,
      link: 'https://www.boots.com/electrical',
      hasSubmenu: false,
    },
    {
      name: 'Electrial Offers',
      link: 'https://www.boots.com/electrical/electrical-offers',
      hasSubmenu: false,
    },
    {
      name: 'Electrial Dental',
      link: 'https://www.boots.com/electrical/electrical-dental/all-electrical-dental-',
      hasSubmenu: false,
    },
    {
      name: 'Hair Styling Tools',
      link: 'https://www.boots.com/electrical/hair-styling-tools',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Hair Curlers', link: 'https://www.boots.com/electrical/hair-styling-tools/hair-curlers', },
            { name: 'Hair Dryers', link: 'https://www.boots.com/electrical/hair-styling-tools/hair-dryers', },
            { name: 'Hair Straighteners', link: 'https://www.boots.com/electrical/hair-styling-tools/hair-straighteners', },
            { name: 'Hot Brushes', link: 'https://www.boots.com/electrical/hair-styling-tools/hot-brushes-air-stylers', },
            { name: 'Accessories & Spares', link: 'https://www.boots.com/electrical/hair-styling-tools/hair-tools-accessories-spares', },
          ],
        },
      ],
    },
    {
      name: 'Beauty Tools',
      link: 'https://www.boots.com/electrical/beauty-tools/all-electrical-beauty-tools',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Anti Ageing', link: 'https://www.boots.com/electrical/beauty-tools/anti-ageing', },
            { name: 'Facial Beauty', link: 'https://www.boots.com/electrical/beauty-tools/facial-beauty-tools', },
            { name: 'Facial Cleansing', link: 'https://www.boots.com/electrical/beauty-tools/facial-cleansing-brush', },
            { name: 'Manicure & Pedicure Tools', link: 'https://www.boots.com/electrical/beauty-tools/manicure-pedicure-tools', },
          ],
        },
      ],
    },
    {
      name: 'Female Hair Removal',
      link: 'https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Epilators', link: 'https://www.boots.com/electrical/female-hair-removal-tools/epilators', },
            { name: 'IPL Hair Removal', link: 'https://www.boots.com/electrical/female-hair-removal-tools/ipl-hair-removal', },
            { name: 'Lady Shavers', link: 'https://www.boots.com/electrical/female-hair-removal-tools/lady-shavers', },
            { name: 'Body & Face Trimmers', link: 'https://www.boots.com/electrical/female-hair-removal-tools/body-face-trimmers', },
            { name: 'Accessories & Spares', link: 'https://www.boots.com/electrical/female-hair-removal-tools/hair-removal-accessories-spares', },
          ],
        },
      ],
    },
    {
      name: 'Male Grooming',
      link: 'https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Shavers', link: 'https://www.boots.com/electrical/male-grooming-tools/shavers', },
            { name: 'Beard & Stubble Trimmers', link: 'https://www.boots.com/electrical/male-grooming-tools/beard-stubble-trimmers', },
            { name: 'Hair Clippers', link: 'https://www.boots.com/electrical/male-grooming-tools/mens-hair-clippers', },
            { name: 'Body Groomers', link: 'https://www.boots.com/electrical/male-grooming-tools/body-groomers', },
            { name: 'Nose & Ear Trimmers', link: 'https://www.boots.com/electrical/male-grooming-tools/nose-ear-trimmers', },
            { name: 'Accessories & Spares', link: 'https://www.boots.com/electrical/male-grooming-tools/male-grooming-accessories-spares', },
            { name: 'All Male Grooming', link: 'https://www.boots.com/electrical/male-grooming-tools/all-electrical-male-grooming', },
          ],
        },
      ],
    },
    ],
  },

  // Services
  {
    name: 'Services',
    link: 'https://www.boots.com/healthhub',
    hasSubmenu: true,
    children: [
      {
        name: 'Pharmacy Services',
        link: 'https://www.boots.com/electrical/hair-styling-tools',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Boots Online Pharmacy', link: 'https://www.boots.com/online/pharmacy/', },
              { name: 'Boots Online Doctor', link: 'https://onlinedoctor.boots.com/', },
              { name: 'Appointment Booking', link: 'https://www.boots.com/appointment-booking', },
              { name: 'COVID-19 Testing', link: 'https://www.boots.com/covid-19-testing', },
              { name: 'Winter Flu Jab Service', link: 'https://www.boots.com/flujab', },
              { name: 'Opticians', link: 'https://www.boots.com/opticians', },
              { name: 'Health &amp; Pharmacy', link: 'https://www.boots.com/healthhub', },
              { name: 'Hearingcare', link: 'https://www.boots.com/hearingcare', },
            ],
          },
        ],
      },
      {
        name: 'Online Doctor',
        link: 'https://www.boots.com/electrical/beauty-tools/all-electrical-beauty-tools',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Boots Online Doctor', link: 'https://onlinedoctor.boots.com/', },
              { name: 'Mens Health', link: 'https://onlinedoctor.boots.com/mens-health', },
              { name: 'Womens Health', link: 'https://onlinedoctor.boots.com/womens-health', },
              { name: 'General Health', link: 'https://onlinedoctor.boots.com/general-health', },
              { name: 'Acne & Skin Conditions', link: 'https://onlinedoctor.boots.com/acne-skin-conditions', },
              { name: 'Sexual Health', link: 'https://onlinedoctor.boots.com/sexual-health', },
              { name: 'Testing Services', link: 'https://onlinedoctor.boots.com/home-testing-kits', },
            ],
          },
        ],
      },
      {
        name: 'Photo',
        link: 'https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Visit Photo Services', link: 'https://www.boots.com/photo', },
              { name: 'Photo Offers', link: 'https://www.boots.com/photo/photo-offers', },
              { name: 'Photo Printing', link: 'https://www.boots.com/photo/photo-printing', },
              { name: 'Albums & Frames', link: 'https://www.boots.com/photo/photo-albums-frames', },
              { name: 'Audio & Visual Tech', link: 'https://www.boots.com/photo/headphones-cameras-accessories', },
              { name: 'Novelty Photo Gifts', link: 'https://www.boots.com/photo/novelty-photo-gifts', },
            ],
          },
        ],
      },
      {
        name: 'Opticians',
        link: 'https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Book an Eye Test', link: 'https://www.boots.com/opticians/eyetest', },
              { name: 'Opticians Offers', link: 'https://www.boots.com/opticians/opticians-offers', },
              { name: 'Glasses Frames', link: 'https://www.boots.com/opticians/glasses', },
              { name: 'Glasses Lenses', link: 'https://www.boots.com/opticians/prescription-lenses', },
              { name: 'Contact Lenses', link: 'https://www.boots.com/opticians/contactlenses', },
              { name: 'Hearingcare', link: 'https://www.boots.com/opticians/hearingcare', },
            ],
          },
        ],
      },
    ],
  },

  // Offers
  {
    name: 'Offers',
    link: 'https://www.boots.com/offers',
    hasSubmenu: true,
    children: [{
      name: 'All Offers',
      allLink: true,
      link: 'https://www.boots.com/offers',
      hasSubmenu: false,
    },
    {
      name: 'Clearance',
      link: 'https://www.boots.com/all-clearance',
      hasSubmenu: false,
    },
    {
      name: 'Value Packs & Bundles',
      link: 'https://www.boots.com/value-packs-and-bundles',
      hasSubmenu: false,
    },
    {
      name: 'Great New Price',
      link: 'https://www.boots.com/great-new-price',
      hasSubmenu: false,
    },
    {
      name: 'Sale',
      link: 'https://www.boots.com/great-new-price',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Visit Sale', link: 'https://www.boots.com/sale', },
            { name: 'Gift Sale', link: 'https://www.boots.com/sale/christmas-gift-sale', },
            { name: 'Fragrance Sale', link: 'https://www.boots.com/sale/fragrance-sale', },
            { name: 'Luxury Beauty Sale', link: 'https://www.boots.com/sale/luxury-beauty-sale', },
            { name: 'Baby Sale', link: 'https://www.boots.com/sale/baby-child-sale', },
          ],
        },
      ],
    },
    {
      name: 'Savings',
      link: 'https://www.boots.com/electrical/beauty-tools/all-electrical-beauty-tools',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'All Savings', link: 'https://www.boots.com/savings', },
            { name: 'Beauty Savings', link: 'https://www.boots.com/savings/beauty-savings', },
            { name: 'Electrial Savings', link: 'https://www.boots.com/savings/electrical-beauty-savings', },
            { name: 'Fragrance Savings', link: 'https://www.boots.com/savings/fragrance-savings', },
            { name: 'No7 Savings', link: 'https://www.boots.com/savings/no7-savings', },
            { name: 'Baby & Child Savings', link: 'https://www.boots.com/savings/baby-and-child-savings', },
            { name: 'Healthcare Savings', link: 'https://www.boots.com/savings/healthcare-savings', },
            { name: 'Skincare Savings', link: 'https://www.boots.com/savings/skincare-savings', },
            { name: 'Toiletries Savings', link: 'https://www.boots.com/savings/toiletries-and-haircare-savings', },
          ],
        },
      ],
    },
    ],
  },

  // Mens
  {
    name: 'Men\'s',
    link: 'https://www.boots.com/mens',
    hasSubmenu: true,
    children: [
      {
        name: 'Shaving',
        link: 'https://www.boots.com/electrical/hair-styling-tools',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Shaving & Grooming', link: 'https://www.boots.com/mens/shaving-grooming', },
              { name: 'Beard Care', link: 'https://www.boots.com/mens/shaving-grooming/beardcare', },
              { name: 'Post Shave', link: 'https://www.boots.com/mens/shaving-grooming/post-shave', },
              { name: 'Razor Blades', link: 'https://www.boots.com/mens/shaving-grooming/mens-razor-blades', },
              { name: 'Razors', link: 'https://www.boots.com/mens/shaving-grooming/mens-razors', },
              { name: 'Shaving Brushes', link: 'https://www.boots.com/mens/shaving-grooming/shaving-brushes', },
              { name: 'Shaving Foams & Pre-shaves', link: 'https://www.boots.com/mens/shaving-grooming/shaving-foams-pre-shave', },
            ],
          },
        ],
      },
      {
        name: 'Aftershave',
        link: 'https://www.boots.com/mens/aftershave',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Aftershave', link: 'https://www.boots.com/mens/aftershave', },
              { name: 'Visit Aftershave', link: 'https://www.boots.com/mens/aftershave/mens-aftershave', },
              { name: 'Aftershave Gift Sets', link: 'https://www.boots.com/mens/aftershave/aftershave-gift-sets', },
              { name: 'Cologne', link: 'https://www.boots.com/mens/aftershave/cologne', },
              { name: 'Fragrance Bath & Shower', link: 'https://www.boots.com/mens/aftershave/fragrance-bath-shower', },
            ],
          },
        ],
      },
      {
        name: 'Toiletries',
        link: 'https://www.boots.com/mens/mens-toiletries',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Men\'s Toiletries', link: 'https://www.boots.com/mens/mens-toiletries', },
              { name: 'Visit Men\'s Toiletries', link: 'https://www.boots.com/mens/mens-toiletries', },
              { name: 'Men\'s Skincare & Body', link: 'https://www.boots.com/mens/mens-toiletries/skincare-body', },
              { name: 'Washing & Bathing', link: 'https://www.boots.com/mens/mens-toiletries/mens-washing-bathing', },
              { name: 'Men\'s Hair', link: 'https://www.boots.com/mens/mens-toiletries/mens-hair', },
              { name: 'Male Incontinence', link: 'https://www.boots.com/mens/mens-toiletries/male-incontinence', },
              { name: 'Hair Loss', link: 'https://www.boots.com/mens/mens-toiletries/mens-hair-loss', },
              { name: 'Men\'s Gift Sets', link: 'https://www.boots.com/mens/mens-toiletries/mens-gift-sets', },
            ],
          },
        ],
      },
      {
        name: 'Opticians',
        link: 'https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Book an Eye Test', link: 'https://www.boots.com/opticians/eyetest', },
              { name: 'Opticians Offers', link: 'https://www.boots.com/opticians/opticians-offers', },
              { name: 'Glasses Frames', link: 'https://www.boots.com/opticians/glasses', },
              { name: 'Glasses Lenses', link: 'https://www.boots.com/opticians/prescription-lenses', },
              { name: 'Contact Lenses', link: 'https://www.boots.com/opticians/contactlenses', },
              { name: 'Hearingcare', link: 'https://www.boots.com/opticians/hearingcare', },
            ],
          },
        ],
      },
    ],
  },

    

    // {
    //   name: 'Help',
    //   link: 'https://www.boots.com/advantage-card',
    //   hasSubmenu: false,
    //   desktop: false,
    //   icon: 'https://boots.scene7.com/is/image/Boots/Help-1?scl=1&fmt=png-alpha',
    //   noneCat: true,
    // },
    // {
    //   name: '',
    //   hasSubmenu: false,
    //   desktop: false,
    //   noneCat: true,
    //   currency: true,
    // },
  ]
}

// more nav
const mobileV1Data = () => {
  return [
    // Brands
    {
      name: 'Brand A-Z',
      regex: '/brands',
      link: 'https://www.boots.com/brands',
      hasSubmenu: false,
      allBrands: true,
    },
    // Gifts
    {
      name: 'Gifts',
      link: 'https://www.boots.com/gift',
      hasSubmenu: true,
      children: [{
        name: 'Visit Gifts',
        allLink: true,
        link: 'https://www.boots.com/gift',
        hasSubmenu: false,
      },
      {
        name: 'Gifts for Her',
        link: 'https://www.boots.com/gift/her',
        hasSubmenu: false,
      },
      {
        name: 'Gifts for Him',
        link: 'https://www.boots.com/gift/him',
        hasSubmenu: false,
      },
      {
        name: 'Candles & Home Fragrance',
        link: 'https://www.boots.com/gift/candles-home-fragrance-for-her',
        hasSubmenu: false,
      },
      {
        name: 'Gift Experience',
        link: 'https://www.boots.com/gift/experience-days',
        hasSubmenu: false,
      },
      {
        name: 'Personalised Photo',
        link: 'https://www.bootsphoto.com/',
        hasSubmenu: false,
      },
      {
        name: 'Personalised Gifts',
        link: 'https://www.boots.com/gift/personalised-gifts',
        hasSubmenu: false,
      },
      {
        name: 'Gift Cards',
        link: 'https://www.boots.com/gift/gift-cards',
        hasSubmenu: false,
      },
      ],
    },
    // No7
    {
      name: 'No7',
      link: 'https://www.boots.com/no7',
      hasSubmenu: true,
      children: [{
        name: 'All No7',
        allLink: true,
        link: 'https://www.boots.com/no7',
        hasSubmenu: false,
      },
      { name: 'Best Sellers', link: 'https://www.boots.com/no7/no7-bestsellers', hasSubmenu: false, },
      { name: 'New In', link: 'https://www.boots.com/no7/no7-new', hasSubmenu: false, },
      { name: 'Shop All', link: 'https://www.boots.com/no7/no7-shop-all', hasSubmenu: false, },
      { name: 'Accessories', link: 'https://www.boots.com/no7-make-up-accessories', hasSubmenu: false, },
      { name: 'Gifts', link: 'https://www.boots.com/no7-gifts', hasSubmenu: false, },
      { name: 'Clearance', link: 'https://www.boots.com/no7-clearance-range', hasSubmenu: false, },
      {
        name: 'Skincare',
        link: 'https://www.boots.com/no7-skincare',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'All Skincare', link: 'https://www.boots.com/no7-skincare', },
              { name: 'Personalised Skin Analysis', link: 'https://www.boots.com/no7-skincare/no7-personalised-skin', },
              { name: 'Protect & Perfect', link: 'https://www.boots.com/no7-skincare/no7-skincare-protect-perfect', },
              { name: 'Lift & Luminate', link: 'https://www.boots.com/no7-skincare/no7-skincare-lift-luminate', },
              { name: 'Restore & Renew', link: 'https://www.boots.com/no7-skincare/no7-skincare-restore-renew', },
              { name: 'Laboratories', link: 'https://www.boots.com/no7-skincare/no7-laboratories', },
              { name: 'Retinol', link: 'https://www.boots.com/no7-skincare/no7-retinol-range', },
              { name: 'Anti-Ageing', link: 'https://www.boots.com/no7-skincare/no7-skincare-serums', },
            ],
          },
        ],
      },
      {
        name: 'Makeup',
        link: 'https://www.boots.com/no7-makeup',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Shop All', link: 'https://www.boots.com/no7-make-up/no7-shop-all-make-up', },
              { name: 'Foundation', link: 'https://www.boots.com/no7-make-up/no7-foundation-range', },
              { name: 'Face', link: 'https://www.boots.com/no7-make-up/no7-make-up-face', },
              { name: 'Eyes', link: 'https://www.boots.com/no7-make-up/no7-make-up-eyes', },
              { name: 'Lips', link: 'https://www.boots.com/no7-make-up/no7-make-up-lips', },
              { name: 'Nails', link: 'https://www.boots.com/no7-make-up/no7-make-up-nails', },
              { name: 'Mascara', link: 'https://www.boots.com/no7-make-up/no7-mascaras', },
              { name: 'Brows', link: 'https://www.boots.com/no7-make-up/no7-make-up-brows', },
            ],
          },
        ],
      },
      {
        name: 'Mens',
        link: 'https://www.boots.com/no7-mens',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Shop All', link: 'https://www.boots.com/no7-mens', },
              { name: 'Anti-Ageing', link: 'https://www.boots.com/no7-mens/no7-mens-anti-ageing', },
              { name: 'Men\'s Wash', link: 'https://www.boots.com/no7-mens/no7-mens-wash', },
              { name: 'Shave', link: 'https://www.boots.com/no7-mens/no7-mens-shave', },
              { name: 'Moisturiser', link: 'https://www.boots.com/no7-mens/no7-mens-moisturise', },
            ],
          },
        ],
      },
      ],
    },
    // Vegan
    {
      name: 'Vegan',
      link: 'https://www.boots.com/vegan-hub',
      hasSubmenu: false,
      allBrands: false,
    },
    // Sun
    {
      name: 'Sun & Holiday',
      link: 'https://www.boots.com/holidays',
      hasSubmenu: true,
      children: [{
        name: 'All Sun & Holiday',
        allLink: true,
        link: 'https://www.boots.com/holidays',
        hasSubmenu: false,
      },
      {
        name: 'Travel Toiletries',
        link: 'https://www.boots.com/holidays/travel-toiletries',
        hasSubmenu: false,
      },
      {
        name: 'Suncare',
        link: 'https://www.boots.com/holidays/suncare',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'All Suncare', link: 'https://www.boots.com/holidays/suncare', },
              { name: 'Sun Cream', link: 'https://www.boots.com/holidays/suncare/sunprotection', },
              { name: 'Kids Sun Protection', link: 'https://www.boots.com/holidays/suncare/kids-sun-protection', },
              { name: 'Face Sun Protection', link: 'https://www.boots.com/holidays/suncare/face-sun-protection', },
              { name: 'Expert Sun Protection', link: 'https://www.boots.com/holidays/suncare/expert-skin-sun-protection', },
              { name: 'After Sun', link: 'https://www.boots.com/holidays/suncare/after-sun', },
            ],
          },
        ],
      },
      {
        name: 'Fake & Gradual Tan',
        link: 'https://www.boots.com/holidays/suncare',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Shop All', link: 'https://www.boots.com/holidays/fake-gradual-tan', },
              { name: 'Fake & Gradual Tan', link: 'https://www.boots.com/holidays/fake-gradual-tan/fake-and-gradual-tan-all', },
              { name: 'Bronzer', link: 'https://www.boots.com/holidays/fake-gradual-tan/self-tan-bronzer', },
              { name: 'Gradual Tan', link: 'https://www.boots.com/holidays/fake-gradual-tan/self-tan-gradual-tan', },
              { name: 'Instant Tan', link: 'https://www.boots.com/holidays/fake-gradual-tan/self-tan-instant-tan', },
              { name: 'Prep & Maintain', link: 'https://www.boots.com/holidays/fake-gradual-tan/self-tan-prep-and-maintain', },
              { name: 'Self Tan', link: 'https://www.boots.com/holidays/fake-gradual-tan/self-tan-lotions', },
            ],
          },
        ],
      },
      {
        name: 'Travel',
        link: 'https://www.boots.com/holidays/suncare',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Travel Toiletries', link: 'https://www.boots.com/holidays/travel-toiletries', },
              { name: 'Travel Health', link: 'https://www.boots.com/holidays/travel-health', },
              { name: 'Travel Essentails', link: 'https://www.boots.com/holidays/travel-essentials', },
              { name: 'Kids Travel', link: 'https://www.boots.com/holidays/kids-travel', },
              { name: 'Sunglasses', link: 'https://www.boots.com/holidays/sunglasses', },
            ],
          },
        ],
      },
      ],
    },
    // Photo
    {
      name: 'Photo',
      link: 'https://www.boots.com/photo',
      hasSubmenu: true,
      children: [{
        name: 'All Photo',
        allLink: true,
        link: 'https://www.boots.com/photo',
        hasSubmenu: false,
      },
      {
        name: 'Photo Offers',
        link: 'https://www.boots.com/photo-offers',
        hasSubmenu: false,
      },
      {
        name: 'Photo Printing',
        link: 'https://www.boots.com/photo/photo-printing',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Photo Printing', link: 'https://www.boots.com/photo/photo-printing', },
              { name: 'Photo Books', link: 'https://www.bootsphoto.com/photo-books.html', },
              { name: 'Canvas Prints', link: 'https://www.bootsphoto.com/wall-art/canvas-prints.html', },
              { name: 'Photo Cushions', link: 'https://www.bootsphoto.com/photo-gifts/premium-cushion.html', },
              { name: 'Photo Gifts', link: 'https://www.bootsphoto.com/photo-gifts.html', },
              { name: 'Greeting Cards', link: 'https://www.bootsphoto.com/greeting-cards.html', },
            ],
          },
        ],
      },
      {
        name: 'Albums & Frames',
        link: 'https://www.boots.com/photo/photo-albums-frames',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Shop All', link: 'https://www.boots.com/holidays/fake-gradual-tan', },
              { name: 'Albums & Frames', link: 'https://www.boots.com/photo/photo-albums-frames', },
              { name: 'All Frames', link: 'https://www.boots.com/photo/photo-albums-frames/frames-photo', },
              { name: 'All Albums', link: 'https://www.boots.com/photo/photo-albums-frames/photo-albums-range', },
              { name: 'Gradual Tan', link: 'https://www.boots.com/holidays/fake-gradual-tan/self-tan-gradual-tan', },
              { name: 'Instant Tan', link: 'https://www.boots.com/holidays/fake-gradual-tan/self-tan-instant-tan', },
              { name: 'Prep & Maintain', link: 'https://www.boots.com/holidays/fake-gradual-tan/self-tan-prep-and-maintain', },
              { name: 'Self Tan', link: 'https://www.boots.com/holidays/fake-gradual-tan/self-tan-lotions', },
            ],
          },
        ],
      },
      {
        name: 'Audio & Visual',
        link: 'https://www.boots.com/photo/headphones-cameras-accessories',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Audio & Visual', link: 'https://www.boots.com/photo/headphones-cameras-accessories', },
              { name: 'Cameras', link: 'https://www.boots.com/photo/headphones-cameras-accessories/cameras', },
              { name: 'Headphones', link: 'https://www.boots.com/photo/headphones-cameras-accessories/headphones-earphones-speakers', },
              { name: 'Batteries', link: 'https://www.boots.com/photo/headphones-cameras-accessories/batteries', },
              { name: 'Phone & Tablet Accessories', link: 'https://www.boots.com/photo/headphones-cameras-accessories/phone-tablet-accessories', },
            ],
          },
        ],
      },
      ],
    },
    // Opticians
    {
      name: 'Opticians',
      link: 'https://www.boots.com/opticians',
      hasSubmenu: true,
      children: [{
        name: 'All Opticians',
        allLink: true,
        link: 'https://www.boots.com/opticians',
        hasSubmenu: false,
      },
      {
        name: 'Offers',
        link: 'https://www.boots.com/opticians/opticians-offers',
        hasSubmenu: false,
      },
      {
        name: 'Book an Eye Test',
        link: 'https://www.boots.com/opticians/eyetest',
        hasSubmenu: false,
      },
      {
        name: 'Glasses Frames',
        link: 'https://www.boots.com/opticians/glasses',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'All Frames', link: 'https://www.boots.com/opticians/glasses/all-frames-boots-opticians', },
              { name: 'Womens', link: 'https://www.boots.com/opticians/glasses/opticians-glasses-womens', },
              { name: 'Mens', link: 'https://www.boots.com/opticians/glasses/mens-glasses', },
              { name: 'Kids & Teens', link: 'https://www.boots.com/opticians/glasses/kids-teens-glasses', },
              { name: 'Ready Readers', link: 'https://www.boots.com/opticians/glasses/ready-readers', },
            ],
          },
        ],
      },
      {
        name: 'Contact Lenses',
        link: 'https://www.boots.com/opticians/contactlenses',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Buying Contact Lenses', link: 'https://www.boots.com/opticians/contactlenses/buying-contact-lenses-', },
              { name: 'Rewards Plan', link: 'https://www.boots.com/opticians/contactlenses/contact-lens-rewards-plan', },
              { name: 'Boots Contact Lenses', link: 'https://www.boots.com/opticians/contactlenses/contact-lenses-opticians-boots', },
              { name: 'Acuvue Lenses', link: 'https://www.boots.com/acuvue-contact-lenses', },
              { name: 'Cleaning Solution', link: 'https://www.boots.com/opticians/contactlenses/lens-cleaning-solutions', },
              { name: 'Prescription Lenses', link: 'https://www.boots.com/opticians/prescription-lenses', },
            ],
          },
        ],
      },
      {
        name: 'Prescription Sunglasses',
        link: 'https://www.boots.com/opticians/prescription-sunglasses',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'All Sunglasses', link: 'https://www.boots.com/opticians/prescription-sunglasses/all-sunglasses-boots-opticians', },
              { name: 'Womens', link: 'https://www.boots.com/opticians/prescription-sunglasses/womens-prescription-sunglasses', },
              { name: 'Men\'s', link: 'https://www.boots.com/opticians/prescription-sunglasses/mens-prescription-sunglasses', },
              { name: 'Kids & Teens', link: 'https://www.boots.com/opticians/prescription-sunglasses/kids-teens-prescription-sunglasses', },
              { name: 'Polaroid Sunglasses', link: 'https://www.boots.com/opticians/prescription-sunglasses/polaroid-sunglasses-', },
            ],
          },
        ],
      },
      ],
    },
    // New
    {
      name: 'New In',
      link: 'https://www.boots.com/new-to-boots',
      hasSubmenu: true,
      children: [
        { name: 'Visit New In', link: 'https://www.boots.com/new-to-boots', },
        { name: 'Beauty & Skincare', link: 'https://www.boots.com/new-to-boots/new-in-beauty-skincare', },
        { name: 'Fragrance', link: 'https://www.boots.com/new-to-boots/new-in-fragrance', },
        { name: 'Premium Beauty & Skincare', link: 'https://www.boots.com/new-to-boots/new-in-luxury--1', },
        { name: 'Baby & Child', link: 'https://www.boots.com/new-to-boots/new-in-baby-child', },
        { name: 'Baby & Kids Clothes', link: 'https://www.boots.com/new-to-boots/new-clothing-collection', },
        { name: 'No7', link: 'https://www.boots.com/new-to-boots/no7-new', },
        { name: 'Hair', link: 'https://www.boots.com/new-to-boots/new-in-hair', },
        { name: 'Wellness', link: 'https://www.boots.com/new-to-boots/new-in-wellness', },
        { name: 'Electrial', link: 'https://www.boots.com/new-to-boots/new-in-electrical', },
        { name: 'Health', link: 'https://www.boots.com/new-to-boots/new-in-health', },
        { name: 'Footcare', link: 'https://www.boots.com/new-to-boots/new-in-footcare', },
        { name: 'Luxury Bath & Body', link: 'https://www.boots.com/new-to-boots/new-in-luxury-bath-body', },
        { name: 'Toiletries', link: 'https://www.boots.com/new-to-boots/new-in-toiletries', },
        { name: 'Diet & Weight Management', link: 'https://www.boots.com/new-to-boots/new-in-diet-and-weight-management', },
        { name: 'Photo', link: 'https://www.boots.com/new-to-boots/new-in-photo', },
      ],
    },
    // Inspire
    {
      name: 'Inspire Me',
      link: 'https://www.boots.com/health-and-beauty',
      hasSubmenu: false,
      allBrands: false,
    },
  ]
}

// more nav
const mobileV2Data = () => {
  return [
    // More
    {
      name: 'More...',
      hasSubmenu: true,
      children: [
        {
          name: 'Shop Categories',
          hasSubmenu: false,
          children: [
            {
              name: 'Shop by Product',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [
                { name: 'Brand A-Z', link: 'https://www.boots.com/brands', },
                { name: 'Vegan', link: 'https://www.boots.com/vegan-hub', },
                { name: 'New In', link: 'https://www.boots.com/new-to-boots', },
                { name: 'Inspiration', link: 'https://www.boots.com/health-and-beauty', },
                { name: 'All Sunglasses', link: 'https://www.boots.com/opticians/prescription-sunglasses/all-sunglasses-boots-opticians', },
              ],
            },
          ],
        },
        {
          name: 'No7',
          link: 'https://www.boots.com/no7',
          hasSubmenu: false,
          children: [
            {
              name: 'Shop by Product',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [
                { name: 'Best Sellers', link: 'https://www.boots.com/no7/no7-bestsellers', },
                { name: 'New In', link: 'https://www.boots.com/no7/no7-new', },
                { name: 'Shop All', link: 'https://www.boots.com/no7/no7-shop-all', },
                { name: 'Accessories', link: 'https://www.boots.com/no7-make-up-accessories', },
                { name: 'Gifts', link: 'https://www.boots.com/no7-gifts', },
                { name: 'Clearance', link: 'https://www.boots.com/no7-clearance-range', },
              ],
            },
          ],
        },
        {
          name: 'Gifts',
          hasSubmenu: false,
          children: [
            {
              name: 'Shop by Product',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [
                { name: 'Visit Gifts', link: 'https://www.boots.com/gift', },
                { name: 'Gifts for Her', link: 'https://www.boots.com/gift/her', },
                { name: 'Gifts for Him', link: 'https://www.boots.com/gift/him', },
                { name: 'Candles & Home Fragrance', link: 'https://www.boots.com/gift/candles-home-fragrance-for-her', },
                { name: 'Gift Experience', link: 'https://www.boots.com/gift/experience-days', },
              ],
            },
          ],
        },
        {
          name: 'Sun & Holiday',
          hasSubmenu: false,
          children: [
            {
              name: 'Shop by Product',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [
                { name: 'All Suncare', link: 'https://www.boots.com/holidays/suncare', },
                { name: 'Fake & Gradual Tan', link: 'https://www.boots.com/holidays/fake-gradual-tan', },
                { name: 'Travel Toiletries', link: 'https://www.boots.com/holidays/travel-toiletries', },
                { name: 'Value Packs & Bundles', link: 'https://www.boots.com/holidays/holiday-value-packs-and-bundles', },
                { name: 'Travel Toiletries', link: 'https://www.boots.com/holidays/travel-toiletries', },
              ],
            },
          ],
        },
        {
          name: 'Photo',
          hasSubmenu: false,
          children: [
            {
              name: 'Shop by Product',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [
                { name: 'All Photo', link: 'https://www.boots.com/photo', },
                { name: 'Photo Offers', link: 'https://www.boots.com/photo-offers', },
                { name: 'New In', link: 'https://www.boots.com/photo/new-in-photo', },
                { name: 'Photo Printing', link: 'https://www.boots.com/photo/photo-printing', },
                { name: 'Albums & Frames', link: 'https://www.boots.com/photo/photo-albums-frames', },
                { name: 'Audio & Visual', link: 'https://www.boots.com/photo/headphones-cameras-accessories', },
              ],
            },
          ],
        },
        {
          name: 'Opticians',
          hasSubmenu: false,
          children: [
            {
              name: 'Shop by Product',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [
                { name: 'All Opticians', link: 'https://www.boots.com/octicians', },
                { name: 'Offers', link: 'https://www.boots.com/opticians/opticians-offers', },
                { name: 'Glasses Frames', link: 'https://www.boots.com/opticians/glasses/all-frames-boots-opticians', },
                { name: 'Contact Lenses', link: 'https://www.boots.com/opticians/contactlenses', },
                { name: 'All Sunglasses', link: 'https://www.boots.com/opticians/prescription-sunglasses/all-sunglasses-boots-opticians', },
              ],
            },
          ],
        },
      ],
    },

  ]
}

// all mobile v5 data goes here
const mobileV5Data = (isLoggedIn) => {
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

  // Valentines
  {
    name: 'Valentines',
    link: 'https://www.boots.com/valentines',
    hasSubmenu: true,
    children: [{
      name: 'Shop All Valentines',
      allLink: true,
      link: 'https://www.boots.com/valentines',
      hasSubmenu: false,
    },
    {
      name: 'For Him',
      link: 'https://www.boots.com/valentines/valentines-day-gifts-for-him',
      hasSubmenu: false,
    },
    {
      name: 'For Her',
      link: 'https://www.boots.com/valentines/valentines-day-gifts-for-her',
      hasSubmenu: false,
    },
    {
      name: 'Shop by Category',
      //link: 'https://www.boots.com/christmas/all-christmas',
      hasSubmenu: false,
      children: [{
        name: 'Shop All Valentines',
        allLink: true,
        link: 'https://www.boots.com/valentines',
        hasSubmenu: false,
      },
      // categories
      {
        name: 'Shop by Category',
        hasSubmenu: true,
        heading: true,
        type: 'two-columns',
        children: [{
          name: 'Gift Sets',
          link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-gift',
        },
        {
          name: 'Perfume',
          link: 'https://www.boots.com/fragrance/perfume/all-perfume',
        },
        {
          name: 'Aftershave',
          link: 'https://www.boots.com/fragrance/aftershave/mens-aftershave',
        },
        {
          name: 'Luxury Bath',
          link: 'https://www.boots.com/toiletries/luxury-bath-body',
        },
        {
          name: 'Beauty',
          link: 'https://www.boots.com/beauty/luxury-beauty-skincare',
        },
        {
          name: 'Sexual Wellness',
          link: 'https://www.boots.com/wellness/condoms-sexual-health/sexual-pleasure-shop-all',
        },
        {
          name: 'Photo',
          link: 'https://www.boots.com/photo',
        },
        {
          name: 'Personalised Gifts',
          link: 'https://www.boots.com/gift/personalised-gifts/all-personalised-gifts',
        },
        {
          name: 'Candles',
          link: 'https://www.boots.com/gift/candles-home-fragrance-for-her',
        },
        {
          name: 'Electrical Styling',
          link: 'https://www.boots.com/electrical/hair-styling-tools/all-electrical-hair-styling-tools',
        },
        {
          name: 'Male Grooming',
          link: 'https://www.boots.com/mens/male-grooming-tools/all-electrical-male-grooming',
        },
        {
          name: 'No7',
          link: 'https://www.boots.com/no7/no7-shop-all',
        },
        ],
      },
      ],
    },
    ],
  },

  // Beauty
  {
    name: 'Beauty',
    link: 'https://www.boots.com/beauty',
    hasSubmenu: true,
    children: [{
      name: 'Visit Beauty',
      allLink: true,
      link: 'https://www.boots.com/beauty',
      hasSubmenu: false,
    },
    {
      name: 'New In Beauty',
      link: 'https://www.boots.com/new-to-boots/new-in-beauty-skincare',
      hasSubmenu: false,
    },
    {
      name: 'Beauty Offers',
      colour: '#b8237b',
      link: 'https://www.boots.com/beauty/beauty-skincare-offers',
      hasSubmenu: false,
    },
    {
      name: 'Makeup',
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
      name: 'Hair',
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
      name: 'Toiletries',
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
        name: "Bathroom Essentials",
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
        name: "Dental",
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
      name: 'Premium Beauty',
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
      name: 'Electrical Beauty',
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
          }, {
            name: 'electric toothbrushes',
            link: 'https://www.boots.com/electrical/electrical-dental/electric-toothbrushes',
          },
          {
            name: 'kids electric toothbrushes',
            link: 'https://www.boots.com/electrical/electrical-dental/kids-electric-toothbrushes',
          }, {
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
      name: 'Vegan Beauty',
      link: 'https://www.boots.com/beauty/vegan-range',
      hasSubmenu: false,
    },
    {
      name: 'Accessories',
      link: 'https://www.boots.com/beauty/beauty-accessories',
      hasSubmenu: false,
    },
    {
      name: 'Beauty Minis',
      link: 'https://www.boots.com/beauty/travel-beauty-minis',
      hasSubmenu: false,
    },
    {
      name: 'Skincare',
      link: 'https://www.boots.com/beauty/skincare',
      hasSubmenu: false,
    },
    {
      name: 'Beauty Inspiration',
      link: 'https://www.boots.com/skincare-beauty-advice',
      hasSubmenu: false,
    },
    ],
  },

  // Skincare
  {
    name: 'Skincare',
    link: 'https://www.boots.com/beauty/skincare',
    hasSubmenu: true,
    children: [{
      name: 'All Skincare',
      allLink: true,
      link: 'https://www.boots.com/beauty/skincare/skincare-all-skincare',
      hasSubmenu: false,
    },
    {
      name: 'Vegan Skincare',
      link: 'https://www.boots.com/beauty/skincare/vegan-skincare-products',
      hasSubmenu: false,
    },
    {
      name: 'Premium Skincare',
      link: 'https://www.boots.com/beauty/luxury-beauty-skincare/all-luxury-skincare',
      hasSubmenu: false,
    },
    {
      name: 'Men\'s Skincare & Body',
      link: 'https://www.boots.com/beauty/skincare/skincare-body',
      hasSubmenu: false,
    },
    {
      name: 'Facial Skincare',
      link: 'https://www.boots.com/beauty/skincare',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Moisturiser',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/moisturiser',
          },
          {
            name: 'Cleansers',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/cleanser-toner',
          },
          {
            name: 'Serums',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/serum-and-treatments',
          },
          {
            name: 'Face Masks',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/masks',
          },
          {
            name: 'Eye Cream',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/eye-cream',
          },
          {
            name: 'Makeup Remover',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/make-up-remover-',
          },
          {
            name: 'Skincare Tools',
            link: 'https://www.boots.com/beauty/skincare/facial-skincare/skincare-tools',
          },
          ],
        },
      ],
    },
    {
      name: 'Body Skincare',
      link: 'https://www.boots.com/beauty/skincare/body-skincare',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'All Body Skincare',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/skincare-all-body-skincare',
          },
          {
            name: 'Body Moisturiser',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/body-moisturiser',
          },
          {
            name: 'Neck & Chest Cream',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/neck-chest-cream',
          },
          {
            name: 'Body Scrub & Exfoliator',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/body-scrub-exfoliator',
          },
          {
            name: 'Foot Creams & Lotions',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/foot-creams-lotions',
          },
          {
            name: 'Hand Cream & Lotion',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/hand-cream-lotions',
          },
          {
            name: 'Body Butter',
            link: 'https://www.boots.com/toiletries/skincare/body-skincare/body-butter',
          },
          ],
        },
      ],
    },
    {
      name: 'Expert Skincare & Treatments',
      link: 'https://www.boots.com/beauty/skincare/expert-skincare-',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Shop Expert Skincare',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/beauty-expert-skincare-expert-skincare-shop-all',
          },
          {
            name: 'Expert Suncare',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/beauty-expert-skincare-expert-skincare-expert-suncare',
          },
          {
            name: 'Acne Prone Skin',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/acne-prone-skin',
          },
          {
            name: 'Anti-Redness',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/anti-redness',
          },
          {
            name: 'Pigmentation',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/pigmentation',
          },
          {
            name: 'Dry Skin',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/dry-skin-',
          },
          {
            name: 'Eczema Prone Skin',
            link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/eczema-prone-skin',
          },
          ],
        },
      ],
    },
    {
      name: 'Inspiration',
      link: 'https://www.boots.com/beauty/skincare',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Skincare Advice',
            link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice',
          },
          {
            name: 'Anti-ageing Advice',
            link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice/anti-ageing-advice',
          },
          {
            name: 'Face Masks Advice',
            link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice/face-masks-advice',
          },
          {
            name: 'Skin Concerns',
            link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice/skin-concerns',
          },
          {
            name: 'Skincare Basics',
            link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice/skincare-basics',
          },
          ],
        },
      ],
    },
    ],
  },

  // Health & Pharmacy
  {
    name: 'Health & Pharmacy',
    link: 'https://www.boots.com/health-pharmacy',
    hasSubmenu: true,
    children: [{
      name: 'Health & Pharmacy',
      allLink: true,
      link: 'https://www.boots.com/health-pharmacy',
      hasSubmenu: false,
    },
    {
      name: 'Health Offers',
      link: 'https://www.boots.com/health-pharmacy/health-offers',
      hasSubmenu: false,
    },
    {
      name: 'New in Health',
      link: 'https://www.boots.com/health-pharmacy/new-in-health',
      hasSubmenu: false,
    },
    {
      name: 'Online Pharmacy',
      link: 'https://www.boots.com/online/pharmacy/',
      hasSubmenu: false,
    },
    {
      name: 'Health Hub',
      link: 'https://www.boots.com/healthhub',
      hasSubmenu: false,
    },
    {
      name: 'Boots Online Doctor',
      link: 'https://onlinedoctor.boots.com/?utm_source=Boots&utm_medium=referral&utm_campaign=Boots_nav_Online_Doctor',
      hasSubmenu: false,
    },
    {
      name: 'Shop Health',
      link: 'https://www.boots.com/health-pharmacy',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Visit Women\'s Health', link: 'https://www.boots.com/health-pharmacy/womenshealth', },
            { name: 'Planning for a Baby', link: 'https://www.boots.com/health-pharmacy/womenshealth/familyplanning', },
            { name: 'Intimate Dryness', link: 'https://www.boots.com/health-pharmacy/womenshealth/intimate-dryness--1', },
            { name: 'Bacterial Vaginosis', link: 'https://www.boots.com/health-pharmacy/womenshealth/vaginitis', },
            { name: 'Female Incontinence', link: 'https://www.boots.com/health-pharmacy/womenshealth/female-incontinence', },
            { name: 'Feminine Wash & Wipes', link: 'https://www.boots.com/health-pharmacy/womenshealth/feminine-wash-wipes', },
            { name: 'Thrush', link: 'https://www.boots.com/health-pharmacy/womenshealth/thrush', },
            { name: 'Menopause', link: 'https://www.boots.com/health-pharmacy/womenshealth/menopause-support', },
            { name: 'Women\'s Health Supplements', link: 'https://www.boots.com/health-pharmacy/womenshealth/womenshealth-supplements', },
            { name: 'Morning After Pill', link: 'https://www.boots.com/health-pharmacy/womenshealth/morning-after-pill', },
            { name: 'Period Delay Online Clinic', link: 'https://www.boots.com/health-pharmacy/womenshealth/period-delay-clinic', },
            { name: 'Cystitis & Urinary Tract Infections', link: 'https://www.boots.com/health-pharmacy/womenshealth/cystitis-urinary-tract-infections', },
            { name: 'Hair Loss', link: 'https://www.boots.com/health-pharmacy/womenshealth/womens-hair-loss', },
            { name: 'Period Pain', link: 'https://www.boots.com/health-pharmacy/womenshealth/period-pain', },
            { name: 'Cervical Cancer Vaccination Service', link: 'https://www.boots.com/health-pharmacy/womenshealth/cervicalcancer', },
            { name: 'Alternative Therapy', link: 'https://www.boots.com/health-pharmacy/womenshealth/womens-alternative-therapy', },
          ],
        },
      ],
    },
    {
      name: 'Men\'s Health',
      link: 'https://www.boots.com/health-pharmacy/menshealth',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Visit Men\'s Health', link: 'https://www.boots.com/health-pharmacy/menshealth', },
            { name: 'Men\'s Sexual Health', link: 'https://www.boots.com/health-pharmacy/menshealth/mens-sexual-health', },
            { name: 'Male Incontinence', link: 'https://www.boots.com/health-pharmacy/menshealth/male-incontinence', },
            { name: 'Hair Loss', link: 'https://www.boots.com/health-pharmacy/menshealth/mens-hair-loss', },
            { name: 'Men\'s Health Supplements', link: 'https://www.boots.com/health-pharmacy/menshealth/menshealth-supplements', },
            { name: 'Jock Rash', link: 'https://www.boots.com/health-pharmacy/menshealth/jock-rash', },
          ],
        },
      ],
    },
    {
      name: 'Medicines & Treatments',
      link: 'https://www.boots.com/health-pharmacy/medicines-treatments',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Pain', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/painrelief', },
            { name: 'Eyecare', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/eye-care', },
            { name: 'Stomach & Bowel', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/digestion', },
            { name: 'Heartburn & Indigestion', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/heartburn-indigestion-', },
            { name: 'Footcare', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/footcare', },
            { name: 'Allergy & Hayfever', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/allergy-hayfever', },
            { name: 'Specialist Skincare', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/skin-problems', },
            { name: 'First Aid', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/first-aid', },
            { name: 'Cough, Cold & Flu', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/cold-flu-medication', },
            { name: 'Mouth & Oral Care', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/mouth-oral-care', },
            { name: 'Sleep', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/sleep', },
            { name: 'Earcare', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/ear-care', },
            { name: 'Hair Loss', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/mens-hair-loss', },
            { name: 'Diabetes', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/diabetes', },
            { name: 'Heart Health', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/healthyheart', },
            { name: 'Pharmacy Medicines', link: 'https://www.boots.com/health-pharmacy/pharmacy-medicines', },
          ],
        },
      ],
    },
    {
      name: 'Vitamins',
      link: 'https://www.boots.com/health-pharmacy/medicines-treatments',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Vitamin Selector', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vitamin-selector-tool', },
            { name: 'Multivitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/multivitamins', },
            { name: 'Immune Health', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/immunehealth', },
            { name: 'Baby & Child Vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/baby-child-vitamins', },
            { name: 'Hair Health Vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/hair-health-vitamins', },
            { name: 'Vegan Vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vegan-vitamins', },
            { name: '50+ Multivitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/50plus-multivitamins', },
            { name: 'Pregnancy Dupplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/pregnancysupplements', },
            { name: 'CBD', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/cannabidiol-cbd-oil', },
            { name: 'Beauty Supplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/beautysupplements', },
            { name: 'Men\'s Health Supplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/menshealth-supplements', },
          ],
        },
      ],
    },
    ],
  },
  // Toiletries
  {
    name: 'Toiletries',
    link: 'https://www.boots.com/toiletries',
    hasSubmenu: true,
    children: [{
      name: 'New In Toietries',
      allLink: true,
      link: 'https://www.boots.com/toiletries/new-in-toiletries',
      hasSubmenu: false,
    },
    {
      name: 'Toiletries Offers',
      link: 'https://www.boots.com/toiletries/toiletries-offers',
      hasSubmenu: false,
    },
    {
      name: 'Toiletries Value Packs & Bundles',
      link: 'https://www.boots.com/toiletries/toiletries-value-packs-and-bundles',
      hasSubmenu: false,
    },
    {
      name: 'Bathroom Essentials',
      link: 'https://www.boots.com/toiletries/washing-bathing',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'All Bathroom Essentials',
            link: 'https://www.boots.com/toiletries/washing-bathing',
          },
          {
            name: 'Shower Gels & Scrubs',
            link: 'https://www.boots.com/toiletries/washing-bathing/shower-gel',
          },
          {
            name: 'Soap & Hand Wash',
            link: 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash',
          },
          {
            name: 'Deodorants & Antiperspirants',
            link: 'https://www.boots.com/toiletries/deodorants-antiperspirants',
          },
          {
            name: 'Body Scrub',
            link: 'https://www.boots.com/toiletries/washing-bathing/body-scrub',
          },
          {
            name: 'Face Wash',
            link: 'https://www.boots.com/toiletries/washing-bathing/face-wash',
          },
          {
            name: 'Tissues, Wipes & Sanitisers',
            link: 'https://www.boots.com/toiletries/washing-bathing/tissues-wipes-sanitisers',
          },
          {
            name: 'Baby & Child Toiletries',
            link: 'https://www.boots.com/toiletries/washing-bathing/baby-child-toiletries',
          },
          {
            name: 'Bath Sets',
            link: 'https://www.boots.com/toiletries/washing-bathing/toiletries-bath-sets',
          },
          {
            name: 'Natural Toiletries',
            link: 'https://www.boots.com/toiletries/washing-bathing/natural-toiletries',
          },
          {
            name: 'Bath Accessories',
            link: 'https://www.boots.com/toiletries/washing-bathing/bath-accessories',
          },
          {
            name: 'Talcum Powder',
            link: 'https://www.boots.com/toiletries/washing-bathing/talcum-powder',
          },
          {
            name: 'Cotton Wool',
            link: 'https://www.boots.com/baby-child/bathing-changing/baby-cotton-wool',
          },
          ],
        },
      ],
    },
    {
      name: 'Dental',
      link: 'https://www.boots.com/toiletries/bootsdental',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Shop Dental',
            link: 'https://www.boots.com/toiletries/bootsdental',
          },
          {
            name: 'At Home Dentistry',
            link: 'https://www.boots.com/toiletries/bootsdental/at-home-dentistry',
          },
          {
            name: 'Mouthwash',
            link: 'https://www.boots.com/toiletries/bootsdental/mouthwash',
          },
          {
            name: 'Kids Dental',
            link: 'https://www.boots.com/toiletries/bootsdental/kids-dental',
          },
          {
            name: 'Oral Health',
            link: 'https://www.boots.com/toiletries/bootsdental/oral-health',
          },
          {
            name: 'Toothpaste',
            link: 'https://www.boots.com/toiletries/bootsdental/toothpaste',
          },
          {
            name: 'Electrical Dental',
            link: 'https://www.boots.com/toiletries/bootsdental/electrical-dental',
          },
          {
            name: 'Toothbrushes',
            link: 'https://www.boots.com/toiletries/bootsdental/toothbrushes',
          },
          ],
        },
      ],
    },

    {
      name: 'Men\'s Toiletries',
      link: 'https://www.boots.com/beauty/skincare',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Visit Men\'s Toiletries',
            link: 'https://www.boots.com/toiletries/mens-toiletries',
          },
          {
            name: 'Men\'s Value Packs',
            link: 'https://www.boots.com/toiletries/mens-toiletries/mens-value-packs-and-bundles',
          },
          {
            name: 'Washing & Bathing',
            link: 'https://www.boots.com/toiletries/mens-toiletries/mens-washing-bathing',
          },
          {
            name: 'Male Incontinence',
            link: 'https://www.boots.com/toiletries/mens-toiletries/male-incontinence',
          },
          ],
        },
      ],
    },
    ],
  },

  // Baby & Child
  {
    name: 'Baby & Child',

    link: 'https://www.boots.com/baby-child',
    hasSubmenu: true,
    children: [{
      name: 'Visit Baby & Child',
      allLink: true,
      link: 'https://www.boots.com/baby-child',
      hasSubmenu: false,
    },
    {
      name: 'Baby Value Packs and Bundles',
      link: 'https://www.boots.com/baby-child/baby-value-packs-and-bundles',
      hasSubmenu: false,
    },
    {
      name: 'Baby & Child Offers',
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
      name: 'Baby Event',
      link: 'https://www.boots.com/baby-child/baby-child-offers',
      hasSubmenu: false,
    },
    {
      name: 'Travel & Nursery',
      link: 'https://www.boots.com/baby-child/pushchairs-car-seats',
      hasSubmenu: false,
      children: [{
        name: 'All Travel',
        allLink: true,
        link: 'https://www.boots.com/baby-child/pushchairs-car-seats',
        hasSubmenu: false,
      },
      {
        name: 'All Nursery',
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
          name: 'Pushchairs, Strollers, Prams & Doubles',
          link: 'https://www.boots.com/baby-child/pushchairs-car-seats/pushchairs-strollers-prams-doubles',
        },
        {
          name: 'Car Seats & Accessories',
          link: 'https://www.boots.com/baby-child/pushchairs-car-seats/car-seats-accessories',
        },
        {
          name: 'Travel Systems',
          link: 'https://www.boots.com/baby-child/pushchairs-car-seats/travel-systems',
        },
        {
          name: 'Travel Accessories',
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
          name: 'Nursery Furniture',
          link: 'https://www.boots.com/baby-child/nursery-furniture/furniture-sets',
        },
        {
          name: 'Cots & Cot Beds',
          link: 'https://www.boots.com/baby-child/nursery-furniture/cots-cot-beds',
        },
        {
          name: 'Cribs & Moses Baskets',
          link: 'https://www.boots.com/baby-child/nursery-furniture/cribs-moses-baskets',
        },
        {
          name: 'Thermometers',
          link: 'https://www.boots.com/baby-child/nursery-furniture/thermometers',
        },
        {
          name: 'Baby Safety',
          link: 'https://www.boots.com/baby-child/nursery-furniture/baby-safety',
        },
        {
          name: 'Bedside Sleeping',
          link: 'https://www.boots.com/baby-child/nursery-furniture/bedside-sleeping',
        },
        {
          name: 'Mobiles & Night Lights',
          link: 'https://www.boots.com/baby-child/nursery-furniture/mobiles-night-lights',
        },
        {
          name: 'Baby Monitors',
          link: 'https://www.boots.com/baby-child/nursery-furniture/baby-monitors',
        },
        {
          name: 'Bedding',
          link: 'https://www.boots.com/baby-child/nursery-furniture/baby-bedding',
        },
        {
          name: 'Bouncers, Swings & Play Gyms',
          link: 'https://www.boots.com/baby-child/nursery-furniture/bouncers-swings-play-gyms',
        },
        ],
      },
      ],
    },
    {
      name: 'Clothing',
      link: 'https://www.boots.com/baby-child/mothercare-clothing',
      hasSubmenu: false,
      children: [{
        name: 'All Clothing',
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
          name: 'Shop All Baby & Kids Clothing',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/shop-all-baby-kids-clothing',
        },
        {
          name: 'New In Baby & Kids Clothes',
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
          name: 'Baby Clothes 0-24 Months',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months',
        },
        {
          name: 'Girls Clothes 9 months - 6 Years',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-girls-clothes-9-months-6-years',
        },
        {
          name: 'Boys Clothes 9 months - 6 Years',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-boys-clothes-9-months-6-years',
        },
        {
          name: 'Nightwear & Underwear',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-nightwear-underwear',
        },
        {
          name: 'Maternity Bras',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-maternity-bras',
        },
        {
          name: 'Premature Baby Range',
          link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-premature-baby-range',
        },
        ],
      },
      ],
    },
    {
      name: 'Feeding',
      link: 'https://www.boots.com/baby-child/babyfeeding',
      hasSubmenu: false,
      children: [{
        name: 'All Feeding',
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
          name: 'Baby Value Packs & Bundles',
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
          name: 'Baby Milk & Formula',
          link: 'https://www.boots.com/baby-child/babyfeeding/baby-milk-formula',
        },
        {
          name: 'Baby Food & Weaning',
          link: 'https://www.boots.com/baby-child/babyfeeding/baby-food-weaning',
        },
        {
          name: 'Breastfeeding',
          link: 'https://www.boots.com/baby-child/babyfeeding/breastfeeding-pumps',
        },
        {
          name: 'Toddler Food & Drink',
          link: 'https://www.boots.com/baby-child/babyfeeding/toddler-food-drink',
        },
        {
          name: 'Bottle Feeding',
          link: 'https://www.boots.com/baby-child/babyfeeding/baby-bottles-teats',
        },
        {
          name: 'Cups',
          link: 'https://www.boots.com/baby-child/babyfeeding/baby-cups',
        },
        {
          name: 'Soothers & Teethers',
          link: 'https://www.boots.com/baby-child/babyfeeding/soothers-teethers',
        },
        {
          name: 'Dinnerware',
          link: 'https://www.boots.com/baby-child/babyfeeding/child-dinnerware',
        },
        {
          name: 'Sterilising',
          link: 'https://www.boots.com/baby-child/babyfeeding/sterilising',
        },
        {
          name: 'Bibs & Muslins',
          link: 'https://www.boots.com/baby-child/babyfeeding/bibs-muslins',
        },
        {
          name: 'Highchairs & Booster Seats',
          link: 'https://www.boots.com/baby-child/babyfeeding/highchairs-booster-seats',
        },
        {
          name: 'Lunch Bags',
          link: 'https://www.boots.com/baby-child/babyfeeding/lunch-bags',
        },
        ],
      },
      ],
    },
    {
      name: 'Bathing & Changing',
      link: 'https://www.boots.com/baby-child/bathing-changing',
      hasSubmenu: false,
      children: [{
        name: 'All Bathing & Changing',
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
          name: 'Kids Dental',
          link: 'https://www.boots.com/baby-child/bathing-changing/kids-dental',
        },
        {
          name: 'Changing Bag Essentials',
          link: 'https://www.boots.com/baby-child/bathing-changing/changing-bag-essentials',
        },
        {
          name: 'Baby Value Packs & Bundles',
          link: 'https://www.boots.com/baby-child/bathing-changing/baby-value-packs-and-bundles',
        },
        {
          name: 'Baby & Child Toiletries',
          link: 'https://www.boots.com/baby-child/bathing-changing/baby-child-toiletries',
        },
        {
          name: 'Nappies',
          link: 'https://www.boots.com/baby-child/bathing-changing/nappies',
        },
        {
          name: 'Baby Baths & Accessories',
          link: 'https://www.boots.com/baby-child/bathing-changing/baby-baths-accessories',
        },
        {
          name: 'Baby Wipes',
          link: 'https://www.boots.com/baby-child/bathing-changing/baby-wipes',
        },
        {
          name: 'Changing Bags & Mats',
          link: 'https://www.boots.com/baby-child/bathing-changing/changing-bags-mats',
        },
        {
          name: 'Potty Training',
          link: 'https://www.boots.com/baby-child/bathing-changing/potty-training',
        },
        {
          name: 'Nappy Disposal',
          link: 'https://www.boots.com/baby-child/bathing-changing/nappy-disposal',
        },
        {
          name: 'Cotton Wool',
          link: 'https://www.boots.com/baby-child/bathing-changing/baby-cotton-wool',
        },
        ],
      },
      ],
    },
    {
      name: 'Pregnancy & Maternity',
      link: 'https://www.boots.com/baby-child/pregnancy-maternity',
      hasSubmenu: false,
      children: [{
        name: 'Visit Pregnancy & Maternity',
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
          name: 'All Premature Baby',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/all-premature-baby',
        },
        {
          name: 'Hospital Bag Essentials',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/hospital-bag-essentials',
        },
        {
          name: 'New Mum Toiletries',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/new-mum-toiletries',
        },
        {
          name: 'Maternity & Nursing Clothes',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/maternity-nursing-clothing',
        },
        {
          name: 'Pregnancy Tests',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-tests',
        },
        {
          name: 'Pregnancy Supplements',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/pregnancysupplements',
        },
        {
          name: 'Maternity TENs Machines',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/maternity-tens-machine',
        },
        {
          name: 'Pillows',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-maternity-pillows',
        },
        {
          name: 'Ovulation & Fertility Tests',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/ovulation-fertility-tests',
        },
        {
          name: 'Baby Shower Gifting',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity/gift-baby-shower',
        },
        ],
      },
      ],
    },
    {
      name: 'Baby & Child Health',
      link: 'https://www.boots.com/baby-child/baby-child-health',
      hasSubmenu: false,
      children: [{
        name: 'Visit Baby & Child Health',
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
          name: 'Baby & Child Vitamins',
          link: 'https://www.boots.com/baby-child/baby-child-health/baby-child-vitamins',
        },
        {
          name: 'Fever & Pain Relief',
          link: 'https://www.boots.com/baby-child/baby-child-health/fever-pain-relief',
        },
        {
          name: 'Cough, Cold & Flu',
          link: 'https://www.boots.com/baby-child/baby-child-health/child-cough-cold-flu',
        },
        {
          name: 'Skincare Conditions',
          link: 'https://www.boots.com/baby-child/baby-child-health/skincare-conditions',
        },
        {
          name: 'Teething',
          link: 'https://www.boots.com/baby-child/baby-child-health/teething',
        },
        {
          name: 'Allergy & Hayfever',
          link: 'https://www.boots.com/baby-child/baby-child-health/allergy-hayfever-children',
        },
        {
          name: 'First Aid',
          link: 'https://www.boots.com/baby-child/baby-child-health/child-first-aid',
        },
        {
          name: 'Nits, Lice & Worms',
          link: 'https://www.boots.com/baby-child/baby-child-health/nits-lice-worms',
        },
        {
          name: 'Colic Management',
          link: 'https://www.boots.com/baby-child/baby-child-health/colic',
        },
        ],
      },
      ],
    },
    {
      name: 'Toys',
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

  // Fragrance
  {
    name: 'Fragrance',
    link: 'https://www.boots.com/fragrance',
    hasSubmenu: true,
    children: [{
      name: 'Shop Fragrance',
      allLink: true,
      link: 'https://www.boots.com/fragrance',
      hasSubmenu: false,
    },
    {
      name: 'Fragrance Offers',
      link: 'https://www.boots.com/fragrance/fragrance-offers',
      hasSubmenu: false,
    },
    {
      name: 'Fragrance Exclusives',
      link: 'https://www.boots.com/fragrance/fragrance-exclusives',
      hasSubmenu: false,
    },
    {
      name: 'Vegan Fragrance',
      link: 'https://www.boots.com/fragrance/vegan-fragrances',
      hasSubmenu: false,
    },
    {
      name: 'Luxury Fragrance',
      link: 'https://www.boots.com/fragrance/luxury-fragrance',
      hasSubmenu: false,
    },
    {
      name: 'New in Fragrance',
      link: 'https://www.boots.com/fragrance/new-in-fragrance',
      hasSubmenu: false,
    },
    {
      name: 'Perfume',
      link: 'https://www.boots.com/fragrance/perfume',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Visit Perfume',
            link: 'https://www.boots.com/fragrance/perfume',
          },
          {
            name: 'All Perfume',
            link: 'https://www.boots.com/fragrance/perfume/all-perfume',
          },
          {
            name: 'Gift Sets',
            link: 'https://www.boots.com/fragrance/perfume/perfume-gift-sets',
          },
          {
            name: 'Body Mists',
            link: 'https://www.boots.com/fragrance/perfume/body-mists-',
          },
          ],
        },
      ],
    },
    {
      name: 'Aftershave',
      link: 'https://www.boots.com/fragrance/aftershave',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Visit Aftershave',
            link: 'https://www.boots.com/fragrance/aftershave',
          },
          {
            name: 'All Aftershave',
            link: 'https://www.boots.com/fragrance/aftershave/mens-aftershave',
          },
          {
            name: 'Aftershave Gift Sets',
            link: 'https://www.boots.com/fragrance/aftershave/aftershave-gift-sets',
          },
          {
            name: 'Cologne',
            link: 'https://www.boots.com/fragrance/aftershave/cologne',
          },
          {
            name: 'Fragrance Bath & Shower',
            link: 'https://www.boots.com/fragrance/aftershave/fragrance-bath-shower',
          },
          ],
        },
      ],
    },
    {
      name: 'Fragrance Gift Sets',
      link: 'https://www.boots.com/fragrance/fragrance-gift-sets',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [{
            name: 'Fragrance Gift Sets',
            link: 'https://www.boots.com/fragrance/fragrance-gift-sets',
          },
          {
            name: 'Gift Wrapped Sets',
            link: 'https://www.boots.com/fragrance/fragrance-gift-sets/gift-wrapped-sets',
          },
          {
            name: 'Perfume Gift Sets',
            link: 'https://www.boots.com/fragrance/fragrance-gift-sets/perfume-gift-sets',
          },
          {
            name: 'Aftershave Gift Sets',
            link: 'https://www.boots.com/fragrance/fragrance-gift-sets/aftershave-gift-sets',
          },
          ],
        },
      ],
    },
    ],
  },

  // Wellness
  {
    name: 'Wellness',
    link: 'https://www.boots.com/wellness',
    hasSubmenu: true,
    children: [{
      name: 'All Wellness',
      allLink: true,
      link: 'https://www.boots.com/wellness',
      hasSubmenu: false,
    },
    {
      name: 'New In Wellness',
      link: 'https://www.boots.com/wellness/new-in-wellness',
      hasSubmenu: false,
    },
    {
      name: 'Immunity Protection',
      link: 'https://www.boots.com/wellness/immunity-protection',
      hasSubmenu: false,
    },
    {
      name: 'Wellness',
      link: 'https://www.boots.com/wellness',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [

            { name: 'Sleep', link: 'https://www.boots.com/wellness/sleep', },
            { name: 'Digestive Health', link: 'https://www.boots.com/wellness/digestive-health', },
            { name: 'Everyday Stress', link: 'https://www.boots.com/wellness/everyday-stress', },
            { name: 'Visit Lifestyle & Wellbeing', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing', },
            { name: 'Alternative Therapies', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/wellness-supplements', },
            { name: 'Diet & Weight Management', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/weightloss', },
            { name: 'Dental', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/bootsdental', },
            { name: 'Smoking Control', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/stopsmoking', },
            { name: 'Health Food', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/health-food', },
            { name: 'Fitness Equipment & Activity Trackers', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/fitness', },
            { name: 'Planning for a Baby', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/familyplanning', },
            { name: 'Sports Nutrition', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/sports-nutrition', },
            { name: 'Home & Pet Care', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/home-pet-care', },
          ],
        },
      ],
    },
    {
      name: 'Vitamins',
      link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Vitamin Selector', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vitamin-selector-tool', },
            { name: 'Multivitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/multivitamins', },
            { name: 'Immune Health', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/immunehealth', },
            { name: 'Baby & Child Vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/baby-child-vitamins', },
            { name: 'Hair Health Vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/hair-health-vitamins', },
            { name: 'Vegan Vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vegan-vitamins', },
            { name: '50+ Multivitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/50plus-multivitamins', },
            { name: 'Pregnancy Dupplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/pregnancysupplements', },
            { name: 'CBD', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/cannabidiol-cbd-oil', },
            { name: 'Beauty Supplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/beautysupplements', },
            { name: 'Men\'s Health Supplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/menshealth-supplements', },
          ],
        },
      ],
    },
    {
      name: 'Sexual Wellness',
      link: 'https://www.boots.com/wellness/condoms-sexual-health',
      hasSubmenu: false,
    },
    ],
  },

  // Electrical
  {
    name: 'Electrical',
    link: 'https://www.boots.com/electrical',
    hasSubmenu: true,
    children: [{
      name: 'All Electrical',
      allLink: true,
      link: 'https://www.boots.com/electrical',
      hasSubmenu: false,
    },
    {
      name: 'Electrial Offers',
      link: 'https://www.boots.com/electrical/electrical-offers',
      hasSubmenu: false,
    },
    {
      name: 'Electrial Dental',
      link: 'https://www.boots.com/electrical/electrical-dental/all-electrical-dental-',
      hasSubmenu: false,
    },
    {
      name: 'Hair Styling Tools',
      link: 'https://www.boots.com/electrical/hair-styling-tools',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Hair Curlers', link: 'https://www.boots.com/electrical/hair-styling-tools/hair-curlers', },
            { name: 'Hair Dryers', link: 'https://www.boots.com/electrical/hair-styling-tools/hair-dryers', },
            { name: 'Hair Straighteners', link: 'https://www.boots.com/electrical/hair-styling-tools/hair-straighteners', },
            { name: 'Hot Brushes', link: 'https://www.boots.com/electrical/hair-styling-tools/hot-brushes-air-stylers', },
            { name: 'Accessories & Spares', link: 'https://www.boots.com/electrical/hair-styling-tools/hair-tools-accessories-spares', },
          ],
        },
      ],
    },
    {
      name: 'Beauty Tools',
      link: 'https://www.boots.com/electrical/beauty-tools/all-electrical-beauty-tools',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Anti Ageing', link: 'https://www.boots.com/electrical/beauty-tools/anti-ageing', },
            { name: 'Facial Beauty', link: 'https://www.boots.com/electrical/beauty-tools/facial-beauty-tools', },
            { name: 'Facial Cleansing', link: 'https://www.boots.com/electrical/beauty-tools/facial-cleansing-brush', },
            { name: 'Manicure & Pedicure Tools', link: 'https://www.boots.com/electrical/beauty-tools/manicure-pedicure-tools', },
          ],
        },
      ],
    },
    {
      name: 'Female Hair Removal',
      link: 'https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Epilators', link: 'https://www.boots.com/electrical/female-hair-removal-tools/epilators', },
            { name: 'IPL Hair Removal', link: 'https://www.boots.com/electrical/female-hair-removal-tools/ipl-hair-removal', },
            { name: 'Lady Shavers', link: 'https://www.boots.com/electrical/female-hair-removal-tools/lady-shavers', },
            { name: 'Body & Face Trimmers', link: 'https://www.boots.com/electrical/female-hair-removal-tools/body-face-trimmers', },
            { name: 'Accessories & Spares', link: 'https://www.boots.com/electrical/female-hair-removal-tools/hair-removal-accessories-spares', },
          ],
        },
      ],
    },
    {
      name: 'Male Grooming',
      link: 'https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Shavers', link: 'https://www.boots.com/electrical/male-grooming-tools/shavers', },
            { name: 'Beard & Stubble Trimmers', link: 'https://www.boots.com/electrical/male-grooming-tools/beard-stubble-trimmers', },
            { name: 'Hair Clippers', link: 'https://www.boots.com/electrical/male-grooming-tools/mens-hair-clippers', },
            { name: 'Body Groomers', link: 'https://www.boots.com/electrical/male-grooming-tools/body-groomers', },
            { name: 'Nose & Ear Trimmers', link: 'https://www.boots.com/electrical/male-grooming-tools/nose-ear-trimmers', },
            { name: 'Accessories & Spares', link: 'https://www.boots.com/electrical/male-grooming-tools/male-grooming-accessories-spares', },
            { name: 'All Male Grooming', link: 'https://www.boots.com/electrical/male-grooming-tools/all-electrical-male-grooming', },
          ],
        },
      ],
    },
    ],
  },

  // Gifts
  {
    name: 'Gifts',
    link: 'https://www.boots.com/gift',
    hasSubmenu: true,
    children: [{
      name: 'Visit Gifts',
      allLink: true,
      link: 'https://www.boots.com/gift',
      hasSubmenu: false,
    },
    {
      name: 'Gifts for Her',
      link: 'https://www.boots.com/gift/her',
      hasSubmenu: false,
    },
    {
      name: 'Gifts for Him',
      link: 'https://www.boots.com/gift/him',
      hasSubmenu: false,
    },
    {
      name: 'Candles & Home Fragrance',
      link: 'https://www.boots.com/gift/candles-home-fragrance-for-her',
      hasSubmenu: false,
    },
    {
      name: 'Gift Experience',
      link: 'https://www.boots.com/gift/experience-days',
      hasSubmenu: false,
    },
    {
      name: 'Personalised Photo',
      link: 'https://www.bootsphoto.com/',
      hasSubmenu: false,
    },
    {
      name: 'Personalised Gifts',
      link: 'https://www.boots.com/gift/personalised-gifts',
      hasSubmenu: false,
    },
    {
      name: 'Gift Cards',
      link: 'https://www.boots.com/gift/gift-cards',
      hasSubmenu: false,
    },
    ],
  },

  //Toys
  {
    name: 'Toys',
    link: 'https://www.boots.com/toys',
    hasSubmenu: false,
  },

  // Services
  {
    name: 'Services',
    link: 'https://www.boots.com/healthhub',
    hasSubmenu: true,
    children: [
      {
        name: 'Pharmacy Services',
        link: 'https://www.boots.com/electrical/hair-styling-tools',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Boots Online Pharmacy', link: 'https://www.boots.com/online/pharmacy/', },
              { name: 'Boots Online Doctor', link: 'https://onlinedoctor.boots.com/', },
              { name: 'Appointment Booking', link: 'https://www.boots.com/appointment-booking', },
              { name: 'COVID-19 Testing', link: 'https://www.boots.com/covid-19-testing', },
              { name: 'Winter Flu Jab Service', link: 'https://www.boots.com/flujab', },
              { name: 'Opticians', link: 'https://www.boots.com/opticians', },
              { name: 'Health &amp; Pharmacy', link: 'https://www.boots.com/healthhub', },
              { name: 'Hearingcare', link: 'https://www.boots.com/hearingcare', },
            ],
          },
        ],
      },
      {
        name: 'Online Doctor',
        link: 'https://www.boots.com/electrical/beauty-tools/all-electrical-beauty-tools',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Boots Online Doctor', link: 'https://onlinedoctor.boots.com/', },
              { name: 'Mens Health', link: 'https://onlinedoctor.boots.com/mens-health', },
              { name: 'Womens Health', link: 'https://onlinedoctor.boots.com/womens-health', },
              { name: 'General Health', link: 'https://onlinedoctor.boots.com/general-health', },
              { name: 'Acne & Skin Conditions', link: 'https://onlinedoctor.boots.com/acne-skin-conditions', },
              { name: 'Sexual Health', link: 'https://onlinedoctor.boots.com/sexual-health', },
              { name: 'Testing Services', link: 'https://onlinedoctor.boots.com/home-testing-kits', },
            ],
          },
        ],
      },
      {
        name: 'Photo',
        link: 'https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Visit Photo Services', link: 'https://www.boots.com/photo', },
              { name: 'Photo Offers', link: 'https://www.boots.com/photo/photo-offers', },
              { name: 'Photo Printing', link: 'https://www.boots.com/photo/photo-printing', },
              { name: 'Albums & Frames', link: 'https://www.boots.com/photo/photo-albums-frames', },
              { name: 'Audio & Visual Tech', link: 'https://www.boots.com/photo/headphones-cameras-accessories', },
              { name: 'Novelty Photo Gifts', link: 'https://www.boots.com/photo/novelty-photo-gifts', },
            ],
          },
        ],
      },
      {
        name: 'Opticians',
        link: 'https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-',
        hasSubmenu: false,
        children: [
          {
            name: 'Shop by Product',
            hasSubmenu: true,
            heading: true,
            type: 'two-columns',
            children: [
              { name: 'Book an Eye Test', link: 'https://www.boots.com/opticians/eyetest', },
              { name: 'Opticians Offers', link: 'https://www.boots.com/opticians/opticians-offers', },
              { name: 'Glasses Frames', link: 'https://www.boots.com/opticians/glasses', },
              { name: 'Glasses Lenses', link: 'https://www.boots.com/opticians/prescription-lenses', },
              { name: 'Contact Lenses', link: 'https://www.boots.com/opticians/contactlenses', },
              { name: 'Hearingcare', link: 'https://www.boots.com/opticians/hearingcare', },
            ],
          },
        ],
      },
    ],
  },

  // Deals
  {
    name: 'Deals',
    link: 'https://www.boots.com/offers',
    hasSubmenu: true,
    children: [{
      name: 'All Offers',
      allLink: true,
      link: 'https://www.boots.com/offers',
      hasSubmenu: false,
    },
    {
      name: 'Clearance',
      link: 'https://www.boots.com/all-clearance',
      hasSubmenu: false,
    },
    {
      name: 'Value Packs & Bundles',
      link: 'https://www.boots.com/value-packs-and-bundles',
      hasSubmenu: false,
    },
    {
      name: 'Great New Price',
      link: 'https://www.boots.com/great-new-price',
      hasSubmenu: false,
    },
    {
      name: 'Sale',
      link: 'https://www.boots.com/great-new-price',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'Visit Sale', link: 'https://www.boots.com/sale', },
            { name: 'Gift Sale', link: 'https://www.boots.com/sale/christmas-gift-sale', },
            { name: 'Fragrance Sale', link: 'https://www.boots.com/sale/fragrance-sale', },
            { name: 'Luxury Beauty Sale', link: 'https://www.boots.com/sale/luxury-beauty-sale', },
            { name: 'Baby Sale', link: 'https://www.boots.com/sale/baby-child-sale', },
          ],
        },
      ],
    },
    {
      name: 'Savings',
      link: 'https://www.boots.com/electrical/beauty-tools/all-electrical-beauty-tools',
      hasSubmenu: false,
      children: [
        {
          name: 'Shop by Product',
          hasSubmenu: true,
          heading: true,
          type: 'two-columns',
          children: [
            { name: 'All Savings', link: 'https://www.boots.com/savings', },
            { name: 'Beauty Savings', link: 'https://www.boots.com/savings/beauty-savings', },
            { name: 'Electrial Savings', link: 'https://www.boots.com/savings/electrical-beauty-savings', },
            { name: 'Fragrance Savings', link: 'https://www.boots.com/savings/fragrance-savings', },
            { name: 'No7 Savings', link: 'https://www.boots.com/savings/no7-savings', },
            { name: 'Baby & Child Savings', link: 'https://www.boots.com/savings/baby-and-child-savings', },
            { name: 'Healthcare Savings', link: 'https://www.boots.com/savings/healthcare-savings', },
            { name: 'Skincare Savings', link: 'https://www.boots.com/savings/skincare-savings', },
            { name: 'Toiletries Savings', link: 'https://www.boots.com/savings/toiletries-and-haircare-savings', },
          ],
        },
      ],
    },
    ],
  },

  // Brands
  {
    name: 'Brand A-Z',
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

// pharmacy nav data
export const mobilePharmacyData = () => {
  return [
    {
      name: 'Prescriptions',
      link: 'https://www.boots.com/prescription-support',
      hasSubmenu: false,
      allBrands: false,
    },
    // Online Doc
    {
      name: 'Online Doctor',
      link: 'https://onlinedoctor.boots.com/',
      hasSubmenu: true,
      children: [
        {
          name: 'Visit Online Doctor',
          link: 'https://onlinedoctor.boots.com/',
          hasSubmenu: false,
        },
        {
          name: 'Online Doctor Services',
          link: 'https://onlinedoctor.boots.com/',
          hasSubmenu: false,
          children: [
            {
              name: 'Shop by Product',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [
                { name: 'Boots Online Pharmacy', link: 'https://www.boots.com/online/pharmacy/', },
                { name: 'Boots Online Doctor', link: 'https://onlinedoctor.boots.com/', },
                { name: 'Appointment Booking', link: 'https://www.boots.com/appointment-booking', },
                { name: 'COVID-19 Testing', link: 'https://www.boots.com/covid-19-testing', },
                { name: 'Winter Flu Jab Service', link: 'https://www.boots.com/flujab', },
                { name: 'Opticians', link: 'https://www.boots.com/opticians', },
                { name: 'Health &amp; Pharmacy', link: 'https://www.boots.com/healthhub', },
                { name: 'Hearingcare', link: 'https://www.boots.com/hearingcare', },
              ],
            },
          ],
        },
      ],
    },
    // Health Hub
    {
      name: 'Health Hub',
      link: 'https://www.boots.com/online/pharmacy/',
      hasSubmenu: true,
      children: [
        {
          name: 'Visit Pharmacy Services',
          link: 'https://www.boots.com/online/pharmacy/',
          hasSubmenu: false,
        },
        {
          name: 'All Services',
          link: 'https://www.boots.com/online/pharmacy/',
          hasSubmenu: false,
          children: [
            {
              name: 'Shop by Product',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [
                { name: 'Health Hub', link: 'https://www.boots.com/healthhub', },
                { name: 'Appointment Booking', link: 'https://www.boots.com/appointment-booking', },
                { name: 'Boots Online Pharmacy', link: 'https://www.boots.com/online/pharmacy/', },
                { name: 'Boots Online Doctor', link: 'https://onlinedoctor.boots.com/', },
                { name: 'COVID-19 Testing', link: 'https://www.boots.com/covid-19-testing', },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'NHS Services',
      link: 'https://www.boots.com/nhs-services',
      hasSubmenu: false,
      allBrands: false,
    },
    {
      name: 'Vaccinations',
      link: 'https://www.boots.com/health-pharmacy-advice/vaccinations',
      hasSubmenu: false,
      allBrands: false,
    },
    {
      name: 'Managing Your Conditions',
      link: 'https://www.boots.com/managing-your-condition',
      hasSubmenu: false,
      allBrands: false,
    },
    {
      name: 'COVID-19 Testing',
      link: 'https://www.boots.com/covid-19-testing',
      hasSubmenu: false,
      allBrands: false,
    },
    // Opticians
    {
      name: 'Opticians',
      link: 'https://www.boots.com/opticians',
      hasSubmenu: true,
      children: [
        {
          name: 'Visit Boots Opticians',
          link: 'https://www.boots.com/opticians',
          hasSubmenu: false,
        },
        {
          name: 'Optician Services',
          link: 'https://onlinedoctor.boots.com/',
          hasSubmenu: false,
          children: [
            {
              name: 'Shop by Product',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [
                { name: 'Book an Eye Test', link: 'https://www.boots.com/opticians/eyetest', },
                { name: 'Opticians Offers', link: 'https://www.boots.com/opticians/opticians-offers', },
                { name: 'Glasses Frames', link: 'https://www.boots.com/opticians/glasses', },
                { name: 'Glasses Lenses', link: 'https://www.boots.com/opticians/prescription-lenses', },
                { name: 'Contact Lenses', link: 'https://www.boots.com/opticians/contactlenses', },
                { name: 'Hearingcare', link: 'https://www.boots.com/opticians/hearingcare', },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Hearingcare',
      link: 'https://www.boots.com/hearingcare',
      hasSubmenu: false,
      allBrands: false,
    },
    
  ]
}

// services nav data
export const mobileServicesData = () => {
  return [
    {
      name: 'Health Hub',
      link: 'https://www.boots.com/online/pharmacy/',
      hasSubmenu: true,
      children: [
        {
          name: 'Visit Pharmacy Services',
          link: 'https://www.boots.com/online/pharmacy/',
          hasSubmenu: false,
        },
        {
          name: 'All Services',
          link: 'https://www.boots.com/online/pharmacy/',
          hasSubmenu: false,
          children: [
            {
              name: 'Shop by Product',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [
                { name: 'Health Hub', link: 'https://www.boots.com/healthhub', },
                { name: 'Appointment Booking', link: 'https://www.boots.com/appointment-booking', },
                { name: 'Boots Online Pharmacy', link: 'https://www.boots.com/online/pharmacy/', },
                { name: 'Boots Online Doctor', link: 'https://onlinedoctor.boots.com/', },
                { name: 'COVID-19 Testing', link: 'https://www.boots.com/covid-19-testing', },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Prescriptions',
      link: 'https://www.boots.com/prescription-support',
      hasSubmenu: false,
      allBrands: false,
  },
      // Online Doc
      {
        name: 'Online Doctor',
        link: 'https://onlinedoctor.boots.com/',
        hasSubmenu: true,
        children: [
          {
            name: 'Visit Online Doctor',
            link: 'https://onlinedoctor.boots.com/',
            hasSubmenu: false,
          },
          {
            name: 'Online Doctor Services',
            link: 'https://onlinedoctor.boots.com/',
            hasSubmenu: false,
            children: [
              {
                name: 'Shop by Product',
                hasSubmenu: true,
                heading: true,
                type: 'two-columns',
                children: [
                  { name: 'Boots Online Pharmacy', link: 'https://www.boots.com/online/pharmacy/', },
                  { name: 'Boots Online Doctor', link: 'https://onlinedoctor.boots.com/', },
                  { name: 'Appointment Booking', link: 'https://www.boots.com/appointment-booking', },
                  { name: 'COVID-19 Testing', link: 'https://www.boots.com/covid-19-testing', },
                  { name: 'Winter Flu Jab Service', link: 'https://www.boots.com/flujab', },
                  { name: 'Opticians', link: 'https://www.boots.com/opticians', },
                  { name: 'Health &amp; Pharmacy', link: 'https://www.boots.com/healthhub', },
                  { name: 'Hearingcare', link: 'https://www.boots.com/hearingcare', },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'NHS Repeat Prescriptions',
        link: 'https://www.boots.com/online/pharmacy',
        hasSubmenu: false,
        allBrands: false,
    },
    {
      name: 'Vaccinations',
      link: 'https://www.boots.com/health-pharmacy-advice/vaccinations',
      hasSubmenu: false,
      allBrands: false,
    },
    // Opticians
    {
      name: 'Opticians',
      link: 'https://www.boots.com/opticians',
      hasSubmenu: true,
      children: [
        {
          name: 'Visit Boots Opticians',
          link: 'https://www.boots.com/opticians',
          hasSubmenu: false,
        },
        {
          name: 'Optician Services',
          link: 'https://onlinedoctor.boots.com/',
          hasSubmenu: false,
          children: [
            {
              name: 'Shop by Product',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [
                { name: 'Book an Eye Test', link: 'https://www.boots.com/opticians/eyetest', },
                { name: 'Opticians Offers', link: 'https://www.boots.com/opticians/opticians-offers', },
                { name: 'Glasses Frames', link: 'https://www.boots.com/opticians/glasses', },
                { name: 'Glasses Lenses', link: 'https://www.boots.com/opticians/prescription-lenses', },
                { name: 'Contact Lenses', link: 'https://www.boots.com/opticians/contactlenses', },
                { name: 'Hearingcare', link: 'https://www.boots.com/opticians/hearingcare', },
              ],
            },
          ],
        },
      ],
    },
    // Photo
    {
      name: 'Photo',
      link: 'https://www.boots.com/photo',
      hasSubmenu: true,
      children: [
        {
          name: 'Visit Photo',
          link: 'https://www.boots.com/photo',
          hasSubmenu: false,
        },
        {
          name: 'Photo Services',
          link: 'https://onlinedoctor.boots.com/',
          hasSubmenu: false,
          children: [
            {
              name: 'Shop by Product',
              hasSubmenu: true,
              heading: true,
              type: 'two-columns',
              children: [
                { name: 'Visit Photo Services', link: 'https://www.boots.com/photo', },
                { name: 'Photo Offers', link: 'https://www.boots.com/photo/photo-offers', },
                { name: 'Photo Printing', link: 'https://www.boots.com/photo/photo-printing', },
                { name: 'Albums & Frames', link: 'https://www.boots.com/photo/photo-albums-frames', },
                { name: 'Audio & Visual Tech', link: 'https://www.boots.com/photo/headphones-cameras-accessories', },
                { name: 'Novelty Photo Gifts', link: 'https://www.boots.com/photo/novelty-photo-gifts', },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'Hearingcare',
      link: 'https://www.boots.com/hearingcare',
      hasSubmenu: false,
      allBrands: false,
    },
    {
      name: 'COVID-19 Testing',
      link: 'https://www.boots.com/covid-19-testing',
      hasSubmenu: false,
      allBrands: false,
    },
  ]
}

let MobileData;

if (VARIATION === 'control' || VARIATION === '3' || VARIATION === '4') {
  MobileData = allMobileVariationData(window.userObj.isLoggedIn);
}

if (VARIATION === '1') {
  MobileData = allMobileVariationData(window.userObj.isLoggedIn).concat(mobileV1Data());
}

if (VARIATION === '2') {
  MobileData = allMobileVariationData(window.userObj.isLoggedIn).concat(mobileV2Data());
}

if (VARIATION === '5') {
  MobileData = mobileV5Data(window.userObj.isLoggedIn);
}

export { MobileData };
