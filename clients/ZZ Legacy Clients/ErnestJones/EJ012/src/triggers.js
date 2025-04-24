import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.buying-info__price--current',
  '#js-ifcBuyButton',
  '#ifcProductUpdate',
  '.buying-info__name',
  '#productDeposit',
  '.ifcAddToBasketButton',
], Experiment.init);
