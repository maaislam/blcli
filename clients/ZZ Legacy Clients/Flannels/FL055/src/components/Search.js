import settings from '../lib/settings';
import dropdownGenerator from './dropdownGenerator';
import brands from '../data/brands';
import { events } from '../../../../../lib/utils';
events.analyticsReference = '_gaUAT';
const {
    ID,
    VARIATION
} = settings;

function disableGroups(array, curName) {
    [].forEach.call(array, function (arrayEl) {
        arrayEl.removeAttribute('disabled');
        arrayEl.removeAttribute('style');
    });
    if (array && curName != 'none') {
        [].forEach.call(array, function (arrayEl) {
            const curGroupLabel = arrayEl.getAttribute('label');
            if (curGroupLabel != curName && !arrayEl.getAttribute('disabled')) {
                arrayEl.setAttribute('disabled', 'true');
                arrayEl.setAttribute('style', 'display:none;');
            }
        });
    }
}

function disableOptions(array, curName, curOptGroup) {
    [].forEach.call(array, function (arrayEl) {
        arrayEl.removeAttribute('disabled');
        arrayEl.removeAttribute('style');
    });
    if (array && curName != 'none') {
        [].forEach.call(brands, function (brandCat) {
            if (brandCat.name === curOptGroup) {
                const brands = brandCat.brands;
                [].forEach.call(brands, function (brand) {
                    if (brand.name === curName) {
                        const subCats = brand.subCats;
                        [].forEach.call(array, function (curItem) {
                            const curItemVal = curItem.value.trim();
                            if (subCats.indexOf(curItemVal) === -1) {
                                curItem.setAttribute('disabled', 'true');
                                curItem.setAttribute('style', 'display:none;');
                            }
                        });
                    }
                })
            }
        });
        /*[].forEach.call(array, function (arrayEl) {
            const curGroupLabel = arrayEl.getAttribute('label');
            if (curGroupLabel != curName && !arrayEl.getAttribute('disabled')) {
                arrayEl.setAttribute('disabled', 'true');
            }
        });*/
    }
}

export default class Search {
    constructor(options) {
        const opts = options || {};
        this.device = opts.device;
        this.create();
        this.bindEvents();
        this.render();
    }

    create() {
        const element = document.createElement('div');
        element.classList.add(`${ID}_searchWrap`);
        if (this.device === 'mobile') {
            element.setAttribute('data-device', 'mobile');
        }
        element.innerHTML = `
            <div class="${ID}_search">
                <input type="checkbox" id="searchTrigger" class="${ID}_search__checkbox">
                <label for="searchTrigger" class="${ID}_search__header">
                    ${this.device === 'mobile' ? `
                    <h2 class="${ID}_search__title">Quick Search</h2>
                    ` : `
                    <h2 class="${ID}_search__title">Categorise your search</h2>
                    `}
                </label>
                <form class="${ID}_search__form">
                    ${this.device === 'mobile' ? `
                    <h3 class="${ID}_search__title ${ID}_search__title--alt">Find what you're looking for quicker</h3>
                        <div class="${ID}_search__formBlock ${ID}_search__formBlock--switch" id="gender-select">
                            <input type="radio" id="gender-male" name="gender" class="${ID}_search__radio">
                            <input type="radio" id="gender-female" name="gender" class="${ID}_search__radio">
                            <label for="gender-male" data-link="/men" data-value="Men" class="${ID}_search__formLabel">Male</label>
                            <label for="gender-female" data-link="/women" data-value="Women" class="${ID}_search__formLabel">female</label>
                        </div>
                        <!--End block-->
                    ` : `
                        <div class="${ID}_search__formBlock">
                            <label for="gender" class="${ID}_search__formLabel">Select your gender</label>
                            <div class="${ID}_search__selectWrap">
                                <select class="${ID}_search__select" id="gender-select">
                                    <option selected disabled>Select a gender</option>
                                    <option value="none" data-link="/designers" data-value="I don't mind" data-skip="true">I don't mind</option>
                                    <option value="Men" data-link="/men" data-value="Male">Male</option>
                                    <option value="Women" data-link="/women" data-value="Female">Female</option>
                                    <!--<option value="Kids" data-link="/kids/view-all" data-value="Kids">Kids</option>-->
                                </select>
                                <span class="${ID}_search__selectDummie"></span>
                            </div>
                        </div>
                        <!--End block-->
                    `}
                    <div class="${ID}_search__formBlock">
                        <label for="gender" class="${ID}_search__formLabel">Select your brand of choice</label>
                        <div class="${ID}_search__selectWrap">
                            ${dropdownGenerator('brands')}
                            <span class="${ID}_search__selectDummie"></span>
                        </div>
                    </div>
                    <!--End block-->
                    <div class="${ID}_search__formBlock">
                        <label for="gender" class="${ID}_search__formLabel">Select your desired category</label>
                        <div class="${ID}_search__selectWrap">
                            ${dropdownGenerator('categories')}
                            <span class="${ID}_search__selectDummie"></span>
                        </div>
                    </div>
                    <!--End block-->
                    <div class="${ID}_search__formBlock">
                        <div class="${ID}_search__formButtonWrap">
                            <button class="${ID}_search__formButton">Search</button>
                        </div>
                    </div>
                    <!--End block-->
                </form>
            </div>
        `;
        this.component = element;
    }

    bindEvents() {
        /**
         * List of possible querystrings
         * SearchResults?DescriptionFilter=Stone%20Island
         * SearchResults?DescriptionFilter=Mens%20Cp%20Company
         * SearchResults?DescriptionFilter=Gucci%20Man%20Bags
         * SearchResults?DescriptionFilter=man%20stone%20island%20bags
         * /men|women/brands/stone-island#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EKnitwear
         * /kids/kids-brands/stone-island-junior
         * #dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5EHoods%20%2F%20Sweat%20Tops
         */
        // set initial value of dummy element
        const dummies = this.component.querySelectorAll(`.${ID}_search__selectDummie`);
        [].forEach.call(dummies, function (dummie) {
            const curSelect = dummie.closest(`.${ID}_search__selectWrap`).querySelector(`.${ID}_search__select`);
            const curSelectValue = curSelect.options[curSelect.selectedIndex].value;
            dummie.textContent = curSelectValue;
        });
        if (this.device === 'mobile') {
            const switchlabels = this.component.querySelectorAll(`.${ID}_search__formBlock--switch .${ID}_search__formLabel`);
            [].forEach.call(switchlabels, function (label) {
                label.addEventListener('click', function (e) {
                    const curSelectparent = e.target.closest(`.${ID}_search__formBlock`).id;
                    e.target.parentNode.setAttribute('data-selected', 'true');
                    if (curSelectparent === 'gender-select') {
                        const curName = e.target.getAttribute('data-value').trim();
                        const groups = document.querySelectorAll('optgroup');
                        disableGroups(groups, curName);
                    }
                });
            });
            // add change event to any select
            const selectItems = this.component.querySelectorAll(`.${ID}_search__select`);
            [].forEach.call(selectItems, function (item) {
                item.addEventListener('change', function (e) {
                    window.scrollTo(0, 0);
                    e.target.setAttribute('data-selected', 'true');
                    const curval = item.options[item.selectedIndex].getAttribute('data-value').trim();
                    e.target.parentNode.querySelector(`.${ID}_search__selectDummie`).textContent = curval;
                });
            });
        } else {
            // add change event to any select
            const selectItems = this.component.querySelectorAll(`.${ID}_search__select`);
            [].forEach.call(selectItems, function (item) {
                item.addEventListener('change', function (e) {
                    e.target.setAttribute('data-selected', 'true');
                    events.send(settings.ID, 'Clicked on', `${e.target.id}`);
                    const curval = item.options[item.selectedIndex].getAttribute('data-value').trim();
                    const curSelectparent = e.target.closest(`.${ID}_search__select`).id;
                    if (curSelectparent === 'gender-select') {
                        const curName = item.options[item.selectedIndex].value.trim();
                        const groups = document.querySelectorAll('optgroup');
                        disableGroups(groups, curName);
                    }
                    if (curSelectparent === 'brand-select') {
                        const curName = item.options[item.selectedIndex].getAttribute('data-value').trim();
                        const curUptGroup = item.options[item.selectedIndex].parentNode.label.trim();
                        const categories = document.querySelector('#category-select');
                        const groups = categories.querySelectorAll(`optgroup[label="${curUptGroup}"] option`);
                        disableOptions(groups, curName, curUptGroup);
                    }
                    e.target.parentNode.querySelector(`.${ID}_search__selectDummie`).textContent = curval;
                });
            });
        }
        // on click check how many select have effectively been changed
        // and apply the right query or link
        const submitButton = this.component.querySelector(`.${ID}_search__formButton`);
        let queryString = '#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5E';
        let brandQuery = '';
        let finalQuery = '';
        submitButton.addEventListener('click', function (e) {
            events.send(settings.ID, 'Clicked on', 'Search');
            e.preventDefault();
            const selectList = ['#gender-select', '#brand-select', '#category-select'];
            const selectedArray = [];
            //checks if each filter is selected
            //if yes pushes it into an array
            [].forEach.call(selectList, function (select) {
                const isSelected = document.querySelector(select).getAttribute('data-selected');
                if (isSelected) {
                    selectedArray.push(select);
                }
            });
            const arrLen = selectedArray.length;
            switch (arrLen) {
                case 1:
                    if (selectedArray[0] === '#gender-select' && document.body.classList.contains('mobile')) {
                        const selectSwitches = document.querySelectorAll(`.${ID}_search__radio`);
                        [].forEach.call(selectSwitches, function (curSwitch) {
                            if (curSwitch.checked) {
                                const refId = curSwitch.id;
                                const refLink = document.querySelector(`label[for="${refId}"]`).getAttribute('data-link').trim();
                                window.location = refLink;
                            }
                        });
                    } else {
                        const curSelectValue = document.querySelector(selectedArray[0]).options[document.querySelector(selectedArray[0]).selectedIndex].getAttribute('data-link').trim();
                        window.location = curSelectValue;
                    }
                    break;
                case 2:
                    if(selectedArray[0] === '#gender-select' && selectedArray[1] === '#category-select' || selectedArray[0] === '#category-select' && selectedArray[1] === '#gender-select'){
                        queryString = '/SearchResults?DescriptionFilter=';
                        [].forEach.call(selectedArray, function (curSelect) {
                            if (document.body.classList.contains('mobile') && curSelect === '#gender-select') {
                                let switchVal = '';
                                const selectSwitches = document.querySelectorAll(`${curSelect} .${ID}_search__radio`);
                                [].forEach.call(selectSwitches, function (curSwitch) {
                                    if (curSwitch.checked) {
                                        const refId = curSwitch.id;
                                        const refVal = document.querySelector(`label[for="${refId}"]`).getAttribute('data-value').trim();
                                        switchVal = refVal;
                                    }
                                });
                                finalQuery += queryString + switchVal.toLowerCase() + '%20';
                            } else {
                                const curSelectValue = document.querySelector(curSelect).options[document.querySelector(curSelect).selectedIndex].value.trim();
                                if (curSelect === '#gender-select') {
                                    if (curSelectValue === 'kids') {
                                        finalQuery += queryString + curSelectValue.toLowerCase() + '%20';
                                    } else {
                                        if (curSelectValue != 'none') {
                                            finalQuery += queryString + curSelectValue.toLowerCase() + '%20';
                                        } else {
                                            finalQuery += queryString;
                                        }
                                    }
                                } else if (curSelect === '#brand-select') {
                                    brandQuery = curSelectValue.toLowerCase().replace(/&/, 'and').replace(/\s/g, '-');                                
                                    finalQuery += brandQuery + queryString;
                                } else {
                                    finalQuery += curSelectValue.trim().replace(/&/, 'and').replace('/', '%2F').replace(/\s/g, '%20');
                                }
                            }
                        });
                        window.location = finalQuery;
                    } else {
                        [].forEach.call(selectedArray, function (curSelect) {
                            if (document.body.classList.contains('mobile') && curSelect === '#gender-select') {
                                let switchVal = '';
                                const selectSwitches = document.querySelectorAll(`${curSelect} .${ID}_search__radio`);
                                [].forEach.call(selectSwitches, function (curSwitch) {
                                    if (curSwitch.checked) {
                                        const refId = curSwitch.id;
                                        const refVal = document.querySelector(`label[for="${refId}"]`).getAttribute('data-value').trim();
                                        switchVal = refVal;
                                    }
                                });
                                finalQuery += '/' + switchVal.toLowerCase() + '/brands/';
                            } else {
                                const curSelectValue = document.querySelector(curSelect).options[document.querySelector(curSelect).selectedIndex].value.trim();
                                if (curSelect === '#gender-select') {
                                    if (curSelectValue === 'kids') {
                                        finalQuery += '/' + curSelectValue.toLowerCase() + '/kids-brands/';
                                    } else {
                                        if (curSelectValue != 'none') {
                                            finalQuery += '/' + curSelectValue.toLowerCase() + '/brands/';
                                        } else {
                                            finalQuery += '/';
                                        }
                                    }
                                } else if (curSelect === '#brand-select') {
                                    brandQuery = curSelectValue.toLowerCase().replace(/&/, 'and').replace(/\s/g, '-');                                
                                    finalQuery += brandQuery + queryString;
                                } else {
                                    finalQuery += curSelectValue.trim().replace(/&/, 'and').replace('/', '%2F').replace(/\s/g, '%20');
                                }
                            }
                        });
                        window.location = finalQuery;
                    }
                    break
                case 3:
                    [].forEach.call(selectedArray, function (curSelect) {
                        if (document.body.classList.contains('mobile') && curSelect === '#gender-select') {
                            let switchVal = '';
                            const selectSwitches = document.querySelectorAll(`${curSelect} .${ID}_search__radio`);
                            [].forEach.call(selectSwitches, function (curSwitch) {
                                if (curSwitch.checked) {
                                    const refId = curSwitch.id;
                                    const refVal = document.querySelector(`label[for="${refId}"]`).getAttribute('data-value').trim();
                                    switchVal = refVal;
                                }
                            });
                            finalQuery += '/' + switchVal.toLowerCase() + '/brands/';
                        } else {
                            const curSelectValue = document.querySelector(curSelect).options[document.querySelector(curSelect).selectedIndex].value.trim();
                            if (curSelect === '#gender-select') {
                                if (curSelectValue === 'kids') {
                                    finalQuery += '/' + curSelectValue.toLowerCase() + '/kids-brands/';
                                } else {
                                    if (curSelectValue != 'none') {
                                        finalQuery += '/' + curSelectValue.toLowerCase() + '/brands/';
                                    } else {
                                        finalQuery += '/';
                                    }
                                }
                            } else if (curSelect === '#brand-select') {
                                finalQuery += curSelectValue.toLowerCase().replace(/&/, 'and').replace(/\s/g, '-');
                            } else {
                                finalQuery += queryString + curSelectValue.trim().replace(/&/, 'and').replace('/', '%2F').replace(' ', '%20');
                            }
                        }
                    });
                    window.location = finalQuery;
                    break;
                default:
                    break;
            }
        });
    }

    render() {
        if (this.device === 'mobile') {
            document.querySelector('.dvSearchWrap.row').insertAdjacentElement('afterend', this.component);
        } else {
            if (document.querySelector('.sdHero.SuperHome')) {
                document.querySelector('.sdHero.SuperHome').insertAdjacentElement('afterend', this.component);
            } else if (document.querySelector('.ContentPane .DnnModule:nth-child(2)')) {
                document.querySelector('.ContentPane .DnnModule:nth-child(2)').insertAdjacentElement('beforebegin', this.component);
                document.querySelector(`.${ID}_searchWrap`).setAttribute('style', 'margin-top:-20px;');
            } else {
                document.querySelector('.flanHPContains').insertAdjacentElement('afterend', this.component);
                document.querySelector(`.${ID}_searchWrap`).setAttribute('style', 'margin-top:-20px;');
            }
        }
    }
}
