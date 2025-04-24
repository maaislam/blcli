import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import {
  satTvPaketeSteps,
  tvAppPaketeSteps,
  getHardwareSteps,
  hardwareSettings,
} from './data';
import { renderSingleItemReduce } from './render-single-item-reduce';

const { ID } = shared;

const chevronIcon = `<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 1L2 9L9 17" stroke="#C2C2C2" stroke-width="2"/>
</svg>
`;

export const onPaketePage = () => {
  // Old elements on the page that we hide
  const hiddenOldElement = document.querySelector('#options');

  // Add new elements
  hiddenOldElement.insertAdjacentHTML(
    'afterend',
    `
    <div class="${ID}-wrapper">
      <div class="${ID}-header">
        <h2 class="color-grey1 ${ID}-header__title">Wähle dein maßgeschneidertes HD Austria Paket</h2>
        <p class="${ID}-header__subtitle">In allen HD Austria Paketen sind die kostenlose ORF Freischaltung und die TV-App inkludiert. Mit der TV-App kannst du auch unterwegs über jedes mobile Gerät fernsehen.</p>
        <a class="${ID}-header__link ${ID}-hide" href="https://www.hdaustria.at/smartcard/aktivieren/">Ich brauche kein SAT-Empfangsgerät. Weiter zur Aktivierung.</a>
      </div>
      <div class="${ID}-tab-buttons">
        <div class="${ID}-tab-buttons__single ${ID}-tab-buttons__single--left ${ID}-tab-buttons__single--active">
          <p class="${ID}-tab-buttons__single--name">SAT-TV Pakete</p>
          <img src="https://ucds.ams3.digitaloceanspaces.com/HDA-005/SATAsset%201.svg"></img>
        </div>
        <div class="${ID}-tab-buttons__single ${ID}-tab-buttons__single--right ${ID}-tab-buttons__single--inactive">
          <p class="${ID}-tab-buttons__single--name">TV-App Pakete</p>
          <img src="https://ucds.ams3.digitaloceanspaces.com/HDA-005/AppAsset%201.svg"></img>
        </div>
      </div>
      <div class="${ID}-items-wrapper ${ID}-items-wrapper--left">
        ${satTvPaketeSteps.reduce(renderSingleItemReduce, ``)}
      </div>
      <div class="${ID}-items-wrapper ${ID}-items-wrapper--right ${ID}-items-wrapper--inactive">
        ${tvAppPaketeSteps.reduce(renderSingleItemReduce, ``)}
      </div>
      <div class="${ID}-items-wrapper ${ID}-items-wrapper--hardware ${ID}-items-wrapper--inactive">
      </div>
      <div class="${ID}-hardware-back-button-wrapper ${ID}-hide">
        <button class="${ID}-hardware-back-button">${chevronIcon} Zurück</button>
      </div>
    </div>
  </div>
  `
  );

  fireEvent(
    'Visible - The user sees the new components - Package Content Improvements'
  );

  const titleElement = document.querySelector(`.${ID}-header__title`);

  const subtitleElement = document.querySelector(`.${ID}-header__subtitle`);

  const linkHeaderElement = document.querySelector(`.${ID}-header__link`);

  const tabButtonsWraper = document.querySelector(`.${ID}-tab-buttons`);

  const leftTabButton = document.querySelector(
    `.${ID}-tab-buttons__single--left`
  );

  const rightTabButton = document.querySelector(
    `.${ID}-tab-buttons__single--right`
  );

  const leftItemsWrapper = document.querySelector(`.${ID}-items-wrapper--left`);

  const rightItemsWrapper = document.querySelector(
    `.${ID}-items-wrapper--right`
  );

  const hardwareItemsWrapper = document.querySelector(
    `.${ID}-items-wrapper--hardware`
  );

  // On click - left tab button
  leftTabButton.addEventListener('click', (event) => {
    event.preventDefault();

    fireEvent('Click - user clicked tab button - SAT-TV Pakete.');
    fireEvent('Visible - The user sees SAT-TV Pakete elements.');

    if (leftTabButton.classList.contains(`${ID}-tab-buttons__single--active`))
      return;

    leftTabButton.classList.remove(`${ID}-tab-buttons__single--inactive`);
    leftTabButton.classList.add(`${ID}-tab-buttons__single--active`);
    rightTabButton.classList.remove(`${ID}-tab-buttons__single--active`);
    rightTabButton.classList.add(`${ID}-tab-buttons__single--inactive`);

    // wrapper
    leftItemsWrapper.classList.remove(`${ID}-items-wrapper--inactive`);
    if (!rightItemsWrapper.classList.contains(`${ID}-items-wrapper--inactive`))
      rightItemsWrapper.classList.add(`${ID}-items-wrapper--inactive`);
  });

  // On click - right tab button
  rightTabButton.addEventListener('click', (event) => {
    event.preventDefault();

    fireEvent('Click - user clicked tab button - TV-App Pakete');
    fireEvent('Visible - The user sees TV-App Pakete elements.');

    if (rightTabButton.classList.contains(`${ID}-tab-buttons__single--active`))
      return;

    rightTabButton.classList.remove(`${ID}-tab-buttons__single--inactive`);
    rightTabButton.classList.add(`${ID}-tab-buttons__single--active`);
    leftTabButton.classList.remove(`${ID}-tab-buttons__single--active`);
    leftTabButton.classList.add(`${ID}-tab-buttons__single--inactive`);

    // wrapper
    rightItemsWrapper.classList.remove(`${ID}-items-wrapper--inactive`);
    if (!leftItemsWrapper.classList.contains(`${ID}-items-wrapper--inactive`))
      leftItemsWrapper.classList.add(`${ID}-items-wrapper--inactive`);
  });

  // CTA on 1 step - on click
  for (const element of document.querySelectorAll(`.${ID}-item__cta`)) {
    const url = element.dataset?.url?.trim?.() ?? null;
    const id = element.dataset?.itemid?.trim?.() ?? null;

    element.addEventListener('click', (event) => {
      event.preventDefault();
      if (url) {
        fireEvent(
          `Click - The user selected TV-App Pakete - ${
            Number(id) === 4 ? 'HD Austria Plus' : 'HD Austria Kombi'
          }`
        );
        window.location = url;
        return;
      }

      const settings = hardwareSettings[id];

      const htmlHardware = getHardwareSteps(settings).reduce(
        renderSingleItemReduce,
        ``
      );

      // Remove old hardware items
      for (const hardwareItem of document.querySelectorAll(
        `.${ID}-items-wrapper--hardware .${ID}-item-wrapper`
      )) {
        hardwareItem.remove();
      }

      // Add new ones
      hardwareItemsWrapper.insertAdjacentHTML('afterbegin', htmlHardware);

      const eventName =
        Number(id) === 1
          ? 'HD Austria'
          : Number(id) === 2
          ? 'HD Austria Plus'
          : 'HD Austria Kombi';

      fireEvent(`Click - choose option - ${eventName}`);
      fireEvent('Visible - The user sees hardware elements');

      // Hide left elements
      if (!leftItemsWrapper.classList.contains(`${ID}-items-wrapper--inactive`))
        leftItemsWrapper.classList.add(`${ID}-items-wrapper--inactive`);

      // Hide tab buttons
      if (!tabButtonsWraper.classList.contains(`${ID}-hide`))
        tabButtonsWraper.classList.add(`${ID}-hide`);

      // Hide subtitle
      if (!subtitleElement.classList.contains(`${ID}-hide`))
        subtitleElement.classList.add(`${ID}-hide`);

      // Show link header button (activate only)
      if (linkHeaderElement.classList.contains(`${ID}-hide`))
        linkHeaderElement.classList.remove(`${ID}-hide`);

      // Change title text and scroll
      titleElement.textContent = `Brauchst du noch SAT-Empfangsgeräte?`;
      window.scrollTo({
        top: titleElement.offsetTop - 100,
        behavior: 'smooth',
      });

      // Show hardware
      if (
        hardwareItemsWrapper.classList.contains(`${ID}-items-wrapper--inactive`)
      )
        hardwareItemsWrapper.classList.remove(`${ID}-items-wrapper--inactive`);

      // Show back button
      document
        .querySelector(`.${ID}-hardware-back-button-wrapper`)
        .classList.remove(`${ID}-hide`);

      // Hardware buttons redirection
      for (const hardwareButton of document.querySelectorAll(
        `.${ID}-items-wrapper--hardware .${ID}-item__cta`
      )) {
        const hardwareUrl = hardwareButton.dataset.url;
        const hardwareId = hardwareButton.dataset?.itemid?.trim?.() ?? null;

        hardwareButton.addEventListener('click', (event) => {
          event.preventDefault();
          fireEvent(
            `Click - The user selected hardware - ${
              Number(hardwareId) === 6 ? `SAT-Receiver` : `SAT-Modul`
            }`
          );
          if (hardwareUrl) return (window.location = hardwareUrl);
        });
      }
    });
  }

  // On back button click
  document
    .querySelector(`.${ID}-hardware-back-button`)
    .addEventListener('click', (e) => {
      e.preventDefault();

      fireEvent(
        'Click - The user clicked back button on the hardware sub-page.'
      );

      // Hide back button
      document
        .querySelector(`.${ID}-hardware-back-button-wrapper`)
        .classList.add(`${ID}-hide`);

      // Hide hardware
      if (
        !hardwareItemsWrapper.classList.contains(
          `${ID}-items-wrapper--inactive`
        )
      )
        hardwareItemsWrapper.classList.add(`${ID}-items-wrapper--inactive`);

      // Show left elements
      if (leftItemsWrapper.classList.contains(`${ID}-items-wrapper--inactive`))
        leftItemsWrapper.classList.remove(`${ID}-items-wrapper--inactive`);

      // Show tab buttons
      if (tabButtonsWraper.classList.contains(`${ID}-hide`))
        tabButtonsWraper.classList.remove(`${ID}-hide`);

      // Show subtitle
      if (subtitleElement.classList.contains(`${ID}-hide`))
        subtitleElement.classList.remove(`${ID}-hide`);

      // Hide link header button (activate only)
      if (!linkHeaderElement.classList.contains(`${ID}-hide`))
        linkHeaderElement.classList.add(`${ID}-hide`);

      // Change title text and scroll
      titleElement.textContent = `Wähle dein maßgeschneidertes HD Austria Paket`;
      window.scrollTo({
        top: titleElement.offsetTop - 100,
        behavior: 'smooth',
      });

      fireEvent('Visible - The user sees SAT-TV Pakete elements.');
    });

  // On No Hardware/Activate only click
  linkHeaderElement.addEventListener('click', (e) => {
    e.preventDefault();

    fireEvent(
      `Click - The user clicked 'Ich brauche kein SAT-Empfangsgerät. Weiter zur Aktivierung.' button on the hardware sub-page.`
    );

    fireEvent(
      `Click - The user is redirected to https://www.hdaustria.at/smartcard/aktivieren/.`
    );

    window.location = 'https://www.hdaustria.at/smartcard/aktivieren/';
  });
};
