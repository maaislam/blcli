import settings from '../../settings';

const { ID } = settings;

export default class SwipeInstructions {
  constructor() {
    this.name = `${ID}_SwipeInstructions`;
    this.steps = [
      {
        img: 'https://dd6zx4ibq538k.cloudfront.net/static/images/2680/598c18f13ea93abe5859e781d512c7da_50_50.png',
        text: `Pick 4 frames from those with a <span class="${ID}_hometrialIcon ${ID}_hometrialIcon--white"></span>`,
      },
      {
        img: 'https://dd6zx4ibq538k.cloudfront.net/static/images/2680/ab6049f82dee5b0bd4c3458306f43ee2_33_50.png',
        text: 'Swipe right to add to your FREE hometrial',
      },

      {
        img: 'https://dd6zx4ibq538k.cloudfront.net/static/images/2680/89e590654af63c92f9380c481dc6f5da_48_50.png',
        text: 'Try out your frames at home within 5 days',
      },
    ];

    this.create();
    this.render();
  }

  create() {
    const { name, steps } = this;

    const component = document.createElement('div');
    component.classList.add(name);

    /* eslint-disable indent */
    component.innerHTML = `
      <ul class="${name}_steps">
        ${steps.map((data, i) => `
          <li>
            <span class="${name}_stepNumber">${i + 1}</span>
            <div class="${name}_img"><img src="${data.img}" /></div>
            <p class="${name}_desc">${data.text}</p>
          </li>
        `).join('')}
      </ul>
    `;
    /* eslint-enable indent */

    this.component = component;
  }

  render() {
    const { component } = this;

    const banner = document.querySelector('#hero-banner');
    banner.insertAdjacentElement('afterend', component);
  }
}
