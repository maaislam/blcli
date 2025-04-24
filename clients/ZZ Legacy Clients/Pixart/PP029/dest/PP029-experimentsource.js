(function() {
    document.body.classList.add('PP029');

    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    UC.poller([
        '#features .panel',
        function() {
            return !!document.querySelector('#features .info_features').innerHTML.trim();
        },
        '#features .panel .info-icon .fa-info-circle',
        function() {
            return !!document.querySelector('#features .panel .panel-heading label').innerHTML.trim();
        },
        function() {
            return window.ga;
        },
        function() {
            return window.jQuery;
        }
    ], function() {
        $('body').addClass('PP029--did-poll');

        run();
    });

    // Full Story Integration
    UC.poller([
        function() {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'PP029',
            variation_str: 'Variation 1 Desktop'
        });
    }, { multiplier: 1.2, timeout: 0 });

    /**
     * Entry point for running test after polling
     */
    function run() {
        var $ = window.jQuery;
      
        ga('send', 'event', 'PP29', 'Page View', 'PP29---variation1', {
            nonInteraction: true,
            dimension15: 'PP29---variation1'
        });
      
        // Iterate over features and amend markup
        $('#features .panel, .nome_lavorazione > .panel').each(function(idx, item) {
            var infoCircle = $(this).find('.fa-info-circle'),
                infoBox = $(this).find('.info_features');

            var hasWarning = !!infoBox.find('.alert-danger').length;
          
            var hiddenWarningCondition = !(infoBox.parent().hasClass('hide') && infoBox.find('.alert-danger').length);

            if(infoCircle.length && infoBox.length && hiddenWarningCondition) {
                // Add custom box containing info to panel
                var infoBoxHtml = infoBox.text().trim();
                if(!infoBoxHtml) {
                    var img = infoBox.find('img');
                    if(img.length) {
                        infoBoxHtml = img.attr('title', 'Click to view').parent().html();
                    }
                }
              

                if(infoBoxHtml) {
                    var newInfoBox = $([
                        '<div class="pp29-info-box">',
                            (!hasWarning ? 
                                '<i class="fa fa-info-circle pp29-info-box__icon"></i>' : 
                                    '<i class="fa fa-exclamation-circle pp29-info-box__icon"></i>'
                            ),
                            '<div class="pp29-info-box__text">',
                                infoBoxHtml,
                            '</div>',
                        '</div>'
                    ].join(''));

                    if(hasWarning) {
                        newInfoBox.addClass('pp29-info-box--warning');
                    }

                    newInfoBox.prependTo(this);

                    // Someitmes schematics img are given
                    newInfoBox.find('img').on('click', function() {
                        $(this).toggleClass('pp29-active');
                    });
                }
            }
        });

        // Periodically update the panels
        // Based on user choices, the text in the panel changes
        var panels = $('#features .panel, .nome_lavorazione > .panel');

        function listenForChanges() {
            var timeout = setTimeout(updatePeriodically, 500);

            function updatePeriodically() {
                clearTimeout(timeout);
                
                // Iterate over labels and update
                panels.each(function(idx, item) {
                    var infoCircle = $(this).find('.fa-info-circle'),
                        infoBox = $(this).find('.info_features');

                    var infoBoxHtml = infoBox.text().trim();
                    if(!infoBoxHtml) {
                        var img = infoBox.find('img');
                        if(img.length) {
                            infoBoxHtml = img.attr('title', 'Click to view').parent().html();
                        }
                    }

                    if(infoBoxHtml) {
                        $(this).find('.pp29-info-box__text').html(infoBoxHtml);
                    }
                });

                // Listen again
                listenForChanges();
            }
        }

        listenForChanges();
    }
})();
