/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 */
import { observer } from "../../../../../lib/utils";
import accordion from "./accordion/accordion";
import { getPanels, hasPanels } from "./dom";
import { getLanguage, __ } from "./helpers";
// import { logosPanel, enterprisePanel } from "./panels"; // @TODO comment
import { setup } from "./services";
import shared from "./shared";

export default () => {
  window.gc002_running = true;
  setup();

  const { ID } = shared;
  const panels = getPanels();

  let swipeTracked = false;
  const hasGA = typeof ga !== "undefined" && ga;
  const isDE = getLanguage() === "de";
  if (isDE) document.body.classList.add(`${ID}_de`);

  function throttle(callback, limit) {
    var waiting = false; // Initially, we're not waiting
    return function () {
      // We return a throttled function
      if (!waiting) {
        // If we're not waiting
        callback.apply(this, arguments); // Execute users function
        waiting = true; // Prevent future invocations
        setTimeout(function () {
          // After a period of time
          waiting = false; // And allow future invocations
        }, limit);
      }
    };
  }

  const url = window.location.href;
  // generate top content based on URL
  const topContent = () => {
    let content;
    if (
      url.indexOf("take-the-bite-out-of-failed-payments") > -1 ||
      url.indexOf("protegez-vous-des-echecs-de-paiement") > -1 ||
      url.indexOf("zahlungserfolg-ohne-drama") > -1
    ) {
      content = `<h1>${__(
        "Increase payment collection to as high as 99.5% with Success+"
      )}</h1>
      <p class="${ID}-paragraph">${__(
        "And automatically recover 76% of those payments that do fail."
      )}</p>
      <p class="${ID}-paragraph">${__(
        "Speak with us today to get a free benchmark of your payment operations and learn how GoCardless can help your business."
      )}</p>`;
    }

    return content;
  };

  const stickyHeader = () => {
    if (document.querySelector(`.${ID}-sticky-nav`)) return;

    const markup = `
      <div class="${ID}-sticky-nav">
      <div class="${ID}-sticky-content">
        <button type="button" class="css-1cclgtz ${ID}-cta"><span class="css-11qjisw">${__(
      "Contact Sales"
    )}</span></button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", markup);
    const sticky = document.querySelector(`.${ID}-sticky-nav`);
    const stickyCta = document.querySelector(`.${ID}-cta`);

    stickyCta.addEventListener("click", () => {
      const heading = document.querySelector('[data-testid="heroSliceText"]');
      if (!heading) return;
      const button = heading.querySelector("button");

      button.click();
      if (hasGA) {
        ga("gtm3.send", "event", "BL_test_2", "Sticky_CTA_Clicks");
      }
    });

    window.addEventListener(
      "scroll",
      throttle(() => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > window.innerHeight) {
          sticky.classList.add(`${ID}-active`);
        } else sticky.classList.remove(`${ID}-active`);
      }),
      100
    );
  };

  // Update hero
  const changeContent = () => {
    if (!panels.hero) return;
    const heading = panels.hero.querySelector('[data-testid="heroSliceText"]');
    if (heading) {
      let newHeading = document.querySelector(`.${ID}-heading`);
      if (!newHeading) {
        newHeading = document.createElement("div");
        newHeading.classList.add(`${ID}-heading`);
      }
      newHeading.innerHTML = topContent();

      // Update button copy
      const button = heading.querySelector("button span");
      button.innerText = __("Contact Sales");

      heading.insertAdjacentElement("afterbegin", newHeading);
    }
  };

  // add new content below the hero
  const addBelowTheSpotlight = () => {
    if (!panels.hero) return;
    const logos = document.createElement("div");
    const enterprise = document.createElement("div");

    logos.classList.add(`${ID}-clientLogos`);
    enterprise.classList.add(`${ID}-enterprise`);

    logos.innerHTML = window.logosPanel;
    enterprise.innerHTML = window.enterprisePanel;

    panels.hero.insertAdjacentElement("beforeend", logos);
    logos.insertAdjacentElement("afterend", enterprise);

    // Add event listeners to the ctas in enterprise
    const ctas = document.querySelectorAll(`.${ID}-enterpriseCta`);
    if (ctas) {
      ctas.forEach((cta) => {
        cta.addEventListener("click", () => {
          const heading = document.querySelector(
            '[data-testid="heroSliceText"]'
          );
          if (!heading) return;
          const button = heading.querySelector("button");

          button.click();
          if (hasGA) {
            ga("gtm3.send", "event", "BL_test_2", "Enterprise_CTA_Clicks");
          }
        });
      });
    }
  };

  // add new hero image
  const addImage = () => {
    if (!panels.hero) return;

    let image;
    if (
      url.indexOf("take-the-bite-out-of-failed-payments") > -1 ||
      url.indexOf("protegez-vous-des-echecs-de-paiement") > -1 ||
      url.indexOf("zahlungserfolg-ohne-drama") > -1
    ) {
      image = __(
        "https://images.ctfassets.net/40w0m41bmydz/3LjjG9waEQ2B0gIwIyv7NQ/0203e344eb9297e69768db2560505272/nwe-en-successplus_3x.jpg?w=1980&q=50"
      );
    }

    const imageBlock = panels.hero.querySelector(
      '[data-testid="heroSliceMedia"]'
    );
    if (imageBlock) {
      const newImage = document.createElement("div");
      newImage.classList.add(`${ID}-image`);
      newImage.innerHTML = `<img src="${image}"/>`;

      imageBlock.appendChild(newImage);
    }
  };

  // add video overlay
  const videoContent = () => {
    if (!panels.video) return;

    let videoSrc;
    if (url.indexOf("fr-fr") > -1) {
      videoSrc = "//fast.wistia.net/embed/iframe/98wtpe2jy5";
    } else if (url.indexOf("de-de") > -1) {
      videoSrc = "//fast.wistia.net/embed/iframe/da51hkcm4n";
    } else {
      videoSrc = "//fast.wistia.net/embed/iframe/olx2if4ppg";
    }

    const overlay = `<div class="${ID}-videoOverlay"></div>`;
    const videoBox = document.createElement("div");
    videoBox.classList.add(`${ID}-videoBox`);
    videoBox.innerHTML = `
    <div class="${ID}-close">x</div>
    <div class="${ID}-video">
      <iframe src="${videoSrc}" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" oallowfullscreen="" msallowfullscreen="" width="100%" height="100%"></iframe>
    </div>`;

    document.body.insertAdjacentHTML("beforeend", overlay);
    document.body.appendChild(videoBox);

    panels.video.classList.add(`${ID}_videoPanel`);
    panels.video.querySelector("h2").classList.add(`${ID}_vidTitle`);

    const openVideo = () => {
      document
        .querySelector(`.${ID}-videoOverlay`)
        .classList.add(`${ID}-overlayShow`);
      document
        .querySelector(`.${ID}-videoBox`)
        .classList.add(`${ID}-videoShow`);
      document.querySelector(
        `.${ID}-videoBox iframe`
      ).src = document.querySelector(`.${ID}-videoBox iframe`).src;
    };

    const closeVideo = () => {
      document
        .querySelector(`.${ID}-videoOverlay`)
        .classList.remove(`${ID}-overlayShow`);
      document
        .querySelector(`.${ID}-videoBox`)
        .classList.remove(`${ID}-videoShow`);
      document.querySelector(
        `.${ID}-videoBox iframe`
      ).src = document.querySelector(`.${ID}-videoBox iframe`).src;
    };

    const videoLink = panels.video.querySelector("a");
    if (videoLink) {
      videoLink.addEventListener("click", (e) => {
        e.preventDefault();
        openVideo();
      });
    }

    // open video
    const videoTriggers = panels.video.querySelectorAll(
      ".gatsby-image-wrapper"
    );
    if (videoTriggers) {
      videoTriggers.forEach((trig) => {
        trig.addEventListener("click", () => {
          openVideo();
        });
      });
    }

    // close video
    document
      .querySelector(`.${ID}-videoOverlay`)
      .addEventListener("click", () => {
        closeVideo();
      });
    document.querySelector(`.${ID}-close`).addEventListener("click", () => {
      closeVideo();
    });
  };

  const addReviews = () => {
    const reviewsPanel = document.querySelector(`.${ID}-reviews`);
    if (reviewsPanel) {
      const accordionPanel = document.querySelector(`.${ID}-accordion`);
      if (accordionPanel) {
        accordionPanel.insertAdjacentElement("afterend", reviewsPanel);
      }
      return;
    }
    const reviews = `
      <div class="${ID}-reviews">
      <div class="${ID}-reviews-wrapper">
        <h2>${__("See what our customers think of us")}</h2>
        <div class="${ID}-reviews-content">
          <div class="${ID}-reviews-images">
            <img src="${window.awsUrl}/bl_gc2_reviews.png" />
            <img src="${window.awsUrl}/bl_gc2_reviews_top.png" />
          </div>
          <div class="${ID}-reviews-list">
            <div class="${ID}-review">
              <p class="${ID}-review-name">${__("Abdul K")}</p>
              <p class="${ID}-review-highlight">"${__(
      "Payments Made Simple"
    )}"</p>
                        <p class="${ID}-review-text">"${__(
      "Collecting payments could not get any easier when using Gocardless"
    )}"</p>
            </div>
            <div class="${ID}-review">
              <p class="${ID}-review-name">${__("Marcus C")}</p>
              <p class="${ID}-review-highlight">${__(
      "Hassle Free and Easy To Use"
    )}</p>
                          <p class="${ID}-review-text">${__(
      "it’s so easy to use you can run more than one one plan at once, invite your customers via email by using a link or make use of the customised method. It’s so easy to see who has paid and those who haven’t you can send a reminder with the link :-)"
    )}</p>
            </div>
            <div class="${ID}-review ${ID}-review-hidden" style="margin-bottom: 0;">
              <p class="${ID}-review-name">${__("Charlotte L")}</p>
              <p class="${ID}-review-highlight">${__(
      "Easy, convenient and value for money"
    )}</p>
              <p class="${ID}-review-text">${__(
      "I love the fact that we raise invoices in Xero and GoCardless instantly picks them up, matches them to a mandate and triggers the payment. The payments even get reconciled for me! So easy. On the rare occasions I have had any issues the support team are fantastic - very helpful and knowledgeable."
    )}</p>
            </div>
            <div class="${ID}-reviews-toggle ${ID}-reviews-toggle-more">
              <span class="${ID}-reviews-more">${__("See more")}</span>
              <span class="${ID}-reviews-less">${__("See less")}</span>
              <div class="${ID}-reviews-logos">
                <img src="${window.awsUrl}/bl_gc2_reviews1.png" />
                <img src="${window.awsUrl}/bl_gc2_reviews2.png" />
                <img src="${window.awsUrl}/bl_gc2_reviews3.png" />
                <img src="${window.awsUrl}/bl_gc2_reviews4.png" />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    const accordionPanel = document.querySelector(`.${ID}-accordion`);
    accordionPanel.insertAdjacentHTML("afterend", reviews);

    // Toggle
    const showMore = document.querySelector(`.${ID}-reviews-more`);
    if (showMore) {
      showMore.addEventListener("click", (e) => {
        if (hasGA) {
          ga("gtm3.send", "event", "BL_test_2", "g2_See_More");
        }
        // Change to see less and show
        e.currentTarget.parentNode.classList.remove(
          `${ID}-reviews-toggle-more`
        );
        e.currentTarget.parentNode.classList.add(`${ID}-reviews-toggle-less`);
        const hidden = document.querySelector(`.${ID}-review-hidden`);
        if (hidden) hidden.classList.remove(`${ID}-review-hidden`);
      });
    }

    const showLess = document.querySelector(`.${ID}-reviews-less`);
    if (showLess) {
      showLess.addEventListener("click", (e) => {
        // Change to see more and hide
        e.currentTarget.parentNode.classList.add(`${ID}-reviews-toggle-more`);
        e.currentTarget.parentNode.classList.remove(
          `${ID}-reviews-toggle-less`
        );
        const lastReview = document.querySelectorAll(`.${ID}-review`);
        if (lastReview) {
          lastReview[lastReview.length - 1].classList.add(
            `${ID}-review-hidden`
          );
        }
      });
    }
  };

  const updateFeatures = () => {
    const features = panels.features1;

    if (features) {
      const title = features.querySelector("h2");
      if (title) title.innerText = __("What we can do for your business");

      const featuresList = features.querySelectorAll("ul li");
      if (featuresList) {
        if (featuresList[0]) {
          featuresList[0].querySelectorAll("p")[0].innerText = __(
            "Reduce Churn"
          );
        }
        if (featuresList[1]) {
          featuresList[1].querySelectorAll("p")[0].innerText = __(
            "Less bad debt"
          );
          if (getLanguage() === "fr") {
            featuresList[1].querySelectorAll(
              "p"
            )[1].innerText = `En moyenne, 11 à 15 % des échecs de paiement des entreprises deviennent des créances irrécouvrables.`;
          }
        }
        if (featuresList[2]) {
          featuresList[2].querySelectorAll("p")[0].innerText = __(
            "$1million+ revenue to collect"
          );
        }

        // Slider dots
        if (!document.querySelector(`.${ID}-features-dots`)) {
          const list = featuresList[0].parentNode;
          if (!list) return;

          list.insertAdjacentHTML(
            "afterend",
            `
            <div class="${ID}-features-dots" data-highlight="1">
            <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="3.41667" cy="3.5" rx="3.41667" ry="3.5" fill="#5A5A5A"/>
            </svg>

            <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="3.49999" cy="3.5" rx="3.41667" ry="3.5" fill="#C4C4C4"/>
            </svg>

            <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="3.49999" cy="3.5" rx="3.41667" ry="3.5" fill="#C4C4C4"/>
            </svg>
            </div>
            `
          );

          list.addEventListener(
            "scroll",
            throttle(() => {
              const currentScroll = list.scrollLeft;
              const dots = document.querySelector(`.${ID}-features-dots`);
              if (currentScroll < 280) dots.dataset.highlight = 1;
              else if (currentScroll < 460) dots.dataset.highlight = 2;
              else dots.dataset.highlight = 3;
              if (hasGA && !swipeTracked) {
                ga("gtm3.send", "event", "BL_test_2", "Cards_Swipe");
                swipeTracked = true;
              }
            }),
            100
          );
        }
      }
    }
  };

  const addReport = () => {
    // Move video panel to after this.
    const reportPanel = document.querySelector(`.${ID}-report`);
    if (reportPanel) {
      if (panels.video) {
        panels.video.insertAdjacentElement("afterend", reportPanel);
        return;
      }
    }

    const markup = `
      <div class="${ID}-report">
      <div class="${ID}-report-content">
        <div class="${ID}-report-text">
          <h2>
            ${__(
              `Forrester report: <br />The state of recurring payments across the globe`
            )}
          </h2>
          <a target="_blank" href="${__(
            "https://post.gocardless.com/bigger-boat/forrester-consulting-rethink-your-payment-strategy"
          )}">
            ${__("Read the full report")}
          </a>
        </div>
        <div class="${ID}-report-image">
        <img src="${__(
          "https://images.ctfassets.net/40w0m41bmydz/wGqonfndH4yznyiWBXDtd/f44ce636f7f085068249402d7ad488a9/Forrester-Report_mockup_web__1_.jpg?w=1750&h=1750&q=50"
        )}" />
        </div>
      </div>
      </div>
    `;

    if (panels.video) panels.video.insertAdjacentHTML("afterend", markup);
  };

  // remove all elements when page refreshes
  const removeAll = () => {
    const textBlock = document.querySelector(`.${ID}-heading`);
    const imageEl = document.querySelector(`.${ID}-image`);
    const videoEL = document.querySelector(`.${ID}-videoOverlay`);
    const videoBg = document.querySelector(`.${ID}-videoBox`);
    const clientLogos = document.querySelector(`.${ID}-clientLogos`);
    const enterprise = document.querySelector(`.${ID}-enterprise`);

    if (textBlock) {
      // textBlock.remove();
    }
    if (imageEl) {
      imageEl.remove();
    }
    if (videoEL) {
      videoEL.remove();
    }
    if (videoBg) {
      videoBg.remove();
    }
    if (clientLogos) {
      clientLogos.remove();
    }
    if (enterprise) {
      enterprise.remove();
    }

    // Clear out GC001 video
    const gc001vidOverlay = document.querySelector(".GC001-videoOverlay");
    const gc001vid = document.querySelector(".GC001-videoBox");
    if (gc001vidOverlay) gc001vidOverlay.remove();
    if (gc001vid) gc001vid.remove();
  };

  const hideTrustedBy = () => {
    // Show sources
    setTimeout(() => {
      if (isDE) {
        // Add sources.
        const links = `<div class="${ID}-sources">
      <p>* <a href="https://gocardless.com/guides/posts/forrester-consulting-rethink-your-payment-strategy/"><span class="css-11qjisw">Forrester Consulting: Rethink Your Payment Strategy To Save Your Customers And Bottom Line</span></a></p>
      <p>** <a href="https://gocardless.com/de/handbuch/artikel/zahlungserfolgs-index/"><span class="css-11qjisw">Zahlungserfolgs-Index 2020</span></a></p>
      </div>`;
        const footer = document.querySelector("footer > div");

        if (footer) {
          const old = document.querySelector(`.${ID}-sources`);
          if (old) old.remove();
          footer.insertAdjacentHTML("afterbegin", links);
        }
      }
    }, 1000);
  };

  observer.connect(
    document.querySelector("#mainContent"),
    () => {
      try {
        if (document.body.classList.contains("GC001")) return;

        getPanels();
        if (hasPanels(["hero", "video", "report", "benchmark1"])) {
          if (panels.trustedBy) panels.trustedBy.classList.add(`${ID}_hide`);
          if (panels.benchmark2) panels.benchmark2.classList.add(`${ID}_hide`);
          if (panels.features2) panels.features2.classList.add(`${ID}_hide`);
          if (panels.report) panels.report.classList.add(`${ID}_hide`);
          if (panels.quote) panels.quote.classList.add(`${ID}_hide`);
          if (panels.process) panels.process.classList.add(`${ID}_hide`);

          if (panels.sources) panels.sources.classList.add(`${ID}_sources`);
          if (panels.features1) {
            panels.features1.classList.add(`${ID}_features1`);
          }

          console.log(panels);
          removeAll();
          changeContent();
          addBelowTheSpotlight();
          addImage();
          videoContent();
          updateFeatures();
          accordion();
          addReviews();
          addReport();
          stickyHeader();
          hideTrustedBy();
        }
      } catch (e) {
        console.log(e);
      }
    },
    {
      throttle: 100,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    }
  );
};
