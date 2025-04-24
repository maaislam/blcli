/**
 * MP165 - Personal Shop Button
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();
  console.log('in activate');

  // Experiment code

  // Check if already closed
  if (window.sessionStorage.getItem('MP165-closed')) {
    return false;
  }

  const ref = cacheDom.get('body');
  setTimeout(() => {
    ref ? ref : document.body;
    ref.insertAdjacentHTML('beforeend', `
      <div class="MP165-agentIntent">
        <div class="icon">
          <i class="ico icofont-speech-comments"></i>
        </div>
  
        <div class="text">
          <p><strong>Online Personal Shop</strong></p>
  
          <p id="MP165-open">Bespoke advice from one of our experts</p>
  
          <div class="hidden-text hide">
            <p>Offline</p>  
            <span></span>
            <p>Sorry, all our experts are offline at the moment. Please try again later.</p>
          </div>
        </div>
  
        <div class="close">
          <i class="ico ico-cross close-btn closeBtn"></i>
        </div>
        
      </div>
    `);
    

    // Attach click events
    const el = document.querySelector('.MP165-agentIntent');
    const open = document.querySelector('p#MP165-open');
    const close = document.querySelector('.MP165-agentIntent .close');
    const icon = document.querySelector('.MP165-agentIntent .icon');
    const info = document.querySelector('.MP165-agentIntent .hidden-text');
    if (el) {
      el.addEventListener('click', (e) => {
        if (e.target == open) {
          events.send(settings.ID, 'MP165 Click', 'User interacted with message');
          info.classList.remove('hide');  
          open.classList.add('hide');
          icon.classList.add('hide');
          el.classList.add('switch');
        }

        // Close
        if (e.target == close || e.target.classList.contains('closeBtn')) {
          el.classList.add('hide');
          window.sessionStorage.setItem('MP165-closed', 'true');
        }
      });
    }
  }, 5000);
};

export default activate;
