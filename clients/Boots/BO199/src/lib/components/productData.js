export const getData = () => {
    const dataArr = [];

    const rrProds = document.querySelectorAll('.rrItemContainer');
    for (let index = 0; index < 8; index += 1) {
        const element = rrProds[index];
        if(element) {
            if(element.querySelector('.rrItemTitle')) {
                var name = element.querySelector('.rrItemTitle').innerHTML;
                //var id = element.querySelector('.rrItemTitle').getAttribute("href").match(/((boots).*(-))((\d){7,8}(\.P)?)/)[4];
                var img = element.querySelector('.rrImageContainer img').getAttribute("src");
                var price = element.querySelector('.product_price').innerHTML;
                var url = element.querySelector('.rrItemTitle').getAttribute("href");
                const dataObj = {}; 
        
                    dataObj['name'] = name;
                // dataObj['id'] = id;
                    dataObj['image'] = img;
                    dataObj['price'] = price;
                    dataObj['link'] = url;
        
                dataArr.push(dataObj);
            }
        }
    }
    return dataArr;
}

export const increasinglyData = () => {
    const dataArr = [];

    const rrProds = document.querySelectorAll('.inc_af_block.inc_recommendations .inc_product_module_block.simple');
    for (let index = 0; index < 8; index += 1) {
        const element = rrProds[index];
        if(element) {
            if(element.querySelector('.inc_product_desc_title_text a div')) {
                var name = element.querySelector('.inc_product_desc_title_text a div').innerHTML;
                var img = element.querySelector('.inc_product_img_main_img img').getAttribute("src");
                var price = element.querySelector('.inc_product_desc_price_active_text_block .inc_product_desc_price_active_text').innerHTML;
                var url = element.querySelector('.inc_product_desc_title_text a').getAttribute("href");
                const dataObj = {}; 
        
                    dataObj['name'] = name;
                    dataObj['image'] = img;
                    dataObj['price'] = price;
                    dataObj['link'] = url;
        
                dataArr.push(dataObj);
            }
        }
    }
    return dataArr;
}

