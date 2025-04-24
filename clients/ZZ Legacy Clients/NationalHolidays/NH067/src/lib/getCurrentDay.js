import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './settings';

export default () => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = new Date;
  let day = d.getDate();
  const month = monthNames[d.getMonth()];
  if (day === '1') {
    day += 'st';
  } else if (day === '2') {
    day += 'nd';
  } else if (day === '3') {
    day += 'rd';
  } else {
    day += 'th';
  }
  const today = `${day} ${month}`;

  return today;
};