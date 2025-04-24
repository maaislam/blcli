// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

let _TP059 = (function () {

    /*--------------------------------------
    Experiment Code
    ---------------------------------------*/
    let _activate = function () {

        // Namespace CSS
        $ = window.jQuery;
        $('body').addClass('TP059');

        // Everything in this container
        let $filterSearchContainer = $('#facets_filters:first');
        // Store all category list views
        let $listView = $filterSearchContainer.find('.allFacetValues > .facet_block ');

        // Show all facet values (hide the container 'topFacetsValues' containing only a subset of the total 'allFacetValues')
        $('.topFacetValues').hide();
        $('.allFacetValues').show();
        // Also hide 'show all' toggle since all shown already
        $filterSearchContainer.find('.more').hide();

        // Loop through each category
        $listView.each(function () {

            let $thisList = $(this);

            // Array storing a reference to each filter item of curr categ and also corresponding qty
            let arrToAidSort = [];

            // Loop through each filter of THIS category
            let $listIndividualChildren = $thisList.children('li');
            // No point sorting a collection with only 1 item, so check for that
            if ($listIndividualChildren.length !== 1) {
                $listIndividualChildren.each(function () {
                    let $thisItem = $(this);

                    // Get the amount of item in this filter
                    let noItems = $thisItem.find(' > form').text().trim();
                    noItems = Number(noItems.replace(/.*\s*\(/ , '').replace(/\)/, ''));

                    arrToAidSort.push({domItem: $thisItem, amountItem: noItems});
                }); // each item in curr looped listview
            }

            // If array not empty, sort it in descending order based on amount of items corresponding to each filter
            if (arrToAidSort.length !== 0) {
                arrToAidSort.sort((a, b) => {
                    return b.amountItem - a.amountItem;
                });
            }

            // Now we have desc. sorted items, insert them into each category (clear contents of original categories)
            // First empty content of $thisList
            //$thisList.empty();
            // Now insert sorted items
            $.each(arrToAidSort, (i, value) => {
                $thisList.append(value.domItem);
            });

        }); // listView loop


        utils.sendEvent('TP059', 'Page View', 'TP059 - Arrange filters on Search', true);

    };


    /*--------------------------------------
    Activation
    ---------------------------------------*/
    let _triggers = (options) => {
        utils.fullStory('TP059', 'Variation 1 Desktop');

        UC.poller([
            '#facets_filters',
            () => {
                return window.jQuery
            },
            () => {
                return window.ga
            }
        ], _activate);
    };

    // Run experiment
    _triggers();

})(); // _TP059