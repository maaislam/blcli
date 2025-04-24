import settings from '../../../lib/settings';

const products = {
  MyRun: {
    name: 'myrun',
    image: '//cdn.optimizely.com/img/8355110909/86d7c897479b439aa9d81f109f71d907.jpg',
    text: '<p>Its compact size is suitable for any home. Minimalist design and innovative technology, giving you the best training experience.</p><p>Live feedback, adaptive surface and endless fun included.</p>',
    price: '£3,250',
    downloadLink: 'https://www.technogym.com/marketing-support/download/F0246A23-7510-4A14-9859-8973FD0E483B',
    redirectLink: 'https://www.technogym.com/gb/treadmill-myrun.html',
  },
  'Jog Forma': {
    name: 'jogForma',
    image: '//cdn.optimizely.com/img/8355110909/db3bfd07d0134deaa231c68ef895214e.jpg',
    text: '<p>Jog Forma is a professional treadmill that allows you to enjoy simple and effective workouts thanks to the new user interface with QR code guidance and new hand sensors.</p><p>The long life deck, sturdy frame and powerful motor enable superior performance.</p>',
    price: '£6,190',
    downloadLink: 'https://www.technogym.com/marketing-support/download/B6D3B7E0-D505-4A86-8C75-7C5FA2932C5E',
    redirectLink: 'https://www.technogym.com/gb/jog-excite-forma.html',
  },
  'Run Personal': {
    name: 'runPersonal',
    image: '//cdn.optimizely.com/img/8355110909/ee5c85b1888243428d93f12f520206d8.jpg',
    text: '<p>A timeless classic for the home gym, designed by Antonio Citterio and combining cutting-edge, connected technology; music, video and news are just a touch away.</p><p>An exclusive running experience every time.</p>',
    price: '£POA<span class="TG084-requestPrice">*If you are interested in Run Personal, once you request a quote the price will be tailored to you depending on your requirements.</span>',
    downloadLink: 'https://www.technogym.com/marketing-support/download/0F03A457-5BEF-424F-B1D4-F6F2EA38AE1A',
    redirectLink: 'https://www.technogym.com/gb/run-personal.htm',
  },
  'SKILLMILL™ GO': {
    name: 'skillMill',
    image: '//cdn.optimizely.com/img/8355110909/9d4c7fc4ada547aaa940fe183d79b76d.jpg',
    text: '<p>Born from Technogym\'s experience spanning two decades SKILLMILL™ GO is the first product allowing everyday athletes to improve their Power, Speed, Stamina and Agility.</p><p>A unique solution for peak performers.</p>',
    price: '£POA<span class="TG084-requestPrice">*If you are interested in Skillmill Go, once you request a quote the price will be tailored to you depending on your requirements.</span>',
    downloadLink: 'https://www.technogym.com/marketing-support/download/C1C9F657-3E35-491F-A3BF-07A040D5513E',
    redirectLink: 'https://www.technogym.com/gb/skillmill-go-1.html',
  },
  Skillrun: {
    name: 'skillRun',
    image: '//cdn.optimizely.com/img/8355110909/89be1e6592b84e2caaa72c89c00b9316.png',
    text: '<p>Designed in collaboration with athletes, trainers and academic research institutes, the Skillrun develops work capacity and enhances abilities in total safety.</p><p>Shatters all expectations of what a treadmill can be.</p>',
    price: '£POA<span class="TG084-requestPrice">*If you are interested in SkillRun, once you request a quote the price will be tailored to you depending on your requirements.</span>',
    downloadLink: 'https://www.technogym.com/marketing-support/download/604DFB40-5ABC-4B5B-B0AF-B07EA91DB6B5',
    redirectLink: 'https://www.technogym.com/gb/skillrun-performance-running.html',
  },
};

const { ID } = settings;

export default class AddProducts {
  constructor() {
    this.render();
  }

  render() {
    Object.keys(products).forEach((i) => {
      const data = products[i];

      const productBlock = document.createElement('div');
      productBlock.classList.add(`${ID}-productBlock`);
      productBlock.id = `${ID}-${data.name}`;
      productBlock.innerHTML =
      `<div class="${ID}-productTitle_mobile">
        <h2>${[i][0]}</h2>
      </div>
      <div class="${ID}-productImage" style="background-image:url(${data.image})"></div>
      <div class="${ID}-productDetails">
        <div class="${ID}-product_inner">
            <div class="${ID}-productTitle_desktop">
              <h2>${[i][0]}</h2>
            </div>
            <div class="${ID}-productDesc"><p>${data.text}</p></div>
            <div class="${ID}-productPrice">${data.price}</div>
        </div>
        <div class="${ID}-CTAblock">
          <h3>Learn more about ${[i][0]}</h3>
          <div class="${ID}-ctaBackground"></div>
          <div class="${ID}-buttons">
            <div class="${ID}-download ${ID}-button" data-product="${data.redirectLink}" data-downloadlink="${data.downloadLink}">Download our brochure</div>
            <span class="${ID}-or">OR</span>
            <div class="${ID}-email ${ID}-button">Contact me</div>
          </div>
        </div>
      </div>`;

      document.querySelector(`.${ID}-allTreadmills`).appendChild(productBlock);
    });
  }
}
