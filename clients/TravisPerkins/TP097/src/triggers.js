import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.yCmsComponent.tpSiteLogo',
  '.tpHeaderLinks',
], Run);
