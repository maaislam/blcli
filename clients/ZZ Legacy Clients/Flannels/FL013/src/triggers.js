import { RunDeliveryChoices, RunCheckoutLaunch, RunDeliveryOptions, RunHomeDelivery, RunDeliveryType, RunVoucher } from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.newCustomer .field.SignLogIn2 input',
], RunCheckoutLaunch);

poller([
  '.pcaautocomplete',
  '.form-control.txtFirstName',
  '.form-control.txtLastName',
  '.form-control.ddlCountry',
  '.form-control.txtAddress1',
  '.form-control.txtAddress2',
  '.form-control.txtTownCity',
  '.form-control.txtCounty',
  '#HomeDeliveryWrapper .form-control.txtPostcode',
  '#chkUseAsBillingAddress',
  '#HomeDeliveryWrapper .TelephoneLine .form-control',
], RunDeliveryChoices);

poller([
  '#txtPostcodeOrTown',
  '.deliveryGroupTypeLi.deliveryGroup_DeliveryCollection',
], RunDeliveryOptions);

poller([
  '#DeliveryOptionsList',
  '.DeliveryOptionsItem.DeliveryOptionsItem_STD',
  '.DeliveryOptionsItem.DeliveryOptionsItem_NDD',
], RunDeliveryType);

poller([
  '#CardNumberInput',
  '#SecurityCodeInput',
], RunVoucher);

poller([
  '#DeliveryAddressForm2Wrapper',
  '.form-control.txtFirstName',
  '.form-control.txtLastName',
  '.form-control.ddlCountry',
  '.form-control.txtAddress1',
  '.form-control.txtAddress2',
  '.form-control.txtTownCity',
  '.form-control.txtCounty',
], RunHomeDelivery);

