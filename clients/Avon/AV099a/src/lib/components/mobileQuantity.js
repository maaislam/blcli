const renderMobileQuantity = (testId) => {
  const renderList = () => {
    let array = [];
    for (let index = 0; index < 10; index++) {
      const str = `<li class="quantity-item ${testId}__mobile-quantity-item">
              <span class="custom-ratio"></span>
              <span class="quantity-value">${index + 1}</span>
          </li>`;
      array.push(str);
    }
    return array.join('\n');
  };

  const htmlStr = `
    <div class="${testId}__mobilequantity quantity-mobile-modal" >
        <span class="modal-label">
            <svg class="${testId}__mobilequantity-close icon icon-close" aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 12 12"><path d="M12 .978L11.022 0 6 5.029.978-.001 0 .98l5.029 5.02L0 11.023.978 12 6 6.97 11.022 12l.978-.978L6.971 6 12 .978z" fill="#000"></path></svg>
            <span class="label">Choose quantity</span>
        </span>
        <ul class="quantity-listing">  
            ${renderList()}
            <li>
                <div class="mobile-quantity-action">
                    <input type="number" class="mobile-quantity-input" placeholder="Type quantity" pattern="[0-9]*" min="1" max="1098" tabindex="0">
                    <span class="btn btn-primary ${testId}__mobile-quantity-btn">Done</span>
                </div>
            </li>
        </ul>
    </div>`;
  return htmlStr;
};
export default renderMobileQuantity;
