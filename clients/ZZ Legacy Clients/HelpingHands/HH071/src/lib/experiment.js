/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "./services";
import shared from "./shared";
export default () => {
  setup();
  const { ID } = shared;

  const $hero = window["j" + "".trim() + "Query"]("#hero");
  const $content = window["j" + "".trim() + "Query"]("#main");
  const $cqc = window["j" + "".trim() + "Query"](".cqc-flex");

  const clearCurrentContent = () => {
    $content.find(".container").hide();
    window["j" + "".trim() + "Query"]("#breadcrumbs").hide();
    window["j" + "".trim() + "Query"]("#pre-footer").hide();
    window["j" + "".trim() + "Query"](".partner--logo").hide();
  };
  const updateHero = () => {
    const $titleWrapper = $hero.find(".col-lg-12");
    $titleWrapper.empty();
    $hero.prepend(`<div class="${ID}_bgHeader"></div>`);
    $titleWrapper.append(`
      <h1>Live-in care</h1>
      <p>CQC & CIW regulated <span>care in your home</span>  anywhere in England & Wales</p>
      <div class="${ID}_image">
        <img src="https://cdn-sitegainer.com/w4vh60ytw8jdiqw.png" />
      </div>
    `);
  };
  const whatIsLiveInCare = () => {
    const markup = `
      <div class="${ID}_panel ${ID}_whatIsLiveInCare">
        <div class="container text-center">
          <div class="row">
            <div class="col-xs-12">
            <h2>What is live-in care?</h2>
            </div>
          </div>
        </div>
        <div class="${ID}_purpleWrapper">
          <div class="container text-center">
            <div class="row">
              <div class="col-xs-12">
              <p>Live-in care helps you live the life you want on your own terms</p>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row ${ID}_equal">
            <div class="col-xs-12 col-sm-6">
              <p>Live-in care is assistance and care provided to you in your own home, enabling you to retain your independence and live the life you want to lead. From support for those living with <a href="https://www.helpinghandshomecare.co.uk/home-care-services/dementia-care/types-of-dementia/">types of dementia</a>, the elderly or those with complex medical needs, live-in care allows you to receive person-centred, one-to-one support on your terms.</p>
              <p>As the name suggests, a carer will live with you in your home to provide care whenever you need it, giving you and your family peace of mind that you always have a helping hand nearby.</p>
              </p>
            </div>
            <div class="col-xs-12 col-sm-6 ${ID}_bgImageWrapper">
              <div class="${ID}_bgImage" style="background-image: url('https://cdn-sitegainer.com/fpp0i4kcaig0000.png');"></div>
            </div>
          </div>
        </div>
        <div class="${ID}_salmonWrapper">
          <div class="container text-center">
            <div class="row">

              <div class="col-xs-12">
                <h2>What does live-in care involve?</h2>
              </div>

              <div class="${ID}_sliderLiveIn equal">
                <div class="${ID}_card">
                  <img src="https://cdn-sitegainer.com/3bmhqn6jm9ecku6.png" />
                  <p>A live-in carer can make such a difference to your life, enabling you to live life on your terms and retain your independence.</p>
                </div>
                <div class="${ID}_card">
                  <img src="https://cdn-sitegainer.com/ccu8aqbsrxh2c97.png" />
                  <p>By getting to know your preferences and routines, we’ll create a unique package of support with a carefully chosen carer.</p>
                </div>
                <div class="${ID}_card">
                  <img src="https://cdn-sitegainer.com/rp9laaqgvvr9o42.png" />
                  <p>Remaining in your own home means you can stay with partners, family, pets and keep in touch with your local community.</p>
                </div>
              </div>

              <div class="col-xs-12">
                <div class="row ${ID}_coralWrapper">
                  <div class="col-xs-12">
                    <h2>What does a live-in care service include?</h2>
                    <p><strong>The every day services from a live-in carer include, but are not limited to:</strong></p>
                  </div>
                  <div class="col-xs-6 col-md-2">
                    <img class="${ID}_icon" src="https://cdn-sitegainer.com/a6dlbmcanyay3bd.png" />
                    <p>Personal care and medication support</p>
                  </div>
                  <div class="col-xs-6 col-md-2">
                    <img class="${ID}_icon" src="https://cdn-sitegainer.com/gek24skme938fe1.png" />
                    <p>Housekeeping chores and other daily tasks</p>
                  </div>
                  <div class="col-xs-6 col-md-2">
                    <img class="${ID}_icon" src="https://cdn-sitegainer.com/ss28k7wb6yz5see.png" />
                    <p>Ensuring that dietary needs are being met</p>
                  </div>
                  <div class="col-xs-6 col-md-2">
                    <img class="${ID}_icon" src="https://cdn-sitegainer.com/0hv0jhi5452q1ff.png" />
                    <p>Providing companionship and support</p>
                  </div>
                  <div class="col-xs-6 col-md-2">
                    <img class="${ID}_icon" src="https://cdn-sitegainer.com/hjeyxr1r3r6m1yj.png" />
                    <p>Complex care (e.g. PEG feeding, catheter management)</p>
                  </div>
                  <div class="col-xs-6 col-md-2">
                    <img class="${ID}_icon" src="https://cdn-sitegainer.com/w1o81coaxh0ec7u.png" />
                    <p>Personal tasks, such as bathing & dressing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    $content.append(markup);
    const $slider = window["j" + "".trim() + "Query"](`.${ID}_sliderLiveIn`);
    if ($slider.slick) {
      $slider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        infinite: false,
        arrows: false,

        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              infinite: false,
            },
          },
        ],
      });
    }
  };
  const findYourCarer = () => {
    const markup = `
      <div class="${ID}_panel ${ID}_findYourCarer">
        <div class="container">
          <div class="row ${ID}_equal">
            <div class="col-xs-12 text-center">
              <h2>Find your perfect live-in carer</h2>
            </div>

            <div class="col-xs-12 col-md-8 ${ID}_mobileLast">
              <div class="${ID}_quoteBox">
                <h4>Meet Louise Bradley, our CQC accredited regional care director</h4>
                <div class="row">
                  <div class="col-xs-8 col-xs-offset-2 col-sm-offset-0 col-sm-4">
                    <img src="https://www.helpinghandshomecare.co.uk/wp-content/uploads/Louise-bradley-sqaure-1-240x240.jpg" />
                  </div>
                  <div class="col-xs-12 col-sm-8">
                    <p>
                      <a href="https://www.helpinghandshomecare.co.uk/about-us/our-team-of-experts/meet-louise-bradley/">Louise</a> is responsible for overseeing the quality of care throughout our Northern region and live-in care teams.
                    </p>
                    <p>
                      <i>“My aim is to deliver the highest standards of care through tailored, person-centred care plans that offer outcome-focused delivery through dedicated, expertly-skilled care teams.”</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-md-4 ${ID}_flex">
              <p>We will take the time to match you with a carer who is compatible with you and fully understands you and your needs.</p>
              <p>Only the most dedicated carers are taken on by us. In fact, just 2% of applicants pass our strict application, referencing and induction process.</p>
              <p>Once recruited, they are trained and led by our live-in care managers, who ensure our high standards of care are always met.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    $content.append(markup);
  };
  const conditionsWeCareFor = () => {
    const markup = `
    <div class="${ID}_panel ${ID}_conditions">
      <div class="container">
        <div class="row ${ID}_equal">
          <div class="col-xs-12 text-center">
            <h2>Conditions we care for</h2>
          </div>

          <div class="col-xs-12 col-md-6">
            <p>Choosing live-in care enables you to retain your independence in familiar surroundings, with the added security of having a live-in carer on hand to assist you throughout the day and night. As well as supporting you with you medical and health needs, live-in care also enriches your life by giving you companionship from your dedicated live-in carer.</p>
            <p>Our carers are experienced and highly trained in supporting a number of conditions including:</p>
          </div>
          <div class="col-xs-12 col-md-6 ${ID}_flex">
            <div class="row ${ID}_equal">
              <div class="col-xs-6 col-md-4 ${ID}_cardSmall">
                  <div class="${ID}_cardContent">
                    <div><a href="https://www.helpinghandshomecare.co.uk/home-care-services/dementia-care/">Dementia</a>, <span>including</span> <a href="https://www.helpinghandshomecare.co.uk/home-care-services/condition-led-care/alzheimers-care/">Alzheimer’s</a></div>
                  </div>
              </div>
              <div class="col-xs-6 col-md-4 ${ID}_cardSmall">
                <a href="https://www.helpinghandshomecare.co.uk/nursing-care/neurological-care/parkinsons/">
                  <div class="${ID}_cardContent">
                    Parkinson’s disease
                  </div>
                </a>
              </div>
              <div class="col-xs-6 col-md-4 ${ID}_cardSmall">
                <a href="https://www.helpinghandshomecare.co.uk/nursing-care/">
                  <div class="${ID}_cardContent">
                    Nursing and complex care
                  </div>
                </a>
              </div>
              <div class="col-xs-6 col-md-4 ${ID}_cardSmall">
                <a href="https://www.helpinghandshomecare.co.uk/home-care-services/fast-track-palliative-care/">
                  <div class="${ID}_cardContent">
                    Palliative care
                  </div>
                </a>
              </div>
              <div class="col-xs-6 col-md-4 ${ID}_cardSmall">
                <a href="https://www.helpinghandshomecare.co.uk/home-care-services/domiciliary-care/">
                  <div class="${ID}_cardContent">
                    Domiciliary care
                  </div>
                </a>
              </div>
              <div class="col-xs-6 col-md-4 ${ID}_cardSmall">
                <a href="https://www.helpinghandshomecare.co.uk/home-care-services/condition-led-care/">
                  <div class="${ID}_cardContent">
                    Other condition-led care
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

    $content.append(markup);
  };
  const liveInCareHomes = () => {
    const markup = `
      <div class="${ID}_panel ${ID}_findYourCarer">
        <div class="container">
          <div class="row text-center">
            <div class="col-xs-12">
              <h2>Live-in care vs care homes</h2>
            </div>
            <div class="col-xs-12 col-sm-8 col-sm-offset-2">
              <p>Here at Helping Hands, we believe that if you want to stay at home to receive care – you can. That’s why we’ve been providing dedicated home care for over 30 years. To help you decide between live-in care or a residential care home, we’ve compiled a few key points for you below:</p>
            </div>
            <div class="col-xs-12">
              <div class="${ID}_table ${ID}_heading">
                  <p class="${ID}_bgPurple100">Live-in care from Helping Hands</p>
                  <p class="${ID}_bgBlack30">Residential care / nursing homes</p>
              </div>
              <div class="${ID}_table">
                <p class="${ID}_bgPurple5"><span>Enables you to stay in the comfort of your <strong>own home</strong></span></p>
                <p class="${ID}_bgBlack5"><span>Requires moving to a new, <strong>unfamiliar environment</strong></span></p>
                <p class="${ID}_bgPurple25"><span>You have <strong>freedom of choice</strong> for food</span></p>
                <p class="${ID}_bgBlack10"><span>Set menu and <strong>regulated mealtimes</strong></span></p>
                <p class="${ID}_bgPurple5"><span><strong>Personal, one-to-one 24-hour care</strong> from a dedicated carer</span></p>
                <p class="${ID}_bgBlack5"><span>Carers operate on a shift pattern - <strong>responsibility is shared across residents</strong></span></p>
                <p class="${ID}_bgPurple25"><span><strong>You decide</strong> on your lifestyle and routines</span></p>
                <p class="${ID}_bgBlack10"><span>Change of lifestyle – working to <strong>somebody else’s routine</strong></span></p>
                <p class="${ID}_bgPurple5"><span>Family & friends can still <strong>visit as much as they like</strong></span></p>
                <p class="${ID}_bgBlack5"><span><strong>Strict visiting times</strong> for family and friends need to be adhered to </span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    $content.append(markup);
  };
  const regainIndependence = () => {
    const markup = `
      <div class="${ID}_panel ${ID}_regainIndependence">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 text-center">
              <h2>Regain your independence with live-in care</h2>
            </div>
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 text-center">
              <p>When you sign up to live-in care with Helping Hands, we have the following assurances in place to ensure that you are confident about your service:</p>
            </div>
            <div class="col-xs-12">
              <div class="${ID}_table ${ID}_ticks ${ID}_bgBlack5">
                <div>
                  <p>A face-to-face care assessment that allows us to get to know you and your needs</p>
                </div>
                <div>
                  <p>Care reviews are overseen by our team of managers to ensure a quality service at all times</p>
                </div>
                <div>
                  <p>All of our support packages and care plans are created with you in mind, delivering a person-centred practice at all times
                    <br>
                    Regular updates for your family</p>
                </div>
                <div>
                  <p>All of our carers undergo our industry-accredited training and selection process</p>
                </div>
                <div>
                  <p>Ongoing personal care, such as continence management</p>
                </div>
                <div>
                  <p>Help with daily tasks, such as washing and dressing</p>
                </div>
                <div>
                  <p>Running errands</p>
                </div>
                <div>
                  <p>Couples can remain together in the home they love</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    $content.append(markup);
  };
  const whoAreHelpingHands = () => {
    const markup = `
      <div class="${ID}_panel ${ID}_whoAreWe ${ID}_bgPurple100 text-center">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <h2>Who are Helping Hands?</h2>
            </div>
            <div class="col-xs-12 col-sm-8 col-sm-offset-2">
              <p>Here at Helping Hands, live-in care is a dedicated and fully managed service regulated by the <a href="https://www.helpinghandshomecare.co.uk/about-us/cqc-regulated-service/">Care Quality Commission</a> (CQC) and <a href="https://www.helpinghandshomecare.co.uk/about-us/cqc-regulated-service/">Care Inspectorate Wales</a> (CIW). For over 30 years, we’ve been offering adults of all ages the extra comfort and reassurance of 24-hour one-to-one support, enabling you to stay in the place you know and love – your home.</p>
              <div>
                <img src="https://cdn-sitegainer.com/dvsranal0j970x3.png" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="${ID}_panel container">
        <div class="row">
          <div class="col-xs-12 text-center">
            <h2>How are Helping Hands different?</h2>
          </div>
          <div class="col-xs-12 col-sm-8 col-sm-offset-2">
            <p>With a typical introductory live-in care agency, you pay a fee to be introduced to a carer who you employ, pay and manage directly yourself. Once an introductory agency has introduced you to a carer, you will pay the one-off charge to them for that service and this is typically the end of their involvement in the arrangement.</p>
            <p>Unlike an agency, our service is fully managed.</p>
            <p>Our live-in care service is overseen by a number of experienced local live-in care managers. They ensure you are matched with a suitable live-in carer and will liaise regularly with you and your family to make sure everything runs smoothly.</p>
          </div>
        </div>
      </div>
    `;

    $content.append(markup);
  };
  const costsOfLiveIn = () => {
    const markup = `
      <div class="${ID}_panel ${ID}_costs ${ID}_bgPurple5 text-center">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <h2>Costs of live-in care</h2>
            </div>
            <div class="col-xs-12 col-sm-8 col-sm-offset-2">
              <p>The cost of live-in care is very much dependent on your personal needs. Our prices for round-the-clock support from a carer start from:</p>
              <p>
                <strong>£1,125 per week for a single person</strong><br>
                <strong>£1,425 per week for a couple</strong>
              </p>
              <p>
                <a href="https://www.helpinghandshomecare.co.uk/live-in-care/live-in-care-for-couples/">Live-in care for couples</a> costs only a fraction more than <a href="https://www.helpinghandshomecare.co.uk/live-in-care/24-hour-care-at-home/">24-hour care</a> for one person, and there are a number of <a href="https://www.helpinghandshomecare.co.uk/costs-funding/funding-options/">funding options</a> available to aid in covering the cost.
                <br>
                <a href="https://www.helpinghandshomecare.co.uk/costs-funding/funding-options/">Find out more about costs and funding options here.</a>
              </p>
            </div>
          </div>
        </div>

        <div class="row ${ID}_flex">
          <div class="col-xs-12 col-sm-6 ${ID}_boxHalf ${ID}_bgPurple100">
            <div>
              <img src="https://cdn-sitegainer.com/skxj58gh8v47h9w.png" />
              <p>We are here seven days a week to talk through your home care needs and find the best options for you</p>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 ${ID}_boxHalf ${ID}_bgGreen25">
            <div>
              <p>Speak to one of our customer care specialists</p>
              <a class="${ID}_infinity" data-number-type="care" href="tel:03300376958">03300376958</a>
            </div>
          </div>
        </div>
      </div>
    `;

    $content.append(markup);
  };
  const whyChooseUs = () => {
    const markup = `
      <div class="${ID}_panel ${ID}_whyChooseUs ${ID}_bgSand5">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 text-center">
              <h2>Why choose Helping Hands?</h2>
              <div class="${ID}_flex">
                <div class="col-xs-6 col-sm-3">
                  <div class="${ID}_card ${ID}_bgSand25">
                    <img src="https://cdn-sitegainer.com/r406fbe8wvbt8ck.png" />
                    <p><strong>40,000 families</strong> have chosen us to care for their loved ones</p>
                  </div>
                </div>
                <div class="col-xs-6 col-sm-3">
                  <div class="${ID}_card ${ID}_bgSand25">
                    <img src="https://cdn-sitegainer.com/uv2qxasf6chh60n.png" />
                    <p>Out Trustpilot has <strong>over 800 reviews</strong> and we are rated <strong>'Excellent'</strong></p>
                  </div>
                </div>
                <div class="col-xs-6 col-sm-3">
                  <div class="${ID}_card ${ID}_bgSand25">
                    <img src="https://cdn-sitegainer.com/puvbddric1kcq8w.png" />
                    <p>We have <strong>been caring for 30+ years</strong> and are fully regulated by the CQC and CIW</p>
                  </div>
                </div>
                <div class="col-xs-6 col-sm-3">
                  <div class="${ID}_card ${ID}_bgSand25">
                    <img src="https://cdn-sitegainer.com/fhd6w342rkbhux4.png" />
                    <p>Only <strong>2% of carers</strong> that apply pass our tough application process</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xs-12 text-center ${ID}_testimonials">
              <h2>Our testimonials</h2>

              <div class="${ID}_sliderTestimonials">
                <div class="${ID}_testimonialCard ${ID}_bgSand100">
                  <p>My mum has two amazing live in carers - not only do they care for her beautifully, they make her happy and enable her to enjoy things we never thought possible after a devastating stroke. Thanks to them, her quality of life is the best it can be. Head Office and the managers have been excellent too - flexible, compassionate and supportive.</p>
                  <p><strong>Sarah, from Trustpilot</strong></p>
                </div>
                <div class="${ID}_testimonialCard ${ID}_bgSand100">
                  <p>The service provided was over and above what I expected. Living a significant distance away this level of service was a great relief to me and my sister. Although my father can grumpy sometimes they took it in they stride and developed a relationship with him and even managed to get him to take his medication! I heartily recommend Helping Hands and commend their excellent service.</p>
                  <p><strong>K Baker, from Trustpilot</strong></p>
                </div>
                <div class="${ID}_testimonialCard ${ID}_bgSand100">
                  <p>We used Helping Hands for Live-in care on and off over 4 years for our father who had suffered a stroke. They were able to provide immediate short notice excellent carers and our manager Wendy Sear was always readily available for assistance when our father's care needs changed. We would strongly recommend Helping Hands. Thank you everyone.</p>
                  <p><strong>Michelle, from Trustpilot</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    $content.append(markup);

    const $slider = window["j" + "".trim() + "Query"](
      `.${ID}_sliderTestimonials`
    );
    $slider.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          },
        },
      ],
    });
  };
  const howToArrange = () => {
    const markup = `
      <div class="${ID}_panel ${ID}_howToArrange">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 text-center">
              <h2>How to arrange live-in care</h2>
            </div>
          </div>

          <div class="${ID}_flex">
            <div class="${ID}_processWrapper ${ID}_equal">
              <div class="${ID}_line"></div>
              <div class="${ID}_card ${ID}_bgPurple5">
                <div>
                  <img src="https://cdn-sitegainer.com/tvse0r7rtgs4npi.png" />
                </div>
                <p>
                  <strong>Step 1: Speak to our team</strong>
                  <br />
                  Call our team of experts on
                  0333 060 6168 to talk through your options, and any questions you have
                </p>
              </div>

              <div class="${ID}_card ${ID}_bgPurple25">
                <div>
                  <img src="https://cdn-sitegainer.com/2k28hgcgflik4x0.png" />
                </div>
                <p>
                  <strong>Step 2: A free home care assessment</strong>
                  <br />
                  Your local Helping Hands manager will visit you to discuss your requirements face-to-face and learn about the type of carer you’re looking for.
                </p>
              </div>

              <div class="${ID}_card ${ID}_bgPurple5">
                <div>
                  <img src="https://cdn-sitegainer.com/55w3tjhhw44iqt7.png" />
                </div>
                <p>
                  <strong>Step 3: Matching you with a carer</strong>
                  <br />
                  We’ll help to match you with a carer that meets your preferences and has the necessary skills for your needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row ${ID}_flex">
          <div class="col-xs-12 col-sm-6 ${ID}_boxHalf ${ID}_bgPurple100">
            <div>
              <img src="https://cdn-sitegainer.com/skxj58gh8v47h9w.png" />
              <p>We are here seven days a week to talk through your home care needs and find the best options for you</p>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 ${ID}_boxHalf ${ID}_bgGreen25">
            <div>
              <p>Speak to one of our customer care specialists</p>
              <a class="${ID}_infinity" data-number-type="care" href="tel:03300376958">03300376958</a>
            </div>
          </div>
        </div>
      </div>
    `;

    $content.append(markup);
  };
  const fullyRegulated = () => {
    const markup = `
      <div class="${ID}_panel ${ID}_cqcPanel">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 text-center">
              <h2>Fully Regulated by the CQC / CIW</h2>
            </div>
            <div class="col-xs-12 col-sm-8 col-sm-offset-2">
              <div class="${ID}_cqc">
              </div>
            </div>
          </div>
        </div>
        <div class="${ID}_panel ${ID}_jobs text-center">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 text-center">
                <h2>Live-in care jobs</h2>
              </div>
              <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                <p>If you have a caring and compassionate nature and want to make a difference to someone’s life, working for Helping Hands could be the opportunity you’ve been waiting for.</p>

                <p>As Glassdoor’s winner of the Top 50 Best Places to Work 2018, we’re proud to provide a long list of employee benefits – you can see some of our favourites below:</p>
              </div>
              <div class="col-xs-12">
                <div class="row ${ID}_flex">
                  <div class="col-xs-6 col-sm-3 ${ID}_cardSmall">
                    <div class="${ID}_cardContent ${ID}_bgBlack5">Full-time, flexible work patterns</div>
                  </div>
                  <div class="col-xs-6 col-sm-3 ${ID}_cardSmall">
                    <div class="${ID}_cardContent ${ID}_bgBlack5">Paid holidays of up to 28 days a year, 2.33 days for every 30 you work</div>
                  </div>
                  <div class="col-xs-6 col-sm-3 ${ID}_cardSmall">
                    <div class="${ID}_cardContent ${ID}_bgBlack5">Competitive salary</div>
                  </div>
                  <div class="col-xs-6 col-sm-3 ${ID}_cardSmall">
                    <div class="${ID}_cardContent ${ID}_bgBlack5">Award-winning induction course</div>
                  </div>
                </div>
              <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                <p>If you’d like to start a career with unlimited training and development opportunities, we’re always looking for caring and like-minded individuals to join our team. For more information on finding your next job and other great benefits of working in care, please <a href="https://www.helpinghandshomecare.co.uk/jobs/">click here.</a></p>
                <div class="text-center"><a class="btn btn-default" href="https://www.helpinghandshomecare.co.uk/jobs/">Find your next job</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    $content.append(markup);
    window["j" + "".trim() + "Query"](`.${ID}_cqc`).append($cqc);
  };
  const FAQs = () => {
    const markup = `
    <div class="${ID}_panel ${ID}_faqs">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 text-center">
          <h2>FAQs</h2>
          </div>
      </div>
      <div class="branch-accordion" itemscope="" itemtype="https://schema.org/FAQPage">

        <div class="accordion-box" itemscope="" itemprop="mainEntity" itemtype="https://schema.org/Question">
            <div class="accordion-heading" role="tab" id="heading_1">
                <h4 class="panel-title">
                    <span itemprop="name">What does live-in care mean?</span>
                    <button class="OpenButton"><i class="fa fa-plus"></i></button>
                </h4>
            </div>
            <div id="collapse_1" class="accordion-content">
                <div itemscope="" itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <span itemprop="text"><p>Live-in care means you have a fully trained carer living with you in your home. Your carer will support your specific needs and routine to help you stay independent and live life the way you want to.</p>
                                      </span>
                </div>
            </div>
        </div>


        <div class="accordion-box" itemscope="" itemprop="mainEntity" itemtype="https://schema.org/Question">
            <div class="accordion-heading" role="tab" id="heading_2">
                <h4 class="panel-title">
                    <span itemprop="name">What can a live-in carer help with?</span>
                    <button class="OpenButton"><i class="fa fa-plus"></i></button>
                </h4>
            </div>
            <div id="collapse_2" class="accordion-content" aria-expanded="true" style="">
                <div itemscope="" itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <span itemprop="text"><p>A live-in carer will be on hand to meet all of your specific care needs and provide you with emotional support too. Your live-in carer can help with personal care, medication, household tasks, complex care and companionship.</p>
                    </span>
                </div>
            </div>
        </div>


        <div class="accordion-box" itemscope="" itemprop="mainEntity" itemtype="https://schema.org/Question">
            <div class="accordion-heading" role="tab" id="heading_3">
                <h4 class="panel-title">
                    <span itemprop="name">Who can benefit from having a live-in carer?</span>
                    <button class="OpenButton"><i class="fa fa-plus"></i></button>
                </h4>
            </div>
            <div id="collapse_3" class="accordion-content" aria-expanded="true" style="">
                <div itemscope="" itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <span itemprop="text"><p>Live-in care is available for adults of all ages and capabilities. With live-in care, you don’t have to move out of the home you love; a carer will come to you and provide the support you need at all times on a dedicated one-to-one basis.</p>
                    </span>
                </div>
            </div>
        </div>


        <div class="accordion-box" itemscope="" itemprop="mainEntity" itemtype="https://schema.org/Question">
            <div class="accordion-heading" role="tab" id="heading_4">
                <h4 class="panel-title">
                    <span itemprop="name">Why is it important to have CQC-regulated live-in care?</span>
                    <button class="OpenButton"><i class="fa fa-plus"></i></button>
                </h4>
            </div>
            <div id="collapse_4" class="accordion-content">
                <div itemscope="" itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <span itemprop="text"><p>CQC-regulated live-in care offers a greater support system than typical introductory agencies because they are monitored for the safety, effectiveness and responsiveness of their care.</p>
                    </span>
                </div>
            </div>
        </div>


        <div class="accordion-box" itemscope="" itemprop="mainEntity" itemtype="https://schema.org/Question">
            <div class="accordion-heading" role="tab" id="heading_5">
                <h4 class="panel-title">
                    <span itemprop="name">How much does live-in care cost?</span>
                    <button class="OpenButton"><i class="fa fa-plus"></i></button>
                </h4>
            </div>
            <div id="collapse_5" class="accordion-content">
                <div itemscope="" itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <span itemprop="text"><p>Our prices for comprehensive support from a live-in carer start from £1,125 per week for a single person and £1,425 per week for a couple.</p>
                    </span>
                </div>
            </div>
        </div>


        <div class="accordion-box" itemscope="" itemprop="mainEntity" itemtype="https://schema.org/Question">
            <div class="accordion-heading" role="tab" id="heading_6">
                <h4 class="panel-title">
                    <span itemprop="name">How are live-in carers assigned?</span>
                    <button class="OpenButton"><i class="fa fa-plus"></i></button>
                </h4>
            </div>
            <div id="collapse_6" class="accordion-content">
                <div itemscope="" itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <span itemprop="text"><p>When you arrange live-in care, we will find out your hobbies, interests and get to know you as a person. This enables us to match you with a compatible carer that is able to support you physically and mentally and likely to become a close friend over time.</p>
                    </span>
                </div>
            </div>
        </div>


        <div class="accordion-box" itemscope="" itemprop="mainEntity" itemtype="https://schema.org/Question">
            <div class="accordion-heading" role="tab" id="heading_7">
                <h4 class="panel-title">
                    <span itemprop="name">How do I know when it’s time to consider live-in care?</span>
                    <button class="OpenButton"><i class="fa fa-plus"></i></button>
                </h4>
            </div>
            <div id="collapse_7" class="accordion-content">
                <div itemscope="" itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <span itemprop="text"><p>Signs that show you might need a live-in carer are when your health has declined, and you require that extra support to help with day-to-day errands at home. It may involve help with housework and domestic duties such as preparing meals and cleaning your home.</p>
                    </span>
                </div>
            </div>
        </div>

        </div>
        </div>
        </div>
    `;

    $content.append(markup);

    window["j" + "".trim() + "Query"](".accordion-heading .OpenButton").click(
      function (event) {
        var parent =
          window["j" + "".trim() + "Query"](this).parents(".accordion-box");

        var button = window["j" + "".trim() + "Query"](this);
        if (!parent.hasClass("expanded")) {
          // window['j' + ''.trim() + 'Query'](this).closest(".branch-accordion").find(".expanded").removeClass("expanded");
          window["j" + "".trim() + "Query"](
            ".accordion-box.expanded .OpenButton"
          ).html('<i class="fa fa-plus"></i>');
          window["j" + "".trim() + "Query"](
            ".accordion-box.expanded"
          ).removeClass("expanded");
          parent.addClass("expanded");
          button.html('<i class="fa fa-minus"></i>');
        } else {
          parent.removeClass("expanded");
          button.html('<i class="fa fa-plus"></i>');
        }
        /// offset starts here
        var offset = parent.offset().top;
        offset -= 110;
        if (
          window["j" + "".trim() + "Query"](".HH035_stickyNav.sticky").length >
          0
        ) {
          offset -= window["j" + "".trim() + "Query"](
            ".HH035_stickyNav.sticky"
          ).outerHeight();
        }
        setTimeout(() => {
          //var intof = parseInt(offset);
          //alert(intof);
          offset = parseInt(offset);
          //alert(offset);
          window["j" + "".trim() + "Query"]("html, body").animate(
            { scrollTop: offset },
            400
          );
        }, 50);
      }
    ); //HH035
  };
  const reviewer = () => {
    const markup = `
      <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <div class="reviewer-profile">
          <hr />
						<p>Page reviewed by <strong><a href="/our-team-of-experts/meet-louise-bradley/">Louise Bradley</a>, Regional Care Director</strong> on February 11, 2021</p>
					</div>
        </div>
      </div>
      </div>
    `;
    $content.append(markup);
  };

  const formatPhoneNumber = (str) => {
    // Filter only numbers from the input
    let cleaned = ("" + str).replace(/\D/g, "");

    // Check if the input is of correct length
    let match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }

    return null;
  };

  const init = () => {
    clearCurrentContent();

    const changePage = () => {
      updateHero();
      whatIsLiveInCare();
      findYourCarer();
      conditionsWeCareFor();
      liveInCareHomes();
      regainIndependence();
      whoAreHelpingHands();
      costsOfLiveIn();
      whyChooseUs();
      howToArrange();
      fullyRegulated();
      FAQs();
      reviewer();

      // Add our new panels to the infinity tracked numbers list.
      // This uses the Infinity API for proper number updates.
      let infinityTrackingAdded = false;

      const infinityCheckInterval = setInterval(() => {
        // Check whether Infinity has been loaded in
        if (window._ictt && !infinityTrackingAdded) {
          // Add the main menu number and our panel to the auto discover numbers list.
          window._ictt.push([
            "_setAutoDiscoveryClasses",
            ["InfinityNumber", `${ID}_infinity`],
          ]);

          // Trigger a fresh update of the numbers.
          window._ictt.push(["_allocate"]);

          // Stop this from running again.
          infinityTrackingAdded = true;
          clearInterval(infinityCheckInterval);
        }
      }, 1000);
    };

    // Initialise Slick slider
    if ($.fn.slick) {
      changePage();
    } else {
      $.getScript(
        "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js",
        () => {
          changePage();
        }
      );
    }
  };

  init();
};
