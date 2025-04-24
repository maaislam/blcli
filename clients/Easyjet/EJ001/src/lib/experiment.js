import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default () => {
  if (VARIATION === "control") {
    return;
  }

  const elementReady = (selector) => {
    return new Promise((resolve) => {
      const el = document.querySelector(selector);
      if (el) {
        resolve(el);
      }
      new MutationObserver((_, observer) => {
        Array.from(document.querySelectorAll(selector)).forEach((element) => {
          resolve(element);
          observer.disconnect();
        });
      }).observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    });
  };

  elementReady(".seat-section-wrapper").then(() => {
    const passengers = document.querySelectorAll(".passenger-list li");
    const infants =
      document.querySelectorAll(".passenger-list .infant").length > 0;
    let checkGroupedOnly = false;

    const isAvailable = (seat) => {
      if (checkGroupedOnly) {
        if (infants) {
          return (
            !seat.classList.contains("unavailable") &&
            !seat.classList.contains("restricted") &&
            seat.classList.contains(`${ID}-grouped`)
          );
        }
        return (
          !seat.classList.contains("unavailable") &&
          seat.classList.contains(`${ID}-grouped`)
        );
      }
      return !seat.classList.contains("unavailable");
    };

    const seatMap = document.querySelector(".available-seat-map");

    if (seatMap) {
      const filters = document.createElement("aside");
      filters.classList.add(`${ID}-wrapper`);

      seatMap.insertAdjacentElement("beforeend", filters);

      filters.innerHTML = /* html */ `
          <div>
            <h3>Filters</h3>
            <p>Find the perfect seats based on your preferences.</p>
            <div class="${ID}-filters-list">
            ${
              passengers.length > 1 && passengers.length < 7
                ? /* html */
                  `
                  <label>
                    <input
                      type="checkbox"
                      class="${ID}-filter-checkbox ${ID}-filter-sit-together"
                      
                    />
                    <span class="${ID}-filter-checkbox-content">
                      <span class="${ID}-filter-checkbox-icon people"></span>
                      <span>
                        Do you want to sit together?
                      </span>
                    </span>
                  </label>
                  `
                : ""
            }
              <h3>At the airport</h3>
              <label>
              <input type="checkbox" class="${ID}-filter-checkbox" data-value='speedyBoarding' />
                <span class="${ID}-filter-checkbox-content">
                  <span class="${ID}-filter-checkbox-icon speedy"></span>
                  <span>
                    Speedy boarding <br>
                    <span class="${ID}-filter-checkbox-small-text">(Board first & exit first)</span>
                  </span>
                </span>
              </label>
              <label>
              <input type="checkbox" class="${ID}-filter-checkbox" data-value='dedicatedBagdrop' />
                <span class="${ID}-filter-checkbox-content">
                  <span class="${ID}-filter-checkbox-icon bagdrop"></span>
                  <span>
                    Dedicated bagdrop <br>
                    <span class="${ID}-filter-checkbox-small-text">(Move through the airport quicker)</span>
                  </span>
                </span>
              </label>
              <h3>Seat features</h3>
              <p>All seats include 1 small under seat bag</p>
              <label>
                <input type="checkbox" class="${ID}-filter-checkbox" data-value='largeOverhead' />
                <span class="${ID}-filter-checkbox-content">
                  <span class="${ID}-filter-checkbox-icon overhead"></span>
                  <span>
                    Large overhead <br>
                    <span class="${ID}-filter-checkbox-small-text">(Have everything you need at hand)</span>
                  </span>
                </span>
              </label>
              <label>
                <input type="checkbox" class="${ID}-filter-checkbox" data-value='closeToToilet' />
                <span class="${ID}-filter-checkbox-content">
                  <span class="${ID}-filter-checkbox-icon toilet"></span>
                  <span>
                    Sit close to a toilet <br>
                    <span class="${ID}-filter-checkbox-small-text">(Perfect for little bladders)</span>
                  </span>
                </span>
              </label>
              <label>
                <input type="checkbox" class="${ID}-filter-checkbox" data-value='extraLegroom' />
                <span class="${ID}-filter-checkbox-content">
                  <span class="${ID}-filter-checkbox-icon legroom"></span>
                  <span>
                    Extra Legroom
                  </span>
                </span>
              </label>
            </div>
            <div class='${ID}-colours-list'>
                <h3>What do the colours mean?</h3>
                <div class="${ID}-key">
                  <span class="orange"></span> Orange: Your selected seats
                </div>
                <div class="${ID}-key"><span class="green">
                  </span> Green: Seats recommended for you
                </div>
                <div class="${ID}-key">
                  <span class="grey"></span> Grey: Unavailable seats
                </div>
                <div class="${ID}-key">
                  <span class="white"></span> White: All available seats
                </div>
            </div>
          </div>
        `;

      const adBanner = document.querySelector(
        ".information > div .generic-html-block.ej-text"
      );

      if (adBanner) filters.appendChild(adBanner);
    }

    const init = () => {
      const sections = document.querySelectorAll(".seat-section-wrapper");
      const seats = [...document.querySelectorAll(".seat")];
      const perRow = 6;
      const matrix = [];
      const sitTogetherSeats = [];
      let selectedFilters = [];

      const filterSitTogether = document.querySelector(
        `.${ID}-filter-sit-together`
      );

      const runTogetherChecker = (checkbox) => {
        if (checkbox.checked) {
          checkGroupedOnly = true;
        } else {
          checkGroupedOnly = false;
        }
      };

      if (filterSitTogether) {
        runTogetherChecker(filterSitTogether);
        filterSitTogether.addEventListener("change", () => {
          runTogetherChecker(filterSitTogether);
        });
      }

      for (let i = 1; i <= seats.length / perRow; i += 1) {
        const rowSeats = seats.slice((i - 1) * perRow, i * perRow);
        let matrixRow;

        if (infants) {
          matrixRow = rowSeats.map((s) =>
            s.classList.contains("unavailable") ||
            s.classList.contains("restricted")
              ? 0
              : 1
          );
        } else {
          matrixRow = rowSeats.map((s) =>
            s.classList.contains("unavailable") ? 0 : 1
          );
        }

        matrix.push(matrixRow);
      }

      const numPassengers = passengers.length;

      matrix.forEach((row, idx) => {
        let validIndices = [];
        let k = 0;

        while (k + numPassengers <= row.length) {
          if (row.slice(k, k + numPassengers).every((f) => f === 1)) {
            const indices = Array.from(
              { length: numPassengers },
              (v, i) => i + k
            );

            validIndices = validIndices.concat(indices);
          }
          k += 1;
        }

        const validRows = validIndices.filter((v, i, a) => a.indexOf(v) === i);

        const validSeats = validRows.map((result) => result + idx * perRow);

        validSeats.forEach((seat) => sitTogetherSeats.push(+seat));
      });

      sitTogetherSeats.forEach((seat) => {
        seats[seat].classList.add(`${ID}-grouped`);
      });

      class Section {
        constructor(element, features) {
          this.seats = element.querySelectorAll(".seat");
          this.features = features;
        }

        highlight(filter) {
          this.seats.forEach((seat) => {
            seat.classList.remove(`${ID}-highlighted`);
          });

          if (checkGroupedOnly && selectedFilters.length < 1) {
            seats.forEach((seat) => {
              if (isAvailable(seat)) {
                seat.classList.add(`${ID}-highlighted`);
              }
            });
          }

          if (filter) {
            this.seats.forEach((seat) => {
              seat.classList.remove(`${ID}-highlighted`);
            });
            this.seats.forEach((seat) => {
              if (isAvailable(seat)) {
                seat.classList.add(`${ID}-highlighted`);
              }
            });
          }
        }
      }

      const sectionOne = new Section(sections[0], [
        "speedyBoarding",
        "dedicatedBagdrop",
        "largeOverhead",
        "closeToToilet",
        "extraLegroom",
      ]);
      const sectionTwo = new Section(sections[1], [
        "speedyBoarding",
        "dedicatedBagdrop",
        "largeOverhead",
        "closeToToilet",
      ]);
      const sectionThree = new Section(sections[2], []);
      const sectionFour = new Section(sections[3], [
        "speedyBoarding",
        "dedicatedBagdrop",
        "largeOverhead",
        "extraLegroom",
      ]);
      const sectionFive = new Section(sections[4], []);

      const filterCheckboxes = document.querySelectorAll(
        `.${ID}-filter-checkbox`
      );

      const seatChecker = (section) => {
        if (selectedFilters.length === 0) return false;
        return selectedFilters.every((filter) => section.includes(filter));
      };

      const runChecker = (checkbox) => {
        if (checkbox.checked && checkbox.dataset.value) {
          selectedFilters.push(checkbox.dataset.value);
        } else {
          selectedFilters = selectedFilters.filter(
            (val) => val !== checkbox.dataset.value
          );
        }

        [
          sectionOne,
          sectionTwo,
          sectionThree,
          sectionFour,
          sectionFive,
        ].forEach((section) => {
          section.highlight(seatChecker(section.features));
        });
      };

      filterCheckboxes.forEach((checkbox) => {
        runChecker(checkbox);
        checkbox.addEventListener("change", () => {
          runChecker(checkbox);
        });
      });

      const o = new MutationObserver((mutations, observer) => {
        const m = [];
        mutations.forEach((mutation) => {
          if (
            mutation.addedNodes.length > 0 &&
            mutation.addedNodes[0].nodeName === "DIV" &&
            mutation.addedNodes[0].classList.contains("seat-wrapper")
          ) {
            m.push(mutation);
          }
        });
        if (m.length > 0) {
          init();
          observer.disconnect();
        }
      });

      o.observe(seatMap, { childList: true, subtree: true });
    };

    init();
  });
};
