/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import PageContent from './components/pageMarkup';
import { events } from '../../../../../lib/utils';


export default () => {
  setup();

  const { ID, VARIATION } = shared;

  if(VARIATION === '1' || VARIATION === '2') {
    if(document.querySelector(`.${ID}_pageContent`)){
      document.querySelector(`.${ID}_pageContent`).remove();
    }
    
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      
      ga('create', 'UA-41493563-1', 'auto');
      ga('send', 'pageview');

    events.send(`${ID} v${VARIATION}`, 'Triggered');

    new PageContent();
  }
};
