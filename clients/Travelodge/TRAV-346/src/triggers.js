import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const pathnames = ['/dashboard-booking', '/manage-bookings', '/amends']
const { pathname } = window.location;

if (!pathnames.includes(pathname) && !pathname.includes('/hotels')) {
  pollerLite(['#main'], activate);
} else if (pathname.includes('/hotels')) {
  pollerLite(['#formBookRoom [name="checkIn"]', () => typeof window.hotelInfo === 'object'], activate);
}
