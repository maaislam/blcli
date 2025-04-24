import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.no-result h1', // Sorry text with search term
  '.content_holder', // Page content container
  '.content_holder .siteSearch', // Site search container
  '.content_holder form[name="search_form"]', // Second search form
], run);
