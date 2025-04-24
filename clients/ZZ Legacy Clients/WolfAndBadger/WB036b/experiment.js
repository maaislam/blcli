/**** Temp qubit code ****/

console.log('wb036b');

function require() {
    return function(){};
}

/*************************************************************/
/*************************************************************/
/*************************************************************/
/*************************************************************/
/**** Test code ****/
/*************************************************************/
/*************************************************************/
/*************************************************************/
/*************************************************************/
localStorage.setItem('uc036-category-page-motivation-active', 1);

// Full Story Integration
require('@qubit/poller')([
    function() {
        var fs = window.FS;
        if (fs && fs.setUserVars) return true;
    }
], function () {
    window.FS.setUserVars({
        experiment_str: 'WB036b',
        variation_str: 'Variation 1'
    });
});

var $ = jQuery;

$('body').addClass('UC036');

  // options
var _options = {
  images: {
    cross: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANlJREFUeNpi/P//PwMIdLa1GACpDUAcUF5Vc4GBCIBNDyPIQKjEASDmB+KPQOxAyFBcepg52ViQJUCAA4gjjx4+tMPG1u4FEYah6GGCOpkfTQ+IfwCqkZBhyHo2gAwMgDqZgZCheAxjgJoRgC0MsSl0gLLxqgGFISNaLOPTwEDIMHgsE+klBkKGYRhIoqFYkxeGgUQaijOtMjFQGdDWy1SNFKomG2ombGyFA1aFoIIClPlBhQC0MEAGBAsHrOEDZTvgyfs4Cwec6QyPoTgLB4oKWEZqVwEAAQYAE1vH5XsNOLAAAAAASUVORK5CYII=',
    plus_default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAglJREFUeNq8V9FxgzAMdbj8pxuUDcIGTSco/20vGYEN6kxQOkHTa/tdRiAb0A1gA5iAStwzp3KADS3RnY4E23qWLMmPVV3XylU+3z929PChRlLS/P7xIXe1s7KBAigivbPYKkhPrLYNDIICLCbdCqPsVQZluSINoHJTL6SawEtnUALU9HjC3zMMpJaI8AYOPJd0g02GtC6zgtJiDtGetGIjtChREwTgsbCx6wL/AhWA35hcqplCttjr1z7gFpQmcbI8/wfgALBvbHoY9HEWJqSlLYQI46iQnROSaoOQqxZUHL7uO/geSaHKAThCUu3hnPLwg8+xoAmxY+S2opRcRMsnexriRawWEoS5MFgMusNYopYVtr/hpmNAiym9c6aYHGhAOYGWBmRpK2LtWGdD432Nu7cLcRul+a2nFxFR1+XaIetOQx7S+GoCboBn5iGVgws4ay7+0sPdyKm8NLApzdQT9XlY+Dy5MVScYAa0afQuTXymHFCaTX54uFFivIwcjbxBXb3UstU29ykGcgDf2qjJxNAm4E9Hsqu7lzjH/GuouGcCtkyE7AXd+1SBCx3hbfrXbO5wrdBGzCQTbEMyAcxHwtw4EbNOz40FlWTgZIzGIDIRvDPUNexbM0a2DW/ai9dnNJOy095YrwUp12ihsz8rfNRZOEJRKtyXyRiYM+jA54aUfCoB+BFgAF4SFjuXBWlbAAAAAElFTkSuQmCC',
    plus_over: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAArxJREFUeNq8V72rGkEQP09U/D7SaCF4pYpEGzFgRNMIwkMF/wBTpbUJgVSmTOcrbRJ9zeN1aptGy5BGIRDsVNAUCcSTaHyYj8vM4h5+357RDAy3t3c7czM795vf6mRZ5lhFp9Ml4SL6fL5Hs9nsfjQaSXDfBh2AnQGzIXR6TMHBVSAQ+IivHlOn0/kN9DV+lJpN3aFI/X7/1WKxuBkOhw/w3uv1cslkkguHw0RRJEniut0u0Wazqay12WwVyMRLsC0xRxqPx+9oBIlEQm61WrKaTCYTuVwuY8RkndVq/QLX8D77OxORSOTDKl1yvV6XtQo6LxQKxLHJZFrsc7zXYSgUIov/RarV6kHHyiCdTr85l8NtxwaDYQ5XYcNpJpN56HA4/mBKO50OUwpZP6xYLBLHZrP5dsNpLBbr4gMsBBbBbKCyClQ+/bVE+reIOIEPWIVWttY0g9bI8nw+f6slylOc0miNRuMPXM6Px+PHGG4ul+MuKWh/uVyaCZQCevzSktpTI8V/frXuFQ9wpRdFkbu0CIKgjPljL9ZqNewsO7rWdXYUjSMWbwviNh3y3H8SbA50yFFQv/SeYtNQ9tTtdt/vS8e5ZTBQerzEezyez9PplLu043a7rQx5wMQbWjSX3M9Go8Hp9foZZJpEJ9jt9t8I9qwgrnVPEe1Wa64VwE+lUg2cLJVKTEawSaOyNnXKJhTAX6G+APTiJz5goSZaJJvNKlW708Sj0egzSlNYeiprRlbs4dNBugJ0s3Iux9QhFM/3bVq6j+dWaKGw7vG69Pt9AjZrDsOqbBA1GAw+p3uMHQibsFplY2ZodKgWi+X9Oi9iItsA3nh8eNvr9Z7QOYiAEO31jkHJNpBycg8f+3U+n78Au7WTjxW4H4Ba1y6Xa3zoSIE0E4jdOxg/VbN3NFKVQ9QGrGo6PIH8FWAAmHv+nibEeGQAAAAASUVORK5CYII='
  }
}

  //** UC Throttle **//
var UC=function(n){return n.throttle=function(n,t){var r,e,u,l=null,a=0;return function(){var i=Date.now||function(){return(new Date).getTime()};i=i(),a||(a=i);var o=t-(i-a);return r=this,e=arguments,(o<=0||o>t)&&(l&&(clearTimeout(l),l=null),a=i,u=n.apply(r,e),l||(r=e=null)),u}},n}(UC||{});
  
  
// UC infinite scroll 
// Infinite Ajax Scroll is not working 
// Amended -- images only have data-src so update src
var initInfiniteScroll = function() {
  var container = '#pjax-container .products',
    item = '.product-summary',
    pagination = '.pagination',
    next = '.pagination .next',
    isRunning = false;
    
  $(pagination).css('visibility', 'hidden');
    
  function loadNextProducts() {
    if(isRunning) {
      return false;
    }
    
    isRunning = true;
    
    if($(pagination).length && $(next).length) {
      var nextHref = $(next).attr('href');
      
      if(nextHref) {
        $.ajax({
          url: nextHref,
          success: function(data) {
            var div = $('<div>');
            
            div.html(data);
            
            var itemsToAdd = div.find(container).find(item);
            var nextNew = div.find(next).attr('href');

            // Update the images src to match data-src
            itemsToAdd.find('img').each(function() {
                var dataSrc = $(this).attr('data-src'),
                    src = $(this).attr('src');

                if(dataSrc != src) {
                    $(this).attr('src', dataSrc);
                }
            });

            // Add
            $(container).append(itemsToAdd);
            
            if(nextNew) {
              $(next).attr('href', nextNew);
            } else {
              $(pagination).remove();
            }
            
            isRunning = false;
            
          }
        });
      }
    }
  }
  
  $(window).scroll(UC.throttle(function() {
    // Run when pagination in view 
    var pOffsetTop = $(pagination).offset().top;

    if($(window).scrollTop() + $(window).height() >= pOffsetTop) {
      loadNextProducts();
    }
  }, 200));
}

function ui() {
    if (window.universal_variable.page.type === 'category') {
        /*Number Count*/
        $('.productcount').hide();
        
        var productNumber=$('.productcount').text().replace(/[^0-9]/gi, ''),
            amount = parseInt(productNumber, 10); 
      
        $('#filterpanel').prepend('<div class="uc36_productCount">Use the filters to narrow down your search</div>');
        
        var $trigger = $('<div class="uc13undercatrow"><div class="uc63itemcount">'+amount+' items</div><div class="uc63_viewall">View all items</div></div>'),
            $singlePageview = $('<div class="uc13undercatrow"><div class="uc63itemcount">'+amount+' items</div><div class="uc63pageview">View 60 per page</div></div>'),
            $maincontainer = $('#pjax-container').addClass('clearfix');
        var $loader = $('<div class="span3"></div><div class="UC036_ajax-loader span9"><div class="spinner"><div class="spinner-icon"></div><div class="UC036_ajax-loader-text">Loading more products</div></div></div>');
            $loader.hide().insertBefore('#back-to-top-row');
            
        $trigger.one('click', function () {
          $singlePageview.show();
          ga('send', 'event', 'UC036-v1','Clicked-View-All-Tab', {nonInteraction: 1});
          
          
          initInfiniteScroll();
            
          $loader.ajaxStart(function () {
            $(this).show();
          }).ajaxStop(function () {
            $(this).hide();
          });
            
          $(this).hide();
        });
            
        var topBar = $('#pjax-container .span9 .clearfix:first'); 
            
        $trigger.appendTo(topBar);
        $singlePageview.hide().appendTo(topBar);
        
        $singlePageview.click(function() {
          location.reload();
        });
        

       if(window.innerWidth > 767) {
        console.log($(".facets .accordion-toggle:not('.collapsed')"));
        $(".facets .accordion-toggle:not('.collapsed')").trigger('click');
       }
        
        
      
        /*DROPDOWN*/
        // ! No longer relevant w/ their redesigned filter system
        /*var dropdown = $('#sort-select');
        
        $('<option class="uc63-sort" value="none" selected>Sort By</option>').prependTo(dropdown);
        dropdown.parent().find('.title').hide();
        */
        /*dropdown.click(function(){
          ga('send', 'event', 'UC036-v1','Sort-by-Button-Clicked', {nonInteraction: 1});
        });*/
      
        
        /*FIXED ELEMENTS*/
        var searchHeight = topBar.outerHeight();
        var offset = topBar.offset().top;
        var totalHeight = offset - $('#header .navbar-inner.container').outerHeight() - 40; 
        var $footer = $('#footer');
        //var leftSideWidth = leftSide.width();
          
        // Window scrolling 
        var winScrollTimeout;
        $(window).scroll(function() {
          clearTimeout(winScrollTimeout);
          winScrollTimeout = setTimeout(function() {
            if ($(document).scrollTop() >= totalHeight) {
              topBar.addClass("fixed");
              topBar.css({
                width: $('#pjax-container .span9').width() + (window.innerWidth <= 767 ? 20 : 0)
              });
            } else {
              topBar.removeClass("fixed");
              topBar.css('width', 'auto');
            }
            
            var windowTopPos = $(window).scrollTop();
            var footerTopPos = $footer.offset().top;
            var fixedtabPos = topBar.offset().top + topBar.outerHeight();
        
            if(fixedtabPos >= footerTopPos) {
              topBar.removeClass("fixed");
              topBar.css('width', 'auto');
            }
          });
        });
        
        /*SIDEBOX*/
        
        var sideBox = $('<div class="uc36_sideBox"><div class="uc36_sideboxText">Shh...Did you know?</div><p>Our 14 day returns policy starts from the day the you receive your order.</div>');
        sideBox.appendTo('#filterpanel');
        
        var sideBoxSave = $('<div class="uc36_newbadge">New!</div><div class="uc36_sideBox uc36save"><div class="uc36_sideboxText save">In a hurry? <br> Save your favourite products for later</div><ul class="uc36-hurrylist"><li>Click the <img width="14" height="14" alt="+" src="' + _options.images.plus_over + '" /> icon to start saving</li><li>No sign in required</li><li>Compare products quickly & easily</li><li>Products are saved under the <img width="14" height="14" alt="+" src="' + _options.images.plus_over + '" /> in the top right of the menu</li></ul></div>');
        sideBoxSave.appendTo('#filterpanel');
       
       // Amend move filters 
       if(window.innerWidth <= 767) {
         $('.uc36_sideBox').insertAfter('.facets.hidden-phone');
       }
       
       // Show long cat names 
       var catNameLength = $('.categoryinfo h1').text().trim().length;
       if(catNameLength > 10) {
         $('.categoryinfo h1').addClass('uc36_long-cat-name');
       }
       
       // Remove the fast track if new in already exists
       require('@qubit/poller')([
         '.banner-container'
       ], function () {
           $('.categoryinfo').addClass('uc36-newin-exists');
       });
       
       // Show class on filters open 
       $('#filterpanel .facetmenubuttons a').on('click', function() {
         var that = this;
         setTimeout(function() {
           if($(that).hasClass('open')) {
             $('#filterpanel').addClass('uc36_open');
           } else {
             $('#filterpanel').removeClass('uc36_open');
           }
         }, 300);
       });
       
       // Move breadcrumb 
       if(window.innerWidth <= 767) {
        $('#filterpanel .breadcrumbs').addClass('uc36_breadcrumbs').prependTo('#global #content');
       }
    } // End category page code
}
ui();

$(document).on('pjax:success', ui);

function fastTrack() {
    if (window.universal_variable.page.type === 'category') {
       /*Fast Track*/
        var fastTrack = $([
          "<div class='UC36_fastTrack_wrap'>",
            "<p>Know what you're looking for? Use the fast track links to navigate quickly and easily</p>",
            "<div class='uc36_topLinks'></div>",
          "</div>"
        ].join(''));
        var fastTracklinks = fastTrack.find('.uc36_topLinks');
        var topCategoryContainer = $('.categoryinfo');
        topCategoryContainer.prependTo('#content');
        
        
        fastTracklinks.click(function(e){
          ga('send', 'event', 'UC036-v1','Fast-Track-Link-Clicked', $(e.target).text().trim(), {nonInteraction: 1});
        });
        
        /*
        if($('.categoryinfo.hidden-phone h2').length) {
            $('.categoryinfo.hidden-phone h2').after(fastTrack);
        } else {
            $('.categoryinfo.hidden-phone h1').after(fastTrack);
        }

        $('.categoryinfo.hidden-non-phone h1').after(fastTrack.clone());
        */
        $('.categoryinfo').append(fastTrack);

        $('.facet.accordion-group .accordion-inner .facet-options:first li:nth-child(-n+4)').clone().appendTo('.uc36_topLinks');
      
      if(window.location.href.match(/category\/[^\/]+\/[^\/]+\/[^\/]+\//)) {
        // on 3rd level + categories hide the fast track links 
        $('.UC36_fastTrack_wrap > p, .UC36_fastTrack_wrap > .uc36_topLinks').hide();
        $('.UC36_fastTrack_wrap').addClass('uc36-fasttrack-hide');
        $('.UC036 .categoryinfo h1').addClass('uc36-no-margin-bottom');
      }
    }
}
fastTrack();

// ------------------------------------------------------
// SHOPPING LIST 
// ------------------------------------------------------

UC.ShoppingList = UC.ShoppingList || {};
UC.Money = UC.Money || {};

/**
 * Data storage adapter for Local Storage
 */
UC.LocalStorageAdapter = (function() {  
  /**
   * @constructor
   */
  function LocalStorageAdapter() {
  }
  
  /**
   * Is local storage available?
   */
  LocalStorageAdapter.prototype.isAvailable = function() {
    if (typeof localStorage !== 'undefined') {
        try {
            localStorage.setItem('ucxx-feature_test', 'yes');
            if (localStorage.getItem('ucxx-feature_test') === 'yes') {
                // localStorage is enabled
                localStorage.removeItem('ucxx-feature_test');
                return true;
            } else {
                return false;
            }
        } catch(e) {
            return false;
        }
    } else {
        return false;
    }
  }
 
  /**
   * Get value from key
   *
   * @param {string} key
   * @return {string}
   */
  LocalStorageAdapter.prototype.getItem = function(key) {
    return localStorage.getItem(key);
  }
  
  /**
   * Set value for key
   *
   * @param {string} key
   * @param {string} value
   * @return {LocalStorageAdapter}
   */
  LocalStorageAdapter.prototype.setItem = function(key, value) {
    localStorage.setItem(key, value);
    
    return this;
  }
    
  /**
   * Remove an item by key
   *
   * @param {string} key
   * @return {LocalStorageAdapter}
   */
  LocalStorageAdapter.prototype.removeItem = function() {
    localStorage.removeItem(key);
    
    return this;
  }
  
  return LocalStorageAdapter;
})();

/**
 * Shopping List for saving shopping items in local storage
 */
UC.ShoppingList.List = (function() {
  /**
   * @constructor
   *
   * @param {StorageAdapter} storageAdapter
   * @param {string} listName
   */
  function List(storageAdapter, listName) {
    if(!storageAdapter.isAvailable()) {
      throw "Storage is not available.";
    }
    
    this.storage = storageAdapter;
    this.listName = listName; 
    
    var listInStorage = this.storage.getItem(this.listName);
    if(listInStorage) {
      this.list = this.unserializeList(listInStorage);
    } else {
      this.list = []; 
    }
  }
  
  /**
   * Saves the list to storage
   *
   * @return {ShoppingList}
   */
  List.prototype.saveList = function() {
    var listSerialized = this.serializeList(this.list);    
    this.storage.setItem(this.listName, listSerialized);
    
    return this; 
  }
  
  /**
   * Add an item to the list.
   * Prevent duplicate products added by ID
   *
   * @param Product
   * @return {ShoppingList} 
   */
  List.prototype.addProduct = function(product) {
    var existingProduct = false;
    for(var i = 0; i < this.list.length; i++) {
      if(this.list[i].id === product.id) {
        existingProduct = true;
        break;
      }
    }
    
    if(!existingProduct) {
      var productObject = product.toObject();
      
      productObject.timestamp = (new Date()).getTime();
      
      this.list.push(productObject);  
    }
    
    return this;
  }
  
  /**
   * Remove a product by ID 
   *
   * @param {string} id
   */
  List.prototype.removeProduct = function(id) {
    this.list = this.list.filter(function(item) {
      return item.id != id;
    });
    
    return this;
  }
  
  /**
   * Empty list
   *
   * @return {ShoppingList}
   */
  List.prototype.emptyList = function() {
    this.list.length = 0;
  }
  
  /**
   * Get the unserialized list
   *
   * @return {object}
   */
  List.prototype.getList = function(order) {
    // JSON.stringify not keeping orders sane so sort here 
    var listSorted = this.list.sort(function(a,b) {
      return a.timestamp < b.timestamp ? -1 : 1;
    });
    
    if(order == 'desc') {
      return listSorted.reverse();
    } else {
      return listSorted;
    }
  }  
  
  /**
   * Get the unserialized list
   *
   * @return {object}
   */
  List.prototype.unserializeList = function(list) {
    try {
      return JSON.parse(list);
    } catch(e) {
      throw 'JSON parse error trying to unserialize ShoppingList!'; 
    }
  }
        
  /**
   * Serialize a list
   *
   * @return {JSON}
   */
  List.prototype.serializeList = function(list) {
    return JSON.stringify(list);
  }
  
  return List;
})();

/**
 * Shopping list product
 */
UC.ShoppingList.Product = (function() {
  /**
   * Required attributes
   *
   * @constructor
   */
  function Product(id, name, brand, price, beforeSalePrice, currency, productUrl, productImageUrl) {
    this.attributes = {};
    
    if(!id) {
      throw "Product must have an ID";
    }
    
    this.id = id;
    
    this.attributes.id = id;
    this.attributes.name = name;
    this.attributes.brand = brand;
    this.attributes.price = price;
    this.attributes.beforeSalePrice = beforeSalePrice;
    this.attributes.currency = currency;
    this.attributes.productUrl = productUrl;
    this.attributes.productImageUrl = productImageUrl;
  }
  
  /**
   * Get an attribute
   * 
   * @return {mixed}
   */
  Product.prototype.getAttribute = function(attribute) {
    return typeof this.attributes[attribute] == 'undefined' ? null : this.attributes[attribute];
  }
  
  /**
   * Add an attribute to the product
   *
   * @param {string} attribute
   * @param {string} value
   */
  Product.prototype.addCustomAttribute = function(attribute, value) {
    this.attributes[attribute] = value;
  }
  
  /**
   * To object
   *
   * @return {object}
   */
  Product.prototype.toObject = function() {
    return this.attributes;
  }
  
  /**
   * Return serialized product
   *
   * @return {string}
   */
  Product.prototype.serialize = function() {
    return JSON.parse(this.attributes);
  }
  
  return Product;
})();

/**
 * Money formatter wth custom symbol to code mapping
 */
UC.Money.Format = (function() {
  var currencySymbolMap = {
    'GBP': '£',
    'USD': '$',
    'EUR': '€'
  };
  
  /**
   * @constructor
   */
  function Format(num) {
    this.num = num;
  }
  
  /**
   * Set currency string e.g. GBP
   *
   * @param {string}
   */
  Format.prototype.setCurrency = function(currency) {
    this.currency = currency; 
    
    return this;
  }
  
  /**
   * Format money with thousands separator and period
   *
   * @param {number} decimalPlaces
   * @param {number} period
   * @param {number} comma
   * @return {number}
   */
  Format.prototype.formatMoney = function(decimalPlaces, period, comma, withSymbol){
    var n = this.num, 
      c = isNaN(decimalPlaces = Math.abs(decimalPlaces)) ? 2 : decimalPlaces, 
      d = period == undefined ? "." : period, 
      t = comma == undefined ? "" : comma, 
      s = n < 0 ? "-" : "", 
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
      j = (j = i.length) > 3 ? j % 3 : 0;
    
    var result = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) 
      + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    
    if(withSymbol) {
      result = (typeof currencySymbolMap[this.currency] != 'undefined' ? currencySymbolMap[this.currency] : '') + result;
    }
    
    return result;
  };
  
  return Format;
})();

// ------------------------------------------------------
// Hide the wishlist
// ------------------------------------------------------
$('.product-summary .quick-add-to-wishlist').hide();
$('#right-nav #wish-link').hide();

$('.product-details-container .wishlist.ajax-submit').hide();

// ------------------------------------------------------
// Build shopping list 
// ------------------------------------------------------
try {
  var localStorageAdapter = new UC.LocalStorageAdapter();
  var shoppingList = new UC.ShoppingList.List(localStorageAdapter, 'uc036-shopping-list');
  
  var currency = window.universal_variable.basket.currency;
  
  // Populate shopping list items from wishlist
  // This is only going to apply to users who got bucketed into the test and then login 
  // as we don't generally run the test if a user already has items in their wishlist 
  // @see triggers.js 
  var wishlistItems = window.universal_variable.wishlist.items;
  if(window.universal_variable.user.has_wishes_in_wishlist &&wishlistItems) {
    
    if(wishlistItems.length > 0) {
      for(var i = 0; i < wishlistItems.length; i++) {
        var title = null, designer = null, price = null, beforeSalePrice = null, productImageUrl = null, designerUrl = null;
        var identifier = wishlistItems[i].url.replace(/^\/?(uk|us|au)/, '').replace(/\//g, '').toLowerCase().trim();
        
        var productUrl = wishlistItems[i].url.replace(/^\/?(uk|us|au)/, '');
        var shoppingListProduct = new UC.ShoppingList.Product(identifier, title, designer, price, beforeSalePrice, currency, productUrl, productImageUrl);
          shoppingListProduct.addCustomAttribute('designerUrl', designerUrl);
          shoppingList.addProduct(shoppingListProduct);
      }
      
      ga('send', 'event', 'UC036-v1','Populated-Existing-Wishlist-Items', {nonInteraction: 1});
    }
    
    shoppingList.saveList();
  }
  
  var buttonHtml = [
    '<div class="uc36_add-to-wishlist">',
      '<span>Save</span>',
      '<img src="' + _options.images.plus_over + '" />',
    '</div>'
  ].join('');
  
  function addCatListingButtons() {
    // On category page add the 'add' button to each product
    $('.product-list .products .product-summary').each(function() {
      var productImageWrapper = $(this).find('.product-image:first');
      var addToWishlistButton = productImageWrapper.append(buttonHtml);
      
      $(this).on('touchmove', function(e) {
        $('.product-summary .uc36_add-to-wishlist.uc36_touchevent').removeClass('uc36_touchevent');
        $(this).find('.uc36_add-to-wishlist').addClass('uc36_touchevent');
      });
    });
  }

  addCatListingButtons();

  $(document).on('pjax:success', function() {
      addCatListingButtons();
      
      $('.product-summary .quick-add-to-wishlist').hide();
      $('.product-details-container .wishlist.ajax-submit').hide();
  });
  
  // On product page add add to wishlist button in place of wishlist heart 
  $('.product-details-container .wishlist-add-form-container').append(buttonHtml);
  
  // Handle adding product page item to wishlist 
  $('.wishlist-add-form-container').on('click', '.uc36_add-to-wishlist', function() {
    var productUrl = window.universal_variable.product.url,
      identifier = productUrl.replace(/^\/?(uk|us|au)/, '').replace(/\//g, '').toLowerCase().trim();
    
    addToWishlist.call(this, productUrl, identifier);
  });
  
  // Handle adding category page item to wish list
  $('.product-list').on('click', '.uc36_add-to-wishlist', function() {
    var product = $(this).parents('.product-summary'),
      productLink = product.find('.product-link:first'),
      productUrl = productLink.attr('href').replace(/^\/?(uk|us|au)/, ''),
      identifier = productUrl.replace(/^\/?(uk|us|au)/, '').replace(/\//g, '').toLowerCase().trim();
    
    addToWishlist.call(this, productUrl, identifier);
  });
  
  function addToWishlist(productUrl, identifier) {
    // State
    $(this).children('span:first').text('Saved!').addClass('uc36_flash');    

    var title = null, designer = null, price = null, beforeSalePrice = null, productImageUrl = null, designerUrl = null;
    
    var shoppingListProduct = new UC.ShoppingList.Product(identifier, title, designer, price, beforeSalePrice, currency, productUrl, productImageUrl);
    shoppingListProduct.addCustomAttribute('designerUrl', designerUrl);
    shoppingList.addProduct(shoppingListProduct);
    
    shoppingList.saveList();
    
    // Update the shopping lis
    populateShoppingList();
    
    // Product added event
    ga('send', 'event', 'UC036-v1','Product-Added-To-ShoppingList', {nonInteraction: 1});
    
    // Show animation on shopping list init icon
    $('.uc36_shopping-list-init-icon').addClass('uc36_animated uc36_shake uc36_active');
    $('.uc36_shopping-list-init-icon').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $(this).removeClass('uc36_animated uc36_shake uc36_active');
    });
  }
  
  // Show the list in the header - should poll for changes to the list
  $('.navbar-inner #wish-link').after([
    '<li id="uc36_shopping-list-init">',
      '<span class="uc36_shopping-list-init-icon"></span>',
    '</li>'
  ].join(''));
  
  $('#uc36_shopping-list-init').append([
    '<div class="dropdown-menu uc36_shopping-list-items">',
      '<h2><img src="' + _options.images.plus_over + '" /> <span>Saved Items</span></h2>',
      '<img title="Close" width="25" height="25" class="uc36_close" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20version%3D%221.1%22%20height%3D%2214%22%20width%3D%2214%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2014%2014%22%3E%0A%3Cpath%20stroke-width%3D%22.7%22%20stroke%3D%22%23231f20%22%20stroke-linecap%3D%22round%22%20d%3D%22m9.5827%209.5799-5.165-5.165m0%205.165%205.165-5.165m3.156%202.585c0%203.1688-2.57%205.7388-5.7388%205.7388s-5.7388-2.57-5.7388-5.7388%202.57-5.7388%205.7388-5.7388%205.7388%202.57%205.7388%205.7388z%22%20fill%3D%22none%22%20%2F%3E%0A%3C%2Fsvg%3E%0A" />',
      '<ul></ul>',
    '</div>'
  ].join(''));
  
  // Create another copy of the init icon as new design has this on smaller screens 
  $('.navbar-inner .nav#left-nav #wish-link-mobile').html(
    '<span class="uc36_shopping-list-init-icon"></span>'
  );
  
  /*$('#content').prepend([
    '<div class="uc36_mobile-init">',
      '<h2><img src="' + _options.images.plus_over + '" /> <span>Saved Items</span></h2>',
    '</div>'
  ].join(''));*/
  
  $('.uc36_shopping-list-init-icon').on('click', function() {
    $('#uc36_shopping-list-init').toggleClass('open');
    $(this).toggleClass('uc36_active');
    
    ga('send', 'event', 'UC036-v1','Clicked-Shopping-List-Button', {nonInteraction: 1});
    
    return false;
  });
  
  $('.uc36_mobile-init').click(function() {
    $('#uc36_shopping-list-init').toggleClass('open');
    $(this).toggleClass('uc36_active');
    
    ga('send', 'event', 'UC036-v1','Clicked-Shopping-List-Button', {nonInteraction: 1});
    
    return false;
  });
  
  $('.uc36_shopping-list-items').on('click', '.uc36_close', function() {
    
    ga('send', 'event', 'UC036-v1','Clicked-Shopping-List-Button', {nonInteraction: 1});
    
    $('#uc36_shopping-list-init').removeClass('open');
    return false;
  });
  
  /**
   * Helper populates the shopping list container
   */
  function populateShoppingList() {
    $('.uc36_shopping-list-items ul').empty();
    
    var list = shoppingList.getList('desc');
    if(list.length === 0) {
      $('.uc36_shopping-list-items ul').append('<li class="uc36_shopping-list-items-product text-center">Your list is empty.</li>');
    } else {
      $.each(list, function(idx, product) {
        $('.uc36_shopping-list-items ul').append([
          '<li class="uc36_shopping-list-items-product" id="uc36_list-item-product-' + product.id + '">',
            '<img class="uc36_loader" src="data:image/gif;base64,R0lGODlhHgAeAPf2AP7+/v39/fDw8O/v7/z8/PHx8e7u7vv7++Xl5fr6+vn5+ebm5gAAAPX19fT09Pb29vPz8/f39/j4+Ofn5/Ly8tTU1O3t7dXV1cnJyezs7Ojo6Orq6uTk5OPj476+vuvr69nZ2cjIyNbW1unp6crKytjY2MvLy9zc3LOzs7KyssfHx+Hh4b+/v9/f3+Li4tPT097e3sDAwNfX193d3dra2sHBwYmJidvb2+Dg4L29vby8vM/Pz7e3t9LS0sTExNDQ0LS0tIiIiLW1tcbGxszMzLi4uLq6uoyMjHBwcMPDw8XFxVhYWLGxsXFxccLCws7Ozra2trCwsG9vb42Njbm5uc3NzXNzc4qKilpaWtHR0bu7u3JycpKSkjs7O3Z2dq+vr66urj09PVlZWaioqKSkpISEhIKCgpqaml5eXnR0dJGRkSIiIltbW2lpaaWlpYaGhouLi1NTUz4+PqmpqXh4eI6OjpWVlZCQkJSUlJ6enpiYmJycnKqqqmpqakNDQ4eHh6Kiop+fn6ysrCUlJW5ubklJSa2trVRUVIODg4WFhUBAQCAgIKGhoV9fX0FBQYGBgaamppaWlmxsbFxcXGBgYFdXV5OTk5mZmTY2NiQkJB8fH21tbXl5eVBQUDw8PHt7ez8/P11dXX9/fzU1NSgoKJubm2dnZzQ0NDMzM52dnVFRUWtra5eXlyoqKk5OTiMjI1VVVQoKCmRkZE1NTaurq0ZGRjk5OTc3N35+fo+Pj0VFRX19fSEhISkpKURERBsbGywsLCcnJ6enpxgYGB4eHmJiYlJSUhoaGk9PT3V1dWFhYR0dHUdHRwUFBQcHBzg4OICAgCsrK6CgoFZWVi4uLmNjY3x8fGhoaGZmZkJCQkhISBYWFmVlZTo6OkxMTBISEnp6eqOjoxUVFS0tLQsLCxwcHBcXFzIyMhkZGRERERMTEzExMQ8PDw4ODiYmJgICAnd3d0pKSgQEBDAwMA0NDf///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgD2ACwAAAAAHgAeAAAI/wDrCRxIsKDBgwgRNoCQsGHCO1YcNgwgZMBAAJjMPRgY4AEAiQOnxbFYD0EsBkQEBihgIABIgTbETWJYgwEDQPVWDijwUuCQYJoe1Rtj8009BwIENOhZT4GqYK+o8GnHDhGAnQIIOIxxhcoIgXuGUbNDYcGEDA0MCGBYLwGFDAIMtuiESZUZDBZ2lTCoYECCBxkWIOgQ4SAMLF1AdZnTsECHBZCXIpzgpYu2vQklIEAwobBDMmokZjDwMaGDFSVOsG2YwAEFBwoKQmAxRUq1SZNgSJQgosIFGTA2xK6nIQiaSkvELKEhMcKFCxWi01hdb4ISQXkCLZCYYIILBBk8JsTMUEMiAp4OA9T4hOREQwgYSOA4kDCAMEJW+uhpCGKIiRAXJHCQBIC0IQU0goygAg4GDQBCAzg8gYEKFdBXUAicXFJDXB0EcYQQFFhgAAQgxKDFdgpMIIMJLhj0wEYDfXFFEEMskAITN0zgQQwmuCTQAQI2NAAXNrgRQAcopABCPT14wIIFTFWRCB4f1LNAku41oIQOS/YExhQtCCQAFChMIFABSWBQGkgxIDDQAR7wAONRJWjFFEE/DHGnQwVAueefBgUEACH5BAUKAPYALAEAAQAcABwAAAj/AO0JHEhwoAEDBRMqXFjHxsKHAgHUeDCQQC0/CQY6+BIA4kBJdCQIvDEOWAmBB1zJqedRYKlzIe1pGZQJij0FnRjQaSnwSbYud+y54bWIkb0tDBjE4GnvARZffmaQyTQo3JOkpDIuBKKGxwKBbjAxgwLhBowHWsoxCCJQgQMBDgh2KBZH1hQaFB7RSCgA2ogDAgYIMCCSIAhJbBLzgAjBQIECAyIotGCmEqUTEBMYCKxVYYAidloKgNBRoQB7J2Yg9HigQYQICQAIdOCBi7VkVja94MlhAYIFGgYQsKdmixQkSNr8aCmh9wLfCyT3rMEDSIeWBwwMKAChcEIDPoZDt8wgfWE9JQ2vP0xQ4sIClgkjgLEx5Q0tiBxeyLgAI2ECYWXYYAkLEvSwQUIQtEAAAiJc8MIJ4glkgh6GmACBPQukIMQFhUngAgkqHGjPCC2UoAFBCsgWUQxCoDABBzro4MIHIZBQAXz2ABChQlAA4UQ9HHjggQv2vEACCRQwRUMUVJymAQsefOXAEyqo15IKPKxmTwwsDCAQBCZcgCNEO5w2kBI+dAbBCSp6VNpAFfTAVEsUXNhSQAAh+QQFCgD2ACwBAAEAHAAcAAAI/wDtCRxIcKAACgUTKlzIhcvChwIPJEkwUMGSaREGPrB3AOJAL4gcDNTlC4RAC4dmeRx4plMZBfaGOAJVw96DJdtWDjTBZokbezrkhBFi79GiVyl02ouwBU0oGEEVFXGyppUcAQ9j6GHBQWAOWGi+FDjRAsKYLsP2CBTB5ZAagiM+9fHCyh6AOzISZvhTwEmhZgzUzSjY4RGSLU2iQBTEoPGyCgozsJLSZAdECKcYFMLxsJ6TPCt53KmnEMCADjBaDFhZr14CCQoCCISQRJqaI3De0Fh5wIIAAQMOHhghbIqN42VKrExgocDvAQZg2jMAosqQJBtWBnDgoMED6QkbXLAgfbkBRAIVgKAYcR4BBwuyEypQkgJKiiEAHn7gMAGBho4FJRFFCkWAcMAFHyR0wAa9IeCgBgXRoAMGJ5i3QQ4e5HWQAhuAUEEBAgnwwQIGEASgQAGQEEMOHHygggoaFPCCCDTkN1B8ClnAAgtP2LMBBhhAeIIIFyhlDwg6+GBeBkBmJ0EJFSCgFAZOYGVPASRgMJADFwymXQkICaQAEVWA90AHSpE3kAh5GQmRSDoFBAAh+QQFCgD2ACwBAAEAHAAcAAAI/wDtCRxIcOAGDQUTKlyYh9XChwLrhaAwkMAWSRIGFkhRD+JAO38aCORACQ0MgRGwtfE4kEebSAfsPWGDRYW9AHRORWIpcIYVQl/sxRAjpoi9PZ4UmXgIgGA9NVaagHACa0mOHaD8YGs6MABBDGRiuPC6gxASewJudGgA5dAoowlUBLF3hKADPWXgBHqh4FKFhBQCZTDkzd0vTB0KCthzZUoQPl4XchnWapAcGgodgLERxObDAYqWhVoAUQSkCB7HAHr4IAOCDzwJ1ChCZENHew1ExOABBAWY2LwYMIi1TtQCCiao9PZ9g2WAV8IZfJvUQuABCy5O4LDAMkEpO4Z6SLa4XXBAj5gQG0R+KMODjhUeLQwQQGAhEQ9OcmCAOGAABQEGJEQACTp4kMQNEoAggIAGKADBfAUMUNAMSfTAgQL2GBACBjAcIMEBBxSAQAcQ2EOAAwAWQFB9A9VTgQkhjCBABSJkAAECEyDUFVcKFYABBiUIVMFf9mywAAIi8eSCCj8kkOGQGZg4AQLc8XSBCQ8I1MAFFVBkTwII6OhRPSs4UFEJMqBnjwIZkMfTQDic9CZLXnoUEAAh+QQFCgD2ACwBAAEAHAAcAAAI/wDtCRxIcKCBEQUTKlw4JtXChwIB7HAwMEGZXQ8GPjBCAOJAPqwyCPzAKc2KkV5weRyoAtEeCPZmpGnywt6DXZ3IrBQ4oU4QJvZ6NEESwl6gSqFqLgxAMACjIzZo/OjTRkUJNo2aSHh4woeIDQeC/rGRQgORLAbAyDokxN6BC2S20CKoIMcXIDluBACzIyxBDW4cCJGla1ScDQUheEghJEUIvwrn3PITZtIMhRGIoEjRwiMWW2ZEPvxgAvLCIloWJihgb8ICATuFGPLQY8DAF0pisPBgBMZKCrc0DWplq4+IBll81Njde2WDbsQGRbNVLIvABBQ2cOgA2yMAFJCoVLrorhAEU4hKgEBUcAJDiA8e5TBoJLpghCwYTIQQUe8hDwYAjuMbQQn8MAQJP7hwAAIUJUQBBWfMA+AiCA00QQ8tGNBRBi/IsIA9EWxFgQEGNCCQCWYwg0dT/UVEgwgvCACBCy4I8MAABQxwnj317JiQAyJcAAMAECCAAGsFCCBABDu19kIJWzVgJEUHGCAABU3OIEODCiywAJP2KEAiACsBsIACAwXgWgIDEQCBj03as4EGcXokwVYrBQQAIfkEBQoA9gAsAQABABwAHAAACP8A7QkcSHCghQ0FEypcyGPOwocDQTQYeOCMJYINWByAODAEDwMDc02ZIDDDmyMcB9KIYmTiiiNXZNhrMOUak5QCBwhBEcLeiSs2qtgbQ8gKCJwCYwhJsYBGGURP7DVJ8ycBwY0DOWA4arVDCiAkPvzokeFLsj4s7CkYKurmwAQhtLBQMuPAkxUECAJYMeeBjjRoVCERUPABCQ81PJjI+zAOGjFpOChMIMNDDhcQR7RZEonwwwwVAnA0smOhAgoWBBZIKaEIFB8XPD+QUYUEBgxKJHM0EK+LIj/IvNx4cGOHCdtKSHIsMCuMn0KVzKwQSKDBgA0jHKQMoKLGDxcPFkK0QFCPYwpAHHG8EDHxoYNCx6q1WAjigogKHSAyOUZqTZfSBZXwwgUgaBDABhIoNIYGkMwSDTqjYDaQBicsQIFoBXCAQAYEKJBAPTncwkAQ9hywAx6hqKEXQQFMMAECBTyQgQUEGMEAA4skiFMECCyAUAQFCKDdFjd6gNQAHCxglQQCCDDRA3IwsAVSGiAQwUADCLCWPRnYgkp5HNUjgFXUZcmYPREEQiZSAxUwAJscHbAlRwEBACH5BAUKAPYALAIAAQAbABwAAAj/AO0JHEhQIAQDBRMqVPhDycKH9urNIBggB48IAyP4gDiwipMCAgtAQaHBYKpLADjaO6Fjo70FKFBMlMCojBCVAlmwIGJvRUwR9qDYsCFjYT2CAEzE8DACARgwNEYcqaNHAcGjAhf0aDEg5YQcHp4YODFRy5s/GCJ24GGpCMEsKjBkmWBvx40EBA/8gGSvh6U0fUR9IJjgAgYTIbIceAhokxUpUwQkJHADQ4iSD1ekkZLKwUMDNLA+pJJFIQEHBjQYkKDSgQcjQ2Y8ELiixIUKFXqA5KiBzRIsaFbdaVH7doUXDVQOaPQbjSRLOASiHmGBNccESWDDwJiwgQWVOYw8sCTwAQEH6wslUHoGTnJBAhoWTEAwAmIUTNnCyBo88MACBAhMUEACBlhVEARwLJBEE7qMEkcHAw0wgQXJ2dPAABZAoABrCnjgiDl4RHSDNEgEMpBo9gAwQAECBDDHMprk8sQawHiym0AoFrTiAPWMwQADiAi0xhpR4ERBAQjZw8KPe9hTgDfHNIHTAKsJhEMzDCQh0ATMgBKAShRQFAw5Nw5wxGw4EZSGK2lyhAAIOAUEACH5BAUKAPYALAEAAQAcABwAAAj/AO0JHEhwYAIIBRMqXAjDxMKHAzs4GAiASIwHAw+AUABxoAgSAwRGSOJhgsAHTowQ6CiQgwoiEwew8CCQgJIvKlgKhECCRA8AG1iwAGHvRQoUNx4GAEDwI4YOI7RoEWEACJQiEQiuHLihxAoDB+wJCBGiAoUOHQxcYMKkxMAYjLQwFXjgxIsLJTQQgIEg7EACC0JIKOHmSCI1CwoegFFBRoUTcxWieHPExpkNCgOsqHBBAEQYcIK4CfkQggaWSSo8fEBBwIAELCE4qUGkRQOBCT4sQIBgAQeMHREgkYLECq5AHQ5kmMAbQYesHTU0kdIkjRkyHAQGiAChwAC/EBWYxRiyYwVHhREKsGQRo6NrC+cXUpACC5fJhAcGFKAwgPRCKktMggUSMxREgAGuDeAAAJCoV1ADl12ACCVxUELUQA8YoN5KGDDQChn2FFAABENgcUoeAs0giBmAEARAZPWowgADb/iAySiJZAGKL3FYQFAAD4HQDAO+2KMDL5pYYw8gnoTBh0724MGAJh3YY0Iva9xhTwCfoMIJlJ0Q84JAI9yyiBACUWCFMfE9BMAZKwxUjxi9VIlbFBNBSRArbOjZkQUt6BQQACH5BAUKAPYALAEAAQAcABwAAAj/AO0JHEiQYIOCCBMqXJAFgMKHAjkQrCcihIOBBFpAJIijggCBCqqE0CBQAhEnBzYK/FBBhEAKJDBoBLBDRxWVAh9cEAGCgAASJG7YO+HBwwmIAQbWa3GhggYDQ1TQsMeihpODCiEg+FAggb0GO3FEsPBBwAwdOUDYA8CyBhGCBEYgmGsgwQgKDgcGGPHkwQQnQKIIyVCQwAYEE+ZC/MFECBAjFhRmQNDh4sMMUJjEoACxgQGVMiQqlNAAAoWUKkmY6LECYwEDAwQIMCBB5YQgQWzAwWPIHgEKA4LPVqByhI0gV6boSTFhoIIHDQLUUxmhwg8ZC2onLEJLpQ4WSLcwshA3AqIGcJLgIEgYAQuD9/AgapGypYmoowQhKHoPLI+FPDAglIEeBsxwiRerNFECQUXIkUYOxO3AyylcPPDBBoSZYowbEelghyAESUdQG4MQY0YFhdRyxQqUNMJNeQPlldAJ1GQyiwQXOOLJFfagIIYYYOBkDxm/nOJSC4WEcYY99ViiCiJC9gEMBgI1sEQXRggUQR3XRIDTHmoNxIkj6wkEgA4QCFkQCpvIqGZCDoi2UUAAIfkEBQoA9gAsAQABABwAHAAACP8A7QkcSJBggYIIEyq0UKKewocCBzwgiONFg4EAXESAOPBDh4v2AoCokEGgSBUbOdorgADBRQkiLiCwVw9EiCwAVNpTgGACggMPLlzAYW9FCAwtHtbLOXDDggUfIlyogMABCSIkIBBkKvCBBQEODth7wIHDiAQPHkjgECLEQAM0TPzYKqCAAAMUCGRo4HBgPQhZHBiowsKDBwsFAwyoK+ADxBM6YsSo4TihXQsTHwqI4QGDAIj1HKi84UJhgBtALtUpyfEBjBswRqSEYG3NOwYMnJXmCCFFChQoePhY4AAaKXm4dauEgMI3iiJDMLYokurMZ5UrTuConPAFI5VJTEC1TPAnWC8RHHMFYTRBIbdF0dCZgqgiyJEjd2YUBFBt25ouXFAwBggIaWDHBBPwccQfV+wmEBW1WCHIAPaAIIc2dTTAwQoaYGCFJIAINIEPwjDBlVgEJaKIJ1ds0MgSpRjgxYwL7KdQBq44IkYDGiiDRSn25EAIEkDoZA8Vz7hSgj0DmCLGHAKNsQocRsKhywUmeTGNDwLVAwkSFHJUTwonEBTJEgTV44QBRhaEwSd9tfmQfioFBAAh+QQFCgD2ACwBAAEAHAAcAAAI/wDtCRxIcGCABgUTKlzooEOAhRAFOohA8AOHghoiEqRggeCEBQYGrqigQKPABwIGPLCXYMGCDQI7vLjx0GQCAxRCSkAwYYS9DRUurIAYoB5BAQUKUHjggsMECTJkVChQEMDAEF0IUVmpwIDXAxEkKBhQokILe/UacBBRgmA9NAwYZPqD4AHFggc6RBBQwkQIFT7dtonLAIvRhRxUkFgcOKEZZ+QqRHxQJcSOkBBl5DHpAkfNgglcYEDx5YNJBS43FJAgkMKUQudIvSoXwqQDDzk81PBRRfWjbqQyrfmlxDZuDyxqYFggEMILI+H2XNSooIOLBRYaWE2ogc92iDRwRLUEQAtZmNoQKRhhUqNjwnpcuvh5pixBZiZAgPBg7vYIqjBxqDGBD08kNAETH2zggxBMoDABQTuw8QgPHVlgChZHFDBDeDvYkEgKAhkgQhIqfJbAZ/aQIcYSkYxgxSZ4ZMDFFHXgBZEDhLCxygAW0NHEJfZ0aAMVJgn0wxLK/GBPAbtIQYZAUJQhzXcRzXHIEAPBsYoRAhEQxRQQFMkDEQTN0UZbXYYwQJEJVZCIfWxG1AAMRQYEACH5BAUKAPYALAEAAQAcABwAAAj/AO0JHEiQoISCCBMqfJDhgMKHAmv8IFhgQISB9QoogDiwVCwfAwUIcCAQgAUXFznae8IgHQZ7BAQUKCDQAoIJBFTakzCIATUH9WQKsAcBwYIPDwkAINiGAYNN9QwMMKBgwQQEJBVWgSWqCEkaseiZCUAgwYEGHG4GsBdhA44TCQg2+pbJTyQFZ0wk1ABBAQ4RFXogJTgA26Jev/pAhCDigowLGhISSLRGUw6IAU68uDAAYg46DzhuWHAQYUYQIZxwUHngwwcLEHLaS0CF06FajlB9UamARAgMJn7cEBDBjjFFYcKgEqRSAobnGEjs2CBQQo8oqdQQ0dmixQq+axFSxIhCgSOOFrIT1gthKg7IhxKU6DCRtSAAQ6HQVEqWMuEKLTXEkMQICLmBTCXFcDGACu8R1IAKBYxAggc5eGABQQjQUQYfqxWAixR2ZNBBCxp0wEMU2wUwwgUk/LDUQA4NlIIUSJxRwB1v8KEAFVCgcOFA6SFEwBVNfJLBA3hcYYg9N6SAggg62bOAF0iQwJYeQUBhDwAkRFFDeBwpcQ0LA+XxhgoCHaBCCvVBVIVeAzFRxgkEvTBUlARdkEubeCIUAZQqBQQAOw==" />',
          '</li>'
        ].join(''));
        
        // Lookup product based on url
        if(product.productUrl) {
          $.ajax({
            url: product.productUrl,
            success: function(data) {
              var div = document.createElement('div');
              div.innerHTML = data;
              
              var brandName = $(div).find('.product-details-column .product-details h2 a').text();
              var brandUrl = $(div).find('.product-details-column .product-details h2 a').attr('href');
              var productName = $(div).find('.product-details-column .product-details h1').text();
              var priceHtml = $(div).find('.product-details-column .product-details .price .main').html();
              var productImage = $(div).find('.product-image-column .thumbs .thumb-frame:first img:first').attr('src');
              
              $('#uc36_list-item-product-' + product.id).html([
                '<div class="uc36_inner">',
                  '<div class="uc36_shopping-list-items-product__imgwrap">',
                    '<a class="uc36_link" href="' + product.productUrl + '">',
                      '<img src="' + productImage + '" />',
                    '</a>',
                  '</div>',
                  '<div class="uc36_shopping-list-items-product__contentwrap">',
                    '<a class="uc36_link" href="' + product.productUrl + '">',
                      '<span class="uc36_shopping-list-items-product__name">' + productName + '</span>',
                    '</a>',
                    '<a class="uc36_link" href="' + brandUrl + '">',
                      '<span class="uc36_shopping-list-items-product__brand">' + brandName + '</span>',
                    '</a>',
                    '<div class="uc36_shopping-list-items-product__price">',
                      priceHtml,
                    '</div>',
                    '<a class="uc36_shopping-list-items-product__link" href="' + product.productUrl + '">View</a>',
                  '</div>',
                  '<a title="Remove" class="uc36_remove" data-id="' + product.id + '"><img width="15" height="15" src="' + _options.images.cross + '" /></a>',
                '</div>'
              ].join(''));
            }
          });
        }
        
      });
    }
    
    $('.uc36_shopping-list-items').on('click', '.uc36_remove', function() {
      var idToRemove = $(this).attr('data-id');
      var product = $(this).parents('.uc36_shopping-list-items-product:first');
      
      shoppingList.removeProduct(idToRemove);
      shoppingList.saveList();
      
      product.remove();
      
      return false;
    });
  }
  populateShoppingList();
  
} catch(e) {
  console.log(e);
} 
