import shared from '../../shared';
import { angularCompile, angularContextWrap } from '../../../../../../../lib/utils/avon';

/**
 * New category filters
 *
 * @class CategoryFilters
 */
export default class CategoryFilters {
  constructor() {
    const { ID, $ } = shared;
    const categoryLeftNavScope = $('[ng-controller="CategoryLeftNavController"]').scope();

    this.$ = $;
    this.componentName = `${ID}_CategoryFilters`;
    this.scope = categoryLeftNavScope.$new();

    // Map category names with images
    this.scope.imageMap = {
      // UC IMAGE REFERENCES
      // 'Skincare Samples': 'https://ab-test-sandbox.userconversion.com/experiments/AV032-skincare_cat.jpg',
      // 'Make-Up Samples': 'https://ab-test-sandbox.userconversion.com/experiments/AV032-face_cat.jpg',
      // Skincare: 'https://ab-test-sandbox.userconversion.com/experiments/AV032-skincare_cat.jpg',
      // Face: 'https://ab-test-sandbox.userconversion.com/experiments/AV032-face_cat.jpg',
      // Lips: 'https://ab-test-sandbox.userconversion.com/experiments/AV032-lips_cat.jpg',
      // Fragrance: 'https://ab-test-sandbox.userconversion.com/experiments/AV032-fragrance_cat.jpg',

      // MAXYMISER IMAGE REFERENCES
      'Skincare Samples': '#$(ContentManager:anew-c.jpg)!',
      'Make-Up Samples': '#$(ContentManager:face_cat.jpg)!',
      'Fragrance Samples': '#$(ContentManager:fragrancecat.jpg)!',
      Skincare: '#$(ContentManager:skincare_cat.jpg)!',
      Face: '#$(ContentManager:face_cat.jpg)!',
      Lips: '#$(ContentManager:lips_cat.jpg)!',
      Fragrance: '#$(ContentManager:fragrance_cat.jpg)!',
    };

    // Pull down data from parent scope
    this.scope.categories = this.scope.$parent.CategoryPageModel.CategoryTree.Children;
    this.scope.SelectCategoryPage = this.scope.$parent.SelectCategoryPage;

    this.create = this.create.bind(this);
    this.bindState = this.bindState.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.render = this.render.bind(this);

    this.create();
    this.bindState();
    this.bindEvents();
    this.render();
  }

  create() {
    const { $, componentName, scope } = this;

    const $component = $(`<ul class="${componentName}"></ul>`);

    /*
     Create category filters
     This could potentially be abstracted into a new component
     */
    scope.categories.map((category) => {
      // Create a new scope for each category
      const filterScope = scope.$new();
      filterScope.category = category;
      filterScope.categoryName = category.Name;
      filterScope.image = filterScope.$parent.imageMap[category.Name] || null;
      filterScope.isActive = () => scope.$parent.SelectedCategory && (scope.$parent.SelectedCategory.Name === filterScope.categoryName);

      /**
       * Modified version of the SelectCategoryPage function that allows
       * you to go backwards
       * @param {Object} category Intial category object that SelectCategoryPage requires
       * @param {Boolean} backwards Set to true if going backwards / upwards in category tree
       */
      const modifiedSelectCategoryPage = (categoryToSelect, backwards) => {
        angularContextWrap(() => {
          try {
            filterScope.$parent.SelectCategoryPage(categoryToSelect);
          } catch (e) {}

          /*
           Page must be reloaded if going backwards as the site
           isn't set up to handle traversing up the category true.
           This is the default behaviour when using breadcrumbs
          */
          if (backwards) window.location.reload();
        });
      };

      filterScope.SelectCategoryPage = modifiedSelectCategoryPage;

      const $categoryFilterComponent = $(`
        <li class="${componentName}Filter" ng-class="{ '${componentName}Filter--active': isActive() }">
          <div ng-click="(($parent.$parent.Depth >= 2 && isActive()) ? SelectCategoryPage($parent.$parent.CategoryTree[0], true) : SelectCategoryPage(category))">
            <div class="${componentName}Image" ng-style="{'background-image': 'url({{image}})'}"></div>
            <div class="${componentName}Name">{{categoryName}}</div>
          </div>
        </li>
      `);

      angularCompile($categoryFilterComponent, $, filterScope);
      $component.append($categoryFilterComponent);
    });

    // ----------------------------------
    // Add an 'all samples' button
    // ----------------------------------
    (function() {
      const filterScope = scope.$new();
      filterScope.categoryName = 'All Samples';
      filterScope.image = 'https://service.maxymiser.net/cm/images-eu/1/1/1/5A548C8817ACFC73C0A226E32660E4B7324ACC2EC80BA1499065239D4ACFC250/avon-mas/AV032---Samples-Shop-Samples-Category-Shop/all-samples.jpg';
      filterScope.isActive = () => !scope.$parent.SelectedCategory; // When no other cat is chosen

      const $categoryFilterComponent = $(`
        <li class="${componentName}Filter" ng-class="{ '${componentName}Filter--active': isActive() }">
          <div>
            <a href="${scope.$parent.CategoryTree?.[0]?.Url}">
              <div class="${componentName}Image" ng-style="{'background-image': 'url({{image}})'}"></div>
              <div class="${componentName}Name">{{categoryName}}</div>
            </a>
          </div>
        </li>
      `);

      angularCompile($categoryFilterComponent, $, filterScope);
      $component.prepend($categoryFilterComponent);
    })();

    this.$component = $component;
  }

  render() {
    const { $component } = this;

    const $sidebar = $('#LeftNav');
    $sidebar.after($component);
    $sidebar.hide();
  }

  bindEvents() {}

  /**
   * Bind state to the component
   * this.$component must exist before you bind state
   */
  bindState() {
    const { $component, $, scope } = this;

    angularCompile($component, $, scope);
  }
}
