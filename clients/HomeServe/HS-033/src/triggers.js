import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

//pollerLite([() => pollFor], activate);
const targetUrlPath = '/insurance/plumbing-drainage-cover'; // Replace with the specific URL
if (window.location.href.includes(targetUrlPath)) {
  const script = document.createElement('script');
  script.src = 'https://code.jquery.com/jquery-1.10.2.min.js';
  script.type = 'text/javascript';

  document.head.appendChild(script);
}

pollerLite(
  [
    () =>
      document.querySelector('form[action="/search"]') || document.querySelector('[action="https://www.homeserve.co.uk/search"]'),
    () => window.jQuery !== undefined,
  ],
  () => {
    setTimeout(activate, 1000);
  }
);
