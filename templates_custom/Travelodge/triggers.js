import activate from './lib/experiment';
import shared from '../../../../core-files/shared';
import { pollerLite } from '../../../../lib/uc-lib';

const { ID } = shared;

if (!document.documentElement.classList.contains(`${ID}`)) {
  pollerLite([
    'body',
  ], () => {
    activate();
  });
}
