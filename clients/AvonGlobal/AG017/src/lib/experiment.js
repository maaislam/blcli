/**
 * AG017 - Russian Try it on tool translations
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { observer, pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();
  let $tryItOn;
  let $tryItOnBody;

  const { ID, $ } = shared;
  const translations = [
    {
      original: 'Choose Try-On Experience',
      ru: 'Онлайн примерочная',
    },

    {
      original: 'Live Makeup',
      ru: 'Режим реального времени',
    },

    {
      original: 'Choose<span><br>a Model</span>',
      ru: 'Эксперементируй <span><br>на моделях</span>',
    },

    {
      original: 'Upload<span><br>a Photo</span>',
      ru: 'Загрузи <span><br>свое фото</span>',
    },

    {
      original: 'No Face',
      ru: 'Ошибка - невозможно распознать лицо',
    },

    {
      original: 'Take photo in',
      ru: 'Сделать фото',
    },

    {
      original: 'No face detected',
      ru: 'Ошибка - невозможно распознать лицо',
    },

    {
      original: 'Invalid photo',
      ru: 'Ошибка - фото плохого качества',
    },

    {
      original: 'Invalid file type',
      ru: 'Ошибка - нечитаемый формат файла',
    },

    {
      original: 'Unable to access camera. Please refresh page to allow camera permission or check browser camera setting and make sure camera is not being blocked.',
      ru: 'Нет доступа к камере - убедитесь, что камера подключена и не заблокирована. Обновите страницу и проверьте настройки',
    },

    {
      original: 'For better result, try facing the light source',
      ru: 'Для лучшего результата выбере более освещенное место',
    },

    {
      original: 'Close',
      ru: 'Закрыть',
    },

    {
      original: 'Choose a Model',
      ru: 'Выберите модель',
    },
  ];

  /**
   * Set the references to the component and iframe
   * This should be re-ran if the component is reinitialised
   */
  const setReferences = () => {
    $tryItOn = $('#YMK-module-iframe');
    $tryItOnBody = $tryItOn.contents().find('body');
  };

  /**
   * Get the name of the page the component is currently on
   * by looking for matching markup
   * @returns {string}
   */
  const getPageName = () => {
    const markup = $tryItOnBody.html();
    let pageName;

    if (markup.indexOf('Choose Try-On Experience') > -1) {
      pageName = 'home';
    } else if (markup.indexOf('<div id="result-compare-indicator"') > -1) {
      pageName = 'camera';
    }

    return pageName;
  };

  /**
   * Replace content within the iframe
   */
  const replaceContent = () => {
    const pageName = getPageName();

    /*
      Add a unique class to the current content so we can split the CSS
      per page. By default all the styles are inline and the elements don't
      have unique classes or identifiers.
    */
    $tryItOnBody.find('.frame-content > div > div').addClass(`${ID}--${pageName}`);

    /*
      Loop through each element in the try it on iframe and replace markup
      in the translations array
    */
    $tryItOnBody.contents().find('*').each((index, element) => {
      const $element = $(element);
      const markup = $element.html().trim();

      $(translations).each((i, item) => {
        const { original, ru } = item;
        const shouldReplace = markup === original;
        if (shouldReplace) {
          $element.html(ru);
        }
      });
    });
  };

  /**
   * Watch for mutaitons within the iframe then replace the content
   */
  const watchForMutations = () => {
    observer.connect($tryItOnBody, () => {
      replaceContent();
      setTimeout(replaceContent, 50);
      setTimeout(replaceContent, 150);
    }, {
      config: { childList: true, subtree: true, attributes: false },
      throttle: 100,
    });
  };

  /**
   * Add new CSS to the component
   */
  const addCSS = () => {
    $tryItOn.contents().find('head').append(`
      <style type="text/css">
        /* MAIN MENU */
        /* Title */
        .frame-content > div > .${ID}--home > div:nth-child(1) {
          padding: 20px 0px 5px !important;
        }

        /* Live Makeup Button */
        .frame-content > div > .${ID}--home  > div:nth-child(2) {
          padding: 0 25px !important;
        }

        .frame-content > div > .${ID}--home  > div:nth-child(2) > div:nth-child(1) {
          border: 2px solid rgb(239, 63, 120) !important;
          border-radius: 30px !important;
          margin-top: 2% !important;
        }

        .frame-content > div > .${ID}--home  > div:nth-child(2) > div:nth-child(1) > img {
          border: none !important;
          width: 70% !important;
        }

        .frame-content > div > .${ID}--home  > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) {
          top: -20.4px !important;
        }

        /* Choose a Model Button */
        /* Upload a Photo Button */
        .frame-content > div > .${ID}--home  > div:nth-child(2) > div:nth-child(2),
        .frame-content > div > .${ID}--home  > div:nth-child(2) > div:nth-child(3) {
          width: 45% !important;
          padding: 7% 1% 2.5% !important;
        }

        .frame-content > div > .${ID}--home  > div:nth-child(2) > div:nth-child(2) > a > div,
        .frame-content > div > .${ID}--home  > div:nth-child(2) > div:nth-child(3) > label > div {
          width: 113px !important;
          top: -55px !important;
        }

        /* No face in photo message */
        .frame-content > div > .${ID}--camera > div:nth-child(5) > div > div:nth-child(1) {
          margin-top: -70px !important;
        }
        
      </style>
    `);
  };

  /**
   * Disconnect all active mutation observers to
   * prevent unnecessary memory usage
   */
  const disconnectActiveObservers = () => {
    const { active } = observer;
    active.forEach((index, [element, mutationObserver]) => {
      // Disconnect mutation observer
      mutationObserver.disconnect();

      // Remove element from active array
      active.splice(index, 1);
    });
  };

  /**
   * Wait for iframe content to be loaded in
   * @returns {Promise}
   */
  const waitForContent = () => new Promise((resolve, reject) => {
    pollerLite([
      () => !!$('#YMK-module-iframe').contents().find('.frame-content div').length,
    ], resolve);
  });

  /**
   * Init experiment
   */
  const init = () => {
    const makeChanges = () => {
      disconnectActiveObservers();
      setReferences();
      replaceContent();
      watchForMutations();
      addCSS();
    };

    pollerLite(['#YMK-module-iframe'], () => {
      const $iFrame = $('#YMK-module-iframe');
      const iFrameLoaded = $iFrame[0].contentDocument.readyState === 'complete';
      if (iFrameLoaded) {
        makeChanges();
      } else {
        $iFrame.one('load', () => {
          waitForContent().then(makeChanges);
        });
      }
    });
  };

  init();

  // Re-run changes if component is reinitialised
  window.YMK.addEventListener('opened', init);
};
