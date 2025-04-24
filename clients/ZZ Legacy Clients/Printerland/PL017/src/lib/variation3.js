import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './settings';

export default () => {
  events.send(settings.ID, `${settings.ID} - Control`, { sendOnce: true });
};
