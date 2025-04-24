import { activateSearchFunctionality } from './utils';
import shared from '../../../../../../core-files/shared';
import { fireEvent } from '../../../../../../core-files/services';
const { ID, VARIATION } = shared;

const selectedData = JSON.parse(window.sessionStorage.getItem(`${ID}__selectedData`));
const organizeAndSaveData = (ID) => {
  // Select all __item elements
  const items = document.querySelectorAll(`.${ID}__selectedWrapper .${ID}__item`);
  // Map through the items to create the desired structure
  const data = Array.from(items).map((item, index) => {
    const stepKey = `step${index + 1}`;
    const value = item.querySelector('span')?.textContent.trim() || '';
    let data;
    if (index === 0) {
      data = window[`${ID}__selectedJob`] ? window[`${ID}__selectedJob`] : selectedData[index].step1.data;
    } else if (index === 1) {
      data = window[`${ID}__selectedProfession`] ? window[`${ID}__selectedProfession`] : selectedData[index].step2.data;
    } else if (index === 2) {
      data = window[`${ID}__category`] ? window[`${ID}__category`] : selectedData[index].step3.data;
    }

    return { [stepKey]: { attr: value, data } };
  });
  // Save the data into sessionStorage
  const storageKey = `${ID}__selectedData`;
  window.sessionStorage.setItem(storageKey, JSON.stringify(data));
};

const renderOptions = (data, ID) => {
  const options = data
    .map((item) => {
      return `
        <div class="${ID}__option" data-name="${item.name ? item.name : item}" ${
        item.link ? `data-link="${item.link}"` : ''
      } tabindex="0" role="button" aria-label="${item.name ? item.name : item}">
          ${
            item.imageUrl
              ? `<div class="${ID}__imageWrapper" >
            <img src="${item.imageUrl}" />
          </div>`
              : ''
          }   
          <span>${item.name ? item.name.trim() : item}</span>
        </div>
      `;
    })
    .join('\n');

  return options.trim();
};

const renderCategoryOptions = (data, ID) => {
  const options = data
    .map((item) => {
      return `
        <a class="${ID}__option" data-name="${item.name ? item.name : item}" ${
        item.link ? `href="${item.link}"` : ''
      } tabindex="0" role="button" aria-label="${item.name ? item.name : item}">
          ${
            item.imageUrl
              ? `<div class="${ID}__imageWrapper" >
            <img src="${item.imageUrl}" />
          </div>`
              : ''
          }   
          <span>${item.name ? item.name.trim() : item}</span>
        </a>
      `;
    })
    .join('\n');

  return options.trim();
};

const stepOneActive = (allSteps) => {
  allSteps.forEach((step) => {
    step.classList.remove('active');
    step.classList.remove('previous');
  });

  const stepOne = document.querySelector(`.${ID}__step-one`);
  stepOne.classList.add('active');
};
const stepTwoActive = (allSteps) => {
  allSteps.forEach((step) => {
    if (step.classList.contains(`${ID}__step-one`)) {
      step.classList.remove('active');
      step.classList.add('previous');
    } else if (step.classList.contains(`${ID}__step-two`)) {
      step.classList.remove('previous');
      step.classList.add('active');
    } else {
      step.classList.remove('active');
      step.classList.remove('previous');
    }
  });
};

const stepTwoOptionActive = (stepTwoContainer, textValue) => {
  const previousActiveItem = stepTwoContainer.querySelector(`.${ID}__option.active`);
  previousActiveItem && previousActiveItem.classList.remove('active');
  const activeItem = stepTwoContainer.querySelector(`.${ID}__option[data-name="${textValue}"]`);
  activeItem && activeItem.classList.add('active');
};

const stepThreeOptionActive = (stepThreeContainer, textValue) => {
  const previousActiveItem = stepThreeContainer.querySelector(`.${ID}__option.active`);
  previousActiveItem && previousActiveItem.classList.remove('active');
  const activeItem = stepThreeContainer.querySelector(`.${ID}__option[data-name="${textValue}"]`);
  activeItem && activeItem.classList.add('active');
};
const stepThreeActive = (allSteps) => {
  allSteps.forEach((step) => {
    if (step.classList.contains(`${ID}__step-one`) || step.classList.contains(`${ID}__step-two`)) {
      step.classList.remove('active');
      step.classList.add('previous');
    } else if (step.classList.contains(`${ID}__step-three`)) {
      step.classList.remove('previous');
      step.classList.add('active');
    } else {
      step.classList.remove('active');
      step.classList.remove('previous');
    }
  });
};

const stepDetectionAndTriggerGoal = () => {
  if (document.querySelector(`.${ID}__step-one.active`)) {
    fireEvent('clicked close at looking for job step');
  } else if (document.querySelector(`.${ID}__step-two.active`)) {
    fireEvent('clicked close at trade step');
  } else if (document.querySelector(`.${ID}__step-three.active`)) {
    fireEvent('clicked close at working on step');
  } else if (document.querySelector(`.${ID}__step-four.active`)) {
    fireEvent('clicked close at list of categories step');
  }
};
const clickHandler = (e, ID) => {
  const { target } = e;
  const selectedData = JSON.parse(window.sessionStorage.getItem(`${ID}__selectedData`));

  if (target.closest(`.${ID}__step-one .${ID}__option`)) {
    const clickedItem = target.closest(`.${ID}__step-one .${ID}__option`);
    const nextButton = document.querySelector(`.${ID}__next-btn`);

    document.querySelectorAll(`.${ID}__step-one .${ID}__option.active`).forEach((item) => {
      if (item !== clickedItem && item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });
    clickedItem.classList.add('active');
    nextButton.removeAttribute('disabled');
  } else if (target.closest(`.${ID}__next-btn`)) {
    const stepOneActiveElement = document.querySelector(`.${ID}__step-one .${ID}__option.active`);
    const { attr } = stepOneActiveElement.dataset;
    const findItem = window[`${ID}__data`].find((item) => item.reason === attr);

    if (findItem) {
      //fireEvent(`completed step 1 and clicked ${attr} option`);
      window[`${ID}__selectedJob`] = attr;
      window[`${ID}__selectedProfession`] = findItem.profession;
      const stepTwoContainer = document.querySelector(`.${ID}__step-two .${ID}__options-list`);
      const stepTwoWrapper = stepTwoContainer.closest(`.${ID}__step`);
      const previousStep = stepTwoWrapper.previousElementSibling;
      // const selectedItemOne = document.querySelector(`.${ID}__item.item-one span`);
      // selectedItemOne.textContent = attr;
      stepTwoContainer.innerHTML = renderOptions(window[`${ID}__selectedProfession`], ID);

      previousStep.classList.toggle('active');
      previousStep.classList.toggle('previous');
      setTimeout(() => {
        stepTwoWrapper.classList.toggle('active');
      }, 50);
    }
  } else if (target.closest(`.${ID}__step-two .${ID}__option`)) {
    const clickedItem = target.closest(`.${ID}__step-two .${ID}__option`);
    const chooseProfession = clickedItem.dataset.name;
    const findProfession = window[`${ID}__selectedProfession`]
      ? window[`${ID}__selectedProfession`].find((item) => item.name === chooseProfession)
      : selectedData[1].step2.data.find((item) => item.name === chooseProfession);
    if (findProfession) {
      fireEvent(`completed step 1 ${chooseProfession} option`);
      const selectedItemTwo = document.querySelector(`.${ID}__item.item-two span`);
      selectedItemTwo.textContent = `a ${chooseProfession}`;
      const stepThreeContainer = document.querySelector(`.${ID}__step-three .${ID}__options-list`);
      stepThreeContainer.innerHTML = renderOptions(findProfession.hasChildren, ID);
      window[`${ID}__category`] = findProfession.hasChildren;
      const stepTwoWrapper = clickedItem.closest(`.${ID}__step`);
      const nextStep = stepTwoWrapper.nextElementSibling;
      stepTwoWrapper.classList.toggle('active');
      stepTwoWrapper.classList.toggle('previous');

      setTimeout(() => {
        nextStep.classList.toggle('active');

        const activeStepThreeElem = document.querySelector(`.${ID}__step-three.active`);
        if (activeStepThreeElem) {
          const modal = activeStepThreeElem.closest(`.${ID}__modal`);
          const itemOneElem = modal.querySelector(`.${ID}__item.item-one`);
          itemOneElem.style.display = 'none';
        }
      }, 50);
    }
  } else if (target.closest(`.${ID}__step-three .${ID}__option`)) {
    const clickedItem = target.closest(`.${ID}__step-three .${ID}__option`);
    const selectedWrapper = document.querySelector(`.${ID}__modal-header .${ID}__selectedWrapper`);
    const closeWrapper = document.querySelector(`.${ID}__closeWrapper`);
    selectedWrapper.style.pointerEvents = 'none';
    closeWrapper.style.pointerEvents = 'none';
    const chooseCategory = clickedItem.dataset.name;
    const findCategory = window[`${ID}__category`]
      ? window[`${ID}__category`].find((item) => item.name === chooseCategory)
      : selectedData[2].step3.data.find((item) => item.name === chooseCategory);
    if (findCategory) {
      fireEvent(`completed step 2 ${chooseCategory} option`);
      const selectedItemThree = document.querySelector(`.${ID}__item.item-three span`);
      selectedItemThree.textContent = chooseCategory;
      const stepFourContainer = document.querySelector(`.${ID}__step-four .${ID}__options-list`);
      stepFourContainer.innerHTML = renderCategoryOptions(findCategory.jobReference, ID);
      const stepThreeWrapper = clickedItem.closest(`.${ID}__step`);
      const nextStep = stepThreeWrapper.nextElementSibling;
      stepThreeWrapper.classList.toggle('active');
      stepThreeWrapper.classList.toggle('previous');
      const spinnerWrapper = document.querySelector(`.${ID}__spinnerWrapper`);
      spinnerWrapper.style.display = 'flex';
      const selectedWrapper = document.querySelector(`.${ID}__selectedWrapper`);
      setTimeout(() => {
        spinnerWrapper.style.display = 'none';
        nextStep.classList.toggle('active');
        selectedWrapper.removeAttribute('style');
        closeWrapper.removeAttribute('style');
      }, 3500);
    }
  } else if (target.closest(`.${ID}__option`) && target.closest(`.${ID}__step-four`)) {
    const clickedItem = target.closest(`.${ID}__option`);
    const wrapper = clickedItem.closest(`.${ID}__step`);
    const { name } = clickedItem.dataset;
    wrapper.querySelectorAll(`.${ID}__option.active`).forEach((item) => item.classList.remove('active'));
    clickedItem.classList.toggle('active');
    fireEvent(`clicked a category from the listed categories named ${name}`);
    organizeAndSaveData(ID);
  } else if ((target.closest(`.${ID}__text`) || target.closest(`.${ID}__icon`)) && target.closest(`.${ID}__closeWrapper`)) {
    // fireEvent('User clicks close on the profession step');

    const modal = document.querySelector(`.${ID}__modal`);
    modal.classList.add(`${ID}__closing`);
    modal.classList.remove(`${ID}__open`);
    modal.setAttribute('aria-hidden', 'true');
    stepDetectionAndTriggerGoal();

    if (modal.classList.contains('custom-home')) {
      modal.classList.remove(`${ID}__closing`);
      modal.classList.add(`${ID}__open`);

      modal.setAttribute('aria-hidden', 'false');

      const allSteps = document.querySelectorAll(`.${ID}__step`);
      allSteps.forEach((step) => {
        step.classList.remove('active');
        step.classList.remove('previous');
      });

      allSteps[0].classList.add('active');
    }
  } else if (target.closest(`.${ID}__modal .search-button`)) {
    const searchInput = document.querySelector(`.${ID}__modal .search-input`);
    const searchValue = searchInput.value.trim();
    if (searchValue) {
      activateSearchFunctionality(searchValue);
    }
  } else if (target.closest(`.${ID}__item.item-one span`)) {
    const allSteps = document.querySelectorAll(`.${ID}__step`);
    stepOneActive(allSteps);
    const stepOne = document.querySelector(`.${ID}__step-one`);
    stepOne.classList.add('active');
    const selectedItem = target.closest(`.${ID}__item.item-one span`);
    const textValue = selectedItem.textContent;
    if (document.querySelector(`.${ID}__option[data-attr="${textValue}"]`))
      document.querySelector(`.${ID}__option[data-attr="${textValue}"]`).click();
  } else if (target.closest(`.${ID}__item.item-two span`)) {
    const allSteps = document.querySelectorAll(`.${ID}__step`);
    stepTwoActive(allSteps);
    const stepTwoContainer = document.querySelector(`.${ID}__step-two .${ID}__options-list`);
    const selectedItem = document.querySelector(`.${ID}__item.item-two span`);
    const textValue = selectedItem.textContent.replace(/^a\s/, '').trim();
    stepTwoContainer.innerHTML = '';
    if (!stepTwoContainer.querySelector(`.${ID}__option`)) {
      stepTwoContainer.innerHTML = window[`${ID}__selectedProfession`]
        ? renderOptions(window[`${ID}__selectedProfession`], ID)
        : renderOptions(selectedData[1].step2.data, ID);
    }
    stepTwoOptionActive(stepTwoContainer, textValue);

    const itemOneElem = document.querySelector(`.${ID}__item.item-one`);
    itemOneElem.style.display = 'block';
  } else if (target.closest(`.${ID}__item.item-three span`)) {
    const allSteps = document.querySelectorAll(`.${ID}__step`);
    stepThreeActive(allSteps);
    const stepThreeContainer = document.querySelector(`.${ID}__step-three .${ID}__options-list`);
    const selectedItem = document.querySelector(`.${ID}__item.item-three span`);
    const textValue = selectedItem.textContent.trim();
    stepThreeContainer.innerHTML = '';
    if (!stepThreeContainer.querySelector(`.${ID}__option`)) {
      stepThreeContainer.innerHTML = window[`${ID}__category`]
        ? renderOptions(window[`${ID}__category`], ID)
        : renderOptions(selectedData[2].step3.data, ID);
    }
    stepThreeOptionActive(stepThreeContainer, textValue);
  } else if (target.closest(`.${ID}__iconEdit`) || target.closest(`.${ID}__text`)) {
    const clickedItem = target.closest(`.${ID}__iconEdit`) || target.closest(`.${ID}__text`);
    const wrapper = clickedItem.closest(`.${ID}__select`);
    const options = document.querySelectorAll(`.${ID}__select`);

    options.forEach((option) => {
      const step = option.dataset.step;

      if (!step) return;

      const valueElem = option.querySelector(`.${ID}__text`);
      const itemElem = document.querySelector(`.${step} span`) || document.querySelector(`.${ID}__item.${step} span`);

      itemElem.textContent = valueElem.textContent;
    });

    const { step } = wrapper.dataset;
    const modal = document.querySelector(`.${ID}__modal`);
    modal.classList.remove(`${ID}__closing`);

    if (!modal.classList.contains(`${ID}__open`)) {
      modal.classList.add(`${ID}__open`);
      modal.setAttribute('aria-hidden', 'false');
    }

    const allSteps = document.querySelectorAll(`.${ID}__step`);
    if (step === 'item-one') {
      stepOneActive(allSteps);
      if (document.querySelector(`.${ID}__option[data-attr="${selectedData[0].step1.attr}"]`))
        document.querySelector(`.${ID}__option[data-attr="${selectedData[0].step1.attr}"]`).click();
    } else if (step === 'item-two') {
      //fireEvent('User edits profession type on job screen');

      stepTwoActive(allSteps);
      const stepTwoContainer = document.querySelector(`.${ID}__step-two .${ID}__options-list`);
      const selectedItem = document.querySelector(`.${ID}__item.item-two span`);
      const textValue = selectedItem.textContent.replace(/^a\s/, '').trim();
      stepTwoContainer.innerHTML = '';
      if (!stepTwoContainer.querySelector(`.${ID}__option`)) {
        stepTwoContainer.innerHTML = selectedData[1].step2.data
          ? renderOptions(selectedData[1].step2.data, ID)
          : renderOptions(window[`${ID}__selectedProfession`], ID);
      }
      stepTwoOptionActive(stepTwoContainer, textValue);
    } else if (step === 'item-three') {
      // fireEvent('User edits the job type on the job screen');

      stepThreeActive(allSteps);
      const stepThreeContainer = document.querySelector(`.${ID}__step-three .${ID}__options-list`);
      const selectedItem = document.querySelector(`.${ID}__item.item-three span`);
      const textValue = selectedItem.textContent.trim();
      stepThreeContainer.innerHTML = '';
      if (!stepThreeContainer.querySelector(`.${ID}__option`)) {
        stepThreeContainer.innerHTML = selectedData[2].step3.data
          ? renderOptions(selectedData[2].step3.data, ID)
          : renderOptions(window[`${ID}__category`], ID);
      }
      stepThreeOptionActive(stepThreeContainer, textValue);
    }
  } else if (target.closest(`.${ID}__bannerButton`)) {
    fireEvent('User clicks “Shop for a job” CTA with Home page'); //location

    const modal = document.querySelector(`.${ID}__modal`);
    modal.classList.remove(`${ID}__closing`);
    modal.classList.add(`${ID}__open`);

    modal.setAttribute('aria-hidden', 'false');

    const myselfOptElem = document.querySelector(`.${ID}__step-one.active [data-attr="job"]`);
    const nextBtnElem = document.querySelector(`.${ID}__step-one.active .${ID}__next-btn`);

    myselfOptElem && myselfOptElem.click();
    nextBtnElem && nextBtnElem.click();
  } else if (
    (target.closest('[data-qaid="button-click-and-collect"]') || target.closest('[data-qaid="pdp-button-click-and-collect"]')) &&
    selectedData &&
    VARIATION !== 'control'
  ) {
    fireEvent('clicked C&C after using new module');
  } else if (
    (target.closest('[data-qaid="button-deliver"]') || target.closest('[data-qaid="pdp-button-deliver"]')) &&
    selectedData &&
    VARIATION !== 'control'
  ) {
    fireEvent('clicked Delivery after using new module');
  } else if (target.closest('[data-qaid="search-button"]')) {
    fireEvent('user interacts with the search bar and clicks the search icon');
  }
};

export default clickHandler;
