export default () => {
    const $ = window.jQuery;

    var $form = $("#cu_newsletter_signup_form");
    var $email = $("#cu_newsletter_signup_email");
    
    $form.submit(function (e) {
      e.preventDefault();
        // ajax call
      $(".spinnerContainer").show();
      var theURL = "https://x.email.boots.com/ats/post.aspx";
      // theURL = '';
      $.ajax({
        url: theURL,
        method: "GET",
        async: false,
        crossDomain: true,
        data: {
          "cr": "1043",
          "fm": "64",
          "s_list_name": "STANDARD SIGN-UP",
          "s_country": "UK",
          "s_email_address": $email.val(),
        }
      })
      .done(function (msg) {
        // console.log("msg", msg);
        $(".newsletter_signupContainer").hide();
        $("#cu_newsletter_signup .container .success").show();
      })
      .fail(function (jqXHR, textStatus) {

        $(".newsletter_signupContainer").hide();
        $("#cu_newsletter_signup .container .error").show();
      })
      .always(function () {
        // console.log("complete");
        $(".spinnerContainer").hide();
      });
    // handle errors
    // handle success
    });
    $("#cu_newsletter_tryAgain").click(function () {
      $(".spinnerContainer").hide();
      $("#cu_newsletter_signup .container .error").hide();
      $("#cu_newsletter_signup .container .success").hide();
      $(".newsletter_signupContainer").show();
    });
}