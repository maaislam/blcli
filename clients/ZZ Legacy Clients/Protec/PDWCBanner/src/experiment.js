const Experiment = {
  init() {
    // Setup
    const { components } = Experiment;
    document.body.classList.add('PDWCBanner');
    components.build();
  },

  components: {
    build() {
      document.getElementById('header').insertAdjacentHTML('beforebegin', `
        <section class="PDWC_Banner">Use voucher code “<strong>FOOTBALL50</strong>” for 50% off your order!*</section>
      `);
    },
  },
};

export default Experiment;
