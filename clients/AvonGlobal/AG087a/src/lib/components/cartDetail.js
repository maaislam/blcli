import formatPrice from '../helpers/formatPrice';

const renderCartDetail = (id, parentElm, data) => {
  const { itemsCount, subtotalPrice, totalPrice, totalSaveOnPromotions } = data;

  const htmlStr = `
    <div class="${id}__cartdetails">
        <div class="title">Your Basket</div>
        <div class="details">
            <div class="items">
                <div class="row-left">Items</div>
                <div class="row-right">${itemsCount}</div>
            </div>
            <div class="subtotal">
                <div class="row-left">Subtotal</div>
                <div class="row-right">${formatPrice(subtotalPrice)}</div>
            </div>
            <div class="saving ${totalSaveOnPromotions > 0 ? '' : `${id}__hide`}">
                <div class="row-left">You saved</div>
                <div class="row-right ">${formatPrice(totalSaveOnPromotions)}</div>
            </div>
            <div class="total">
                <div class="row-left">Total</div>
                <div class="row-right">${formatPrice(totalPrice)}</div>
            </div>
        </div>
        <div class="view-basket ${id}__slide-basket_btn ${id}__view-basket">VIEW BASKET</div>
    </div>
  `;

  parentElm.innerHTML = htmlStr;
};
export default renderCartDetail;
