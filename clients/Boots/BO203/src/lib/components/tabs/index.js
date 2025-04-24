import shared from "../../../../../../../core-files/shared";
import tab from "./tab";
import loader from "../loader";
import { pollerLite } from "../../../../../../../lib/utils";
import { fireEvent } from "../../../../../../../core-files/services";
import { loadPerfectBundle, removeLoader } from "../../utils";

const { ID } = shared;

const tabs = (data, activeTab) => {
  const resizeTabMarker = () => {
    if (tabContainer.querySelector(`:scope .${ID}-active button`)) {
      const activeTabEl = tabContainer.querySelector(
        `:scope .${ID}-active button`
      );
      const activeMarker = tabContainer.querySelector(
        `.${ID}-tabs-active-marker`
      );

      activeMarker.style.width = `${
        activeTabEl.getBoundingClientRect().width
      }px`;
      activeMarker.style.transform = `translateX(${
        activeTabEl.getBoundingClientRect().left -
        tabContainer.getBoundingClientRect().left
      }px)`;
    }
  };

  const state = {
    tab: activeTab,

    set activeTab(val) {
      this.tab = val;

      tabContainer.querySelectorAll(":scope > li").forEach((tab) => {
        const id = tab.querySelector("button").getAttribute("data-id");
        tab.classList.remove(`${ID}-active`);

        if (id === this.tab) {
          tab.classList.add(`${ID}-active`);
        }
      });

      resizeTabMarker();

      const allTabContnent = contentContainer.querySelectorAll("[data-tab]");

      allTabContnent.forEach((content) => {
        content.classList.remove("active");

        if (content.dataset.tab == this.tab) {
          content.classList.add("active");
        }
      });
    },
  };

  const tabs = document.createElement("div");

  tabs.innerHTML = /* html */ `
		<div class="${ID}-tabs">
			<div class="${ID}-tabs-list-outer">
				<ul class="${ID}-tabs-list">
					<span class="${ID}-tabs-active-marker"></span>
				</ul>
			</div>
			<div class="${ID}-tabs-content">
			</div>
		</div>
	`;

  const tabContainer = tabs.querySelector(`.${ID}-tabs-list`);
  const contentContainer = tabs.querySelector(`.${ID}-tabs-content`);

  new ResizeObserver(() => resizeTabMarker()).observe(tabContainer);

  const WAIT_TIMEOUT = 5000;

  const pollerOptions = {
    timeout: WAIT_TIMEOUT,
  };

  const removeTab = (id) => {
    const removeEls = () => {
      tabContainer.querySelector(`[data-id='${id}']`).parentElement.remove();
      contentContainer.querySelector(`[data-tab='${id}']`).remove();
    };

    removeEls();
    tabContainer.querySelector(":scope > li > button").click();
    resizeTabMarker();
  };

  data.forEach((item) => {
    tabContainer.append(
      tab(item.title, item.id, (e) => {
        state.activeTab = e.target.dataset.id;

        e.target.scrollIntoView({
          inline: "center",
          behavior: "smooth",
          block: "nearest",
        });

        fireEvent(`${e.target.dataset.id} tab clicked`);
      })
    );

    if (item.id === "reviews") {
      pollerLite(
        ["button#ratings-summary", "button.bv_button_buttonFull"],
        () => {
          const reviewsTab = tabContainer.querySelector(
            'button[data-id="reviews"]'
          );

          if (reviewsTab) {
            const ratings = document.querySelector("button#ratings-summary");
            const ratingsButton = document.querySelector(
              "button.bv_button_buttonFull"
            );

            ratings.addEventListener("click", () => {
              reviewsTab.click();
              reviewsTab.scrollIntoView();
            });

            ratingsButton.addEventListener("click", () => {
              reviewsTab.click();
              reviewsTab.scrollIntoView();
            });
          }
        }
      );
    }

    const contentWrapper = document.createElement("div");
    contentWrapper.setAttribute("data-tab", item.id);
    contentWrapper.append(loader());

    const tabTimeout = setTimeout(() => removeTab(item.id), WAIT_TIMEOUT);

    if (item.element == null) {
      if (item.elRef === ".inc_pdp_block") {
        loadPerfectBundle().then((el) => {
          removeLoader(contentWrapper);
          contentWrapper.append(el);
          clearTimeout(tabTimeout);
        });
      } else {
        pollerLite(
          [item.elRef],
          () => {
            removeLoader(contentWrapper);
            contentWrapper.append(
              document.querySelectorAll(item.elRef)[item.elRefIdx]
            );
            clearTimeout(tabTimeout);
          },
          pollerOptions
        );
      }
    } else if (item.element.firstElementChild) {
      removeLoader(contentWrapper);
      contentWrapper.append(item.element);
      clearTimeout(tabTimeout);
    }

    contentContainer.append(contentWrapper);
  });

  state.activeTab = activeTab;

  return tabs;
};

export default tabs;
