function mbMarkup(check, title, number) {
  let content;

  
  if (check === true) {
    content = `
      <section>
        <a class="HH004_reveal-next HH004_call-event">
          Call Us
        </a>
        <article class="HH004_reveal_content">
          <span>
              <span class="HH004_care">Contact the ${title}<br /> Branch on</span>
              <a class="HH004_lg-text" href="tel:${number}">${number}</a>
              <a href="https://www.helpinghandshomecare.co.uk/existing-customers/" class="HH004_contact-btn">Existing customers</a>
            </span>
          <span>
            <span>
              <a href="/about-us/contact-us/request-a-callback/" class="HH004_contact-btn HH004_no-margin">Request a Callback</a>
            </span>
          </span>
        </article>
        <a class="HH004_reveal-next HH004_email-event">
          Email Us
        </a>
        <article class="HH004_reveal_content">
          <span>
            <span>
              <a href="mailto:enquiries@helpinghands.co.uk" class="HH004_contact-btn HH004_no-margin">Customer Enquiries</a>
            </span>
          </span>
          <span>
            <span>
              <a href="mailto:jobs@helpinghands.co.uk" class="HH004_contact-btn HH004_no-margin">Job Enquiries</a>
            </span>
          </span>
          <span>
            <span>
              <a href="/about-us/contact-us/" class="HH004_contact-btn HH004_no-margin">More Email Options</a>
            </span>
          </span>
        </article>
        <a href="/about-us/contact-us/request-a-brochure/" class="HH004-link HH004_request-event">
          Request a Brochure
        </a>
      </section>
    `;
  } else {
    content = `
      <section>
        <a class="HH004_reveal-next HH004_call-event">
          Call Us
        </a>
        <article class="HH004_reveal_content">
          <span>
              <span class="HH004_care">Looking for <strong>care?</strong><br /></span>
              <a class="HH004_lg-text" href="tel:03300296074">0330 029 6074</a>
              <a href="https://www.helpinghandshomecare.co.uk/existing-customers/" class="HH004_contact-btn">Existing customers</a>
            </span>
          <span><span class="HH004_job">Looking for a <strong>job?</span></strong><a class="HH004_lg-text" href="tel:03301341301">0330 134 1301</a></span>
          <span>
            <span>
              <a href="/about-us/contact-us/request-a-callback/" class="HH004_contact-btn HH004_no-margin">Request a Callback</a>
            </span>
          </span>
        </article>
        <a class="HH004_reveal-next HH004_email-event">
          Email Us
        </a>
        <article class="HH004_reveal_content">
          <span>
            <span>
              <a href="mailto:enquiries@helpinghands.co.uk" class="HH004_contact-btn HH004_no-margin">Customer Enquiries</a>
            </span>
          </span>
          <span>
            <span>
              <a href="mailto:jobs@helpinghands.co.uk" class="HH004_contact-btn HH004_no-margin">Job Enquiries</a>
            </span>
          </span>
          <span>
            <span>
              <a href="/about-us/contact-us/" class="HH004_contact-btn HH004_no-margin">More Email Options</a>
            </span>
          </span>
        </article>
        <a href="/about-us/contact-us/request-a-brochure/" class="HH004-link HH004_request-event">
          Request a Brochure
        </a>
      </section>
    `;
  }

  return content;
}

export default mbMarkup;