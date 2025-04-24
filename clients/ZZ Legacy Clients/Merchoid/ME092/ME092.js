var _triggers = (function() {
    /* 
     * Activation Logic
     */
    // If page data exists, trigger the test
    if (localStorage.RC015) {
        UC.poller([
            'body > div',
            function() { return window.jQuery }
        ], activate);
    }

    /* 
     * Data Collection
     */
    // Check if user is on a course page to save the data for next time
    var url = window.location.href;
    var isOnCourseSearch = (function() {
        var regex = /Where-we-train\/EventsSearch.aspx/gi;
        if (regex.test(url)) return true;
    })();
    var isOnCourseDetails = (function() {
        var regex = /.*(\/)(\/)?(courses)(\/)(first-aid-at-work-courses-uk-mainland|first-aid-public-courses)(?!\.aspx).*(\/).*/gi;
        if (regex.test(url)) return true;
    })();

    // Update data
    var data = localStorage.RC015 || {};
    if (isOnCourseSearch) {
        data.course_search_page = url;
    } else if (isOnCourseDetails) {
        data.course_details_page = url;
    }
})();

function activate() {

}