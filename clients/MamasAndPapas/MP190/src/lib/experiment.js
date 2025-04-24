/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { Storage } from './helpers';
import { loadStyleSheet, pollerLite, events } from '../../../../../lib/utils';
import settings from './shared';
export default () => {
  setup();

  console.log("New MP190");

  const { ID, VARIATION } = settings; 
  
  if (VARIATION == 2) {
    events.send(ID, 'MP190 Variation 2', 'MP190 Variation 2 is active');
  } else {
    events.send(ID, 'MP190 Variation 1', 'MP190 Variation 1 is active');
  }

  const absolutePosition = (el) => {
      var
          found,
          left = 0,
          top = 0,
          width = 0,
          height = 0,
          offsetBase = absolutePosition.offsetBase;
      if (!offsetBase && document.body) {
          offsetBase = absolutePosition.offsetBase = document.createElement('div');
          offsetBase.style.cssText = 'position:absolute;left:0;top:0';
          document.body.appendChild(offsetBase);
      }
      if (el && el.ownerDocument === document && 'getBoundingClientRect' in el && offsetBase) {
          var boundingRect = el.getBoundingClientRect();
          var baseRect = offsetBase.getBoundingClientRect();
          found = true;
          left = boundingRect.left - baseRect.left;
          top = boundingRect.top - baseRect.top;
          width = boundingRect.right - boundingRect.left;
          height = boundingRect.bottom - boundingRect.top;
      }
      return {
          found: found,
          left: left,
          top: top,
          width: width,
          height: height,
          right: left + width,
          bottom: top + height
      };
  }

  const moveElement = (element) => {

  	let clonedATB = element.cloneNode(true);

    clonedATB.type = "";
    let docBody = document.body;
    
    let stickyHolderMessage = document.createElement('div');
    let variantSelector = document.querySelector('.pdp__variant-selector');
    let custServButton = document.querySelector('.gis-cta-reset');

    clonedATB.classList.remove('addToCartButton');
    clonedATB.classList.add('sticky-bag-button');
    clonedATB.disabled = "";

    docBody.insertAdjacentHTML('afterbegin', `<div class="sticky-holder inactive"><div class="sticky-bag-message-area"></div><div class="sticky-bag-info-area"></div>${clonedATB.outerHTML}</div>`);

    let stickyHolder = document.querySelector('.sticky-holder');
    let stickyHolderInfo = document.querySelector('.sticky-bag-info-area');

    let bundleSelector = document.querySelector('.select-option-row');
    let sizeSelector = document.querySelector('.select-option-size');
    let colourSelector = document.querySelector('.color-opt');

    let origATCForm = document.querySelector('#addToCartForm');
    let origATCButton = document.querySelector('.addToCartButton');
    let addToCartButton = document.querySelector('.sticky-bag-button');
    

    
    let sizeRect, colourRect, bundleRect, variantRect = "";

    let rectATB = absolutePosition(origATCForm);
    if(sizeSelector !== null) {
      sizeRect = absolutePosition(sizeSelector);
    } 
    if(colourSelector !== null) {
      colourRect = absolutePosition(colourSelector);
    }
    if(bundleSelector !== null) {
      bundleRect = absolutePosition(bundleSelector);
    }
    if(variantSelector !== null) {
      variantRect = absolutePosition(variantSelector);
    }
    
    console.log(sizeRect);

    window.addEventListener('scroll', function() {
      let scrollVal = window.pageYOffset;
      if(scrollVal > (rectATB.top - 50)) {
        if(stickyHolder.classList.contains('inactive')) {
          stickyHolder.classList.remove('inactive');
          custServButton.classList.add('sticky-active');
        }

        if(!custServButton.classList.contains('sticky-active')) {
          custServButton.classList.add('sticky-active');
        }
        
      } else {
        if(!stickyHolder.classList.contains('inactive')) {
          stickyHolder.classList.add('inactive');
          custServButton.classList.remove('sticky-active');
        }

        if(custServButton.classList.contains('inactive')) {
          custServButton.classList.remove('sticky-active');
        }
      }

    });
    
  	

    

    const findFirstChildByClass = (element, className) => {
        var foundElement = null, found;
        function recurse(element, className, found) {
            for (var i = 0; i < element.childNodes.length && !found; i++) {
                var el = element.childNodes[i];
                var classes = el.className != undefined? el.className.split(" ") : [];
                for (var j = 0, jl = classes.length; j < jl; j++) {
                    if (classes[j] == className) {
                        found = true;
                        foundElement = element.childNodes[i];
                        break;
                    }
                }
                if(found)
                    break;
                recurse(element.childNodes[i], className, found);
            }
        }
        recurse(element, className, false);
        return foundElement;
    }


      let price = document.querySelector('.price').innerText;

      stickyHolderInfo.innerHTML = "<div class='current-options'> </div><p class='price'>"+price+"</p>";

      if(document.body.contains(variantSelector)) {
        
        if(document.body.contains(sizeSelector) && findFirstChildByClass(sizeSelector, 'active')) {

          let activeElement = findFirstChildByClass(sizeSelector, 'active').innerText;
          activeElement.replace('&nbsp', '');


          if(addToCartButton.innerText == "OUT OF STOCK" || addToCartButton.classList.contains('btn-default')) {
            stickyHolderInfo.querySelector('.current-options').innerHTML += "<div class='options'><span class='selected-size'><a href='#' class='underline' id='underline-size'>Please select a size</a></span></div>";
            let underlineSize = document.querySelector('#underline-size')
            underlineSize.addEventListener('click', function(e) {
              e.preventDefault(); // Cancel the native event
              e.stopPropagation();// Don't bubble/capture the event
              window.scrollTo({top: sizeRect.top - 100, behavior: 'smooth'});
              

              
            }, false)
          } else {
            stickyHolderInfo.querySelector('.current-options').innerHTML += "<div class='options'><span class='selected-size'>Selected size: <span class='element'>"+activeElement+"</span></span></div>";
          }

          

        } else if(document.body.contains(sizeSelector) && !findFirstChildByClass(sizeSelector, 'active')) {
          stickyHolderInfo.querySelector('.current-options').innerHTML += "<div class='options'><span class='selected-size'><a href='#' class='underline' id='underline-size3'>Please select a size</a></span></div>";
            let underlineSize3 = document.querySelector('#underline-size3')
            underlineSize3.addEventListener('click', function(e) {
              e.preventDefault(); // Cancel the native event
              e.stopPropagation();// Don't bubble/capture the event
              window.scrollTo({top: sizeRect.top - 100, behavior: 'smooth'});
              

              
            }, false)
        } 

        if(document.body.contains(colourSelector)) {

          let activeElementColour = findFirstChildByClass(colourSelector, 'active');
          if(activeElementColour) {
            let colourName = activeElementColour.querySelector('.img-fluid').alt;
            stickyHolderInfo.querySelector('.current-options').innerHTML += "<div class='options'><span class='colour'>Colour: <span class='element'>"+colourName+"</span></span></div>";
          } else {

            stickyHolderInfo.querySelector('.current-options').innerHTML += "<div class='options'><span class='colour'>Colour: <span class='element'><a href='#' class='underline' id='underline-colour'>Please select a colour</a></span></span></div>";
            let underlineBundle = document.querySelector('#underline-colour')
            underlineBundle.addEventListener('click', function(e) {
              e.preventDefault(); // Cancel the native event
              e.stopPropagation();// Don't bubble/capture the event

              window.scrollTo({top: colourRect.top - 100, behavior: 'smooth'});
              

              
            }, false)
          }
          
        } 

        if(document.body.contains(bundleSelector)) {

          let activeElementBundle = findFirstChildByClass(bundleSelector, 'active');
           if(activeElementBundle) {
            let bundleName = activeElementBundle.querySelector('h5').innerText;
            stickyHolderInfo.querySelector('.current-options').innerHTML += "<div class='options'><span class='bundle'>Bundle: <span class='element'>"+bundleName+"</span></span></div>";



          } else {

            stickyHolderInfo.querySelector('.current-options').innerHTML += "<div class='options'><span class='bundle'>Bundle: <span class='element'><a href='#' class='underline' id='underline-bundle'>Please select a bundle</a></span></span></div>";
            let underlineBundle = document.querySelector('#underline-bundle')
            underlineBundle.addEventListener('click', function(e) {
              e.preventDefault(); // Cancel the native event
              e.stopPropagation();// Don't bubble/capture the event

              window.scrollTo({top: bundleRect.top - 100, behavior: 'smooth'});
              

              
            }, false)
          }


          
        } 

        


      }


      document.addEventListener('click', function(e) {
        console.log(e.target);
        // If the clicked element doesn't have the right selector, bail
        if (e.target.classList.contains('sticky-bag-button')) {
          
                e.preventDefault(); // Cancel the native event

                rectATB = absolutePosition(origATCForm);
                
                if(sizeSelector !== null) {
                  sizeRect = absolutePosition(sizeSelector);
                } 
                if(colourSelector !== null) {
                  colourRect = absolutePosition(colourSelector);
                }
                if(bundleSelector !== null) {
                  bundleRect = absolutePosition(bundleSelector);
                }
                if(variantSelector !== null) {
                  variantRect = absolutePosition(variantSelector);
                }

                if(document.body.contains(variantSelector)) {

                  if(document.body.contains(sizeSelector)) {
                    if(findFirstChildByClass(sizeSelector, 'active')) {
                      document.querySelector('.addToCartButton').click(); 
                      window.scrollTo({top: sizeRect.top - 100, behavior: 'smooth'});
                      console.log("4444");
                      
                    } else {
                      window.scrollTo({top: sizeRect.top - 100, behavior: 'smooth'});
                      
                      stickyHolderInfo.querySelector('.current-options').innerHTML = "<div class='options'><span class='selected-size'><a href='#' class='underline' id='underline-size2'>Please select a size</a></span></div>";
                      let underlineSize2 = document.querySelector('#underline-size2')
                      underlineSize2.addEventListener('click', function(e) {
                        e.preventDefault(); // Cancel the native event
                        e.stopPropagation();// Don't bubble/capture the event
                        window.scrollTo({top: sizeRect.top - 100, behavior: 'smooth'});
                        

                        
                      }, false)
                    }

                  } else if (document.body.contains(colourSelector) && document.body.contains(bundleSelector)) {
                    
                    if(findFirstChildByClass(colourSelector, 'active') && findFirstChildByClass(bundleSelector, 'active') && clonedATB.disabled != "disabled") {
                      console.log("1");
                      origATCButton.click(); 
                    } else {
                      console.log("2");
                      window.scrollTo({top: bundleRect.top - 100, behavior: 'smooth'});
                      
                    }

                  } else {
                    console.log("3");
                    window.scrollTo({top: rectATB.top - 100, behavior: 'smooth'});
                    origATCButton.click(); 
                  }


                  


                } else {
                    
                    console.log("4");
                    window.scrollTo({top: rectATB.top - 100, behavior: 'smooth'});
                    origATCButton.click(); 
                }
              

              

              
        } else {

          return;
        } 

      }, true);


    
    

  }


  let elementSelector = document.querySelector('#addToCartForm');
  let theElement = elementSelector.querySelector('button');

  moveElement(theElement);

};
