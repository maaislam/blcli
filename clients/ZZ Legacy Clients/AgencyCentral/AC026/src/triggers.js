import run from './experiment';
import { poller } from '../../../../lib/uc-lib';
import flicker from './flickerprevention';


flicker();
poller([
  '.inside.panels-flexible-row-inside.panels-flexible-row-new-1-inside.clearfix',
  '#search-bar-body > .col-md-12',
  '#input-location',
  '#search-bar-form',
  '#input-user-type-selector-dropdown',
  '.search-bar-button-inline',
  '#input-user-type-selector-dropdown > .dropdown-option > span',
  '.autosuggest.single-instance-popup',
], run);
