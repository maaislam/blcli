import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if (window.universal_variable.page.mobile_site) {
  pollerLite([
    '#lens-package-form-summary .form-summary .option-select',
    '.form-heading',
    '.options-block',
    '#silver-lens-package .highlight-text',
  ], activate);
}
