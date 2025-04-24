/* eslint-disable import/prefer-default-export */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { productSearch } from '../../../../Utils/Apis';

export const getProducts = () => {
  const [data, updateData] = useState();
  useEffect(() => {
    const getData = async () => {
      const branchCode = JSON.parse(
        localStorage.getItem('collectionBranch'),
      ).code;
      const postCode = JSON.parse(
        localStorage.getItem('preselectedDeliveryAddress'),
      ).postalCode;
      const category = window.location.href.replace(/\D+/g, '');
      const productData = await productSearch(postCode, category, branchCode);
      const returnedData = await productData;
      updateData(returnedData);
    };
    getData();
  }, []);
  return data;
};
