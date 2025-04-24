import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function buildPlus() {
  return `
    <span id="FL039-brand-menu" class="icon">-</span>
  `;
}

function buildMenu() {
  return `
    <div class="FL039-brand-menu active">
      <ul style="display: block">
        <li><a href="#" class="active FL039-popular-link">Most Popular <span id="FL039-brand-menu" class="icon">-</span></a>
          <div class="FL039-popular active">
            <ul>
              <li><a href="https://www.flannels.com/gucci">Gucci</a></li>
              <li><a href="https://www.flannels.com/moncler">Moncler</a></li>
              <li><a href="https://www.flannels.com/canada-goose">Canada Goose</a></li>
              <li><a href="https://www.flannels.com/valentino">Valentino</a></li>
              <li><a href="https://www.flannels.com/kenzo">Kenzo</a></li>
              <li><a href="https://www.flannels.com/designers">See more brands</a></li>
            </ul>
          </div>
        </li>
        <li><a href="https://www.flannels.com/designers/mensdesigners">Men's Designer</a></li>
        <li><a href="https://www.flannels.com/designers/womensdesigners">Women's Designer</a></li>
        <li><a href="https://www.flannels.com/designers/kidsdesigners">Kid's Designer</a></li>
        <li><a href="https://www.flannels.com/designers">View All</a></li>
      </ul>
    </div>
  `;
}

function addMenu(html, ref) {
  if (html && ref) {
    ref.insertAdjacentHTML('afterend', html);
  }
}

function toggleMenu(clickEl, menu) {
  if (clickEl && menu) {
    clickEl.addEventListener('click', (e) => {
      e.preventDefault();

      menu.classList.toggle('active');
      const childMenu = menu.querySelector('.active');
      if (childMenu) {
        childMenu.classList.remove('active');
      }

      // Icon toggle
      const icon = clickEl.querySelector('span.icon');
      const siblingMenu = clickEl.nextElementSibling;
      if (siblingMenu.classList.contains('active')) {
        icon.textContent = '-';
      } else {
        icon.textContent = '+';
      }
    });
  }
}

export {
  setup,
  buildMenu,
  addMenu,
  buildPlus,
  toggleMenu,
}; // eslint-disable-line
