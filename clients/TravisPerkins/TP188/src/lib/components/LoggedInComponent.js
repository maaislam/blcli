import { h, render, Component } from 'preact';
import shared from '../shared';
import { pollerLite } from '../../../../../../lib/uc-lib';
import { events, getCookie } from '../../../../../../lib/utils';
import { ChartExport } from '../chart';
import { fireEvent } from '../services';

export default class LoggedInComponent extends Component {
  constructor() {
    super();
    this.state = {
      name: 'there',
      available: 100,
      invoiced: 0,
      pending: 0,
      overdue: 0,
    };

    // Bind methods here
    this.getData = this.getData.bind(this);
    this.navigate = this.navigate.bind(this);
    this.addChart = this.addChart.bind(this);
  }

  // Methods here

  componentDidMount() {
    ChartExport();
    this.getData();
    // this.addChart();
  }

  getData() {
    fetch('https://www.travisperkins.co.uk/graphql?op=customer', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        authorization: `Bearer ` + getCookie('access_token'),
        bruid2: getCookie('_br_uid_2'),
        'content-type': 'application/json',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-data-consumer-name': 'TP-WEB',
        'x-tp-checkout-new': 'true',
        'x-tp-request-id': '24fb997c-466b-425f-8bef-e388c5996eab',
        'x-tp-session-id': getCookie('x-tp-session-id'),
      },
      referrer: 'https://www.travisperkins.co.uk/accountDashboard',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: '{"operationName":"customer","variables":{},"query":"query customer {\\n  customer {\\n    ...AccCustomerFields\\n    ...SavedCardsFields\\n    __typename\\n  }\\n}\\n\\nfragment AccCustomerFields on Customer {\\n  code\\n  name\\n  email\\n  customerType\\n  accountStatus\\n  deliveryPhoneNumbers\\n  accountNumber\\n  creditAccountDetails {\\n    ...CreditAccountDetailsFields\\n    __typename\\n  }\\n  ...DeliveryAddressesFields\\n  __typename\\n}\\n\\nfragment DeliveryAddressesFields on Customer {\\n  deliveryAddresses {\\n    id\\n    line1\\n    line2\\n    line3\\n    town\\n    postalCode\\n    deliveryContact {\\n      name\\n      telephone\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment CreditAccountDetailsFields on CreditAccountDetail {\\n  ...CreditAccountInfoFields\\n  ...CreditControlContactFields\\n  __typename\\n}\\n\\nfragment CreditAccountInfoFields on CreditAccountDetail {\\n  creditAccountBalance {\\n    creditLimit\\n    creditBalance\\n    availableBalance\\n    summary {\\n      type\\n      amount\\n      __typename\\n    }\\n    amountDueThisMonth\\n    amountOverdue\\n    totalDue\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment CreditControlContactFields on CreditAccountDetail {\\n  creditController {\\n    name\\n    email\\n    telephone\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment SavedCardsFields on Customer {\\n  savedCards {\\n    code\\n    obfuscatedPAN\\n    expiryDate\\n    cardHolder\\n    scheme {\\n      code\\n      name\\n      __typename\\n    }\\n    billingAddress {\\n      id\\n      line1\\n      line2\\n      line3\\n      town\\n      postalCode\\n      firstName\\n      lastName\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n"}',
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        // Get first name
        var name = json.data.customer.name;
        name = name.split(' ');
        name = name[0];
        // Get available credit
        var available = json.data.customer.creditAccountDetails.creditAccountBalance.availableBalance;
        var invoiced = json.data.customer.creditAccountDetails.creditAccountBalance.totalDue;
        var creditLimit = json.data.customer.creditAccountDetails.creditAccountBalance.creditLimit;
        var pending = creditLimit - (available + invoiced);
        var overdue = json.data.customer.creditAccountDetails.creditAccountBalance.amountOverdue;

        if (available + pending + invoiced === creditLimit) {
          overdue = 0;
        }

        this.setState(
          {
            name: name,
            available: available,
            invoiced: invoiced,
            overdue: overdue,
            pending: pending,
          },
          () => {
            console.log(this.state);

            this.addChart();
          }
        );
      });
  }

  navigate(link) {
    fireEvent(link + ' clicked');
    window.location = link;
  }

  addChart() {
    // Chart.defaults.plugins.legend.display = false;
    const labels = ['Available', 'Invoiced', 'Pending', 'Overdue'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          cutout: '75%',
          borderWidth: 1,
          backgroundColor: ['#07563D', '#F6AB24', '#D3D3D3', '#DD5732'],
          borderColor: ['#07563D', '#F6AB24', '#D3D3D3', '#DD5732'],
          data: [this.state.available, this.state.invoiced, this.state.pending, this.state.overdue],
        },
      ],
    };
    const config = {
      type: 'doughnut',
      data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
    var myChart = new Chart(document.querySelector(`.${shared.ID}__graph-section__content`), config);
  }

  // Render method

  render() {
    return this.state.available < 0 || this.state.pending > 0 ? (
      ''
    ) : (
      <div className={`${shared.ID}__loggedIn`}>
        <div className={`${shared.ID}__loggedIn__left`}>
          <h3>Welcome back {this.state.name}</h3>
          <div className={`${shared.ID}__link-wrap`}>
            <div
              className={`${shared.ID}__link`}
              onClick={() => {
                this.navigate('/accountDashboard');
              }}
            >
              <img className={`${shared.ID}__link__img`} src={'http://sb.monetate.net/img/1/581/3474304.png'} />
              <span className={`${shared.ID}__link__text`}>
                Account
                <br /> Dashboard
              </span>
            </div>
            <div
              className={`${shared.ID}__link`}
              onClick={() => {
                this.navigate('/accountDashboard/balanceInvoices');
              }}
            >
              <img className={`${shared.ID}__link__img`} src={'http://sb.monetate.net/img/1/581/3474307.png'} />
              <span className={`${shared.ID}__link__text`}>
                Invoices & <br />
                Credit notes
              </span>
            </div>
            <div
              className={`${shared.ID}__link`}
              onClick={() => {
                this.navigate('/accountDashboard/orderHistory');
              }}
            >
              <img className={`${shared.ID}__link__img`} src={'http://sb.monetate.net/img/1/581/3474308.png'} />
              <span className={`${shared.ID}__link__text`}>
                Order
                <br /> History
              </span>
            </div>
            <div
              className={`${shared.ID}__link`}
              onClick={() => {
                this.navigate('/accountDashboard/addressBook');
              }}
            >
              <img className={`${shared.ID}__link__img`} src={'http://sb.monetate.net/img/1/581/3474309.png'} />
              <span className={`${shared.ID}__link__text`}>
                Address
                <br /> Book
              </span>
            </div>
          </div>
        </div>
        <div className={`${shared.ID}__loggedIn__right`}>
          <div className={`${shared.ID}__graph-section`}>
            <div className={`${shared.ID}__graph-section__available`}>
              <span>Available to</span>
              <span>spend</span>
              <span className={`${shared.ID}__graph-section__available__bold`}>£{this.state.available}</span>
            </div>
            <canvas className={`${shared.ID}__graph-section__content`}>Graph here</canvas>
          </div>
          <div className={`${shared.ID}__figures`}>
            <div className={`${shared.ID}__figures__amounts`}>
              <div className={`${shared.ID}__figures__amounts__item`}>
                <span className={`${shared.ID}__figures__amounts__item__dot--invoiced`}></span>
                <span className={`${shared.ID}__figures__amounts__item__text`}>Invoiced</span>
                <span className={`${shared.ID}__figures__amounts__item__value`}>£{this.state.invoiced}</span>
              </div>
              <div className={`${shared.ID}__figures__amounts__item`}>
                <span className={`${shared.ID}__figures__amounts__item__dot--pending`}></span>
                <span className={`${shared.ID}__figures__amounts__item__text`}>Pending</span>
                <span className={`${shared.ID}__figures__amounts__item__value`}>£{this.state.pending}</span>
              </div>
              <div className={`${shared.ID}__figures__amounts__item`}>
                <span className={`${shared.ID}__figures__amounts__item__dot--overdue`}></span>
                <span className={`${shared.ID}__figures__amounts__item__text`}>Overdue</span>
                <span className={`${shared.ID}__figures__amounts__item__value`}>£{this.state.overdue}</span>
              </div>
            </div>
            <div className={`${shared.ID}__figures__cta-wrap`}>
              <div
                className={`${shared.ID}__figures__cta-wrap--acc`}
                onClick={() => {
                  this.navigate('/accountDashboard');
                }}
              >
                View account
              </div>
              {this.state.overdue > 0 ? (
                <div
                  className={`${shared.ID}__figures__cta-wrap--pay`}
                  onClick={() => {
                    this.navigate('/accountDashboard/balanceInvoices/payment/TOTAL_BALANCE');
                  }}
                >
                  Pay all due
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
