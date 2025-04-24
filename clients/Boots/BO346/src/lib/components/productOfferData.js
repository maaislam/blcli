const getProducts = async (dataIdArr) => {
    if(dataIdArr){

        return fetch(`https://www.boots-optimisation.co.uk/prod-info/model/${dataIdArr.join('&')}`, {
            method: 'GET',
            headers: {
                accept: '*/*',
            },
        })
        .then((res) => res.json())
        .then((data) => {
            const offerObjArr= [];
    
            for(let index = 0; index < data.length; index++){
                let offerObj = {};
                offerObj['id'] = data[index].model;
                offerObj['qty'] = data[index].promotionalText.length;
                // console.log(offerObj);
                offerObjArr.push(offerObj);
            }
            console.log('qty', offerObjArr);
            return offerObjArr;
        });
    }
};

export default getProducts;