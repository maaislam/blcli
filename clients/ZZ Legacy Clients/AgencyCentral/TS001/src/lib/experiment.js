import {
  setup
} from './services';
import Wizard from '../components/lib/Wizard/Wizard';

const activate = () => {
  setup();
  // Experiment code
  new Wizard({
    target: 'body',
    injectPosition: 'afterbegin',
    data: {
      "wizardtitle": "Title",
      "steps": true,
      "dots": true,
      "wizardsteps": [
          {
              "headertitle": "Title",
              "bodycontent": "leleleelel"
          },
          {
            "headertitle": "Title1",
            "bodycontent": "lalala"
          },
          {
            "headertitle": "Title2",
            "bodycontent": "lilili"
          },
          {
            "headertitle": "Title3",
            "bodycontent": "lololo"
          },
      ]
  },
  });
};

export default activate;
