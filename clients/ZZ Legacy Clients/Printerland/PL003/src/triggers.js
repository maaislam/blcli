import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  'h1#pageTitle',
  '.preview.col > .app-figure > a#hlinkLargeImage',
  'div.content',
], Experiment.init);
