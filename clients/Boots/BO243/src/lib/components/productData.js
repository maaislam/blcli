import shared from "../../../../../../core-files/shared";

const { VARIATION } = shared;

const getData = (data) => {

    let dataArr = [];

    if(VARIATION === '1') {
        const RR_data = window.RR.data.JSON.placements;

        for (let index = 0; index < RR_data.length; index++) {
            const element = RR_data[index];

            if (element.placementType === "item_page.oos"){
                const productArr = element.items;

                for (let index = 0; index < productArr.length; index++) {
                    const element = productArr[index];
                    const dataObj = {}; 
                    dataObj['name'] = element.name;
                    dataObj['image'] = element.image_url;
                    dataObj['price'] = element.price;
                    dataObj['link'] = element.link_url;

                    dataArr.push(dataObj);
                    
                }
            }
        }
    } else {
        data.forEach((product) => {

            const dataObj = {}; 
            dataObj['name'] = product.product_data.offername;
            dataObj['image'] =  product.product_data.referenceimageurl;
            dataObj['price'] = product.product_data.currentprice.toFixed(2);
            dataObj['link'] = product.product_data.actionurl;

            dataArr.push(dataObj);

        });
        
    }
    return dataArr;
}

export default getData;
