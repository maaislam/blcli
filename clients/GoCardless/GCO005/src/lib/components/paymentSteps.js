const paymentSteps = ({ paymentMethod, header, step1, step2, step3, tablePos }, fireEvent) => {
  document.querySelectorAll('.GCO005__payment-steps--signup-cta__btn ').forEach((el) => {
    el.closest('.GCO005__payment-steps').remove();
  });
  let stepsHtmlStr = `
  <div class="GCO005__payment-steps">
  <div class="GCO005__payment-steps--title">${header}</div>
  <div class="GCO005__payment-steps--steps">
      <div class="step1">
          <div class="step1__logo">
              <img width="32" height="32" src="https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/Decorative%20_%20Simple@4x.png" alt="" />
          </div>
          <div class="step1__stepcount">Step 1</div>
          <div class="step1__details">${step1}</div>
      </div>
      <div class="step2">
          <div class="step2__logo">
          <img width="32" height="32" src="https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/Decorative%20_%20Money@4x.png" alt="" />
          </div>
          <div class="step2__stepcount">Step 2</div>
          <div class="step2__details">${step2}</div>
      </div>
      <div class="step3">
          <div class="step3__logo">
          <img width="32" height="32" src="https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/Decorative%20_%20Customer@4x.png" alt="" />
          </div>
          <div class="step3__stepcount">Step 3</div>
          <div class="step3__details">${step3}</div>
      </div>
  </div>
  <div class="GCO005__payment-steps--signup-cta">
      <a class="GCO005__payment-steps--signup-cta__btn "
         href="https://manage.gocardless.com/signup?widget=hook">Sign up</a>
  </div>  
</div>
`;

  document.querySelector(tablePos.id).insertAdjacentHTML(tablePos.type, stepsHtmlStr);
  const newSignupBtn = document.querySelector('.GCO005__payment-steps--signup-cta__btn');

  newSignupBtn?.addEventListener('click', (e) => {
    fireEvent('Customer clicked the GCO005 Signup Button');
  });
};

export default paymentSteps;
