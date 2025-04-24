import getCart from './getCart';

const updateMinicart = (data, lastAddedItemImg) => {
  const cartCountContainer = document.getElementById('CartLink') || document.querySelector('#BasketLink span');
  const lastItemNameBlock =
    document.querySelector('.AV019-NEW_VI_Minibag_productName>a') || document.querySelectorAll('.MiniCartProductTitle>a');
  const quantityBlock = document.querySelector('.AV019-NEW_VI_Minibag_productQty>p') || document.querySelectorAll('.MiniCartQty');
  const subtotalContainer =
    document.querySelector('.AV019-NEW_VI_Minibag_summary > p:last-child >.AV019-NEW_VI_Minibag_bold') ||
    document.querySelectorAll('.MiniCartTotalPrice');
  const unitPriceContainer =
    document.querySelector('.AV019-NEW_VI_Minibag_productPrice > p') || document.querySelectorAll('.MiniCartPrice ');
  const imgContainer =
    document.querySelector('.AV019-NEW_VI_Minibag_productImage>img') || document.querySelectorAll('.MiniCartThumbNailImage>img');
  const cartCountBlock =
    document.querySelector('.AV019-NEW_VI_Minibag_bold_purp') || document.querySelectorAll('.MiniCartTotalItems');
  const miniCartShadeBlock = document.querySelectorAll('.MiniCartShade');

  ////////////////////////////////////////////////////
  const itemCount = data.Data.NumberItemsInCart;
  console.log('cart count', itemCount);

  //get cart
  getCart().then((res) => {
    console.log('data cart', res);

    const cartItems = res.Data.Campaigns[0].Products;
    if (itemCount == 1 || (itemCount >= 2 && cartItems.some((item) => item.Name.indexOf('Brosura') !== -1))) {
      location.reload();
    }

    const { Id, Name, Price, Quantity, Slug, VariantName } = data.Data.LastProductChanged;
    const totalPrice = data.Data.TotalPrice + ' ${currency}';
    //last min patch
    cartCountContainer.innerHTML = `${document.getElementById('CartLink') ? `(${itemCount})  COȘ` : `${itemCount}`}`;
    lastItemNameBlock.forEach((item) => {
      item.setAttribute('href', `${location.href}/product/${Id}/${Slug}`);
      item.innerText = Name; //lastItemNameBlock.querySelector('p').innerText = Name;
    });
    //   lastItemNameBlock.setAttribute('href', `${location.href}/product/${Id}/${Slug}`);
    //   lastItemNameBlock.innerText = Name; //lastItemNameBlock.querySelector('p').innerText = Name;

    imgContainer.forEach((item) => {
      item.setAttribute('src', lastAddedItemImg);
    });
    //imgContainer.setAttribute('src', lastAddedItemImg);
    quantityBlock.forEach((item) => {
      item.innerText = Quantity;
    });
    // quantityBlock.innerText = Quantity; //`Quantity: ${Quantity}`;
    unitPriceContainer.forEach((item) => {
      item.innerText = `${Price} \${currency} `;
    });
    // unitPriceContainer.innerText = `${Price} \${currency} `;
    cartCountBlock.forEach((item) => {
      item.innerHTML = `<span><span>Nr. produse</span></span> ${itemCount}`;
    });
    //cartCountBlock.innerHTML = `<span><span>Nr. produse</span></span> ${itemCount}`; //itemCount;
    subtotalContainer.forEach((item) => {
      item.innerHTML = `<span><span>Total:</span></span> ${totalPrice}`;
    });
    //subtotalContainer.innerHTML = `<span><span>Total:</span></span> ${totalPrice}`; //totalPrice;
    miniCartShadeBlock.forEach((item) => {
      if (VariantName) {
        item.style.display = 'block';
        item.innerHTML = `<span>Nuanta:</span> ${VariantName}`;
      } else {
        item.style.display = 'none';
      }
    });
    //miniCartShadeBlock.innerHTML = `<span>Nuanta:</span> ${VariantName}`;
  });
};
export default updateMinicart;
