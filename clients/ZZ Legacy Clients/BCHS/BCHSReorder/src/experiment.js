import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import settings from './lib/settings';
import fauxTable from './lib/faux-html';

/**
 * Note the targeting scrapes the page for 'dimension6' being set to
 * a user group e.g. only allow to NIS / NSDP
 */

const retrieveRecentOrders = () => {
  return new Promise((res, rej) => {
    jQuery.ajax({
      url: '/my-account/orders?accountFilterCode=ALL&sort=byDateDesc',
      type: 'get',
      success: (data) => {
        if(data) {
          const div = document.createElement('div');
          div.innerHTML = data;

          const table = window.fauxHtmlEnabled ? 
            jQuery(fauxTable)[0] : div.querySelector('#order_history');
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

  let targetAfter = document.querySelector('#content');

  if(settings.VARIATION == '2') {
    targetAfter = document.querySelector('.bchs_home_categories');
  }

  if(targetAfter) {
    const html = `
      <div class="bcx-recentorders">
        <h2>Your Latest Orders</h2>
        <div class="bcx-recentorders__inner">
          <img src="//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/ajax-loader.gif">

        </div>
      </div>
    `;

    targetAfter.insertAdjacentHTML('beforebegin', html);

    retrieveRecentOrders().then((ordersTable) => {
      if(ordersTable) {
        events.send('BCHSReorder', 'Shown-Orders');

        [].forEach.call(ordersTable.querySelectorAll('tr:nth-child(n+4)'), (tr) => {
          tr.remove();
        });

        const inner = document.querySelector('.bcx-recentorders__inner');
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
                      <form id="bcx-form" method="post" action="/cart/reorder">
                        <input name="CSRFToken" value="${csrf}">
                        <input name="orderCode" value="${v}">
                      </form>
                    `);
                  }

                  const f = document.querySelector('#bcx-form');
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
      const recent = document.querySelector('.bcx-recentorders');
      if(recent) {
        recent.parentNode.removeChild(recent);
      }
    });
  }
};

if(window.location.pathname == '/') {
  pollerLite([
    'body',
    document.head,
    '.logged_in', /* User is signed in */
    !!window.jQuery,
    () => {
      const headText = document.head.innerText;
      const matchingDim = headText.match(/ga\('set', 'dimension6', '([\d\w]+)'\)/m);

      const allowedGroups = window.bchsreorderGroups || [
        'NIS',
        'NSDP',
      ];

      if(allowedGroups === true || (
          matchingDim 
          && matchingDim[1] 
          && allowedGroups.indexOf(matchingDim[1].toUpperCase()) > -1
      )) {
        return true;
      }

      return false;
    }
  ], activate);
}
