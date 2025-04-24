import shared from './shared';

export default {
  1: {
    image: '',
    title: `<h2>1. Stay in the home you know and love</h2>`,
    text: `<p>Whether you need round-the-clock support from a live-in carer or visiting calls throughout the week, we have over 100 branches across England and Wales that are local to you.</p>
    <p>Our bespoke care plans enable you to stay in the comfort and safety of your own home whilst retaining your independence and living the life you want to lead.</p>`,
  },
  2: {
    image: '',
    title: `<h2>2. Quality care tailored to you</h2>`,
    text: `<p>Unlike some residential homes that rely heavily on agency staff and are unregulated, we directly employ and train all of our carers so that the quality of your care is always guaranteed and centred around you.</p>
    <p>We are also fully-regulated by the Care Quality Commission (CQC), who ensure we provide a safe, responsive and effective service.</p>
    <div class="${shared.ID}-tile__footer">
      <div class="${shared.ID}-text">Fully regulated and approved by the CQC / CIW</div>
      <div class="${shared.ID}-icons__wrapper">
        <div class="${shared.ID}-icon cqc-icon"></div>
        <div class="${shared.ID}-icon ciw-icon"></div>
      </div>
    </div>`,
  },
  3: {
    image: '',
    title: `<h2>3. Honest and open with fees</h2>`,
    text: `<p>From the beginning of your journey with us, we are open and transparent about our fees, giving you piece of mind that everything is covered from the outset. We don’t have hidden costs or lengthy notice periods, and we can adapt care around your changing needs.</p>
    <p>Our friendly advisors are available to discuss the type of support you may require and the different options available to you. Simply give them a call today and they will be happy to help.</p>`,
  },
};