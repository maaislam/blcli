const lightBoxHTML = `
<div class="EJ012-overlay"></div>
<div class="EJ012-lightbox_content">
<div class="EJ012-exit">&times;</div>
<div class="EJ012-logo">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 251 38" width="200" height="30"><path d="M10.7 17.2H0v-16h10.7v2H2v12h8.7V17.2z"></path><path d="M1 8.2h7.3v2H1V8.2zM81.8 17.2H71.1v-16h10.7v2h-8.7v12h8.7L81.8 17.2z"></path><path d="M72.1 8.2h7.3v2h-7.3V8.2zM118.1 37.6h-6.8v-10h6.8v1h-5.7v7.9h5.7V37.6z"></path><path d="M111.9 31.6h4.7v1.1h-4.7V31.6zM175.1 37.6h-6.7v-10h6.7v1h-5.7v7.9h5.7V37.6z"></path><path d="M168.9 31.6h4.7v1.1h-4.7V31.6zM160.3 37.6h-1v-10h6.3v1h-5.3V37.6z"></path><path d="M159.8 31.7h4.3v1h-4.3V31.7zM23.4 17.2h-2v-16h8.1c0.1 0 2.8-0.1 4.4 1.5 0.8 0.8 1.2 1.8 1.2 3.1 0 3.8-3.1 5.2-5.8 5.2h-6L23.4 17.2 23.4 17.2zM23.4 8.9h6c1.1 0 3.8-0.3 3.8-3.2 0-0.7-0.2-1.2-0.6-1.6 -0.9-0.8-2.5-1-3-0.9h-6.1L23.4 8.9 23.4 8.9zM34.5 17.1l-6.4-6.5 1.4-1.4 7.8 7.9H34.5zM58.7 17.1L48.3 4.2v12.9h-2v-16h2.1l10 12.5V1.4h2v15.8L58.7 17.1zM98.9 17.2c-1.6 0-6.5 0-7.1-3.3l2-0.4c0.3 1.4 3.3 1.6 5.2 1.6 3.8 0 5.1-1.8 5.1-2.6 0-1.4-2-2.6-5.6-3.4 -4.6-1-6.7-2.4-6.7-4.6 0-0.6 0.3-3.7 7.1-3.7 5.4 0 6.5 2.4 6.7 2.7l-1.8 0.8c0 0-0.8-1.5-4.8-1.5 -4.2 0-5.1 1.3-5.1 1.7 0 1.1 1.7 2 5.1 2.7 5.9 1.2 7.2 3.6 7.2 5.3C106.1 14.4 104.1 17.2 98.9 17.2L98.9 17.2zM226.8 17.2h-10.7v-16h10.7v2h-8.7v12h8.7V17.2z"></path><path d="M217.1 8.2h7.3v2h-7.3V8.2zM203.8 17.1L193.4 4.2v12.9h-2v-16h2.1l10 12.5V1.1h2v16H203.8zM243.9 17.2c-1.6 0-6.5 0-7.1-3.3l2-0.4c0.3 1.4 3.3 1.6 5.2 1.6 3.8 0 5.1-1.8 5.1-2.6 0-1.4-2-2.6-5.6-3.4 -4.6-1-6.7-2.4-6.7-4.6 0-0.6 0.3-3.7 7.1-3.7 5.4 0 6.5 2.4 6.7 2.7l-1.9 0.9c0 0-0.8-1.5-4.8-1.5 -4.2 0-5.1 1.3-5.1 1.7 0 1.1 1.7 2 5.1 2.7 5.9 1.2 7.2 3.6 7.2 5.3C251 14.4 249.1 17.2 243.9 17.2zM113.4 1.2h13.9v2h-13.9V1.2zM119.3 2.6h2v14.5h-2V2.6zM147.5 17.1l-0.5-1.9c3.4-0.9 3.3-2.6 3.3-2.8V1.2h2v10.9C152.4 13.4 151.7 16 147.5 17.1z"></path><path d="M172.1 17.1c-2.5 0-4.6-0.8-6-2.2 -2.4-2.4-2.3-5.8-2.3-5.9V8.6c0-0.1 0-3.5 2.3-5.9 1.5-1.5 3.5-2.2 6-2.2 6.7 0 8.7 5.2 8.8 7.9v0.8C180.7 11.9 178.7 17.1 172.1 17.1zM172.1 2.5c-2 0-3.5 0.6-4.6 1.6 -1.8 1.8-1.8 4.5-1.8 4.5V9c0 0 0 2.7 1.8 4.5 1.1 1.1 2.6 1.6 4.6 1.6 6.4 0 6.8-5.7 6.8-6V8.4C178.8 8.2 178.5 2.5 172.1 2.5zM91.7 37.6c-1.5 0-2.8-0.5-3.6-1.3 -1.4-1.4-1.4-3.5-1.4-3.5v-0.2c0-0.1 0-2.1 1.4-3.5 0.9-0.9 2.1-1.3 3.6-1.3 5 0 5.3 4.7 5.3 4.7V33C97 32.9 96.7 37.6 91.7 37.6zM91.7 28.7c-1.2 0-2.2 0.3-2.9 1 -1.1 1.1-1.1 2.8-1.1 2.8v0.2c0 0 0 1.7 1.1 2.8 0.7 0.7 1.6 1 2.9 1 4 0 4.2-3.6 4.2-3.7v-0.4C95.9 32.2 95.7 28.7 91.7 28.7zM83.4 37.6h-5.6v-10h1v9h4.6V37.6zM150.8 37.6h-5.5v-10h1v9h4.5V37.6zM103.7 37.6l-4.1-9.8 1-0.4 3.1 7.7 3.1-7.7 0.9 0.4L103.7 37.6zM132.4 36.3c-0.4 0.4-0.8 0.8-1.3 1 -0.5 0.2-1 0.3-1.5 0.3 -1 0-1.8-0.3-2.3-1 -0.5-0.5-0.7-1.2-0.7-1.8s0.2-1.1 0.6-1.6c0.4-0.5 1-0.9 1.7-1.3 -0.4-0.5-0.7-0.9-0.9-1.2 -0.1-0.3-0.2-0.6-0.2-0.9 0-0.6 0.2-1.1 0.7-1.5 0.5-0.4 1-0.6 1.7-0.6 0.7 0 1.2 0.2 1.6 0.6 0.4 0.4 0.6 0.9 0.6 1.5 0 0.9-0.6 1.7-1.8 2.3l1.7 2.2c0.2-0.4 0.4-0.8 0.5-1.3l1.2 0.3c-0.2 0.8-0.5 1.5-0.9 2.1 0.4 0.6 0.9 1.1 1.5 1.5l-0.8 0.9C133.4 37.3 132.9 36.9 132.4 36.3L132.4 36.3zM131.7 35.4l-2.2-2.7c-0.6 0.4-1.1 0.7-1.3 1.1 -0.2 0.3-0.3 0.7-0.3 1 0 0.4 0.2 0.8 0.5 1.2 0.3 0.4 0.8 0.6 1.3 0.6 0.4 0 0.7-0.1 1.1-0.3C131.2 36 131.5 35.7 131.7 35.4zM130 31.3c0.5-0.3 0.8-0.6 1-0.8 0.2-0.2 0.2-0.5 0.2-0.8 0-0.3-0.1-0.6-0.3-0.8 -0.2-0.2-0.5-0.3-0.8-0.3 -0.3 0-0.6 0.1-0.8 0.3 -0.2 0.2-0.3 0.5-0.3 0.8 0 0.1 0 0.3 0.1 0.5 0.1 0.2 0.2 0.3 0.3 0.5C129.4 30.7 130 31.3 130 31.3zM154.2 27.6h1v9.9h-1V27.6z"></path></svg>
</div>
<div class="EJ012-subheading">0% APR Finance <span></span></div>
<div class="EJ012-term EJ012-label"><span>Term (months)</span><select class="EJ012-month"></select></div>
<div class="EJ012-deposit EJ012-label"><span>Deposit</span><div class="EJ012-depositAmountField"><div class="EJ012-depositAmountField__prefix"><span>£</span></div><input class="EJ012-depositAmount"></input></div>
<span class="EJ012-deposit_text EJ012-deposit_text--error"></span>
<span class="EJ012-deposit_text">Minimum deposit is 10%</span>
</div>
<div class="EJ012-slider">
<span>Slide to change deposit amount</span>
<input type="range" min="1" max="100" step="1" class="EJ012-slider_bar">
<div class="EJ012-minamount"></div><div class="EJ012-maxamount"></div>
</div>
<div class="EJ012-calculate">Calculate</div>
<div class="EJ012-payment_summary">
<div class="EJ012-payment_row"><div class="EJ012-pay_label">Monthly Payment:</div><div class="EJ012-finalAmount EJ012-monthly"></div></div>
<div class="EJ012-payment_row"><div class="EJ012-pay_label">Interest Rate:</div><div class="EJ012-finalAmount"> 0%</div></div>
<div class="EJ012-payment_row"><div class="EJ012-pay_label">Total Payable:</div><div class="EJ012-finalAmount EJ012-total"></div></div>
<div class="EJ012-addToBag">Add to bag</div>
</div>
<div class="EJ012-centre">
<a class="EJ012-tcs" target="_blank" href="/webstore/static/customerservice/customer_paymentoptions.do#credit">More information on Interest Free Credit</a>
</div>
</div>
</div>`;

export default lightBoxHTML;
