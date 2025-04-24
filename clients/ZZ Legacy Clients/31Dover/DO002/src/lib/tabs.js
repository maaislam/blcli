export const createTabs = (ref, pos) => {
  let giftBox;

  const html = `
    <div class="DO002-tabs">
      <div class="DO002-tabs--title active" data-title="1">
        <p>Bespoke Delivery</p>
      </div>
      <div class="DO002-tabs--title" data-title="2">
        <p>Ordering for a gift?</p>
      </div>

      <div class="DO002-tabs--content">

        <div class="DO002-tabs--list active" data-tab="1">
          <ul>
            <li><span class="tick icon__navigation-check-blue"></span> Securely track your order - even rearrange your delivery en route</li>
            <li><span class="tick icon__navigation-check-blue"></span> Option to leave in a safe place</li>
            <li><span class="tick icon__navigation-check-blue"></span> Click and collect from local stores that are convenient for you</li>
            <li><span class="tick icon__navigation-check-blue"></span> Mon - Sat 8am through to 9pm. For delivery on Saturday, order by 4pm on Friday</li>
          </ul>
        </div>
        <div class="DO002-tabs--list" data-tab="2">
          <ul>
            <li><span class="tick icon__navigation-check-blue"></span> Add a greeting message for free at checkout</li>
            <li><span class="tick icon__navigation-check-blue"></span> Luxury gift box available 
              <div class="gift-box">
                <input type="checkbox"/> <span>Add a gift box for £4.95</span>
              </div>
            </li>
            <li><span class="tick icon__navigation-check-blue"></span> Choose a specific delivery date in checkout up to 14 days in advance</li>
            <li><span class="tick icon__navigation-check-blue"></span> Mon - Sat 8am through to 9pm. For delivery on Saturday, order by 4pm on Friday</li>
          </ul>
        </div>

      </div>
    </div>
  `;
  
  ref.insertAdjacentHTML(pos ? pos : 'beforeend', html);


  // Attach events to tabs
  const container = document.querySelector('.DO002-tabs');
  const titles = document.querySelectorAll('.DO002-tabs--title');
  const content = document.querySelectorAll('.DO002-tabs--list');
  
  for (let i = 0; titles.length > i; i += 1) {
    titles[i].addEventListener('click', () => {

      // If doesn't contain active
      if (!titles[i].classList.contains('active')) {

        // Remove active from others
        const activeEls = document.querySelectorAll('.DO002-tabs .active');
        for (let i = 0; activeEls.length > i; i += 1) {
          activeEls[i].classList.remove('active');
        }

        // Get tab number
        const tabNum = titles[i].getAttribute('data-title');

        // Add active to tab
        const tabToOpen = document.querySelector(`div[data-tab="${tabNum}"`);
        const titleToActive = document.querySelector(`div[data-title="${tabNum}"`);
        if (tabToOpen) {
          tabToOpen.classList.add('active');
        }
        if (titleToActive) {
          titleToActive.classList.add('active');
        }
      }

    });
  }

  // Attach event for the gift box checkbox
  const giftCheck = document.querySelector('.gift-box input[type="checkbox"]');
  const existingGift = document.querySelector('.content-main input#tonur--gift-options-wrap-as-gift-checkbox');
  if (giftCheck) {
    giftCheck.addEventListener('change', () => {
      if (existingGift) {
        existingGift.click();
      }
    });
  }

};