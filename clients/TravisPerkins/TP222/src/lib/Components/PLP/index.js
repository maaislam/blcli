/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getProduct } from '../../../../../Utils/Apis';
import { skus } from '../../skus';
import { isSkuInArray } from '../../Utils/SkuSorter';
import { ModalComponent } from '../../Utils/Modal';

const getProductData = (sku) => {
  const [data, updateData] = useState();
  useEffect(() => {
    const getData = async () => {
      const productData = await getProduct(sku);
      const returnedData = await productData;
      updateData(returnedData);
    };
    getData();
  }, []);
  return data;
};

export const PDPLogInLogOut = (props) => {
  const { skuCode } = props;
  debugger;
  const isLoggedIn = sessionStorage.getItem('loggedIn');
  const [productPrice, setProductPrice] = useState();

  const productData = getProductData(skuCode);

  if (productData) {
    setProductPrice(productData.product.price.retailPrice.valueIncVat);
  }
  if (isLoggedIn === 'yes') {
    return <ModalComponent title="you have qualified for up to 25% off" />;
  }
  return (
    <ModalComponent title="you have qualified for up to 25% off" />
  );
};

export const showBlackFridayOffer = () => {
  const getProductsOnPage = document.querySelectorAll(
    '[data-test-id="product"]',
  );

  const markUp = `
    <div class="container">
      <div class="corner">
        <span>Black Friday Offer</span>
      </div>
    </div>
  `;

  [...getProductsOnPage].forEach((product) => {
    const skuCode = product
      .querySelector('[data-test-id="product-card-code"]')
      .innerText.replace(/\D/g, '');
    if (isSkuInArray(skuCode, skus)) {
      product.insertAdjacentHTML('afterBegin', markUp);
    }
  });
  debugger;
  [...getProductsOnPage].map((product, key) => {
    debugger;
    const skuCode = product
      .querySelector('[data-test-id="product-card-code"]')
      .innerText.replace(/\D/g, '');
    if (isSkuInArray(skuCode, skus)) {
      product
        .querySelector('[data-test-id="qty-selector"]').insertAdjacentHTML(
          'beforeBegin',
          `<div data-test-id="black-friday-price-${key}" />`,
        );
      render(
        <PDPLogInLogOut skuCode={skuCode} />,
        document.querySelector(`[data-test-id="black-friday-price-${key}"]`),
      );
    }
  });
};
