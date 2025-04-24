/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getProduct } from '../../../../../Utils/Apis';

import { waitUntilElementExists } from '../../../../../../../lib/utils/waitUntilElementExists';

const getProductData = () => {
  const [data, updateData] = useState();
  useEffect(() => {
    const getData = async () => {
      let productCode = '';
      waitUntilElementExists('[data-test-id="product-code"]', () => {
        productCode = document.querySelector(
          '[data-test-id="product-code"]',
        ).innerHTML;
      });
      const productData = await getProduct(productCode);
      const returnedData = await productData;
      updateData(returnedData);
    };
    getData();
  }, []);
  return data;
};

export const PDPLogInLogOut = () => {
  const isLoggedIn = sessionStorage.getItem('loggedIn');
  let productPrice = '';

  const productData = getProductData();

  if (productData) {
    productPrice = productData.product.price.retailPrice.valueIncVat;
  }
  // 25% off productPrice
  const productPriceOff = (25 / 100) * productPrice;
  const finalPrice = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(productPrice - productPriceOff);
  if (isLoggedIn === 'yes') {
    return (
      <div className="BlackFridayBanner--LoggedIn">
        <div className="Pointer--LoggedIn">
          <span className="BlackFridayBanner__Text-Container">
            <span className="BlackFridayBanner_Icon" />
            <span className="BlackFridayBanner__Text">
              As a logged in customer, you have qualified for our black friday
              offer
            </span>
          </span>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="LoggedIn">
        <div className="BlackFridayBanner--NotLoggedIn">
          <div className="Pointer--NotLoggedIn">
            <span className="BlackFridayBanner__Text-Container">
              <span className="BlackFridayBanner_Icon" />
              <span className="BlackFridayBanner__Text">
                up to 25% off this Black friday
              </span>
            </span>
          </div>
        </div>
        <div
          data-test-id="login-or-register-block"
          className="TradePriceBlock__NotificationBlock"
        >
          <a data-test-id="link" className="TradePriceBlock__Text" href="/login">
            <span color="text-default">Login</span>
          </a>
          {' '}
          or
          {' '}
          <a
            data-test-id="link"
            className="TradePriceBlock__Text"
            href="/activate"
          >
            <span color="text-default" className="TradePriceBlock__Text">
              Sign Up
            </span>
          </a>
          {' '}
          to get this for £
          {finalPrice}
        </div>
      </div>
    </Fragment>
  );
};
