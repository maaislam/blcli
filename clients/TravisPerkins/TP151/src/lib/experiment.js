/**
 * TP151 - Persona Segmentation
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import AccountTypeForm from './components/AccountTypeForm/AccountTypeForm';

export default () => {
  setup();
  const accountTypeForm = new AccountTypeForm();
};
