const brands = [
    {
        name: 'Men',
        brands: [
            {
                "name": 'Stone Island',
                "link": '/all-stone-island',
                subCats: ["Jackets", "T-Shirts", "Hoods / Sweat Tops", "Knitwear", "Shorts", "Headwear", "Trousers", "Jeans", "Swimwear", "Polos", "Accessories"]
            },
            {
                "name": 'Gucci',
                "link": '/men/brands/gucci',
                subCats: ["Trainers", "T-Shirts", "Hoods / Sweat Tops", "Sunglasses", "Shoes", "Jackets", "Polos", "Bags / Holdalls", "Knitwear", "Sandals", "Tracksuit Tops", "Shirts", "Headwear", "Watches", "Belts", "Handbags / Purses", "Jogging Bottoms", "Tracksuit Bottoms", "Trousers", "Phone Cases", "Scarves", "Blazers", "Jeans", "Swimwear", "Shorts", "Boots", "Coats", "Socks", "Ties"]
            },
            {
                "name": 'Moncler',
                "link": '/men/brands/moncler',
                subCats: ["Jackets", "Trainers", "Sandals", "Hoods / Sweat Tops", "T-Shirts", "Boots", "Headwear", "Jogging Bottoms", "Knitwear", "Polos", "Swimwear"]
            },
            {
                "name": 'CP Company',
                "link": '/men/brands/cp-company',
                subCats: ["Hoods / Sweat Tops", "T-Shirts", "Jackets", "Shirts", "Polos", "Shorts", "Swimwear", "Headwear", "Jogging Bottoms", "Bags / Holdalls", "Handbags / Purses", "Knitwear", "Trousers"]
            },
            {
                "name": 'Kenzo',
                "link": '/men/brands/kenzo',
                subCats: ["T-Shirts", "Polos", "Hoods / Sweat Tops", "Knitwear", "Trainers", "Shirts", "Handbags / Purses", "Jackets", "Shorts", "Bags / Holdalls", "Headwear", "Jogging Bottoms", "Phone Cases", "Sandals"]
            },
            {
                "name": 'Valentino',
                "link": '/men/brands/valentino',
                subCats: ["Trainers", "T-Shirts", "Hoods / Sweat Tops", "Handbags / Purses", "Jackets", "Polos", "Sandals", "Swimwear", "Bags / Holdalls", "Boots", "Jogging Bottoms", "Belts", "Knitwear", "Shirts", "Tracksuit Tops", "Fashion Accessories", "Shoes", "Shorts", "Tracksuit Bottoms"]
            },
            {
                "name": 'Dolce & gabbana',
                "link": '/men/brands/dolce-and-gabbana',
                subCats: ["Trainers", "T-Shirts", "Underwear", "Hoods / Sweat Tops", "Polos", "Bags / Holdalls", "Jogging Bottoms", "Handbags / Purses", "Shirts", "Shoes", "Belts", "Shorts", "Headwear", "Jackets", "Jeans", "Phone Cases", "Blazers", "Knitwear", "Sandals", "Swimwear", "Tracksuit Bottoms", "Trousers"]
            },
            {
                "name": 'Polo Ralph Lauren',
                "link": '/men/brands/polo-ralph-lauren',
                subCats: ["Polos", "Shirts", "Socks", "Swimwear", "T-Shirts", "Hoods / Sweat Tops", "Underwear", "Jackets", "Headwear", "Trousers", "Shorts", "Sandals", "Handbags / Purses", "Belts", "Knitwear", "Trainers", "Jogging Bottoms", "Nightwear", "Bags / Holdalls", "Scarves", "Tracksuit Tops"]
            },
            {
                "name": 'Canada Goose',
                "link": '/men/brands/canada-goose',
                subCats: []
            },
            {
                "name": 'Dsquared2',
                "link": '/men/brands/dsquared2',
                subCats: ["T-Shirts", "Jeans", "Hoods / Sweat Tops", "Swimwear", "Jackets", "Jogging Bottoms", "Sandals", "Bags / Holdalls", "Headwear", "Underwear", "Belts", "Handbags / Purses", "Knitwear", "Phone Cases", "Polos", "Shirts", "Shorts", "Trainers", "Trousers"]
            },
            {
                "name": 'Off-White',
                "link": '/men/brands/off-white',
                subCats: ["Purses", "T-Shirts", "Hoods / Sweat Tops", "Trainers", "Handbags / Purses", "Jackets", "Jeans", "Socks", "Shirts", "Belts", "Fashion Accessories", "Jogging Bottoms", "Bags / Holdalls", "Boots", "Knitwear", "Phone Cases", "Sandals"]
            },
            {
                "name": 'Y3',
                "link": '/men/brands/y3',
                subCats: ["Hoods / Sweat Tops", "Sandals", "T-Shirts"]
            },
        ]
    },
    {
        name: 'Women',
        brands: [
            {
                "name": 'Gucci',
                "link": '/women/brands/gucci',
                subCats: ["Purses", "Handbags / Purses", "Sunglasses", "Shoes", "Scarves", "Trainers", "Jackets", "Shirts", "Knitwear", "Socks", "Trousers", "T-Shirts", "Watches", "Skirts", "Hoods / Sweat Tops", "Bags / Holdalls", "Dresses", "Sandals", "Boots", "Blazers", "Headwear", "Belts", "Coats", "Shorts", "Swimwear", "Tracksuit Tops", "Hair Accessories", "Jeans", "Jewellery", "Jogging Bottoms", "Leggings / Jeggings", "Suits", "Fragrance", "Nightwear", "Phone Cases"]
            },
            {
                "name": 'Alexander Mcqueen',
                "link": '/women/brands/alexander-mcqueen',
                subCats: ["Purses", "Trainers", "Handbags / Purses", "Jewellery", "Scarves", "Sunglasses", "Bags / Holdalls", "Boots", "Shoes"]
            },
            {
                "name": 'Jimmy Choo',
                "link": '/women/brands/jimmy-choo',
                subCats: ["Shoes", "Handbags / Purses", "Trainers", "Sandals", "Sunglasses", "Boots", "Bags / Holdalls"]
            },
            {
                "name": 'Burberry',
                "link": '/women/brands/burberry',
                subCats: ["Handbags / Purses", "Jackets", "Shirts", "Hoods / Sweat Tops", "Scarves", "Trainers", "T-Shirts", "Knitwear", "Shoes", "Bags / Holdalls", "Coats", "Skirts", "Headwear", "Socks", "Trousers", "Belts", "Fashion Accessories", "Shorts"]
            },
            {
                "name": 'Dolce & Gabbana',
                "link": '/women/brands/dolce-and-gabbana',
                subCats: ["Handbags / Purses", "Trainers", "Shoes", "Candles", "Dresses", "T-Shirts", "Bags / Holdalls", "Belts", "Hoods / Sweat Tops", "Jogging Bottoms", "Shirts", "Boots", "Jackets", "Skirts", "Vests"]
            },
            {
                "name": 'Agent Provocateur Collection',
                "link": '/agent-provocateur/agent-provocateur-collection',
                subCats: ["Underwear", "Lingerie", "Tights - Sheer", "Bikinis", "Swimwear", "Bodysuits", "Nightwear", "Dresses", "Jewellery", "Shoes"]
            },
            {
                "name": 'Valentino',
                "link": '/women/brands/valentino',
                subCats: ["Handbags / Purses", "Shoes", "Sandals", "Trainers", "Bags / Holdalls", "Shirts", "Dresses", "T-Shirts", "Belts", "Boots", "Hoods / Sweat Tops", "Jeans", "Trousers"]
            },
            {
                "name": 'Canada goose',
                "link": '/women/brands/canada-goose',
                subCats: []
            },
            {
                "name": 'Moncler',
                "link": '/women/brands/moncler',
                subCats: ["Jackets", "Trainers", "T-Shirts", "Headwear", "Knitwear", "Bags / Holdalls", "Polos", "Sandals", "Dresses", "Hoods / Sweat Tops", "Jogging Bottoms"]
            },
            {
                "name": 'Saint Laurent',
                "link": '/women/brands/saint-laurent',
                subCats: ["Handbags / Purses", "Sunglasses", "Sandals", "Jackets", "Shoes", "Bags / Holdalls", "Blazers", "Hoods / Sweat Tops"]
            },
            {
                "name": 'Kenzo',
                "link": '/women/brands/kenzo',
                subCats: ["T-Shirts", "Hoods / Sweat Tops", "Sandals", "Trainers", "Handbags / Purses", "Scarves", "Bags / Holdalls", "Headwear"]
            },
            {
                "name": 'Christian Louboutin',
                "link": '/designers/christian-louboutin',
                subCats: ["Purses", "Shoes", "Handbags / Purses", "Trainers", "Bags / Holdalls", "Boots", "Sandals", "Phone Cases", "Fashion Accessories", "Belts", "Slippers"]
            },
        ]
    },
]
/**
 *     {
        name: 'Kids',
        brands: [
            {
                "name": 'Stone Island Junior',
                "link": '/kids/kids-brands/stone-island-junior',
            },
            {
                "name": 'CP Company',
                "link": '/kids/kids-brands/cp-company',
            },
            {
                "name": 'Gucci',
                "link": '/kids/kids-brands/gucci',
            },
            {
                "name": 'Boss',
                "link": '/kids/kids-brands/boss',
            },
            {
                "name": 'Dsquared2',
                "link": '/kids/kids-brands/dsquared2',
            },
            {
                "name": 'Burberry',
                "link": '/kids/kids-brands/burberry',
            },
            {
                "name": 'Marc Jacobs',
                "link": '/kids/kids-brands/marc-jacobs',
            },
            {
                "name": 'Giuseppe Zanotti',
                "link": '/kids/kids-brands/giuseppe-zanotti',
            },
            {
                "name": 'Dolce & Gabbana',
                "link": '/kids/kids-brands/dolce-and-gabbana',
            },
            {
                "name": 'Fendi',
                "link": '/kids/kids-brands/fendi',
            },
            {
                "name": 'Vilebrequin',
                "link": '/kids/kids-brands/vilebrequin',
            },
            {
                "name": 'Lanvin',
                "link": '/kids/kids-brands/lanvin',
            },
        ]
    }
 */
export default brands;