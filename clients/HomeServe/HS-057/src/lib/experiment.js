/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from './helpers/utils';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import bcisSection from './components/bcisSection';
import { obsIntersection } from './helpers/utils';

const { ID, VARIATION } = shared;
const extractCover = (text) => {
  const regex = /With (.+?you)/;
  const match = text.match(regex);
  return match ? match[1].split('you')[0].trim() : null;
};

const collectAndSortListItems = (elements) => {
  const listItems = [...elements];
  return listItems
    .map((li) => ({
      name: li.querySelector('.name')?.textContent.trim(),
      price: parseFloat(li.querySelector('.price')?.textContent.trim().replace(/£/, '')),
    }))
    .sort((a, b) => b.price - a.price);
};

const collectSpeceficText = (subHeadWrapper) => {
  const matchingNode = Array.from(subHeadWrapper.querySelectorAll('div'))
    .map((div) => Array.from(div.childNodes))
    .flat()
    .find((node) => {
      return node.nodeType === Node.TEXT_NODE && node.textContent.trim().toLowerCase().startsWith('with');
    });

  return matchingNode;
};

const handleIntersectionConditionsMet = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__conditionMet`)) {
      fireEvent('Conditions Met');
      document.body.classList.add(`${ID}__conditionMet`);
    }
  }
};

const handleIntersectionBcisContent = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__bcisContent`)) {
      fireEvent('User sees the BCIS content');
      document.body.classList.add(`${ID}__bcisContent`);
    }
  }
};

const handleIntersectionApplyBuuton = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__applyBtn`)) {
      fireEvent('User sees the Apply CTA');
      document.body.classList.add(`${ID}__applyBtn`);
    }
  }
};

const handleObserver = (selector, text) => {
  const intersectionAnchor = document.querySelector(selector);
  if (intersectionAnchor) {
    obsIntersection(
      intersectionAnchor,
      0.2,
      text === 'cover'
        ? handleIntersectionConditionsMet
        : text === 'bcis'
        ? handleIntersectionBcisContent
        : handleIntersectionApplyBuuton
    );
  }
};

const init = () => {
  const targetElement = document.querySelector('.bcis-cost-wrapper');
  const subHeadWrapper = targetElement.querySelector('.subhead-wrapper');

  const matchingNode =
    subHeadWrapper?.querySelectorAll('div').length > 0
      ? collectSpeceficText(subHeadWrapper)
      : Array.from(subHeadWrapper.childNodes)
          .map((node) => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().toLowerCase().startsWith('with')) {
              return node;
            }
            return null;
          })
          .filter(Boolean)[0];
  const titleName = matchingNode ? extractCover(matchingNode.textContent.trim()) : '';
  const perClaimElement =
    subHeadWrapper?.querySelectorAll('div').length > 0
      ? subHeadWrapper.querySelector('div:last-child > strong:last-of-type')
      : subHeadWrapper.querySelector('strong:last-of-type');
  const perClaimValue = perClaimElement?.textContent?.split('excess')[0].trim();
  const policyElement = targetElement.querySelector('.text-center.small');
  const policyText = policyElement?.textContent?.trim();
  const tableLists = targetElement.querySelectorAll('.accordian-data ul li:not(.first-row)');
  const sortedItems = collectAndSortListItems(tableLists);

  if (!document.querySelector(`.${ID}__bcis-cost-wrapper`)) {
    targetElement.insertAdjacentHTML('afterbegin', bcisSection(ID, titleName, perClaimValue, policyText, sortedItems));
  }
};
export default () => {
  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  pollerLite(['#get-started'], () => {
    handleObserver('#get-started', 'cover');
  });

  pollerLite(['.HS-034__getStarted a.btn'], () => {
    handleObserver('.HS-034__getStarted a.btn', 'apply');
  });

  pollerLite(['#get-started a[aria-label="Apply now"]'], () => {
    handleObserver('#get-started a[aria-label="Apply now"]', 'apply');
  });

  pollerLite(['.bcis-cost-wrapper'], () => {
    handleObserver('.bcis-cost-wrapper', 'bcis');
  });

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest('th #custom-popup')) {
      const clickedItem = target.closest('th #custom-popup');
      const wrapper = clickedItem.closest('th');
      wrapper.classList.contains('open') ? wrapper.classList.remove('open') : wrapper.classList.add('open');
    } else if (target.closest(`.${ID}__icon`)) {
      const clickedItem = target.closest(`.${ID}__icon`);
      const wrapper = clickedItem.closest('th');
      wrapper.classList.remove('open');
    } else if (target.closest('#accordian-container')) {
      fireEvent('User interacts with “Learn more about costs” cta');
    }
  });
  if (VARIATION == 'control') {
    return;
  }

  init();

  const tooltipWrapper = document.querySelector('table #custom-popup');

  tooltipWrapper.addEventListener('keydown', (e) => {
    const { target } = e;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const wrapper = target.closest('th');
      wrapper.classList.contains('open') ? wrapper.classList.remove('open') : wrapper.classList.add('open');
    } else if (e.key === 'Escape') {
      const wrapper = target.closest('th');
      wrapper.classList.remove('open');
    }
  });

  const crossIcon = document.querySelector(`table .${ID}__icon`);

  crossIcon.addEventListener('keydown', (e) => {
    const { target } = e;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      e.preventDefault();
      const wrapper = target.closest('th');
      wrapper.classList.remove('open');
    }
  });
};
