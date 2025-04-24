const slotInfo = {
    "top-rated": {
        info: [
            {
                className: 'tr-soft-skin',
                header: 'Smooth skin that smells divine',
                subcopy: 'Skin So Soft Original Dry Oil Spray - 150ml',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_11.jpg',
                url: 'https://avon.uk.com/products/skin-so-soft-original-dry-oil-spray',
            },
            {
                className: 'tr-glimmerstick',
                header: 'Unleash your creativity',
                subcopy: 'Glimmerstick Eyeliner',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_9.jpg',
                url: 'https://avon.uk.com/products/true-colour-glimmerstick-eyeliner',
            },
            {
                className: 'tr-ultra-matte',
                header: 'Perfectly pigmented matte magic',
                subcopy: 'Avon True Ultra Matte Lipstick',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_7.jpg',
                url: 'https://avon.uk.com/products/true-colour-perfectly-matte-lipstick',
            },
        ]
    },
    "make-up": {
        info: [
            {
                className: 'mk-powerstay',
                header: 'All day Fresh Faced Foundation',
                subcopy: 'Power Stay 24 Hour Longwear Foundation SPF10',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_10.jpg',
                url: 'https://avon.uk.com/products/true-colour-power-stay-24-hour-foundation',
            },
            {
                className: 'mk-glimmerstick',
                header: 'Perfectly pigmented matte magic',
                subcopy: 'Avon True Ultra Matte Lipstick',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_7.jpg',
                url: 'https://avon.uk.com/products/true-colour-glimmerstick-eyeliner',
            },
            {
                className: 'mk-ultra-matte',
                header: 'Unleash your creativity',
                subcopy: 'Glimmerstick Eyeliner',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_9.jpg',
                url: 'https://avon.uk.com/products/true-colour-perfectly-matte-lipstick',
            },
        ]
    },
    "skincare": {
        info: [
            {
                className: 'sk-protinol',
                header: 'Renew and revitalise skin',
                subcopy: 'Anew Renewal Protinol Power Serum',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_1.jpg',
                url: 'https://avon.uk.com/products/anew-protinol-power-serum',
            },
            {
                className: 'sk-reset',
                header: 'firm, plump and hydrate',
                subcopy: 'Anew Skin Reset Plumping Shots',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_5.jpg',
                url: 'https://avon.uk.com/products/anew-skin-reset-plumping-shots',
            },
            {
                className: 'sk-vitaminC',
                header: 'Banish dull, tired skin',
                subcopy: 'Anew Vitamin C Radiance Maximising Serum',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_12.jpg',
                url: 'https://avon.uk.com/products/anew-radiance-maximising-serum',
            },
        ]
    },
    "bath-body": {
        info: [
            {
                className: 'bb-soft-skin',
                header: 'smooth skin that smells divine',
                subcopy: 'Skin So Soft Original Dry Oil Spray - 150ml',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_11.jpg',
                url: 'https://avon.uk.com/products/anew-protinol-power-serum',
            },
            {
                className: 'bb-pilow-spray',
                header: 'Create your sleep sanctuary',
                subcopy: 'Planet Spa Sleep Ritual Pillow Mist - 100ml',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_2.jpg',
                url: 'https://avon.uk.com/products/planet-spa-aromatherapy-beauty-sleep-pillow-mist',
            },
            {
                className: 'bb-argan',
                header: 'natural hair radiance',
                subcopy: 'Absolute Nourishment Argan Hair Serum - 30ml',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_6.jpg',
                url: 'https://avon.uk.com/products/absolute-nourishment-argan-hair-serum-30ml',
            },
        ]
    },
    "fragrance": {
        info: [
            {
                className: 'fr-splendoria',
                header: 'Luxurious oud and vanilla',
                subcopy: 'Far Away Splendoria Eau de Parfum - 50ml',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_3.jpg',
                url: 'https://avon.uk.com/products/new-far-away-splendoria-eau-de-parfum-50ml',
            },
            {
                className: 'fr-attraction',
                header: 'seductive wood and amber ',
                subcopy: 'Attraction for Him Eau de Toilette - 75ml',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_4.jpg',
                url: 'https://avon.uk.com/products/attraction-for-him-eau-de-toilette',
            },
            {
                className: 'fr-today',
                header: 'Bestselling floral fragrance',
                subcopy: 'Today Eau de Parfum - 50ml',
                image: 'https://blcro.fra1.digitaloceanspaces.com/AV153/Image_8.jpg',
                url: 'https://avon.uk.com/products/new-today-eau-de-parfum-50ml',
            },
        ]
    }
};

function getUrlByClassName(className) {
    for (const category in slotInfo) {
        const infoArray = slotInfo[category].info;
        for (const info of infoArray) {
            if (info.className === className) {
                return info.url;
            }
        }
    }
    return null; // If className is not found
}

// Example usage
const className = 'fr-splendoria';
const url = getUrlByClassName(className);
console.log(url); // Output: 'https://avon.uk.com/products/new-far-away-splendoria-eau-de-parfum-50ml'
