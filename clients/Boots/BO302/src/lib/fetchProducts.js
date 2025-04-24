export const getOfferProductsData = (offerText) => {



    return new Promise((resolve, reject) => {

        fetch(`https://www.boots-optimisation.co.uk/promo-search/exact/${encodeURIComponent(offerText)}`, {
            method: 'GET',

        })
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                resolve(responseJSON); // Resolve the promise with the response data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                reject(error); // Reject the promise with the error
            });

    });
}

export const getOfferData = (categoryString) => {



    return new Promise((resolve, reject) => {

        fetch('https://www.boots-optimisation.co.uk/personalised-offers/:' + categoryString, {
            method: 'GET',

        })
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                resolve(responseJSON); // Resolve the promise with the response data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                reject(error); // Reject the promise with the error
            });

    });
}

export const getRecentlyViewedProducts = (productSAPCodeString) => {

    return new Promise((resolve, reject) => {

        fetch('https://www.boots-optimisation.co.uk/prod-info/model/' + productSAPCodeString, {
            method: 'GET',

        })
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                resolve(responseJSON); // Resolve the promise with the response data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                reject(error); // Reject the promise with the error
            });

    });

}

export const getBuyAgainProducts = (productSAPCodeString) => {

    return new Promise((resolve, reject) => {

        fetch('https://www.boots-optimisation.co.uk/prod-info/model/' + productSAPCodeString, {
            method: 'GET',

        })
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                resolve(responseJSON); // Resolve the promise with the response data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                reject(error); // Reject the promise with the error
            });

    });

}

export const getCategoryData = (pageViews) => {

    return new Promise((resolve, reject) => {

        let filteredPageViews = pageViews.filter((pageView) => {
            if (pageView.type == "PLP") {
                return pageView;
            }

        });

        // remove duplicates in array
        let uniquePageViews = [...new Set(filteredPageViews.map(item => item.path))];

        uniquePageViews = uniquePageViews.slice(0, 5);

        uniquePageViews = uniquePageViews.map((pageView) => {

            let name = pageView.split('/');
            name = name[name.length - 1];
            name = name.replace(/-/g, ' ');

            return [name, pageView];

        });


        resolve(uniquePageViews); // Resolve the promise with the response data

    });

}

export const getBrandsData = (productViews) => {

    return new Promise((resolve, reject) => {

        let allBrands = productViews.map((productView) => {
            return productView.brand;
        });

        // remove duplicates in array
        let uniqueBrands = [...new Set(allBrands)];

        // create an array with the unique brands and the number of times they appear

        let brandCount = uniqueBrands.map((brand) => {
            return [brand, allBrands.filter((b) => b == brand).length];
        });

        // sort the array by the number of times the brand appears

        brandCount = brandCount.sort((a, b) => {
            return b[1] - a[1];
        });

        resolve(brandCount);


    });

}