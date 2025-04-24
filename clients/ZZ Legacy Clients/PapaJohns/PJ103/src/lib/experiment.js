/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events, pollerLite } from '../../../../../lib/utils';

const checkStorage = name => window.localStorage.getItem(name);

export default () => {
  setup();
  
  let storeIdEl = document.querySelector('#rptStoreId');
  let storeId;

  if (storeIdEl) {
    storeId = storeIdEl.getAttribute('data-id');

    window.localStorage.setItem('PJ-sid', storeId);
  } else {
    storeId = checkStorage("PJ-sid");
  }

  const conf = {
    732:	"http://tpjr.us/papa-blackw",
    625:	"http://tpjr.us/papa-briglewes",
    332:	"http://tpjr.us/papa-brigpres",
    34:	  "http://tpjr.us/papa-cardcity",
    639:	"http://tpjr.us/papa-cardthor",
    743:	"http://tpjr.us/papa-cardbay",
    673:	"http://tpjr.us/papa-heref",
    740:	"http://tpjr.us/papa-llan",
    727:	"http://tpjr.us/papa-mcrcch",
    463:	"http://tpjr.us/papa-mcrfallo",
    496:	"http://tpjr.us/papa-mcroxf",
    640:	"http://tpjr.us/papa-mcrwalk",
    633:	"http://tpjr.us/papa-newp",
    737:	"http://tpjr.us/papa-newpchep",
    510:	"http://tpjr.us/papa-plymmutl",
    759:	"http://tpjr.us/papa-plymstbu",
    131:	"http://tpjr.us/papa-plymwool",
    577:	"http://tpjr.us/papa-swandill",
    601:	"http://tpjr.us/papa-swanmorr",
    519:	"http://tpjr.us/papa-worc",
  };


  const url = conf[storeId];

  if (!url) return false;


  const isConfPage = () => {
    if (window.location.href.indexOf('order-confirmation') > -1 || window.location.href.indexOf('track-your-order') > -1) {
      return true;
    } else {
      return false;
    }
  }

  const html = `
    <div class="PJ103-tipjar">
      <div class="PJ-col PJ-tipImages">
        <a href="">
          <img xmlns="http://www.w3.org/1999/xhtml" src="https://editor-assets.abtasty.com/43831/5f969f71665a61603706737.png" class="logoImg1" alt="Papajonh's Logo" />

          <img src="data:image/png;base64,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" alt="TipJar" />
        </a>
      </div>

      ${!isConfPage() ? `<div class="PJ-col PJ-content">
          <h2>Want to tip your store?</h2>

          <p>How it works?</p>
          <div class="PJ-rel">
          <div class="PJ-tooltip">
            <h4>How it works</h4>

            <p>TIPJAR is the new way to tip.<br />
            It's a peer to peer tip ecosystem on a mission to change the world of tipping forever!<br />
            TIPJAR offers fully transparent tipping which goes straight to the tipped worker.</p>
          </div>
          </div>
        </div>

        <div class="PJ-col PJ-cta">
          <a class="PJ-btn" target="_blank" href="${url}">Add Tip 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.949 511.949" xmlns:v="https://vecta.io/nano"><path d="M386.235 248.308L140.902 2.975c-4.267-4.053-10.987-3.947-15.04.213-3.947 4.16-3.947 10.667 0 14.827l237.76 237.76-237.76 237.867c-4.267 4.053-4.373 10.88-.213 15.04 4.053 4.267 10.88 4.373 15.04.213L386.235 263.35c4.16-4.16 4.16-10.88 0-15.04z"/></svg>
          </a>
        </div>` : `
        
        <div class="PJ-col PJ-cta PJ-content">
          <h3>Leave a tip for the team</h3>

          <a class="PJ-btn" target="_blank" href="${url}">Add Tip 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.949 511.949" xmlns:v="https://vecta.io/nano"><path d="M386.235 248.308L140.902 2.975c-4.267-4.053-10.987-3.947-15.04.213-3.947 4.16-3.947 10.667 0 14.827l237.76 237.76-237.76 237.867c-4.267 4.053-4.373 10.88-.213 15.04 4.053 4.267 10.88 4.373 15.04.213L386.235 263.35c4.16-4.16 4.16-10.88 0-15.04z"/></svg>
          </a>
        </div>

        <div class="PJ-col PJ-content">
          <p>How it works?</p>
          <div class="PJ-rel">
            <div class="PJ-tooltip">
              <h4>How it works</h4>

              <p>TIPJAR is the new way to tip.<br />
              It's a peer to peer tip ecosystem on a mission to change the world of tipping forever!<br />
              TIPJAR offers fully transparent tipping which goes straight to the tipped worker.</p>
            </div>
          </div>
        </div>

        `}
    </div>
  `;

  let ref;
  
  
  if (isConfPage()) {
    document.body.classList.add('PJ-confPage');

    pollerLite(['.statusCont'], () => {
      ref = document.querySelector('.statusCont');
      ref.insertAdjacentHTML('afterbegin', html);
    });
  } else {
    pollerLite(['.main'], () => {
      ref = document.querySelector('.main');
      ref.insertAdjacentHTML('afterbegin', html);
    });
  }

  // Event 
  events.send('PJ103', 'PJ103 - Tip Jar Added');
};
