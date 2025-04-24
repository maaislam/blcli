export default () => {
  const newPageMarkup = document.createElement('div');
  newPageMarkup.classList.add('RC050-main_content');

  const html =
    `<h1>Mental wellbeing and resilience courses: making a positive difference in your workplace</h1>
    <div class="RC050-topContent">
      <div class="RC050-opening_text">
        <p>The British Red Cross offers mental wellbeing and resilience courses for the workplace. These courses are designed to build individual and team resilience and to help staff members return to and maintain a state of positive mental wellbeing.</p>
        <p>The Red Cross has a global reputation and experience in providing both emotional and practical support to individuals in crises.</p>
        <p>By learning with us, you’ll benefit from the expertise of our teams in supporting people in emotionally challenging situations.</p>
      </div>
      <div class="RC050-stats">
        <h2>What are the benefits to employers?</h2>
        <ul>
          <li>more engaged and motivated staff</li>
          <li>a reduction in absence and associated costs</li>
          <li>increased productivity and staff retention</li>
          <li>improved professional reputation</li>
          <li>more satisfied customers</li>
        </ul>
      </div>
    </div>
    <div class="RC050-wellbeing_course-wrapper">
      <p>To find out more about the courses we offer, please contact us via our simple <a class="RC050-form_link" href="https://www.redcrossfirstaidtraining.co.uk/What-we-do/mental-wellbeing-courses/mental-wellbeing-enquiry-form.aspx">enquiry form</a> or call <a href="tel:08452876144">0845 287 6144*.</a></p>
      <div class="RC050-courses"></div>
    </div>
    <div class="RC050-review_block">
      <div class="RC050-quotes"></div>
      <span>
      “After attending this course, I feel better placed to understand how and why people respond the way they do. The training is already making a positive difference to our customers and our people.”
      </span>
      <p>Gavin Scaife, Aviva</p>
      <a href="https://www.redcrossfirstaidtraining.co.uk/News-and-legislation/latest-news/2017/December/mental-wellbeing-courses-make-difference-to-Aviva.aspx">– read full case study</a>
    </div>
    <div class="RC050-causes_block">
      <h2>Causes and impact of work related stress</h2>
      <p class="RC050-statistic">There were 488,000 cases of work related stress, depression or anxiety in 2015/16, accounting for 37% of all work related ill health cases and 45% of all working days lost due to ill health.</p>
      <p class="RC050-source">Health and Safety at work statistics for Great Britain 2017</p>
      <p>Common causes of work related stress, depression or anxiety (defined as a harmful reaction to work pressures) include:</p>
      <ul>
      <li>tight deadlines</li>
      <li>too much responsibility</li>
      <li>challenging customer situations</li>
      <li>lack of managerial support.</li>
      </ul>
      <div class="RC050-stats">
      <div class="RC050-fact">
      <p>Did you know?</p>
      <span>12.5m</span>
      <p class="RC050-days">working days lost</p>
      <p class="RC050-thinText">due to work-related stress, depression or anxiety in 2016/17</p>
      <p class="RC050-source">Health and Safety at work statistics for Great Britain 2017</p>
    </div>
    <div class="RC050-calendar"></div>
    </div>
    <p class="RC050-smallText">*Calls cost 5p per minute, plus your phone company’s access charge</p>
    <p class="RC050-smallText">**All prices are based on group bookings at your place of work.  All prices are exclusive of VAT.</p>
    </div>`;

  newPageMarkup.innerHTML = html;
  document.querySelector('.main-content-wrap').appendChild(newPageMarkup);
};
