function markup(check, title, number) {
  let content;

  if (check === true) {
    content = `
      <div class="HH004_sticky-wrap">
        <div class="HH004_contact-options">
          <h3>Contact Us</h3>
          <a class="HH004_call-cta">Call Us</a>
          <a class="HH004_more-cta">More Options >></a>
        </div>
        <div class="HH004_contact-reveal-call HH004_center-col">
          <div><span>Contact the ${title}<br />Branch on <a href="tel:${number}">${number}</a></span></div>
          <div><a href="/about-us/contact-us/request-a-callback/" class="HH004_contact-btn">Request a callback</a></div>
          <a class="HH004_close"></a>
        </div>
        <div class="HH004_contact-reveal-more">
          <div><span><a class="HH004_contact-btn HH004_leave_msg">Leave a Message</a></span></div>
          <div><span><a class="HH004_contact-btn HH004_open-email">Email Us</a></span></div>
          <div><span><a href="/about-us/contact-us/request-a-brochure/" class="HH004_contact-btn HH004_ds_request-event">Request a Brochure</a></span></div>
          <a class="HH004_close"></a>
        </div>
        <div class="HH004_contact-reveal-emails">
          <div><span><a href="mailto:enquiries@helpinghands.co.uk" class="HH004_contact-btn">Customer Enquiries</a></span></div>
          <div><span><a href="mailto:jobs@helpinghands.co.uk" class="HH004_contact-btn">Job Enquiries</a></span></div>
          <div><span><a href="/about-us/contact-us/" class="HH004_contact-btn">More Email Options</a></span></div>
          <a class="HH004_close"></a>
        </div>
      </div>
    `;
  } else {
    content = `
      <div class="HH004_sticky-wrap">
        <div class="HH004_contact-options">
          <h3>Contact Us</h3>
          <a class="HH004_call-cta">Call Us</a>
          <a class="HH004_more-cta">More Options >></a>
        </div>
        <div class="HH004_contact-reveal-call">
          <div><span>Looking for <strong>care?</strong><br /><a href="tel:03300296074">0330 029 6074</a></span></div>
          <div><span>Looking for a <strong>job?</strong><br /><a href="tel:03301341301">0330 134 1301</a></span></div>
          <div><a href="/about-us/contact-us/request-a-callback/" class="HH004_contact-btn">Request a callback</a></div>
          <a class="HH004_close"></a>
        </div>
        <div class="HH004_contact-reveal-more">
          <div><span><a class="HH004_contact-btn HH004_leave_msg">Leave a Message</a></span></div>
          <div><span><a class="HH004_contact-btn HH004_open-email">Email Us</a></span></div>
          <div><span><a href="/about-us/contact-us/request-a-brochure/" class="HH004_contact-btn HH004_ds_request-event">Request a Brochure</a></span></div>
          <a class="HH004_close"></a>
        </div>
        <div class="HH004_contact-reveal-emails">
          <div><span><a href="mailto:enquiries@helpinghands.co.uk" class="HH004_contact-btn">Customer Enquiries</a></span></div>
          <div><span><a href="mailto:jobs@helpinghands.co.uk" class="HH004_contact-btn">Job Enquiries</a></span></div>
          <div><span><a href="/about-us/contact-us/" class="HH004_contact-btn">More Email Options</a></span></div>
          <a class="HH004_close"></a>
        </div>
      </div>
    `;
  }

  return content;
}

export default markup;