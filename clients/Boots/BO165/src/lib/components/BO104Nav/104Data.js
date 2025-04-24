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

  // Christmas
  {
    name: 'Christmas',
    regex: '/christmas',
    link: 'https://www.boots.com/christmas',
    hasSubmenu: true,
    children: [
      // most wanted
      {
        name: 'Shop categories',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
                    { name: 'Visit Christmas', link: 'https://www.boots.com/christmas', },
                    { name: '3 for 2 mix and match', link: 'https://www.boots.com/christmas/christmas-3-for-2', },
                    { name: 'Shop all Christmas', link: 'https://www.boots.com/christmas/all-christmas', },
                    { name: 'Gifts for her', link: 'https://www.boots.com/christmas/gifts-for-her', },
                    { name: 'All gifts for her', link: 'https://www.boots.com/christmas/gifts-for-her/all-christmas-gifts-for-her', },
                    { name: 'Gifts for him', link: 'https://www.boots.com/christmas/gifts-for-him', },
                    { name: 'All gifts for him', link: 'https://www.boots.com/christmas/gifts-for-him/all-christmas-gifts-for-him', },
                    { name: 'Gifts for kids', link: 'https://www.boots.com/christmas/christmas-gifts-for-kids', },
                    { name: 'All gifts for kids', link: 'https://www.boots.com/christmas/christmas-gifts-for-kids/all-christmas-gifts-for-kids', },
        ],
      },
      // offers
      {
        name: 'Be inspired',
        hasSubmenu: true,
        type: 'list', // or bannerimages
        all: false,
        type: 'three-columns',
        children: 
        [
          { name: 'Gift ideas', link: 'https://www.boots.com/christmas/gift-by-type', },
          { name: 'Beauty gifts', link: 'https://www.boots.com/christmas/gift-by-type/beauty-gifts', },
          { name: 'Fragrance gift sets', link: 'https://www.boots.com/christmas/gift-by-type/fragrance-gift-sets', },
          { name: 'Toys', link: 'https://www.boots.com/christmas/gift-by-type/toys', },
          { name: 'New Christmas brands', link: 'https://www.boots.com/christmas/gift-by-type/new-christmas-brands', },
          { name: 'Home & lifestyle gifts', link: 'https://www.boots.com/christmas/gift-by-type/home-lifestyle', },
          { name: 'Food & drink gifts', link: 'https://www.boots.com/christmas/gift-by-type/gift-food-drink', },
          { name: 'Wellness gifts', link: 'https://www.boots.com/christmas/gift-by-type/wellness-gifts', },
          { name: 'Novelty & gadgets', link: 'https://www.boots.com/christmas/gift-by-type/novelty-gadgets', },
          { name: 'Christmas cards & wrapping', link: 'https://www.boots.com/christmas/gift-by-type/christmas-cards-wrapping', },
          { name: 'Games & puzzles', link: 'https://www.boots.com/christmas/gift-by-type/board-games-jigsaw-puzzles', },
          { name: 'Disney gifts', link: 'https://www.boots.com/christmas/gift-by-type/disney-gifts', },
          { name: 'Grooming & shaving gifts', link: 'https://www.boots.com/christmas/gift-by-type/male-grooming', },
          { name: 'Bath & body gifts', link: 'https://www.boots.com/christmas/gift-by-type/bath-body-christmas-gifts', },
          { name: 'Vegan gifts', link: 'https://www.boots.com/christmas/gift-by-type/vegan-gifts', },
          { name: 'Experience days', link: 'https://www.boots.com/christmas/gift-by-type/experience-days', },
          { name: 'Christmas hampers', link: 'https://www.boots.com/christmas/gift-by-type/christmas-hampers', },
          { name: 'Gift cards', link: 'https://www.boots.com/christmas/gift-by-type/gift-cards', },
          { name: 'Personalised photo gifts', link: 'https://www.boots.com/christmas/gift-by-type/personalised-photo-gifts', },
        ],
      },
      // shop by
      {
        name: 'Must haves',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Advent calendars', link: 'https://www.boots.com/christmas/advent-calendars', },
          { name: 'Shop all advent calenders', link: 'https://www.boots.com/christmas/advent-calendars/shop-all-advent-calendars', },
          { name: 'Star gifts', link: 'https://www.boots.com/christmas/christmas-weekly-offers', },
          { name: 'Stocking fillers', link: 'https://www.boots.com/christmas/stocking-fillers', },
        { name: '100 Best Christmas gift ideas 2021', link: 'https://www.boots.com/christmas/best-christmas-gifts', },
        { name: 'Secret Santa', link: 'https://www.boots.com/christmas/secret-santa', },
        { name: 'Gift finder', link: 'https://www.boots.com/christmas-gift-guide/gift-finder', },
        ],
      },
    ],
  },
  //black friday,
  {
    name: 'Black Friday',
    regex: '/black-friday',
    link: 'https://www.boots.com/black-friday',
    hasSubmenu: true,
  children: [
    // most wanted
    {
      name: 'Shop offers',
      hasSubmenu: true,
      all: false,
      type: 'one-column',
      children: 
      [
        {
          name: 'visit black friday',
          link: 'https://www.boots.com/black-friday',
        },
        {
          name: 'all black friday deals',
          link: 'https://www.boots.com/black-friday/all-blackfriday-deals',
        },
      ],
    },
    // offers
    {
      name: 'shop categories',
      hasSubmenu: true,
      type: 'list', // or bannerimages
      all: false,
      type: 'three-columns',
      children: 
      [
        {
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
  // Makeup
  {
    name: 'Makeup',
    regex: '/makeup',
    link: 'https://www.boots.com/beauty/makeup',
    hasSubmenu: true,
    children: [
      // most wanted
      {
        name: 'Most Wanted',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Vegan makeup', link: 'https://www.boots.com/beauty/makeup/vegan-makeup-products', },
          { name: 'Beauty gift sets', link: 'https://www.boots.com/beauty/makeup/make-up-gift-sets', },
          { name: 'Palettes', link: 'https://www.boots.com/beauty/makeup/palettes', },
          { name: 'Trending on social', link: 'https://www.boots.com/beauty/trending-products', },
        ],
      },
      // offers
      {
        name: 'Shop categories',
        hasSubmenu: true,
        type: 'list', // or bannerimages
        all: false,
        type: 'three-columns',
        children: 
        [
          { name: 'Shop all face', link: 'https://www.boots.com/beauty/makeup/face/all-face', },
          { name: 'Foundation', link: 'https://www.boots.com/beauty/makeup/face/foundation', },
          { name: 'Blusher', link: 'https://www.boots.com/beauty/makeup/face/blusher', },
          { name: 'Bronzer', link: 'https://www.boots.com/beauty/makeup/face/bronzer', },
          { name: 'Powder', link: 'https://www.boots.com/beauty/makeup/face/powder', },
          { name: 'Primer', link: 'https://www.boots.com/beauty/makeup/face/primer', },
          { name: 'Tinted moisturisers', link: 'https://www.boots.com/beauty/makeup/face/tinted-moisturisers', },
          { name: 'Shop all eyes', link: 'https://www.boots.com/beauty/makeup/eyes/all-eyes', },
          { name: 'Brows', link: 'https://www.boots.com/beauty/makeup/eyes/eyebrows', },
          { name: 'Eye liner', link: 'https://www.boots.com/beauty/makeup/eyes/eye-liner', },
          { name: 'Eye shadow', link: 'https://www.boots.com/beauty/makeup/eyes/eye-shadow', },
          { name: 'Mascara', link: 'https://www.boots.com/beauty/makeup/eyes/mascara', },
          { name: 'Eye primers & base', link: 'https://www.boots.com/beauty/makeup/eyes/eye-primers-base', },
          { name: 'Eye palettes', link: 'https://www.boots.com/beauty/makeup/eyes/eye-palettes', },
          { name: 'All lips', link: 'https://www.boots.com/beauty/makeup/lips/all-lips', },
          { name: 'Lipsticks', link: 'https://www.boots.com/beauty/makeup/lips/lipsticks', },
          { name: 'Lip balms & creams', link: 'https://www.boots.com/beauty/makeup/lips/lip-balms-creams', },
          { name: 'Liquid lipsticks', link: 'https://www.boots.com/beauty/makeup/lips/liquid-lipsticks', },
          { name: 'Lip gloss & plumpers', link: 'https://www.boots.com/beauty/makeup/lips/lip-gloss-plumpers', },
          { name: 'Lip & cheek tints', link: 'https://www.boots.com/beauty/makeup/lips/lip-cheek-tints', },
          { name: 'Lipstick sealers', link: 'https://www.boots.com/beauty/makeup/lips/lipstick-sealers', },
          { name: 'Visit nails', link: 'https://www.boots.com/beauty/makeup/nails', },
          { name: 'Nail polish', link: 'https://www.boots.com/beauty/makeup/nails/nail-polish', },
          { name: 'Gel nails', link: 'https://www.boots.com/beauty/makeup/nails/gel-nails', },
          { name: 'False nails', link: 'https://www.boots.com/beauty/makeup/nails/false-nails', },
          { name: 'Nail sets', link: 'https://www.boots.com/beauty/makeup/nails/nail-sets', },
        ],
      },
      // shop by
      {
        name: 'Premium',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Premium Makeup', link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-makeup', },
          { name: 'Premium makeup tools', link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-makeup-tools', },
          { name: 'Premium beauty gifts', link: 'https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-gift', },
        ],
      },
    ],
  },
  // Skincare
  {
    name: 'Skincare',
    regex: '/skincare',
    link: 'https://www.boots.com/beauty/skincare',
    hasSubmenu: true,
    children: [
      // most wanted
      {
        name: 'Explore',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Visit skincare', link: 'https://www.boots.com/beauty/skincare', },
          { name: 'All skincare', link: 'https://www.boots.com/beauty/skincare/skincare-all-skincare', },
          { name: 'Vegan skincare', link: 'https://www.boots.com/beauty/skincare/vegan-skincare-products', },
          { name: 'Premium skincare', link: 'https://www.boots.com/beauty/luxury-beauty-skincare/all-luxury-skincare', },
          { name: 'Female hair removal', link: 'https://www.boots.com/beauty/skincare/skincare-female-hair-removal', },
          { name: 'Men\'s skincare & body', link: 'https://www.boots.com/beauty/skincare/skincare-body', },
        ],
      },
      // offers
      {
        name: 'Shop categories',
        hasSubmenu: true,
        type: 'list', // or bannerimages
        all: false,
        type: 'three-columns',
        children: 
        [
          { name: 'Moisturiser', link: 'https://www.boots.com/beauty/skincare/facial-skincare/moisturiser', },
          { name: 'Cleansers', link: 'https://www.boots.com/beauty/skincare/facial-skincare/cleanser-toner', },
          { name: 'Serums', link: 'https://www.boots.com/beauty/skincare/facial-skincare/serum-and-treatments', },
          { name: 'Face masks', link: 'https://www.boots.com/beauty/skincare/facial-skincare/masks', },
          { name: 'Eye cream', link: 'https://www.boots.com/beauty/skincare/facial-skincare/eye-cream', },
          { name: 'Makeup remover', link: 'https://www.boots.com/beauty/skincare/facial-skincare/make-up-remover-', },
          { name: 'Skincare tools', link: 'https://www.boots.com/beauty/skincare/facial-skincare/skincare-tools', },
          { name: 'All body skincare', link: 'https://www.boots.com/toiletries/skincare/body-skincare/skincare-all-body-skincare', },
          { name: 'Body moisturiser', link: 'https://www.boots.com/toiletries/skincare/body-skincare/body-moisturiser', },
          { name: 'Neck & chest cream', link: 'https://www.boots.com/toiletries/skincare/body-skincare/neck-chest-cream', },
          { name: 'Body scrub & exfoliator', link: 'https://www.boots.com/toiletries/skincare/body-skincare/body-scrub-exfoliator', },
          { name: 'Foot creams & lotions', link: 'https://www.boots.com/toiletries/skincare/body-skincare/foot-creams-lotions', },
          { name: 'Hand cream & lotion', link: 'https://www.boots.com/toiletries/skincare/body-skincare/hand-cream-lotions', },
          { name: 'Body butter', link: 'https://www.boots.com/toiletries/skincare/body-skincare/body-butter', },
          { name: 'Shop all expert skincare', link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/beauty-expert-skincare-expert-skincare-shop-all', },
          { name: 'Expert suncare', link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/beauty-expert-skincare-expert-skincare-expert-suncare', },
          { name: 'Acne prone skin', link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/acne-prone-skin', },
          { name: 'Anti-redness', link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/anti-redness', },
          { name: 'Pigmentation', link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/pigmentation', },
          { name: 'Dry skin', link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/dry-skin-', },
          { name: 'Eczema prone skin', link: 'https://www.boots.com/toiletries/skincare/expert-skincare-/eczema-prone-skin', },
        ],
      },
      // shop by
      {
        name: 'Be Inspired',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Skincare advice', link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice', },
          { name: 'Anti-ageing advice', link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice/anti-ageing-advice', },
          { name: 'Face masks advice', link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice/face-masks-advice', },
          { name: 'Skin concerns', link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice/skin-concerns', },
          { name: 'Skincare basics', link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice/skincare-basics', },
          { name: 'Skincare routines', link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice/skincare-routines', },
        ],
      },
    ],
  },
  // Hair
  {
    name: 'Hair',
    regex: '/hair',
    link: 'https://www.boots.com/beauty/hair',
    hasSubmenu: true,
    children: [
      // most wanted
      {
        name: 'Explore',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'New in hair', link: 'https://www.boots.com/beauty/hair/new-in-hair', },
          { name: 'Hair value packs & bundles', link: 'https://www.boots.com/beauty/hair/hair-value-packs-and-bundles', },
          { name: 'Premium hair', link: 'https://www.boots.com/beauty/hair/luxury-beauty-hair', },
        ],
      },
      // offers
      {
        name: 'Shop categories',
        hasSubmenu: true,
        type: 'list', // or bannerimages
        all: false,
        type: 'three-columns',
        children: 
        [
          { name: 'Visit hair', link: 'https://www.boots.com/beauty/hair', },
          { name: 'All hair', link: 'https://www.boots.com/beauty/hair/all-hair', },
          { name: 'Hair styling', link: 'https://www.boots.com/beauty/hair/hair-styling', },
          { name: 'Shampoo', link: 'https://www.boots.com/beauty/hair/shampoo', },
          { name: 'Conditioner', link: 'https://www.boots.com/beauty/hair/conditioner', },
          { name: 'Hair treatments & masks', link: 'https://www.boots.com/beauty/hair/hair-treatments-and-masks', },
          { name: 'Hair accessories', link: 'https://www.boots.com/beauty/hair/hair-accessories', },
          { name: 'Brushes & combs', link: 'https://www.boots.com/beauty/hair/brushes-and-combs', },
          { name: 'Curls, kinks & coils', link: 'https://www.boots.com/beauty/hair/textured-hair', },
          { name: 'Hair health vitamins', link: 'https://www.boots.com/beauty/hair/hair-health-vitamins', },
          { name: 'Thinning hair', link: 'https://www.boots.com/beauty/hair/thinning-hair', },
          { name: 'Men\'s hair', link: 'https://www.boots.com/beauty/hair/mens-hair', },
          { name: 'All hair styling tools', link: 'https://www.boots.com/electrical/hair-styling-tools/all-electrical-hair-styling-tools', },
          { name: 'Hair curlers', link: 'https://www.boots.com/electrical/hair-styling-tools/hair-curlers', },
          { name: 'Hair dryers', link: 'https://www.boots.com/electrical/hair-styling-tools/hair-dryers', },
          { name: 'Hair straighteners', link: 'https://www.boots.com/electrical/hair-styling-tools/hair-straighteners', },
          { name: 'Hot brushes & air stylers', link: 'https://www.boots.com/electrical/hair-styling-tools/hot-brushes-air-stylers', },
          { name: 'Accessories & spares', link: 'https://www.boots.com/electrical/hair-styling-tools/hair-tools-accessories-spares', },
        ],
      },
      // shop by
      {
        name: 'Hair Dye',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Visit hair dye', link: 'https://www.boots.com/beauty/hair/hair-dye', },
          { name: 'All hair dye', link: 'https://www.boots.com/beauty/hair/hair-dye/all-hair-dye-at-home-for-men-women', },
          { name: 'Permanent', link: 'https://www.boots.com/beauty/hair/hair-dye/hair-dye-permanent', },
          { name: 'Semi permanent', link: 'https://www.boots.com/beauty/hair/hair-dye/semi-permanent', },
          { name: 'Temporary hair dye', link: 'https://www.boots.com/beauty/hair/hair-dye/temporary-hair-dye', },
          { name: 'Root touch up', link: 'https://www.boots.com/beauty/hair/hair-dye/root-touch-up', },
          { name: 'Hair highlighters', link: 'https://www.boots.com/beauty/hair/hair-dye/hair-highlighters', },
          { name: 'Hair colour remover', link: 'https://www.boots.com/beauty/hair/hair-dye/hair-colour-remover', },
          { name: 'Hair bleach', link: 'https://www.boots.com/beauty/hair/hair-dye/hair-bleach', },
          { name: 'Hair toners', link: 'https://www.boots.com/beauty/hair/hair-dye/hair-toners', },
        ],
      },
    ],
  },
  // Toiletries
  {
    name: 'Toiletries',
    regex: '/toiletries',
    link: 'https://www.boots.com/toiletries',
    hasSubmenu: true,
    children: [
      // most wanted
      {
        name: 'Don\'t miss',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'New in toietries', link: 'https://www.boots.com/toiletries/new-in-toiletries', },
          { name: 'Toiletries offers', link: 'https://www.boots.com/toiletries/toiletries-offers', },
          { name: 'Toiletries value packs & bundles', link: 'https://www.boots.com/toiletries/toiletries-value-packs-and-bundles', },
        ],
      },
      // offers
      {
        name: 'Bathroom essentials',
        hasSubmenu: true,
        type: 'list', // or bannerimages
        all: false,
        type: 'three-columns',
        children: 
        [
          { name: 'Visit bathroom essentials', link: 'https://www.boots.com/toiletries/washing-bathing', },
          { name: 'Shower gels & scrubs', link: 'https://www.boots.com/toiletries/washing-bathing/shower-gel', },
          { name: 'Soap & hand wash', link: 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash', },
          { name: 'Deodorants & antiperspirants', link: 'https://www.boots.com/toiletries/deodorants-antiperspirants', },
          { name: 'Body scrub', link: 'https://www.boots.com/toiletries/washing-bathing/body-scrub', },
          { name: 'Face wash', link: 'https://www.boots.com/toiletries/washing-bathing/face-wash', },
          { name: 'Tissues, wipes & sanitisers', link: 'https://www.boots.com/toiletries/washing-bathing/tissues-wipes-sanitisers', },
           { name: 'Baby & child toiletries', link: 'https://www.boots.com/toiletries/washing-bathing/baby-child-toiletries', },
           { name: 'Bath sets', link: 'https://www.boots.com/toiletries/washing-bathing/toiletries-bath-sets', },
           { name: 'Natural toiletries', link: 'https://www.boots.com/toiletries/washing-bathing/natural-toiletries', },
           { name: 'Bath accessories', link: 'https://www.boots.com/toiletries/washing-bathing/bath-accessories', },
           { name: 'Wash bags & organisers', link: 'https://www.boots.com/toiletries/washing-bathing/wash-bags', },
           { name: 'Talcum powder', link: 'https://www.boots.com/toiletries/washing-bathing/talcum-powder', },
           { name: 'Cotton wool', link: 'https://www.boots.com/baby-child/bathing-changing/baby-cotton-wool', },
           { name: 'At home dentistry', link: 'https://www.boots.com/toiletries/bootsdental/at-home-dentistry', },
           { name: 'Mouthwash', link: 'https://www.boots.com/toiletries/bootsdental/mouthwash', },
           { name: 'Kids dental', link: 'https://www.boots.com/toiletries/bootsdental/kids-dental', },
           { name: 'Oral health', link: 'https://www.boots.com/toiletries/bootsdental/oral-health', },
           { name: 'Toothpaste', link: 'https://www.boots.com/toiletries/bootsdental/toothpaste', },
           { name: 'Electrical dental', link: 'https://www.boots.com/toiletries/bootsdental/electrical-dental', },
           { name: 'Toothbrushes', link: 'https://www.boots.com/toiletries/bootsdental/toothbrushes', },
        ],
      },
      // shop by
      {
        name: 'Men\'s Toiletries',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Visit men\'s toiletries', link: 'https://www.boots.com/toiletries/mens-toiletries', },
          { name: 'Men\'s value packs & bundles', link: 'https://www.boots.com/toiletries/mens-toiletries/mens-value-packs-and-bundles', },
          { name: 'Washing & bathing', link: 'https://www.boots.com/toiletries/mens-toiletries/mens-washing-bathing', },
          { name: 'Male incontinence', link: 'https://www.boots.com/toiletries/mens-toiletries/male-incontinence', },
        ],
      },
      {
        name: 'Feminine hygiene',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Visit feminine hygiene', link: 'https://www.boots.com/toiletries/feminine-hygiene', },
          { name: 'Sanitary towels', link: 'https://www.boots.com/toiletries/feminine-hygiene/sanitary-towels', },
          { name: 'Feminine wash & wipes', link: 'https://www.boots.com/toiletries/feminine-hygiene/feminine-wash-wipes', },
          { name: 'Tampons', link: 'https://www.boots.com/toiletries/feminine-hygiene/tampons', },
        ],
      },
    ],
  },
  // Baby & Child
  {
    name: 'Baby & Child',
    regex: '/baby-child',
    link: 'https://www.boots.com/baby-child',
    hasSubmenu: true,
    children: [
      // most wanted
      {
        name: 'Don\'t miss',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Baby event', link: 'https://www.boots.com/baby-child/baby-event', },
          { name: 'Boots Parenting Club', link: 'https://www.boots.com/baby-child/parenting-club', },
          { name: 'Baby & child offers', link: 'https://www.boots.com/baby-child/baby-child-offers', },
          { name: 'Baby value packs & bundles', link: 'https://www.boots.com/baby-child/baby-value-packs-and-bundles', },
          { name: 'Sustainable baby', link: 'https://www.boots.com/baby-child/sustainable-baby', },
          { name: 'Toys', link: 'https://www.boots.com/baby-child/toys', },
          { name: 'New in baby & child', link: 'https://www.boots.com/baby-child/new-in-baby-child', },
        ],
      },
      // offers
      {
        name: 'Shop categories',
        hasSubmenu: true,
        type: 'list', // or bannerimages
        all: false,
        type: 'three-columns',
        children: 
        [
          { name: 'Baby milk & formula', link: 'https://www.boots.com/baby-child/babyfeeding/baby-milk-formula', },
          { name: 'Baby food & weaning', link: 'https://www.boots.com/baby-child/babyfeeding/baby-food-weaning', },
          { name: 'Breastfeeding', link: 'https://www.boots.com/baby-child/babyfeeding/breastfeeding-pumps', },
          { name: 'Toddler food & drink', link: 'https://www.boots.com/baby-child/babyfeeding/toddler-food-drink', },
          { name: 'Bottle feeding', link: 'https://www.boots.com/baby-child/babyfeeding/baby-bottles-teats', },
          { name: 'Cups', link: 'https://www.boots.com/baby-child/babyfeeding/baby-cups', },
          { name: 'Soothers & teethers', link: 'https://www.boots.com/baby-child/babyfeeding/soothers-teethers', },
          { name: 'Shop all baby & kids clothing', link: 'https://www.boots.com/baby-child/mothercare-clothing/shop-all-baby-kids-clothing', },
          { name: 'New in baby & kids clothing', link: 'https://www.boots.com/baby-child/mothercare-clothing/new-clothing-collection', },
          { name: 'Baby clothes 0-24 months', link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months', },
          { name: 'Girls clothes 9 months - 6 years', link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-girls-clothes-9-months-6-years', },
          { name: 'Boys clothes 9 months - 6 years', link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-boys-clothes-9-months-6-years', },
          { name: 'Nightwear & underwear', link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-nightwear-underwear', },
          { name: 'Premature baby range', link: 'https://www.boots.com/baby-child/mothercare-clothing/mothercare-premature-baby-range', },
          { name: 'Changing bag essentials', link: 'https://www.boots.com/baby-child/bathing-changing/changing-bag-essentials', },
          { name: 'Nappies', link: 'https://www.boots.com/baby-child/bathing-changing/nappies', },
          { name: 'Baby baths & accessories', link: 'https://www.boots.com/baby-child/bathing-changing/baby-baths-accessories', },
          { name: 'Baby wipes', link: 'https://www.boots.com/baby-child/bathing-changing/baby-wipes', },
          { name: 'Changing bags & mats', link: 'https://www.boots.com/baby-child/bathing-changing/changing-bags-mats', },
          { name: 'Potty training', link: 'https://www.boots.com/baby-child/bathing-changing/potty-training', },
          { name: 'Baby & child toiletries', link: 'https://www.boots.com/baby-child/bathing-changing/baby-child-toiletries', },
        ],
      },
      // shop by
      {
        name: 'Pregnancy & Maternity',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Visit pregnancy & maternity', link: 'https://www.boots.com/baby-child/pregnancy-maternity', },
          { name: 'All premature baby', link: 'https://www.boots.com/baby-child/pregnancy-maternity/all-premature-baby', },
          { name: 'Hospital bag essentials', link: 'https://www.boots.com/baby-child/pregnancy-maternity/hospital-bag-essentials', },
          { name: 'New mum toiletries', link: 'https://www.boots.com/baby-child/pregnancy-maternity/new-mum-toiletries', },
          { name: 'Maternity & nursing clothes', link: 'https://www.boots.com/baby-child/pregnancy-maternity/maternity-nursing-clothing', },
          { name: 'Pregnancy tests', link: 'https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-tests', },
          { name: 'Pregnancy supplements', link: 'https://www.boots.com/baby-child/pregnancy-maternity/pregnancysupplements', },
          { name: 'Maternity TENS machines', link: 'https://www.boots.com/baby-child/pregnancy-maternity/maternity-tens-machine', },
          { name: 'Pillows', link: 'https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-maternity-pillows', },
          { name: 'Ovulation & fertility tests', link: 'https://www.boots.com/baby-child/pregnancy-maternity/ovulation-fertility-tests', },
          { name: 'Baby shower gifting', link: 'https://www.boots.com/baby-child/pregnancy-maternity/gift-baby-shower', },
        ],
      },
    ],
  },
  // Fragrance
  {
    name: 'Fragrance',
    regex: '/fragrance',
    link: 'https://www.boots.com/fragrance',
    hasSubmenu: true,
    children: [
      // most wanted
      {
        name: 'Don\'t miss',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Fragrance offers', link: 'https://www.boots.com/fragrance/fragrance-offers', },
          { name: 'Fragrance exclusives', link: 'https://www.boots.com/fragrance/fragrance-exclusives', },
          { name: 'Recommended', link: 'https://www.boots.com/fragrance/recommended-fragrances', },
          { name: 'Vegan fragrance', link: 'https://www.boots.com/fragrance/vegan-fragrances', },
          { name: 'Luxury fragrance', link: 'https://www.boots.com/fragrance/luxury-fragrance', },
          { name: 'New in Fragrance', link: 'https://www.boots.com/fragrance/new-in-fragrance', },
        ],
      },
      // offers
      {
        name: 'Shop categories',
        hasSubmenu: true,
        type: 'list', // or bannerimages
        all: false,
        type: 'three-columns',
        children: 
        [
          { name: 'Visit perfume', link: 'https://www.boots.com/fragrance/perfume', }, 
          { name: 'All perfume', link: 'https://www.boots.com/fragrance/perfume/all-perfume', }, 
          { name: 'Gift sets', link: 'https://www.boots.com/fragrance/perfume/perfume-gift-sets', }, 
          { name: 'Body mists', link: 'https://www.boots.com/fragrance/perfume/body-mists-', }, 
          { name: 'Scented bath & shower', link: 'https://www.boots.com/fragrance/perfume/scented-bath-shower', }, 
          { name: 'Visit aftershave', link: 'https://www.boots.com/fragrance/aftershave', }, 
          { name: 'All aftershave', link: 'https://www.boots.com/fragrance/aftershave/mens-aftershave', }, 
          { name: 'Aftershave gift sets', link: 'https://www.boots.com/fragrance/aftershave/aftershave-gift-sets', }, 
          { name: 'Cologne', link: 'https://www.boots.com/fragrance/aftershave/cologne', }, 
          { name: 'Fragrance bath & shower', link: 'https://www.boots.com/fragrance/aftershave/fragrance-bath-shower', }, 
          { name: 'Visit fragrance gift sets', link: 'https://www.boots.com/fragrance/fragrance-gift-sets', }, 
          { name: 'Gift wrapped sets', link: 'https://www.boots.com/fragrance/fragrance-gift-sets/gift-wrapped-sets', }, 
          { name: 'Perfume gift sets', link: 'https://www.boots.com/fragrance/fragrance-gift-sets/perfume-gift-sets', }, 
          { name: 'Aftershave gift sets', link: 'https://www.boots.com/fragrance/fragrance-gift-sets/aftershave-gift-sets', }, 
        ],
      },
      // shop by
      {
        name: 'Be inspired',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Fragrance hints & tips', link: 'https://www.boots.com/fragrance-advice/how-to-buy-fragrance-online-advice', }, 
          { name: 'How to buy fragrance', link: 'https://www.boots.com/fragrance-advice/how-to-buy-fragrance', }, 
          { name: 'Top 8 men\'s aftershave', link: 'https://www.boots.com/fragrance-advice/best-mens-aftershave', }, 
          { name: '8 Perfect perfumes', link: 'https://www.boots.com/fragrance-advice/best-womens-perfume', }, 
        ],
      },
    ],
  },
  // Health & Wellness
  {
    name: 'Health & Wellness',
    regex: '/health-pharmacy',
    link: 'https://www.boots.com/health-pharmacy',
    hasSubmenu: true,
    children: [
      // most wanted
      {
        name: 'Don\'t miss',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'health offers', link: 'https://www.boots.com/health-pharmacy/health-offers', }, 
          { name: 'new in health', link: 'https://www.boots.com/health-pharmacy/new-in-health', }, 
          { name: 'new in wellness', link: 'https://www.boots.com/wellness/new-in-wellness', }, 
        ],
      },
      // offers
      {
        name: 'Shop categories',
        hasSubmenu: true,
        type: 'list', // or bannerimages
        all: false,
        type: 'three-columns',
        children: 
        [
          { name: 'visit women\'s health', link: 'https://www.boots.com/health-pharmacy/womenshealth', }, 
          { name: 'planning for a baby', link: 'https://www.boots.com/health-pharmacy/womenshealth/familyplanning', }, 
          { name: 'intimate dryness', link: 'https://www.boots.com/health-pharmacy/womenshealth/intimate-dryness--1', }, 
          { name: 'bacterial vaginosis', link: 'https://www.boots.com/health-pharmacy/womenshealth/vaginitis', }, 
          { name: 'female incontinence', link: 'https://www.boots.com/health-pharmacy/womenshealth/female-incontinence', }, 
          { name: 'feminine wash & wipes', link: 'https://www.boots.com/health-pharmacy/womenshealth/feminine-wash-wipes', }, 
          { name: 'thrush', link: 'https://www.boots.com/health-pharmacy/womenshealth/thrush', }, 
          { name: 'menopause', link: 'https://www.boots.com/health-pharmacy/womenshealth/menopause-support', }, 
          { name: 'women\'s health supplements', link: 'https://www.boots.com/health-pharmacy/womenshealth/womenshealth-supplements', }, 
          { name: 'Morning After Pill', link: 'https://www.boots.com/health-pharmacy/womenshealth/morning-after-pill', }, 
          { name: 'Period Delay Online Clinic', link: 'https://www.boots.com/health-pharmacy/womenshealth/period-delay-clinic', }, 
          { name: 'cystitis & urinary tract infections', link: 'https://www.boots.com/health-pharmacy/womenshealth/cystitis-urinary-tract-infections', }, 
          { name: 'hair loss', link: 'https://www.boots.com/health-pharmacy/womenshealth/womens-hair-loss', }, 
          { name: 'period pain', link: 'https://www.boots.com/health-pharmacy/womenshealth/period-pain', }, 
          { name: 'Cervical Cancer Vaccination Service', link: 'https://www.boots.com/health-pharmacy/womenshealth/cervicalcancer', }, 
          { name: 'alternative therapy', link: 'https://www.boots.com/health-pharmacy/womenshealth/womens-alternative-therapy', }, 
          { name: 'visit men\'s health', link: 'https://www.boots.com/health-pharmacy/menshealth', }, 
          { name: 'men\'s sexual health', link: 'https://www.boots.com/health-pharmacy/menshealth/mens-sexual-health', }, 
          { name: 'male incontinence', link: 'https://www.boots.com/health-pharmacy/menshealth/male-incontinence', }, 
          { name: 'hair loss', link: 'https://www.boots.com/health-pharmacy/menshealth/mens-hair-loss', }, 
          { name: 'men\'s health supplements', link: 'https://www.boots.com/health-pharmacy/menshealth/menshealth-supplements', }, 
          { name: 'jock rash', link: 'https://www.boots.com/health-pharmacy/menshealth/jock-rash', }, 
          { name: 'pain', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/painrelief', }, 
          { name: 'eyecare', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/eye-care', }, 
          { name: 'stomach & bowel', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/digestion', }, 
          { name: 'heartburn & indigestion', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/heartburn-indigestion-', }, 
          { name: 'footcare', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/footcare', }, 
          { name: 'allergy & hayfever', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/allergy-hayfever', }, 
          { name: 'specialist skincare', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/skin-problems', }, 
          { name: 'first aid', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/first-aid', }, 
          { name: 'cough, cold & flu', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/cold-flu-medication', }, 
          { name: 'mouth & oral care', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/mouth-oral-care', }, 
          { name: 'sleep', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/sleep', }, 
          { name: 'earcare', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/ear-care', }, 
          { name: 'hair loss', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/mens-hair-loss', }, 
          { name: 'diabetes', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/diabetes', }, 
          { name: 'heart health', link: 'https://www.boots.com/health-pharmacy/medicines-treatments/healthyheart', }, 
          { name: 'pharmacy medicines', link: 'https://www.boots.com/health-pharmacy/pharmacy-medicines', }, 
        ],
      },
      // shop by
      {
        name: 'Wellness',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'visit lifestyle & wellbeing', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing', }, 
          { name: 'alternative therapies', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/wellness-supplements', }, 
          { name: 'diet & weight management', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/weightloss', }, 
          { name: 'dental', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/bootsdental', }, 
          { name: 'smoking control', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/stopsmoking', }, 
          { name: 'health food', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/health-food', }, 
          { name: 'fitness equipment & activity trackers', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/fitness', }, 
          { name: 'planning for a baby', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/familyplanning', }, 
          { name: 'sports nutrition', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/sports-nutrition', }, 
          { name: 'home & pet care', link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing/home-pet-care', }, 
        ],
      },
      {
        name: 'Vitamins & supplements',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'vitamin selector', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vitamin-selector-tool', }, 
          { name: 'multivitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/multivitamins', }, 
          { name: 'immune health', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/immunehealth', }, 
          { name: 'baby & child vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/baby-child-vitamins', }, 
          { name: 'hair health vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/hair-health-vitamins', }, 
          { name: 'vegan vitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/vegan-vitamins', }, 
          { name: '50+ multivitamins', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/50plus-multivitamins', }, 
          { name: 'pregnancy supplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/pregnancysupplements', }, 
          { name: 'CBD', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/cannabidiol-cbd-oil', }, 
          { name: 'beauty supplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/beautysupplements', }, 
          { name: 'men\'s health supplements', link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements/menshealth-supplements', }, 
        ],
      },
    ],
  },
  // Mens
  {
    name: 'Men\'s',
    regex: '/mens',
    link: 'https://www.boots.com/mens',
    hasSubmenu: true,
    children: [
      // most wanted
      {
        name: 'Don\'t miss',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Value packs and bundles', link: 'https://www.boots.com/mens/mens-value-packs-and-bundles', }, 
          { name: 'Gift sets', link: 'https://www.boots.com/mens/mens-gift-sets', }, 
        ],
      },
      // offers
      {
        name: 'Shop categories',
        hasSubmenu: true,
        type: 'list', // or bannerimages
        all: false,
        type: 'three-columns',
        children: 
        [
          { name: 'Shaving & Grooming', link: 'https://www.boots.com/mens/shaving-grooming', }, 
          { name: 'Beard care', link: 'https://www.boots.com/mens/shaving-grooming/beardcare', }, 
          { name: 'Post shave', link: 'https://www.boots.com/mens/shaving-grooming/post-shave', }, 
          { name: 'Razor blades', link: 'https://www.boots.com/mens/shaving-grooming/mens-razor-blades', }, 
          { name: 'Razors', link: 'https://www.boots.com/mens/shaving-grooming/mens-razors', }, 
          { name: 'Shaving brushes', link: 'https://www.boots.com/mens/shaving-grooming/shaving-brushes', }, 
          { name: 'Shaving foams & pre-shaves', link: 'https://www.boots.com/mens/shaving-grooming/shaving-foams-pre-shave', }, 
          { name: 'Aftershave', link: 'https://www.boots.com/mens/aftershave', }, 
          { name: 'Visit aftershave', link: 'https://www.boots.com/mens/aftershave/mens-aftershave', }, 
          { name: 'Aftershave gift sets', link: 'https://www.boots.com/mens/aftershave/aftershave-gift-sets', }, 
          { name: 'Cologne', link: 'https://www.boots.com/mens/aftershave/cologne', }, 
          { name: 'Fragrance bath & shower', link: 'https://www.boots.com/mens/aftershave/fragrance-bath-shower', }, 
          { name: 'Men\'s Toiletries', link: 'https://www.boots.com/mens/mens-toiletries', }, 
          { name: 'Visit Men\'s toiletries', link: 'https://www.boots.com/mens/mens-toiletries', }, 
          { name: 'Men\'s skincare & body', link: 'https://www.boots.com/mens/mens-toiletries/skincare-body', }, 
          { name: 'Washing & bathing', link: 'https://www.boots.com/mens/mens-toiletries/mens-washing-bathing', }, 
          { name: 'Men\'s hair', link: 'https://www.boots.com/mens/mens-toiletries/mens-hair', }, 
          { name: 'Male incontinence', link: 'https://www.boots.com/mens/mens-toiletries/male-incontinence', }, 
          { name: 'Hair loss', link: 'https://www.boots.com/mens/mens-toiletries/mens-hair-loss', }, 
          { name: 'Men\'s gift sets', link: 'https://www.boots.com/mens/mens-toiletries/mens-gift-sets', }, 
        ],
      },
    ],
  },
  // Services
  {
    name: 'Services',
    regex: '/healthhub',
    link: 'https://www.boots.com/healthhub',
    hasSubmenu: true,
    children: [
      // most wanted
      {
        name: 'Pharmacy Services',
        hasSubmenu: true,
        all: false,
        type: 'one-column',
        children: 
        [
          { name: 'Boots online doctor', link: 'https://onlinedoctor.boots.com/', }, 
          { name: 'appointment booking', link: 'https://www.boots.com/appointment-booking', }, 
          { name: 'COVID-19 testing', link: 'https://www.boots.com/covid-19-testing', }, 
          { name: 'Winter Flu Jab Service', link: 'https://www.boots.com/flujab', }, 
          { name: 'opticians', link: 'https://www.boots.com/opticians', }, 
          { name: 'health & pharmacy', link: 'https://www.boots.com/healthhub', }, 
          { name: 'hearingcare', link: 'https://www.boots.com/hearingcare', }, 
        ],
      },
      // offers
      {
        name: 'Categories',
        hasSubmenu: true,
        type: 'list', // or bannerimages
        all: false,
        type: 'three-columns',
        children: 
        [
          { name: 'visit boots online doctor', link: 'https://onlinedoctor.boots.com/', }, 
          { name: 'mens health', link: 'https://onlinedoctor.boots.com/mens-health', }, 
          { name: 'womens health', link: 'https://onlinedoctor.boots.com/womens-health', }, 
          { name: 'general health', link: 'https://onlinedoctor.boots.com/general-health', }, 
          { name: 'acne & skin conditions', link: 'https://onlinedoctor.boots.com/acne-skin-conditions', }, 
          { name: 'sexual health', link: 'https://onlinedoctor.boots.com/sexual-health', }, 
          { name: 'testing services', link: 'https://onlinedoctor.boots.com/home-testing-kits', }, 
            { name: 'Visit Photo Services', link: 'https://www.boots.com/photo', }, 
            { name: 'Photo Offers', link: 'https://www.boots.com/photo/photo-offers', }, 
            { name: 'Photo Printing', link: 'https://www.boots.com/photo/photo-printing', }, 
            { name: 'Albums & Frames', link: 'https://www.boots.com/photo/photo-albums-frames', }, 
            { name: 'Audio & Visual Tech', link: 'https://www.boots.com/photo/headphones-cameras-accessories', }, 
            { name: 'Novelty Photo Gifts', link: 'https://www.boots.com/photo/novelty-photo-gifts', }, 
            { name: 'Book an eye test', link: 'https://www.boots.com/opticians/eyetest', }, 
            { name: 'Opticians offers', link: 'https://www.boots.com/opticians/opticians-offers', }, 
            { name: 'Glasses frames', link: 'https://www.boots.com/opticians/glasses', }, 
            { name: 'Glasses lenses', link: 'https://www.boots.com/opticians/prescription-lenses', }, 
            { name: 'Contact lenses', link: 'https://www.boots.com/opticians/contactlenses', }, 
            { name: 'Hearingcare', link: 'https://www.boots.com/opticians/hearingcare', }, 
        ],
      },

    ],
  },
    {
          name: 'Inspire Me',
          regex: 'health-and-beauty',
          link: 'https://www.boots.com/health-and-beauty',
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