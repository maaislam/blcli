import { fullStory, events, getCookie } from '../../../../lib/utils';

/**
 * {{AC036-2}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'AC036-2',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // Close element
    const message = document.querySelector('.AC024_call-wrap .AC024_phone_modal-wrap');
    if (message.classList.contains('AC036-2-show')) {
      message.classList.remove('AC036-2-show');
    }
    const phone = document.querySelector('.AC024_call-wrap a.AC024_call-btn');
    if (!message && !phone) {
      return;
    }
    components.toggleElement(phone, message);
    const messageText = message.querySelector('.AC024_phone-modal > div');
    components.replaceText(messageText);
    // Device width
    // const width = components.deviceSize();
    // window.addEventListener('resize', () => {
    //   if (width = 989) {
    //     location.reload();
    //   }
    // });
    const telEl = document.querySelector('.AC024_call-wrap .AC024_phone_modal-wrap a.AC036-2-call');
    if (telEl) {
      telEl.addEventListener('click', () => {
        events.send(settings.ID, 'Click', 'User clicked the number link', { sendOnce: true });
      });
    }

    // Open Message
    const empOrCand = components.checkCookie();
    if (empOrCand === 'emp' || empOrCand === 'neither') {
      setTimeout(() => {
        message.classList.add('AC036-2-show');
      }, 1500);
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    deviceSize() {
      return window.innerWidth;
    },
    checkCookie() {
      return getCookie('empOrCand');
    },
    toggleElement(clickEl, el) {
      if (clickEl && el) {
        clickEl.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Click', 'Assisted Search Button', { sendOnce: true });
          el.classList.toggle('AC036-2-show');
          clickEl.classList.add('AC036-2-no_notif');
          if (el.classList.contains('AC036-2-show')) {
            clickEl.classList.add('AC036-2-border');
          } else {
            clickEl.classList.remove('AC036-2-border');
          }
        });
      }
    },
    replaceText(el) {
      const text = '<p>Our team is ready to help you find the <br />  perfect recruitment agency. call <a href="tel:03303800650" class="AC036-2-call">0330 380 0650</a></p>';
      el.innerHTML = text;
    },
  },
};

export default Experiment;
