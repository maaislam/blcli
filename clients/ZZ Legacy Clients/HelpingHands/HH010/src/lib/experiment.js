import { setup } from './services';
import { events } from '../../../../../lib/utils';
import settings from './settings';

/**
 * {{HH010}} - {{Price Framing}}
 */

const activateTest = () => {
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;

      return {
        docVar,
        bodyVar,
      };
    })(),
    init: () => {
      setup();
      Exp.render.markup();
    },
    render: {
      markup: () => {
        // Render test content
        Exp.cache.bodyVar.insertAdjacentHTML('beforeend', `
        <div class="HH010_Container">
          <div class="HH010_Inner_Container">
            <div class="HH010_Upper_Container">
              <img class="HH010_Image" alt="Call Us Today" src="//useruploads.visualwebsiteoptimizer.com/useruploads/363191/images/994f9dc4d87f74229b8c457173737e9f_call-us-today-icon.png">
              <div class="HH010_Text_Container">
                <p class="HH010_Text">Our package prices are bespoke. Please call our friendly team to discuss your options.</p>
              </div>
            </div>
            <a href="tel:0333-060-4773" class="HH010_Button_Call_Mobile HH010_Button_Call">Call today</a>
            <span class="HH010_Button_Call_Desktop HH010_Button_Call">Call today</span>
            <div class="HH010_Close_Container">
              <span class="HH010_Close_Button">x</span>
            </div>
          </div>
        </div>
        `);
        // Bind event listeners
        // Track call us now
        Exp.cache.bodyVar.querySelector('.HH010_Button_Call_Mobile').addEventListener('click', () => {
          events.send(`${settings.ID}`, 'Clicked', 'Call us now', { sendOnce: true });
        });
        // Handle close button
        Exp.cache.bodyVar.querySelector('.HH010_Close_Button').addEventListener('click', () => {
          Exp.cache.bodyVar.classList.add('HH010_Hide');
        });
        // Handle Desktop call today button, reveal number on click
        const desktopCallButton = Exp.cache.bodyVar.querySelector('.HH010_Button_Call_Desktop');
        desktopCallButton.addEventListener('click', () => {
          events.send(`${settings.ID}`, 'Clicked', 'Call us now', { sendOnce: true });
          desktopCallButton.textContent = '0333 060 4773';
        });
      },
    },
  };

  Exp.init();
};

const tabPage = () => {
  const Exp = {
    init: () => {
      // Add body class to hide test
      document.body.classList.add('HH010_Hide');
      // Render test
      activateTest();
      // Bind event listener to relavent tab
      const allNavLinks = document.querySelectorAll('.nav-justified > li > a');
      let priceTab;
      for (let i = 0, n = allNavLinks.length; i < n; i += 1) {
        const currentText = allNavLinks[i].textContent.trim().toUpperCase();
        if (currentText.indexOf('PRICE') !== -1 || currentText.indexOf('COSTS') !== -1) {
          priceTab = allNavLinks[i].parentNode;
          break;
        }
      }
      priceTab.addEventListener('click', () => {
        // Remove hiding class
        document.body.classList.remove('HH010_Hide');
        // Send viewed event
        events.send(`${settings.ID}`, 'Viewed', `${settings.ID} activated - Variation ${settings.VARIATION}`, { sendOnce: true });
      });
    },
  };

  Exp.init();
};

const costPage = () => {
  const Exp = {
    init: () => {
      // Render test
      // Add body class to hide test
      document.body.classList.add('HH010_Hide');
      activateTest();
      // Add event listener to the window
      window.addEventListener('scroll', Exp.bindExperimentEvents.UCHH010WindowScroll);
    },
    bindExperimentEvents: {
      UCHH010WindowScroll() {
        // From stackoverflow
        const h = document.documentElement;
        const b = document.body;
        const st = 'scrollTop';
        const sh = 'scrollHeight';
        const scrollPercent = (((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100);
        // User has scrolled down 50% of page, show test
        if (scrollPercent > 50) {
          document.body.classList.remove('HH010_Hide');
          // Send viewed event
          events.send(`${settings.ID}`, 'Viewed', `${settings.ID} activated - Variation ${settings.VARIATION}`, { sendOnce: true });
          // Remove event handler on window - no longer needed
          window.removeEventListener('scroll', Exp.bindExperimentEvents.UCHH010WindowScroll);
        }
      },
    },
  };

  Exp.init();
};

export { costPage, tabPage };
