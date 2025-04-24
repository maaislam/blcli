export default (site, ID, freeDeliveryThreshold, extraClasses) => {
  let result = `
    <ul class="${ID}-comp__methods ${extraClasses}">
      <li>
        <h3>Standard Delivery</h3>
        <p class="${ID}-comp__method-price">
          <span ng-show="CartData.SubTotal >= ${freeDeliveryThreshold}">FREE</span>
          <span ng-show="CartData.SubTotal < ${freeDeliveryThreshold}">£3.00</span>
        </p>
        <p class="${ID}-comp__method-days">
          3-7 Working Days
        </p>
        <img src="https://service.maxymiser.net/cm/images-eu/1/1/1/0A255EDB09BF8047CC5FCEB34F1C04D54264C2EDF712E0FEAA68066B13658D4E/avon-mas/AG033---IMB-Basket---UK/8897f63e.png">
      </li>
      <li>
        <h3>Express Delivery</h3>
        <p class="${ID}-comp__method-price">
          <span>£4.50</span>
        </p>
        <p class="${ID}-comp__method-days">
          1-2 Working Days
        </p>
        <img src="https://service.maxymiser.net/cm/images-eu/1/1/1/6C441A279E21F4A598C9AC09A2EBABEB0855DAF33D6A776042AFE142D7193D3B/avon-mas/AG033---IMB-Basket---UK/91fbd928.png">
      </li>
    </ul>
  `;


  if(site == 'za') {
    result = `
    <ul class="${ID}-comp__methods ${extraClasses}">
      <li>
        <h3>Standard Delivery</h3>
        <p class="${ID}-comp__method-price">
          <span ng-show="CartData.SubTotal >= ${freeDeliveryThreshold}">FREE</span>
          <span ng-show="CartData.SubTotal < ${freeDeliveryThreshold}">R68,00</span>
        </p>
        <p class="${ID}-comp__method-days">
          3-7 Working Days
        </p>
        <img src="https://service.maxymiser.net/cm/images-eu/1/1/1/0A255EDB09BF8047CC5FCEB34F1C04D54264C2EDF712E0FEAA68066B13658D4E/avon-mas/AG033---IMB-Basket---UK/8897f63e.png">
      </li>
      <li>
        <h3>Express Delivery</h3>
        <p class="${ID}-comp__method-price">
          <span>R105,00</span>
        </p>
        <p class="${ID}-comp__method-days">
          1-2 Working Days
        </p>
        <img src="https://service.maxymiser.net/cm/images-eu/1/1/1/6C441A279E21F4A598C9AC09A2EBABEB0855DAF33D6A776042AFE142D7193D3B/avon-mas/AG033---IMB-Basket---UK/91fbd928.png">
      </li>
    </ul>
    `;
  }

  if(site == 'ru') {
    result = `
    <ul class="${ID}-comp__methods ${extraClasses}">
      <li>
        <h3>Курьер СДЭК</h3>
        <p class="${ID}-comp__method-price">
          <span ng-show="CartData.SubTotal >= ${freeDeliveryThreshold}">Бесплатно</span>
          <span ng-show="CartData.SubTotal < ${freeDeliveryThreshold}">от 249 рублей</span>
        </p>
        <img src="https://service.maxymiser.net/cm/images-eu/1/1/1/0A255EDB09BF8047CC5FCEB34F1C04D54264C2EDF712E0FEAA68066B13658D4E/avon-mas/AG033---IMB-Basket---UK/8897f63e.png">
      </li>
      <li>
        <h3>Пункты выдачи*</h3>
        <p class="${ID}-comp__method-price">
          <span>от 199 рублей</span>
        </p>
        <p>*Постаматы PickPoint, Почта России, Связной</p>
        <img src="https://service.maxymiser.net/cm/images-eu/1/1/1/10B64B4ECDC43BFADFD7FEB323967D9135557C5E009B65102F41690730F49D0A/avon-mas/AG033---IMB-Basket---RU/37d20397.png">
      </li>
    </ul>
    `;
  }

  return result;
};
