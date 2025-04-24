import { pollerLite } from "../../../../lib/utils";
import activate from "./lib/experiment";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
const url = window.location.href;
if (!ieChecks && (url.includes(`boots.com/parenting-club`) || url.includes(`boots.com/baby-child/parenting-club`))) {
  pollerLite(["body", `.oct#main`, '#cu_parentingClub_banner_2020'], activate);
}
