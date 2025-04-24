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
  triggerAttachPointAdjacentValue: 'beforebegin',

  // Products Section
  numProductsShown: 5,
  strategyData: [
    {
      name: 'yourtoppicks',
      friendlyName: 'Top picks',
      thumbImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/SD-523/toppicks-small.jpg',
      mainBgImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/SD-523/toppicks-bg.jpg',
      strategyID: 137212,
      theProducts: [],
    },
    {
      name: 'ourselectionsforyou',
      friendlyName: 'For you',
      thumbImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/SD-523/ourselection-small.jpg',
      mainBgImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/SD-523/ourselection-bg.jpg',
      strategyID: 137211,
      theProducts: [],
    },
    {
      name: 'sale',
      friendlyName: 'Sale',
      thumbImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/SD-523/sale-small.jpg',
      mainBgImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/SD-523/sale-bg.jpg',
      strategyID: 137210,
      theProducts: [],
    },
    {
      name: 'mostpopular',
      friendlyName: 'Popular',
      thumbImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/SD-523/mostpopular-small.jpg',
      mainBgImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/SD-523/mostpopular-bg.jpg',
      strategyID: 137214,
      theProducts: [],
    },
    {
      name: 'recentlyviewed',
      friendlyName: 'Viewed',
      thumbImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/SD-523/recentlyviewed-small.jpg',
      mainBgImageUrl: 'https://blcro.fra1.digitaloceanspaces.com/SD-523/recentlyviewed-bg.jpg',
      strategyID: 137213,
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