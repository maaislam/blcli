import { fullStory, events } from '../../../../lib/utils';

/**
 * {{TP100}} - {{Returning user homepage}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP100',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const USPBar = bodyVar.querySelector('#page > .yCmsContentSlot.header_buttons');
      // Get username for markup
      let userName = bodyVar.querySelector('.button_text > .sessioncamhidetext').textContent.trim();
      userName = userName.replace(/Welcome /g, '');
      // Retrieve selected categories from local storage
      const TP100SelectedCategories = localStorage.getItem('TP100-Selections');
      const TP100Markup = `
      <div class="TP100-Wrapper">
      <p class="TP100-Greeting">Hi ${userName}, ready to jump back in?</p>
      
        <div class="TP100-Buying-More-Wrapper">
          <p class="TP100-Buying-More-Text">Buying more of the same?</p>
          <a class="TP100-Buying-More-Link" href="/accountDashboard/orderHistory">View Previous Orders</a>
        </div>

        <div class="TP100-Check-Account-Wrapper">
          <p class="TP100-Check-Account-Text">Need to check your account?</p>
          <a class="TP100-Check-Account-Link" href="/accountDashboard">My Account</a>
        </div>

        <div class="TP100-Category-Wrapper">
        </div>

      </div>
      `;
      let linksWrapper;
      return {
        bodyVar,
        TP100Markup,
        USPBar,
        userName,
        TP100SelectedCategories,
        linksWrapper,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // Add markup
        Exp.cache.USPBar.insertAdjacentHTML('afterend', Exp.cache.TP100Markup);
        // Check if previous selection is in local storage, add relevant markup
        if (Exp.cache.TP100SelectedCategories) {
          this.setupOptions();
          this.setupOptionTracking();
        } else {
          // Previous categories have not been stored, build markup for selections
          Exp.cache.bodyVar.querySelector('.TP100-Category-Wrapper').insertAdjacentHTML('afterbegin', `
          <div class="TP100-Category-Select-Wrapper">
            <p class="TP100-Category-Select-Button">Quick Question - Which categories do you buy from?</p>
            <span class="TP100-Arrow"></span>
            <div class="TP100-Category-Select-Options">
              <div class="TP100-Option-Wrapper">
                <input type="checkbox" id="TP100-Building-Materials" data-index="0" />
                <label for="TP100-Building-Materials">Building Materials</label>
              </div>
  
              <div class="TP100-Option-Wrapper">
                <input type="checkbox" id="TP100-Gardens-Landscaping" data-index="1" />
                <label for="TP100-Gardens-Landscaping">Gardens & Landscaping</label>
              </div>
  
              <div class="TP100-Option-Wrapper">
                <input type="checkbox" id="TP100-Timber" data-index="2" />
                <label for="TP100-Timber">Timber</label>
              </div>
  
              <div class="TP100-Option-Wrapper">
                <input type="checkbox" id="TP100-Doors-Windows-Joinery" data-index="3" />
                <label for="TP100-Doors-Windows-Joinery">Doors, Windows & Joinery</label>
              </div>
  
              <div class="TP100-Option-Wrapper">
                <input type="checkbox" id="TP100-Kitchens" data-index="4" />
                <label for="TP100-Kitchens">Kitchens</label>
              </div>
  
              <div class="TP100-Option-Wrapper">
                <input type="checkbox" id="TP100-Bathrooms" data-index="5" />
                <label for="TP100-Bathrooms">Bathrooms</label>
              </div>
  
              <div class="TP100-Option-Wrapper">
                <input type="checkbox" id="TP100-Plumbing-Heating" data-index="6" />
                <label for="TP100-Plumbing-Heating">Plumbing & Heating</label>
              </div>
  
              <div class="TP100-Option-Wrapper">
                <input type="checkbox" id="TP100-Tools-Workwear" data-index="7" />
                <label for="TP100-Tools-Workwear">Tools & Workwear</label>
              </div>
  
              <div class="TP100-Option-Wrapper">
                <input type="checkbox" id="TP100-Decorating-Interiors" data-index="8" />
                <label for="TP100-Decorating-Interiors">Decorating & Interiors</label>
              </div>
  
              <div class="TP100-Option-Wrapper">
                <input type="checkbox" id="TP100-Fixings-Adhesives" data-index="9" />
                <label for="TP100-Fixings-Adhesives">Fixings & Adhesives</label>
              </div>
  
              <div class="TP100-Option-Wrapper">
                <input type="checkbox" id="TP100-Electrical-Lighting" data-index="10" />
                <label for="TP100-Electrical-Lighting">Electrical & Lighting</label>
              </div>
  
              <p class="TP100-Save-Options">Submit</p>
            </div>
          </div>
          `);
          // Add event listener to submit button
          Exp.cache.bodyVar.querySelector('.TP100-Save-Options').addEventListener('click', () => {
            // Get all checked options
            const checkedOptions = Exp.cache.bodyVar.querySelectorAll('.TP100-Option-Wrapper > input:checked');
            // Check that options are checked, if there is at least one, save to local storage
            if (checkedOptions.length > 0) {
              // Send an event
              events.send(`${Exp.settings.ID}`, 'Click', 'Submit Selection', { sendOnce: true });
              // Get the selected options labels
              const optionsLabels = Exp.cache.bodyVar.querySelectorAll('.TP100-Option-Wrapper > input:checked + label');
              // Setup local storage for options
              let TP100Array = [];
              // Pushes values to array
              for (let i = 0; i < checkedOptions.length; i += 1) {
                // Next line lint disabled as it exceeds character limit
                // eslint-disable-next-line
                TP100Array.push({ selected_category: checkedOptions[i].dataset.index, category_name: optionsLabels[i].textContent.trim() });
              }
              // Set the array to local storage
              TP100Array = JSON.stringify(TP100Array);
              localStorage.setItem('TP100-Selections', TP100Array);

              // Loading the saved categories
              // Assign array to cache

              Exp.cache.TP100SelectedCategories = localStorage.getItem('TP100-Selections');
              // Slide up test markup, remove current markup
              // setup options section slide down container
              $('.TP100-Wrapper').slideUp(() => {
                $('.TP100-Category-Select-Wrapper').remove();
                // Setup saved options
                Exp.components.setupOptions();
                // Setup tracking
                Exp.components.setupOptionTracking();
              });
              $('.TP100-Wrapper').slideDown();
            }
          });
          // Add event handler to check for input change to style submit button
          this.selectionWatcher();
        }
        // Elements across both scenarios ready, set up tracking
        this.setupTracking();
      },
      setupOptions() {
        // Previous categories have been saved, retrieve options and build markup

        // href array used when building markup

        const hrefArray = ['/Product/Building-Materials/c/1500029', '/Product/Gardens+Landscaping/c/1500098', '/Product/Timber/c/1500000', '/Product/Doors%2C-Windows+Joinery/c/1500152', '/Product/Kitchens/c/1509005', '/Product/Bathrooms/c/1500376', '/Product/Plumbing+Heating/c/1500282', '/Product/Tools+Workwear/c/1500450', '/Product/Decorating+Interiors/c/1500538', '/Product/Fixings+Adhesives/c/1500237', '/Product/Electrical+Lighting/c/1500571'];
        // Add markup
        Exp.cache.bodyVar.querySelector('.TP100-Category-Wrapper').insertAdjacentHTML('afterbegin', `
        <div class="TP100-Selected-Categories-Wrapper">
          <p class="TP100-My-Categories-Button">My Categories</p>
          <span class="TP100-Arrow"></span>
          <div class="TP100-Category-Links-Wrapper">
          </div>
        </div>
        `);

        Exp.cache.linksWrapper = Exp.cache.bodyVar.querySelector('.TP100-Category-Links-Wrapper');

        Exp.cache.TP100SelectedCategories = JSON.parse(Exp.cache.TP100SelectedCategories);
        for (let i = 0; i < Exp.cache.TP100SelectedCategories.length; i += 1) {
          const selectedCategoryMarkUp = `
          <div class="TP100-Link-Wrap">
            <a class="TP100-Category-Link" href="${hrefArray[Exp.cache.TP100SelectedCategories[i].selected_category]}">${Exp.cache.TP100SelectedCategories[i].category_name}</a>
          </div>
          `;
          Exp.cache.linksWrapper.insertAdjacentHTML('beforeend', selectedCategoryMarkUp);
        }
      },
      setupTracking() {
        // Setup tracking
        // Recent orders
        Exp.cache.bodyVar.querySelector('.TP100-Buying-More-Link').addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Recent Orders', { sendOnce: true });
        });
        // Account Dashboard
        Exp.cache.bodyVar.querySelector('.TP100-Check-Account-Link').addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Account Dashboard', { sendOnce: true });
        });
      },
      setupOptionTracking() {
        // Setup tracking for chosen categories
        $('.TP100-Category-Link').on('click', (e) => {
          const TP099TrackCategory = e.target.textContent;
          events.send(`${Exp.settings.ID}`, 'Click', `Saved Category - ${TP099TrackCategory}`, { sendOnce: true });
        });
      },
      // Client amend - change submit button colour
      selectionWatcher() {
        // Add an event listener to check for a change to the inputs
        $('.TP100-Option-Wrapper > input').on('change', (e) => {
          const selectedInput = $(e.target).closest('.TP100-Category-Select-Options');
          // Check if any of the options are selected
          if (Exp.cache.bodyVar.querySelectorAll('.TP100-Option-Wrapper > input:checked').length > 0) {
            // Add styling class
            if (!selectedInput.hasClass('TP100-Selected')) {
              selectedInput.addClass('TP100-Selected');
            }
          } else if (Exp.cache.bodyVar.querySelectorAll('.TP100-Option-Wrapper > input:checked').length === 0) {
            // Remove styling class
            if (selectedInput.hasClass('TP100-Selected')) {
              selectedInput.removeClass('TP100-Selected');
            }
          }
        });
      },
    },
  };

  // Prevent test duplication
  if (!document.querySelector('.TP100-Wrapper')) {
    Exp.init();
  }
};

export default Run;
