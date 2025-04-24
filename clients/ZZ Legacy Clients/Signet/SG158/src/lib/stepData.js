
/**
 * All category data
 */

// url /bracelets/
// recipient &recipient=her
// price current_price=Min%3aMax

// metal type ?material.lvl0=rose%20gold&material.lvl0=platinum%20and%2018ct%20yellow%20gold


export const genderSteps = {
    title: "Who is it for?",
    smallText: "Make it personal, tell us who you're shopping for so we can find something special to them.",
    urlPrefix: 'recipient',
    options: {
        'for him': {
            url: 'recipient=him',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cb1c5b46-43ae-11ec-9a33-3e35ffcccd35',
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/b4bdae86-5604-11ed-afb5-5a9e9f2f3256',
        },
        'for her': {
            url: 'recipient=her',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cbef99fc-43ae-11ec-ad1d-520a881376a2',
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/abfb8b60-5604-11ed-87a2-a646d666f19e',
        },
        'unisex': {
            url: 'recipient=unisex', // or recipient=her&recipient=him
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cdfae238-43ae-11ec-8249-1aacc15da147',
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/b7e9b794-5604-11ed-b055-aa18e41ffa4a',
        }
    }
};

export const productStepsFemale = {
    title: "What product are you looking for?",
    smallText: "Tell us what kind of gift you're looking for.",
    urlPrefix: 'category',
    options: {
        'engagement rings': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/041a946e-5527-11ed-a536-d60c998883ad',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c9a34998-1247-11ec-bf2c-d6a1e28b289b',
            url: 'engagement-rings',
        },
        'jewellery sets': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/054ed200-5527-11ed-a23b-422ca487816a',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cc8aff96-43ae-11ec-836f-520a881376a2',
            url: 'jewellery-sets',
        },
        'necklaces': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/aa863a4a-5466-11ed-aaa2-9238eae704d5',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cd2eca9a-43ae-11ec-a353-1aacc15da147',
            url: 'necklaces',
        },
        'rings': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/ab19d16a-5466-11ed-a409-9238eae704d5',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cece8be4-1247-11ec-9512-7290d299527a',
            url: 'rings',
        },
        'eternity rings': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/818bf720-5abe-11ed-ba54-6633fe9a0406',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/ca5921a8-43ae-11ec-bc54-520a881376a2',
            url: 'eternity-rings',
        },
        'wedding rings': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/ac2cf672-5466-11ed-a77f-9238eae704d5',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/ca5921a8-43ae-11ec-bc54-520a881376a2',
            url: 'wedding-rings',
        },
        'watches': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/82831ed8-5abe-11ed-b884-2e423aeac077',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cc77a8e4-1247-11ec-88f8-66ebee74ba96',
            url: 'watches',
        },

        'earrings': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/030fb900-5527-11ed-81a3-d60c998883ad',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/1190bad6-25e1-11ec-b7ef-a6268594ae25',
            url: 'earrings',
        },

        'bracelets': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/810bf052-5abe-11ed-a3a0-e689a4a589a6',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/ca5921a8-43ae-11ec-bc54-520a881376a2',
            url: 'bracelets',
        },
        
    }
}

export const productStepsMale = {
    title: "What product are you looking for?",
    smallText: "Tell us what kind of gift you're looking for.",
    urlPrefix: 'category',
    options: {
        'watches': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/04a28c48-5527-11ed-a2f1-567ae04a7ab4',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cec76cc2-43ae-11ec-b9c5-520a881376a2',
            url: 'watches',
        },
        'rings': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/ac2cf672-5466-11ed-a77f-9238eae704d5',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/dd4b9184-25e4-11ec-a089-da0d6e1caf36',
            url: 'rings',
        },
        'necklaces': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/b4bdae86-5604-11ed-afb5-5a9e9f2f3256',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/54349264-25e5-11ec-b177-021eca98f9d3',
            url: 'necklaces',
        },
        'bracelets': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/b375f6c8-5604-11ed-952b-3652b632c32c',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/ddd5838a-25e4-11ec-a866-021eca98f9d3',
            url: 'bracelets',
        },
        'cufflinks': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/acc03fb0-2751-11ec-bfc2-9a9436ac9e17',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/dcbbd6ca-25e4-11ec-b22e-922bf972b09b',
            url: 'mens-cufflinks',
        },

    }
}

export const productStepsUnisex = {
    title: "What product are you looking for?",
    smallText: "Tell us what kind of gift you're looking for.",
    urlPrefix: 'category',
    options: {
        'engagement rings': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/041a946e-5527-11ed-a536-d60c998883ad',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c9a34998-1247-11ec-bf2c-d6a1e28b289b',
            url: 'engagement-rings',
        },
        'jewellery sets': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/054ed200-5527-11ed-a23b-422ca487816a',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cc8aff96-43ae-11ec-836f-520a881376a2',
            url: 'jewellery-sets',
        },
        'necklaces': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/aa863a4a-5466-11ed-aaa2-9238eae704d5',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cd2eca9a-43ae-11ec-a353-1aacc15da147',
            url: 'necklaces',
        },
        'rings': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/ac2cf672-5466-11ed-a77f-9238eae704d5',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cece8be4-1247-11ec-9512-7290d299527a',
            url: 'rings',
        },
        'watches': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/b41ea066-5604-11ed-87d1-1ebbe2cc1514',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cc77a8e4-1247-11ec-88f8-66ebee74ba96',
            url: 'watches',
        },
        'earrings': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/030fb900-5527-11ed-81a3-d60c998883ad',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/1190bad6-25e1-11ec-b7ef-a6268594ae25',
            url: 'earrings',
        },

        'bracelets': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/b375f6c8-5604-11ed-952b-3652b632c32c',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/ca5921a8-43ae-11ec-bc54-520a881376a2',
            url: 'bracelets',
        },
    }
}

export const watchType = {
    title: 'Choose a Watch Type',
    smallText: "Tell us what kind of watch type you're looking for.",
    isMultiple: true,
    urlPrefix: 'strap+material',
    options: {
        'All watches': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9A5BE918481637BF3ABA6124C16340EE88066BC18AF3666816527612E8321E75.jpg?meta=/SG096---Homepage-Gift-Finder/metal.jpg',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/d03ec976-1247-11ec-9af3-66fcc1f0fdf6',
            url: 'watches',
        },
        'luxury': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9A5BE918481637BF3ABA6124C16340EE88066BC18AF3666816527612E8321E75.jpg?meta=/SG096---Homepage-Gift-Finder/metal.jpg',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c74b6a22-1247-11ec-ad05-66fcc1f0fdf6',
            url: 'luxury-watches',
        },
        'fashion': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/69573E6C4242DA4160AC028781044A82FD46C5F15661A3EB4E8F9A9ACAC83BE7.jpg?meta=/SG096---Homepage-Gift-Finder/leather.jpg',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cacce838-1247-11ec-be7f-f63fdd00f973',
            url: 'designer-watches',
        },
        'smart': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/69573E6C4242DA4160AC028781044A82FD46C5F15661A3EB4E8F9A9ACAC83BE7.jpg?meta=/SG096---Homepage-Gift-Finder/leather.jpg',
            image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/5acca2d6-267d-11ec-b8e5-72eb84a77444',
            url: 'smartwatches',
        },
    }
}
export const HSwatchType = {
    title: 'Choose a Watch Type',
    smallText: "Tell us what kind of watch type you're looking for",
    isMultiple: true,
    urlPrefix: 'watchtype',
    options: {
        'fashion': {
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/721b6a16-1d2d-11ec-95ee-ae7d9d1cc104',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/69573E6C4242DA4160AC028781044A82FD46C5F15661A3EB4E8F9A9ACAC83BE7.jpg?meta=/SG096---Homepage-Gift-Finder/leather.jpg',
            url: 'watches',
        },
        'smart': { 
            hsimage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/70f9d05a-1d2d-11ec-b622-fa5403c10596',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/69573E6C4242DA4160AC028781044A82FD46C5F15661A3EB4E8F9A9ACAC83BE7.jpg?meta=/SG096---Homepage-Gift-Finder/leather.jpg',
            url: 'activity-tracker-smartwatches',
        },
    }
}

export const metalType = {
    title: "Choose a Metal Type",
    smallText: "Tell us what metal type you're looking for.",
    isMultiple: true,
    urlPrefix: 'material',
    options: {
        'All': {
            url: 'material.lvl0=',
        },
        'Yellow Gold': {
            url: 'material.lvl0=yellow%20gold',
        },
        'Rose Gold': {
            url: 'material.lvl0=rose%20gold',
        },
        'White Gold': {
            url: 'material.lvl0=white%20gold',
        },
        'Platinum': {
            url: 'material.lvl0=platinum',
        },
        'Silver': {
            url: 'material.lvl0=all%20silver',
        },
        'Two Tone Gold': {
            url: 'material.lvl0=two%20colour%20gold',
        },
        'Palladium': {
            url: 'material.lvl0=palladium',
        },
        'Titanium': {
            url: 'material.lvl0=titanium',
        },
        'Stainless Steel': {
            url: 'material.lvl0=stainless%20steel',
        },
    }
}

export const metalTypeEngagementAndEarrings = {
    title: "Choose a Metal Type",
    smallText: "Tell us what metal type you're looking for.",
    isMultiple: true,
    urlPrefix: 'material',
    options: {
        'All Metals': {
            url: 'material.lvl0=',
        },
        'Yellow Gold': {
            url: 'material.lvl0=yellow%20gold',
        },
        'Rose Gold': {
            url: 'material.lvl0=rose%20gold',
        },
        'White Gold': {
            url: 'material.lvl0=white%20gold',
        },
        'Platinum': {
            url: 'material.lvl0=platinum',
        },
        'Silver': {
            url: 'material.lvl0=all%20silver',
        },
        'Two Tone Gold': {
            url: 'material.lvl0=two%20colour%20gold',
        },
    }
}

export const necklaceMetal = {
    title: "Choose a Metal Type",
    smallText: "Tell us what metal type you're looking for.",
    isMultiple: true,
    urlPrefix: 'material',
    options: {
        'All Metals': {
            url: 'material.lvl0=',
        },
        'Yellow Gold': {
            url: 'material.lvl0=yellow%20gold',
        },
        'Rose Gold': {
            url: 'material.lvl0=rose%20gold',
        },
        'White Gold': {
            url: 'material.lvl0=white%20gold',
        },
        'Platinum': {
            url: 'material.lvl0=platinum',
        },
        'Silver': {
            url: 'material.lvl0=all%20silver',
        },
        'Two Tone Gold': {
            url: 'material.lvl0=two%20colour%20gold',
        },
        'Stainless Steel': {
            hsimage: '',
            image: '',
            url: 'material.lvl0=stainless%20steel',
        },
        'Rhodium Plated': {
            hsimage: '',
            image: '',
            url: 'material.lvl0=rhodium%20plated',
        },
    }
}

export const braceletMetal = {
    title: "Choose a Metal Type",
    smallText: "Tell us what metal type you're looking for.",
    isMultiple: true,
    urlPrefix: 'material',
    options: {
        'metal': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9A5BE918481637BF3ABA6124C16340EE88066BC18AF3666816527612E8321E75.jpg?meta=/SG096---Homepage-Gift-Finder/metal.jpg',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9A5BE918481637BF3ABA6124C16340EE88066BC18AF3666816527612E8321E75.jpg?meta=/SG096---Homepage-Gift-Finder/metal.jpg',
            url: 'material.lvl0=all%20silver&material.lvl0=gold%20tone&material.lvl0=rhodium%20plated&material.lvl0=rose%20gold&material.lvl0=silver%20%26%20yellow%20gold%20plated&material.lvl0=stainless%20steel&material.lvl0=yellow%20gold%20plated%20silver&material.lvl0=yellow%20gold&material.lvl0=white%20gold&material.lvl0=two%20colour%20gold%20plated&material.lvl0=two%20colour%20gold&material.lvl0=tri%20tone&material.lvl0=three%20colour%20gold&material.lvl0=sterling%20silver',
        },
        'leather': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/69573E6C4242DA4160AC028781044A82FD46C5F15661A3EB4E8F9A9ACAC83BE7.jpg?meta=/SG096---Homepage-Gift-Finder/leather.jpg',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/69573E6C4242DA4160AC028781044A82FD46C5F15661A3EB4E8F9A9ACAC83BE7.jpg?meta=/SG096---Homepage-Gift-Finder/leather.jpg',
            url: 'material.lvl0=leather',
        },
    }
}

export const earringpriceBand1 = {
    title: "What is your price range?",
    smallText: "We have something for every budget.",
    urlPrefix: 'current_price=',
    options: {
        'all prices': {
            url: '0%3a09999',
        },
        'under £100': {
            url: '0%3a100',
        },
        '£100 - £250': {
            url: '100%3a250',
        },
        '£250 - £500': {
            url: '250%3a500',
        },
        '£500+': {
            url: '500%3a9999',
        },
    }
}

export const engpriceBand2 = {
    title: "What is your price range?",
    smallText: "We have something for every budget.",
    urlPrefix: 'current_price=',
    options: {
        'all prices': {
            url: '0%3a9999',
        },
        'under £500': {
            url: '0%3a500',
        },
        '£500 - £1000': {
            url: '500%3a1000',
        },
        '£1000 - £2000': {
            url: '1000%3a2000',
        },
        '£2000+': {
            url: '2000%3a9999',
        }
    }
}

export const priceBand1 = {
    title: "What is your price range?",
    smallText: "We have something for every budget.",
    urlPrefix: 'current_price=',
    options: {
        'all prices': {
            url: '0%3a9999',
        },
        'under £100': {
            url: '0%3a100',
        },
        '£100 - £250': {
            url: '100%3a250',
        },
        '£250 - £500': {
            url: '250%3a500',
        },
        '£500 - £1000': {
            url: '500%3a1000',
        },
        '£1000+': {
            url: '1000%3a9999',
        }
    }
}

export const priceBand2 = {
    title: "What is your price range?",
    smallText: "We have something for every budget.",
    urlPrefix: 'current_price=',
    options: {
        'all prices': {
            url: '0%3a9999',
        },
        'under £50': {
            url: '0%3a50',
        },
        '£50 - £100': {
            url: '50%3a100',
        },
        '£100 - £250': {
            url: '100%3a250',
        },
        '£250 - £500': {
            url: '250%3a500',
        },
        '£500+': {
            url: '500%3a9999',
        }
    }
};

export const priceBand3 = {
    title: "What is your price range?",
    smallText: "We have something for every budget.",
    urlPrefix: 'current_price=',
    options: {
        'all prices': {
            url: '0%3a9999',
        },
        'under £50': {
            url: '0%3a50',
        },
        '£50 - £100': {
            url: '50%3a100',
        },
        '£100+': {
            url: '100%3a9999',
        }
    }
}

export const HSRingspriceBand3 = {
    title: "What is your price range?",
    smallText: "We have something for every budget.",
    urlPrefix: 'current_price=',
    options: {
        'all prices': {
            url: '0%3a9999',
        },
        'under £100': {
            url: '0%3a100',
        },
        '£100 - £250': {
            url: '100%3a250',
        },
        '£250 - £500': {
            url: '250%3a500',
        },
        '£500+': {
            url: '500%3a9999',
        }
    }
}

export const priceBand4 = {
    title: "What is your price range?",
    smallText: "We have something for every budget.",
    urlPrefix: 'current_price=',
    options: {
        'all prices': {
            url: '0%3a9999',
        },
        'under £50': {
            url: '0%3a50',
        },
        '£50 - £100': {
            url: '50%3a100',
        },
        '£100 - £250': {
            url: '100%3a250',
        },
        '£250+': {
            url: '250%3a9999',
        }
    }
}

export const priceBand5 = {
    title: "What is your price range?",
    smallText: "We have something for every budget.",
    urlPrefix: 'current_price=',
    options: {
        'all prices': {
            url: '0%3a9999',
        },
        'under £50': {
            url: '0%3a50',
        },
        '£50+': {
            url: '50%3a9999',
        },
    }
}

export const cufflinkspriceBand6 = {
    title: "What is your price range?",
    smallText: "We have something for every budget.",
    urlPrefix: 'current_price=',
    options: {
        'all prices': {
            url: '0%3a9999',
        },
        'under £50': {
            url: '0%3a50',
        },
    }
}

export const paths = {
    // for him
     'for him/watches': {
         step3: watchType,
         step4: engpriceBand2
     },
     'for him/rings': {
         step4: priceBand1
     },
     'for him/necklaces': {
         step3: necklaceMetal,
         step4: priceBand1
     },
     'for him/bracelets': {
         step3: braceletMetal,
         step4: priceBand2
     },
     'for him/cufflinks': {
         step4: priceBand3
     },
     // for her
     'for her/watches': {
         step3: watchType,
         step4: engpriceBand2
     },
     'for her/jewellery sets': {
         step4: priceBand3
     },
     'for her/rings': {
         step3: metalType,
         step4: priceBand1
     },
     'for her/earrings': {
         step3: metalTypeEngagementAndEarrings,
         step4: earringpriceBand1
     },
     'for her/necklaces': {
         step3: necklaceMetal,
         step4: earringpriceBand1
     },
     'for her/bracelets': {
        step3: braceletMetal,
         step4: priceBand1
     },
     'for her/engagement rings': {
         step3: metalTypeEngagementAndEarrings,
         step4: engpriceBand2
     },
     'for him/watches': {
        step3: watchType,
        step4: engpriceBand2
    }, 

    // unisex
    'unisex/engagement rings': {
        step3: metalTypeEngagementAndEarrings,
        step4: engpriceBand2
    },
    'unisex/necklaces': {
        step3: necklaceMetal,
        step4: priceBand1
    },
    'unisex/rings': {
        step3: metalType,
        step4: priceBand1
    },
    'unisex/jewellery sets': {
        step4: priceBand3
    },
    'unisex/watches': {
        step3: watchType,
        step4: engpriceBand2
    },
    'unisex/earrings': {
        step3: metalTypeEngagementAndEarrings,
        step4: earringpriceBand1
    },
    'unisex/bracelets': {
        step3: braceletMetal,
        step4: priceBand2
    },
    
};

 // HS paths as some are different
export const HSpaths = {
     'for him/watches': {
         step3: HSwatchType,
         step4: priceBand2
     },
     'for him/rings': {
         step4: HSRingspriceBand3
     },
     'for him/necklaces': {
        step3: necklaceMetal,
         step4: priceBand2
     },
     'for him/bracelets': {
         step4: priceBand3
     },
     'for him/cufflinks': {
         step4: cufflinkspriceBand6
     },
     'for her/watches': {
         step3: HSwatchType,
         step4: priceBand2
     },
     'for her/jewellery sets': {
         step4: priceBand3
     },
     'for her/rings': {
         step3: metalType,
         step4: HSRingspriceBand3
     },
     'for her/earrings': {
         step4: priceBand1
     },
     'for her/necklaces': {
         step3: necklaceMetal,
         step4: HSRingspriceBand3
     },
     'for her/bracelets': {
         step4: priceBand2
     },

     'for her/wedding rings': {
        step3: metalType,
        step4: HSRingspriceBand3
    },
     
     'for her/engagement rings': {
         step3: metalTypeEngagementAndEarrings,
         step4: priceBand1
     },
     'for her/eternity rings': {
         step4: priceBand1
     },
      // unisex
    'unisex/engagement rings': {
        step3: metalTypeEngagementAndEarrings,
        step4: priceBand1
    },
    'unisex/necklaces': {
        step3: necklaceMetal,
        step4: HSRingspriceBand3
    },
    'unisex/rings': {
        step3: metalType,
         step4: HSRingspriceBand3
    },
    'unisex/jewellery sets': {
        step4: priceBand3
    },
    'unisex/watches': {
        step3: HSwatchType,
         step4: priceBand2
    },
    'unisex/earrings': {
        step4: priceBand1
    },
    'unisex/bracelets': {
        step3: braceletMetal,
        step4: priceBand2
    },
};