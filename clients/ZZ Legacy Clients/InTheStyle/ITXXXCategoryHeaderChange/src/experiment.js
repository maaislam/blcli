import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ITXXXCategoryHeaderChange}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ITXXXCategoryHeaderChange',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    // Expo has run
    events.send('ITXXXCategoryHeaderChanges', 'Active', 'This experiment is active', { sendOnce: true });
    // Add the title
    components.addPromo();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {
    // Add text to title
    addPromo: function addPromo() {
      const text = ' - 40% OFF USE CODE GET40';
      const ref = document.querySelector('.category-info.has-cat-contentinfo .category-title > h1');
      const currentText = ref.textContent;
      const newString = currentText + text;
      ref.textContent = newString;
      // Send event
      events.send('ITXXXCategoryHeaderChanges', 'Title Changed', 'The banner title has been changed to include promo', { sendOnce: true });
    },
  },
};

export default Experiment;
