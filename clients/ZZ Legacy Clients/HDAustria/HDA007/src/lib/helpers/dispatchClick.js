import { getCookie, setCookie } from './cookie';

const sendClick = () => {
  const pathname = location.pathname;

  const packageClicked = getCookie('packageClicked');

  if (pathname === '/pakete/' && packageClicked) {
    setCookie('packageClicked', '', -1);
    let clickEvent = new Event('click');
    location.hash = '#pakete';

    document.querySelector(`#pakete>.row>div>div:nth-child(${packageClicked})`).dispatchEvent(clickEvent);
  }
};
export default sendClick;
