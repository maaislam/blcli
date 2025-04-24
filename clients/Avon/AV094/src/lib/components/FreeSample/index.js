/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* @jsx h */

import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { fireEvent } from '../../../../../../../core-files/services';

import { mobileDetection } from '../../../../../../../lib/utils/mobileDetection';


export const FreeSample = () => {
  const detectMobile = mobileDetection();
  const [button, setButton] = useState(true);

  const SVGComponent = props => (
    <svg width={8} height={8} viewBox="0 0 8 8" fill="none" {...props}>
      <rect
        x={0.687012}
        y={3.49658}
        width={4.94494}
        height={5.10981}
        transform="rotate(-45 0.687012 3.49658)"
        fill="#ECC967"
      />
    </svg>
  );

  const onClickProduct = () => {
    fetch('/cart/add.js', {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json'],
        ['Content-Type', 'application/csp-report'],
        ['Content-Type', 'application/expect-ct-report+json'],
        ['Content-Type', 'application/xss-auditor-report'],
        ['Content-Type', 'application/ocsp-request'],
      ],
      body: JSON.stringify({
        quantity: 1,
        id: 39400972648493,
      }),
    })
      .then(response => response.json())
      .then(() => {
        fireEvent('User added free sample');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const getCart = async () => {
    const result = await fetch('/cart.json');

    if (result.status === 200) {
      return result.json();
    }

    throw new Error(`Failed to get request, Shopify returned ${result.status} ${result.statusText}`);
  };

  debugger;
  const checkForSample = async () => {
    const cart = await getCart();
    debugger;
    cart.items.forEach((item) => {
      if (item.id === 39400972648493) {
        if (item.quantity > 1) {
          fetch('/cart/update.js', {
            method: 'POST',
            headers: [
              ['Content-Type', 'application/json'],
              ['Content-Type', 'application/csp-report'],
              ['Content-Type', 'application/expect-ct-report+json'],
              ['Content-Type', 'application/xss-auditor-report'],
              ['Content-Type', 'application/ocsp-request'],
            ],
            body: JSON.stringify({
              updates: {
                39400972648493: 1,
              },
            }),
          })
            .then(response => response.json())
            .then(() => {
              window.location.reload();
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        setButton(false);
      }
    });
  };

  const checkBasketQuantity = async () => {
    const cart = await getCart();
    if (cart.item_count === 1) {
      cart.items.forEach((item) => {
        if (item.id === 39400972648493) {
          const error = `
            <span class="basket_error">
              <p>You must add at least one product to your basket to qualify for your FREE sample</p>
            </span>
            `;
          const checkoutButton = document.querySelectorAll('.btn.btn-primary.btn-checkout');
          checkoutButton.forEach((checkoutButtonItem) => {
            checkoutButtonItem.setAttribute('disabled', '');
            checkoutButtonItem.insertAdjacentHTML('afterend', error);
            fireEvent('Checkout Button Disabled');
          });
        }
      });
    }
  };

  const listenForRemoveItem = () => {
    const sample = document.querySelectorAll('.btn.btn-plain.btn-remove');
    sample.forEach((btn) => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    });
  };

  const removeItems = () => {
    const sample = document.querySelector('#basket-main [data-variant-id="39400972648493"].basket-item button');
    const sampleLink = document.querySelector('#basket-main [data-variant-id="39400972648493"] a');
    const quantityDesktop = document.querySelector('#basket-main [data-variant-id="39400972648493"].product-quantity-desktop');
    const quantityMobile = document.querySelector('#basket-main [data-variant-id="39400972648493"].product-quantity-mobile');
    const textLink = document.querySelector('#basket-main [data-variant-id="39400972648493"] .basket-item-details .product-title');
    const moneyText = document.querySelector('#basket-main [data-variant-id="39400972648493"] .basket-item-details .product-quantity-price');
    if (sample) {
      sampleLink.style.cursor = 'default';
      textLink.innerHTML = '<p class="product-title-noLink">Anew Protinol™ Power Serum Sample</p>';
      moneyText.querySelector('.money').innerHTML = 'FREE';
      sample.remove();
      quantityDesktop.remove();
      quantityMobile.remove();
    }
  };
  useEffect(() => {
    listenForRemoveItem();
    removeItems();
    checkForSample();
    checkBasketQuantity();
    document.querySelector('#basket-main [data-variant-id="39400972648493"].basket-item a').addEventListener('click', (event) => {
      event.preventDefault();
    }, false);
  }, []);


  const AddToBasket = () => (<button onClick={() => { onClickProduct(); }} type="submit" className="btn btn-primary">Add FREE sample</button>);
  const AddedToBasket = () => (
    <div className="addedBasket-wrapper">
      <p className="addedBasket-wrapper__text">
        <SVGComponent />
        {' '}
        {' '}
        {' '}
        Added Enjoy your
        {' '}
        <span className="addedBasket-wrapper__text__gold">Free</span>
        {' '}
        sample
        {' '}
        {' '}
        {' '}
        <SVGComponent />
      </p>
    </div>
  );

  const DesktopDesign = (
    <div className="container-wrapper mb-3">
      <div className="title">
        <p>
          <span className="title__free">
            Free
          </span>
          {' '}
          <span className="title__bold">
            Anew Protinol™ Power Serum Sample
          </span>
          {' '}
          with every order
        </p>
        {button ? <AddToBasket /> : <AddedToBasket />}
      </div>
      <div className="image-wrapper">
        <img src="https://cdn.shopify.com/s/files/1/0327/1498/1421/files/free-sample-product-ds.png?v=1629113135" alt="" />
      </div>
      <div className="text-wrapper">
        <p className="text-wrapper__textOne">
          The secret to 7 Powerful
          <br />
          Skin Benefits in 7 days
        </p>
        <SVGComponent />
        <p className="text-wrapper__textTwo">
          Try our newest skincare
          <br />
          serum before it launches on
          <br />
          <b>1st September</b>
        </p>
      </div>
    </div>
  );

  const MobileDesign = (
    <div className="container-wrapper-mobile">
      <div className="title">
        <p>
          <span className="title__free">
            Free
          </span>
          {' '}
          <span className="title__bold">
            Anew Protinol™ Power Serum
            <br />
            Sample
          </span>
          {' '}
          with every order
        </p>
      </div>
      <div className="flex-wrapper">
        <div className="image-wrapper">
          <img src="https://cdn.shopify.com/s/files/1/0327/1498/1421/files/free-sample-product-ds.png?v=1629113135" alt="" />
        </div>
        <div className="text-wrapper">
          <p className="text-wrapper__textOne">
            The secret to 7 Powerful
            <br />
            Skin Benefits in 7 days
          </p>
          <SVGComponent />
          <p className="text-wrapper__textTwo">
            Try our newest skincare
            <br />
            serum before it launches
            <br />
            on
            {' '}
            <b>1st September</b>
          </p>
        </div>
      </div>
      {button ? <AddToBasket /> : <AddedToBasket />}
    </div>
  );

  fireEvent('Checkout Button Enabled');

  return (
    <div id="basket-sample">
      {detectMobile ? MobileDesign : DesktopDesign}
    </div>
  );
};
