import settings from '../settings';

export default () => {
  const { ID } = settings;

  const allCartProducts = document.querySelectorAll('.cart.item');
  if (allCartProducts) {
    for (let index = 0; index < allCartProducts.length; index += 1) {
      const element = allCartProducts[index];

      // add new edit button
     /* const actions = element.querySelector('.col.custom-actions .actions-toolbar');
      if(actions) {
        const productLink = element.querySelector('.col.item .product-item-photo');
        actions.insertAdjacentHTML('afterbegin', `<a class="${ID}-edit" href="${productLink.getAttribute('href')}">Edit</a>`);
      }*/
      
      // move the remove button
      const removeButton = element.querySelector('.action.action-delete');
      if(removeButton) {
        element.insertAdjacentElement('afterbegin', removeButton);
      }
      

      // change the size of the text
      /*const size = element.querySelector('.item-options dd');
      const productQTY = element.querySelector('.control.qty');

      if (!element.querySelector(`.${ID}-productQTY`)) {
        const newQTYText = document.createElement('div');
        newQTYText.classList.add(`${ID}-productQTY`);
        newQTYText.innerHTML = `QTY: <span>${productQTY.querySelector('input').value}</span>`;

        if(size) {
          element.querySelector('.item-options dt').insertAdjacentElement('beforebegin', newQTYText);
        } else {
          element.querySelector('.product-item-name').insertAdjacentElement('afterend', newQTYText);
        }
      }*/

      // put price after other information
      const productPrice = element.querySelector('.price-including-tax');
      element.querySelector('.product-item-details').appendChild(productPrice);
    }
  }
};
