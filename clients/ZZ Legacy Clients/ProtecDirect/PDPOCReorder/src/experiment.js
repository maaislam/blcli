import { pollerLite } from '../../../../lib/uc-lib';
import settings from './lib/settings';

const retrieveRecentOrders = () => {
  return new Promise((res, rej) => {
    jQuery.ajax({
      url: 'https://www.protecdirect.co.uk/my-account/orders?accountFilterCode=&sort=byDateDesc',
      type: 'get',
      success: (data) => {
        if(data) {
          const div = document.createElement('div');
          div.innerHTML = data;

          const table = div.querySelector('#order_history');
          if(table) {
            res(table);
          } else {
            rej();
          }
        }
      },
    });
  });
};

const activate = () => {
  document.body.classList.add(`${settings.ID}`);
  document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);

  let targetAfter = null;
  if(settings.VARIATION == '1') {
    targetAfter = document.querySelector('.PD022-Homepage');
  } else if(settings.VARIATION == '2') {
    targetAfter = document.querySelector('.pd6-cat-blocks');
  }

  if(targetAfter) {
    const html = `
      <div class="pdx-recentorders">
        <h2>Your Latest Orders</h2>
        <div class="pdx-recentorders__inner">
          <img src="//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/ajax-loader.gif">

        </div>
      </div>
    `;

    targetAfter.insertAdjacentHTML('beforebegin', html);

    retrieveRecentOrders().then((ordersTable) => {
      if(ordersTable) {
        [].forEach.call(ordersTable.querySelectorAll('tr:nth-child(n+4)'), (tr) => {
          tr.remove();
        });

        const inner = document.querySelector('.pdx-recentorders__inner');
        if(inner) {
          inner.innerHTML = ordersTable.outerHTML;

          const headerValue = document.querySelector('#order_history #header7');
          if(headerValue) {
            headerValue.innerHTML = 'Total Value (Incl. Delivery)';
          }

          const addTos = inner.querySelectorAll('.submit');
          if(addTos.length) {
            [].forEach.call(addTos, (addTo) => {
              addTo.innerHTML = 'Reorder';

              addTo.addEventListener('click', (e) => {
                if(e.currentTarget.previousElementSibling.name == 'orderCode') {
                  const v = e.currentTarget.previousElementSibling.value;
                  const csrf = e.currentTarget.previousElementSibling.previousElementSibling.value;
                  if(v && csrf) {
                    inner.insertAdjacentHTML('beforeend', `
                      <form id="pdx-form" method="post" action="https://www.protecdirect.co.uk/cart/reorder">
                        <input name="CSRFToken" value="${csrf}">
                        <input name="orderCode" value="${v}">
                      </form>
                    `);
                  }

                  const f = document.querySelector('#pdx-form');
                  if(f) {
                    f.submit();
                  }
                }
              });
            });
          }
        }
      }
    }).catch(() => {
      const recent = document.querySelector('.pdx-recentorders');
      if(recent) {
        recent.parentNode.removeChild(recent);
      }
    });
  }
};

pollerLite([
  'body',
  '.PD022-Homepage',
  '.logged_in', /* User is signed in */
  !!window.jQuery,
], activate);
