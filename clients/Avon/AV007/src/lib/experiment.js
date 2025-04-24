import {
  setup
} from './services';
import settings from './settings';
import initHorizontalMenu from './initHorizontalMenu';
import {
  poller
} from '../../../../../lib/uc-lib';
import {
  events
} from '../../../../../lib/utils';
const {
  ID
} = settings;
const activate = () => {
  setup();
  poller([
    () => window.jQuery,
  ], () => {
    const element = document.createElement('div');
    element.classList.add(`${ID}_horizontalMenuWrap`);
    element.innerHTML = `
    <div class="${ID}_horizontalMenu">
      <button id="prev" class="${ID}_horizontalMenu__button hidden"></button>
      <nav class="${ID}_horizontalMenu__navigation">
        <ul id="carousel" class="${ID}_horizontalMenu__list">
        </ul>
      </nav>
      <button id="next" class="${ID}_horizontalMenu__button"></button>
    </div>
    `;
    document.querySelector('#LogoBar').insertAdjacentElement('afterend', element);
    initHorizontalMenu();
    let startFrom = 0;
    const elements = document.querySelectorAll(`.${ID}_horizontalMenu__listItem`);
    Array.prototype.forEach.call(elements, function (element, i) {
        if (element.getAttribute('aria-selected')) {
          startFrom = i + 1;
        }
    });
    let elementWidth;
    let maxWidth = 0;
    let counter = 0;
    Array.prototype.forEach.call(elements, function (element) {
        elementWidth = element.clientWidth;
        maxWidth += elementWidth;
        element.parentNode.setAttribute('style', `display:inline-block; width:${elementWidth}px`);
        //tracking
        element.addEventListener('click', function (e) {
            const elName = e.target.querySelector('a').textContent.trim();
            events.send(settings.ID, 'Clicked Test Category', elName);
        });
    });
    if(startFrom > 0){
      counter = startFrom;
      console.log(counter);
      const lastInlineStyle = JSON.parse(sessionStorage.getItem('last-position')); 
      document.querySelector('#carousel').setAttribute('style', lastInlineStyle);
      document.querySelector('#prev').classList.remove('hidden');
    } else {
      console.log(counter);
      document.querySelector('#carousel').setAttribute('style', `width: -${maxWidth}px; transition: all 300ms ease-out 0s; transform: translate3d(0px, 0px, 0px);`);
    }
    let customStyle;
    document.querySelector('#prev').addEventListener('click', function(e){

      e.preventDefault();
      counter -= 1;
      if(counter < 0){
        counter = 0;
      }
      console.log(counter);
      customStyle =  `width: ${maxWidth}px; transition: all 300ms ease-out 0s; transform: translate3d(-${Math.floor(maxWidth / elements.length * counter)}px, 0px, 0px);`;
      document.querySelector('#carousel').setAttribute('style', customStyle);
      sessionStorage.setItem('last-position', JSON.stringify(customStyle));
    });
    document.querySelector('#next').addEventListener('click', function(e){
      e.preventDefault();
      if(document.querySelector('#prev').classList.contains('hidden')){
        document.querySelector('#prev').classList.remove('hidden');
      }
      counter += 1;
      console.log(counter);
      customStyle =  `width: ${maxWidth}px; transition: all 300ms ease-out 0s; transform: translate3d(-${Math.floor(maxWidth / elements.length * counter)}px, 0px, 0px);`;
      document.querySelector('#carousel').setAttribute('style', customStyle);
      sessionStorage.setItem('last-position', JSON.stringify(customStyle));
    });
    //Tracking
    const menuButton = document.querySelector('#Hamburger');
    menuButton.addEventListener('click', function () {
      events.send(settings.ID, 'User clicked', 'Menu button');
    });
  });
};

export default activate;
