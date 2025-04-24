import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';
/* eslint-disable */
const iconView = document.querySelector('.btn.btn-secondary.btn-switch.btn-switch-icon');
pollerLite([
  '.btn-switch-technical.active',
  '.divScrollTable .tr_content',
  '.btn-apply-filter',
  '.wrapperScrollTable',
  '.btn-switch-standard',
  '.row__col-2 .mod.mod-facets',
  '.wrapperScrollTop',
], Experiment.init);
