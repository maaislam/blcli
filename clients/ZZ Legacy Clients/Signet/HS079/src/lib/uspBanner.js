import shared from "./shared";

const { ID } = shared;

export default class StoreBanner {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();

      if(window.innerWidth < 767){ 
        this.slickBanner();
      }
    }
  
    create() {
  
      const element = document.createElement('div');
      element.classList.add(`${ID}-uspBanner`);
      element.innerHTML = `
      <div class="${ID}-uspTop">
        <div class="${ID}-mobileIcons">
            <span class="${ID}-icon ${ID}-first"></span>
            <span class="${ID}-icon ${ID}-second"></span>
            <span class="${ID}-icon ${ID}-third"></span>
        </div>
        <h2>Our promise to you...</h2> 
      </div>
        <div class="${ID}-usps">
            <div class="${ID}-usp ${ID}-first">
                <ul>
                    <li>Cleaning station, regular surface cleansing</li>
                    <li>Hand sanitiser</li>
                    <li>Products cleaned after any handling</li>
                    <li>All colleagues have personal protective equipment</li>
                </ul>
            </div>
            <div class="${ID}-usp ${ID}-second">
                <ul>
                    <li>Our chip & pin machines are sanitised after every use</li>
                    <li>Collect in store or free delivery available</li>
                    <li>E-receipts as standard or paper receipt on request</li>
                </ul>
            </div>
            <div class="${ID}-usp ${ID}-third">
                <ul>
                    <li>Limited numbers in store at any given time</li>
                    <li>Colleagues 2m apart from customers</li>
                    <li>Dedicated team will ensure all guidance is followed to ensure customer safety</li>
                </ul>
            </div>
         </div>`;

      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector('main .container').insertAdjacentElement('afterbegin', component);
    }

    slickBanner () {
        window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
            window.jQuery(`.${ID}-usps`).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                draggable: true,
                dots: true,
                arrows: false,
            });

            const icon1 = document.querySelector(`.${ID}-icon.${ID}-first`);
            const icon2 = document.querySelector(`.${ID}-icon.${ID}-second`);
            const icon3 = document.querySelector(`.${ID}-icon.${ID}-third`);

            if(icon1 && icon2 && icon3) {
                window.jQuery(`.${ID}-usps`).on('afterChange', function(event, slick, currentSlide, nextSlide){
                    if(currentSlide === 0) {
                        icon1.style = `background-image:url(https://service.maxymiser.net/cm/images-us/1/1/2/EDE99D0FF50A66F4EE11A5E1A1DA44A7F0EE3C4D2F6C7471754102E464528FFF/hsamuel-co-uk/HS079---Store-Update/Icon-HS-sanitiser.png)`;
                        icon2.style = `background-image:url(https://service.maxymiser.net/cm/images-us/1/1/2/F09F5F4F7BFB23AAB5250D647C8CFBF9505B4B729C0DFD9AB98E26ACF2DF9EB2/ernestjones-co-uk/EJ079---Store-Update/Icon-EJ-cardCopy.png)`;
                        icon3.style = `background-image:url(https://service.maxymiser.net/cm/images-us/1/1/2/4C98727785F2BDC74CCF3C66E55631C28A2E85D5B23736B4098D9C636506EC8B/ernestjones-co-uk/EJ079---Store-Update/Icon-EJ-2mapartCopy.png)`;

                    }
                    if(currentSlide === 1) {
                        icon1.style = `background-image:url(https://service.maxymiser.net/cm/images-us/1/1/2/9B9119AF2DB897F544224F48D79D4A06DA83A07A7503984B80F3EE27561F4D6C/ernestjones-co-uk/EJ079---Store-Update/Icon-EJ-sanitiserCopy.png)`;
                        icon2.style = `background-image:url(https://service.maxymiser.net/cm/images-us/1/1/2/C4CFACAE823F9D9F8F5D277AE7A787764029682F295AD5A9B9B3226C43D92A9E/hsamuel-co-uk/HS079---Store-Update/Icon-HS-card.png)`;
                        icon3.style = `background-image:url(https://service.maxymiser.net/cm/images-us/1/1/2/4C98727785F2BDC74CCF3C66E55631C28A2E85D5B23736B4098D9C636506EC8B/ernestjones-co-uk/EJ079---Store-Update/Icon-EJ-2mapartCopy.png)`;

                    }
                    if(currentSlide === 2) {
                        icon1.style = `background-image:url(https://service.maxymiser.net/cm/images-us/1/1/2/9B9119AF2DB897F544224F48D79D4A06DA83A07A7503984B80F3EE27561F4D6C/ernestjones-co-uk/EJ079---Store-Update/Icon-EJ-sanitiserCopy.png)`;
                        icon2.style = `background-image:url(https://service.maxymiser.net/cm/images-us/1/1/2/F09F5F4F7BFB23AAB5250D647C8CFBF9505B4B729C0DFD9AB98E26ACF2DF9EB2/ernestjones-co-uk/EJ079---Store-Update/Icon-EJ-cardCopy.png)`;
                        icon3.style = `background-image:url(https://service.maxymiser.net/cm/images-us/1/1/2/0FC142A073129A62568413540B245DB23C6BB52C2A090D5EC87751447B001527/hsamuel-co-uk/HS079---Store-Update/Icon-HS-2mapart.png)`;
                    }
                });
            }
        });
    }
  }
  
