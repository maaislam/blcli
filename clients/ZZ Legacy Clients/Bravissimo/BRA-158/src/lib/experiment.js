/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
let orderData = "";


const buildLastSizeElement = (lastSize) => {

  let visibleMessage = `Visible - user last known size was ${lastSize}`;
  logMessage(visibleMessage);
  fireEvent(visibleMessage);

  let elementHTML = `

    <div class="c-container ${ID}-ls-container">

      <div class="c-container__body">

        <div class="${ID}-ls-element"> 

          <div class="${ID}-ls-inner-element">

            <div class="${ID}-ls-text ${ID}-primary">

              <p> On a recent visit you bought this size: </p>

              <div class="${ID}-ls"> ${lastSize} </div>

            </div>

            <div class="${ID}-ls-text ${ID}-secondary">

              <a id="${ID}-ls-link" href="https://www.bravissimo.com/collections/all-lingerie/?limit=48&page=1&sortBy=default&f_size[]=${lastSize}" class="${ID}-button c-button-link c-button-link--filled c-button-link--small"> Shop all bras in this size </a>

            </div>

          </div>

        </div>

      </div>

    </div>

  `;

  let insertionPoint = document.querySelector('a[name="category-quick-links"]');

  insertionPoint.nextElementSibling.insertAdjacentHTML('afterend', elementHTML);


  let lsLink = document.getElementById(`${ID}-ls-link`);

  lsLink.addEventListener('click', (e) => {

    let clickMessage = `Click - user last known size was ${lastSize} and they went on to view ${e.target.href}`;
    logMessage(clickMessage);
    fireEvent(clickMessage);

  });

}

const deepSearch = (object, key, predicate) => {
  if (object.hasOwnProperty(key) && predicate(key, object[key]) === true) return object

  for (let i = 0; i < Object.keys(object).length; i++) {
    const nextObject = object[Object.keys(object)[i]];
    if (nextObject && typeof nextObject === "object") {
      let o = deepSearch(nextObject, key, predicate)
      if (o != null) return o
    }
  }
  return null;
}

export default () => {
    setup();

    logMessage(ID + " Variation: "+VARIATION);

    fireEvent('Conditions Met');
    
    let link = 'https://www.bravissimo.com/api/orders?page=1&endDate=%7B%22years%22%3A%202%7D';

    if(VARIATION == 1) {

      if(window.dataLayer[0].user && link) {

        let eventMessage = "User logged in - starting AJAX request";
        logMessage(eventMessage);
        fireEvent(eventMessage);

        const request = new XMLHttpRequest();
        request.open('GET', link, true);
        //request.setRequestHeader('User-Agent', 'Googlebot/2.1 (+http://www.google.com/bot.html)');
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            const data = request.responseText;
            // const sizeVariantId = request.responseURL;
            if (data) {


              orderData = JSON.parse(data);
              
              // get all despatched lines
              let records = orderData.records;

              logMessage(records);

              records = records.filter((item) => item.despatched.length > 0);

              let despatchedLines = [];

              [].slice.call(records).forEach((item) => {

                let despatched = item.despatched;

                despatched = despatched.filter((line) => {

                  let dLines = line.despatchedLines;

                  dLines = dLines.filter((dLine) => {

                    if(dLine.productGroup.toLowerCase().indexOf('bra') > -1) {
                      despatchedLines.push(dLine);
                      return true;
                    } else {
                      return false;
                    }
                  });

                  

                });



              });

              // filter out any that have the sizes ML/XSS/XL 2XL, and then discard any which don't begin with 3 or 4, and any equal to or over 5 chars
              let finalLine = [];

              [].slice.call(despatchedLines).forEach((line) => {

                if(line.size.size != "ML" && line.size.size != "XSS" && line.size.size != "XL 2XL" && (line.size.size.charAt(0) == 3 || line.size.size.charAt(0) == 4) && line.size.size.length < 5) {
                  finalLine.push(line);
                  return;
                }

              });
              let size = "";
              if(finalLine.length > 0) {
                 size = finalLine[0].size.size;
              }
              // send size to be displayed on screen.
              if(finalLine.length > 0) {

                let eventMessage = "User has a bra product in their history, Last known size found and shown";
                logMessage(eventMessage);
                fireEvent(eventMessage);

                if(VARIATION !== "control") {
                  buildLastSizeElement(size);
                }

                
              } else {

                let eventMessage = "User has a bra product in their history, No last known size found due to conditions";
                logMessage(eventMessage);
                fireEvent(eventMessage);

              }
        			
            }
          }

        };

        request.onerror = () => {
          // There was a connection error of some sort
        };

        request.send();

      } else {

        let eventMessage = "User not logged in";
        logMessage(eventMessage);
        fireEvent(eventMessage);

      }

    } 
    
};