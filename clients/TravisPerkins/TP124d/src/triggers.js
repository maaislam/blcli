import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#breadcrumb li.active > span', // Breadcrumb with search term
  '.content > h2', // Pageheader "Sorry we couldn't find any results"
  '.item_container > .content > p', // Page subtitle "Try searching again"
  '.item_container .siteSearch', // Search form
  '.search_NoResult > .yCmsContentSlot', // search area container - insert categories markup
  '.yCmsContentSlot .siteSearch.search > form', // Search again form
], run);
