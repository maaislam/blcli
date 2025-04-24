// const getPersonalisedOffers = (skus) => {
//     const baseURL = "https://www.boots-optimisation.co.uk/personalised-offers/";

//     const urlWithParams = `${baseURL}${skus.join("&")}`;
//     return fetch(urlWithParams, {
//         method: 'GET',
//         headers: {
//             accept: '*/*',
//         },
//     })
//         .then((res) => res.json())
// };

const getPersonalisedOffers = (sku) => {
    const baseURL = `https://www.boots-optimisation.co.uk/personalised-offers/${sku}`;

    return fetch(baseURL, {
        method: 'GET',
        headers: {
            accept: '*/*',
        },
    })
    .then((res) => res.json())
};
export default getPersonalisedOffers;
