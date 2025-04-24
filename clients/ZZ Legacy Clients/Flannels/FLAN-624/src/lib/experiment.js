/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, logMessage, pollerLite } from '../../../../../lib/utils';
import { startRecommendedStories } from '../../../../../lib/utils/RecStories/recommendedStories';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

// Experiment Variables

const expData = {

  // Triggers Section
  triggerAttachPoint: '#main-content',
  triggerAttachPointAdjacentValue: 'afterbegin',

  // Products Section
  numProductsShown: 5,
  strategyData: [
    {
      name: 'recentlyviewed',
      friendlyName: 'Viewed',
      thumbImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/FLAN-624/recentlyviewed.jpg',
      mainBgImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/FLAN-624/background.jpg',
      strategyID: 137504,
      theProducts: [],
    },
    {
      name: 'justforyou',
      friendlyName: 'For You',
      thumbImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/FLAN-624/justforyou.jpg',
      mainBgImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/FLAN-624/background.jpg',
      strategyID: 137507,
      theProducts: [],
    },
    {
      name: 'recommended',
      friendlyName: 'Suggested',
      thumbImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/FLAN-624/recommended.jpg',
      mainBgImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/FLAN-624/background.jpg',
      strategyID: 137505,
      theProducts: [],
    },
    {
      name: 'latest',
      friendlyName: 'Latest',
      thumbImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/FLAN-624/latest.jpg',
      mainBgImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/FLAN-624/background.jpg',
      strategyID: 137503,
      theProducts: [],
    },
    {
      name: 'mostpopular',
      friendlyName: 'Trending',
      thumbImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/FLAN-624/mostpopular.jpg',
      mainBgImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/FLAN-624/background.jpg',
      strategyID: 137506,
      theProducts: [],
    },

    

    
    
    

  ]


};

export default () => {
  setup();
  logMessage(ID + " Variation: " + VARIATION);
  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...
  logMessage(`DY RV Count: ${window.DY.rvCount}`);
  if(document.body.classList.contains('Home') && window.DY.rvCount > 5 && shared.VARIATION == "control") {
    fireEvent('Visible - user would have been shown the stories but this is the control')
  }
  
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...
    
    if(document.body.classList.contains('Home') && window.DY.rvCount > 5) {

      pollerLite([
        () => {
          return window?.DYO?.recommendationWidgetData;
        },
        () => {
          return window?.DY?.recommendationContext?.lng;
        },
        () => {
          return document.querySelector(expData.triggerAttachPoint) !== undefined;
        },
    
      ],
        () => {
          let data = expData;
    
          pollerLite([data.triggerAttachPoint], () => {
            startRecommendedStories(data);
          })
    
          
        });
  
    } 


};
