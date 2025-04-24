import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";

const { ID } = shared;

export const clickHandler = (target) => {
  // console.log(target);
  if (target.closest(`div[data-testid="navigationBar"] a[data-module-name="loginLink"]`)) {
    // console.log(`User interacts with Log in CTA in the header`);
    fireEvent(`User interacts with Log in CTA in the header`);
  } else if (target.closest(`div[data-testid="navigationBar"] a[data-module-name="signupLink"]`)) {
    // console.log(`User interacts with Sign Up CTA in the header`);
    fireEvent(`User interacts with Sign Up CTA in the header`);
  } else if (target.closest(`.css-12afgtl a`)?.textContent?.toLowerCase()?.includes(`get started`)) {
    // console.log(`User interacts with Get Started CTA at the bottom of the article`);
    fireEvent(`User interacts with Get Started CTA at the bottom of the article`);
  } else if (target.closest(`.css-12afgtl a`)?.textContent?.toLowerCase()?.includes(`learn more`)) {
    // console.log(`User interacts with Learn More CTA at the bottom of the article`);
    fireEvent(`User interacts with Learn More CTA at the bottom of the article`);
  } else if (target.closest(`.css-12afgtl a`)?.textContent?.toLowerCase()?.includes(`sign up`)) {
    // console.log(`User interacts with sign up CTA  at the bottom of the article`);
    fireEvent(`User interacts with sign up CTA  at the bottom of the article`);
  } else if (target.closest(`.GCOR003_buttons span`)?.textContent?.toLowerCase()?.includes(`learn more`)) {
    // console.log(`User interacts with Learn More CTA in the sticky banner`);
    fireEvent(`User interacts with Learn More CTA in the sticky banner`);
  } else if (target.closest(`.GCOR003_buttons a`)?.textContent?.toLowerCase()?.includes(`sign up`)) {
    // console.log(`User interacts with Sign Up CTA  in the sticky banner`);
    fireEvent(`User interacts with Sign Up CTA  in the sticky banner`);
  } else if (target.closest(`.css-ij8wv0 a`)) {
    // console.log(`User interacts with Contact Sales CTA at the bottom of the page`);
    fireEvent(`User interacts with Contact Sales CTA at the bottom of the page`);
  } else if (target.closest(`nav[aria-labelledby="tableOfContentsHeading"] ol li`)) {
    const contentText = target.closest(`span`)?.textContent?.trim();
    // console.log(`User interacts with table of contents: ${contentText}`);
    fireEvent(`User interacts with table of contents: ${contentText}`);
  } else if (target.closest(`.${ID}-reviewSection-top-Link`)) {
    // click action
    !target.closest(`.${ID}-reviewSection-top-Link.cta-clicked`) && target.closest(`.${ID}-reviewSection-top-Link`).classList.add(`cta-clicked`);
    // tracking
    const contentText = `View all 250+ G2 reviews`;
    // console.log(`User interacts with table of contents: ${contentText}`);
    fireEvent(`User interacts with review link: ${contentText}`);
  } else if (target.closest(`.${ID}-reviewSection-top-CTA`)) {
    // click action
    const element = document.querySelector(`.${ID}-reviewSection-footer`);
    element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    !target.closest(`.${ID}-reviewSection-top-CTA.cta-clicked`) && target.closest(`.${ID}-reviewSection-top-CTA`).classList.add(`cta-clicked`);
    // tracking
    const contentText = `Read our reviews`;
    // console.log(`User interacts with table of contents: ${contentText}`);
    fireEvent(`User interacts with review CTA: ${contentText}`);
  } else if (target.closest(`.swiper .swiper-button-next`)) {
    // console.log(`User interacts with the arrows on the G2 carousel: clicked next`);
    fireEvent(`User interacts with the arrows on the G2 carousel: clicked next`);
  } else if (target.closest(`.swiper .swiper-button-prev`)) {
    // console.log(`User interacts with the arrows on the G2 carousel: clicked prev`);
    fireEvent(`User interacts with the arrows on the G2 carousel: clicked prev`);
  } else if (target.closest(`.swiper a.${ID}-reviewElement`)) {
    // console.log(`User interacts with the individual review`);
    fireEvent(`User interacts with the individual review`);
  } else if (target.closest(`footer[data-testid="footer"] a`)?.textContent?.toLowerCase()?.includes(`contact sales`)) {
    // console.log(`User interacts with the contact sales cta in the footer`);
    fireEvent(`User interacts with the contact sales cta in the footer`);
  }
};
