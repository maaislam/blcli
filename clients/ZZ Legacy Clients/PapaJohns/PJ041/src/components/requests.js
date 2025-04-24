
/**
 * Get basket contents
 *
 * @return {Promise}
 */
export const getBasketContents = () => {
  return new Promise((resolve, reject) => {
    const $ = window.jQuery;

    const mainForm = document.forms['aspnetForm'];
    const url = mainForm.action;
    const extraData = {
      __EVENTTARGET: 'ctl00$_objHeader$lbBasketItem', // See __doPostback definition 
    };
    const mainFormSerialized = $(mainForm).serializeArray();
    const requestData = {};

    mainFormSerialized.forEach((o) => {
      if(o.name && o.value) {
        requestData[o.name] = o.value;
      }
    });

    const requestDataFinal = Object.assign(requestData, extraData);

    $.ajax({
      url: url,
      type: 'post',
      data: requestDataFinal,
      success: (data) => {
        const div = document.createElement('div');
        div.innerHTML = data;

        const basketDiv = div.querySelector('#fancyBasketMobile');

        resolve(basketDiv);
      }
    });
  });
};
