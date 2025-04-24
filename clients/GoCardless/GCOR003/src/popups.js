import shared from '../../../../core-files/shared';

const { ID } = shared;
let sl = '';
const aws = 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCOR003/gc003_';
const elp = `<div><p><strong>End late payments</strong></p>GoCardless automatically collects payments you’re owed on the due date.</div>`;
const str = `<div><p><strong>Save time, reduce stress</strong></p>No more wasting time chasing up payments.</div>`;
const trust = `<strong>60,000+ businesses</strong> around the world trust us to power their payments`;
const rc = `<div><p><strong>Reduce costs</strong></p>Time saved chasing payments, plus skipping high card fees, means cash back in your pocket.</div>`;
const software = `https://gocardless.com/en-us/partners/`;

const popups = (btnContainer) => {
  return {
    ach: `
      <div class="${ID}_image" style="background-image:url(${aws}img1.png)"></div>
      <div class="${ID}_text">
        <h3>A modern way to collect ACH debit payments: GoCardless</h3>
        <p><strong>GoCardless lets you easily collect ACH debit payments</strong> from your customers, online or through your existing accounting/invoicing software, including Salesforce and Xero.</p>
        ${elp}
        ${str}
        ${rc}
        <p>${trust}, including DocuSign, Deloitte, and SurveyMonkey.</p>
        ${btnContainer}
      </div>
  `,
    dd: `
       <div class="${ID}_image" style="background-image:url(${aws}img2.png)"></div>
      <div class="${ID}_text">
        <h3>What’s the best way to get started with Direct Debit?</h3>
        <p><strong>GoCardless lets you collects Direct Debit payments</strong> through your website and manages all payments through our dashboard or through your existing accounting/invoicing software.</p>
        ${elp}${str}
        <div><p><strong>Give your customers what they want</strong></p>Direct Debit is the UK’s favourite way to pay in more than 85% of payment use cases.</div>
        <p>${trust}, including DocuSign, The Guardian, and Tripadvisor.</p>
        <div class="${ID}_ctas">
          <a class="${ID}_button ${ID}_popupCta" href="https://manage.gocardless.com/signup/">Get started</a>
          <a class="${ID}_buttonSc ${ID}_popupCtaSecondary" href="${sl}">
            Learn more
          </a>
        </div>
      </div>
`,
    op: `
       <div class="${ID}_image online-payment">
          <img src="${aws}img${location.pathname.includes('/en-au') ? '9' : '8'}.png" alt="online-payment" />
       </div>
      <div class="${ID}_text">
        <h3>Collect payments hassle free</h3>
        <p>End late payments, reduce your churn, and have an up-to-date view of your payment collection. <strong>With GoCardless you can collect payments through your website and manage all payments</strong> through our dashboard or through your existing accounting/invoicing software.</p>
          <div><p><strong>Easily collect one-off or recurring payments</strong></p>from your customers, automatically on the due date.</div>
          <div><p><strong>Use our online dashboard or one of <a href="${software}">300+ other softwares</a> we connect with,</strong> including Xero, QuickBooks, and Sage.</p></div>
          <div><p>Trusted by 60,000+ businesses around the world, <strong>including DocuSign, The Guardian, and Tripadvisor</strong></p></div>
        ${btnContainer}
      </div>
`,
    sepa: `
      <div class="${ID}_image sepa" style="background-image:url(${aws}img4.png)"></div>
      <div class="${ID}_text">
        <h3>A modern way to collect SEPA Direct Debit payments: GoCardless</h3>
        <p><strong>GoCardless lets you easily collect SEPA Direct Debit payments</strong> from your customers in <a href="https://support.gocardless.com/hc/en-gb/articles/115005758445-SEPA-Available-countries-for-payment-collection">15+ European countries</a>. Use our dashboard or one of 300+ other softwares we connect with, including Salesforce, Zoho, and Zuora.</p>
        ${elp}${str}${rc}
        <p>${trust}, including DocuSign, Tripadvisor, and The Guardian.</p>
        ${btnContainer}
      </div>
`,
  };
};

export default (pageType, link = null, btnContainer) => {
  if (link) sl = link;

  return popups(btnContainer)[pageType];
};
