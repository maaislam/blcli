const products = [
  {
    name: 'No7 Protect & Perfect Intense Advanced Moisturising Body Serum 200ml',
    sku: '10286753',
    entSKU: '2441523',
    url: 'https://www.boots.com/no7-proftect-perfect-advanced-moisturising-body-serum-200ml-10286753',
    image:
      'https://boots.scene7.com/is/image/Boots/10286753?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548',
    hasColours: false,
  },
  {
    name: 'No7 Protect & Perfect Intense Advanced Eye Cream 15ml',
    sku: '10288490',
    entSKU: '2457018',
    url: 'https://www.boots.com/no7-bestsellers/no7-protect-perfect-advanced-eye-cream-15ml-10288362',
    image:
      'https://boots.scene7.com/is/image/Boots/10288362?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548',
    hasColours: false,
  },
  {
    name: 'No7 Trio Warm Suede Eyeshadow Palette',
    sku: '10300838006',
    url: 'https://www.boots.com/no7-trio-eyeshadow-palette-10300838',
    image:
      'https://boots.scene7.com/is/image/Boots/10300838006H?defaultImage=10300838006H1&wid=504&hei=548',
    hasColours: true,
  },
  {
    name: 'No7 Stay Perfect Matte Fixing Mist 100ml',
    sku: '10274908',
    entSKU: '2350924',
    url: 'https://www.boots.com/no7-stay-perfect-matte-fixing-mist-100ml-10274908',
    image:
      'https://boots.scene7.com/is/image/Boots/10274908?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: false,
  },
  {
    name: 'No7 Protect & Perfect Intense Advanced Dual Action Cleansing Water 200ml',
    sku: '10289603',
    entSKU: '2470971',
    url: 'https://www.boots.com/no7-protect-and-perfect-intense-advanced-cleansing-water-200ml-10289603',
    image:
      'https://boots.scene7.com/is/image/Boots/10289603?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548',
    hasColours: false,
  },
  {
    name: 'No7 Laboratories Line Correcting Booster Serum 15ml',
    sku: '10245892',
    entSKU: '2113463',
    url: 'https://www.boots.com/no7-laboratories-line-correcting-booster-serum-15ml-10245892',
    image:
      'https://boots.scene7.com/is/image/Boots/10245892?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548',
    hasColours: false,
  },
  {
    name: 'No7 Flawless Finishing Translucent Pressed Powder 10g',
    sku: '10300816001',
    url: 'https://www.boots.com/no7-flawless-finishing-pressed-powder-10g-10300816',
    image:
      'https://boots.scene7.com/is/image/Boots/10300816001H?defaultImage=10300816001H&layer=comp&fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: true,
  },
  {
    name: 'No7 HydraLuminous Water Surge Gel Cream Drier Skin',
    sku: '10261521',
    entSKU: '2239936',
    url: 'https://www.boots.com/no7-hydraluminous-water-surge-gel-cream-10261521',
    image:
      'https://boots.scene7.com/is/image/Boots/10261521?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: false,
  },
  {
    name: 'No7 Powder Brush',
    sku: '10252147',
    entSKU: '2155092',
    url: 'https://www.boots.com/no7-powder-brush-10252147p',
    image:
      'https://boots.scene7.com/is/image/Boots/10252147?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: false,
  },
  {
    name: 'No7 Moisture Drench Lipstick',
    sku: '10217579',
    url: 'https://www.boots.com/no7-match-made-moisture-drench-lipstick-3-8g-10217579',
    image:
      'https://boots.scene7.com/is/image/Boots/10217579?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: true,
  },
  {
    name: 'No7 Skin Illuminator Nude 30ml',
    sku: '10203463',
    url: 'https://www.boots.com/no7-skin-illuminator-30ml-10203463',
    image:
      'https://boots.scene7.com/is/image/Boots/10203463?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: true,
  },
  {
    name: 'No7 Protect & Perfect Intense Advanced Day Cream 50ml',
    sku: '10288482',
    entSKU: '2457554',
    url: 'https://www.boots.com/protect-perfect-advanced-day-cream-50ml-10288482',
    image:
      'https://boots.scene7.com/is/image/Boots/10288482?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: false,
  },
  {
    name: 'No7 HydraLuminous Overnight Recovery Gel Cream',
    sku: '10261525',
    entSKU: '2239944',
    url: 'https://www.boots.com/no7-hydraluminous-overnight-recovery-gel-cream-10261525',
    image:
      'https://boots.scene7.com/is/image/Boots/10261525?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: false,
  },
  {
    name: 'No7 Brown Eyebrow Sculpting Pencil',
    sku: '10294027',
    url: 'https://www.boots.com/no7-eyebrow-sculpting-pencil-10294027',
    image:
      'https://boots.scene7.com/is/image/Boots/10294027003H?defaultImage=10294027003H&layer=comp&fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: true,
  },
  {
    name: 'No7 Lip & Cheek Tint Dusk Pink',
    sku: '10293575',
    url: 'https://www.boots.com/no7-lip-and-cheek-tint-10293575',
    image:
      'https://boots.scene7.com/is/image/Boots/10293575003H?defaultImage=10293575003H&layer=comp&fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: true,
  },
  {
    name: 'No7 Advanced Retinol 1.5% Complex Night Concentrate',
    sku: '10273192',
    entSKU: '2338494',
    url: 'https://www.boots.com/no7-advanced-retinol-1-5-percent-complex-night-concentrate-10273192',
    image:
      'https://boots.scene7.com/is/image/Boots/10273192?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: false,
  },
  {
    name: 'No7 Gel Finish Nail Colour Pillarbox',
    sku: '10203018012',
    url: 'https://www.boots.com/no7-gel-finish-nail-colour-10203018',
    image:
      'https://boots.scene7.com/is/image/Boots/10203018012H?defaultImage=10203018012H&layer=comp&fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: true,
  },
  {
    name: 'No7 Stay Perfect Ultra Mascara Black',
    sku: '10266471',
    url: 'https://www.boots.com/no7-stay-perfect-ultra-mascara-10266471-',
    image:
      'https://boots.scene7.com/is/image/Boots/10266471?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: true,
  },
  {
    name: 'No7 HydraLuminous Eye Hydrator',
    sku: '10279889',
    entSKU: '2395964',
    url: 'https://www.boots.com/no7-hydraluminous-eye-hydrator-10279889',
    image:
      'https://boots.scene7.com/is/image/Boots/10279889?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: false,
  },
  {
    name: 'No7 Perfectly Bronzed Dual Bronzer',
    sku: '10300819',
    entSKU: '2593228',
    url: 'https://www.boots.com/No7-Perfectly-Bronzed-Dual-Bronzer-10g---10300819',
    image:
      'https://boots.scene7.com/is/image/Boots/10300819?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: false,
  },

  {
    name: 'No7 Illuminating Powder - Champagne Glow',
    sku: '10293783',
    url: 'https://www.boots.com/no7-illuminating-powder-champagne-glow-10286833',
    image:
      'https://boots.scene7.com/is/image/Boots/10286833?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: true,
  },
  {
    name: 'No7 Protect & Perfect Intense Advanced Night Cream 50ml',
    sku: '10296077',
    entSKU: '2547989',
    url: 'https://www.boots.com/no7-protect-perfect-intense-advanced-night-cream-50ml-10296077',
    image:
      'https://boots.scene7.com/is/image/Boots/10296077?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: false,
  },
  {
    name: 'No7 Stay Perfect Foundation 30ml',
    sku: '10300810',
    url: 'https://www.boots.com/no7-stay-perfect-foundation-30ml-10300810',
    image:
      'https://boots.scene7.com/is/image/Boots/10300810?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: true,
  },
  {
    name: 'No7 HydraLuminous Water Concentrate 30ml',
    sku: '10261523',
    entSKU: '2239940',
    url: 'https://www.boots.com/no7-hydraluminous-water-concentrate-10261523',
    image:
      'https://boots.scene7.com/is/image/Boots/10261523?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: false,
  },
  {
    name: 'No7 Laboratories Firming Booster Serum',
    sku: '10261999',
    entSKU: '2242442',
    url: 'https://www.boots.com/no7-laboratories-firming-booster-serum-10261999',
    image:
      'https://boots.scene7.com/is/image/Boots/10261999?fit=constrain,1&wid=504&hei=548&fmt=jpg',
    hasColours: false,
  },
];

export default products;
