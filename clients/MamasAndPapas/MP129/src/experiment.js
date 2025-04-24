import { fullStory, events } from '../../../../lib/utils';
import content from './lib/MP129content';

/**
 * {{MP129}} - {{Journey-based messaging}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP129',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    // eslint-disable-next-line
    const { settings, services, components, bindExperimentEvents } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const greyInfoBlock = document.querySelector('.bg-grayLight.infoBar .text-center.text-capitalize');

    if (greyInfoBlock !== null) {
      const uv = window.universal_variable.page;
      const breadcrumbs = uv.breadcrumb;
      const pageType = uv.type;
      let data;
      let id;
      /*eslint-disable */
      if (breadcrumbs && breadcrumbs.indexOf('Pushchairs') > -1) {
        data = content['Pushchairs'];
        id = data['id'];
        if (localStorage.getItem(`${id}`) !== null && sessionStorage.getItem(`${id}`) === null) {
          // Returning user
          components.replaceBannerInfoMessage(greyInfoBlock, data['return']);
        } else {
          // First Visit on page
          services.setUserStorageItems(id);
          components.replaceBannerInfoMessage(greyInfoBlock, data['message']);
        }
      } else if (breadcrumbs && (
          breadcrumbs.indexOf('Feeding') > -1 
          || breadcrumbs.indexOf('Bath Time') > -1
          || breadcrumbs.indexOf('Bathing') > -1
          || breadcrumbs.indexOf('Bathing Essentials') > -1
        )) {
        data = content['FeedingAndBathTime'];
        id = data['id'];
        if (localStorage.getItem(`${id}`) !== null && sessionStorage.getItem(`${id}`) === null) {
          components.replaceBannerInfoMessage(greyInfoBlock, data['return']);
          // Sends GA Event on link click with new tag
          bindExperimentEvents.sendGAevent(data['tag2']);
        } else {
          services.setUserStorageItems(id);
          components.replaceBannerInfoMessage(greyInfoBlock, data['message']);
          // Sends GA Event on link click
          bindExperimentEvents.sendGAevent(data['tag1']);
        }
      } else if (breadcrumbs && breadcrumbs.indexOf('Nursery') > -1 && (
          breadcrumbs.indexOf('Furniture') > -1
          ||
          breadcrumbs.indexOf('Nursery Furniture') > -1
      )) {
        data = content['NurseryAndFurniture'];
        id = data['id'];
        if (localStorage.getItem(`${id}`) !== null && sessionStorage.getItem(`${id}`) === null) {
          components.replaceBannerInfoMessage(greyInfoBlock, data['return']);
          bindExperimentEvents.sendGAevent(data['tag2']);
        } else {
          services.setUserStorageItems(id);
          components.replaceBannerInfoMessage(greyInfoBlock, data['message']);
        }
      } else if (breadcrumbs && breadcrumbs.indexOf('Cart') > -1) {
        data = content['Cart'];
        id = data['id'];
        if (localStorage.getItem(`${id}`) !== null && sessionStorage.getItem(`${id}`) === null) {
          components.replaceBannerInfoMessage(greyInfoBlock, data['return']);
          bindExperimentEvents.sendGAevent(data['tag2']);
        } else {
          services.setUserStorageItems(id);
          components.replaceBannerInfoMessage(greyInfoBlock, data['message']);
        }
      } else if (breadcrumbs && breadcrumbs.indexOf('Car Seats') > -1) {
        data = content['Carseats'];
        id = data['id'];
        if (localStorage.getItem(`${id}`) !== null && sessionStorage.getItem(`${id}`) === null) {
          components.replaceBannerInfoMessage(greyInfoBlock, data['return']);
          bindExperimentEvents.sendGAevent(data['tag2']);
        } else {
          services.setUserStorageItems(id);
          components.replaceBannerInfoMessage(greyInfoBlock, data['message']);
          bindExperimentEvents.sendGAevent(data['tag1']);
        }
      } else if (pageType === 'Home' && greyInfoBlock !== null) {
        data = content['Home'];
        id = data['id'];
        if (localStorage.getItem(`${id}`) !== null && sessionStorage.getItem(`${id}`) === null) {
          components.replaceBannerInfoMessage(greyInfoBlock, data['return']);
        } else {
          services.setUserStorageItems(id);
          components.replaceBannerInfoMessage(greyInfoBlock, data['message']);
        }
      } else {
        data = content['Other'];
        id = data['id'];
        if (localStorage.getItem(`${id}`) !== null && sessionStorage.getItem(`${id}`) === null) {
          components.replaceBannerInfoMessage(greyInfoBlock, data['return']);
          bindExperimentEvents.sendGAevent(data['tag2']);
        } else {
          services.setUserStorageItems(id);
          components.replaceBannerInfoMessage(greyInfoBlock, data['message']);
          bindExperimentEvents.sendGAevent(data['tag1']);
        }
      }
      /* eslint-enable */
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
    /**
     * @desc Sets items in Local and Session Storage
     */
    setUserStorageItems(item) {
      localStorage.setItem(item, true);
      sessionStorage.setItem(item, true);
    },
  },

  components: {
    /**
     * @desc Replace Banner Message
     */
    replaceBannerInfoMessage(infoBlock, newMessage) {
      // eslint-disable-next-line
      infoBlock.innerHTML = newMessage;
    },
  },

  bindExperimentEvents: {
    /**
     * @desc Clicked on banner link
     */
    sendGAevent(tag) {
      const { settings } = Experiment;
      const bannerLink = document.querySelector('#MP129-info__link');
      bannerLink.addEventListener('click', () => {
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - ${tag}`, { sendOnce: true });
      });
    },
  },
};

export default Experiment;
