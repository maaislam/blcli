var _ME100 = (function($) {
    
    // Triggers
    UC.poller([
        'body > div',
    ], ME100, { timeout: 7000, multiplier: 0 });
    
    // Variation
    function ME100() {
        $('body').addClass('ME100');
    }
    
}(window.jQuery));