const Experiment = {
  init() {
    const isMobile = /checkout-mobile.aspx/.test(window.location.href);

    const addVisaError = () => {
      const message = 'Please note that Visa are currently experiencing technical issues across the UK and Europe, which are causing payments to fail. If your card payment fails please try an alternative payment method.';
      let paymentTitle;
      let css;
      if (isMobile) {
        paymentTitle = document.querySelector('#ctl00_cphBody_pnlPaymentChoice > h3');
        css = 'color: red; margin: 10px 0; font-size: 16px;';
      } else {
        paymentTitle = document.querySelector('#ctl00_cphBody_h2TitleChooseAPaymentMethod');
        css = 'color: red; margin: 10px 0 0 0; font-size: 16px;';
      }
      if (paymentTitle) {
        paymentTitle.insertAdjacentHTML('afterend', `<p class="PJXXX_error" style="${css}">${message}</p>`);
      }
    };

    /** Initial call */
    addVisaError();

    /** Re-add on page reload */
    const { prm } = window;
    prm.add_pageLoaded(() => {
      try {
        const errorMsg = document.querySelector('.PJXXX_error');
        if (!errorMsg) {
          addVisaError();
        }
      } catch (e) {} // eslint-disable-line
    });
  },
};

export default Experiment;
