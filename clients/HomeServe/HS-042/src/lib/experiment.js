/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { fireEvent, newEvents, setup } from './helpers/utils';
import shared from '../../../../../core-files/shared';
import mainWrapper from './components/mainWrapper';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const init = () => {
  const targetElement = document.querySelector('.header-box');
  if (!document.querySelector(`.${ID}__mainWrapper`)) {
    targetElement && targetElement.insertAdjacentHTML('afterend', mainWrapper(ID));
  }
};

export default () => {
  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__accordion-link h2`)) {
      const clickedItem = target.closest(`.${ID}__accordion-link`);
      const isExistCustomer = clickedItem.dataset.attr;
      if (clickedItem.classList.contains('is-open')) {
        isExistCustomer === 'existing'
          ? fireEvent('User collapses the existing customer drop down')
          : fireEvent('User collapses the not an existing customer drop down');
      } else {
        isExistCustomer === 'existing'
          ? fireEvent('User expands the existing customer drop down')
          : fireEvent('User expands the not an existing customer drop down');
      }
      clickedItem.classList.toggle('is-open');
      const content = clickedItem.querySelector(`.${ID}__accordion-content`);
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    } else if (target.closest(`.${ID}__chatBot`) && target.closest('div[data-attr="existing"]')) {
      fireEvent('User interacts with chat cta in customer accordion');

      pollerLite([() => document.querySelector('body > .LPMcontainer')], () => {
        document.querySelector('body > .LPMcontainer').click();
      });
    } else if (target.closest('a.phone') && target.closest('div[data-attr="existing"]')) {
      fireEvent('User interacts with phone number in customer accordion');
    } else if (target.closest('a.textphone') && target.closest('div[data-attr="existing"]')) {
      fireEvent('User interacts with textphone number in customer accordion');
    } else if (target.closest(`.${ID}__chatBot`) && target.closest('div[data-attr="nonexisting"]')) {
      fireEvent('User interacts with chat cta in not a customer accordion');

      pollerLite([() => document.querySelector('body > .LPMcontainer')], () => {
        document.querySelector('body > .LPMcontainer').click();
      });
    } else if (target.closest('a.phone') && target.closest('div[data-attr="nonexisting"]')) {
      fireEvent('User interacts with phone number in not a customer accordion');
    } else if (target.closest('a.textphone') && target.closest('div[data-attr="nonexisting"]')) {
      fireEvent('User interacts with textphone number in not a customer accordion');
    } else if (target.closest(`.${ID}__buttons-login`)) {
      fireEvent('User interacts with log in cta in slot 3');
    } else if (target.closest(`.${ID}__buttons-account`) && target.closest(`.${ID}__signposting`)) {
      fireEvent('User interacts with create an account cta in slot 3');
    } else if (target.closest('a.phone') && target.closest(`.${ID}__boxtConatiner`)) {
      fireEvent('User interacts with phone number in slot 4');
    } else if (target.closest(`.${ID}__buttons-boxt`)) {
      fireEvent('User interacts with get a quote cta in slot 4');
    } else if (target.closest(`a.${ID}__buttons-learn`)) {
      fireEvent('User interacts with learn more cta in slot 4');
    } else if (target.closest('a.complete-form')) {
      fireEvent('User interacts with complete form in complaints section');
    } else if (target.closest('a.phone') && target.closest('.experienceSection')) {
      fireEvent('User interacts with phone number cta in complaints section');
    } else if (target.closest('a.textphone') && target.closest('.experienceSection')) {
      fireEvent('User interacts with text phone number cta in complaints section');
    } else if (target.closest('a.phone') && target.closest(`.${ID}__claimComponent`)) {
      fireEvent('User interacts with phone number in slot 1');
    } else if (target.closest('a.textphone') && target.closest(`.${ID}__claimComponent`)) {
      fireEvent('User interacts with textphone number in slot 1');
    } else if (target.closest(`.${ID}__accordionWrapper`) && target.closest('a.phone')) {
      fireEvent('User interacts with phone number in section 2');
    } else if (target.closest('a.popular-link')) {
      fireEvent('User interacts with help topics');
    } else if (target.closest('.header-logo .btn-login')) {
      fireEvent('User interacts with log in cta in slot 1');
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  init();
};
