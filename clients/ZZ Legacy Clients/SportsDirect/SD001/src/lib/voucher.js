let formData = null;
let formRequest = false;

const voucher = {
  submitForm() {
    const submitBtn = document.querySelector('.SD001-applyVoucher');
    const input = document.querySelector('input[name="SD001-voucherCode"]');
    if (submitBtn && input) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const val = input.value;
        if (val) {
          this.postVoucher(val);
        }
      });
    }
  },
  ajaxForm() {
    if (formRequest === false) {
      const URL = 'https://www.sportsdirect.com/checkout/usevoucher';
      formRequest = true;
      $.ajax({
        type: 'GET',
        url: URL,
        success: (data) => {
          const div = document.createElement('div');
          div.insertAdjacentHTML('afterbegin', data);

          const formRef = div.querySelector('#Form');
          const action = formRef.getAttribute('action');
          const enctype = formRef.getAttribute('enctype');
          let aspNet = formRef.querySelector('.aspNetHidden:first-child');
          if (aspNet) {
            aspNet = aspNet.cloneNode(true);
          }
          let inputHidden = formRef.querySelector('input[id*="PromoCodeApplication_txtCode"]');
          if (inputHidden) {
            inputHidden = inputHidden.cloneNode(true);
          }
          let inputHidden2 = formRef.querySelector('input[name*="PromoCodeApplication$btnApply"]').cloneNode(true);

          document.body.insertAdjacentHTML('beforeend', `
            <form class="SD001_form" method="post" action="${action}" enctype="${enctype}">
            </form>
          `);

          formData = document.querySelector('.SD001_form');
          formData.appendChild(aspNet);
          formData.appendChild(inputHidden);
          formData.appendChild(inputHidden2);
        },
      });
    }
  },
  postVoucher(val) {
    const hiddenVal = document.querySelector('input[id*="PromoCodeApplication_txtCode"]');
    const addedSubmit = document.querySelector('input[name*="PromoCodeApplication$btnApply"]');
    const formPost = new FormData(formData);

    hiddenVal.value = val;

    $.ajax({
      type: 'post',
      data: formPost,
      success: (data) => {
        const div = document.createElement('div');
        div.innerHTML = data;
        addedSubmit.click();
      },
      cache: false,
      contentType: false,
      processData: false,
      url: '/checkout/usevoucher',
    });
  },
  init() {
    this.ajaxForm();
    this.submitForm();
  }
}

export default voucher;