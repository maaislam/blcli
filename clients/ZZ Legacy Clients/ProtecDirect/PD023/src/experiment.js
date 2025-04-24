import { fullStory } from '../../../../lib/utils';

/**
 * {{PD023}} - {{Header and footer redesign}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'PD023',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const searchBox = bodyVar.querySelector('#search');
      const moveToFooter = bodyVar.querySelector('#foot_outer .mobile_footer_top_links div');
      const footerParent = bodyVar.querySelector('#foot_outer .mobile_footer_vertical_links div');
      const contentParent = bodyVar.querySelector('#content');

      return {
        bodyVar,
        searchBox,
        moveToFooter,
        footerParent,
        contentParent,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Change searchbox text
        Exp.cache.searchBox.placeholder = 'What are you looking for?';
        // Move Contact us and about us to footer
        // Next lines lint disabled due to exceeding line character count
        // eslint-disable-next-line
        Exp.cache.footerParent.insertBefore(Exp.cache.moveToFooter.children[0], Exp.cache.footerParent.children[0]);
        // eslint-disable-next-line
        Exp.cache.footerParent.insertBefore(Exp.cache.moveToFooter.children[0], Exp.cache.footerParent.children[0]);
      },
    },
  };

  Exp.init();
};

export default Run;
