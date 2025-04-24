/**
 * SG107 - Landing Page Redirect
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.ernestjones.co.uk/webstore/content/christmas/?icid=ej-tn-sale
 * https://www.ernestjones.co.uk/webstore/offers.do?icid=ej-tn-sale
 * 
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');
    setup();
    
    // alert(`>>>>> ${ID} is running`);

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
      const pathname = window.location.pathname;
      let queryStr = '';
      if (queryStr.indexOf('?') > -1) {
        queryStr = window.location.href.split('?')[1];
        queryStr = `?${queryStr}`;
      }

      document.querySelector('body').insertAdjacentHTML('afterbegin', `<div class="${ID}-overlay"></div>`);

      var config = {
        "destinationUrl": "",
        "forwardUrlParams": true,
        "disableRedirectParameter": "mmredirect"
      }

      switch(pathname) {
        case '/webstore/watches.do':
          // window.location.href = `https://www.ernestjones.co.uk/webstore/l/watches/${queryStr}`;
          config = {
            "destinationUrl": "https://www.ernestjones.co.uk/webstore/l/watches/",
            "forwardUrlParams": true,
            "disableRedirectParameter": "mmredirect"
          }
          break;
        case '/webstore/engagement.do':
          // window.location.href = `https://www.ernestjones.co.uk/webstore/l/engagement-rings/${queryStr}`;
          config = {
            "destinationUrl": "https://www.ernestjones.co.uk/webstore/l/engagement-rings/",
            "forwardUrlParams": true,
            "disableRedirectParameter": "mmredirect"
          }
          break;
        case '/webstore/diamonds.do':
          // window.location.href = `https://www.ernestjones.co.uk/webstore/l/diamond-rings/${queryStr}`;
          config = {
            "destinationUrl": "https://www.ernestjones.co.uk/webstore/l/diamond-rings/",
            "forwardUrlParams": true,
            "disableRedirectParameter": "mmredirect"
          }
          break;
        case '/webstore/jewellery.do':
          // window.location.href = `https://www.ernestjones.co.uk/webstore/l/jewellery/${queryStr}`;
          config = {
            "destinationUrl": "https://www.ernestjones.co.uk/webstore/l/jewellery/",
            "forwardUrlParams": true,
            "disableRedirectParameter": "mmredirect"
          }
          break;
        case '/webstore/wedding.do':
          // window.location.href = `https://www.ernestjones.co.uk/webstore/l/wedding-rings/${queryStr}`;
          config = {
            "destinationUrl": "https://www.ernestjones.co.uk/webstore/l/wedding-rings",
            "forwardUrlParams": true,
            "disableRedirectParameter": "mmredirect"
          }
          break;
        case '/webstore/offers.do':
          // window.location.href = `https://www.ernestjones.co.uk/webstore/l/select%7Csale/${queryStr}`;
          config = {
            "destinationUrl": "https://www.ernestjones.co.uk/webstore/l/select%7Csale/",
            "forwardUrlParams": true,
            "disableRedirectParameter": "mmredirect"
          }
          break;
      }
    }

    setTimeout(function(){  
    var resultUrl = config['destinationUrl'];
    if (config['forwardUrlParams']) {
        var originQueryParams = getJsonFromQueryString(window.location.search !== '' ? window.location.search.substring(1) : '');
        var destinationUrl = config['destinationUrl'];
        var destinationHashIndex = destinationUrl.indexOf('#');
        var destinationQIndex = destinationUrl.indexOf('?');
        var destinationHash = destinationHashIndex > -1 ? destinationUrl.substring(destinationHashIndex + 1) : '';
        var destinationQueryString = destinationQIndex > -1 ? destinationUrl.substring(destinationQIndex + 1, destinationHashIndex > -1 ? destinationHashIndex : destinationUrl.length) : '';
        var destinationQueryParams = getJsonFromQueryString(destinationQueryString);
        var resultQueryParams = {};
        for (var attrname in originQueryParams) { resultQueryParams[attrname] = originQueryParams[attrname]; }
        for (var attrname in destinationQueryParams) { resultQueryParams[attrname] = destinationQueryParams[attrname]; }
        var resultHash = destinationHash
        var resultStart = destinationUrl.substring(0, destinationQIndex > -1 ? destinationQIndex : (destinationHashIndex > -1 ? destinationHashIndex : destinationUrl.length));
        var resultMiddle = isEmpty(resultQueryParams) ? '' : '?' + serialize(resultQueryParams);
        var resultEnd = resultHash ? '#' + resultHash : '';
        resultUrl = resultStart + resultMiddle + resultEnd;
    }
    window.location.replace(resultUrl);
    function getJsonFromQueryString(queryString) {if (queryString === '') {return {};}var result = {};queryString.split('&').forEach(function(part) {var item = part.split('=');result[item[0]] = item[1];});return result;}
    function serialize(obj) {var str = [];for(var p in obj)if (obj.hasOwnProperty(p)) {str.push(p + '=' + obj[p]);}return str !== [] ? str.join('&') : '';}
    function isEmpty(obj) {for(var prop in obj) {if(obj.hasOwnProperty(prop))return false;}return JSON.stringify(obj) === JSON.stringify({});}
    }, 800);

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
