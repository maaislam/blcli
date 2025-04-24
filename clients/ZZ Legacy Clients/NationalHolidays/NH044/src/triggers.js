import activate from './lib/experiment';

const matchingPagesForBanner = [
  'britain-and-ireland',
  'europe',
  'shows',
  'events',
  'family-trips',
  'offers',
  'depatures',
];
const path = window.location.pathname.replace(/\/$/i, '') + '/';

let matchesPage = false;
matchingPagesForBanner.forEach((match) => {
  if(window.location.pathname.indexOf(match) > -1) {
    matchesPage = true;
  }
});

if(path.match(/search-results/i) || path == '/' || matchesPage) {
  activate();
}
