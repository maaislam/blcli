import { pollerLite } from "../../../../../lib/utils";

let paginationWrapper = document.querySelector('div[data-test-id="plp-list"]').nextElementSibling;
observer.connect(paginationWrapper, () => {

    pollerLite(['div[data-test-id="plp-list"]'], () => {

        alert("The plp listing has been regenerated");


    })

}, {
config: {
    attibutes: true,
    childList: false,
    subTree: false,
},
});



