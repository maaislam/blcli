const lightBoxHTML = `
<div class="HS005-overlay"></div>
<div class="HS005-lightbox_content">
<div class="HS005-exit">&times;</div>
<div class="HS005-logo">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235 60">
      <path fill="#a01d29" d="M21.6,16.8V30h3.9V1h-3.9v12.9h-17V1H0.7v29h3.9V16.8H21.6z M31.3,49.5V55h1.6V43h-1.6v5.3h-7V43h-1.6v12h1.6
        v-5.5H31.3z"></path>
      <circle fill="#a01d29" cx="38.1" cy="28.1" r="2"></circle>
      <path fill="#a01d29" d="M50.9,28.4c2.2,1.3,4.6,1.9,6.9,1.9c1.1,0,2.2-0.1,3.2-0.4c2.5-0.7,4.4-2.1,5.2-3.8c2.7-6-3.6-10.7-5.7-12.2
        L59,12.8c-4.2-3-4.8-3.6-4.8-5.2c0-1.8,2.2-3.4,4.9-3.4c2.9,0,6.3,2,6.3,2V2.3c-0.1-0.1-2.1-2-6.3-2c-4.9,0-8.8,3.2-8.8,7.3
        c0,3.7,2.1,5.3,6.4,8.3l1.5,1.1c5.9,4.3,4.8,6.5,4.4,7.5c-0.3,0.6-1.2,1.3-2.6,1.7c-1.2,0.3-4.5,0.8-8-1.7l-1.1-0.9
        C50.9,23.6,50.9,28.4,50.9,28.4z M140.4,30h-4V6.1l-10.3,12.4L115.7,6.1V30h-4V0.7h4.6l9.7,11.5l9.7-11.5h4.6V30z M164.4,30.4h-0.8
        c-4,0-7.1-1.2-9.3-3.5c-3.3-3.5-3.2-8.3-3.2-9V0.8h4V18c0,0-0.2,3.7,2.1,6.1c1.4,1.5,3.6,2.3,6.4,2.3h0.8c2.8,0,5-0.8,6.4-2.3
        c2.3-2.4,2.1-6.1,2.1-6.1V0.8h4v17.1c0,0.7,0.1,5.5-3.2,9C171.5,29.2,168.4,30.4,164.4,30.4z M192.3,26.9V17h10.3l-1.8-3h-8.5V3.9
        h12.8v-3h-16.8v29h17.4v-3H192.3z M205.4,53.9v-4.1h4.2l-0.7-1.3h-3.5v-4.1h5.3v-1.3h-7v12.1h7.2v-1.3H205.4z M146.4,53.9v-4.1h4.2
        l-0.7-1.3h-3.5v-4.1h5.3v-1.3h-7v12.1h7.2v-1.3H146.4z M98.2,53.9v-4.1h4.3l-0.8-1.3h-3.5v-4.1h5.3v-1.3h-6.9v12.1h7.2v-1.3H98.2z
          M48.2,53.9v-4.1h4.3l-0.8-1.3h-3.5v-4.1h5.3v-1.3h-6.9v12.1h7.2v-1.3H48.2z M234.9,29.9h-17.1V0.8h3.9v26.1h13.2L234.9,29.9z
          M191.1,55.2H184V43.1h1.7v10.8h5.4L191.1,55.2z M171.4,55.2h-7.1V43.1h1.6v10.8h5.5V55.2z M10.7,42.9H0.6v2h4v10h2v-10h4.1V42.9z
          M80,59.7l-0.7-1.9c1.9-0.7,1.8-2.8,1.8-2.8V43h2v12C83.2,56.1,82.6,58.7,80,59.7z M131.4,43l-3.5,9l-3.6-9h-1.2l-3.7,9l-3.4-9
        h-1.8l4.4,11.8h1.7l3.4-8.7l3.4,8.7h1.7l4.4-11.8H131.4z M89.5,0.7h-2.7L74.2,29.9h4.4l4.2-9h11.5l4.3,9h4.4L89.5,0.7z M83.8,17.9
        l4.4-10.5l4.7,10.5H83.8z M228.9,49.5c0.4-0.2,0.8-0.4,1.1-0.7c0.6-0.6,1-1.3,1-2.3c0-0.9-0.3-1.7-0.9-2.3
        c-1.6-1.5-5.3-0.7-5.3-0.7v11.3h1.3v-4.9h0.1c0.5,0,0.8,0,1.5-0.1l3.8,5h1.6L228.9,49.5L228.9,49.5z M226,48.6v-4.4
        c0.7,0,2.2,0.2,3.1,1c0.4,0.3,0.6,0.8,0.6,1.3c0,0.6-0.2,1-0.5,1.3C228.2,48.6,226.6,48.6,226,48.6L226,48.6z"></path>
    </svg>
</div>
<div class="HS005-subheading">0% APR Finance <span></span></div>
<div class="HS005-term HS005-label"><span>Term (months)</span><select class="HS005-month"></select></div>
<div class="HS005-deposit HS005-label"><span>Deposit</span><div class="HS005-depositAmountField"><div class="HS005-depositAmountField__prefix"><span>£</span></div><input class="HS005-depositAmount"></input></div>
<span class="HS005-deposit_text HS005-deposit_text--error"></span>
<span class="HS005-deposit_text">Minimum deposit is 10%</span>
</div>
<div class="HS005-slider">
<span>Slide to change deposit amount</span>
<input type="range" min="1" max="100" step="1" class="HS005-slider_bar">
<div class="HS005-minamount"></div><div class="HS005-maxamount"></div>
</div>
<div class="HS005-calculate">Calculate</div>
<div class="HS005-payment_summary">
<div class="HS005-payment_row"><div class="HS005-pay_label">Monthly Payment:</div><div class="HS005-finalAmount HS005-monthly"></div></div>
<div class="HS005-payment_row"><div class="HS005-pay_label">Interest Rate:</div><div class="HS005-finalAmount"> 0%</div></div>
<div class="HS005-payment_row"><div class="HS005-pay_label">Total Payable:</div><div class="HS005-finalAmount HS005-total"></div></div>
<div class="HS005-addToBag">Add to bag</div>
</div>
<div class="HS005-centre">
<a class="HS005-tcs" target="_blank" href="/webstore/static/customerservice/shopping/interestFreeCredit.cdo">More information on Interest Free Credit</a>
</div>
</div>
</div>`;

export default lightBoxHTML;
