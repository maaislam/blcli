import settings from '../../../lib/settings';

let country;
if(window.location.href.indexOf('en-us') > -1) {
  country = 'us';
} else {
  country = 'gb';
}

const products = {
  MyRun: {
    name: 'myrun',
    image: '//cdn.optimizely.com/img/8355110909/3b3553fe17484cff9df5473fa470b5ec.png',
    text: '<p>Its compact size is suitable for any home. Minimalist design and innovative technology, giving you the best training experience.</p><p>Live feedback, adaptive surface and endless fun included.</p>',
    price: '£3,250',
    usPrice: '$4,470',
    downloadLink: 'https://www.technogym.com/marketing-support/download/F0246A23-7510-4A14-9859-8973FD0E483B',
    redirectLink: 'https://www.technogym.com/gb/treadmill-myrun.html',
    usLink: 'https://www.technogym.com/us/myrun-running-treadmill.html',
    bestFor: 'General Fitness',
    financeMessage: 'Available with flexible payment plans for just £122 a month, over 24 months, 0% interest.',
    usFinanceMessage: 'Available with flexible payment plans for just $372.50 a month, over 24 months, 0% interest.',
  },
  'Jog Forma': {
    name: 'jogForma',
    image: '//cdn.optimizely.com/img/8355110909/acbb7e7da1c5491e8eb12739e3b1bba3.jpg',
    text: '<p>Jog Forma is a professional treadmill that allows you to enjoy simple and effective workouts thanks to the new user interface with QR code guidance and new hand sensors.</p><p>The long life deck, sturdy frame and powerful motor enable superior performance.</p>',
    price: '£6,190',
    usPrice: '$6,350',
    downloadLink: 'https://www.technogym.com/marketing-support/download/B6D3B7E0-D505-4A86-8C75-7C5FA2932C5E',
    redirectLink: 'https://www.technogym.com/gb/jog-excite-forma.html',
    usLink: 'https://www.technogym.com/us/jog-excite-forma.html',
    bestFor: 'General Fitness',
    financeMessage: 'Available with flexible payment plans.',
    usFinanceMessage: 'Available with flexible payment plans.',
  },
  'Run Personal': {
    name: 'runPersonal',
    image: '//cdn.optimizely.com/img/8355110909/b954731f2a764772ba34f757e65cffeb.jpg',
    text: '<p>A timeless classic for the home gym, designed by Antonio Citterio and combining cutting-edge, connected technology; music, video and news are just a touch away.</p><p>An exclusive running experience every time.</p>',
    price: '£POA<span class="TG100-requestPrice">*If you are interested in Run Personal, once you request a quote the price will be tailored to you depending on your requirements.</span>',
    usPrice: '$POA<span class="TG100-requestPrice">*If you are interested in Run Personal, once you request a quote the price will be tailored to you depending on your requirements.</span>',
    downloadLink: 'https://www.technogym.com/marketing-support/download/0F03A457-5BEF-424F-B1D4-F6F2EA38AE1A',
    redirectLink: 'https://www.technogym.com/us/run-personal-technogym.html',
    usLink: 'https://www.technogym.com/us/myrun-running-treadmill.html',
    bestFor: 'General Fitness',
  },
  'SKILLMILL™ GO': {
    name: 'skillMill',
    image: '//cdn.optimizely.com/img/8355110909/fda24629a58146a7b9d505790f5f184c.jpg',
    text: '<p>Born from Technogym\'s experience spanning two decades SKILLMILL™ GO is the first product allowing everyday athletes to improve their Power, Speed, Stamina and Agility.</p><p>A unique solution for peak performers.</p>',
    price: '£POA<span class="TG100-requestPrice">*If you are interested in Skillmill Go, once you request a quote the price will be tailored to you depending on your requirements.</span>',
    usPrice: '$POA<span class="TG100-requestPrice">*If you are interested in Run Personal, once you request a quote the price will be tailored to you depending on your requirements.</span>',
    downloadLink: 'https://www.technogym.com/marketing-support/download/C1C9F657-3E35-491F-A3BF-07A040D5513E',
    redirectLink: 'https://www.technogym.com/gb/skillmill-go-1.html',
    usLink: 'https://www.technogym.com/us/skillmill-go-1.html',
    bestFor: 'Performance Training',
  },
  Skillrun: {
    name: 'skillRun',
    image: '//cdn.optimizely.com/img/8355110909/092d61543c2f4e37bf11d950aae25d8d.jpg',
    text: '<p>Designed in collaboration with athletes, trainers and academic research institutes, the Skillrun develops work capacity and enhances abilities in total safety.</p><p>Shatters all expectations of what a treadmill can be.</p>',
    usPrice: '$POA<span class="TG100-requestPrice">*If you are interested in Run Personal, once you request a quote the price will be tailored to you depending on your requirements.</span>',
    price: `£POA<span class="TG100-requestPrice">*If you are interested in SkillRun, once you request a quote the price will be tailored to you depending on your requirements.</span>`,
    downloadLink: 'https://www.technogym.com/marketing-support/download/604DFB40-5ABC-4B5B-B0AF-B07EA91DB6B5',
    redirectLink: 'https://www.technogym.com/gb/skillrun-performance-running.html',
    usLink: 'https://www.technogym.com/us/skillrun-performance-running.html',
    bestFor: 'Performance Training',
  },
};

const { ID } = settings;

export default class AddProducts {
  constructor() {
    this.render();
    this.slider();
  }

  render() {
    Object.keys(products).forEach((i) => {
      const data = products[i];

      const productBlock = document.createElement('div');
      productBlock.classList.add(`${ID}-productBlock`);
      productBlock.id = `${ID}-${data.name}`;
      productBlock.innerHTML =
      `
        <div class="${ID}-productTitle">
            <h2>${[i][0]}</h2>
        </div>
        <div class="${ID}-productImage">
            <div class="${ID}-bestFor"><span>Best for ${data.bestFor}</span></div>
            <div class="${ID}-image" style="background-image:url(${data.image})"></div>
        </div>
        <div class="${ID}-productDetails">
            <div class="${ID}-product_inner">
                <div class="${ID}-productDesc"><p>${data.text}</p></div>
                <div class="${ID}-productPrice">${country === 'gb' ? `${data.price}` : `${data.usPrice}`}</div>
                ${data.financeMessage ? `<div class="${ID}-financeMessage">${country === 'gb' ? `${data.financeMessage}` : `${data.usFinanceMessage}`}</div>` : ''}
            </div>
        </div>
        

        <div class="${ID}-CTAblock">
          <h3>Learn more about ${[i][0]}</h3>
          <div class="${ID}-buttons">
            <div class="${ID}-download ${ID}-button" data-product="${country === 'gb' ? `${data.redirectLink}` : `${data.usLink}`}" data-downloadlink="${data.downloadLink}">Download the brochure</div>
            <ul class="${ID}-usps">
                <li>Immediately available for download</li>
                <li>Read in detail about the features and functionality</li>
            </ul>
          </div>
        </div>
       
      `;

      document.querySelector(`.${ID}-productSlider_wrapper`).appendChild(productBlock);
    });
  }

  slider() {
    // put in slider on mobile
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', (data, textStatus, jqxhr) => {
      jQuery(`.${ID}-productSlider_wrapper`).slick({
        centerMode: true,
        centerPadding: '20px',
        slidesToShow: 1,
        mobileFirst: true,
        arrows: true,
        responsive: [
          {
            breakpoint: 767,
            settings: 'unslick',
          },
        ],
      });
    });
  }
}
