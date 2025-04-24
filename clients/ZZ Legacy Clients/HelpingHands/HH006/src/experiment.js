import { fullStory, events, viewabilityTracker } from '../../../../lib/utils';


/**
 * {{HH006}} - {{Category Tiles}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'HH006',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const allCategoryTiles = bodyVar.querySelectorAll('.child-pages .col-sm-6');
      const tileParent = bodyVar.querySelector('.child-pages');
      let insertedContainer;

      return {
        docVar,
        bodyVar,
        allCategoryTiles,
        tileParent,
        insertedContainer,
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
      // Default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      collectTileData: () => {
        // Loop over tiles, extract content, render new tile
        for (let i = 0, n = Exp.cache.allCategoryTiles.length; i < n; i += 1) {
          const currentTile = Exp.cache.allCategoryTiles[i];
          const currentLink = currentTile.querySelector('a').href;
          let currentImage = currentTile.querySelector('img');
          const altText = currentImage.alt;
          currentImage = currentImage.getAttribute('data-lazy-src');
          const currentTitle = currentTile.querySelector('.reduced-margin-bottom > strong').textContent.trim();
          const additionalText = currentTile.querySelector('.caption p:nth-child(2)').textContent;
          // Render tile
          // Next line exceeds length
          // eslint-disable-next-line
          Exp.render.individualTile(currentLink, currentImage, currentTitle, additionalText, altText);
        }
      },
      setMinHeight: () => {
        const addedElements = Exp.cache.bodyVar.querySelectorAll('.HH006_Tile_Container .HH006_Text_Container');
        let minHeight = 0;
        if (addedElements.length > 0) {
          for (let i = 0; addedElements.length > i; i += 1) {
            const outerHeight = addedElements[i].offsetHeight;
            if (outerHeight > minHeight) {
              minHeight = outerHeight;
            }
            addedElements[i].style.minHeight = `${minHeight}px`;
          }
        }
      },
    },
    components: {
      setupElements() {
        // Render container
        Exp.render.tileContainer();
        // Store selector
        Exp.cache.insertedContainer = Exp.cache.bodyVar.querySelector('.HH006_All_Tile_Containers');
        // Retrieve tile data and render tiles
        Exp.services.collectTileData();
        // Set element minimum height
        Exp.services.setMinHeight();
        // Add tracking
        Exp.bindExperimentEvents.addTileTracking();
        Exp.bindExperimentEvents.trackTileVisibility();
      },
    },
    render: {
      tileContainer() {
        Exp.cache.tileParent.insertAdjacentHTML('afterbegin', `
          <div class="HH006_All_Tile_Containers"></div>
        `);
      },
      individualTile(tileLink, tileImage, tileTitle, tileText, tileAlt) {
        let tileMarkup;
        if (tileText) {
          tileMarkup = `
          <div class="HH006_Tile_Container">
            <a href="${tileLink}" class="HH006_Link">
              <img class="HH006_Image" src="${tileImage}" alt="${tileAlt}" />
              <div class="HH006_Text_Container">
                <span class="HH006_Title">${tileTitle}</span>
                <span class="HH006_Text">${tileText}</span>
                <span class="HH006_Learn_More">Learn More</span>
              </div>
            </a>
          </div>
          `;
        } else {
          tileMarkup = `
          <div class="HH006_Tile_Container HH006_No_Text">
            <a href="${tileLink}" class="HH006_Link">
            <img class="HH006_Image" src="${tileImage}" alt="${tileAlt}" />
              <div class="HH006_Text_Container">
                <span class="HH006_Title">${tileTitle}</span>
                <span class="HH006_Learn_More">Learn More</span>
              </div>
            </a>
          </div>
          `;
        }
        Exp.cache.insertedContainer.insertAdjacentHTML('beforeend', tileMarkup);
      },
    },
    bindExperimentEvents: {
      trackTile() {
        events.send(`${Exp.settings.ID}`, 'Clicked', 'Category Tile', { sendOnce: true });
      },
      addTileTracking() {
        const renderedTiles = Exp.cache.bodyVar.querySelectorAll('.HH006_Link');
        for (let i = 0, n = renderedTiles.length; i < n; i += 1) {
          renderedTiles[i].addEventListener('click', this.trackTile);
        }
      },
      trackTileVisibility() {
        viewabilityTracker(Exp.cache.insertedContainer, () => {
          events.send(`${Exp.settings.ID}`, 'View', 'Category Tiles', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
