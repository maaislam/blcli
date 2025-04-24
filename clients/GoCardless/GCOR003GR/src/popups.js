import shared from '../../../../core-files/shared';

const { ID } = shared;
let sl = '';
const aws = 'https://brainlabs-media.s3.eu-west-2.amazonaws.com';
const elp = `<li><strong>End late payments</strong> - GoCardless automatically collects payments you’re owed on the due date.</li>`;
const str = `<li><strong>Save time, reduce stress</strong> - No more wasting time chasing up payments.</li>`;
const trust = `<strong>60,000+ businesses</strong> around the world trust us to power their payments`;
const rc = `<li><strong>Reduce costs</strong> - Time saved chasing payments, plus skipping high card fees, means cash back in your pocket.</li>`;
const software = `https://gocardless.com/en-us/partners/`;

const popups = {
  ach: `
      <img class="${ID}_image" src="${aws}/gc/gc003_img1.png" />
      <div class="${ID}_text">
        <p><strong>GoCardless lets you easily collect ACH debit payments</strong> from your customers, online or through your existing accounting/invoicing software, including Salesforce and Xero.</p>
        <ul>
          ${elp}${str}${rc}
        </ul>
        <p>${trust}, including DocuSign, Deloitte, and SurveyMonkey.</p>
      </div>
  `,
  dd: `
      <img class="${ID}_image" src="${aws}/gc/gc003_img2.png" />
      <div class="${ID}_text">
        <h3>What’s the best way to get started with Direct Debit?</h3>
        <p><strong>GoCardless lets you collects Direct Debit payments</strong> through your website and manages all payments through our dashboard or through your existing accounting/invoicing software.</p>
        <ul>
          ${elp}${str}
          <li><strong>Give your customers what they want</strong> - Direct Debit is the UK’s favourite way to pay in more than 85% of payment use cases.</li>
        </ul>
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
      <img class="${ID}_image" src="${aws}/gc/gc003_img3.png" />
      <div class="${ID}_text">
        <p>End late payments, reduce your churn, and have an up-to-date view of your payment collection. <strong>With GoCardless you can collect payments through your website and manage all payments</strong> through our dashboard or through your existing accounting/invoicing software.</p>
        <ul>
          <li><strong>Easily collect one-off or recurring payments</strong> from your customers, automatically on the due date</li>
          <li>Use our <strong>online dashboard or one of <a href="${software}">300+ other softwares</a> we connect with,</strong> including Xero, QuickBooks, and Sage</li>
          <li>Trusted by 60,000+ businesses around the world, <strong>including DocuSign, The Guardian, and Tripadvisor</strong></li>
        </ul>
      </div>
`,
  sepa: `
      <img class="${ID}_image" src="${aws}/gc/gc003_img4.png" />
      <div class="${ID}_text">
        <p><strong>GoCardless lets you easily collect SEPA Direct Debit payments</strong> from your customers in <a href="https://support.gocardless.com/hc/en-gb/articles/115005758445-SEPA-Available-countries-for-payment-collection">15+ European countries</a>. Use our dashboard or one of 300+ other softwares we connect with, including Salesforce, Zoho, and Zuora.</p>
        <ul>
          ${elp}${str}${rc}
        </ul>
        <p>${trust}, including DocuSign, Tripadvisor, and The Guardian.</p>
      </div>
`,
};

export default (pageType, link = null) => {
  if (link) sl = link;
  return popups[pageType];
};
