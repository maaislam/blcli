/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { observer } from "../../../../../lib/utils";
import { roomPoints, topKeyPoints } from "./data";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  /**
   * Change room name
   */
  const changeRoomName = () => {
    const allRooms = document.querySelectorAll(".rateGroups .col-sm-5");
    for (let index = 0; index < allRooms.length; index += 1) {
      const element = allRooms[index];
      if (element.querySelector(".room-details") && element.querySelector(".room-details").innerText === "Standard Room") {
        element.querySelector(".room-details").innerText = "Standard Family Room";
      }

      /* add room image to carousel */
      element.querySelector(".carousel-item").classList.remove("active");
      element.querySelector(".carousel-inner").insertAdjacentHTML("afterbegin", '<div class="carousel-item active"><img class="carousel-img d-block w-100" src="https://travelodge.wpengine.com/wp-content/uploads/2017/10/KidsInBed-717x536-600x449.jpg" alt="undefined"></div>');
    }
  };
  changeRoomName();

  /**
   * Add hotel key points
   */
  const topSection = document.querySelector(".key-points-margin .trv-bullets");
  for (let index = 0; index < topKeyPoints.length; index++) {
    const topPoint = topKeyPoints[index];
    const point = document.createElement("li");
    point.classList.add(`${ID}-point`);
    point.innerHTML = `<span>${topPoint}</span>`;

    topSection.appendChild(point);
  }

  /**
   * Add room key points
   */
  const addRoomPoints = () => {
    const roomPointArr = document.querySelectorAll(".room-key-point-container .room-key-point-wrapper");
    let roomArr = [];

    for (let index = 0; index < roomPointArr.length; index++) {
      const el = roomPointArr[index];
      roomArr.push(el);
    }

    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }

      return array;
    }

    const arr = roomArr;
    shuffle(arr);

    for (let index = 0; index < roomPoints.length; index += 1) {
      const roomPoint = topKeyPoints[index];
      const point = document.createElement("li");
      point.classList.add(`${ID}-point`);
      point.innerHTML = `<span>${roomPoint}</span>`;

      arr[index].insertAdjacentElement("afterend", point);
    }
  };
  addRoomPoints();

  /**
   * Add room key points
   */
  const breakFastBanner = document.querySelector("#extra-main-container #extra-content-container");
  if (breakFastBanner) {
    breakFastBanner.parentNode.querySelector("img").setAttribute("src", "https://travelodge.wpengine.com/wp-content/uploads/2017/10/OurRestaurants-SideBar-340x214-1.jpg");
    breakFastBanner.insertAdjacentHTML("beforeend", `<div class="${ID}-child-msg"><p>And don't forget, up to 2 children aged 15 and under eat for FREE when an adult purchases our unlimited breakfast.</p></div>`);
  }

  /**
   * Change images
   */
  const mainImage = document.querySelectorAll("#main-carousel-image img")[1];
  mainImage.setAttribute("src", "https://travelodge.wpengine.com/wp-content/uploads/2017/10/EarlyCheckIn-SideBar-340x214.jpg");

  const thumbNail = document.querySelectorAll("#carousel-tumbnail button img")[1];
  thumbNail.setAttribute("src", "https://travelodge.wpengine.com/wp-content/uploads/2017/10/EarlyCheckIn-SideBar-340x214.jpg");

  thumbNail.parentNode.click();
  document.querySelectorAll(".carousel-item")[0].classList.remove("active");
  document.querySelectorAll(".carousel-item")[1].classList.add("active");

  /**
   * Tracking
   */
  const bookBtn = document.querySelector(".btn.btn-primary.bookNow.btn-block");
  bookBtn.addEventListener("click", () => {
    fireEvent("Proceed to extras clicked");
  });


    observer.connect(document.querySelector("#rebase"), () => {
      changeRoomName();
      addRoomPoints();
      
    }, {
      throttle: 500,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    });
    
};
