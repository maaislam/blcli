import {
  setup
} from './services';
import settings from './settings';
import Search from '../components/Search';
import { events } from '../../../../../lib/utils';
events.analyticsReference = '_gaUAT';
const {
  ID,
  VARIATION
} = settings;
const activate = () => {
  setup();
  if (VARIATION === '2') {
    events.send(settings.ID, 'FL055 Control', 'Control is active');
    return false;
  } else {
    events.send(settings.ID, 'FL055 Test', 'Test is active');
    if (window.innerWidth <= 768) {
      document.body.classList.add('mobile');
      new Search({
        device: 'mobile'
      });
    } else {
      new Search({
        device: 'desktop'
      });
    }
  }
};

/*var x = document.querySelectorAll('#filterlist .productFilter:nth-child(1) .FilterName');
var arr = [];
Array.prototype.forEach.call(x, function(filter){
	arr.push(filter.textContent.trim());
});
console.log(arr);*/

export default activate;
