  
export const isPLP = () => {
    return !!document.querySelector('[data-test-id="plp-wrapper"]');
};

export const isPDP = () => {
    return !!document.querySelector('[data-test-id="pdp-wrapper"]');
};


export const credit_account = ()  => {
  return window.dataLayer[14]?.loggedInType ;
} 
export const isMobile = () => window.innerWidth < 767;

export const getItemData = () => {
    const prodCards  = document.querySelectorAll('[data-test-id="product"]');
    const productData = Array?.from(prodCards).map((item)=>{
      const sku = item.querySelector('[data-test-id="product-card-code"]').innerText.split(':')[1]
      return {
        productCode: sku?.trim(),
            quantity:1
      }
    });
    return productData;
};

export const getCustomerLocation = () => {
    //No location set?
    const preselectedDeliveryAddress = JSON.parse(localStorage.getItem('preselectedDeliveryAddress'));
    const collectionBranch = JSON.parse(localStorage.getItem('collectionBranch'));
  
    const deliveryPostcode = preselectedDeliveryAddress
      ? preselectedDeliveryAddress.postalCode
      : false;
    const collectionBranchId = collectionBranch ? collectionBranch.code : false;
  
    if (!deliveryPostcode || !collectionBranchId) return false;
    return {
      deliveryPostcode,
      collectionBranchId
    };
  };
  