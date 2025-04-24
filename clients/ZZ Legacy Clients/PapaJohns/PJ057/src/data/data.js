const formData = {
  UserSteps: [
    'Order Summary',
    'Payment Details',
    'Complete Checkout',
    'Order Confirmation',
  ],
  GuestSteps: [
    'Order Summary',
    'Contact Details',
    'Payment Details',
    'Order Confirmation',
  ],
  orderSummary: {
    heading: 'Order Summary',
    subHeading: 'You are ordering for',
    link: 'change to [action]',
    body: 'products and prices',
    signedHeading: 'PAPA REWARDS',
    deliveryHeading: 'Delivery time',
    deliveryText: 'When would you like your order to be delivered?',
    marketingHeading: 'GET A PIZZA THIS',
    marketingBody: 'We’ll send the latest products and deals to you automatically using the contact details you provide',
    checkboxOne: 'Don\'t send me emails',
    checkboxTwo: 'Don\'t send me texts',
    CTA: 'PROCEED TO PAYMENT',
  },
  contactDetails: {
    emailFieldText: 'We’ll send order confirmation here',
    numberFieldText: 'For your delivery driver',
    accountRegText: 'Register for an account and save these details',
    CTA: '',
  },
  paymentDetails: {
    charityHeading: 'Round up for Charity?',
    charitySubHeading: 'Donate to charity by rounding up your order total',
    charityText: '92.5% goes to ABF The Soldiers Charity (registered charity no. England/Wales 1146420 / SCO39189) and 7.5% goes to Pennies (registered charity no. 1122489)',
    signedMessage: 'Papa Rewards points are only awarded on non-cash orders. To earn points, please select another payment method.',
    CTA: 'YES, DONATE $0.01',
  },
  orderConfirmation: {
    heading: 'ORDER CONFIRMATION',
    text: 'Thanks, you order is on its way to [postcode]',
  },
};

export default formData;
