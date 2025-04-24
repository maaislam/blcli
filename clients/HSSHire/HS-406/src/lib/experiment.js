/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const expData = [
  {
    "inputURL": "https://www.hss.com/hire/p/3kw-swivel-radiant-heater-240v",
    "blogTargetURL": "https://www.hss.com/blog/heating/hss-guide-heating/",
    "blogTitle": "Our Guide to Heating",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621717643082_e67fe20b-0900-4a52-b453-08738965f1b3?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/thermoquartz-heater-110v",
    "blogTargetURL": "https://www.hss.com/blog/heating/hss-guide-heating/",
    "blogTitle": "Our Guide to Heating",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621717643082_e67fe20b-0900-4a52-b453-08738965f1b3?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/radiator",
    "blogTargetURL": "https://www.hss.com/blog/heating/hss-guide-heating/",
    "blogTitle": "Our Guide to Heating",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621717643082_e67fe20b-0900-4a52-b453-08738965f1b3?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/catalytic-cabinet-heater",
    "blogTargetURL": "https://www.hss.com/blog/heating/hss-guide-heating/",
    "blogTitle": "Our Guide to Heating",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621717643082_e67fe20b-0900-4a52-b453-08738965f1b3?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/retail-fan-heater-2-8kw",
    "blogTargetURL": "https://www.hss.com/blog/heating/fan-gas-or-ceramic-which-heating-solution-is-best/",
    "blogTitle": "Fan, Gas or Ceramic: Which Heating Solution is Best?",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621004218952_2a132f3f-17b1-4910-a45e-a0e8edabc750?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/long-wave-heater-110v",
    "blogTargetURL": "https://www.hss.com/blog/heating/fan-gas-or-ceramic-which-heating-solution-is-best/",
    "blogTitle": "Fan, Gas or Ceramic: Which Heating Solution is Best?",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621004218952_2a132f3f-17b1-4910-a45e-a0e8edabc750?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/indirect-oil-heater-72kw-110v",
    "blogTargetURL": "https://www.hss.com/blog/heating/electric-blower-heaters-how-they-work/",
    "blogTitle": "What are Electric Blower Heaters and How do They Work?",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621886466480_1fdf0423-0918-4adb-a177-a9255cb293b1?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/blower-heater-260000-btu-gas",
    "blogTargetURL": "https://www.hss.com/blog/heating/electric-blower-heaters-how-they-work/",
    "blogTitle": "What are Electric Blower Heaters and How do They Work?",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621886466480_1fdf0423-0918-4adb-a177-a9255cb293b1?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/paraffin-heater-150000-btu",
    "blogTargetURL": "https://www.hss.com/blog/heating/electric-blower-heaters-how-they-work/",
    "blogTitle": "What are Electric Blower Heaters and How do They Work?",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621886466480_1fdf0423-0918-4adb-a177-a9255cb293b1?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/3-phase-industrial-heater-18kva",
    "blogTargetURL": "https://www.hss.com/blog/heating/eco-friendly-heating-solutions-for-commercial-premises/",
    "blogTitle": "ECO Friendly Heating Solutions for Commercial Premises",
    "blogImage": "https://styla-prod-us.imgix.net/92314b9e-c171-46ba-b234-64ae64285741/1625846527847_4e96201e-036d-4717-8c86-ac28ffdbc374?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/boxer-site-heater",
    "blogTargetURL": "https://www.hss.com/blog/heating/eco-friendly-heating-solutions-for-commercial-premises/",
    "blogTitle": "ECO Friendly Heating Solutions for Commercial Premises",
    "blogImage": "https://styla-prod-us.imgix.net/92314b9e-c171-46ba-b234-64ae64285741/1625846527847_4e96201e-036d-4717-8c86-ac28ffdbc374?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/onecall/p/hot-cube-65",
    "blogTargetURL": "https://www.hss.com/blog/heating/eco-friendly-heating-solutions-for-commercial-premises/",
    "blogTitle": "ECO Friendly Heating Solutions for Commercial Premises",
    "blogImage": "https://styla-prod-us.imgix.net/92314b9e-c171-46ba-b234-64ae64285741/1625846527847_4e96201e-036d-4717-8c86-ac28ffdbc374?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/edging-sander-240v",
    "blogTargetURL": "https://www.hss.com/blog/flooring/hss-guide-floor-sanding/",
    "blogTitle": "Our Guide to Sanding Floors",
    "blogImage": "https://styla-prod-us.imgix.net/92314b9e-c171-46ba-b234-64ae64285741/1637070402997_a8501d5c-d693-43c5-ae86-93092f4b8760?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/floor-sander-240v",
    "blogTargetURL": "https://www.hss.com/blog/flooring/hss-guide-floor-sanding/",
    "blogTitle": "Our Guide to Sanding Floors",
    "blogImage": "https://styla-prod-us.imgix.net/92314b9e-c171-46ba-b234-64ae64285741/1637070402997_a8501d5c-d693-43c5-ae86-93092f4b8760?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/floor-and-edge-sander-hire-pack",
    "blogTargetURL": "https://www.hss.com/blog/flooring/hss-guide-floor-sanding/",
    "blogTitle": "Our Guide to Sanding Floors",
    "blogImage": "https://styla-prod-us.imgix.net/92314b9e-c171-46ba-b234-64ae64285741/1637070402997_a8501d5c-d693-43c5-ae86-93092f4b8760?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/carpet-cleaner-small",
    "blogTargetURL": "https://www.hss.com/blog/cleaning-and-maintenance/12-tips-on-carpet-cleaning/",
    "blogTitle": "12 Tips on Carpet Cleaning",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1622435244152_6f56a1fc-b89b-4fdb-8274-6d16d244621c?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/central-heating-flusher",
    "blogTargetURL": "https://www.hss.com/blog/home/how-to-cleanse-your-central-heating-system",
    "blogTitle": "How to Cleanse your Central Heating System",
    "blogImage": "https://styla-prod-us.imgix.net/92314b9e-c171-46ba-b234-64ae64285741/1633993186781_a1f37bce-89fe-4490-9068-d8c1047f86aa?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/breaker-te700-medium-duty",
    "blogTargetURL": "https://www.hss.com/blog/tools/hss-guide-breakers/",
    "blogTitle": "Our Guide to Breakers",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621716116831_a9f67e10-d5b3-4f2e-8b70-a900b1409c5d?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=focalpoint&fp-x=0.63&fp-y=0.28",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/breaker-vibration-damped-110v",
    "blogTargetURL": "https://www.hss.com/blog/tools/hss-guide-breakers/",
    "blogTitle": "Our Guide to Breakers",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621716116831_a9f67e10-d5b3-4f2e-8b70-a900b1409c5d?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=focalpoint&fp-x=0.63&fp-y=0.28",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/te500-a-cordless-breaker",
    "blogTargetURL": "https://www.hss.com/blog/concreting-and-preparation/finding-the-right-breaker-for-the-job/",
    "blogTitle": "Finding the Right Breaker for The Job",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621004822159_1bd764f4-a82a-4580-a491-7b22452dc6c6?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/hammer-driller-te30c-110v",
    "blogTargetURL": "https://www.hss.com/blog/drills/how-to-use-a-hammer-drill/",
    "blogTitle": "How to Use a Hammer Drill",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621524693310_503bc28d-c56d-4e6d-ad9b-2f0b6e64a3fa?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/te1000-breaker-dust-hirepack",
    "blogTargetURL": "https://www.hss.com/blog/concreting-and-preparation/finding-the-right-breaker-for-the-job/",
    "blogTitle": "Finding the Right Breaker for The Job",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621004822159_1bd764f4-a82a-4580-a491-7b22452dc6c6?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/te2000-medium-duty-breaker",
    "blogTargetURL": "https://www.hss.com/blog/tools/hss-guide-breakers/",
    "blogTitle": "Our Guide to Breakers",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621716116831_a9f67e10-d5b3-4f2e-8b70-a900b1409c5d?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=focalpoint&fp-x=0.63&fp-y=0.28",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/heavy-duty-breaker-hilti-te3000",
    "blogTargetURL": "https://www.hss.com/blog/tools/hss-guide-breakers/",
    "blogTitle": "Our Guide to Breakers",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621716116831_a9f67e10-d5b3-4f2e-8b70-a900b1409c5d?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=focalpoint&fp-x=0.63&fp-y=0.28",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/breaker-dust-adaptor",
    "blogTargetURL": "https://www.hss.com/blog/tools/hss-guide-breakers/",
    "blogTitle": "Our Guide to Breakers",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621716116831_a9f67e10-d5b3-4f2e-8b70-a900b1409c5d?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=focalpoint&fp-x=0.63&fp-y=0.28",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/breaker-heavy-duty-petrol",
    "blogTargetURL": "https://www.hss.com/blog/concreting-and-preparation/finding-the-right-breaker-for-the-job/",
    "blogTitle": "Finding the Right Breaker for The Job",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621004822159_1bd764f4-a82a-4580-a491-7b22452dc6c6?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/hydraulic-breaker-petrol",
    "blogTargetURL": "https://www.hss.com/blog/concreting-and-preparation/finding-the-right-breaker-for-the-job/",
    "blogTitle": "Finding the Right Breaker for The Job",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621004822159_1bd764f4-a82a-4580-a491-7b22452dc6c6?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/light-air-pick-anti-vibration",
    "blogTargetURL": "https://www.hss.com/blog/tools/hss-guide-breakers/",
    "blogTitle": "Our Guide to Breakers",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621716116831_a9f67e10-d5b3-4f2e-8b70-a900b1409c5d?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=focalpoint&fp-x=0.63&fp-y=0.28",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/hvy-air-breaker-anti-vibration",
    "blogTargetURL": "https://www.hss.com/blog/tools/hss-guide-breakers/",
    "blogTitle": "Our Guide to Breakers",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1621716116831_a9f67e10-d5b3-4f2e-8b70-a900b1409c5d?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=focalpoint&fp-x=0.63&fp-y=0.28",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/wallpaper-stripper-240v",
    "blogTargetURL": "https://www.hss.com/blog/decorating/how-to-remove-wallpaper-tips-tricks-and-solutions",
    "blogTitle": "How to Remove Wallpaper: Tips, Tricks and Solutions",
    "blogImage": "https://styla-prod-us.imgix.net/92314b9e-c171-46ba-b234-64ae64285741/1629214752882_67f22de6-4fe5-414c-8f4d-bc9171d085ed?auto=format%2Ccompress&w=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/mitower-plus",
    "blogTargetURL": "https://www.hss.com/blog/working-at-height/any-hard-to-reach-job-is-easy-with-a-mitower/",
    "blogTitle": "Any Hard-to-Reach Job is Easy with a MiTower",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1620827269172_f2383921-2cbf-401b-bf8c-b3b425a66883?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/mi-tower-hire-pack",
    "blogTargetURL": "https://www.hss.com/blog/working-at-height/any-hard-to-reach-job-is-easy-with-a-mitower/",
    "blogTitle": "Any Hard-to-Reach Job is Easy with a MiTower",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1620827269172_f2383921-2cbf-401b-bf8c-b3b425a66883?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  },
  {
    "inputURL": "https://www.hss.com/hire/p/mitower",
    "blogTargetURL": "https://www.hss.com/blog/working-at-height/any-hard-to-reach-job-is-easy-with-a-mitower/",
    "blogTitle": "Any Hard-to-Reach Job is Easy with a MiTower",
    "blogImage": "https://styla-prod-us.imgix.net/1129c0ad-5961-4009-b9b1-e8c8ad5cb4d9/1620827269172_f2383921-2cbf-401b-bf8c-b3b425a66883?auto=format%2Ccompress&w=35&h=35&fit=crop&crop=faces%2Cedges",
  }
 ];

const addBlogLink = (data) => {

  if(VARIATION == 1) {

    pollerLite(['.item_desc'], () => {

      let blogHTML = `
  
        <a href="${data.blogTargetURL}" class="${ID}-blog-link">
        
          <div class="${ID}-blog-link--image">
            <img src="${data.blogImage}" alt="${data.blogTitle} article image" />
          </div>
  
          <div class="${ID}-blog-link--content">
            <h2>${data.blogTitle}</h2>
            <p>Read Article</p>        
          </div>
        
        </a>
      
      `;
  
      let insertionPoint = document.querySelector('.item_desc');
      insertionPoint.insertAdjacentHTML('beforebegin', blogHTML);
      let blogLink = document.querySelector(`.${ID}-blog-link`);

      blogLink.addEventListener('click', (e) => {
        fireEvent(`Click - user clicked on blog link to go to ${data.blogTitle} blog article from ${window.location.href} page`)
      });

      fireEvent(`Visible - blog link added to page ${window.location.href} with blog title ${data.blogTitle}`);

    });

  } else if(VARIATION == 2) {

    pollerLite(['body'], () => {

      let blogHTML = `
  
        <div class="${ID}-blog-popup ${ID}-hidden">
        
          <div class="${ID}-blog-popup--close"><button id="${ID}-close-x"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="white"/></svg></button></div>
  
          <a href="${data.blogTargetURL}" class="${ID}-blog-popup--content">
            <h2>${data.blogTitle}</h2>
            <p>Read Article <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.590088 10.59L5.17009 6L0.590088 1.41L2.00009 0L8.00009 6L2.00009 12L0.590088 10.59Z" fill="#FFD500"/></svg>
            </p>        
          </a>
        
        </div>
      
      `;
  
      let insertionPoint = document.body;
      insertionPoint.insertAdjacentHTML('afterbegin', blogHTML);
      let blogPopup = document.querySelector(`.${ID}-blog-popup`);
      let closeX = document.getElementById(`${ID}-close-x`);
      let blogPopupLink = blogPopup.querySelector('a');

      closeX.addEventListener('click', (e) => {
        blogPopup.remove();
        fireEvent(`Click - user clicked on close X to hide the popup on ${window.location.href} page`)
      });

      blogPopupLink.addEventListener('click', (e) => {
        fireEvent(`Click - user clicked on blog link to go to ${data.blogTitle} blog article from ${window.location.href} page`)
      });

      setTimeout(() => {
        blogPopup.classList.remove(`${ID}-hidden`);
        fireEvent(`Visible - blog popup added to page ${window.location.href} with blog title ${data.blogTitle} and visible to user after 5s`);
      }, 5000);

    });

    


  }

  

  


}

const startExperiment = () => {

  let currURL = window.location.href;
  let dataVar = expData.find((a) => a.inputURL == currURL);
  if(dataVar) {
    fireEvent('Conditions Met');

    if(VARIATION !== "control") {
      addBlogLink(dataVar);
    }
    
  } 


}

export default () => {

  setup();

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();
  
};
