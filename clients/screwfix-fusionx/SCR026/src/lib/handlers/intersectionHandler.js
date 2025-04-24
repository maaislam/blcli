import { fireEvent } from '../../../../../../core-files/services';

const intersectionHandler = (entry, observer) => {
  const { isIntersecting } = entry;
  if (isIntersecting) {
    fireEvent('Conditions Met');
    observer.disconnect();
  }
};

export default intersectionHandler;
