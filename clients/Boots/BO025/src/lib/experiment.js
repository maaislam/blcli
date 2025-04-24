/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

export default () => {
  setup();

  const currentURL = window.location.href;

  const urls = {
    'https://www.boots.com/sitesearch?searchTerm=SOAP': 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash', 
    'https://www.boots.com/sitesearch?searchTerm=soap': 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash', 
    'https://www.boots.com/sitesearch?searchTerm=Soap': 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash',
    'https://www.boots.com/sitesearch?searchTerm=sOAP': 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash', 
    'https://www.boots.com/sitesearch?searchTerm=hand%20wash': 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash', 
    'https://www.boots.com/sitesearch?searchTerm=Hand%20Wash': 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash',
    'https://www.boots.com/sitesearch?searchTerm=HAND%20WASH': 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash', 
    'https://www.boots.com/sitesearch?searchTerm=Hand%20wash': 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash',
    'https://www.boots.com/sitesearch?searchTerm=hAND%20WASH': 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash', 
    'https://www.boots.com/sitesearch?searchTerm=handwash': 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash',
    'https://www.boots.com/sitesearch?searchTerm=Handwash': 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash', 
    'https://www.boots.com/sitesearch?searchTerm=HANDWASH': 'https://www.boots.com/toiletries/washing-bathing/soap-hand-wash',

  };

  if(urls[currentURL]) {
   window.location.href = urls[currentURL];
  }

};
