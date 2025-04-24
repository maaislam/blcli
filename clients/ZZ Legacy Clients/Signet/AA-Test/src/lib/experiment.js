/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';

const activate = () => {
  setup();

var trackerName = window.ga.getAll()[0].get('name');



    window.ga(trackerName + '.send', 'event', 'AA-Test', 'Variation' , {
        nonInteraction: true
      });
    
}

export default activate;
