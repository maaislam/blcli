(function($){
 
  $('body').addClass('SS015');
    
    
/*-------USPS-------*/
    
var uspWrap = $('<div class="SS015_uspWrap"><h3>Why buy football goals from us?</h3></div> ');

uspWrap.insertBefore('.page-title.category-title');


var expUsps = [
        ['//cdn.optimizely.com/img/6269321863/8988fb0532074977893b8c74fcfe7129.png', '7000 sq ft warehouse'],
        ['//cdn.optimizely.com/img/6269321863/8a50b0de14f1449788636f6097581651.png', 'Over 500 unique football products'],
        ['//cdn.optimizely.com/img/6269321863/8708e7d330f24108a52bc701fe9b9bc6.png', 'Award-winning football products']

    ];

$.each(expUsps, function () {
    var icon = this[0], //brand1
        text = this[1]; //links

    $(['<div class="ss015_usp">',
            '<img src="' + icon + '"/>',
            '<p>' + text + '</p>',
           '</div>'
      ].join('')).appendTo('.SS015_uspWrap');

});
    
/*------BEST SELLERS-------*/
    
    var products = $('.products-grid.first.last.odd'),
        newColumn = $('<div class="ss015_bestsellingWrap products-grid"><h2 class="ss15-bstitle">Our Best Sellers</h2></div>');
    
    newColumn.insertBefore(products);
    
    products.find('li').each(function(index, element) {
        $(this).clone().appendTo(newColumn);
    
        return index < 3;
    });
    
/*------TOP TEXT-------*/
    
    var stockCount = $('.pager .amount');
    
    

    

    
})(window.jQuery);