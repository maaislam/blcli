import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([() => !!window.prm], Experiment.init);
