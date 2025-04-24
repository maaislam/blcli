export const browseTemplateFunc = () => {


// BrowseV3 Functions
function SetVal(ev, name, key, id, active) {

    try {

        if (!isLegacy && ev) {
            ev.preventDefault();
        }

        var isFilterSelection = false
          , clearFilters = false;
        if (name != null) {
            dcpVal = 1;
            if (name == 'CLEAR' && key != null) {
                // Add the clear to state
                window.filters = {};
                if (key == '###') {
                    isFilterSelection = true;
                    clearFilters = true;
                    clearFiltersSelection();
                } else {
                    clearFiltersSelection(key);
                }
                setFirstFilterSelected();
                buildFiltersObject();
                constructAndSetFilterStateKey();
            } else if (key != null) {
                isFilterSelection = true;
                hasUserInteractedWithFilters = true;
                if (name == 'APRI' && active != null) {
                    setHiddenPriceSliderValue((active.toLowerCase() == 'false') ? '' : name + "^" + key);
                } else {
                    if (name == 'APRI' && !window.priceFilterSliderEnabled) {
                        setHiddenPriceSliderValue('');
                    }
                    setFilterStatusVal(id);
                    setFirstFilterSelected(name, id);
                }
                //Use set timeout to give the UI a chance to render
                buildFiltersObject();
                setTimeout(constructAndSetFilterStateKey(), 0);
            }
        }

        if (!isFilterSelection) {
            getProductsInformation(clearFilters);
        }
    } catch (e) {
        console.log(e);
    }
}

function setHiddenPriceSliderValue(value) {
    $('#hdnPriceSliderValue').val(value);
}

function setFilterStatusVal(id) {
    var filterSelectionId = $(id).children("span");
    filterSelectionId.toggleClass("SelectedFilter SelectableFilter").attr("aria-checked", "false");
}

function setFirstFilterSelected(name, id) {
    var $filterGroup = $('*[data-item^="' + name + '"].FirstSelectedFilter');
    if (name) {
        // Ensure only 1 item per filter group
        // is the first selected one.
        var filterSelectionId = $(id).children("span");
        if (filterSelectionId.hasClass('SelectedFilter')) {
            // If it's selected, only set it as the first one if required
            if ($filterGroup.length === 0) {
                filterSelectionId.addClass("FirstSelectedFilter").attr('data-priority', -1);
            }
        } else {
            // Otherwise, deselect and find the next filter to be the first
            filterSelectionId.removeClass("FirstSelectedFilter").attr('data-priority', 0);
            $('*[data-item^="' + name + '"].SelectedFilter:first').addClass('FirstSelectedFilter').attr('data-priority', -1);
        }
    } else {
        // Clear them
        $('span.FirstSelectedFilter').each(function() {
            $(this).removeClass('FirstSelectedFilter');
        });
    }
}

function clearFiltersSelection(filterKey, force) {
    if (!force && !isEmpty(window.filters))
        return;
    if (filterKey == null) {
        $("#filterlist .SelectedFilter").each(function() {
            resetFilterCheckBox(this);
        });
        resetPriceSlider();
    } else if (filterKey == 'APRI') {
        resetPriceSlider();
        resetFilterCheckboxesForKey(filterKey);
    } else {
        resetFilterCheckboxesForKey(filterKey);
    }
}

function isEmpty(object) {
    for (var key in object) {
        if (object.hasOwnProperty(key))
            return false;
    }
    return true;
}

function resetFilterCheckboxesForKey(key) {
    $('#filterlist .FilterListItem.' + key + ' .SelectedFilter').each(function() {
        resetFilterCheckBox(this);
    });
}

function resetFilterCheckBox(filterCheckbox) {
    $(filterCheckbox).addClass('SelectableFilter').removeClass('SelectedFilter').attr("aria-checked", "false");
}

function setFiltersSelection(filtersArray) {
    $('#FilterContainer').addClass('ProductsFiltered');
    $('#mobControlBar').addClass('ProductsFiltered');
    $(".mobFilterAppIcon").addClass("glyphicon glyphicon-ok-sign").show();
    var selectableFiltersList = $(".SelectableFilter");
    $(".mobAppliedFilters").html("");
    $(".productFilter").removeClass("FilteringApplied");
    if (selectableFiltersList != null) {
        // New array
        var filtersArrayMap = [];
        if (filtersArray) {
            $(filtersArray).each(function(i, item) {
                var dataItem = item;
                if (dataItem == 'none') {
                    $('#FilterContainer').removeClass('ProductsFiltered');
                    $('#mobControlBar').removeClass('ProductsFiltered');
                    $(".mobFilterAppIcon").removeClass("glyphicon glyphicon-ok-sign").hide();
                }
                var dataItemParts = dataItem.split('^');
                var displayItemParts = item.split('^');
                if (displayItemParts.length > 1) {
                    if (dataItemParts[0] == 'apri') {
                        if (window.priceFilterSliderEnabled) //Price slider
                        {
                            setPriceFilterDisplayValue($("#slider-range").slider("values", 0), $("#slider-range").slider("values", 1));
                        } else {
                            //Price manual entry
                            var match = displayItemParts[1].match(/(\d+)-(\d+)/);
                            if (match) {
                                setPriceFilterDisplayValue(parseFloat(match[1]), parseFloat(match[2]));
                            }
                        }
                    }
                    $(".mobAppliedFilters[data-item='" + dataItemParts[0] + "']").closest(".productFilter").addClass("FilteringApplied");
                }
                if (dataItemParts.length > 1) {
                    var dataItemValueParts = dataItemParts[1].split(',');
                    $(dataItemValueParts).each(function(index, val) {
                        filtersArrayMap.push(dataItemParts[0] + "^" + val);
                    });
                }
            });
        } else {
            if (!isEmpty(window.filters)) {
                for (var property in window.filters) {
                    if (window.filters.hasOwnProperty(property)) {
                        if (property === 'APRI') {
                            if (window.priceFilterSliderEnabled) {
                                // Price slider
                                setPriceFilterDisplayValue($("#slider-range").slider("values", 0), $("#slider-range").slider("values", 1));
                            } else {
                                //Price manual entry
                                var match = displayItemParts[1].match(/(\d+)-(\d+)/);
                                if (match) {
                                    setPriceFilterDisplayValue(parseFloat(match[1]), parseFloat(match[2]));
                                }
                            }
                        }
                        $(".mobAppliedFilters[data-item='" + property + "']").closest(".productFilter").addClass("FilteringApplied");
                        $.each(window.filters[property].keys, function(i, key) {
                            filtersArrayMap.push(property + '^' + key);
                        });
                    }
                }
            } else {
                $('#FilterContainer').removeClass('ProductsFiltered');
                $('#mobControlBar').removeClass('ProductsFiltered');
                $(".mobFilterAppIcon").removeClass("glyphicon glyphicon-ok-sign").hide();
            }
        }

        var filterSelectedValueLists = {};
        $(selectableFiltersList).each(function() {
            var dataItem = $(this).attr('data-item');
            if (dataItem != null && dataItem.length > 0) {
                if ($.inArray(dataItem, filtersArrayMap) != -1) {
                    var filterKey = dataItem.split('^')[0];
                    var $this = $(this);
                    $this.addClass('SelectedFilter').removeClass('SelectableFilter').attr("aria-checked", "true");
                    if (filterSelectedValueLists[filterKey] == null)
                        filterSelectedValueLists[filterKey] = [];
                    filterSelectedValueLists[filterKey].push($this.find('.FilterName').text());
                }
            }
        });

        for (var filterSelectedKey in filterSelectedValueLists) {
            if (filterSelectedKey.toLowerCase() == 'apri' && window.priceFilterSliderEnabled)
                continue;
            var selectedFilterHtml = '';
            $.each(filterSelectedValueLists[filterSelectedKey], function(index, value) {
                selectedFilterHtml += "<span class='selectedFilter'>" + $.trim(value) + "</span>";
                if (index + 1 < filterSelectedValueLists[filterSelectedKey].length)
                    selectedFilterHtml += "<span class='seperator'></span>";
            });
            $(".mobAppliedFilters[data-item='" + filterSelectedKey.toLowerCase() + "']").html(selectedFilterHtml);
        }

        var priceFilterArray = $.grep(filtersArrayMap, function(val) {
            return val.indexOf('APRI') != -1;
        });

        if (priceFilterArray != null && priceFilterArray.length > 0) {
            setHiddenPriceSliderValue(priceFilterArray[0]);
            var priceValSplit = priceFilterArray[0].split('^');

            if (priceValSplit != null && priceValSplit.length > 1) {
                var valueSplit = priceValSplit[1].split('-');
                if (valueSplit != null && valueSplit.length > 1) {
                    $("#hdnMinPrice").val(valueSplit[0]);
                    $("#hdnMaxPrice").val(valueSplit[1]);
                    setPriceSlider();
                }
            }
        } else {
            setHiddenPriceSliderValue('');
        }
    }

    applySortFilterText();
}

function applySortFilterText() {
    $('.MobSortSelector input:radio').filter(":checked").each(function() {
        var $this = $(this);
        var selectedSortValueName = $this.data('optionname');
        var parent = $this.closest('.MobSortSelector');
        parent.find('.mobAppliedFilters').text(selectedSortValueName);
        parent.find('.MobSortSelectionCheckbox').removeClass('SelectedFilter');
        $this.closest('.FilterListItem').find('.MobSortSelectionCheckbox').addClass('SelectedFilter');
    });
}

function bindPaginationEvents() {
    $('div.PageNumber a').click(function(e) {
        // Prevent the default click behavior.
        e.preventDefault();
        var filterValues = getSelectedFilters();
        var dataHref = $(this).attr('data-href');

        if (filterValues != null && filterValues.length > 0) {
            dataHref += "&Filter=" + encodeURIComponent(filterValues);
        }

        // get href attr, remove leading #
        var href = dataHref.replace(/^#/, '')
          , option = $.deparam(href, true);
        pushState(window.filters, '', href);
        return false;
    });
}

function setProductsPerPageValue(dpppValue) {
    var ppplId = $("a.pppl");
    var inlineView = getViewNumberType() === "inline";
    if (ppplId.length > 0 && !inlineView) {

        var newViewByVal = dpppValue != null ? getNewViewByValue(dpppValue) : getNewViewByValue();
        var newViewByText = ppplId.data("text") + " " + +newViewByVal;

        if ($(".pppt > span").html() < getBrowseHighPageLength()) {
            var viewByTextHighPageLength = ppplId.data("text") + " " + getBrowseHighPageLength();
            if ((ppplId.html() == viewByTextHighPageLength || newViewByText == viewByTextHighPageLength)) {
                newViewByText = ppplId.data("alltext");
            }
        }
        ppplId.html(newViewByText);
        ppplId.attr('data-dppp', newViewByVal);

        var filterValues = getSelectedFilters();
        var dataHref = ppplId.attr('data-href');

        if (filterValues != null && filterValues.length > 0) {
            dataHref += "&Filter=" + filterValues;
        }
        if (dpppValue == null) {
            var aPagehref = dataHref.replace(/^#/, '').replace(/\%\s/, ' ');
            var option = $.deparam(aPagehref, true);
            // convert href into object
            pushState(window.filters, '', aPagehref);
            // set hash, triggers hashchange on window
        }
        var hrefVal = ppplId.attr('href');
        ppplId.attr('data-href', "#dcp=1&dppp=" + newViewByVal + "&OrderBy=" + getSortOptionSelectedValue());
        ppplId.attr('href', hrefVal.replace('dppp=' + dpppVal, 'dppp=' + newViewByVal));
    } else if (ppplId.length > 0 && inlineView) {
        var ppplEl = $('a.pppl.selected');
        var filterValues = getSelectedFilters();

        var dataHref = $('*[data-dppp=' + dpppValue + ']').data('href');

        if (filterValues != null && filterValues.length > 0) {
            dataHref += "&Filter=" + filterValues;
        }

        // if number of products has changed. 
        var hash = window.location.hash;
        var regEx = new RegExp("dppp=" + dpppValue + "\(&\|\$\)","i")
        if (!regEx.test(hash)) {
            // Get the selected sort order and
            // merge back into the object
            var aPagehref = dataHref.replace(/^#/, '').replace(/\%\s/, ' ');
            var option = $.deparam(aPagehref, true);
            // convert href into object
            option.OrderBy = getSortOptionSelectedValue();
            pushState(window.filters, '', $.param(option));
            // set hash, triggers hashchange on window
        }

        ppplEl.attr('data-href', "#dcp=1&dppp=" + ppplEl.data("dppp") + "&OrderBy=" + getSortOptionSelectedValue());
    }
}

function highlightProductsPerPageValue(val) {
    $('.pppl').each(function() {
        $(this).removeClass('selected')
    })
    if (val) {
        $elem = $('*[data-dppp="' + val + '"]');
        $elem.addClass('selected')
    } else {
        $elem = $('a.pppl:first');
        $elem.addClass('selected')
    }
}

function setFilterValues(filterList) {
    var selectedFilters = [];

    if (filterList != null && filterList.length > 0) {
        $(filterList).each(function() {
            var filterItems = this.filters;
            if (filterItems != null && filterItems.length > 0) {
                $("div." + this.key).each(function() {
                    var $filterDiv = $(this);
                    var aTagId = $(this).find('.FilterAnchor');
                    var filterNameSpanId = $(this).find('.FilterName');
                    var filterValueSpanId = $(this).find('.FilterValue');
                    if (filterNameSpanId != null && filterNameSpanId.length > 0) {
                        $(filterItems).each(function() {
                            if (filterNameSpanId.data('filtername') == this.key) {
                                if (filterValueSpanId != null && filterValueSpanId.length > 0) {
                                    if (this.active) {
                                        selectedFilters.push({
                                            Name: filterNameSpanId.data('parsedfiltername'),
                                            Key: this.key,
                                            Group: this.group
                                        });
                                    }

                                    $filterDiv.attr('data-productcount', this.count);
                                    filterValueSpanId.html(this.count ? '(' + this.count + ')' : '');
                                    if (aTagId.length > 0 && this.count) {
                                        aTagId.removeClass("greyOut");
                                    } else {
                                        aTagId.addClass("greyOut");
                                    }
                                    return false;
                                }
                            }
                            return true;
                        });
                    }
                });
            }
        });
    }

    setSelectedFilters(selectedFilters);
}

function buildFiltersObject() {
    var $selectedFiltersQuery = $("#filterlist div.FilterListItem span.SelectedFilter");

    window.filters = {};

    // Sort the filters so that priority
    // values are first to build
    $sortedFilters = $selectedFiltersQuery.sort(function(a, b) {
        var orderA = $(a).attr('data-url-order');
        var orderB = $(b).attr('data-url-order');

        // Bring fixed filters to the front
        if ($(a).attr('data-filter-type') === 'fixed')
            orderA = 0;
        if ($(b).attr('data-filter-type') === 'fixed')
            orderB = 0;

        var priorityA = $(a).attr('data-priority');
        var priorityB = $(b).attr('data-priority');
        if (orderA === orderB) {
            return priorityA || 0 < priorityB || 0;
        } else {
            return orderA > orderB ? 0 : -1;
        }
    });

    $sortedFilters.each(function() {
        var item = $(this).attr('data-item');
        var filterType = $(this).attr('data-filter-type');
        var splitItem = item.split('^');
        // Init the filters array
        if (!window.filters[splitItem[0]]) {
            window.filters[splitItem[0]] = {
                type: filterType,
                keys: []
            };
        }
        // Push the filter item to the correct prop's array
        if (splitItem.length > 1) {
            window.filters[splitItem[0]].keys.push(splitItem[1]);
        }
    });

    var priceSliderValue = $('#hdnPriceSliderValue').val();
    if (priceSliderValue != null && priceSliderValue.length > 0) {
        if (!window.filters['APRI']) {
            window.filters['APRI'] = {
                type: '',
                keys: []
            };
        }
        var priceFilter = priceSliderValue.split('^')
        if (priceFilter.length > 1) {
            // Push the filter item to the correct prop's array
            window.filters['APRI'].keys.push(priceFilter[1]);
        }
    }
}

function buildFilter(filterSelection, i, key, property) {
    if (i === 0) {
        // First part of the filter item e.g. ABRA^
        if (filterSelection === '') {
            filterSelection += property + '^'
        } else {
            filterSelection += '|' + property + '^'
        }
        filterSelection += key
    } else {
        filterSelection += ',' + key
    }
    return filterSelection;
}

function getSelectedFilters(includeFixed) {
    if (isEmpty(window.filters) || isLegacy) {
        return getSelectedFiltersLegacy();
    }
    var filterSelection = '';
    // var brandsDone = false;
    var variableFiltersComplete = false;
    for (var property in window.filters) {
        if (window.filters.hasOwnProperty(property)) {
            var keys = window.filters[property].keys;
            var filterType = window.filters[property].type;
            // Loop through the filter keys array
            // Check the flag for when we build the full string
            // or fixed/variable filters are complete.
            if ((filterType !== 'fixed' && filterType !== 'variable') || variableFiltersComplete || includeFixed) {
                $.each(keys, function(i, k) {
                    filterSelection = buildFilter(filterSelection, i, k, property);
                });
            } else {
                var slicedFilters = keys.slice(1, keys.length);
                $.each(slicedFilters, function(i, k) {
                    filterSelection = buildFilter(filterSelection, i, k, property);
                });
            }
            // Mark variable filters done
            if (filterType === 'variable')
                variableFiltersComplete = true;
            // After any brand, make further filters appear in the hash
            // if (property === 'ABRA') {
            // brandsDone = true;
            // }
        }
    }

    return filterSelection;
}

function getSelectedFiltersLegacy() {
    var currentFilterName = '';
    var newFilterString = '';
    var priceFilterDone = false;

    var $selectedFiltersQuery = $("#filterlist div.FilterListItem span.SelectedFilter");

    $selectedFiltersQuery.each(function() {
        var item = $(this).attr('data-item');
        var splitItem = item.split('^');
        var newFilterName = splitItem[0].toLowerCase();

        if (newFilterString == '') {
            currentFilterName = newFilterName;
            newFilterString = item;

            if (currentFilterName == 'apri')
                priceFilterDone = true;
        } else {
            if (currentFilterName != newFilterName) {
                currentFilterName = newFilterName;
                newFilterString += "|" + item;
            } else {
                newFilterString += "," + splitItem[1];
            }
        }
    });

    if (!priceFilterDone) {
        var priceSliderValue = $('#hdnPriceSliderValue').val();
        if (priceSliderValue != null && priceSliderValue.length > 0) {
            if (newFilterString != null && newFilterString.length > 0) {
                newFilterString += "|" + priceSliderValue;
            } else {
                newFilterString = priceSliderValue;
            }
        }
    }
    return newFilterString;
}

function getNewViewByValue(val) {
    var dpppCurrentValue = val != null ? val : $("a.pppl").attr('data-dppp');
    var newViewByVal = dpppCurrentValue == getBrowseHighPageLength() ? getBrowseLowPageLength() : getBrowseHighPageLength();
    return newViewByVal;
}

var originalPath = location.pathname;

function getStateKey() {
    var newViewByVal = $("a.pppl.selected").attr('data-dppp');
    if (!newViewByVal) {
        newViewByVal = getNewViewByValue();
    }

    var defaultStateKey = "#dcp=1&dppp=" + newViewByVal + "&OrderBy=" + getSortOptionSelectedValue();
    var filterStateKey = "";

    var selectedFiltersValue = getSelectedFilters(isLegacy);

    if (selectedFiltersValue != null && selectedFiltersValue.length > 0) {
        filterStateKey = defaultStateKey + "&Filter=" + encodeURIComponent(selectedFiltersValue);
    } else {
        filterStateKey = defaultStateKey + "&Filter=none";
    }

    return filterStateKey;
}

function constructAndSetFilterStateKey() {
    // get href attr, remove leading #
    var filterStateKey = getStateKey();
    var valueFilter = filterStateKey.replace(/^#/, '')
      , option = $.deparam(valueFilter, true);

    if (isLegacy) {
        pushState(window.filters, '', valueFilter);
        // option

        if (!Modernizr.hashchange)
            handleHashChange();

        return;
    }

    // Progressively build the path in filter order
    // The latter is currently based on UI order.
    var path = '';
    var fixedFiltersComplete = false;
    var variableFiltersComplete = false;
    for (var property in window.filters) {
        if (window.filters.hasOwnProperty(property)) {
            // Only 1 fixed
            if (window.filters[property].type === 'fixed' && !fixedFiltersComplete) {
                var firstFilter = window.filters[property].keys[0];
                path += '/' + formatPath(firstFilter.toLowerCase().trim(), true);
                fixedFiltersComplete = true;
                // Any number of variable, but only one from each filter
            } else if (window.filters[property].type === 'variable' && !variableFiltersComplete) {
                var firstFilter = window.filters[property].keys[0];
                path += '/' + formatPath(firstFilter.toLowerCase().trim(), true);
                variableFiltersComplete = true;
            }
        }
    }

    // path = formatPath(path, false);
    originalPath = removeTrailingSlash($('#hdnBaseCategoryUrl').val());

    // Break back to the original path if it's not changed.
    if (path !== originalPath) {
        pushState(window.filters, originalPath + path + '#' + valueFilter);
        // option
    } else {
        pushState(window.filters, originalPath);
        // option
    }

    // If the hashchange handler isn't supported by this browser
    if (!Modernizr.hashchange)
        handleHashChange();
}

function calcFiltersFromPath(path, fixed, variable, set) {
    // Strip out all fixed/variable filters
    // from the original path
    var pathArray = path.split('/');
    $.each(pathArray, function(i, item) {
        var matched = false;
        // Match any fixed/variable filter value
        $('#filterlist div.FilterListItem span.SelectedFilter, #filterlist div.FilterListItem span.SelectableFilter').each(function() {
            var filterType = $(this).attr('data-filter-type');
            if ((fixed && filterType === 'fixed') || (variable && filterType === 'variable')) {
                var $filterName = $(this).find('span.FilterName');
                if (formatPath($filterName.attr('data-filtername'), true).toLowerCase().trim() === item.toLowerCase()) {
                    matched = true;
                    if (set) {
                        $(this).addClass('SelectedFilter');
                    }
                    // return false;
                }
            }
        });
        if (!matched) {
            path += '/' + item;
        }
    });

    return path;
}

function formatPath(path, stripSlashes) {
    // Format path
    // Replace spaces with hyphens and remove any trailing slash
    path = path.replace(/&/g, 'and');
    path = path.replace(/%/g, 'percent');
    path = path.replace(/ /g, '-');
    path = path.replace(/\+/g, '%2B');
    path = path.replace(/\?/g, '%3F');
    path = path.replace(/\!/g, '%21');
    path = path.replace(/°/g, 'deg');
    path = path.replace(/#/g, 'hash-');
    path = path.replace(/[()\[\]<>.,'":\*]/g, '');
    if (stripSlashes) {
        path = path.replace(/\//g, '-');
        path = path.replace(/\\/g, '-');
    }
    return path;
}

function removeTrailingSlash(path) {
    if (path.substr(path.length - 1) == '/') {
        return path.substr(0, path.length - 1);
    }
    return path;
}

function getProductListContainerAttributeValue(attributeName) {
    var attributeValue = "";
    if (attributeName == null || attributeName.length == 0)
        return attributeValue;

    var $productListContainer = $('#productlistcontainer');
    attributeValue = $productListContainer.data(attributeName);
    if (attributeValue == null) {
        attributeValue = "";
    }
    return attributeValue.toString();
}

var currentGetProductsXhr = null;
function getProductsInformation(clearFilters) {
    showLoadingView();
    var filterSelection = '';
    $("#initialActiveColumns").val($("#activecolumns").val());
    if (!clearFilters) {
        filterSelection = getSelectedFilters(true);
    }

    var sortOptionVal = getSortOptionSelectedValue();
    var descFilterText = getProductListContainerAttributeValue('descfilter');
    var categoryNameValue = getProductListContainerAttributeValue('category');
    var searchTermCategoryValue = getProductListContainerAttributeValue('searchtermcategory');
    var selectedCurrencyValue = getProductListContainerAttributeValue('fltrselectedcurrency');

    if (currentGetProductsXhr != null)
        currentGetProductsXhr.abort();

    var isSearch = descFilterText.length > 0;

    var productApiRequestUrl = '/api/productlist/v1';
    productApiRequestUrl += isSearch ? '/search' : '/getforcategory'

    currentGetProductsXhr = $.ajax({
        cache: true,
        type: 'GET',
        url: productApiRequestUrl,
        data: {
            categoryId: categoryNameValue,
            page: dcpVal,
            productsPerPage: dpppVal,
            sortOption: sortOptionVal,
            selectedFilters: filterSelection,
            isSearch: descFilterText.length > 0,
            searchText: descFilterText,
            columns: $("#activecolumns").val(),
            mobileColumns: $("#activemobilecolumns").val(),
            clearFilters: clearFilters,
            pathName: decodeURIComponent(window.location.pathname),
            searchTermCategory: searchTermCategoryValue,
            selectedCurrency: selectedCurrencyValue,
            portalSiteId: portalSiteId
        },
        dataType: "json",
        success: function(data) {
            if (data != null) {
                data.ClearAllFiltersVisible = !!filterSelection;
                bindProductData(data);
            } else {
                showError("Product data endpoint returned null");
            }
            showComplete(data);
            if (typeof window.CustomEvent === "function")
                window.dispatchEvent(new CustomEvent('productListUpdated'));
        },
        error: function(xhr, textStatus, errorThrown) {
            if (textStatus != "abort")
                showError(textStatus + errorThrown);
        },
        complete: function(data) {
            currentGetProductsXhr = null;
        }
    });
}

function bindProductData(d) {
    var prdTemplate = $("#products-template").html();
    var hasProducts = d != null && d.products.length > 0;
    var hasFilters = d != null && d.filters.length > 0;
    var clearAllFiltersVisible = d != null && d.ClearAllFiltersVisible;
    var noProductsText = $('#productlistcontainer').data('noproductstext');
    var template = window.Handlebars.compile(prdTemplate);
    var html = hasProducts ? template(d) : '<li>' + noProductsText + '</li>';
    $('#navlist').html(html);
    removeLoadingView();
    if (hasProducts) {
        $('.pagination').show();
        if (!productCountProductsPerPageEnabled()) {
            $(".pppt").html(d.numberOfProducts);
            // change the total products text next to pagingation
        } else {
            setProductCount(d.products.length, d.numberOfProducts);
        }
        $("div.PageNumber").html(getPaginationHtml(d));
        $('div.PageNumber .PrevLink').html($("div.PageNumber").data('previoustext'));
        $('div.PageNumber .NextLink').html($("div.PageNumber").data('nexttext'));
        var browseV3LowPageLength = getBrowseLowPageLength();
        var browseV3HighPageLength = getBrowseHighPageLength();
        var ppplId = $("a.pppl");
        var inlineView = getViewNumberType() === "inline";
        if (ppplId.length > 0 && !inlineView) {
            if (browseV3LowPageLength != browseV3HighPageLength && $(".pppt > span").html() > browseV3LowPageLength) {
                var newViewByText;
                if ($(".pppt > span").html() < browseV3HighPageLength) {
                    var viewByTextHighPageLength = ppplId.data("text") + " " + browseV3HighPageLength;
                    if (ppplId != null && (ppplId.html() == viewByTextHighPageLength)) {
                        newViewByText = ppplId.data("alltext");
                        ppplId.html(newViewByText);
                    }
                } else {
                    var dppValue = ppplId.attr('data-dppp');
                    if (ppplId != null && ppplId.html() == ppplId.data("alltext")) {
                        newViewByText = ppplId.data("text") + " " + dppValue;
                        ppplId.html(newViewByText);
                    }
                }
                $("div.ViewPerPage").css('display', '');
                //show
            } else {

                $("div.ViewPerPage").hide();
            }
        }
        bindPaginationEvents();
        InitializeAlternateImageEvents();
        InitializeQuickBuyAndWishListEvents();
        InitializeGTMEvents();
        postGTMProductListing(d);
    } else {
        $('.pagination').hide();
    }

    if (hasFilters) {
        setFilterValues(d.filters);
    } else {
        $('.FilterValue').html('');
    }
    if (clearAllFiltersVisible) {
        $("#clrallfltrs, #mobclrfltrs").css('display', '');
        //Show
        $("#mobappfltrs").addClass("clearFiltersOpen");
        if ($("#CategoryAcross").text() != "") {
            $("#CategoryAcross").hide();
            $("#divsiblinglistwrapper").hide();
            $("#divViewMore").hide();
        }
    } else {
        $("#clrallfltrs, #mobclrfltrs").hide();
        $("#mobappfltrs").removeClass("clearFiltersOpen");

        if ($("#CategoryAcross").text() != "") {
            $("#CategoryAcross").show();
            $("#divsiblinglistwrapper").show();
            $("#divViewMore").show();
        }
    }

    // Recently viewed
    if (recentlyViewedProductsHighlightEnabled) {
        highlightRecentlyViewedProducts();
    }

    // Re-gen URLs
    generateFilterUrls();
    // Populate filter copy
    if (!isLegacy) {
        populateSeoInfo(d.meta);
    }

    if (EnableScrollToTop(d)) {
        scrollToTop();
    }
    hasUserInteractedWithFilters = false;
}

function populateSeoInfo(meta) {
    if (meta) {
        // Title
        document.title = meta.title;
        // Meta
        $('meta[property="og:title"]').remove();
        $('head').append('<meta property="og:title" content="' + meta.title + '">');
        $('meta[name="DESCRIPTION"]').remove();
        $('meta[name="description"]').remove();
        $('head').append('<meta name="description" content="' + meta.description + '">');
        // H1
        $('h1#catHeader').find('span').text(meta.h1);
        // Copy
        $('#lblCategoryCopy').html(meta.copy);
    }
}

function InitializeQuickBuyAndWishListEvents() {
    if (typeof window.initializeHotspotsQuickBuyAndWishListEvents == 'function') {
        window.initializeHotspotsQuickBuyAndWishListEvents('div.productimage.s-productthumbimage');
    }
}

function EnableScrollToTop(d) {
    // Check if portal setting enabled
    if (!productListingScrollTopOnFilterChange && hasUserInteractedWithFilters) {
        return false;
    }
    if (hasUserInteractedWithFilters && d != null) {
        var activeColumns = $("#activecolumns").val();
        var totalScrollableProducts = activeColumns * noOfRowsToScroll;
        return d.products.length <= totalScrollableProducts;
    }
    return true;
}

function getBrowseLowPageLength() {
    return checkVariableExists(window.browseLowPageLength) ? window.browseLowPageLength : 24;
}

function getBrowseHighPageLength() {
    return checkVariableExists(window.browseHighPageLength) ? window.browseHighPageLength : 100;
}

function getNoOfItemsInGTMPost() {
    return getProductListContainerAttributeValue('noofitemsingtmpost');
}

function postGTMProductListing(d) {
    try {
        if (window.parent.dataLayer != null) {
            var columns = $("#activecolumns").val();
            var noOfItems = parseInt(getNoOfItemsInGTMPost());
            if (isNaN(noOfItems))
                noOfItems = 25;
            var prodCount = d.products.length >= noOfItems ? noOfItems : d.products.length;
            var prods = [];
            for (var i = 0; i < prodCount; i++) {
                prods[prods.length] = {
                    'variantId': d.products[i].ItemCode.toString(),
                    'position': (i + 1).toString()
                };
            }

            if (window.parent.dataLayer != null)
                window.parent.dataLayer.push({
                    'event': 'productListing',
                    'itemsPerRow': columns.toString(),
                    'listingProducts': prods
                });
        }
    } catch (e) {}
}

function showError(d) {
    logClientScriptException(d);
    window.location = window.location.origin + '/500';
    // redirect user to 500 page
}
function showComplete(d) {
    removeLoadingView();
}

function showLoadingView() {
    $('#ProductContainer').fadeTo(0, 0.5);
}

function removeLoadingView() {
    $('#ProductContainer').fadeTo(0, 1);
}

function inSingleBrowseBarMode() {
    return $('.singleBrowseBar').length != 0;
}

function getPaginationHtml(searchResult) {
    var paginationTemplate = $("#pagination-template").html();

    var pages = getPaginationItems(searchResult.numberOfPages, searchResult.currentPage, $("div.PageNumber").data('maxsearchdisplaypages'));

    var descFilterText = getProductListContainerAttributeValue('descfilter');
    var categoryNameValue = getProductListContainerAttributeValue('category');

    var pagination = {
        RawUrl: $("div.PageNumber").data('rawurl'),
        NumberOfPages: searchResult.numberOfPages,
        CurrentPage: searchResult.currentPage,
        ProductsPerPage: dpppVal,
        SortOption: getSortOptionSelectedValue(),
        IsSearch: !!descFilterText,
        NextText: $("div.PageNumber").data('nexttext'),
        PreviousText: $("div.PageNumber").data('previoustext'),
        Category: categoryNameValue,
        Pages: pages
    };

    var template = window.Handlebars.compile(paginationTemplate);

    return template(pagination);
}

function getPaginationItems(numberOfPages, currentPage, maxSearchDisplayPages) {
    var paginationItems = [];

    var alreadyShownPreviousEllipsis = false;
    var alreadyShownNextEllipsis = false;

    if (numberOfPages > 1) {
        if (currentPage > 1) {
            if (currentPage > 1) {
                paginationItems.push({
                    PreviousButton: true,
                    PageNumber: currentPage - 1
                });
            }
        }

        var searchDisplayPages = (currentPage == 1 || currentPage == numberOfPages) ? 3 : maxSearchDisplayPages;

        for (var i = 1; i <= numberOfPages; i++) {
            //suppress all pages significantly lower than the current page, always show the first page
            if (i > 1 && i < currentPage - searchDisplayPages + 1) {
                if (!alreadyShownPreviousEllipsis) {
                    paginationItems.push({
                        Ellipsis: true,
                        PageNumber: i - 1
                    });
                    alreadyShownPreviousEllipsis = true;
                }
                continue;
            }

            //suppress all pages significantly higher than the current page, always show the last page
            if (i < numberOfPages && (i + 1) > currentPage + searchDisplayPages) {
                if (!alreadyShownNextEllipsis) {
                    paginationItems.push({
                        Ellipsis: true
                    });
                    alreadyShownNextEllipsis = true;
                }
                continue;
            }

            if (i == currentPage) {
                paginationItems.push({
                    CurrentPage: true,
                    PageNumber: i
                });
            }

            if (i > currentPage) {
                paginationItems.push({
                    NextPage: true,
                    PageNumber: i
                });
            }

            if (i < currentPage) {
                paginationItems.push({
                    PreviousPage: true,
                    PageNumber: i
                });
            }
        }

        if (currentPage < numberOfPages) {
            paginationItems.push({
                NextButton: true,
                PageNumber: currentPage + 1
            });
        }
    }

    return paginationItems;
}

function productCountProductsPerPageEnabled() {
    if (productsPerPageInProductCountEnabled !== undefined)
        return productsPerPageInProductCountEnabled;

    productsPerPageInProductCountEnabled = $('#hdnProductsPerPageInProductCountEnabled').val() === 'true';

    return productsPerPageInProductCountEnabled;
}

var productsCountSingular;
var productsCountPlural;
function setProductCount(currentProducts, totalProducts) {

    if (productsCountSingular === undefined)
        productsCountSingular = $('.pppt').data('singular');
    if (productsCountPlural === undefined)
        productsCountPlural = $('.pppt').data('plural');

    var productCount = $('.pppt');
    $('.currentProducts', productCount).html(currentProducts);
    $('.totalProducts', productCount).html(totalProducts);
    var productCountText = totalProducts !== 1 ? productsCountPlural : productsCountSingular;
    $('.productsCountText', productCount).html(productCountText);
}

function ToggleSelectedFilter(name, key) {
    var filterPanel = $('#filterlist');

    var filterAnchor = filterPanel.find('.FilterListItem.' + name + '[data-productname="' + key + '"]').children('.FilterAnchor');

    SetVal(null, name, key, filterAnchor);
}

function setSelectedFilters(filters) {
    var filterContainers = $('.SelectedFiltersContainer');

    if (!filterContainers || !filterContainers.length)
        return;

    var selectedFilters = [];

    if (filters && filters.length)
        selectedFilters = filters;

    $('.SelectedFiltersWrapper').toggle(selectedFilters.length > 0);

    var template = $('#selected-filters-template').html();

    if (!template)
        return;

    var compiled = window.Handlebars.compile(template);

    var content = compiled({
        Filters: selectedFilters
    });

    filterContainers.html(content);
}

function displayFilters(event) {
    $('.hiddenMenuOpen').addClass('DesktopHide');
    $('#ToggleFiltersContainer').removeClass('DesktopHide');
    $('.toggleFilters').addClass('filtersOpen');
    if (event)
        event.stopPropagation();
}

function hideFilters(event) {
    $('.hiddenMenuOpen').removeClass('DesktopHide');
    $('#ToggleFiltersContainer').addClass('DesktopHide');
    $('.toggleFilters').removeClass('filtersOpen');
    if (event)
        event.stopPropagation();
}

function isToggleMenuEnabled() {
    if (toggleMenuEnabled !== undefined)
        return toggleMenuEnabled;

    toggleMenuEnabled = $('#hdnToggleMenuEnabled').val() === 'true';

    return toggleMenuEnabled;
}

function isStickyMenuEnabled() {
    if (stickyMenuEnabled !== undefined)
        return stickyMenuEnabled;

    stickyMenuEnabled = $('#hdnStickyMenuEnabled').val() === 'true';

    return stickyMenuEnabled;
}

function isFullWidthStickyMenuEnabled() {
    if (fullWidthStickyMenuEnabled !== undefined)
        return fullWidthStickyMenuEnabled;

    fullWidthStickyMenuEnabled = $('#hdnFullWidthStickyMenuEnabled').val() === 'true';

    return fullWidthStickyMenuEnabled;
}

function isHideToggleMenuOnScrollEnabled() {
    if (hideToggleMenuOnScrollEnabled !== undefined)
        return hideToggleMenuOnScrollEnabled;

    hideToggleMenuOnScrollEnabled = $('#hdnHideToggleMenuOnScrollEnabled').val() === 'true';

    return hideToggleMenuOnScrollEnabled;
}

function isToggleDesktopFiltersEnabled() {
    if (toggleDesktopFiltersEnabled !== undefined)
        return toggleDesktopFiltersEnabled;

    toggleDesktopFiltersEnabled = $('#hdnToggleDesktopFiltersEnabled').val() === 'true';

    return toggleDesktopFiltersEnabled;
}

function setupToggleMenu() {
    if (!isToggleMenuEnabled()) {
        $('.DesktopHidden').removeClass('DesktopHide');
        return;
    }

    $('#ToggleFiltersContainer').addClass('ToggleEnabled');

    $('.showFilters').click(displayFilters);
    $('.hideFilters').click(hideFilters);
    $('.toggleFilters').click(function(e) {

        var target = $(this);
        if (target.hasClass('filtersOpen'))
            hideFilters(e);
        else
            displayFilters(e);
    });

    $('#FilterContainer').scroll(function(e) {
        e.stopPropagation();
    });
    $('#FilterContainer').click(function(e) {
        e.stopPropagation();
    });
    $('#innerfiltercontainer').click(function(e) {
        e.stopPropagation();
    });

    if (isHideToggleMenuOnScrollEnabled()) {
        $(window).scroll(function(e) {
            // If scroll scrolls Refine off top
            var elementTop = $('.FiltersTitle').offset().top;
            var viewportTop = $(window).scrollTop() + 90;

            if (viewportTop > elementTop)
                hideFilters();
        });
        $(window).click(function(e) {
            hideFilters();
        });
    } else {
        $("#fixed-filters").mouseleave(function() {
            hideFilters();
        });
    }
}

function isSortOptionsTemplateEnabled() {
    if (sortOptionsTemplateEnabled !== undefined)
        return sortOptionsTemplateEnabled;

    sortOptionsTemplateEnabled = $('#hdnSortOptionsTemplateEnabled').val() === 'true';

    return sortOptionsTemplateEnabled;
}

function getSortOptionSelectedValue() {
    if (isSortOptionsTemplateEnabled()) {
        return $(".ddlSortOptions .ddlSortOption[data-selected='true']").data("optionvalue");
    } else {
        return $("[id$=ddlSortOptions] option:selected").val();
    }
}

function toggleSortOptions() {
    var options = $('.sortOptionsContainer');

    if (options.hasClass('ddlSortOptionsOpen')) {
        options.removeClass('ddlSortOptionsOpen');
    } else {
        hideFilters();
        options.addClass('ddlSortOptionsOpen');
    }
}

function updateStateOnSortOptionChange(currentSelectedOrderBy) {
    dcpVal = 1;
    var newViewByVal = $("a.pppl.selected").attr('data-dppp');
    if (!newViewByVal) {
        newViewByVal = getNewViewByValue();
    }
    var defaultStateKey = "#dcp=1&dppp=" + newViewByVal + "&OrderBy=" + currentSelectedOrderBy;
    var aPagehref = defaultStateKey.replace(/^#/, '')
      , option = $.deparam(aPagehref, true);

    // Add the filters
    var filterValues = getSelectedFilters();
    if (filterValues != null && filterValues.length > 0) {
        aPagehref += "&Filter=" + filterValues;
    }

    pushState(window.filters, '', aPagehref);
}

function setupSortOptionDropdown() {
    if (!isSortOptionsTemplateEnabled())
        return;

    $('.sortOptionsHeader').click(toggleSortOptions);

    $('.ddlSortOption').click(function() {
        var target = $(this);
        var currentSelectedOrderBy = target.data('optionvalue');
        setOrderByDdlValue(currentSelectedOrderBy);
        toggleSortOptions();
        updateStateOnSortOptionChange(currentSelectedOrderBy);
    });

    $(".sortOptionsContainer").on("mouseleave", function() {
        $(this).removeClass('ddlSortOptionsOpen');
    });
}

function getViewNumberType() {
    viewNumberType = $('#hdnProductListingViewNumberType').val()

    if (!viewNumberType) {
        return "Default";
    }
    return viewNumberType;
}

function isMobileCategoryCopyReadMoreEnabled() {
    if (mobileCategoryCopyReadMoreEnabled !== undefined) {
        return mobileCategoryCopyReadMoreEnabled;
    }

    mobileCategoryCopyReadMoreEnabled = $('#hdnProductListingMobileCategoryCopyReadMoreEnabled').val() === 'true';

    return mobileCategoryCopyReadMoreEnabled;
}

function getCategoryCopyElement() {
    return $(".textDesc");
}

function doCategoryCopyReadMore() {
    if (!isMobileCategoryCopyReadMoreEnabled()) {
        return;
    }

    if (window.innerWidth >= 1022) {
        setCatCopyText(categoryCopyText);
        $('#catCopyMobileReadMoreLess').hide();
    } else {
        toggleReadMoreLess(!categoryCopyExpanded);
        $('#catCopyMobileReadMoreLess').show();
    }
}

function setCatCopyText(text) {
    var catCopyElement = getCategoryCopyElement().contents().filter(function() {
        return this.nodeType == 3;
    })[0];
    if (catCopyElement) {
        catCopyElement.nodeValue = text;
    }
}

function toggleReadMoreLess(isExpanded) {
    var elem = getCategoryCopyElement();
    var existingReadMoreLess = $('#catCopyMobileReadMoreLess');
    if (categoryCopyExpanded !== undefined && existingReadMoreLess) {
        var spanTxt;
        var catCopyTxt;
        if (isExpanded) {
            catCopyTxt = categoryCopyShortText
            spanTxt = '...  Read More';
        } else {
            catCopyTxt = categoryCopyText;
            spanTxt = ' Read Less';
        }

        setCatCopyText(catCopyTxt);

        existingReadMoreLess.text(spanTxt);
        categoryCopyExpanded = !isExpanded;
        return;
    }

    var readMoreLessSpan = '<span id="catCopyMobileReadMoreLess">...  Read More</span>';
    setCatCopyText(categoryCopyShortText);
    var siblingLinkDiv = elem.append(readMoreLessSpan);
    categoryCopyExpanded = false;
}

// (function() {
//     // IIFE to set up category copy truncation
//     $(document).ready(function() {
//         if (!isMobileCategoryCopyReadMoreEnabled()) {
//             return;
//         }

//         var elem = getCategoryCopyElement();
//         if (!elem) {
//             return;
//         }

//         var node = elem.contents().filter(function() {
//             return this.nodeType == 3;
//         })[0];

//         if (!node || node.nodeValue.trim() == "") {
//             // No category copy text -> toggle setting off for current page
//             mobileCategoryCopyReadMoreEnabled = false;
//             return;
//         }

//         categoryCopyText = categoryCopyShortText = node.nodeValue;
//         var maxlimit = 100;
//         if (categoryCopyText.length > maxlimit) {
//             categoryCopyShortText = categoryCopyText.substring(0, maxlimit);
//         }

//         elem.on('click', '#catCopyMobileReadMoreLess', function() {
//             toggleReadMoreLess(categoryCopyExpanded);
//         });

//         doCategoryCopyReadMore();
//     });
// }
// )();



// CustomEvent polyfill for IE <=11
(function() {
    if (typeof window.CustomEvent === "function")
        return false;
    //If not IE

    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
}
)();

}