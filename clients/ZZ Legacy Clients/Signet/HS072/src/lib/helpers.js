
// return what the category is
export const getCategory = () => {
    let cat;

    const url = window.location.href;

    if(window.digitalData.page.category.primaryCategory === 'Jewellery' && url.indexOf('jewellery/') > -1) {
        cat = 'Jewellery';
    }
    else if(window.digitalData.page.category.subCategory1 === 'Rings')  {
        cat = 'Rings';
    } else if(window.digitalData.page.category.primaryCategory === 'Watches')  {
        cat = 'Watches';
    } else if(window.digitalData.page.category.primaryCategory === 'Jewellery')  {
        cat = 'Jewellery';
    } 
    return cat;
}