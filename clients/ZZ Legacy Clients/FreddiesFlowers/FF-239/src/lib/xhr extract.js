/*
Please avoid DOM manipulations as this code will execute
on Goal Pages as well.
*/
(function pollForImproveSitewideModelfitGoal() {
    if (document.readyState === 'complete' && window.jQuery !== undefined) {
        var $ = window.jQuery;



        window._vis_opt_queue = window._vis_opt_queue || [];
        if (vwo_$('body').length) {
            function customMetricsTrigger(metricsIDList) {
                metricsIDList.forEach(function(value) {
                    window._vis_opt_queue.push(function() {
                        _vis_opt_register_conversion(value, 64);
                    });
                });
            }
            const send = XMLHttpRequest.prototype.send;
            XMLHttpRequest.prototype.send = function() {
                this.addEventListener('open', function() {
                    if (this.responseURL.indexOf('api.stripe.com') > -1) {
                        console.log(this.status)
                        alert('worked!')
                    }
                });
                return send.call(this, arguments);
            };
        }
    } else {
        setTimeout(pollForImproveSitewideModelfitGoal, 25);
    }
})();