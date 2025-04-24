/**
 * PJTestExperiment - Testing time triggers for PJ062
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  // Experiment code
  const Timestamp = new Date;
  const Hour = Timestamp.getHours();
  events.send('AB Tasty', 'Test Experiment', `Experiment loaded at ${Hour}:00`);
};

export default activate;
