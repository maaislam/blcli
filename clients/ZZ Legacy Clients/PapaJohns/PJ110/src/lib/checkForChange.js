import elements from "./elements";
import handleChange from "./handleChange";
import { pollerLite, observer } from "../../../../../lib/uc-lib";

const checkForChange = () => {
  if (elements.mainContainer) {
    observer.connect(
      elements.mainContainer,
      () => {
        handleChange();
      },
      {
        throttle: 100,
        config: {
          childList: true,
          subtree: true,
        },
      }
    );
  }
};

export default checkForChange;
