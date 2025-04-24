/**
 * On search boxes used, store ref to 'last search'
 */
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(["#locations-search #s"], () => {
  var t = document.querySelector("#locations-search #s");
  t && t.addEventListener("keyup", function(t) {
      var e = t.currentTarget.value;
      e ? sessionStorage.setItem("HHLastSearch", e) : sessionStorage.setItem("HHLastSearch", "")
  })
});
