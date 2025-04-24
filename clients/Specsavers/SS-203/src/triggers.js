/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  let runExp = false;
  let url = window.location.pathname;
  if (url == '/appointment-triage-questionnaire') {
    pollerLite([
      'body',
      '.form-item.webform-component.webform-component-radios.webform-component--have-you-noticed-any-problems-with-your-hearing.form-group.form-item.form-item-submitted-have-you-noticed-any-problems-with-your-hearing.form-type-radios.form-group',
      '#edit-submitted-have-you-noticed-any-problems-with-your-hearing',
      'input#edit-submitted-have-you-noticed-any-problems-with-your-hearing-1',
      'input#edit-submitted-have-you-noticed-any-problems-with-your-hearing-2',
      '.form-item.webform-component.webform-component-radios.webform-component--would-you-like-to-discuss-your-hearing-with-us.form-group.form-item.form-item-submitted-would-you-like-to-discuss-your-hearing-with-us.form-type-radios.form-group',
    ], activate);
  } else if (url == '/appointment-triage-questionnaire/thank-you') {
    pollerLite([
      'body',
      '#messages-help-wrapper',
      '#messages-help-wrapper .alert.alert-block.alert-success',
      '#columns',
      () => {
        let runExp = false;
        if (sessionStorage.getItem(`SS-203-problemsWithHearing`) !== null) {
          runExp = true;
        }

        return runExp;
      },
    ], activate);
  }
  
}
