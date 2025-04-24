import { setup } from './services';

/**
 * {{ME181}} - {{Gender Select V2}}
 */

const Run = () => {
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const allOptionElements = bodyVar.querySelectorAll('#pa_size > [data-male-sizing]');
      const maleSizes = [];
      const femaleSizes = [];
      // Reassigned in event handlers, used to limit rendering
      // eslint-disable-next-line
      let maleSelected = true;
      // Reassigned when markup has rendered
      let optionsContainer;

      return {
        docVar,
        bodyVar,
        allOptionElements,
        maleSizes,
        femaleSizes,
        maleSelected,
        optionsContainer,
      };
    })(),
    init: () => {
      setup();
      // Retrieve Data
      Exp.services.parseOptions();
      // Render Initial
      Exp.services.setOptions(Exp.cache.maleSizes);
      Exp.render.optionBox();
      // Move USPs after add to basket
      Exp.cache.bodyVar.querySelector('.single_variation_wrap').insertAdjacentElement('afterend', Exp.cache.bodyVar.querySelector('.product-usps'));
    },
    services: {
      parseOptions: () => {
        // Iterate over nodeList, get options
        for (let i = 0, n = Exp.cache.allOptionElements.length; i < n; i += 1) {
          const sizeOption = Exp.cache.allOptionElements[i].value.toUpperCase();
          Exp.cache.maleSizes.push(`${sizeOption}: ${Exp.cache.allOptionElements[i].getAttribute('data-male-sizing')}`);
          Exp.cache.femaleSizes.push(`${sizeOption}: ${Exp.cache.allOptionElements[i].getAttribute('data-female-sizing')}`);
        }
      },
      setOptions: (sizeOptions) => {
        for (let i = 0, n = sizeOptions.length; i < n; i += 1) {
          Exp.cache.allOptionElements[i].textContent = sizeOptions[i];
        }
      },
      toggeOptionsClass: () => {
        Exp.cache.optionsContainer.classList.toggle('ME181_Male');
        Exp.cache.optionsContainer.classList.toggle('ME181_Female');
      },
    },
    render: {
      optionBox: () => {
        Exp.cache.bodyVar.querySelector('.radical-variations-wrapper').insertAdjacentHTML('beforebegin', `
        <div class="ME181_Container">
          <h2 class="ME181_Header">Please select a gender:</h2>
          <div class="ME181_Button_Container ME181_Male">
            <div class="ME181_Button_Area">
              <img class="ME181_Button ME181_Option_Male" src="//cdn.optimizely.com/img/6087172626/212253977e914b77ad6578c19cb04951.png" alt="Click For Male Sizes" />
              <span class="ME181_Text">Male</span>
              <span class="ME181_Check_Mark ME181_CM_M"></span>              
            </div>
            <div class="ME181_Button_Area">
              <img class="ME181_Button ME181_Option_Female" src="//cdn.optimizely.com/img/6087172626/a611bd5531f94cb0a803b7f24deca4cc.png" alt="Click For Female Sizes" />
              <span class="ME181_Text">Female</span>
              <span class="ME181_Check_Mark ME181_CM_F"></span> 
            </div>
          </div>
        </div>
        `);
        Exp.cache.optionsContainer = Exp.cache.bodyVar.querySelector('.ME181_Button_Container');
        // Add event handlers
        const allButtons = Exp.cache.bodyVar.querySelectorAll('.ME181_Button_Area');
        allButtons[0].addEventListener('click', () => {
          if (!Exp.cache.maleSelected) {
            // Toggle Styling
            Exp.services.toggeOptionsClass();
            Exp.services.setOptions(Exp.cache.maleSizes);
            Exp.cache.maleSelected = true;
          }
        });
        allButtons[1].addEventListener('click', () => {
          if (Exp.cache.maleSelected) {
            // Toggle Styling
            Exp.services.toggeOptionsClass();
            Exp.services.setOptions(Exp.cache.femaleSizes);
            Exp.cache.maleSelected = false;
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
