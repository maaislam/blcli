/*
  Navigation data must be supplied in the following format

  Example JSON:
  [
    {
      title: 'Timber',
      url: '/Product/Timber/c/1500000',
      children: [
        {
          title: 'Sheet Material',
          url: '/Product/Timber/Sheet-Material/c/1500007',
          children: []
        }
      ]
    }
  ];

  You can also define custom markup
    {
      custom: '',
    }
*/
export default [
  {
    title: 'Shop',
    children: [
      {
        title: 'Christmas',
        children: [
          {
            title: 'All Christmas',
            url: '/971-973/christmas/shop-all',
          },
          {
            title: 'Gifts For Her',
            url: '/971-1004/christmas/gifts-for-her',
          },
          {
            title: 'Gifts For Him',
            url: '/971-1005/christmas/gifts-for-him',
          },
          {
            title: 'Gifts For Kids',
            url: '/971-1007/christmas/gifts-for-kids',
          },
          {
            title: 'Gifts For Home',
            url: '/971-1014/christmas/gifts-for-home',
          },
          {
            title: 'Stocking Fillers',
            url: '/971-1003/christmas/stocking-fillers',
          },
          {
            title: 'Fragrance Gifts',
            url: '/971-1015/christmas/fragrance-gifts',
          },
          {
            title: 'Nightwear',
            children: [
              {
                title: 'All Nightwear',
                url: '/971-1016-1021/christmas/nightwear/all-nightwear',
              },
              {
                title: 'Matching Family Pyjamas',
                url: '/971-1016-1020/christmas/nightwear/matching-family-pyjamas',
              },
            ],
          },
          {
            title: 'Beauty Gifts',
            url: '/971-1017/christmas/beauty-gifts',
          },
        ],
      },
      {
        title: 'Make-up',
        children: [
          {
            title: 'All Make-up',
            url: '/301/make-up',
          },
          {
            title: 'Lips',
            children: [
              {
                title: 'All Lips',
                url: '/301-315/make-up/lips',
              },
              {
                title: 'Lipstick',
                url: '/301-315-414/make-up/lips/lipstick',
              },
              {
                title: 'Liquid Lipstick',
                url: '/301-315-1002/make-up/lips/liquid-lipstick',
              },
              {
                title: 'Lip Gloss',
                url: '/301-315-415/make-up/lips/lip-gloss',
              },
              {
                title: 'Lip Liner',
                url: '/301-315-416/make-up/lips/lip-liner',
              },
              {
                title: 'Lip Oil',
                url: '/301-315-882/make-up/lips/lip-oil',
              },
              {
                title: 'Lip Kits',
                url: '/301-315-598/make-up/lips/lip-kits',
              },
              {
                title: 'Lip Care',
                url: '/301-315-417/make-up/lips/lip-care',
              },
            ],
          },
          {
            title: 'Face',
            children: [
              {
                title: 'Foundation',
                url: '/301-317-422/make-up/face/foundation',
              },
              {
                title: 'Light Coverage',
                url: '/301-317-468/make-up/face/light-coverage',
              },
              {
                title: 'Medium Coverage',
                url: '/301-317-469/make-up/face/medium-coverage',
              },
              {
                title: 'Buildable Coverage',
                url: '/301-317-471/make-up/face/buildable-coverage',
              },
              {
                title: 'Full Coverage',
                url: '/301-317-470/make-up/face/full-coverage',
              },
              {
                title: 'Liquid',
                url: '/301-317-873/make-up/face/liquid',
              },
              {
                title: 'Powder',
                url: '/301-317-424/make-up/face/powder',
              },
              {
                title: 'Compact',
                url: '/301-317-863/make-up/face/compact',
              },
              {
                title: 'Prime & Set',
                url: '/301-317-427/make-up/face/prime-set',
              },
              {
                title: 'Concealer',
                url: '/301-317-423/make-up/face/concealer',
              },
              {
                title: 'Blusher',
                url: '/301-317-425/make-up/face/blusher',
              },
              {
                title: 'Bronzer',
                url: '/301-317-550/make-up/face/bronzer',
              },
              {
                title: 'Highlighter',
                url: '/301-317-426/make-up/face/highlighter',
              },
            ],
          },
          {
            title: 'Eyes',
            children: [
              {
                title: 'Mascara',
                url: '/301-316-418/make-up/eyes/mascara',
              },
              {
                title: 'Brows',
                url: '/301-316-421/make-up/eyes/brows',
              },
              {
                title: 'Eyeliner',
                url: '/301-316-420/make-up/eyes/eyeliner',
              },
              {
                title: 'Eyeshadow',
                url: '/301-316-419/make-up/eyes/eyeshadow',
              },
              {
                title: 'Eyeshadow Palettes',
                url: '/301-316-948/make-up/eyes/eyeshadow-palettes',
              },
            ],
          },
          {
            title: 'Nails',
            children: [
              {
                title: 'Gel Nail',
                url: '/301-318-445/make-up/nails/gel-shine',
              },
              {
                title: 'Nail Colour',
                url: '/301-318-428/make-up/nails/nail-colour',
              },
              {
                title: 'Nail Care',
                url: '/301-318-429/make-up/nails/nail-care',
              },
            ],
          },
          {
            title: 'Make-Up Brushes',
            url: '/301-319/make-up/make-up-brushes',
          },
          {
            title: 'Make-Up Sets',
            url: '/301-995/make-up/make-up-sets',
          },
          {
            title: '£5 or less',
            url: '/301-458/make-up/5-or-less',
          },
          {
            title: 'Offers',
            url: '/313-486/sale/make-up-sale',
          },
        ],
      },
      {
        title: 'Skincare',
        children: [
          {
            title: 'All Skincare',
            url: '/302/skincare',
          },
          {
            title: 'Anti-Ageing',
            url: '/302-331/skincare/anti-ageing',
          },
          {
            title: 'Moisturisers',
            url: '/302-583/skincare/moisturisers', // ???
          },
          {
            title: 'Cleansers',
            url: '/302-333/skincare/cleansers',
          },
          {
            title: 'Eye Creams',
            url: '/302-330/skincare/eye-creams',
          },
          {
            title: 'Face Masks',
            url: '/302-554/skincare/face-masks',
          },
          {
            title: 'Serums & Treatments',
            url: '/302-555/skincare/serums-treatments',
          },
          {
            title: 'Vegan Skincare',
            url: '/302-936/skincare/vegan-skincare',
          },
          {
            title: 'Skincare Sets',
            url: '/302-335/skincare/skincare-sets',
          },
          {
            title: 'Tools & Accessories',
            url: '/302-556/skincare/skincare-tools',
          },
          {
            title: 'Vitamin C',
            url: '/302-849/skincare/vitamin-c',
          },
          {
            title: 'Skincare Saviours',
            url: '/302-977/skincare/skincare-saviours',
          },
          {
            title: 'Offers',
            url: '/313-662/sale/skincare-sale',
          },
        ],
      },
      {
        title: 'Perfume',
        children: [
          {
            title: 'All Fragrances',
            url: '/304/perfume/',
          },
          {
            title: 'Womens Fragrance',
            url: '/304-920/perfume/womens-fragrance',
          },
          {
            title: 'Mens Fragrance',
            url: '/304-482/perfume/mens-fragrance',
          },
          {
            title: 'Home Fragrance',
            url: '/310-465/home-gifts/home-fragrance',
          },
          {
            title: 'Sets',
            url: '/304-730-917/perfume/fragrance-sets/all-fragrance-sets',
          },
          {
            title: 'Bestsellers',
            url: '/773-774/bestsellers/bestsellers', // ???
          },
          {
            title: 'Offers',
            url: '/313-609/sale/fragrance-sale',
          },
        ],
      },
      {
        title: 'Toiletries',
        children: [
          {
            title: 'All Toiletries',
            url: '/306/toiletries',
          },
          {
            title: 'Dry Oil Sprays',
            url: '/306-446/toiletries/dry-oil-sprays',
          },
          {
            title: 'Body Moisturiser',
            url: '/306-345/toiletries/body-moisturiser',
          },
          {
            title: 'Bubble Bath',
            url: '/306-342/toiletries/bubble-bath',
          },
          {
            title: 'Shower',
            url: '/306-343/toiletries/shower',
          },
          {
            title: 'Fragrance Spritz',
            url: '/306-352/toiletries/fragrance-spritz',
          },
          {
            title: 'Haircare',
            children: [
              {
                title: 'All Haircare',
                url: '/307/haircare',
              },
              {
                title: 'Shampoo',
                url: '/307-360/haircare/shampoo',
              },
              {
                title: 'Conditioner',
                url: '/307-361/haircare/conditioner',
              },
              {
                title: 'Argan Oil',
                url: '/307-771/haircare/moroccan-argan-oil',
              },
              {
                title: 'Serums',
                url: '/307-476/haircare/serums',
              },
              {
                title: 'Treatments',
                url: '/307-363/haircare/treatments',
              },
              {
                title: 'Styling',
                url: '/307-362/haircare/styling',
              },
              {
                title: 'Hair Brushes & Tools',
                url: '/307-372/haircare/hair-brushes-tools',
              },
              {
                title: 'Haircare Sets',
                url: '/306-571-879/toiletries/haircare/haircare-sets',
              },
              {
                title: 'Bestsellers',
                url: '/773-774/bestsellers/bestsellers', // ???
              },
              {
                title: 'Offers',
                url: '/313-870/sale/haircare-sale',
              },
            ],
          },
          {
            title: 'Face Masks',
            url: '/306-347/toiletries/face-masks',
          },
          {
            title: 'Aromatherapy',
            url: '/306-949/toiletries/aromatherapy',
          },
          {
            title: 'Hand Cream',
            url: '/306-346/toiletries/hand-cream',
          },
          {
            title: 'Hand Wash',
            url: '/306-344/toiletries/hand-wash',
          },
          {
            title: 'Deodorants',
            url: '/306-351/toiletries/deodorants',
          },
          {
            title: 'Foot Care & Tools',
            url: '/306-348/toiletries/foot-care-tools',
          },
          {
            title: 'Brushes, Sponges & Tools',
            url: '/306-714/toiletries/brushes-sponges-tools',
          },
          {
            title: 'Hair Removal',
            url: '/306-350/toiletries/hair-removal',
          },
          {
            title: 'Kids Toiletries',
            url: '/306-353/toiletries/kids-toiletries',
          },
          {
            title: 'Mens Toiletries',
            url: '/306-927/toiletries/mens-toiletries',
          },
          {
            title: 'Suncare',
            url: '/306-694/toiletries/suncare',
          },
          {
            title: 'Sets',
            url: '/306-930/toiletries/toiletries-sets',
          },
          {
            title: 'Bestsellers',
            url: '/773-774/bestsellers/bestsellers', // ???
          },
          {
            title: 'Offers',
            url: '/313-663/sale/toiletries-sale',
          },
        ],
      },
      {
        title: 'Home & Gifts',
        children: [
          {
            title: 'All Home & Gifts',
            url: '/310/home-gifts',
          },
          {
            title: 'Gifts',
            url: '/310-600/home-gifts/gifts',
          },
          {
            title: 'Home Fragrance',
            url: '/310-465/home-gifts/home-fragrance',
          },
          {
            title: 'Home Accessories',
            url: '/310-399/home-gifts/home-accessories',
          },
          {
            title: 'Kitchen',
            url: '/310-642/home-gifts/kitchen',
          },
          {
            title: 'Bestsellers',
            url: '/773-774/bestsellers/bestsellers', // ???
          },
          {
            title: 'Offers',
            url: '/313-487/sale/home-gift-sale/',
          },
        ],
      },
      {
        title: 'Fashion',
        children: [
          {
            title: 'All Fashion',
            url: '/855/fashion',
          },
          {
            title: 'Womenswear',
            url: '/855-434/fashion/womenswear',
          },
          {
            title: 'Bags & Purses',
            url: '/855-725/fashion/bags-purses',
          },
          {
            title: 'Jewellery & Watches',
            children: [
              {
                title: 'All Jewellery & Watches',
                url: '/308/jewellery-watches',
              },
              {
                title: 'Watches',
                url: '/308-389/jewellery-watches/watches',
              },
              {
                title: 'Necklaces',
                url: '/308-385/jewellery-watches/necklaces',
              },
              {
                title: 'Earrings',
                url: '/308-386/jewellery-watches/earrings',
              },
              {
                title: 'Bracelets',
                url: '/308-387/jewellery-watches/bracelets',
              },
              {
                title: 'Rings',
                url: '/308-388/jewellery-watches/rings',
              },
              {
                title: 'Sets',
                url: '/308-390/jewellery-watches/jewellery-sets',
              },
              {
                title: 'Bestsellers',
                url: '/773-774/bestsellers/bestsellers', // ???
              },
              {
                title: 'Offers',
                url: '/313-535/sale/jewellery-sale', // ???
              },
            ],
          },
          {
            title: 'Nightwear',
            url: '/855-473/fashion/nightwear',
          },
          {
            title: 'Lingerie',
            url: '/855-481/fashion/lingerie',
          },
          {
            title: 'Footwear',
            url: '/855-474/fashion/footwear',
          },
          {
            title: 'Accessories',
            url: '/855-616/fashion/accessories',
          },
          {
            title: 'Bestsellers',
            url: '/773-774/bestsellers/bestsellers', // ???
          },
          {
            title: 'Offers',
            url: '/313-485/sale/fashion-sale',
          },
        ],
      },
      {
        title: 'Kids',
        children: [
          {
            title: 'All Kids',
            url: '/311/kids',
          },
          {
            title: 'Boys',
            url: '/311-404/kids/boys',
          },
          {
            title: 'Girls',
            url: '/311-403/kids/girls',
          },
          {
            title: 'Toiletries',
            url: '/311-405/kids/toiletries',
          },
          {
            title: 'Branded',
            url: '/311-640/kids/branded',
          },
          {
            title: 'Bestsellers',
            url: '/773-774/bestsellers/bestsellers', // ???
          },
          {
            title: 'Offers',
            url: '/313-498/sale/kids-sale',
          },
        ],
      },
      {
        title: 'Men',
        children: [
          {
            title: 'All Men',
            url: '/312/men',
          },
          {
            title: 'Fragrance',
            url: '/312-407/men/fragrance',
          },
          {
            title: 'Skincare',
            url: '/312-408/men/skincare',
          },
          {
            title: 'Grooming',
            url: '/312-410/men/grooming',
          },
          {
            title: 'Toiletries',
            url: '/312-411/men/toiletries',
          },
          {
            title: 'Bestsellers',
            url: '/773-774/bestsellers/bestsellers', // ???
          },
          {
            title: 'Offers',
            url: '/special-offers/', // ???
          },
        ],
      },
      {
        title: 'Sale',
        children: [
          {
            title: 'All Sale',
            url: '/313-413/sale/shop-all',
          },
          {
            title: 'Make-up Sale',
            url: '/313-486/sale/make-up-sale',
          },
          {
            title: 'Toiletries Sale',
            url: '/313-663/sale/toiletries-sale',
          },
          {
            title: 'Fragrance Sale',
            url: '/313-609/sale/fragrance-sale',
          },
          {
            title: 'Skincare Sale',
            url: '/313-662/sale/skincare-sale',
          },
          {
            title: 'Fashion Sale',
            url: '/313-485/sale/fashion-sale',
          },
          {
            title: 'Nightwear Sale',
            url: '/313-657/sale/nightwear',
          },
          {
            title: 'Kids Sale',
            url: '/313-498/sale/kids-sale',
          },
          {
            title: 'Jewellery Sale',
            url: '/313-535/sale/jewellery-sale',
          },
          {
            title: 'Home & Gift Sale',
            url: '/313-487/sale/home-gift-sale',
          },
          {
            title: 'Haircare Sale',
            url: '/313-870/sale/haircare-sale',
          },
          {
            title: 'Brand Sale',
            url: '/313-606/sale/brand-sale',
          },
          {
            title: '£2 or Less Sale',
            url: '/313-488/sale/2-or-less-sale',
          },
          {
            title: 'Half Price Sale',
            url: '/313-604/sale/half-price-or-less',
          },
        ],
      },
    ],
  },

  {
    title: 'Discover',
    children: [
      {
        title: 'What\'s New',
        url: '/655/whats-new',
      },
      {
        title: 'Bestsellers',
        url: '/773/bestsellers',
      },
    ],
  },

  {
    title: 'Brochure',
    url: '/brochure/',
  },

  {
    custom: `
      <div class="AV021_MobileNav_linkHeading">Customer</div>
      <a href="/customer/logon/">Sign in / Register</a>
    `,
  },

  {
    custom: `
      <div class="AV021_MobileNav_linkHeading">Rep</div>
      <a href="/manager/representative/">Sign in / Register</a>
    `,
  },
];
