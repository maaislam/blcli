/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import infiniteScroll from '../../../../../lib/components/InfiniteScroll/InfiniteScroll';
// import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();
  infiniteScroll(() => { 
    // events.send('MP139', 'Lazy Load', 'Lazy loaded products');
  });
};

export default activate;
