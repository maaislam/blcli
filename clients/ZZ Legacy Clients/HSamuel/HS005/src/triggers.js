import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.buying-info__price--current',
  '#js-ifcBuyButton',
  '#js-ifcProductUpdate',
  '.buying-info__name',
  '#js-productDeposit',
  '.ifcAddToBasketButton',
], Experiment.init);
