import { fullStory, events } from '../../../../lib/utils';
/**
 * {{GD024}} - {{GD024 - WISMO Returning User}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'GD024',
    VARIATION: '{{VARIATION}}',
  },

  products: [],

  show: false,

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    document.body.classList.add(settings.ID);
    // AJAX Orders page
    const ordersPageUrl = 'https://www.glassesdirect.co.uk/account/orders/';
    // const ordersPageUrl = 'http://gdsf.dev.glassesdirecttesting.co.uk/account/orders/';

    const promiseTrain = [services.fetchOrdersPage(ordersPageUrl)
      .then(services.fetchOrdersUrl)
      .then(services.getOrderDetails)];
    

    Promise.all(promiseTrain).then(() => {
      setTimeout(() => {
        if (Experiment.products.length === 0) { return false; }
        components.buildOrderWidget(Experiment.products);
        services.clickToggle();
        services.tracking();
        if (Experiment.show === true) {
          const orderWidget = document.querySelector('#GD024-orders .GD024-order-wrap');
          if (orderWidget) {
            orderWidget.classList.add('GD024-show');
          }
        }
      }, 2000);
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Returns the orders page
     * @param {String} url
     */
    fetchOrdersPage(url) {
      const ordersPage = new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            const div = document.createElement('div');
            const data = request.responseText;
            div.innerHTML = data;
            resolve(div);
          } else {
            // We reached our target server, but it returned an error
            reject();
          }
        };

        request.onerror = (error) => {
          // There was a connection error of some sort
          reject(error);
        };

        request.send();
      });
      return ordersPage;
    },
    /**
     * @desc Returns a promised array of URLS
     * @param {HTML Element} html
     */
    fetchOrdersUrl(html) {
      const ordersUrl = new Promise((resolve, reject) => {
        if (html) {
          // const ordersURLArr = [];
          const resolvedObject = {
            show: false,
            ordersURLArr: [],
          };
          const orders = html.querySelectorAll('.ord-pnl1 table tr');
          if (orders.length > 0) {
            const maxRows = 4;
            for (let i = 0; orders.length > i; i += 1) {
              if (i < maxRows) {
                const urlTd = orders[i].querySelector('.ord-ct1 a');
                const dateTd = orders[i].querySelector('td:nth-of-type(2)');
                if (urlTd) {
                  const url = urlTd.href;
                  if (url) {
                    resolvedObject.ordersURLArr.push(url);
                  }
                }
                if (dateTd) {
                  const daysBetween = (first, second) => {
                    // Copy date parts of the timestamps, discarding the time parts.
                    const one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
                    const two = new Date(second.getFullYear(), second.getMonth(), second.getDate());
                    // Do the math.
                    const millisecondsPerDay = 1000 * 60 * 60 * 24;
                    const millisBetween = two.getTime() - one.getTime();
                    const days = millisBetween / millisecondsPerDay;
                    // Round down.
                    return Math.floor(days);
                  };
                  const dateText = dateTd.textContent;
                  const newDateText = dateText.replace(/\.|,|\d+:\d+|p.m.|a.m./g, '');
                  const d = Date.parse(newDateText);
                  const t = new Date(parseInt(d, 10));
                  const currentDate = Date.now();
                  const latestDate = new Date(parseInt(currentDate - 1814400000, 10));
                  const daysInBetween = daysBetween(latestDate, t);
                  if (daysInBetween > 0 && daysInBetween < 21) {
                    resolvedObject.show = true;
                  }
                }
              }
            }
            resolve(resolvedObject);
          }
        }
      });
      return ordersUrl;
    },
    /**
     * @desc Returns an array of product rows
     * @param {Array} urlArr
     */
    getOrderDetails(detailObj) {
      const urlArr = detailObj.ordersURLArr;
      const orderDetails = (url) => {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            const div = document.createElement('div');
            const data = request.responseText;
            div.innerHTML = data;
            const orderStatus = div.querySelectorAll('#ord-det-pan1 table tr.order td:first-of-type');
            if (orderStatus.length > 0) {
              for (let i = 0; orderStatus.length > i; i += 1) {
                const orderStatusText = orderStatus[i].textContent.trim().toLowerCase();
                if (orderStatusText !== 'returned' || orderStatusText !== 'dispatched') {
                  const rowDiv = document.createElement('div');
                  rowDiv.innerHTML = orderStatus[i].parentElement.outerHTML.trim();
                  if (Experiment.products.length === 3) {
                    break;
                  }
                  Experiment.products.push(rowDiv);
                  if (detailObj.show === true) {
                    Experiment.show = true;
                  }
                }
              }
            }
          } else {
            // We reached our target server, but it returned an error

          }
        };

        request.onerror = (error) => {
          // There was a connection error of some sort
          console.error(error);
        };

        request.send();
      };
      if (urlArr.length > 0) {
        for (let i = 0; urlArr.length > i; i += 1) {
          orderDetails(urlArr[i]);
        }
      }
    },
    clickToggle() {
      // Desktop
      if (!document.body.classList.contains('touch-device')) {
        const orderIcon = document.querySelector('#nav-lists li#GD024-orders > a.nav-list-icon');
        const ordersWrap = document.querySelector('#nav-lists li#GD024-orders .GD024-order-wrap');
        if (orderIcon) {
          const orderWrap = orderIcon.parentElement.querySelector('.GD024-order-wrap');
          orderIcon.addEventListener('click', (e) => {
            events.send(Experiment.settings.ID, 'Click', 'User toggled the order widget');
            e.preventDefault();
            orderWrap.classList.toggle('GD024-show');
          });
        }
        document.addEventListener('click', (e) => {
          if (!ordersWrap.parentElement.contains(e.target)) {
            if (ordersWrap.classList.contains('GD024-show')) {
              ordersWrap.classList.remove('GD024-show');
            }
          }
        });
      } else {
        // Mobile
        const orderIcon = document.querySelector('#header-actions a.GD024-mobile-order');
        const ordersWrap = document.querySelector('#header-actions .GD024-order-wrap');
        if (orderIcon) {
          orderIcon.addEventListener('click', (e) => {
            e.preventDefault();
            events.send(Experiment.settings.ID, 'Click', 'User toggled the order widget on mobile');
            ordersWrap.classList.toggle('GD024-show');
          });
        }
        document.addEventListener('click', (e) => {
          if (!ordersWrap.parentElement.contains(e.target)) {
            if (ordersWrap.classList.contains('GD024-show')) {
              ordersWrap.classList.remove('GD024-show');
            }
          }
        });
      }
    },
  },

  components: {
    /**
     * @desc Builds up the order widget with the information collected in services.
     * @param {Array} orders
     */
    buildOrderWidget(orders) {
      const widgetHtml = document.createElement('div');
      // Desktop HTML
      widgetHtml.innerHTML = `
        <li id="GD024-orders">
          <a class="tooltipped nav-list-icon" href="/account/orders/" title="" data-original-title="Order Tracking">
            <i class="icon icon-truck"></i>
          </a>

          <div class="tooltip fade bottom in GD024-hover-title">
            <p>Order Tracking</p>
          </div>

          <div class="GD024-order-wrap">
            <h3>Recently Ordered</h3>

            <div class="GD024-orders"></div>

            <div class="GD024-order-link">
              <a class="button button--secondary" href="http://gdsf.dev.glassesdirecttesting.co.uk/account/orders/">View Order History</a>
            </div>
          </div>
        </li>
      `;
      if (document.body.classList.contains('touch-device')) {
        widgetHtml.innerHTML = `
          <a class="GD024-mobile-order tooltipped nav-list-icon" href="/account/orders/" title="" data-original-title="Order Tracking">
            <i class="icon icon-truck"></i>
          </a>

          <div class="GD024-order-wrap">
            <h3>Recently Ordered</h3>

            <div class="GD024-orders"></div>

            <div class="GD024-order-link">
              <a class="button button--secondary" href="http://gdsf.dev.glassesdirecttesting.co.uk/account/orders/">View Order History</a>
            </div>
          </div>
        `;
      }
      const ref = widgetHtml.querySelector('.GD024-orders');
      orders.forEach((element) => {
        const elementContent = element.textContent;
        const status = element.firstChild.textContent.trim();
        const name = element.querySelector('strong:first-of-type').textContent;
        const price = element.lastChild.textContent.trim().split('\n')[4];
        const finalPrice = price.replace(/\.(\d)$/, '.$10');
        const colour = elementContent.trim().match(/(Colour:\n\s+(\w+))/mi)[2];
        if (status && name && price.indexOf('£') > -1 && colour) {
          const html = `
            <div class="GD024-order">
              <div class="GD024-order-ib">
                <p>${status}</p>
              </div>
              <div class="GD024-order-ib">
                <p><strong>${name}</strong></p>
                <p>${colour}</p>
              </div>
              <div class="GD024-order-ib">
                <p>${finalPrice}</p>
              </div>
            </div>
          `;
          if (ref) {
            ref.insertAdjacentHTML('beforeend', html);
          }
        }
      });

      /**
       * Add to DOM
       */
      const domRef = document.querySelector('#nav-lists li#nav-basket');
      if (domRef) {
        if (widgetHtml) {
          domRef.insertAdjacentHTML('afterend', widgetHtml.innerHTML);
        }
      } else {
        // Mobile
        const mobileDomRef = document.querySelector('#header-actions');
        if (mobileDomRef) {
          mobileDomRef.insertAdjacentHTML('beforeend', widgetHtml.innerHTML);
        }
      }
    },
  },
};

export default Experiment;
