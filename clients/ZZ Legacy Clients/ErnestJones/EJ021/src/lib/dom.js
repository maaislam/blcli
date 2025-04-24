import pubSub from './PublishSubscribe';
/**
 * Create an element
 *
 * @param {Object} props Defines element type, atts, text
 * @return {HTMLElement}
 */
export const createElement = (props) => {
  const elm = document.createElement(props.type);
  elm.innerText = props.text;
  props.atts.map((att) => {
    elm.setAttribute(att.key, att.value);
  });
  return elm;
};

/**
 * Trigger event of 'type' on target when element is clicked
 *
 * @param {HTMLElement} target The element to trigger event on
 * @param {String} type The type of event we're triggering
 * @return {Function} function accepts element to be clicked
 */
export const triggerOnClick = (target, type) => {
  return (elm) => {
    elm.addEventListener('click', () => {
      if(HTMLElement.prototype[type]) {
        HTMLElement.prototype[type].call(target);

        pubSub.publish('did-trigger-event-on-element-clicked', {
          element: elm,
          target: target,
          type: type
        });
      }
    });

    return elm;
  }
};

/**
 * Did sroll past point?
 * @param {HTMLElement} elm
 * @param {Number} allowance Only true if this additional amount is scrolled
 * @return {Boolean}
 */
export const didScrollPastElement = (elm, allowance = 0) => {
  const rect = elm.getBoundingClientRect();

  let result = false;
  if(rect.top + allowance <= 0) {
    result = true;
  }

  return result;
}

/**
 * Reorder elements within container
 *
 * Note use of reverse to ensure that any non-specified elements
 * stay where they are at the end since we use 'afterbegin'
 *
 * @param {Array} order Array of string selectors ['#elm', '#elm2']
 * @param {HTMLElement} container Container they sit within
 */
export const reorderElements = (order = [], container) => {
  (Object.assign([], order)).reverse().forEach((sel) => {
    const item = container.querySelector(sel);

    container.insertAdjacentElement('afterbegin', item);
  });
};
