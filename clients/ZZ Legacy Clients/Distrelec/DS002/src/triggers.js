import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '.searchsimilar__holder .mat-button.btn-search', '.feature-checkbox', 'table.validate-checkbox-group',
], Experiment.init);
