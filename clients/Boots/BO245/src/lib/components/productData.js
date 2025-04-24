const getData = () => {

    let dataArr = [];

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
    console.log(dataArr);
    return dataArr;
}

export default getData;
