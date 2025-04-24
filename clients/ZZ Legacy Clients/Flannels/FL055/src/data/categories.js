const categories = [
    {
        name: 'Men',
        cats: [
            {
                name: 'Coats',
                link: '/SearchResults?DescriptionFilter=Men%20Coats',
            },
            {
                name: 'Jackets',
                link: '/SearchResults?DescriptionFilter=Men%20Jackets',
            },
            {
                name: 'Bags / Holdalls',
                link: '/SearchResults?DescriptionFilter=men%20bags%20Holdalls',
            },
            {
                name: 'Boots',
                link: '/SearchResults?DescriptionFilter=Men%20Boots',
            },
            {
                name: 'Headwear',
                link: '/SearchResults?DescriptionFilter=men%20headwear',
            },
            {
                name: 'Hoods / Sweat Tops',
                link: '/SearchResults?DescriptionFilter=men%20hoods%20sweat%20tops',
            },
            {
                name: 'Jeans',
                link: '/SearchResults?DescriptionFilter=Men%20Jeans',
            },
            {
                name: 'Jogging Bottoms',
                link: '/SearchResults?DescriptionFilter=men%20jogging%20bottoms',
            },
            {
                name: 'Knitwear',
                link: '/SearchResults?DescriptionFilter=men%20knitwear',
            },
            {
                name: 'Polos',
                link: '/SearchResults?DescriptionFilter=men%20polos',
            },
            {
                name: 'Sandals',
                link: '/SearchResults?DescriptionFilter=men%20sandals',
            },
            {
                name: 'Shirts',
                link: '/SearchResults?DescriptionFilter=men%20shirts',
            },
            {
                name: 'Shoes',
                link: '/SearchResults?DescriptionFilter=men%20shoes',
            },
            {
                name: 'Shorts',
                link: '/SearchResults?DescriptionFilter=men%20shorts',
            },
            {
                name: 'Swimwear',
                link: '/SearchResults?DescriptionFilter=men%20swimwear',
            },
            {
                name: 'T-Shirts',
                link: '/SearchResults?DescriptionFilter=men%20tshirts',
            },
            {
                name: 'Trainers',
                link: '/SearchResults?DescriptionFilter=men%20trainers',
            },
            {
                name: 'Trousers',
                link: '/SearchResults?DescriptionFilter=men%20trousers',
            },
            {
                name: 'Loungewear',
                link: '/SearchResults?DescriptionFilter=Loungewear',
            },
            {
                name: 'Underwear',
                link: '/SearchResults?DescriptionFilter=Men%20Underwear',
            },
            {
                name: 'Tracksuit bottoms',
                link: '/SearchResults?DescriptionFilter=Men%20Tracksuit%20bottoms',
            },
            {
                name: 'Belts',
                link: '/SearchResults?DescriptionFilter=Men%20Belts',
            },
        ]
    },
    {
        name: 'Women',
        cats: [
            {
                name: 'Coats',
                link: '/SearchResults?DescriptionFilter=women%20coats',
            },
            {
                name: 'Jackets',
                link: '/SearchResults?DescriptionFilter=women%20jackets',
            },
            {
                name: 'Bags / Holdalls',
                link: '/SearchResults?DescriptionFilter=women%20bags%20holdalls',
            },
            {
                name: 'Boots',
                link: '/SearchResults?DescriptionFilter=women%20boots',
            },
            {
                name: 'Dresses',
                link: '/SearchResults?DescriptionFilter=women%20dresses',
            },
            {
                name: 'Handbags / Purses',
                link: '/SearchResults?DescriptionFilter=women%20handbags%20purses',
            },
            {
                name: 'Headwear',
                link: '/SearchResults?DescriptionFilter=women%20headwear',
            },
            {
                name: 'Hoods / Sweat Tops',
                link: '/SearchResults?DescriptionFilter=women%20hoods%20sweat%20tops',
            },
            {
                name: 'Jeans',
                link: '/SearchResults?DescriptionFilter=women%20jeans',
            },
            {
                name: 'Jogging Bottoms',
                link: '/SearchResults?DescriptionFilter=women%20jogging%20bottoms',
            },
            {
                name: 'Knitwear',
                link: '/SearchResults?DescriptionFilter=women%20knitwear',
            },
            {
                name: 'Polos',
                link: '/SearchResults?DescriptionFilter=womens%20polos',
            },
            {
                name: 'Sandals',
                link: '/SearchResults?DescriptionFilter=womens%20sandals',
            },
            {
                name: 'Shirts',
                link: '/SearchResults?DescriptionFilter=women%20shirts',
            },
            {
                name: 'Shoes',
                link: '/SearchResults?DescriptionFilter=women%20shoes',
            },
            {
                name: 'Shorts',
                link: '/SearchResults?DescriptionFilter=women%20shorts',
            },
            {
                name: 'Swimwear',
                link: '/SearchResults?DescriptionFilter=women%20swimwear',
            },
            {
                name: 'T-Shirts',
                link: '/SearchResults?DescriptionFilter=women%20tshirts',
            },
            {
                name: 'Trainers',
                link: '/SearchResults?DescriptionFilter=women%20trainers',
            },
            {
                name: 'Trousers',
                link: '/SearchResults?DescriptionFilter=women%20trousers',
            },
            {
                name: 'Loungewear',
                link: '/SearchResults?DescriptionFilter=Loungewear',
            },
            {
                name: 'Underwear',
                link: '/SearchResults?DescriptionFilter=women%20underwear',
            },
            {
                name: 'Tracksuit bottoms',
                link: '/SearchResults?DescriptionFilter=women%20tracksuits%20bottoms',
            },
            {
                name: 'Skirts',
                link: '/SearchResults?DescriptionFilter=women%20skirts',
            },
            {
                name: 'Heels',
                link: '/SearchResults?DescriptionFilter=women%20heels',
            },
            {
                name: 'Flats',
                link: '/SearchResults?DescriptionFilter=women%20flats',
            },
            {
                name: 'Belts',
                link: '/SearchResults?DescriptionFilter=women%20belts',
            },
        ]
    },
]
/**
 *     {
        name: 'Kids',
        cats: [
            {
                name: 'Boys Clothing',
                subcats: [
                    {
                        "catName": 'Clothing',
                        "catLink": '/kids/boys/clothing/view-all',
                    },
                    {
                        "catName": 'Jackets and coats',
                        "catLink": '/kids/boys/clothing/jackets-and-coats',
                    },
                    {
                        "catName": 'Jeans and trousers',
                        "catLink": '/kids/boys/clothing/jeans-and-trousers',
                    },
                    {
                        "catName": 'Knitwear',
                        "catLink": '/kids/boys/clothing/knitwear',
                    },
                    {
                        "catName": 'Loungewear',
                        "catLink": '/kids/boys/clothing/loungewear',
                    },
                    {
                        "catName": 'Polo shirts',
                        "catLink": '/kids/boys/clothing/polo-shirts',
                    },
                    {
                        "catName": 'Shorts and swimwear',
                        "catLink": '/kids/boys/clothing/shorts-and-swimwear',
                    },
                    {
                        "catName": 'Sweatshirts',
                        "catLink": '/kids/boys/clothing/sweatshirts',
                    },
                    {
                        "catName": 'T-shirts',
                        "catLink": '/kids/boys/clothing/t-shirts',
                    },
                ]
            },
            {
                name: 'Girls Clothing',
                subcats: [
                    {
                        "catName": 'Clothing',
                        "catLink": '/kids/girls/clothing/view-all',
                    },
                    {
                        "catName": 'Dresses',
                        "catLink": '/kids/girls/clothing/dresses',
                    },
                    {
                        "catName": 'Jackets and coats',
                        "catLink": '/kids/girls/clothing/jackets-and-coats',
                    },
                    {
                        "catName": 'Jeans and leggings',
                        "catLink": '/kids/girls/clothing/jeans-and-leggings',
                    },
                    {
                        "catName": 'Shots and skirts',
                        "catLink": '/kids/girls/clothing/shorts-and-skirts',
                    },
                    {
                        "catName": 'Sweatshirts',
                        "catLink": '/kids/girls/clothing/sweatshirts',
                    },
                    {
                        "catName": 'Tops',
                        "catLink": '/kids/girls/clothing/tops',
                    },
                ]
            },
        ]
    },
 */
export default categories;