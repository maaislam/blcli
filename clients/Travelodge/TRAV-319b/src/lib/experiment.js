import { pollerLite } from "../../../../../lib/utils";

export default () => {
  
  pollerLite(['.pgBookingSummaryDetails'], () => {
    console.log("FOUND");
    document.querySelector('.pgBookingSummaryDetails').submit();
  })
  
};
