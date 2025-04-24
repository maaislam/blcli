export default (
  name,
  jobTypes,
  contracts,
  coverage,
  officeLocations,
  officeLocationsOthers,
  about,
  target,
  index,
  href,
  numberBtn,
  emailBtn,
  websiteBtn,
  salaryMarkup
) => {
  target.insertAdjacentHTML('beforeend', `
    <div class="AC030_result" data-index="${index}"> 
      <div class="AC030_result-title">${name}</div>
      <div class="AC030_result-info">
        <div class="AC030_job-wrap">
          <h3>Job types</h3>
          <div class="AC030_content-outer">
            ${jobTypes}
            ${contracts}
          </div>
          <span class="AC030_ds_divider"></span>
        </div>
        <div class="AC030_location-wrap">
          <h3>Location</h3>
          <div class="AC030_location-reveal">
            ${coverage}
            <h4>Office Locations</h4>
            <div class="AC030_locations">
              <div class="AC030_main-office">
                ${officeLocations}
              </div>
              <div class="AC030_other-offices">
                ${officeLocationsOthers}
              </div>
              <a class="AC030_reveal-offices"></a>
            </div>
          </div>
          <span class="AC030_ds_divider"></span>
        </div>
        <div class="AC030_salary-wrap">
          <h3>Salary</h3>
          <div class="AC030_sal-content AC030_reveal-anim">
            ${salaryMarkup}
          </div>
          <span class="AC030_ds_divider"></span>
        </div>
        <div class="AC030_about-wrap">
          <div class="AC030_about-inner">
            <div class="AC030_desc-wrap">
              <h4>About</h4>
              <p>${about}</p>
            </div>
            <a class="AC030_reveal_about"></a>
          </div>
          <span class="AC030_ds_divider"></span>
        </div>
      </div>
      <div class="AC030_result-contact">
        ${emailBtn}
        ${numberBtn}
        ${websiteBtn}
        <a class="AC030_contact-info" href="${href}">More Information</a>
      </div>
    </div>
  `);
};
