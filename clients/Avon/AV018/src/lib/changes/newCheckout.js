import shared from '../shared';

export default () => {
  const { $, rootScope } = shared;

  /** Remove rep delivery as a delivery option */
  const removeRepDeliveryNewCheckout = () => {
    const $shippingOptions = $('[ng-repeat="shippingOption in shippingOptions"]');
    $shippingOptions.each((index, element) => {
      const $shippingOption = $(element);
      const optionData = JSON.parse($shippingOption.find('input').attr('value'));
      if (optionData?.Description === 'REPRESENTATIVE delivery') {
        $shippingOption.remove();
      }
    });
  };

  // Make changes if app layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(() => {
      removeRepDeliveryNewCheckout();
    }, 250);
  });

  // Make changes if AJAX request is completed
  rootScope.$on('BaseService.AjaxComplete', () => {
    setTimeout(() => {
      removeRepDeliveryNewCheckout();
    }, 250);
  });

  // Init
  removeRepDeliveryNewCheckout();
};
