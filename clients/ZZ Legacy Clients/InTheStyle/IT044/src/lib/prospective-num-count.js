// ------------------------------------------------------
// Append prospective num results to be shown
//
// This feature is been removed 2018-01-11 as the filters
// on the site don't work in such a way as to allow
// this to be accurate
// ------------------------------------------------------
const initDoRunShowNumProductsThatWillAppear = () => {
    const calcProspectiveNumProducts = () => {
        let num = 0;
        checkboxFilters.each((idx, item) => {
            let label = $(item).prev('label');
            if(!label.length) {
                label = $(item).next('label');
            }
            const span = label.find('span'),
                spanText = span.text();
            if(span && spanText) {
                const findNum = spanText.match(/\((\d+)\)/);

                if(findNum && findNum.length > 1) {
                    if($(item).is(':checked')) {
                        num += parseInt(findNum[1], 10);
                    }
                }
            }
        });

        return num;
    }

    $('.IT011_applyFiltersWrapper').append(`
        <p class="it44-num-prospective">
        </p>
    `);

    const showNumProductsText = () => {
        const numProductsToShow = calcProspectiveNumProducts();
        if(numProductsToShow > 0) {
            $('.it44-num-prospective').text(`
                Show ${numProductsToShow} products
            `);
        } else {
            $('.it44-num-prospective').text('');
        }
    };

    checkboxFilters.on('change', () => {
        showNumProductsText();
    });
};

export default initDoRunShowNumProductsThatWillAppear;
