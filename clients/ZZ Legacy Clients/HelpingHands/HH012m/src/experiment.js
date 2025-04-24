import { fullStory, events } from '../../../../lib/utils';


/**
 * {{HH012m}} - {{Navigation Improvements Mobile}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: '{{ID}}',
      VARIATION: '{{VARIATION}}',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const allHomeCareLinks = bodyVar.querySelectorAll('#menu-item-728 .menu-item.menu-item-type-post_type');

      return {
        docVar,
        bodyVar,
        allHomeCareLinks,
      };
    })(),
    init: () => {
      if (Exp.settings.VARIATION === '2') {
        events.send(Exp.settings.ID, 'Control', 'Control version fired');
        return false;
      }
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
        Exp.render.timeSpecificArea();
        Exp.bindExperimentEvents.handleTimeSpecifc();
        Exp.bindExperimentEvents.handleConditionSpecific();
      },
    },
    render: {
      timeSpecificArea() {
        const nodeElements = [9, 10, 3, 1];
        // Insert Markup container after visiting care
        // Replicating current markup
        Exp.cache.allHomeCareLinks[2].insertAdjacentHTML('afterend', `
          <li class="HH012m_Container HH012_TS_Container">
            <span class="HH012m_Title HH012m_TS_Title">Time specific care</span>
            <ul class="HH012m_TS_Links HH012m_List_Container">
            </ul>
          </li>
        `);
        // Use the current value in node elements as a reference to the node list
        const timeSpecificContainer = Exp.cache.bodyVar.querySelector('.HH012m_TS_Links');
        for (let i = 0, n = nodeElements.length; i < n; i += 1) {
          timeSpecificContainer.insertAdjacentElement('beforeend', Exp.cache.allHomeCareLinks[nodeElements[i]]);
        }
        // Render condition specific area
        this.conditionSpecificArea();
      },
      conditionSpecificArea() {
        const nodeElements = [6, 4, 5, 8];
        const tSContainer = Exp.cache.bodyVar.querySelector('.HH012_TS_Container');
        tSContainer.insertAdjacentHTML('afterend', `
        <li class="HH012m_Container HH012_Condition_Container">
          <span class="HH012m_Title HH012m_CS_Title">Condition-specific care</span>
          <ul class="HH012m_Condition_Links HH012m_List_Container">
          </ul>
        </li>
        `);
        const conditionContainer = Exp.cache.bodyVar.querySelector('.HH012m_Condition_Links');
        for (let i = 0, n = nodeElements.length; i < n; i += 1) {
          conditionContainer.insertAdjacentElement('beforeend', Exp.cache.allHomeCareLinks[nodeElements[i]]);
        }
      },
    },
    bindExperimentEvents: {
      // Toggle classes when clicking on the titles, reveals/hides menu items
      handleTimeSpecifc() {
        const TSContainer = Exp.cache.bodyVar.querySelector('.HH012_TS_Container');
        Exp.cache.bodyVar.querySelector('.HH012m_TS_Title').addEventListener('click', () => {
          TSContainer.classList.toggle('HH012m_Display');
        });
      },
      handleConditionSpecific() {
        const CSContainer = Exp.cache.bodyVar.querySelector('.HH012_Condition_Container');
        Exp.cache.bodyVar.querySelector('.HH012m_CS_Title').addEventListener('click', () => {
          // Toggle Styling Classes
          CSContainer.classList.toggle('HH012m_Display');
        });
      },
    },
  };

  Exp.init();
};

export default Run;
