import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  // Try to execute function
  () => {
    let functionFound = true;
    try {
      window.merchoidStartAutocompleteCheckout();
    } catch (e) {
      functionFound = false;
    }
    return functionFound;
  },
], () => true);

