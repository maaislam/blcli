import renderCartModal from "./getModal";

export const addToCart = (    
    qty,
    productId) => {
 
    const response = fetch(
      `/product/jsp/product/responsive/addItemToOrder.jsp`,
      {
        method: 'POST',
        headers: {
            "accept": "*/*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-dtpc": "6$429629335_495h15vFJDVNKGRNROMMIFMKALADGTFJBQSETTC-0e0",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.screwfix.com/p/dewalt-dcd796p2-gb-18v-2-x-5-0ah-li-ion-xr-brushless-cordless-combi-drill/1358j",
        "referrerPolicy": "strict-origin-when-cross-origin",
        body: `qty=${qty}&productId=${productId}&deliveryType=delivery&shouldUpdateStore=false&giftItemId=giftItemId&giftListId=giftListId`,
        mode: "cors",
        credentials: "include"
      }
    )
    .then((response)=>{
        if(response.status === 200){
          renderCartModal();
        }else{
          
        }
        
    });
    return response;
    
  };

  
  