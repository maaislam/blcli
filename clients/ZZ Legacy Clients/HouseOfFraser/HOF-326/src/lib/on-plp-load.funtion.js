import shared from '../../../../../core-files/shared';
import {
  setStorage,
  getStorage,
  onLocalStorageChange,
} from './local-storage.function';
import { onButtonLoad } from './on-button-load.function';
import { onModalStep0 } from './on-modal-step-0.function';
import { onModalStep1 } from './on-modal-step-1.function';
import { onModalStep2 } from './on-modal-step-2.function';
import { onModalStep3 } from './on-modal-step-3.function';
import { onModalStep4 } from './on-modal-step-4.function';
import { onModalStep5 } from './on-modal-step-5.function';

const { ID, VARIATION } = shared;

/**
 * @returns {void}
 */
export const onPlpLoad = () => {
  setStorage({ ...getStorage(), isFinderOpen: false });

  /**
   * Reversed to don't mess with the z-index
   */
  onModalStep5();
  onModalStep4();
  onModalStep3();
  onModalStep2();
  onModalStep1();
  onModalStep0();

  /**
   * Inject the button and add listeners
   */
  setInterval(() => {
    if (!document.querySelector(`.${ID}-fragrance-view-wrapper`) && VARIATION == 1)
      onButtonLoad();
  }, 500);

  if(VARIATION == 2) {
    onButtonLoad();
    setStorage({ ...getStorage(), isFinderOpen: true, activeStep: 0 });

  }

  /**
   * Add listener on the storage
   */
  window.addEventListener('storageChanged', onLocalStorageChange);
};
