import activate from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
], activate);
