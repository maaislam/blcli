import shared from '../shared';

const { ID } = shared;

// Category link, no submenu.
const markupCategory = (name, link) => `
  <div class="${ID}-category">
    <a href="${link}">${name}</a>
  </div>
`;

// Subcategory link.
const markupSubcategory = (name, link) => `
  <div class="${ID}-subcategory">
    <a href="${link}">${name}</a>
  </div>
`;

// Category toggle-able heading.
const markupCategoryHeading = (name, noIcon = false) => `
  <div class="${ID}-category-heading">
    <span class="${ID}-category-name">${name}</span>
    ${noIcon ? '' : `<span class="${ID}-category-toggle-icon"></span>`}
  </div>
`;

const markupAccordionWrapper = markup => `
  <div class="${ID}-accordion-wrapper">
    <h5 class="${ID}-heading">Category</h5>
    ${markup}
  </div>
`;

const markupExpandedListWrapper = markup => `
  <div class="${ID}-expanded-list-wrapper">
    ${markup}
  </div>
`;

const markupCategoryWrapper = markup => `
  <div class="${ID}-category-wrapper">
    ${markup}
  </div>
`;

const markupSubcategoryWrapper = markup => `
  <div class="${ID}-subcategory-wrapper">
    ${markup}
  </div>
`;

const markupShowMoreButton = () => `
  <div class="${ID}-expanded-list-toggle">
    <span class="${ID}-expanded-list-toggle-label">Show more</span>
    <span class="${ID}-expanded-list-toggle-icon"></span>
  </div>
`;

export {
  markupCategory,
  markupSubcategory,
  markupCategoryHeading,
  markupCategoryWrapper,
  markupAccordionWrapper,
  markupSubcategoryWrapper,
  markupExpandedListWrapper,
  markupShowMoreButton,
};
