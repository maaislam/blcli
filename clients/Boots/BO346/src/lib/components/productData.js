const getProducts = async (dataIdArr, dataArr) => {
    if (!dataIdArr || !dataArr || dataIdArr.length === 0 || dataArr.length === 0) return dataArr;
    // console.log('fetching details')
    try {
        // Fetch product offer data from the API
        const response = await fetch(`https://www.boots-optimisation.co.uk/prod-info/model/${dataIdArr.join('&')}`, {
            method: 'GET',
            headers: { accept: '*/*' }
        });

        // Check if the response status is OK (2xx)
        if (!response.ok) {
            console.error(`Error: Received status ${response.status} from API`);
            return dataArr; // Return the original data if response status is not OK
        }

        // Try to parse the response as JSON
        let offerData;
        try {
            offerData = await response.json();
        } catch (jsonError) {
            console.error("Error parsing response JSON:", jsonError);
            return dataArr; // Return the original data if JSON parsing fails
        }

        // Create a mapping of product id to offer quantity
        const offerQtyMap = offerData.reduce((acc, product) => {
            acc[product.model] = product.promotionalText.length;
            return acc;
        }, {});

        // Update dataArr with offer quantities
        dataArr.forEach(product => {
            if (offerQtyMap[product.id]) {
                product.offerQty = offerQtyMap[product.id];
            }
        });

        return dataArr;

    } catch (error) {
        console.error("Error fetching product data:", error);
        return dataArr; // Return the original data if there's an error
    }
};


const getData = async () => {
    let dataArr = [];
    let dataIdArr = [];

    const RR_data = window.RR.data.JSON.placements;

    // Loop through placements and extract product data
    RR_data.forEach((placement) => {
        if (placement.placementType === "item_page.oos") {
            placement.items.forEach((item) => {
                const dataObj = {
                    id: item.id,
                    name: item.name,
                    image: item.image_url,
                    price: item.price,
                    link: item.link_url,
                    rating: item.rating,
                    numreviews: item.numreviews,
                    isOffer: item.isOffer
                };

                dataArr.push(dataObj);
                dataIdArr.push(item.id);
            });
        }
    });
    const updatedDataArr = await getProducts(dataIdArr, dataArr);

    // Log the updated dataArr
    // console.log(updatedDataArr);  // This will show the final dataArr after offers are added

    return updatedDataArr;
};

export default getData;
