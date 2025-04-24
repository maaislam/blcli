const quantityContainer = (id) => {
  const html = `
    <div class="qty-input ${id}__quantityContainer">
        <p class="${id}__quantityTitle">Quantity</p>
        <div class='${id}__quantityWrapper'>
          <button class="qty-count qty-count--minus" data-action="minus" type="button">&#8722;</button>
          <input class="product-qty" type="number" name="product-qty" min="1" maxlength="4" value="1">
          <button class="qty-count qty-count--add" data-action="add" type="button">&#43;</button>
        </div>
       
    </div>
  `;
  return html;
};

export default quantityContainer;
