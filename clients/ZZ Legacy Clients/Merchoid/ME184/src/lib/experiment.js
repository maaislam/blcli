import { setup } from './services';
import brandHeaders from './components/brandHeaders';
import inGridContent from './components/ingridContent';
import emailBox from './components/emailBox';
import genderCategories from './components/genderCategories';
import stickyFilter from './components/stickyFilter';

const activate = () => {
  // Add ME178 styling class
  document.body.classList.add('ME178');
  setup();
  brandHeaders();
  inGridContent();
  emailBox();
  stickyFilter();
  genderCategories();
  // ME178 has loaded, activate ME184
  const allProducts = document.querySelectorAll('.product-small');
  // Insert Markup - 2nd product
  allProducts[3].insertAdjacentHTML('afterend', `
  <div class="ME184_Container">
    <span class="ME184_Text">At Merchoid, you'll find the highest quality Christmas Jumpers. They're produced in <span class="ME184_Bold">limited numbers</span> and sell out fast, so you'll need to be quick</span>
  </div>
  `);
  // Insert markup - next 4 products
  allProducts[7].insertAdjacentHTML('afterend', `
  <div class="ME184_Container">
    <span class="ME184_Text"><span class="ME184_Bold">Limited edition</span> means once they're all sold out, they won't come back into stock so don't miss your chance!</span>
  </div>
  `);
  // Insert markup - next 6 products
  allProducts[13].insertAdjacentHTML('afterend', `
  <div class="ME184_Container">
    <span class="ME184_Text">Make sure you don't miss out on your chance to own the coolest Christmas Jumper this year. Love it, or your money back</span>
  </div>
  `);
};

export default activate;
