/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { MP166 } from './MP166/index';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  MP166();

  const { ID, VARIATION } = settings;

  // events.send(ID, 'MP175 Variation 1', 'MP175 V1 is active');
};

export default activate;
