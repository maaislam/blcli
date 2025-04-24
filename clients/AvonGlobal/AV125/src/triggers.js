import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.Cart_Body', '.Cart-Products', '.Cart-Footer', () => window.ga !== undefined], activate);
