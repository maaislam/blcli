import settings from '../../lib/settings';
import {
  events
} from '../../../../../../lib/utils';

const {
  ID,
  VARIATION
} = settings;

export default class ImportTool {
  /**
   * @param {object} options
   * @param {function} options.render Function to render component
   */
  constructor(options) {
    const opts = options || {};
    this.create();
    this.bindEvents();
    if (opts.render) opts.render(this.component);
  }

  create() {
    const countryCode = document.querySelector('html').getAttribute('lang').toUpperCase();
    let data = [];
    switch (countryCode) {
      case 'EN':
        data = {
          title: 'Import Tool Upload',
          content: 'You can now upload all your product requirements in one go. Simply copy and paste, use your own file.',
          button: 'Upload Now',
        }
        break;
      case 'DE':
        data = {
          title: 'Stücklisten-Import Upload',
          content: 'Jetzt können Sie Ihre komplette Bestellung auf einmal hochladen. Einfach die Liste per copy/paste einfügen oder Datei hochladen!',
          button: 'Jetzt hochladen',
        }
        break;
      case 'CH':
        data = {
          title: 'Stücklisten-Import Upload',
          content: 'Jetzt können Sie Ihre komplette Bestellung auf einmal hochladen. Einfach die Liste per copy/paste einfügen oder Datei hochladen!',
          button: 'Jetzt hochladen',
        }
        break;
      case 'FR':
        data = {
          title: 'Charger l\'outil d\'import',
          content: 'Vous pouvez désormais télécharger toutes vos demandes de produits en une seule fois. Il vous suffit de copier et coller, d\'utiliser votre propre fichier.',
          button: 'Charger maintenant',
        }
        break;
      case 'SV':
        data = {
          title: 'Importverktyg',
          content: 'Nu kan du ladda upp alla dina produktkrav i ett svep. Kopiera och klistra in från din egen fil.',
          button: 'Ladda upp nu',
        }
        break;
      default:
        break;
    }
    let importContent = '';
    importContent = `
      <h3 class="${ID}_importTool__title">${data.title}</h3>
      <p class="${ID}_importTool__content">${data.content}</p>
      <div class="${ID}_importTool__buttonWrap">
        <a href="/import-tool" class="${ID}_importTool__button">${data.button}</a>
      </div>
    `;
    const element = document.createElement('div');
    element.classList.add(`${ID}_importToolWrap`);
    element.innerHTML = `
    <div class="${ID}_importTool">
      ${importContent}
      <img class="${ID}_importTool__img " src="https://dxlfb468n8ekd.cloudfront.net/gsc/4UA12F/b1/ab/17/b1ab174adb7145328f734982ad466482/images/search_logged_out/u36.png?token=971946363a82494dfc6f4d20515cfd47">
  </div>
  `;
    this.component = element;
  }

  bindEvents() {
    const importButton = this.component.querySelector(`.${ID}_importTool__button`);
    importButton.addEventListener('click', () => {
      events.send(ID, 'User clicked', `import-tool - Variation ${VARIATION}`);
    });
  }
}
