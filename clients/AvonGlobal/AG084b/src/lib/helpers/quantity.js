import renderbasket from '../components/basket';
import fetchBrochureSettings from './getBrochureSettings';
import fetchCart from './getCart';

const updateQuantity = (id, target, operator, fireEvent) => {
  const quantityWrapper = target.closest('.quantity_wrapper');
  const displayInput = quantityWrapper?.querySelector('input');
  const sku = target.closest(`.${id}__cartline--product-details`).getAttribute('data-sku');

  const currentQuantity = parseInt(displayInput?.getAttribute('value'));
  let quantity;

  if (operator == 'plus') {
    displayInput.setAttribute('value', currentQuantity + 1);
    quantity = currentQuantity + 1;
  } else if (operator == 'minus') {
    displayInput.setAttribute('value', currentQuantity - 1);
    quantity = currentQuantity - 1;
  } else if (operator == 'delete') {
    quantity = 0;
    //get control remove button

    //delete api endpoint not working
  }

  //get api url

  const carApiUrl = PDP_MANAGER.getAPIUrl('basket_products');
  const campaignNumber = PDP_MANAGER['API_DATA'].campaignNumber;
  const payload =
    quantity > 0
      ? {
          campaignNumber,
          sku,
          quantity,
        }
      : {};
  const postUrl = `${quantity <= 0 ? `${carApiUrl}/${campaignNumber}/${sku}` : `${carApiUrl}/update-product`}`;
  if (quantity === 0) {
    const controlProducts = document.querySelectorAll('.products_list>.product');
    const targetVariantIndex = target.closest(`.${id}__cartline--product-details`).getAttribute('data-varindex');
    const deleteBtn = [...controlProducts]
      .filter((item) => {
        return (
          item.querySelector('.title').innerText ===
          target.closest(`.${id}__cartline`).querySelector(`.${id}__cartline--title>span:first-child`).innerText
        );
      })[0]
      .querySelectorAll('.btn_remove')[targetVariantIndex];

    deleteBtn.click();
  }

  quantity >= 0 &&
    fetch(postUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        fetchBrochureSettings().then((broSettings) => {
          console.log(broSettings);

          fetchCart().then((res) => {
            console.log(res);

            renderbasket(id, res, broSettings, fireEvent);

            // get basket buttons
          });
        });
      });
};

export default updateQuantity;
