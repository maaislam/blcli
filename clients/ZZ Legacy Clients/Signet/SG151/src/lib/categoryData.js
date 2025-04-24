import { getClientID, getSiteFromHostname, mostViewedCategory } from "./helpers";




const getBrandLink = () => {
    
    let brandName;
    let brandLink;
    let brandImage;
    let stored;

    if(getSiteFromHostname() === 'ernestjones') {
        stored = 'EJbrand151';
    } else {
        stored = 'HSbrand151';
    }

    if(localStorage.getItem(stored)) {
        const brandsViewed = JSON.parse(localStorage.getItem(stored));
        const lastViewed = brandsViewed[brandsViewed.length - 1];

        // check if last viewed contains one of prestige brands
        if(lastViewed === 'Tag Heuer') {
            brandName = 'Tag Heuer';
            brandImage = 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/d03ec976-1247-11ec-9af3-66fcc1f0fdf6',
            brandLink = 'https://www.ernestjones.co.uk/webstore/l/tag-heuer-watches/?icid=ej-tn-watches-image-tag'
        } else if(lastViewed === 'Breitling') {
            brandName = 'Breitling';
            brandImage = 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c74b6a22-1247-11ec-ad05-66fcc1f0fdf6',
            brandLink = 'https://www.ernestjones.co.uk/webstore/l/breitling-watches/?icid=ej-tn-watches-image-breitling'
        } else if(lastViewed === 'Omega') {
            brandName = 'Omega';
            brandImage = 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/ce3f1a7c-1247-11ec-888f-42f538766d30',
            brandLink = 'https://www.ernestjones.co.uk/webstore/l/omega-watches/?icid=ej-tn-watches-image-omega'
        } else if(lastViewed === 'Longines') {
            brandName = 'Longines';
            brandImage = 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cbe63c10-1247-11ec-bd28-7290d299527a',
            brandLink = 'https://www.ernestjones.co.uk/webstore/l/longines-watches/?icid=ej-tn-watches-lux-longines'
        } else if(lastViewed === 'Cartier') {
            brandName = 'Cartier';
            brandImage = 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c888887a-1247-11ec-88ce-f63fdd00f973',
            brandLink = 'https://www.ernestjones.co.uk/webstore/l/cartier-watches/?icid=ej-tn-watches-lux-cartier'
        } else if(lastViewed === 'Tudor') {
            brandName = 'Tudor';
            brandImage = 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/d0d4bf6c-1247-11ec-b51a-7290d299527a',
            brandLink = 'https://www.ernestjones.co.uk/webstore/content/tudor/?icid=ej-tn-watches-lux-tudor'
        }  

    } else {
        // default to Omega
        brandName = 'Omega';
        brandImage = 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/ce3f1a7c-1247-11ec-888f-42f538766d30',
        brandLink = 'https://www.ernestjones.co.uk/webstore/l/omega-watches/?icid=ej-tn-watches-image-omega'
        
    }

    const brandObj = {
        name:  brandName,
        image: brandImage,
        link: brandLink
    };

    return brandObj;

}

const getGender = () => {
    let genderName;
    let genderLink;
    let genderImage;

    if(localStorage.getItem(`${getClientID()}-gender`)){
        if(localStorage.getItem(`${getClientID()}-gender`) === 'female') {
            genderName = 'Watches for Her';
            genderLink = 'https://www.ernestjones.co.uk/webstore/l/luxury-watches/?recipient=her';
            genderImage = 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cc77a8e4-1247-11ec-88f8-66ebee74ba96';
        } else if(localStorage.getItem(`${getClientID()}-gender`) === 'male') {
            genderName = 'Watches for Him';
            genderLink = 'https://www.ernestjones.co.uk/webstore/l/mens-luxury-watches/';
            genderImage = 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cd0de7b4-1247-11ec-991c-66fcc1f0fdf6';
        }
    } else {
        genderName = 'All Luxury Watches';
        genderLink = 'https://www.ernestjones.co.uk/webstore/l/luxury-watches/?icid=ej-tn-watches-coll-lux';
        genderImage = 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c7fa70c6-1247-11ec-8e7a-42f538766d30';
    }

    const genderObj = {
        name:  genderName,
        image: genderImage,
        link: genderLink,
    };

    return genderObj;
}

const brand = getBrandLink();
const gender = getGender();

const EJcatData = {
    'fashion-watches': {
        tileBanners: {
            largeBanner: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cacce838-1247-11ec-be7f-f63fdd00f973',
                title1: 'Watches For Him',
                link1: 'https://www.ernestjones.co.uk/webstore/l/mens-watches/?icid=ej-tn-watches-coll-him',
                title2: 'Watches For Her',
                link2: 'https://www.ernestjones.co.uk/webstore/l/ladies-watches/?icid=ej-tn-watches-coll-her',
            },
            smallBanner1: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c7fa70c6-1247-11ec-8e7a-42f538766d30',
                title: 'Luxury Watches',
                link: 'https://www.ernestjones.co.uk/webstore/l/luxury-watches/?icid=ej-tn-watches-coll-lux',
             },
            smallBanner2: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cfc5a7bc-1247-11ec-ab0b-9e2aa3524bb1',
                title: 'Sale Watches',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches-sale/?icid=ej-tn-watches-coll-sale',
            },
            textBanner: {
                title: '0% Interest Free Finance Available',
                link: '',
            },
        },

        ctaBanners: {
            leftImage: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/d3e602c8-148c-11ec-b421-2a0569d0ffe3',
            rightImage: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/d34fb7b4-148c-11ec-b2a3-2a0569d0ffe3',
            categories: {
                'Watches for Him': {
                    link: '/webstore/watches.do?icid=ej-tn-watches-coll-all',
                },
                'Watches for Her': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/ladies-watches/?icid=ej-tn-watches-coll-her',
                },
                'New In Watches': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/watches-new/?icid=ej-tn-watches-coll-ne',
                },
                'Sale Watches': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/watches-sale/?icid=ej-tn-watches-coll-sale',
                },
                'Fashion Watches': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/watches/',
                },
                'Luxury Watches': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/luxury-watches/?icid=ej-tn-watches-coll-lux',
                }
            },
        }

    },
    'prestige-watches': { 
        tileBanners: {
            largeBanner: {
                image: gender.image,
                title1: gender.name,
                link1: gender.link,
            },
            smallBanner1: {
                image: brand.image,
                title: brand.name,
                link: brand.link,
            },
            smallBanner2: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cd97b2fa-1247-11ec-8975-66fcc1f0fdf6',
                title: 'New In Luxury Watches',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches-new/?icid=ej-tn-watches-coll-ne',
            },
            textBanner: {
                title: 'Watches Buying Guide',
                link: 'https://www.ernestjones.co.uk/webstore/guide/watch-buyers-guide/',
            },
        },

        ctaBanners: {
            leftImage: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/d0d4bf6c-1247-11ec-b51a-7290d299527a',
            rightImage: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cc77a8e4-1247-11ec-88f8-66ebee74ba96',
            categories: {
                'Luxury Watches for Him': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/mens-luxury-watches/',
                },
                'Luxury Watches for Her': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/luxury-watches/?recipient=her',
                },
                'New In Luxury Watches': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/watches-new/?icid=ej-tn-watches-coll-ne',
                },
                'Omega Watches': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/omega-watches/?icid=ej-tn-watches-image-omega',
                },
                'Breitling Watches': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/breitling-watches/?icid=ej-tn-watches-image-breitling',
                },
                'Tag Watches': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/tag-heuer-watches/?icid=ej-tn-watches-image-tag',
                }
            },
        }
    },
    'engagement-rings': {
        tileBanners: {
            largeBanner: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c9a34998-1247-11ec-bf2c-d6a1e28b289b',
                title1: 'All Engagement Rings',
                link1: 'https://www.ernestjones.co.uk/webstore/l/engagement-rings/?icid=ej-tn-engagement-all',
            },
            smallBanner1: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c68600d4-1247-11ec-8476-9e2aa3524bb1',
                title: 'Diamond Bridal Sets',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-ring-bridal-sets/?icid=ej-tn-diamonds-diamond-bridal-set',
            },
            smallBanner2: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cece8be4-1247-11ec-9512-7290d299527a',
                title: 'Sale Engagement Rings',
                link: 'https://www.ernestjones.co.uk/webstore/l/engagement-rings-sale/?icid=ej-tn-engagement-all',
            },
            textBanner: {
                title: 'Engagement Ring Buying Guide',
                link: 'https://www.ernestjones.co.uk/webstore/guide/engagement-rings-buyers-guide/?icid=ej-tn-engagement-guide',
            },
        },

        ctaBanners: {
            leftImage: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c9a34998-1247-11ec-bf2c-d6a1e28b289b',
            rightImage: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cece8be4-1247-11ec-9512-7290d299527a',
            categories: {
                'Diamond Bridal Sets': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/diamond-bridal-sets/?icid=ej-tn-engagement-diamond-bridal',
                },
                'Halo Rings': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/diamond-halo-engagement-rings/?icid=ej-tn-engagement-diamond-halo',
                },
                'Platinum Rings': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/platinum-engagement-rings/?icid=ej-tn-engagement-metal-plt',
                },
                'White Gold Rings': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/white-gold-engagement-rings/?icid=ej-tn-engagement-metal-wg',
                },
                '1 Carat Rings': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/engagement-rings/?carat_weight_range=1.00%20carat%20and%20above',
                },
                'Sale Engagement Rings': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/engagement-rings-sale/?icid=ej-tn-engagement-all',
                }
            },
        }
    },
    'wedding-rings': {
        tileBanners: {
            largeBanner: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/d1633ddc-1247-11ec-9f27-f63fdd00f973',
                title1: 'Wedding Rings For Him',
                link1: 'https://www.ernestjones.co.uk/webstore/l/mens-wedding-rings/',
                title2: 'Wedding Rings For Her',
                link2: 'https://www.ernestjones.co.uk/webstore/l/ladies-wedding-rings/',
            },
            smallBanner1: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c5efe270-1247-11ec-9cac-f63fdd00f973',
                title: 'Buy 2 Save 20%',
                link: 'https://www.ernestjones.co.uk/webstore/l/wedding-rings/',
            },
            smallBanner2: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/ca3dce64-1247-11ec-9b44-9e2aa3524bb1',
                title: 'Eternity Rings',
                link: 'https://www.ernestjones.co.uk/webstore/l/eternity-diamond-rings/?icid=ej-tn-diamonds-diamond-eternity',
            },
            textBanner: {
                title: 'Wedding Ring Buying Guide',
                link: 'https://www.ernestjones.co.uk/webstore/wedding-ring-buyers-guide.cdo',
            },
        },

        ctaBanners: {
            leftImage: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c68600d4-1247-11ec-8476-9e2aa3524bb1',
            rightImage: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/d1633ddc-1247-11ec-9f27-f63fdd00f973',
            
            categories: {
                'Ladies Wedding Rings': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/ladies-wedding-rings/',
                },
                'Mens Wedding Rings': {
                    link: '/https://www.ernestjones.co.uk/webstore/l/mens-wedding-rings/',
                },
                'Sale Rings': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/wedding-rings-sale/',
                },
                'Eternity Rings': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/eternity-rings/',
                },
            },
           
        }
    },
    'jewellery': {
        tileBanners: {
            largeBanner: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c91658b2-1247-11ec-9782-66ebee74ba96',
                title1: 'Diamond Jewellery',
                link1: 'https://www.ernestjones.co.uk/webstore/l/diamonds/',
            },
            smallBanner1: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cb6103ec-1247-11ec-bbaa-9e2aa3524bb1',
                title: 'Gold Jewellery',
                link: 'https://www.ernestjones.co.uk/webstore/l/jewellery-yellow-gold/',
            },
            smallBanner2: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/cf4c3792-1247-11ec-8163-42f538766d30',
                title: 'Sale Jewellery',
                link: 'https://www.ernestjones.co.uk/webstore/l/jewellery-sale/',
            },
            textBanner: { 
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/40dc1794-1494-11ec-a59c-c2533985f8c2',
                link: 'https://www.ernestjones.co.uk/webstore/l/gucci-jewellery/?ici=ej-jp-tm',
            },
        },

        ctaBanners: {
            leftImage: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/d88c4a70-1492-11ec-a1c0-7277d476d000',
            rightImage: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c91658b2-1247-11ec-9782-66ebee74ba96',
            categories: {
                'Diamond Jewellery': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/diamonds/',
                },
                'Gold Jewellery': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/jewellery-yellow-gold/',
                },
                'Rings': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/rings/',
                },
                'Necklaces': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/necklaces/',
                },
                'Earrings': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/earrings-jewellery/',
                },
                'Bracelets': {
                    link: 'https://www.ernestjones.co.uk/webstore/l/bracelets/',
                }
            },
          
        }
    },
}

const HScatData = {
    'fashion-watches': {
        tileBanners: {
            largeBanner: {
                image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/20ec08e8-1d2e-11ec-ba63-fa5403c10596',
                title1: 'Watches For Him',
                link1: 'https://www.hsamuel.co.uk/webstore/l/mens-watches/',
                title2: 'Watches For Her',
                link2: 'https://www.hsamuel.co.uk/webstore/l/womens-watches/',
            },
            smallBanner1: {
                image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/70f9d05a-1d2d-11ec-b622-fa5403c10596',
                title: 'Smartwatches',
                link: '/webstore/watches/SmartWatches.cdo?icid=hs-nv-watches-smart',
            },
            smallBanner2: {
                image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/0b6f32e8-1d37-11ec-89f9-3e4b23c4fb1d',
                title: 'Swiss Watches',
                link: '/webstore/l/watches/brand%7Calpina%7Chamilton%7Ctissot/?icid=hs-nv-watches-collection-swiss-watches',
            },
            textBanner: {
                title: 'Talk to a trend expert | Book an in-store appointment',
                linkText: 'Book now',
                link: 'https://www.hsamuel.co.uk/webstore/content/appointment-booking/?icid=hs-hp-appointments-text-tile',
            },
           
        },

        ctaBanners: {
            leftImage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/7322fc58-1d2d-11ec-91b7-fa5403c10596',
            rightImage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/73b487e0-1d2d-11ec-8d14-ea5a0ce34ae4',
            categories: {
                
                'Watches For Him': {
                    link: '/webstore/l/mens-watches/',
                },
                'Watches For Her': {
                    link: '/webstore/l/womens-watches/',
                },
                'Smartwatches': {
                    link: '/webstore/watches/SmartWatches.cdo?icid=hs-nv-watches-smart',
                },
                'Swiss Watches': {
                    link: '/webstore/l/watches/brand%7Calpina%7Chamilton%7Ctissot/?icid=hs-nv-watches-collection-swiss-watches',
                },
            },
        }

    },
   
    'engagement-rings': {
        tileBanners: {
            largeBanner: {
                image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/74c8d1a4-1d2d-11ec-bb83-ae7d9d1cc104',
                title1: 'Engagement rings',
                link1: 'https://www.hsamuel.co.uk/webstore/l/engagement-rings/?icid=hs-nv-engagement-rings',
            },
            smallBanner1: {
                image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/6d0d2d7a-1d2d-11ec-903d-ae7d9d1cc104',
                title: 'Diamond rings',
                link: 'https://www.hsamuel.co.uk/webstore/l/diamond-engagement-rings/',
            },
            smallBanner2: {
                image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/718fd53c-1d2d-11ec-a50e-ae7d9d1cc104',
                title: 'Solitaire rings',
                link: 'https://www.hsamuel.co.uk/webstore/l/solitaire-engagement-rings/',
            },
            textBanner: {
                title: 'Shop White gold rings',
                linkText: 'Shop now',
                link: 'https://www.hsamuel.co.uk/webstore/l/white-gold-engagement-rings/?icid=hs-nv-engagement-white',
            },
        },

        ctaBanners: {
            leftImage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/6d0d2d7a-1d2d-11ec-903d-ae7d9d1cc104',
            rightImage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/a0cd567e-1d43-11ec-8b90-2a6236253b5f',
            categories: {
                'Engagement rings': {
                    link: 'https://www.hsamuel.co.uk/webstore/l/engagement-rings/?icid=hs-nv-engagement-rings',
                },
                'Diamond rings': {
                    link: 'https://www.hsamuel.co.uk/webstore/l/diamond-engagement-rings/',
                },
                'Solitaire rings': {
                    link: 'https://www.hsamuel.co.uk/webstore/l/solitaire-engagement-rings/',
                },
                'White gold rings': {
                    link: 'https://www.hsamuel.co.uk/webstore/l/white-gold-engagement-rings/?icid=hs-nv-engagement-white',
                },
            },
        }
    },
    'wedding-rings': {
        tileBanners: {
            largeBanner: {
                image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/743dffd4-1d2d-11ec-9ef2-b2dd87145b5f',
                title1: 'Wedding Bands',
                link1: 'https://www.hsamuel.co.uk/webstore/l/wedding-rings/',
            },
            smallBanner1: {
                image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/6e4b3984-1d2d-11ec-9b2c-ae7d9d1cc104',
                title: 'Diamond Wedding Rings',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/ring+style%7Cdiamond+set/?icid=hs-wedding-rings-diamond-set',
            },
            smallBanner2: {
                image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/6bc89cba-1d2d-11ec-97cd-ea5a0ce34ae4',
                title: 'Bridal sets',
                link: 'https://www.hsamuel.co.uk/webstore/l/diamonds/category%7Crings/ring+style%7Cbridal+set/?icid=hs-wedding-rings-bridal-sets',
            },
            textBanner: {
                title: 'Shop Yellow gold wedding rings',
                linkText: 'Shop now',
                link: 'https://www.hsamuel.co.uk/webstore/l/yellow-gold-jewellery/occasion%7Cwedding/category%7Crings/?icid=hs-wedding-rings-yellow-gold',
            },
        },

        ctaBanners: {
            leftImage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/6e4b3984-1d2d-11ec-9b2c-ae7d9d1cc104',
            rightImage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/74c8d1a4-1d2d-11ec-bb83-ae7d9d1cc104',
            categories: {
                'Wedding Bands': {
                    link: 'https://www.hsamuel.co.uk/webstore/l/wedding-rings/',
                },
                'Diamond Wedding Rings': {
                    link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/ring+style%7Cdiamond+set/?icid=hs-wedding-rings-diamond-set',
                },
                'Bridal sets': {
                    link: 'https://www.hsamuel.co.uk/webstore/l/diamonds/category%7Crings/ring+style%7Cbridal+set/?icid=hs-wedding-rings-bridal-sets',
                },
                'Yellow Gold Wedding Rings': {
                    link: 'https://www.hsamuel.co.uk/webstore/l/yellow-gold-jewellery/occasion%7Cwedding/category%7Crings/?icid=hs-wedding-rings-yellow-gold',
                },
                
            },
        }
    },
    'jewellery': {
        tileBanners: {
            largeBanner: {
                image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/75461218-1d2d-11ec-bacf-ae7d9d1cc104',
                title1: 'Yellow gold jewellery',
                link1: 'https://www.hsamuel.co.uk/webstore/l/yellow-gold-jewellery/',
            },
            smallBanner1: {
                image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/7052fce4-1d2d-11ec-8ac4-768dc151c833',
                title: 'Silver jewellery',
                link: 'https://www.hsamuel.co.uk/webstore/l/silver-jewellery/',
            },
            smallBanner2: {
                image: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/6daa5f64-1d2d-11ec-b8a1-ae7d9d1cc104',
                title: 'Diamond stud earrings',
                link: 'https://www.hsamuel.co.uk/webstore/l/earrings/?stone_type.lvl0=diamond',
            },
            textBanner: {
                title: 'Shop Diamond bracelets',
                linkText: 'Shop now',
                link: 'https://www.hsamuel.co.uk/webstore/l/bangles-bracelets/?stone_type.lvl0=diamond',
            },
        },

        ctaBanners: {
            leftImage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/7052fce4-1d2d-11ec-8ac4-768dc151c833',
            rightImage: 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/6f8f1ba8-1d2d-11ec-b64f-fa5403c10596',
            categories: {
                'Yellow Gold Jewellery': {
                    link: 'https://www.hsamuel.co.uk/webstore/l/yellow-gold-jewellery/',
                },
                'Silver jewellery': {
                    link: 'https://www.hsamuel.co.uk/webstore/l/silver-jewellery/',
                },
                'Diamond stud earrings': {
                    link: 'https://www.hsamuel.co.uk/webstore/l/earrings/?stone_type.lvl0=diamond',
                },
                'Diamond bracelets': {
                    link: 'https://www.hsamuel.co.uk/webstore/l/bangles-bracelets/?stone_type.lvl0=diamond',
                },
                
            },
          
        }
    },
}



let catData = '';

if(mostViewedCategory()) {
    if(getSiteFromHostname() === 'ernestjones') {
        catData = EJcatData[mostViewedCategory()];
    } else {
        catData = HScatData[mostViewedCategory()];
    }
}

export default catData;