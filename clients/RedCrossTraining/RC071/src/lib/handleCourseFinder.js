import elements from './elements';
import updateCourseFinder from './updateCourseFinder';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
const handleCourseFinder = () => {
    // Run update course finder on load
    updateCourseFinder();
    // On change, run the update function
    observer.connect(elements.courseFinder, () => {
        updateCourseFinder();
    }, {
        throttle: 200,
        config: {
            attributes: false,
            childList: true,
        },
    });
};

export default handleCourseFinder;