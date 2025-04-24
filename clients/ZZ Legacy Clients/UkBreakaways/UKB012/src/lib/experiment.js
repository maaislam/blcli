import { setup, initTabs} from './services';

const activate = () => {
  setup();

  // Experiment code
  if(window.location.href.indexOf('search-results') > -1){
    if(window.innerWidth > 768){
      initTabs('desktop');
    } else {
      initTabs('mobile');
      //IE11 .two-columns padding-left:0
    }
  }
};

export default activate;
