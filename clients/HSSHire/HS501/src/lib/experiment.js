/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import e from "cors";
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { NavData } from "./navData";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  //console.log("HS501....")
  const navData = NavData;

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
  } else {
    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...

    if (document.querySelector(".main_nav ul")) {
      const second_level = (secondLevel) => {
        let r_string = "";
        secondLevel.forEach((secondLeveldata) => {
          r_string =
            r_string +
            ` 
          <div class="${shared.ID}__img_container">
          <div class="${shared.ID}__img_wrapper">
            <a class="" href="${secondLeveldata.href}">
            <div class="">
              <img class="${shared.ID}__product_img" data-src="${secondLeveldata.imgSrc}" src="${secondLeveldata.imgSrc}" alt="${secondLeveldata.title}" title="${secondLeveldata.title}">
            </div>
            </a>
          </div>
          <div class="${shared.ID}__tag_wrapper">
              <a class="${shared.ID}__img_tagline" href="${secondLeveldata.href}">${secondLeveldata.title}</a>
          </div>        
      </div>           
      `;
        });

        return r_string;
      };

      //sub menu
      const first_level = (idx) => {
        let r_string = "";
        navData[idx].firstLevel.forEach((firstLeveldata) => {
          r_string =
            r_string +
            `             
              <li class="${shared.ID}__category_tag">
                <a class="${shared.ID}__category_header"  href="${
              firstLeveldata.href
            }" title="${firstLeveldata.title}">${
              firstLeveldata.title
            }</a>               
                <div class="${shared.ID}__submenu_img_section">
                  <div class="${shared.ID}__image_header">
                    ${firstLeveldata.header}
                  </div>
                  <div class="${shared.ID}__product_list">
                  ${second_level(firstLeveldata.secondLevel)}
                  <div class="${shared.ID}__view_all_container">
                    <div class="${
                      shared.ID
                    }__view_all_arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg></div>
                    <div ><a class="${shared.ID}__viewAll_tag"  href="${
              firstLeveldata.viewallUrl
            }" title="View All">View All</a></div>
                    </div>
                  </div>
                  
                  
                </div>                              
              </li>                          
            `;
        });

        return r_string;
      };

      //popular product section 2
      const popular_products_imgs = (imgs) => {
        let r_string = "";
        imgs.forEach((img) => {
          r_string =
            r_string +
            `               
          <div class="${shared.ID}__product_img_wrapper">
            <img class="${shared.ID}__product_img" data-src="${img.imgSrc}" src="${img.imgSrc}" alt="${img.title}" title="${img.title}">
            <a class="${shared.ID}__img_tagline" href="${img.href}">${img.title}</a>
          </div>     
        `;
        });

        return r_string;
      };

      //popular product section 1
      const popular_products = (popularProduct) => {
        let r_string = "";
        popularProduct.forEach((products) => {
          r_string =
            r_string +
            ` 
          <div class="${shared.ID}__product">
            <div class="${shared.ID}__product_title">${products.title}</div>
            <div class="${shared.ID}__product_img_container">
            ${popular_products_imgs(products.products)}
            </div>
            <div class="${
              shared.ID
            }__popular_product_view_all_arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg></div>
            <div class="${shared.ID}__popular_product_viewAll_tag"><a  href="${
              products.viewallUrl
            }" title="View All">View All</a></div>
          </div>      
                
        `;
        });

        return r_string;
      };

      //main nav
      const nav_menu = () => {
        let r_string = "";
        navData.map((data, index) => {
          r_string =
            r_string +
            `
            <li class="${shared.ID}__custom_nav">
              <a class="${shared.ID}__nav_title" href="${data.href}" title="${
              data.title
            }">${data.title}</a> 
              <div class="${shared.ID}__submenu_layout">
                  <div class="${shared.ID}__categories">
                    <a class="${shared.ID}__header" href="${
              data.href
            }" title="${data.title}">${data.title}</a> 
                    <ul class="${shared.ID}__category_wrappper">
                    ${first_level(index)}
                    </ul>
                    <div class="${shared.ID}__popular_products_wrapper">
                      <div class="${shared.ID}__popular_products">
                        ${popular_products(data?.popularProduct)}
                      </div>         
                    </div>
                    
                  </div>
              </div>           
            </li>
          `;
        });
        return r_string;
      };

      //hide elements
      document
        .querySelectorAll(".La.all_menu.auto .firstlevel")[1]
        .classList.add(`${shared.ID}__hide_product`);
      document
        .querySelectorAll(".La.all_menu.auto .firstlevel")[3]
        .classList.add(`${shared.ID}__hide_product`);
      document
        .querySelectorAll(".La.all_menu.auto .firstlevel")[4]
        .classList.add(`${shared.ID}__hide_product`);
      document
        .querySelectorAll(".La.all_menu.auto .firstlevel")[5]
        .classList.add(`${shared.ID}__hide_product`);
      document
        .querySelectorAll(".La.all_menu.auto .firstlevel")[7]
        .classList.add(`${shared.ID}__hide_product`);
      document
        .querySelectorAll(".La.all_menu.auto .firstlevel")[8]
        .classList.add(`${shared.ID}__hide_product`);
      document
        .querySelectorAll(".La.all_menu.auto .firstlevel")[9]
        .classList.add(`${shared.ID}__hide_product`);
      document
        .querySelectorAll(".La.all_menu.auto .firstlevel")[13]
        .classList.add(`${shared.ID}__hide_product`);
      document
        .querySelectorAll(".La.all_menu.auto .firstlevel")[15]
        .classList.add(`${shared.ID}__hide_product`);
      document
        .querySelectorAll(".La.all_menu.auto .firstlevel")[17]
        .classList.add(`${shared.ID}__hide_product`);

      document
        .querySelectorAll(".sub_menu.hire_mega_menu.drop_show")
        .forEach((item) => {
          item.classList.add(`${shared.ID}__top`);
        });
      document
        .querySelector(".La.all_menu.auto a")
        .classList.add(`${shared.ID}__custom_padding`);

      document.querySelector(".La.all_menu.auto a").innerText = "Others";

      document
        .querySelector("#nav")
        .insertAdjacentHTML("afterbegin", nav_menu());
      document.querySelectorAll(".HS501__custom_nav").forEach((item, i) => {
        item.addEventListener("mouseenter", () => {
          document
            .querySelectorAll(".HS501__submenu_layout")
            [i].classList.add(`${shared.ID}__layout_visibility`);
          document
            .querySelector("#menu-greyout")
            .classList.add(`${shared.ID}__display_overley`);
        });

        item.addEventListener("mouseleave", () => {
          document
            .querySelectorAll(".HS501__submenu_layout")
            [i].classList.remove(`${shared.ID}__layout_visibility`);
          document
            .querySelector("#menu-greyout")
            .classList.remove(`${shared.ID}__display_overley`);
        });
      });

      document
        .querySelectorAll(`.${shared.ID}__category_tag`)
        .forEach((item, i) => {
          item.addEventListener("mouseenter", ({ target }) => {
            document
              .querySelectorAll(`.${shared.ID}__submenu_img_section`)
              [i].classList.add(`${shared.ID}__layout_visibility`);
            target
              .closest(`.${shared.ID}__categories`)
              .querySelector(`.${shared.ID}__popular_products_wrapper`)
              .classList.add(`${shared.ID}__hide_product`);
          });

          item.addEventListener("mouseleave", ({ target }) => {
            document
              .querySelectorAll(`.${shared.ID}__submenu_img_section`)
              [i].classList.remove(`${shared.ID}__layout_visibility`);
            target
              .closest(`.${shared.ID}__categories`)
              .querySelector(`.${shared.ID}__popular_products_wrapper`)
              .classList.remove(`${shared.ID}__hide_product`);
          });
        });

      //extra padding addition
      document
        .querySelectorAll(`.${ID}__nav_title`)[2]
        .classList.add(`${ID}__custom_padding`);
      document
        .querySelectorAll(`.${ID}__nav_title`)[5]
        .classList.add(`${ID}__custom_padding`);
      document
        .querySelectorAll(`.${ID}__nav_title`)[7]
        .classList.add(`${ID}__custom_padding`);
      document
        .querySelectorAll(`.${ID}__nav_title`)[6]
        .classList.add(`${ID}__custom_padding`);
    }
  }
};
