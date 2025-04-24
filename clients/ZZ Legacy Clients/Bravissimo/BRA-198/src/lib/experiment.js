/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from '../../../../../core-files/services';
import { observePageChange } from '../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { getLocalStorage, init } from './helpers';

const { ID } = shared;

export default () => {
  setup();

  const storage = getLocalStorage();

  window.localStorage.setItem(
    ID,
    JSON.stringify({
      ...storage,
      conditionsMet: null,
    })
  );

  init();

  observePageChange(document.body, () => {
    init();
  });
};
