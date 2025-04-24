import { __ } from "./helpers";
import shared from "./shared";
const { ID } = shared;
const logosPanel = `
<div data-testid="logosSlice" class="css-4s3rk">
  <div class="css-8q0mgu">
    <p class="css-ad89s">${__("TRUSTED BY 55,00O BUSINESSES GLOBALLY")}</p>
    <div class="css-1v0j9k8">
      <div class="css-1kodrby">
        <div class="css-2ucl3o">
          <div
            class="gatsby-image-wrapper"
            style="position: relative; overflow: hidden"
          >
            <div style="width: 100%; padding-bottom: 50%"></div>
            <picture>
              <img
                src="//images.ctfassets.net/40w0m41bmydz/3zJyKVR7NlubuLaOr8KSV2/8c7e2e8ff22d7da4e956ddb928abd665/logo-docusign-white_3x.png?w=390&h=195&q=50"
                alt="DocuSign Logo - White"
                loading="lazy"
                class="${ID}_clientLogo"
            /></picture>
          </div>
        </div>
        <div class="css-2ucl3o">
          <div
            class="gatsby-image-wrapper"
            style="position: relative; overflow: hidden"
          >
            <div style="width: 100%; padding-bottom: 50%"></div>
            <picture>
              <img
                src="${__(
                  "//images.ctfassets.net/40w0m41bmydz/SzTISddBagUTKvz04MTiW/62adf2c819909d0e2c0280ad33452e3c/logo-hmgovernment-white_3x.png"
                )}?w=390&amp;h=195&amp;q=50"
                alt="HM Gov Logo - White"
                loading="lazy"
                class="${ID}_clientLogo"
            /></picture>
          </div>
        </div>
        <div class="css-2ucl3o">
          <div
            class="gatsby-image-wrapper"
            style="position: relative; overflow: hidden"
          >
            <div style="width: 100%; padding-bottom: 50%"></div>
            <picture>
              <img
                src="${__(
                  "//images.ctfassets.net/40w0m41bmydz/5xWczl3cnMlNMwMpGQ2EJX/0f7904b60c2c4b4993b47f602d67bb2b/logo-bulb-white_3x.png"
                )}?w=390&amp;h=195&amp;q=50"
                alt="Bulb Logo - White"
                loading="lazy"
                class="${ID}_clientLogo"
            /></picture>
          </div>
        </div>
        <div class="css-2ucl3o">
          <div
            class="gatsby-image-wrapper"
            style="position: relative; overflow: hidden"
          >
            <div style="width: 100%; padding-bottom: 50%"></div>
            <picture>
              <img
                src="${__(
                  "//images.ctfassets.net/40w0m41bmydz/34m60pSWeo1G9SBF5w2QXL/64d5a414eb31606826a8df09a64db019/logo-theguardian-white_3x.png"
                )}?w=390&amp;h=195&amp;q=50"
                alt="The Guardian Logo - White"
                loading="lazy"
                class="${ID}_clientLogo"
            /></picture>
          </div>
        </div>
        <div class="css-2ucl3o">
          <div
            class="gatsby-image-wrapper"
            style="position: relative; overflow: hidden"
          >
            <div style="width: 100%; padding-bottom: 50%"></div>
            <picture>
              <img
                src="//images.ctfassets.net/40w0m41bmydz/1qnHkgqXYdvHVyZ8JH3j1K/f0477902cfdaabac1b89badd8db052e5/logo-aon_3x.png?w=390&amp;h=195&amp;q=50"
                alt="logo-aon@3x"
                loading="lazy"
                class="${ID}_clientLogo"
            /></picture>
          </div>
        </div>
        <div class="css-2ucl3o">
          <div
            class="gatsby-image-wrapper"
            style="position: relative; overflow: hidden"
          >
            <div style="width: 100%; padding-bottom: 50%"></div>
            <picture>
              <img
                src="${__(
                  "//images.ctfassets.net/40w0m41bmydz/45kNVs3R92oZeXB8BZnu80/6e2eab80b40df7e882e2c493363d9f27/logo-tripadvisor-white_3x.png"
                )}?w=390&amp;h=195&amp;q=50"
                alt="TripAdvisor Logo - White"
                loading="lazy"
                class="${ID}_clientLogo"
            /></picture>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
const enterprisePanel = `
<div class="css-8q0mgu">
  <h2 class="css-16kmxks">${__("Meet our enterprise payments solutions")}</h2>
  <div class="css-13o7eu2">
    <div class="css-1r9gy30"></div>
    <div class="css-15ruoe0">
      <div class="css-sylj45">
        <div role="group" data-testid="imageCard" class="css-dyakpc">
          <div class="css-1t6hi6f">
            <div
              class="gatsby-image-wrapper"
              style="position: relative; overflow: hidden"
            >
              <div style="width: 100%; padding-bottom: 60%"></div>
              <picture
                ><img src="${__(
                  "//images.ctfassets.net/40w0m41bmydz/6TbnaKS52Yyw2iheiUyuTh/357d6e09f4d3067cfbcab697d203b3c5/nwe-card-subscriptions-b-reversed_2.5x.jpg"
                )}?w=1980&amp;q=50" alt="${__("Subscription payments")}"
                loading="lazy" class="${ID}_enterpriseImage"></picture
              >
            </div>
          </div>
          <span class="css-t9sm7q"></span>
          <div class="css-lo4278">
            <div class="css-114tpbk">
              <p class="css-1i1yam1">${__("Subscription payments")}</p>
              <p class="css-byi343">
                ${__(
                  "Collect subscriptions and membership payments by Direct Debit across the globe, minimise involuntary churn and reduce operational costs."
                )}
              </p>
              <p class="css-10xoz4e"><span data-tracked="true" class="${ID}-enterpriseCta css-1wavj4p"><span class="css-11qjisw">${__(
  "Contact Sales"
)}</span><span class="css-1kut0m"><svg width="1em" height="1em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" class="css-1gzz125"><path d="M11.796 4.188l-.878.879 2.698 2.698H0V9.02h13.616l-2.698 2.698.878.878L16 8.392z" fill-rule="evenodd"></path></svg></span></span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="css-sylj45">
        <div role="group" data-testid="imageCard" class="css-dyakpc">
          <div class="css-1t6hi6f">
            <div
              class="gatsby-image-wrapper"
              style="position: relative; overflow: hidden"
            >
              <div style="width: 100%; padding-bottom: 60%"></div>
              <picture
                ><img src="${__(
                  "//images.ctfassets.net/40w0m41bmydz/1TG8vcIU256NmZHYvPJHHl/9e8eb4d6657e24716e6d5fde1c83d3d3/nwe-card-invoices-c-reversed_2.5x.jpg"
                )}?w=1980&amp;q=50" alt="${__("Invoice payments")}"
                loading="lazy" class="${ID}_enterpriseImage"></picture
              >
            </div>
          </div>
          <span class="css-t9sm7q"></span>
          <div class="css-lo4278">
            <div class="css-114tpbk">
              <p class="css-1i1yam1">${__("Invoice payments")}</p>
              <p class="css-byi343">
                ${__(
                  "Predictable and streamlined invoice collection and reconciliation. Eliminate the time-consuming invoice management processes that hold back growth."
                )}
              </p>
              <p class="css-10xoz4e"><span data-tracked="true" class="${ID}-enterpriseCta css-1wavj4p"><span class="css-11qjisw">${__(
  "Contact Sales"
)}</span><span class="css-1kut0m"><svg width="1em" height="1em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" class="css-1gzz125"><path d="M11.796 4.188l-.878.879 2.698 2.698H0V9.02h13.616l-2.698 2.698.878.878L16 8.392z" fill-rule="evenodd"></path></svg></span></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

window.logosPanel = logosPanel;
window.enterprisePanel = enterprisePanel;

export { logosPanel, enterprisePanel };
