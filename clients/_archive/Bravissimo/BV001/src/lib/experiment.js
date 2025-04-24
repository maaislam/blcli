import { setup, removeFilter } from './services';
import settings from './settings';
import Filter from '../components/Filter/Filter';
import { addPoller, addEventListener, addObserver } from './winstack';

const {
  ID,
} = settings;

const activate = () => {
  setup();
  const backSize = [];
  const cupSize = [];
  localStorage.setItem('backSize', JSON.stringify(backSize));
  localStorage.setItem('cupSize', JSON.stringify(cupSize));
  new Filter();
  removeFilter();
  
  addObserver([document.querySelector('.c-results-list')], () => {
    addPoller([
      '.c-results-list__items',
    ], () => {
      new Filter();
      removeFilter();
    });
  }, {
    childList: true,
    attributes: true  
  });

  // Add observer to size buttons 
  addObserver([document.querySelector('.c-results-facets')], () => {
    addPoller([
      '.c-facet-token',
    ], () => {
    });
  });
};

export default activate;