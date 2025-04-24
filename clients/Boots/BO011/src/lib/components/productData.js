   
        const getData = () => {
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

export default getData;
