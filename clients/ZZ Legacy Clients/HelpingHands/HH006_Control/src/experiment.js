import { events, viewabilityTracker } from '../../../../lib/utils';


/**
 * {{HH006}} - {{HH006 Control}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'HH006',
      VARIATION: 'Control',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const tileParent = bodyVar.querySelector('.child-pages');
      const individualTiles = bodyVar.querySelectorAll('.child-pages .col-sm-6');

      return {
        docVar,
        bodyVar,
        tileParent,
        individualTiles,
      };
    })(),
    init: () => {
      // Setup
      const { components } = Exp;
      components.setupElements();
      // Default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - ${Exp.settings.VARIATION}`);
    },
    components: {
      setupElements() {
        Exp.bindExperimentEvents.addTileTracking();
        Exp.bindExperimentEvents.trackTileVisibility();
      },
    },
    bindExperimentEvents: {
      tileTrackingCode() {
        events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'Clicked', 'Category Tile', { sendOnce: true });
      },
      addTileTracking() {
        for (let i = 0, n = Exp.cache.individualTiles.length; i < n; i += 1) {
          Exp.cache.individualTiles[i].addEventListener('click', this.tileTrackingCode);
        }
      },
      trackTileVisibility() {
        viewabilityTracker(Exp.cache.tileParent, () => {
          events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'View', 'Category Tile', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
