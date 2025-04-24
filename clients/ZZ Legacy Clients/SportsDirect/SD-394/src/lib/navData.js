import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;

export default [

    // Christmas sub-header
    {
        identifier: 'mob-christmas',
        text: 'Christmas',
        imageString: 'christmas',
    },

    // Mens sub-header
    {
        identifier: 'mob-mens',
        text: 'Mens',
        imageString: 'mens-clothing',
        children: [

            {
                text: "Footwear",
                imageString: 'mens-footwear',
            },
            {

                text: "Clothing",
                imageString: 'mens-clothing2'
            },
            {
                text: "Accessories",
                imageString: 'running-accessories'
            }


        ],
    },

    // Ladies sub-header
    {
        identifier: 'mob-womens',
        text: 'Womens',
        imageString: 'ladies-clothing',
        children: [

            {
                text: "Footwear",
                imageString: 'ladies-footwear'
            },
            {
                text: "Clothing",
                imageString: 'ladies-clothing2'
            },
            {
                text: "Accessories",
                imageString: 'luggage'
            }


        ],
    },

    // Kids sub-header
    {
        identifier: 'mob-kids',
        text: 'Kids',
        imageString: 'kids-clothing',
        children: [

            {
                text: "Footwear",
                imageString: 'kids-footwear'
            },
            {
                text: "Clothing",
                imageString: 'kids-clothing2'
            },
            {
                text: "Accessories",
                imageString: 'toys'
            }


        ],
    },

    // Sports sub-header
    {
        identifier: 'mob-sports',
        text: 'Sports',
        imageString: 'sports',
        children: [

            {
                text: "Football",
                imageString: 'football-shirts'
            },

            {
                text: "Training",
                imageString: 'sports2'
            },

            {
                text: "Running",
                imageString: 'running-clothing'
            },

            {
                text: "Outdoor",
                imageString: 'outdoor-boots'
            },

            {
                text: "All Sports",
                imageString: 'training'
            },

        ],
    },

    // Brands sub-header
    {
        identifier: 'mob-brands',
        text: 'Brands',
        imageString: 'brands',
        children: [

            {
                text: "Brands",
                imageString: 'ladies-clothing'
            },

            {
                text: "Popular Brands",
                imageString: 'ladies-footwear'
            },

        ],
    },

    // Outlet sub-header
    {
        identifier: 'mob-outlet',
        text: 'Outlet',
        imageString: 'outlet',
        children: [

            {
                text: "Shop by Gender",
                imageString: 'usc'
            },

            {
                text: "Shop by Category",
                imageString: 'football'
            },

            {
                text: "Footwear",
                imageString: 'mens-footwear'
            },

            {
                text: "Shop by Brand",
                imageString: 'brands'
            },

        ],
    },   
    
]