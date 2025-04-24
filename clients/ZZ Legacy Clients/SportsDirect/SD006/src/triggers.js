import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.ExitLinks .EditText a',
  '.CheckWrap .ExitLinks .ContText',
  () => !!window._gaUAT,
], activate);
