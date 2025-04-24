/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { fireEvent } from "./services";
import shared from "./shared";

export default () => {
  const { rootScope, ID } = shared;

  const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  const init = () => {
    // Track
    localStorage.setItem(`${ID}_shopify`, true);
    fireEvent("Source - Shopify");

    // Capture name
    const firstName = getParameterByName("first_name");
    const lastName = getParameterByName("last_name");

    // Toggle form
    const $formScope = $("#FindByNameOrContact").scope();
    $formScope.DisplayScreen.ToogleFindByNameOrContact("TopSearchForm");

    // Perform search
    setTimeout(() => {
      const $submitScope = $("#FindByPhoneNumberEmailNameForm").scope();
      $("#FirstName").val(firstName).change();
      $("#LastName").val(lastName).change();
      $formScope.ChangeAdvancedSearchInputField();

      $submitScope.FindByPhoneNumberEmailNameSubmit();
    }, 200);
  };

  init();
};
