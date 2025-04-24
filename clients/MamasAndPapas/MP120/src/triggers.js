import { fullStory } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import { initEventSubscribers } from './lib/subscribers';
import init from './experiment';
import pubSub from './lib/PublishSubscribe';
import settings from './lib/settings';

// ----------------------------------------------
// Set up full story
// ----------------------------------------------
pubSub.subscribe('experiment-init', () => {
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
});

// ----------------------------------------------
// Set up event subscribers
// ----------------------------------------------
initEventSubscribers(pubSub);

// ----------------------------------------------
// Generic Poller
//
// >> Either best buy OR testimonial conditions met <<
// >> Port targeting conditions to Qubit's triggers.js <<
//
//        +--------------+
//       /|             /|
//      / |            / |
//     *--+-----------*  |
//     |  |    DD     |  |
//     |  +-----------+--+
//     | /            | /
//     |/             |/
//     *--------------*
// ----------------------------------------------
pollerLite([
  'body',
  () => !!((window.universal_variable || {}).product),
  () => !!window.jQuery,
  () => /Armadillo|Flip XT|Urbo|Sola|Ocarro/i.test(window.universal_variable.product.name),
  '#PDP-Details',
], init);
