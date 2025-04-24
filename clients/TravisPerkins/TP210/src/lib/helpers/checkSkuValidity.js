const skuValidity = (data) => {
  const isPDP = () => {
    return !!document.querySelector('[data-test-id="pdp-wrapper"]');
  };
  const isPLP = () => {
    return (
      (window.location.pathname.indexOf('/search/') !== -1 || window.location.pathname.indexOf('/c/') !== -1) &&
      !!document.querySelector('[data-test-id="plp-list"]')
    );
  };

  if (isPDP()) {
    const productCode = document.querySelector('[data-test-id="product-code"]').innerText;
    return data.some((id) => id == productCode);
  } else {
    return true;
  }
};

export default skuValidity;
