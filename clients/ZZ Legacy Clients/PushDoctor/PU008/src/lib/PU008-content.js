export const bodyMarkup = (
  `<div class="PU8-wrapper">
      <div class="PU8-header_slider"/>
      <div class="PU8-body_content"
          <p>With Push Doctor you can see a GP when you need to. We connect you with our experienced NHS-trained doctors online.</p>
          <span>10 minutes could be all you need to feel better*</span>
          <a class="PU8-anchor-pres" href="#PU8-prescription">Need a prescription? Learn more</a>
      </div>
      <div class="PU8-started_wrapper">
          <div class="PU8-sectionHeader">Getting Started</div>
          <div class="PU8-stages_slider"/>
      </div>
      <div class="PU8-cta_wrapper">
          <a class="PU8-book btn_seeadoctor_black" href="https://patient.pushdoctor.co.uk/see-a-doctor-2/select-time">Book appointment now</a>
          <a class="PU8-applink" href="https://www.pushdoctor.co.uk/how-it-works/app">Or get the app</a>
      </div>
  </div>`
);
export const headerMessages = [
  ['SEE A DOCTOR IN MINUTES FOR A DIAGNOSIS AND MEDICATION'],
  ['PRESCRIPTIONS SENT STRAIGHT TO YOUR LOCAL PHARMACY'],
  ['SICK NOTES AND REFERRAL LETTERS SENT IMMEDIATELY']
]

export const stages = {
    stage1: {
        title: '1. BOOK AN APPOINTMENT',
        image: '//cdn.optimizely.com/img/7714711789/33e4144f8fd24962977d881b2335bb7b.png',
        message: 'Pick an appointment time to be seen in minutes, or choose a time that suits you.',
    },
    stage2: {
        title: '2. SIGN UP OR LOG INTO YOUR ACCOUNT',
        image: '//cdn.optimizely.com/img/7714711789/0c85518cd93e428dbfa835199e5808a2.png',
        message: 'It only takes minutes to set up your account (have your ID and payment card ready). Secure login makes it easy to book any future appointments.',
    },
    stage3: {
        title: '3. SEE A DOCTOR ONLINE',
        image: '//cdn.optimizely.com/img/7714711789/b3e9b9cd5bb0430c99998dcf8872cf02.png',
        message: 'Talk face-to-face with a UK GP via a video call using our app or website.',
    },
    stage4: {
        title: '4. START FEELING BETTER',
        image: '//cdn.optimizely.com/img/7714711789/a7ab9d6edecc462892542eacc716f893.png',
        message: 'Get medical advice, same-day prescriptions, referrals and sick notes - No stressful travel or physical waiting rooms',
    }
}

export const videoArea = 
`<div class="PU8-sectionHeader">No waiting, no worrying</div>
    <div class="PU8-leftUsps"/>
    <div class="PU8-rightvideo">
        <div class="PU8-video_container">
            
        </div>
    </div>
    <div class="PU8-rightUsps"/>
    <span class="PU8-smallText">
     *Appointments are booked in 10 minute slots (the same as your local GP clinic). 9/10 people find this is all they need. Appointments can be extended as needed.
    </span>
<div class="PU8-link PU8-sectionHeader">Get the diagnosis, advice, and treatment you need <a class="PU8-anchor-treat" href="#PU8treat">Find out what we treat</a></div>
`

export const videoUsps = [
    ['Out-of-hours appointments'],
    ['No stressful travel or physical waiting rooms'],
    ['The help you need in a simple 10 minute consultation*'],
    ['Our GPs are NHS-trained - <a class="PU8-anchor PU8-doctor_link" href="#hs_cos_wrapper_widget_1469185071725">Meet our doctors</a>'],
    ['Compatible with your device - <a class="PU8-applink" href="https://www.pushdoctor.co.uk/how-it-works/app">Get the app</a>'],
    ['Just £20 per appointment'],
]

export const pricingArea = (
    `<div class="PU8-pricingSection">
        <p>Sign up and pay per appointment or go Premium for more freedom</p>
        <div class="PU8-pricingInfo"/>
        <a class="PU8-pricingLink" href="https://www.pushdoctor.co.uk/pricing">Read more about pricing and find the best plan for you</a>
        <a class="PU8-book btn_seeadoctor_black" href="https://patient.pushdoctor.co.uk/see-a-doctor-2/select-time">Book appointment now</a>
     </div>`
);


export let bottomTextBlocks = {
    block1: {
        contentTitle: 'Pricing',
        contentText: ''
    },
    block2: {
        contentTitle: 'Prescriptions',
        contentText: 'Following a consultation, our GPs can write same-day prescriptions that are delivered directly to your local pharmacy.<br></br>Book an appointment for just £20, and get your prescription for an additional £8 admin fee.<br></br>As the prescription is private, you’ll need to pay for your medication at the pharmacy. The cost is often cheaper than an NHS prescription.'
    },
    block3: {
        contentTitle: 'What we treat',
        contentText: '<ul id ="PU8treat" class="PU8-treatment_links"/>'
    },
    block4: {
        contentTitle: 'Referral letters',
        contentText: 'Our doctors can issue a referral letter if you need one, helping you get to the next stage of your treatment or assessment as soon as possible.<br></br> We can refer you to an NHS, or private specialist.<br></br>Book an appointment with one of our GPs for just £20. They can write you a referral letter to see a specialist for an additional £15.'
    },
    block5: {
        contentTitle: 'Sick notes',
        contentText: 'Speak to one of our GPs if you think you need a sick note. If appropriate, they\'ll send you one after your consultation via email or first class post.<br></br>Our sick notes are the same as the ones your regular GP can write.<br></br>Book an appointment with one of our GPs for just £20 and they can write you a sick note for an additional £15.'
    },
    block6: {
        contentTitle: 'Child consultations',
        contentText: 'Our GPs have years of experience in providing care for the whole family and can treat children of all ages. <br></br>If you think there’s something wrong with your child, or they’re experiencing symptoms you haven’t seen before, speak to a GP online today.<a class="PU8-childLink" href="https://www.pushdoctor.co.uk/how-it-works/family">Read more about child consultations</a>'
    }
}

export let conditions = [
    ['Skin Conditions', 'https://www.pushdoctor.co.uk/what-we-treat/skin-conditions'],
    ['Mental Health', 'https://www.pushdoctor.co.uk/what-we-treat/mental-health'],
    ['Joint Pain', 'https://www.pushdoctor.co.uk/what-we-treat/joint-pains-and-aches'],
    ['Eye Problems', 'https://www.pushdoctor.co.uk/what-we-treat/eye-problems'],
    ['Ear Problems', 'https://www.pushdoctor.co.uk/what-we-treat/ear-problems'],
    ['Sexual Health', 'https://www.pushdoctor.co.uk/what-we-treat/sexual-health'],
    ['Stomach and Digestive Problems', 'https://www.pushdoctor.co.uk/what-we-treat/digestive-problems'],
    ['A-Z of conditions, treatments & symptoms', 'https://www.pushdoctor.co.uk/what-we-treat/a-z'],
    ['Allergies', 'https://www.pushdoctor.co.uk/what-we-treat/allergies'],
    ['Colds, Flu and Respiratory Tract Infections', 'https://www.pushdoctor.co.uk/what-we-treat/cold-flu-rtis'],
    ['Pregnancy-related Conditions', 'https://www.pushdoctor.co.uk/what-we-treat/pregnancy-conditions'],
    ['Headaches and Migraines', 'https://www.pushdoctor.co.uk/what-we-treat/headaches-and-migraines'],
    ['Bites and Stings', 'https://www.pushdoctor.co.uk/what-we-treat/insect-bites-stings'],
    ['Hair Loss', 'https://www.pushdoctor.co.uk/what-we-treat/hair-loss']
]

export const videoLightbox =
`   <div class="PU8-exit"><span>&times;</span>Back</div>
    <div class="PU8-videoBig">
    <iframe id="PU8-yt" src='https://www.youtube.com/embed/1P_N0q3uoGU' frameborder='0' allowfullscreen allow="autoplay;encrypted-media"></iframe>
    </div>`




