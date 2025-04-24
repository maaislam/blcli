import run from './experiment';
import { poller } from '../../../../lib/uc-lib';
import flicker from './flickerprevention';


flicker();
// poller([
//   '.MobSortSelector>.productFilterList>.FilterListItem>span>span>label',
//   '#dnn_ctr179057_ViewTemplate_ctl00_ctl09_CollapseDiv',
//   '#mobappfltrs',
//   '#mobFilterControls',
//   '#mobclrfltrs',
//   '.mobFiltInnerWrap',
//   '#filterByMob > .MobFiltersText',
//   '.s-maincontent-container > .row',
//   '#filterByMob',
//   '#filterlist > .productFilter > .productFilterTitleBox', () => {
//     let checkjQuery = false;
//     if (window.jQuery) {
//       checkjQuery = true;
//     }
//     return checkjQuery;
//   },
// ], run);

poller([
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
