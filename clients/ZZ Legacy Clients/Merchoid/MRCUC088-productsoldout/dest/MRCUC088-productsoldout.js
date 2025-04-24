console.log('UPDATED');

var $ = jQuery;
$('body').addClass('UC088');

//$('#pa_size').hide();

function setSelectedIndex(s, i) {
        s.options[i].selected = true;
        return;
} 

var dropdown = $('#pa_size')[0];
var dropdownSelected = dropdown.options.selectedIndex;

var $radioBtns = $('<div id="UC088_radioBtns"></div>');
$.each(dropdown.options, function(i){
    if (i === 0) {
        return true;
    }
    
    var outofstockmessage = $('<p>in stock</p>');
        
   
    var text = this.innerHTML;
    var $radio = $('<div class="UC088_radioBtn"><span class="UC088_radioBtn__icon"></span><span class="UC088_radioBtn__label">' + text + '</span></div>');

    if (dropdownSelected === i) {
       $radio.addClass('active');
        
        if($('.uc51_selectedSize__stock__level').text() =='0'){
            console.log('outofstock');
        }
        
    }
    
    $radio.click(function(){
        setSelectedIndex(dropdown, i);
        $('#UC088_radioBtns').find('.UC088_radioBtn.active').removeClass('active');
        $(this).addClass('active');
        $('.UC088_radioBtn__icon').addClass('active');
        
        if ($('.woocommerce-variation-availability p').hasClass('out-of-stock')){
            console.log('outstock');
        }
        else{
        console.log('instock');
        }
        
        
    });

    $radio.appendTo($radioBtns);
    
    
    
});

    

$radioBtns.insertAfter($('#pa_size'));





