import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;

const init = (mutation) => {
  setup();

  const signupBtns = document.querySelectorAll('a[href^="https://manage.gocardless.com/signup?"]');
  const newBtnText = `Demander une démo`;
  const newHref = `https://gocardless.com/fr-fr/g/gcfr-exp/`;
  const oldSignIn = ['.css-15teht8', '.css-2mnmbz', '.sc-1b6vnr3-7', '.g1wveq-11 '];
  const oldContactBtn = document.querySelectorAll('a[href^="https://gocardless.com/fr-fr/contactez-nous/"]');

  oldSignIn.forEach((item) => {
    document.querySelector(item)?.classList.add(`${ID}__hide`);
  });

  oldContactBtn.forEach((item) => {
    item?.classList.add(`${ID}__hide`);
  });
  document.querySelectorAll(`.${ID}__new-btn`).forEach((item) => {
    item?.remove();
  });
  const pageHasLanding = !!document.querySelector('[data-testid="heroSlice"]');

  signupBtns.forEach((btn, index) => {
    if (!pageHasLanding && index > 0) return;
    btn.classList.add(`${ID}__hide`);
    const isInHeader = !!btn.closest('[data-testid="navigationBar"]') || !!btn.closest('#header');
    const isInHamburger = btn.closest('.css-1qu0rrv');
    const newBtn = `<a class="${ID}__new-btn  ${
      isInHeader ? `${ID}__adjust-height ${ID}__header` : isInHamburger ? `${ID}__hamMenu` : `${ID}__homepage`
    }" href="${newHref}">${newBtnText}</a>`;

    btn.insertAdjacentHTML('afterend', newBtn);
  });
  if (!pageHasLanding) return;
  const hotFixBtn = (pos) =>
    `<a class="${ID}__new-btn ${
      pos == 'header' ? `${ID}__adjust-height` : ''
    } ${ID}__${pos}" href="${newHref}">${newBtnText}</a>`;
  const existingBtns1 = document.querySelectorAll(`.css-l5py7l .${ID}__new-btn`);
  const existingBtns2 = document.querySelectorAll(`.css-j599np .${ID}__new-btn`);
  [...existingBtns1, ...existingBtns2].forEach((btn) => {
    btn?.remove();
  });
  document.querySelector('.css-l5py7l').insertAdjacentHTML('beforeend', hotFixBtn('header'));
  document.querySelector('.css-j599np').insertAdjacentHTML('beforeend', hotFixBtn('homepage'));
};

export default () => {
  // Poll and re-run init

  pollerLite([() => !!document.querySelector('#___gatsby') || !!document.querySelector('#root')], () => {
    const appContainer = document.querySelector('#___gatsby') || document.querySelector('#root');

    setup();
    setTimeout(() => {
      VARIATION != 'control' && init();
    }, 2000);

    const isMobile = window.matchMedia('(max-width:768px)').matches;
    if (isMobile && location.pathname == '/fr-fr/') {
      fireEvent('Conditions Met');
    } else if (!isMobile) {
      fireEvent('Conditions Met');
    }

    document.body.addEventListener('click', (e) => {
      const target = e.target;
      //  console.log(`this is :${target}`);
      const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);

      const gaEventTriggerConditions = (classToCheck, classToCheckmobile, innerString) => {
        return (
          (targetMatched(`.${classToCheck}`) && target.closest(`.${classToCheck}`).innerText.indexOf(innerString) !== -1) ||
          (targetMatched(`.${classToCheckmobile}`) &&
            target.closest(`.${classToCheckmobile}`).innerText.indexOf(innerString) !== -1)
        );
      };
      //const test = gaEventTriggerConditions('css-uvst04', 'css-1al32y9', 'Resources');

      if (gaEventTriggerConditions('css-hy6nr5', 'css-hy6nr5', 'S’inscrire')) {
        fireEvent('User interacts with “Jetzt starten” on the homepage');
      } else if (gaEventTriggerConditions('css-1m52c96', 'css-1m52c96', 'Nous contacter')) {
        fireEvent('User interacts with “Nous contacter” on the homepage');
      } else if (gaEventTriggerConditions('css-15teht8', 'css-15teht8', 'Connexion')) {
        fireEvent('User interacts with “Connexion” on the header');
      } else if (gaEventTriggerConditions('css-2mnmbz', 'css-2mnmbz', 'Connexion')) {
        fireEvent('User interacts with “Connexion” on the burger menu');
      } else if (gaEventTriggerConditions('css-1ks30qh', 'css-css-1ks30qh', 'Registrieren') && VARIATION == 'control') {
        fireEvent('User interacts with “Registrieren” on the header');
      } else if (gaEventTriggerConditions('css-1bwxyks', 'css-1bwxyks', 'Registrieren')) {
        fireEvent('User interacts with “Registrieren” on the burger menu');
      } else if ((targetMatched('.css-r76ur8') || targetMatched('.g1wveq-2')) && window.matchMedia('(max-width:768px)').matches) {
        setTimeout(() => {
          init();
        }, 500);
        fireEvent('Conditions Met');
      } else if (targetMatched('.css-d1y5b8') || targetMatched('.css-5qwtyv')) {
        // setTimeout(() => {
        //   init();
        // }, 500);
      } else if (targetMatched(`.${ID}__homepage`)) {
        fireEvent(`user clicked the "Demander une démo" button on the homepage`);
      } else if (targetMatched(`.${ID}__header`)) {
        fireEvent(`user clicked the "Demander une démo" button on the header`);
      } else if (targetMatched(`.${ID}__hamMenu`)) {
        fireEvent(`user clicked the "Demander une démo" button on the burger menu`);
      }
    });

    if (VARIATION == 'control') return;

    // let oldHref = location.href;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        //console.log(mutation);
        const { addedNodes, removedNodes } = mutation;

        const mutationFromNewVariation = [...addedNodes, ...removedNodes].some(
          (addedNode) => addedNode.nodeType === 1 && addedNode.matches(`.${ID}__new-btn`)
        );
        if (mutationFromNewVariation) return;

        setTimeout(() => {
          init();
        }, 2000);
      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
  });
};
