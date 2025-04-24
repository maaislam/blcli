import { pollerLite } from '../../../../../lib/uc-lib';

/**
 * componentFactory
 * @param {Object} options Options to create the component
 * @param {Array} options.polling Array of elements/functions to poll for
 * @param {Function} options.create Function to create component
 * @param {Function} options.events Function to add events to component
 * @param {Function} options.render Function to render component
 * @param {Boolean} options.renderOnCreate Determines if the component will be
 *  rendered on creation or not
 * @returns {Object} Returns option functions
 */
const componentFactory = (options) => {
  const {
    polling,
    create,
    events,
    render,
    renderOnCreate,
    api,
  } = options;
  let toReturn;

  const build = () => {
    const component = create();
    if (events) events(component);
    if (renderOnCreate && render) render(component);

    // Return individual component functions
    toReturn = {
      component,
      events,
      render,
      api,
    };
  };

  try {
    if (polling) {
      pollerLite(polling, build);
    } else {
      build();
    }
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }

  return toReturn;
};

export default componentFactory;
