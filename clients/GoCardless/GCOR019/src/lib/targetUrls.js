const gco08Urls = [
  '/en-us/guides/ach/ach-fees-how-much-does-ach-cost/',
  '/en-us/guides/intro-to-direct-debit/guide-to-mandates/',
  '/en-us/guides/posts/ach-common-objections/',
  '/en-us/guides/ach/how-to-access-ach-debit/',
  '/en-us/guides/ach/ach-payment-processing-time/',
  '/en-us/guides/posts/what-is-an-ach-debit-block/',
  '/en-us/guides/posts/what-does-ach-hold-mean/',
  '/en-us/guides/posts/secure-payment-methods/',
  '/en-us/guides/intro-to-direct-debit/merchants-guide/',
  '/en-us/guides/posts/how-to-set-up-bacs-payments-for-your-business/',
  '/en-us/guides/posts/what-is-an-ach-payment-api/',
  '/en-us/guides/posts/how-to-create-online-payment-system/',
  '/en-us/guides/posts/how-to-send-an-echeck/',
  '/en-us/guides/ach/ach-debit-the-easy-way/',
  '/en-us/guides/intro-to-direct-debit/cash-checks-bank-transfer-vs-direct-debit/',
  '/en-us/guides/posts/echecks-what-are-they/',
  '/en-us/guides/posts/en-us-how-to-write-an-invoice-email/',
  '/en-us/guides/posts/credit-card-fees-for-merchants/',
  '/en-us/guides/posts/en-us-how-businesses-can-keep-track-of-payments/',
  '/en-us/guides/posts/basics-online-payment-processing/',
  '/en-us/guides/intro-to-direct-debit/paper-vs-paperless/',
  '/en-us/guides/posts/the-8-best-payment-processing-systems/',
  '/en-us/guides/posts/fastest-way-to-transfer-money-between-banks/',
  '/en-us/guides/posts/how-to-track-an-ach-transaction/',
  '/en-us/guides/posts/pros-and-cons-ach-payment-processing/',
  '/en-us/guides/intro-to-direct-debit/guide-for-payers/',
  '/en-us/guides/posts/how-to-stop-ach-payments/',
  '/en-us/guides/posts/what-is-an-instant-ach-transfer/',
  '/en-us/guides/ach/ach-authorization-forms/',
  '/en-us/guides/posts/how-to-accept-ach-payments-guide-for-small-businesses/',
  '/en-us/guides/posts/the-4-best-ach-processing-companies/',
  '/en-us/guides/intro-to-direct-debit/standing-order/',
  '/en-us/guides/posts/how-to-make-ach-payments/',
  '/en-us/guides/ach/what-is-an-ach-payment/',
  '/en-us/guides/posts/merchant-account-for-small-businesses/',
  '/en-us/guides/posts/secure-payments/',
  '/en-us/guides/posts/payment-gateways/',
  '/en-us/guides/posts/online-payment-options/',
  '/en-us/guides/posts/talking-to-customers-about-ach-debit/',
  '/en-us/guides/posts/guide-to-ach-return-codes/',
  '/en-au/guides/becs-direct-debit/direct-entry-user-id/',
  '/en-au/guides/posts/cancelling-direct-debit/',
  '/en-au/guides/posts/payment-gateways/',
  '/en-au/guides/becs-direct-debit/introduction/',
  '/en-au/guides/posts/online-payment-options/',
  '/en-au/guides/posts/how-to-create-online-payment-system/',
  '/en-au/guides/posts/what-are-the-risks-of-direct-debit/',
  '/en-au/guides/posts/basics-online-payment-processing/',
  '/en-au/guides/becs-direct-debit/requests/',
  '/en-au/guides/becs-direct-debit/timings/',
  '/en-au/guides/posts/how-to-keep-track-of-payments/',
  '/en-au/guides/becs-direct-debit/submitting/',
  '/en-au/guides/posts/talking-to-customers-about-direct-debit/',
  '/en-au/guides/posts/the-best-online-invoice-payment-solutions/',
  '/en-au/guides/posts/integrated-direct-debit/',
  '/guides/moving-customers-to-direct-debit/when-to-ask-customers-to-switch/',
  '/guides/posts/recurring-card-payments/',
  '/guides/posts/guide-to-standing-orders/',
  '/guides/posts/talking-to-customers-about-direct-debit/',
  '/guides/posts/cancelling-direct-debit/',
  '/guides/posts/how-to-write-an-invoice-email/',
  '/guides/sepa/introduction/',
  '/direct-debit/access/',
  '/direct-debit/transferring/',
  '/guides/posts/direct-debit-for-small-business/',
  '/guides/ach/what-is-an-ach-payment/',
  '/direct-debit/guarantee/',
  '/direct-debit/payment-pages/',
  '/guides/posts/how-do-i-reinstate-a-direct-debit/',
  '/guides/intro-to-direct-debit/originator/',
  '/guides/intro-to-direct-debit/guide-for-payers/',
  '/direct-debit/mandates/',
  '/guides/posts/direct-debit-accounting-software/',
  '/guides/intro-to-direct-debit/standing-order/',
  '/guides/posts/advantages-and-disadvantages-of-direct-debit/',
  '/guides/posts/how-to-avoid-non-sterling-transaction-fees/',
  '/guides/moving-customers-to-direct-debit/explaining-gocardless-to-customers/',
  '/guides/posts/can-i-change-a-direct-debit/',
  '/guides/posts/direct-debit-bureaus-for-charities/',
  '/guides/posts/how-much-are-credit-card-merchant-fees/',
  '/guides/posts/how-to-set-up-direct-debit-quickbooks/',
  '/guides/intro-to-direct-debit/cash-cheques-bacs/',
  '/guides/posts/best-wordpress-payment-gateway/',
  '/guides/posts/how-to-track-an-ach-transaction/',
  '/guides/intro-to-direct-debit/membership-organisations/',
  '/guides/sepa/mandates/',
  '/direct-debit/notifications/',
  '/direct-debit/payments/',
  '/guides/posts/how-to-set-up-a-direct-debit-in-sage/',
  '/guides/intro-to-direct-debit/merchants-guide/',
  '/guides/posts/how-to-set-up-direct-debit-payments-xero/',
  '/guides/posts/what-is-payment-reconciliation/',
  '/guides/intro-to-direct-debit/paper-vs-paperless/',
  '/guides/posts/direct-debit-guarantee/',
  '/guides/ach/ach-payment-processing-time/',
  '/guides/posts/is-direct-debit-safe/',
  '/guides/posts/how-do-instalment-payments-work/',
  '/guides/ach/ach-debit-the-easy-way/',
  '/guides/online-payments-guide/online-payments-direct-debit/',
  '/direct-debit/introduction/',
  '/guides/intro-to-direct-debit/guide-to-mandates/',
  '/guides/intro-to-direct-debit/regular-payments/',
  '/guides/rfp/direct-debit-providers-list/',
  '/guides/posts/payment-gateways/',
  '/direct-debit/timings/',
  '/guides/posts/how-to-write-a-late-payment-email/',
  '/guides/online-payments-guide/online-payments-credit-debit-card/',
  '/guides/posts/online-payment-options/',
  '/guides/online-payments-guide/online-payments-bank-transfer/',
  '/guides/posts/6-best-payment-methods-for-small-businesses/',
  '/guides/posts/club-payments/',
  '/guides/posts/what-is-payment-service-provider/',
  '/guides/online-payments-guide/online-payments-introduction/',
  '/guides/posts/how-to-create-online-payment-system/',
  '/guides/posts/what-is-a-payment-processor/',
  '/guides/posts/how-to-set-up-a-payment-link/',
  '/guides/posts/basics-online-payment-processing/',
  '/guides/intro-to-direct-debit/charities-guide/',
  '/guides/posts/what-is-a-payment-request-link-pay-by-link/',
  '/guides/posts/how-do-instant-payments-work/',
  '/guides/posts/the-best-low-cost-online-payment-systems-in-the-uk/',
  '/guides/posts/best-payment-methods-for-sole-traders/',
  '/guides/posts/what-is-a-hosted-payment-page/',
  '/guides/posts/benefits-of-multiple-payment-options-for-businesses/',
];

const nonGco08Urls = [
  '/en-us/guides/invoicing/international/',
  '/en-us/guides/posts/what-does-credit-card-do-not-honor-mean/',
  '/en-us/guides/posts/how-does-depreciation-affect-cash-flow/',
  '/en-us/guides/posts/is-iban-applicable-in-usa/',
  '/en-us/guides/posts/what-is-remittance-advice/',
  '/en-us/guides/posts/receivable-management-service/',
  '/en-us/guides/posts/credit-balance-accounts-receivable/',
  '/en-us/guides/posts/what-is-gross-profit-method/',
  '/en-us/guides/posts/favorable-vs-unfavorable-variance/',
  '/en-us/guides/posts/how-to-calculate-principal-payment/',
  '/en-us/guides/posts/what-is-a-customer-deposit/',
  '/en-us/guides/posts/types-of-financial-statements/',
  '/en-us/guides/posts/what-is-high-low-method/',
  '/en-us/guides/posts/net-sales-formula/',
  '/en-us/guides/posts/equivalent-annual-cost/',
  '/en-us/guides/posts/dividend-payout-ratio/',
  '/en-us/guides/posts/accounting-advance-payments/',
  '/en-us/guides/posts/markup-vs-margin-whats-the-difference/',
  '/en-us/guides/posts/what-is-a-perpetual-license/',
  '/en-us/guides/posts/what-is-an-eft-payment/',
  '/en-us/guides/posts/horizontal-equity-vs-vertical-equity/',
  '/en-us/guides/posts/how-to-write-an-invoice-for-freelance-writing/',
  '/en-us/guides/posts/3d-secure-authentication-explained/',
  '/en-us/guides/posts/how-to-request-payment-for-past-due-invoices/',
  '/en-us/guides/posts/guide-to-retainer-invoices/',
  '/en-us/guides/posts/year-to-date-ytd/',
  '/en-us/guides/posts/what-does-card-declined-by-issuer-mean/',
  '/en-us/guides/posts/guide-to-check-processing/',
  '/en-us/guides/posts/how-to-calculate-net-cash-flow/',
  '/en-us/guides/posts/instalment-payments/',
  '/en-us/guides/posts/what-are-tests-of-control-in-auditing/',
  '/en-us/guides/posts/thank-you-email-for-payment-received/',
  '/en-us/guides/posts/how-calculate-total-asset-turnover-ratio/',
  '/en-us/guides/posts/how-does-accounts-payable-affect-cash-flow/',
  '/en-us/guides/posts/what-is-the-invoice-to-pay-process/',
  '/en-us/guides/posts/average-cost-method/',
  '/en-us/guides/posts/cash-flow-vs-profit/',
  '/en-us/guides/posts/what-is-check-clearing/',
  '/en-us/guides/posts/how-does-the-check-clearing-process-work/',
  '/en-us/guides/posts/best-online-payment-apis/',
  '/en-us/guides/posts/what-is-an-automated-billing-system/',
  '/en-us/guides/posts/what-type-of-economy-does-the-u-s-have/',
  '/en-us/guides/posts/accounts-payable-vs-accounts-receivable/',
  '/en-us/guides/posts/what-does-net-30-mean-finance/',
  '/en-us/guides/posts/calculate-cost-of-goods-sold/',
  '/en-us/guides/posts/en-us-how-to-calculate-the-payback-period/',
  '/en-us/guides/posts/what-is-accumulated-depreciation-formula/',
  '/en-us/guides/posts/difference-between-push-payment-vs-pull-payment/',
  '/en-us/guides/posts/invoicing-requirements-in-the-usa/',
  '/en-us/guides/posts/what-does-recurring-payments-mean/',
  '/en-us/guides/posts/how-to-calculate-net-present-value/',
  '/en-us/guides/posts/what-is-equity-in-accounting/',
  '/en-us/guides/posts/what-is-financial-ratio-analysis/',
  '/en-us/guides/posts/accounts-receivable-goals/',
  '/en-us/guides/posts/what-is-times-interest-earned-ratio/',
  '/en-us/guides/posts/how-to-make-a-financial-plan-for-a-start-up/',
  '/en-us/guides/posts/difference-between-refund-and-reversal-transaction/',
  '/en-us/guides/posts/what-are-bic-and-swift-bank-codes/',
  '/en-us/guides/posts/what-is-the-accounts-receivable-days-formula/',
  '/en-us/guides/posts/should-you-offer-prepaid-subscriptions/',
  '/en-us/guides/posts/pay-in-4-should-you-offer-it/',
  '/en-us/guides/posts/top-7-financial-ratios/',
  '/en-us/guides/posts/top-10-membership-management-software/',
  '/en-us/guides/posts/calculating-accounting-rate-of-return/',
  '/en-us/guides/posts/international-bank-transfer-times/',
  '/en-us/guides/posts/rise-alternative-payment-methods/',
  '/en-us/guides/posts/what-is-a-billing-address/',
  '/en-us/guides/posts/how-to-write-a-late-payment-email/',
  '/en-us/guides/posts/what-is-a-free-market-economy/',
  '/en-us/guides/posts/top-8-accounts-receivable-process-improvement-ideas/',
  '/en-us/guides/invoicing/getting-paid/',
  '/en-us/guides/posts/collect-and-avoid-late-payments/',
  '/en-us/guides/invoicing/what-is-an-invoice/',
  '/en-us/guides/posts/payment-terms/',
  '/en-us/guides/posts/4-essentials-to-consider-when-choosing-a-payment-method/',
  '/en-us/guides/ach/ach-credit-vs-debit/',
  '/en-us/guides/posts/top-international-payment-gateways/',
  '/en-us/guides/posts/what-are-account-to-account-payments/',
  '/en-us/guides/posts/what-is-cloud-accounting-and-how-does-it-work/',
  '/en-us/guides/posts/recurring-card-payments/',
  '/en-us/guides/posts/bacs-payments/',
  '/en-au/guides/posts/how-to-calculate-net-present-value/',
  '/en-au/guides/posts/how-to-write-a-late-payment-email/',
  '/en-au/guides/posts/what-us-a-bsb-number/',
  '/en-au/guides/posts/what-is-remittance-advice/',
  '/en-au/guides/posts/how-to-write-an-invoice-email/',
  '/en-au/guides/posts/business-start-up-costs-australia/',
  '/en-au/guides/posts/what-is-an-eft-payment/',
  '/en-au/guides/posts/how-to-calculate-the-payback-period/',
  '/en-au/guides/posts/what-is-taxable-payments-annual-report/',
  '/en-au/guides/posts/debtors-and-creditors/',
  '/en-au/guides/posts/en-au-what-are-bic-and-swift-bank-codes/',
  '/en-au/guides/posts/sort-code-vs-routing-number/',
  '/en-au/guides/posts/bank-deposit-slip/',
  '/en-au/guides/posts/guide-to-the-provision-for-doubtful-debts/',
  '/en-au/guides/posts/how-to-set-up-dd-austalia/',
  '/en-au/guides/posts/invoice-payment-terms-australia/',
  '/en-au/guides/posts/taking-credit-card-payments-over-the-phone/',
  '/en-au/guides/ach/what-is-an-ach-payment/',
  '/en-au/guides/posts/eftpos-vs-debit-card/',
  '/en-au/guides/posts/how-to-calculate-principal-payment/',
  '/en-au/guides/posts/net-income-vs-gross-income/',
  '/en-au/guides/posts/en-au-what-is-the-cost-of-sales/',
  '/en-au/guides/posts/what-are-tests-of-control-in-auditing/',
  '/en-au/guides/posts/how-does-depreciation-affect-cash-flow/',
  '/en-au/guides/posts/what-is-an-iban/',
  '/en-au/guides/posts/thank-you-email-for-payment-received/',
  '/en-au/guides/posts/guide-startup-business-funding-australia/',
  '/en-au/guides/posts/what-is-a-bas-statement/',
  '/en-au/guides/posts/what-is-residual-value/',
  '/en-au/guides/posts/how-to-pay-yourself-as-a-sole-trader/',
  '/en-au/guides/posts/what-is-payment-escrow-how-works/',
  '/en-au/guides/posts/direct-debit-service-providers-australia/',
  '/en-au/guides/posts/what-is-a-billing-address/',
  '/en-au/guides/posts/what-is-the-accounts-receivable-days-formula/',
  '/en-au/guides/posts/invoice-vs-receipt/',
  '/en-au/guides/posts/what-does-net-30-mean-finance/',
  '/en-au/guides/posts/top-7-financial-ratios/',
  '/en-au/guides/posts/can-i-charge-interest-on-late-payments/',
  '/en-au/guides/posts/is-it-legal-to-amend-an-invoice/',
  '/en-au/guides/posts/accounts-payable-vs-accounts-receivable/',
  '/en-au/guides/posts/dealing-with-do-not-honour-card-refusals/',
  '/en-au/guides/posts/closing-balance/',
  '/en-au/guides/posts/calculating-accounting-rate-of-return/',
  '/en-au/guides/posts/how-to-transfer-money-from-australia-to-the-uk/',
  '/en-au/guides/posts/how-to-calculate-net-cash-flow/',
  '/en-au/guides/posts/how-to-chase-an-overdue-invoice/',
  '/en-au/guides/posts/how-to-write-a-payment-reminder-email/',
  '/en-au/guides/posts/benefit-economies-scale/',
  '/en-au/guides/invoicing-for-australian-businesses/invoicing-overseas-customers/',
  '/en-au/guides/posts/cash-flow-hedge-vs-fair-value-hedge/',
  '/en-au/guides/posts/what-is-the-interest-coverage-ratio/',
  '/en-au/guides/posts/why-payments-fail/',
  '/en-au/guides/posts/accounting-software-for-clubs-and-associations/',
  '/en-au/guides/posts/top-international-payment-gateways/',
  '/en-au/guides/posts/what-is-payment-service-provider/',
  '/en-au/guides/posts/do-direct-debits-come-out-on-weekends/',
  '/en-au/guides/posts/online-payment-gateway-australia/',
  '/en-au/guides/posts/difference-between-eft-and-wire-transfer/',
  '/en-au/guides/posts/dd-guarantee-in-plain-english/',
  '/en-au/guides/posts/credit-card-surcharge-australia/',
  '/en-au/guides/posts/what-is-cloud-accounting-and-how-does-it-work/',
  '/en-au/guides/posts/what-is-a-payment-processor/',
  '/en-au/guides/posts/what-are-account-to-account-payments/',
  '/en-au/guides/posts/how-do-retainers-work-for-consultants/',
  '/en-au/guides/posts/can-business-make-transfers-during-weekends/',
  '/en-au/guides/posts/example-of-po-and-non-po-invoice-processing/',
  '/en-au/guides/posts/how-does-buy-now-pay-later-affect-your-business/',
  '/en-au/guides/posts/average-cost-method/',
  '/en-au/guides/posts/a-guide-to-gst-for-saas-businesses/',
  '/en-au/guides/posts/6-benefits-of-subscription-business-model/',
  '/en-au/guides/posts/what-are-transaction-and-processing-fees/',
  '/en-au/guides/posts/intro-to-churn/',
  '/en-au/guides/posts/10-powerful-xero-add-ons/',
  '/en-au/guides/posts/guide-to-cloud-based-payments/',
  '/en-au/guides/posts/push-vs-pull-payments-whats-the-difference/',
  '/en-au/guides/posts/what-are-the-most-secure-payment-methods/',
  '/en-au/guides/posts/opex-operating-expenses/',
  '/en-au/guides/posts/open-banking/',
  '/en-au/guides/posts/how-to-integrate-payment-gateway-in-website/',
  '/en-au/guides/posts/list-of-online-payment-methods/',
  '/en-au/guides/posts/payment-processing-fees/',
  '/en-au/guides/posts/best-online-rent-payment-systems/',
  '/en-au/guides/invoicing-for-australian-businesses/advantages-of-invoicing/',
  '/en-au/guides/posts/what-is-a-b2b-payment-system/',
  '/en-au/guides/posts/how-to-create-a-secure-payment-page/',
  '/en-au/guides/posts/australia-smb-payments/',
  '/en-au/guides/posts/collecting-payments-from-customers/',
  '/en-au/guides/posts/most-popular-online-payment-solutions-2022/',
  '/en-au/guides/posts/best-rental-property-accounting-software/',
  '/en-au/guides/posts/best-accounting-software-for-saas-companies/',
  '/en-au/guides/posts/subscription-payment-services-six-best-solutions/',
  '/en-au/guides/invoicing-for-australian-businesses/what-is-an-invoice/',
  '/en-au/guides/posts/financial-tools-for-business/',
  '/guides/posts/open-banking/',
  '/guides/posts/payment-links-explained/',
  '/guides/posts/what-is-the-accounts-receivable-days-formula/',
  '/guides/posts/bacs-payments-pending-why-and-how-long/',
  '/guides/posts/accepting-payments-as-a-graphic-designer/',
  '/guides/posts/best-payment-gateway-small-business/',
  '/guides/posts/top-open-banking-providers-uk/',
  '/guides/posts/how-to-create-a-payment-gateway/',
  '/guides/posts/7-best-payment-processors-for-small-business/',
  '/guides/posts/secure-payments/',
  '/guides/posts/pay-by-bank-app-and-how-it-works/',
  '/guides/posts/variable-payments/',
  '/guides/posts/how-to-write-a-dj-invoice-with-template/',
  '/guides/posts/what-is-sms-payment-and-how-does-it-work/',
  '/guides/posts/what-is-click-to-pay/',
  '/guides/posts/rise-alternative-payment-methods/',
  '/guides/posts/5-common-challenges-for-freelancers/',
  '/guides/posts/late-payments/',
  '/guides/posts/4-best-payment-apps/',
  '/guides/posts/the-top-5-payment-processing-challenges-for-small-businesses/',
  '/guides/posts/a-guide-to-e-commerce-payment-systems/',
  '/guides/posts/freelancer-payment-terms-a-guide/',
  '/guides/posts/collect-one-off-payment-with-open-banking/',
  '/guides/posts/what-is-an-email-payment-link/',
  '/guides/posts/tips-for-collecting-payments-from-customers/',
  '/guides/posts/bacs-payments/',
  '/guides/posts/european-payments/',
  '/guides/posts/minimum-card-payment-limits/',
  '/guides/posts/advantages-and-disadvantages-of-retained-profit/',
  '/guides/posts/landlords-collect-your-rent-on-time/',
  '/guides/posts/faster-payments-explained/',
  '/guides/posts/guide-for-window-cleaners/',
  '/guides/posts/what-is-a-public-limited-company/',
  '/guides/posts/dd-guarantee-in-plain-english/',
  '/guides/posts/how-to-calculate-payback-period/',
  '/guides/posts/remittance-advice-bacs-payments/',
  '/guides/posts/food-and-drink/',
  '/guides/posts/setting-up-customers/',
  '/guides/posts/major-uk-banks-chaps-fees/',
  '/guides/posts/gocardless-best-collect-direct-debit-payments/',
  '/guides/posts/why-payments-fail/',
  '/guides/posts/7-online-payment-options-for-2021/',
  '/guides/posts/top-5-stripe-alternatives/',
  '/guides/posts/top-international-payment-gateways/',
  '/guides/posts/split-payments-uk/',
  '/guides/posts/cash-flow-vs-profit/',
  '/guides/posts/what-is-an-eft-payment/',
  '/guides/posts/what-is-cost-of-sales/',
  '/guides/posts/how-to-calculate-late-payment-interest/',
  '/guides/posts/comparison-top-6-escrow-services-uk/',
  '/guides/posts/what-is-the-difference-between-recurring-payment-and-direct-debit/',
  '/guides/posts/five-best-accounting-software-for-landlords/',
  '/guides/posts/advance-notice/',
  '/guides/posts/international-bank-transfer-times/',
  '/guides/posts/how-long-will-a-bacs-payment-made-on-friday-take-to-clear/',
  '/guides/posts/sweeping-payments-meaning-simplified/',
  '/guides/invoicing/international/',
  '/guides/posts/how-to-accept-recurring-payment-online/',
  '/guides/posts/what-is-cloud-accounting-and-how-does-it-work/',
  '/guides/posts/five-best-accounting-software-for-sole-traders/',
  '/guides/posts/can-you-take-payments-in-different-currencies/',
  '/guides/posts/advantages-of-bacs-payments/',
  '/guides/posts/what-to-do-if-a-client-refuses-to-pay-contractor/',
  '/guides/posts/direct-costs-vs-indirect-costs/',
  '/guides/posts/operating-cash-flow-vs-free-cash-flow/',
  '/guides/posts/saas-v-subscription-whats-the-difference/',
  '/guides/posts/what-are-the-disadvantages-of-credit-cards-for-businesses/',
  '/guides/posts/5-overhead-cost-reduction-strategies/',
  '/guides/posts/how-to-test-your-payment-gateway/',
  '/guides/posts/how-long-does-a-bank-transfer-take/',
  '/guides/posts/annual-subscription-vs-monthly-billing/',
  '/guides/posts/best-ways-to-reduce-business-costs/',
  '/guides/posts/how-to-invoice-if-you-are-not-vat-registered/',
  '/guides/posts/what-is-bank-giro-credit-bgc/',
  '/guides/posts/how-to-create-an-invoice/',
  '/guides/posts/how-to-make-financial-plan-for-start-up/',
  '/guides/posts/6-best-payment-methods-for-freelancers/',
  '/guides/posts/5-best-self-employed-accounting-apps/',
  '/guides/invoicing/online-automated-invoicing/',
  '/guides/posts/payment-schedule-simplified/',
  '/guides/invoicing/templates/',
  '/guides/posts/how-to-process-payments-payment-software/',
  '/guides/posts/business-start-up-costs/',
  '/guides/posts/understanding-the-cash-flow-margin-formula/',
  '/guides/posts/how-does-global-payment-processing-work/',
  '/guides/posts/how-to-choose-the-best-non-profit-payment-processor/',
  '/guides/posts/building-a-saas-startup-financial-model/',
  '/guides/posts/5-best-invoice-apps-for-small-businesses/',
  '/guides/posts/how-to-schedule-recurring-invoices-in-quickbooks/',
  '/guides/posts/how-to-keep-track-of-payments/',
  '/guides/posts/what-are-recurring-payments/',
  '/guides/posts/card-payments-without-machine/',
  '/guides/posts/how-to-add-a-mobile-app-payment-gateway/',
  '/guides/posts/how-landlords-use-dd/',
  '/guides/posts/buy-now-pay-later-apps/',
  '/guides/posts/the-best-payment-solutions-for-charities/',
  '/guides/posts/operating-expenses-for-small-businesses-explained/',
  '/guides/posts/automatic-reconciliation-pros-and-cons/',
  '/guides/posts/instalment-payment-method/',
  '/guides/posts/how-to-write-a-personal-trainer-invoice-with-template/',
  '/guides/posts/top-5-e-commerce-platforms-for-small-business/',
  '/guides/posts/what-is-a-third-party-payment-provider/',
];

window.gco08Urls = gco08Urls;
window.nonGco08Urls = nonGco08Urls;
