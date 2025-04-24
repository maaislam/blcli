import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '.site-nav__list li.site-nav__item:first-of-type li.sub-nav__item .sub-nav__link',
], Experiment.init);
