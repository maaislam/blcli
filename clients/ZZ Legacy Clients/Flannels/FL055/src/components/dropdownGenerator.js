import brands from '../data/brands';
import categories from '../data/categories';
import settings from '../lib/settings';
const {
    ID,
    VARIATION
} = settings;

function optionsgenerator(dataType) {
    let htmlInner = '';
    let htmlBlock = '';
    let catName = '';
    let catBrands = '';
    switch (dataType) {
        case 'brands':
            [].forEach.call(brands, function (brandCat) {
                htmlInner = '';
                catName = brandCat.name;
                catBrands = brandCat.brands;
                for (let i = 0; i < catBrands.length; i += 1) {
                    htmlInner += `
                        <option value="${catBrands[i].name.toLowerCase()}" data-link="${catBrands[i].link}" data-value="${catBrands[i].name}">${catBrands[i].name}</option>
                    `;
                }
                htmlBlock += `
                <optgroup label="${catName}">
                    ${htmlInner}
                </optgroup>
                `;
            });
            return htmlBlock;
        case 'categories':
            [].forEach.call(categories, function (category) {
                htmlInner = '';
                const catName = category.name;
                const categoriesArray = category.cats;
                [].forEach.call(categoriesArray, function (curCategory) {
                    const curCategoryname = curCategory.name;
                    const curCategorLink = curCategory.link;
                    htmlInner += `
                    <option value="${curCategoryname}" data-link="${curCategorLink}" data-value="${curCategoryname}">${curCategoryname}</option>
                    `;
                    /*htmlInner += `
                        <option value="${curCategoryname}" disabled>${curCategoryname}</option>
                    `;
                    [].forEach.call(subCategories, function (sub) {

                    });*/
                });
                htmlBlock += `
                <optgroup label="${catName}">
                    ${htmlInner}
                </optgroup>
                `;
            });
            return htmlBlock;
        default:
            break;
    }
}

function dropdownGenerator(dropdown) {
    let htmlBlock = '';
    switch (dropdown) {
        case 'brands':
            htmlBlock = `
                <select class="${ID}_search__select" id="brand-select">
                    <option value="select a brand" selected disabled>Select a brand</option>
                    ${optionsgenerator(dropdown)}
                </select>
            `;
            return htmlBlock;
        case 'categories':
            htmlBlock = `
                <select class="${ID}_search__select" id="category-select">
                    <option value="select a category" selected disabled>Select a category</option>
                    ${optionsgenerator(dropdown)}
                </select>
            `;
            return htmlBlock;
        default:
            break;
    }
}

export default dropdownGenerator;