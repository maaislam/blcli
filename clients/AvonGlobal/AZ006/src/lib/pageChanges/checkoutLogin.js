import shared from '../shared';
import { angularCompile } from '../../../../../../lib/utils/avon';
import { translate } from '../services';

export default () => {
  const { ID, $ } = shared;

  /** Split the guest and registered forms into tabs */
  const splitIntoTabs = () => {
    const $loginSection = $('.container-login');
    const loginScope = $loginSection.scope();

    // Create heading, tabs and form headings
    const $newElements = $(`
      <div class="${ID}_sectionHeading">${translate('Checkout')}</div>
      <div class="${ID}_loginTabs">
        <div class="${ID}_loginTab" ng-class="{${ID}_loginTabActive: showGuest}" ng-click="showGuest = true">${translate('New to Avon?')}</div><div class="${ID}_loginTab" ng-class="{${ID}_loginTabActive: !showGuest}" ng-click="showGuest = false">${translate('Already registered?')}</div>
      </div>
      <div class="${ID}_formHeading" ng-if="showGuest"><span>${translate('Checkout as guest')}</span></div>
      <div class="${ID}_formHeading" ng-if="!showGuest"><span>${translate('Log in')}</span></div>
    `);

    $loginSection.prepend($newElements);
    angularCompile($newElements, $, loginScope);
  };

  splitIntoTabs();
};
