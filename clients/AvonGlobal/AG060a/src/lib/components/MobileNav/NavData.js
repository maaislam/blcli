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
    title: "Shop",
    children: [
      {
        title: "Sale & Offers",
        children: [
          {
            title: "Sale",
            children: [
              {
                title: "All Sale",
                url: "/313-413/sale/shop-all",
              },
              {
                title: "Make-up Sale",
                url: "/313-486/sale/make-up-sale",
              },
              {
                title: "Toiletries Sale",
                url: "/313-663/sale/toiletries-sale",
              },
              {
                title: "Fragrance Sale",
                url: "/313-609/sale/fragrance-sale",
              },
              {
                title: "Skincare Sale",
                url: "/313-662/sale/skincare-sale",
              },
              {
                title: "Fashion Sale",
                url: "/313-485/sale/fashion-sale",
              },
              {
                title: "Nightwear Sale",
                url: "/313-657/sale/nightwear",
              },
              {
                title: "Kids Sale",
                url: "/313-498/sale/kids-sale",
              },
              {
                title: "Jewellery Sale",
                url: "/313-535/sale/jewellery-sale",
              },
              {
                title: "Home & Gift Sale",
                url: "/313-487/sale/home-gift-sale",
              },
              {
                title: "Haircare Sale",
                url: "/313-870/sale/haircare-sale",
              },
              {
                title: "Brand Sale",
                url: "/313-606/sale/brand-sale",
              },
              {
                title: "£2 or Less Sale",
                url: "/313-488/sale/2-or-less-sale",
              },
              {
                title: "Half Price Sale",
                url: "/313-604/sale/half-price-or-less",
              },
            ],
          },
          {
            title: "Offers",
            url: "/special-offers",
          },
          {
            title: "Clearance",
            url: "/1117/clearance",
          },
        ],
      },
      {
        title: "Make-up",
        children: [
          {
            title: "All Make-up",
            url: "/301/make-up",
          },
          {
            title: "Lips",
            children: [
              {
                title: "All Lips",
                url: "/301-315/make-up/lips",
              },
              {
                title: "Lipstick",
                url: "/301-315-414/make-up/lips/lipstick",
              },
              {
                title: "Liquid Lipstick",
                url: "/301-315-1002/make-up/lips/liquid-lipstick",
              },
              {
                title: "Lip Gloss",
                url: "/301-315-415/make-up/lips/lip-gloss",
              },
              {
                title: "Lip Liner",
                url: "/301-315-416/make-up/lips/lip-liner",
              },
              {
                title: "Lip Oil",
                url: "/301-315-882/make-up/lips/lip-oil",
              },
              {
                title: "Lip Care",
                url: "/301-315-417/make-up/lips/lip-care",
              },
            ],
          },
          {
            title: "Face",
            children: [
              {
                title: "Foundation",
                url: "/301-317-422/make-up/face/foundation",
              },
              {
                title: "Light Coverage",
                url: "/301-317-468/make-up/face/light-coverage",
              },
              {
                title: "Medium Coverage",
                url: "/301-317-469/make-up/face/medium-coverage",
              },
              {
                title: "Buildable Coverage",
                url: "/301-317-471/make-up/face/buildable-coverage",
              },
              {
                title: "Full Coverage",
                url: "/301-317-470/make-up/face/full-coverage",
              },
              {
                title: "Liquid",
                url: "/301-317-873/make-up/face/liquid",
              },
              {
                title: "Powder",
                url: "/301-317-424/make-up/face/powder",
              },
              {
                title: "Compact",
                url: "/301-317-863/make-up/face/compact",
              },
              {
                title: "Prime & Set",
                url: "/301-317-427/make-up/face/prime-set",
              },
              {
                title: "Concealer",
                url: "/301-317-423/make-up/face/concealer",
              },
              {
                title: "Blusher",
                url: "/301-317-425/make-up/face/blusher",
              },
              {
                title: "Bronzer",
                url: "/301-317-550/make-up/face/bronzer",
              },
              {
                title: "Highlighter",
                url: "/301-317-426/make-up/face/highlighter",
              },
            ],
          },
          {
            title: "Eyes",
            children: [
              {
                title: "Mascara",
                url: "/301-316-418/make-up/eyes/mascara",
              },
              {
                title: "Brows",
                url: "/301-316-421/make-up/eyes/brows",
              },
              {
                title: "Eyeliner",
                url: "/301-316-420/make-up/eyes/eyeliner",
              },
              {
                title: "Eyeshadow",
                url: "/301-316-419/make-up/eyes/eyeshadow",
              },
              {
                title: "Eyeshadow Palettes",
                url: "/301-316-948/make-up/eyes/eyeshadow-palettes",
              },
            ],
          },
          {
            title: "Nails",
            children: [
              {
                title: "Gel Nail",
                url: "/301-318-445/make-up/nails/gel-shine",
              },
              {
                title: "Nail Colour",
                url: "/301-318-428/make-up/nails/nail-colour",
              },
              {
                title: "Nail Care",
                url: "/301-318-429/make-up/nails/nail-care",
              },
            ],
          },
          {
            title: "Make-up Brushes",
            url: "/301-319/make-up/make-up-brushes",
          },
          {
            title: "Make-up Sets",
            url: "/301-995/make-up/make-up-sets",
          },
          {
            title: "£5 or less",
            url: "/301-458/make-up/5-or-less",
          },
          {
            title: "Offers",
            url: "/313-486/sale/make-up-sale",
          },
        ],
      },
      {
        title: "Haircare",
        url: "/307/haircare",
      },
      {
        title: "Skincare",
        children: [
          {
            title: "All Skincare",
            url: "/302/skincare",
          },
          {
            title: "Anti-Ageing",
            url: "/302-331/skincare/anti-ageing",
          },
          {
            title: "Moisturisers",
            url: "/302-583/skincare/moisturisers", // ???
          },
          {
            title: "Cleansers",
            url: "/302-333/skincare/cleansers",
          },
          {
            title: "Eye Creams",
            url: "/302-330/skincare/eye-creams",
          },
          {
            title: "Face Masks",
            url: "/302-554/skincare/face-masks",
          },
          {
            title: "Serums & Treatments",
            url: "/302-555/skincare/serums-treatments",
          },
          {
            title: "Vegan Skincare",
            url: "/302-936/skincare/vegan-skincare",
          },
          {
            title: "Skincare Sets",
            url: "/302-335/skincare/skincare-sets",
          },
          {
            title: "Tools & Accessories",
            url: "/302-556/skincare/skincare-tools",
          },
          {
            title: "Vitamin C",
            url: "/302-849/skincare/vitamin-c",
          },
          {
            title: "Offers",
            url: "/313-662/sale/skincare-sale",
          },
        ],
      },
      {
        title: "Perfume",
        children: [
          {
            title: "All Fragrances",
            url: "/304/perfume/",
          },
          {
            title: "Womens Fragrance",
            url: "/304-920/perfume/womens-fragrance",
          },
          {
            title: "Mens Fragrance",
            url: "/304-482/perfume/mens-fragrance",
          },
          {
            title: "Home Fragrance",
            url: "/310-465/home-gifts/home-fragrance",
          },
          {
            title: "Bestsellers",
            url: "/773-774/bestsellers/bestsellers", // ???
          },
          {
            title: "Offers",
            url: "/313-609/sale/fragrance-sale",
          },
        ],
      },
      {
        title: "Toiletries",
        children: [
          {
            title: "All Toiletries",
            url: "/306/toiletries",
          },
          {
            title: "Dry Oil Sprays",
            url: "/306-446/toiletries/dry-oil-sprays",
          },
          {
            title: "Body Moisturiser",
            url: "/306-345/toiletries/body-moisturiser",
          },
          {
            title: "Haircare",
            children: [
              {
                title: "All Haircare",
                url: "/307/haircare",
              },
              {
                title: "Shampoo",
                url: "/307-360/haircare/shampoo",
              },
              {
                title: "Conditioner",
                url: "/307-361/haircare/conditioner",
              },
              {
                title: "Moroccan Argan Oil",
                url: "/307-771/haircare/moroccan-argan-oil",
              },
              {
                title: "Serums",
                url: "/307-476/haircare/serums",
              },
              {
                title: "Treatments",
                url: "/307-363/haircare/treatments",
              },
              {
                title: "Styling",
                url: "/307-362/haircare/styling",
              },
              {
                title: "Hair Brushes & Tools",
                url: "/307-372/haircare/hair-brushes-tools",
              },
              {
                title: "Haircare Sets",
                url: "/306-571-879/toiletries/haircare/haircare-sets",
              },
              {
                title: "Bestsellers",
                url: "/773-774/bestsellers/bestsellers", // ???
              },
              {
                title: "Offers",
                url: "/313-870/sale/haircare-sale",
              },
            ],
          },
          {
            title: "Bubble Bath",
            url: "/306-342/toiletries/bubble-bath",
          },
          {
            title: "Shower",
            url: "/306-343/toiletries/shower",
          },
          {
            title: "Body Sprays & Mist",
            url: "/306-352/toiletries/body-sprays-mist",
          },
          {
            title: "Face Masks",
            url: "/306-347/toiletries/face-masks",
          },
          {
            title: "Foot Care",
            url: "/306-348/toiletries/foot-care",
          },
          {
            title: "Aromatherapy",
            url: "/306-949/toiletries/aromatherapy",
          },
          {
            title: "Kids Toiletries",
            url: "/306-353/toiletries/kids-toiletries",
          },
          {
            title: "Mens Toiletries",
            url: "/306-927/toiletries/mens-toiletries",
          },
          {
            title: "Sets",
            url: "/306-930/toiletries/toiletries-sets",
          },
          {
            title: "Bestsellers",
            url: "/773-774/bestsellers/bestsellers", // ???
          },
          {
            title: "Offers",
            url: "/313-663/sale/toiletries-sale",
          },
        ],
      },
      {
        title: "Fashion",
        children: [
          {
            title: "All Fashion",
            url: "/855/fashion",
          },
          {
            title: "Brands",
            url: "/855-1124/fashion/brands",
          },
          {
            title: "Bags & Purses",
            url: "/855-725/fashion/bags-purses",
          },
          {
            title: "Nightwear",
            url: "/855-473/fashion/nightwear",
          },
          {
            title: "Womenswear",
            url: "/855-434/fashion/womenswear",
          },
          {
            title: "Shapewear",
            children: [
              {
                title: "All Shapewear",
                url: "/855-1053/fashion/shapewear",
              },
              {
                title: "Light Control",
                url: "/855-1053-1054/fashion/shapewear/light-control",
              },
              {
                title: "Medium Control",
                url: "/855-1053-1055/fashion/shapewear/medium-control",
              },
              {
                title: "Firm Control",
                url: "/855-1053-1056/fashion/shapewear/firm-control",
              },
            ],
          },
          {
            title: "Lingerie",
            url: "/855-481/fashion/lingerie",
          },
          {
            title: "Jewellery",
            children: [
              {
                title: "All Jewellery",
                url: "/855-491/fashion/jewellery",
              },
              {
                title: "Necklaces",
                url: "/308-385/jewellery-watches/necklaces",
              },
              {
                title: "Earrings",
                url: "/308-386/jewellery-watches/earrings",
              },
              {
                title: "Bracelets",
                url: "/308-387/jewellery-watches/bracelets",
              },
              {
                title: "Rings",
                url: "/308-388/jewellery-watches/rings",
              },
              {
                title: "Sets",
                url: "/308-390/jewellery-watches/jewellery-sets",
              },
              {
                title: "Offers",
                url: "/313-535/sale/jewellery-sale", // ???
              },
            ],
          },
          {
            title: "Accessories",
            url: "/855-616/fashion/accessories",
          },
          {
            title: "Watches",
            url: "/855-492/fashion/watches",
          },
          {
            title: "Footwear",
            url: "/855-474/fashion/footwear",
          },
          {
            title: "Offers",
            url: "/313-485/sale/fashion-sale",
          },
        ],
      },
      {
        title: "Home & Gifts",
        children: [
          {
            title: "All Home & Gifts",
            url: "/310/home-gifts",
          },
          {
            title: "Gifts",
            url: "/310-600/home-gifts/gifts",
          },
          {
            title: "Home Fragrance",
            url: "/310-465/home-gifts/home-fragrance",
          },
          {
            title: "Home Accessories",
            url: "/310-399/home-gifts/home-accessories",
          },
          {
            title: "Kitchen",
            url: "/310-642/home-gifts/kitchen",
          },
          {
            title: "Bestsellers",
            url: "/773-774/bestsellers/bestsellers", // ???
          },
          {
            title: "Offers",
            url: "/313-487/sale/home-gift-sale/",
          },
        ],
      },
      {
        title: "Kids",
        children: [
          {
            title: "All Kids",
            url: "/311/kids",
          },
          {
            title: "Boys",
            url: "/311-404/kids/boys",
          },
          {
            title: "Girls",
            url: "/311-403/kids/girls",
          },
          {
            title: "Toiletries",
            url: "/311-405/kids/toiletries",
          },
          {
            title: "Branded",
            url: "/311-640/kids/branded",
          },
          {
            title: "Bestsellers",
            url: "/773-774/bestsellers/bestsellers", // ???
          },
          {
            title: "Offers",
            url: "/313-498/sale/kids-sale",
          },
        ],
      },
      {
        title: "Men",
        children: [
          {
            title: "All Men",
            url: "/312/men",
          },
          {
            title: "Fragrance",
            url: "/312-407/men/fragrance",
          },
          {
            title: "Grooming",
            url: "/312-410/men/grooming",
          },
          {
            title: "Toiletries",
            url: "/312-411/men/toiletries",
          },
          {
            title: "Bestsellers",
            url: "/773-774/bestsellers/bestsellers", // ???
          },
          {
            title: "Offers",
            url: "/special-offers/", // ???
          },
        ],
      },
    ],
  },

  {
    title: "Mother's Day",
    url: "/1089/mothers-day",
  },

  {
    title: "What's New",
    url: "/655/whats-new",
  },

  {
    title: "Bestsellers",
    url: "/773/bestsellers",
  },

  {
    title: "Brochure",
    url: "/brochure/",
  },

  {
    custom:
      '<div class="MobileNav_linkHeading"><a href="/customer/logon/">Customer Sign in / Register</a></div>',
  },

  {
    custom:
      '<div class="MobileNav_linkHeading"><a href="/manager/representative/">Rep Sign in / Register</a></div>',
  },
];
