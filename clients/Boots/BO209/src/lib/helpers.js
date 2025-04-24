export const pageType = () => {

  let page;

  if(document.querySelector('#estore_lister_template_container') && document.querySelector('.plp_gridView_redesign')) {
    page = 'Search';
  } 

  if(document.querySelector('#estore_pdp_trcol') && document.querySelector('#estore_productpage_template_container')) {
    page = 'PDP';
  } 

  if(document.querySelector('#estores_product_listing_widget') && document.querySelector('.showing_products')) {
    page = 'PLP';
  }

  return page;
}

export const productToStore = (el) => {

  let product;

  let productLink;
  let productImageID;
  let prodDetails;

  if(pageType() === 'PLP') {
    productLink = el.querySelector(".product_img_link").getAttribute("href"),
    prodDetails = JSON.parse(el.querySelector('.product_name_link.product_view_gtm').getAttribute('data-value'));
  }

  if(pageType() === 'PDP') {
    productLink = window.location.href;
    prodDetails = JSON.parse(document.querySelector('#productDataDLVar').getAttribute('value'));
  }

  if(pageType() === 'PLP' || pageType() === 'PDP') {
    productImageID = prodDetails.id.replace('.P', '');

    product = {
      productId: prodDetails.id,
      title: prodDetails.name,
      imageUrl: `https://boots.scene7.com/is/image/Boots/${productImageID}?op_sharpen=1`,
      link: productLink,
      list: "",
    }
  }

  if(pageType() === 'Search') {
    productImageID = el.querySelector("[id^='dlProductId']").value.replace('.P', '');

    product = {
      productId: el.querySelector("[id^='dlProductId']").value,
      title: el.querySelector('.product_name_link').textContent,
      imageUrl: `https://boots.scene7.com/is/image/Boots/${productImageID}?op_sharpen=1`,
      link: el.querySelector('.product_name_link').getAttribute('href'),
      list: "",
    }
  }

  return product;
}