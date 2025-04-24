/**
 * All category data
 */

// url /bracelets/
// recipient &recipient=her
// price current_price=Min%3aMax

// metal type ?material.lvl0=rose%20gold&material.lvl0=platinum%20and%2018ct%20yellow%20gold

export const genderSteps = {
  title: "Who are you buying for?",
  smallText: "Make it personal, tell us who you're shopping for so we can find something special to them.",
  urlPrefix: "recipient",
  options: {
    "for him": {
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/4be21928-55d8-11ed-a5bf-92d5ddf47f56",
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/25acfe80-274e-11ec-9f6f-1ea754ee6b6b",
    },
    "for her": {
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/4a1a9caa-55d8-11ed-b44f-5a9e9f2f3256",
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/6f8f1ba8-1d2d-11ec-b64f-fa5403c10596",
    },
  },
};

export const productStepsMale = {
  title: "What product are you looking for?",
  smallText: "Tell us what kind of gift you're looking for.",
  urlPrefix: "category",
  options: {
    "designer watches": {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/73b487e0-1d2d-11ec-8d14-ea5a0ce34ae4",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/4fc0894e-55d8-11ed-88da-66fcf93cafee",
      url: "https://www.ernestjones.co.uk/webstore/l/designer-watches/?recipient=him",
    },
    "luxury watches": {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/73b487e0-1d2d-11ec-8d14-ea5a0ce34ae4",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/72b8160e-55e4-11ed-b652-3e0470d609dd",
      url: "https://www.ernestjones.co.uk/webstore/l/mens-luxury-watches/",
    },
    "smart watches": {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/73b487e0-1d2d-11ec-8d14-ea5a0ce34ae4",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/5acca2d6-267d-11ec-b8e5-72eb84a77444",
      url: "https://www.ernestjones.co.uk/webstore/l/mens-smartwatches/",
    },
    'wallets': {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/bf8e00ec-2750-11ec-ab4d-063638f726da",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/56bfdc9a-55d8-11ed-acc5-92d5ddf47f56",
      url: "https://www.ernestjones.co.uk/webstore/l/mens-wallets/",
    },
    'pens': {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/bf8e00ec-2750-11ec-ab4d-063638f726da",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/54d876a8-55d8-11ed-8edf-5e39e4902aae",
      url: "https://www.ernestjones.co.uk/webstore/l/pen-gifts/",
    },
    'cufflinks': {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/acc03fb0-2751-11ec-bfc2-9a9436ac9e17",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/48313be2-55d8-11ed-929c-1ebbe2cc1514",
      url: "https://www.ernestjones.co.uk/webstore/l/mens-cufflinks/",
    },
    "tie clips": {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/acc03fb0-2751-11ec-bfc2-9a9436ac9e17",
      image: "https://d34qiagx43sg99.cloudfront.net/4763092-1490.webp",
      url: "https://www.ernestjones.co.uk/webstore/l/tie-clips/",
    },
    'rings': {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/bf8e00ec-2750-11ec-ab4d-063638f726da",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/53d083c2-55d8-11ed-8cdc-766ebe178d5e",
      url: "https://www.ernestjones.co.uk/webstore/l/mens-rings/",
    },
    'necklaces': {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/149e0312-2750-11ec-b5f9-b66f94ea0748",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/53212f76-55d8-11ed-87a2-a646d666f19e",
      url: "https://www.ernestjones.co.uk/webstore/l/mens-necklaces/",
    },
    'bracelets': {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/7052fce4-1d2d-11ec-8ac4-768dc151c833",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/5262b668-55d8-11ed-b60c-a646d666f19e",
      url: "https://www.ernestjones.co.uk/webstore/l/bracelets-mens/",
    },
  },
};

export const productStepsFemale = {
  title: "What product are you looking for?",
  smallText: "Tell us what kind of gift you're looking for.",
  urlPrefix: "category",
  options: {
    "eternity rings": {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/8318b0c2-7d2b-11ec-bbf9-36671a7beab6",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/579f28dc-55d8-11ed-97b6-5e39e4902aae",
      url: "https://www.ernestjones.co.uk/webstore/l/ladies-eternity-rings/",
    },
    "jewellery sets": {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/95ee92b2-274e-11ec-8089-1e82c039aa85",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/505c007c-55d8-11ed-bf5e-3652b632c32c",
      url: "https://www.ernestjones.co.uk/webstore/l/ladies-jewellery-sets/",
    },
    rings: {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/6d0d2d7a-1d2d-11ec-903d-ae7d9d1cc104",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/51baea0a-55d8-11ed-8f5e-a646d666f19e",
      url: "https://www.ernestjones.co.uk/webstore/l/ladies-rings/",
    },
    "engagement rings": {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/a0cd567e-1d43-11ec-8b90-2a6236253b5f",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/4f07d188-55d8-11ed-b4c5-a646d666f19e",
      url: "https://www.ernestjones.co.uk/webstore/l/ladies-engagement-rings/",
    },

    necklaces: {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/75d6e950-1d2d-11ec-9aed-768dc151c833",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/50f5adbc-55d8-11ed-80d3-a646d666f19e",
      url: "https://www.ernestjones.co.uk/webstore/l/ladies-necklaces/",
    },
    earrings: {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/6daa5f64-1d2d-11ec-b8a1-ae7d9d1cc104",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/4aac0d48-55d8-11ed-be6b-3e0470d609dd",
      url: "https://www.ernestjones.co.uk/webstore/l/ladies-earrings/",
    },
    bracelets: {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/75461218-1d2d-11ec-bacf-ae7d9d1cc104",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/4d957ec2-55d8-11ed-bbdd-3652b632c32c",
      url: "https://www.ernestjones.co.uk/webstore/l/ladies-bracelets/",
    },
    "designer watches": {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/7322fc58-1d2d-11ec-91b7-fa5403c10596",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/4c6ffdb0-55d8-11ed-b039-66fcf93cafee",
      url: "https://www.ernestjones.co.uk/webstore/l/ladies-fashion-watches/",
    },
    "luxury watches": {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/7322fc58-1d2d-11ec-91b7-fa5403c10596",
      image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/4b622650-55d8-11ed-9d4e-aa18e41ffa4a',
      url: "https://www.ernestjones.co.uk/webstore/l/ladies-watches/?select=luxury%20watches",
    },
    "smart watches": {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/7322fc58-1d2d-11ec-91b7-fa5403c10596",
      image: "https://d34qiagx43sg99.cloudfront.net/2417162-alt6-1490.webp",
      url: "https://www.ernestjones.co.uk/webstore/l/ladies-smart-watches/",
    },
    pens: {
      hsimage: "https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/c59da6be-7d2b-11ec-ad20-36671a7beab6",
      image: "https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/54d876a8-55d8-11ed-8edf-5e39e4902aae",
      url: "https://www.ernestjones.co.uk/webstore/l/pen-gifts/",
    },
  },
};

// Add price bands
export const earringpriceBand1 = {
  title: "What is your price range?",
  smallText: "We have something for every budget.",
  urlPrefix: "current_price=",
  options: {
    "all prices": {
      url: "current_price=0:9999",
    },
    "under £100": {
      url: "current_price=0:100",
    },
    "£100 - £250": {
        url: "current_price=100:250",
    },
    "£250 - £500": {
        url: "current_price=250:500",
    },
    "£500+": {
        url: "current_price=500:9999",
    },
  },
};

export const engpriceBand2 = {
  title: "What is your price range?",
  smallText: "We have something for every budget.",
  urlPrefix: "current_price=",
  options: {
    "all prices": {
        url: "current_price=0:9999",
    },
    "under £500": {
        url: "current_price=0:500",
    },
    "£500 - £1000": {
        url: "current_price=500:1000",
    },
    "£1000 - £2000": {
        url: "current_price=1000:2000",
    },
    "£2000+": {
        url: "current_price=2000:9999",
    },
  },
};

export const priceBand1 = {
  title: "What is your price range?",
  smallText: "We have something for every budget.",
  urlPrefix: "current_price=",
  options: {
    "all prices": {
        url: "current_price=0:9999",
    },
    "under £100": {
        url: "current_price=0:100",
    },
    "£100 - £250": {
        url: "current_price=100:250",
    },
    "£250 - £500": {
        url: "current_price=250:500",
    },
    "£500 - £1000": {
        url: "current_price=500:1000",
    },
    "£1000+": {
        url: "current_price=1000:9999",
    },
  },
};

export const smartpriceBand1 = {
  title: "What is your price range?",
  smallText: "We have something for every budget.",
  urlPrefix: "current_price=",
  options: {
    "all prices": {
        url: "current_price=0:9999",
    },
    "£100 - £250": {
        url: "current_price=100:250",
    },
    "£250 - £500": {
        url: "current_price=250:500",
    },
    "£500 - £1000": {
        url: "current_price=500:1000",
    },
    "£1000+": {
        url: "current_price=1000:9999",
    },
  },
};

export const priceBand2 = {
  title: "What is your price range?",
  smallText: "We have something for every budget.",
  urlPrefix: "current_price=",
  options: {
    "all prices": {
        url: "current_price=0:9999",
    },
    "under £50": {
        url: "current_price=0:50",
    },
    "£50 - £100": {
        url: "current_price=50:100",
    },
    "£100 - £250": {
        url: "current_price=100:250",
    },
    "£250 - £500": {
        url: "current_price=250:300",
    },
    "£500+": {
        url: "current_price=500:9999",
    },
  },
};

export const priceBand3 = {
  title: "What is your price range?",
  smallText: "We have something for every budget.",
  urlPrefix: "current_price=",
  options: {
    "all prices": {
        url: "current_price=0:9999",
    },
    "under £50": {
        url: "current_price=0:50",
    },
    "£50 - £100": {
        url: "current_price=50:100",
    },
    "£100+": {
        url: "current_price=100:9999"
    },
  },
};

export const priceBand4 = {
  title: "What is your price range?",
  smallText: "We have something for every budget.",
  urlPrefix: "current_price=",
  options: {
    "all prices": {
        url: "current_price=0:9999",
    },
    "under £50": {
        url: "current_price=0:50",
    },
    "£50 - £100": {
        url: "current_price=50:100",
    },
    "£100 - £250": {
        url: "current_price=100:250",
    },
    "£250+": {
        url: "current_price=250:9999",
    },
  },
};

export const priceBand5 = {
  title: "What is your price range?",
  smallText: "We have something for every budget.",
  urlPrefix: "current_price=",
  options: {
    "all prices": {
        url: "current_price=0:9999",
    },
    "under £50": {
        url: "current_price=0:50",
    },
    "£50+": {
        url: "current_price=50:9999",
    },
  },
};

export const cufflinkspriceBand6 = {
  title: "What is your price range?",
  smallText: "We have something for every budget.",
  urlPrefix: "current_price=",
  options: {
    "all prices": {
        url: "current_price=0:9999",
    },
    "under £50": {
        url: "current_price=0:50",
    },
  },
};

export const paths = {
  // for him
  "for him/designer watches": {
    step3: priceBand1,
  },
  "for him/luxury watches": {
    step3: engpriceBand2,
  },
  "for him/smart watches": {
    step3: priceBand1,
  },
  "for him/wallets": {
    step3: priceBand3,
  },
  "for him/pens": {
    step3: priceBand3,
  },
  "for him/cufflinks": {
    step3: priceBand3,
  },
  "for him/tie clips": {
    step3: priceBand3,
  },
  "for him/rings": {
    step3: priceBand1,
  },
  "for him/necklaces": {
    step3: priceBand1,
  },
  "for him/bracelets": {
    step3: priceBand2,
  },

  // for her
  "for her/jewellery sets": {
    step3: priceBand1,
  },
  "for her/rings": {
    step3: priceBand1,
  },
  "for her/eternity rings": {
    step3: engpriceBand2,
  },
  "for her/engagement rings": {
    step3: engpriceBand2,
  },
  "for her/necklaces": {
    step3: earringpriceBand1,
  },
  "for her/earrings": {
    step3: earringpriceBand1,
  },
  "for her/bracelets": {
    step3: priceBand1,
  },
  "for her/designer watches": {
    step3: smartpriceBand1,
  },
  "for her/luxury watches": {
    step3: engpriceBand2,
  },
  "for her/smart watches": {
    step3: smartpriceBand1,
  },
  "for her/pens": {
    step3: priceBand3,
  },
};
