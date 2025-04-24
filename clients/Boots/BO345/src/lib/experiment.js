/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import budgetContainer from './components/budgetContainer';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const budgetChangeHandler = (target) => {
  const budgetSelectElement = document.querySelector(`.${ID}__budgetContainer`);
  const budgetValue = target.value;
  const selectedItem = budgetSelectElement.options[budgetSelectElement.selectedIndex];
  const selectedText = selectedItem.textContent;
  if (budgetValue !== 'view all') {
    fireBootsEvent(`User clicks ‘whats the budget for’ and ‘${selectedText}’ is selected`, true, eventTypes.experience_action, {
      action: actionTypes.select,
      action_detail: `User clicks ‘whats the budget for’ and ‘${selectedText}’ is selected`,
    });
    const controlButtonElement = document.querySelector(`button.choice-button[data-budget="${budgetValue}"]`);
    controlButtonElement && controlButtonElement.click();
  } else {
    const controlButtonElement = document.querySelector('button.choice-button.selected');
    controlButtonElement?.classList.remove('selected');
  }
};

const init = () => {
  pollerLite(['#GiftFinder-2024', '#budget', () => document.querySelectorAll('[data-budget]').length > 2], () => {
    const targetElement = document.querySelector('#GiftFinder-2024');
    const allBudgetElementWrapper = targetElement.querySelector('#budget');
    const budgetElements = allBudgetElementWrapper.querySelectorAll('button.choice-button');
    const getBudgetData = Array.from(budgetElements).map((item) => {
      return {
        text: item.textContent.trim(),
        value: item.dataset.budget,
      };
    });

    if (!document.querySelector(`.${ID}__budgetContainer`)) {
      getBudgetData.push({ text: 'VIEW ALL', value: 'view all' });
      allBudgetElementWrapper.insertAdjacentHTML('beforebegin', budgetContainer(ID, getBudgetData));
    }

    const budgetSelectElement = document.querySelector(`.${ID}__budgetContainer`);
    budgetSelectElement.addEventListener('change', ({ target }) => budgetChangeHandler(target));

    budgetSelectElement.value = 'view all';
    fireBootsEvent(`User seen the new component`, true, eventTypes.experience_render, {
      action: actionTypes.view,
      action_detail: `User seen the new component`,
    });

    const isClosed = document.querySelector('#ChristmasGiftFinder-2024-container.collapsed');
    if (isClosed) {
      document.querySelector('.GiftFinder-expandable')?.click();
    }

    pollerLite(
      [
        '#ChristmasGiftFinder-2024-container',
        () => document.querySelector('#ChristmasGiftFinder-2024-container').childNodes.length > 1,
      ],
      () => {
        const newSectionWrapper = document.createElement('section');
        newSectionWrapper.setAttribute('aria-label', 'Gift finder');
        newSectionWrapper.id = 'ChristmasGiftFinder-2024-container';

        const controlContainer = document.querySelector('#ChristmasGiftFinder-2024-container');
        controlContainer.insertAdjacentElement('beforebegin', newSectionWrapper);

        const childs = Array.from(controlContainer.childNodes);
        childs.forEach((item) => {
          newSectionWrapper.appendChild(item);
        });
      }
    );
  });
};

export default () => {
  const testID = `${ID}| Restyling of XMAS gift finder`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest('#find-my-gift')) {
      fireBootsEvent('User clicks ‘find my perfect gift’ CTA', true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: 'User clicks ‘find my perfect gift’ CTA',
      });
    } else if (target.closest('#recipient')) {
      const recipient = target.closest('#recipient');
      const selectedItem = recipient.options[recipient.selectedIndex];
      if (selectedItem.value !== 'all') {
        const selectedText = selectedItem.textContent;
        fireBootsEvent(`User clicks ‘who is the gift for’ & ‘${selectedText}’ is selected`, true, eventTypes.experience_action, {
          action: actionTypes.select,
          action_detail: `User clicks ‘who is the gift for’ & ‘${selectedText}’ is selected`,
        });
      }
    } else if (target.closest('#concern')) {
      const recipient = target.closest('#concern');
      const selectedItem = recipient.options[recipient.selectedIndex];
      if (selectedItem.value !== 'all') {
        const selectedText = selectedItem.textContent;
        fireBootsEvent(`User clicks ‘what type of gift’ and ‘${selectedText}’ is selected`, true, eventTypes.experience_action, {
          action: actionTypes.select,
          action_detail: `User clicks ‘what type of gift’ and ‘${selectedText}’ is selected`,
        });
      }
    }
  });

  if (VARIATION == 'control') {
    fireBootsEvent(`User would have seen the new component`, true, eventTypes.experience_render, {
      action: actionTypes.view,
      action_detail: `User would have seen the new component`,
    });
    return;
  }

  init();
};
