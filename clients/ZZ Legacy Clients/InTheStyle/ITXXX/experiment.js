(function() {
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:1000000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    var settings = {
        title: 'So hot we had to show it off',
        text: "This fire jumpsuit is coming early September but sign up now for early access and we'll let you know when it drops!"
    };

    var images = {
        'sarah-ashcroft-white-flocked-lace-jumpsuit': 'http://www.sitegainer.com/fu/up/sdhprg15yi5f95w.jpg',
        'sarah-ashcroft-red-flocked-lace-jumpsuit': 'http://www.sitegainer.com/fu/up/fnyd6vqkdnfl4ah.jpg',
        'sarah-ashcroft-black-flocked-lace-jumpsuit': 'http://www.sitegainer.com/fu/up/y901zsb7gwmczgd.jpg'
    };

    var imageToUse = images[window.location.pathname.replace(/\//g, '')];

    document.body.classList.add('itxxx');

    // Update message on page load
    UC.poller([
        '#messages_product_view .success-msg',
        function() {
            return !!window.jQuery;
        },
        function() {
            var msg = document.querySelector('#messages_product_view .success-msg p');
            if(msg) {
                return msg.innerHTML.match(/subscribed/);
            }
        }
    ], function() {
        var $ = jQuery;

        $('#messages_product_view .success-msg p').text('Thank you for signing up for early access.');
    });

    // Check for lightbox
    // Repeated interval as the lightbox can be closed and re-initialised from scratch
    var interval;
    function runner() {
        interval = setTimeout(function() {
            clearTimeout(interval);
            if(document.querySelector('#productupdates-form')) {
                lightbox();
            } else {
                runner();
            }
        }, 50);
    }
    runner();

    function lightbox() {
        var $ = jQuery;

        // On close 
        $('#productupdates-overlay, #productupdates-form .close-button').click(function() {
            $('#productupdates-form').remove();
            runner();
        });

        if($('#productupdates .itxxx-content').length) {
            return;
        }

        $('#productupdates-form').before($([
            '<div class="itxxx-content">',
                '<h2>' + settings.title + '</h2>',
                '<p>' + settings.text + '</p>',
                '<img src="' + imageToUse + '" />',
            '</div>'
        ].join('')));
    }
})();
