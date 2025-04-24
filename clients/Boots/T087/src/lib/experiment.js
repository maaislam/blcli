/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();


  const bootsCode = () => {
    var $ = jQuery;

      events.domReady(function(){
          $(window).scroll(function() {setStickySidebar()});
          $(window).resize(function() {setStickySidebar()});
        
          const $sidebar = $("#estore_facet_navigation_widget");
          const $footer = $("#footerWrapper");
          const $window = $(window);
          const headerHeight = $('#estore_facet_navigation_widget').offset().top;
        const $html = $("html");
        
          function setStickySidebar() {
            if ($html.scrollTop() > headerHeight) {
              $sidebar.addClass("sticky");
            } else {
              $sidebar.removeClass("sticky");
            }
            let bottomVal = $html.scrollTop()+$window.outerHeight()-$footer.offset().top;
            if(bottomVal < 0){
              bottomVal = 0;
            }
            $sidebar.css({"bottom":Math.round(bottomVal)});
          }
          window.cu_checks_for_loading_finished = 0;
          window.cu_check_interval_ms = 100;
          window.cu_max_checks_for_loading_finished = window.cu_check_interval_ms*10*5; // seconds
          window.cu_check_for_sidebar_interval = setInterval(function(){
            
            if($sidebar.length > 0){
              clearInterval(window.cu_check_for_sidebar_interval);
              //console.log("clear interval");
              $sidebar.on("click", "a", function(){

                  //window.cu_checks_for_loading_finished = 0;
            //clearInterval(window.cu_interval_for_loading_finished);
                  //window.cu_interval_for_loading_finished = setInterval(function(){
                    //console.log("checking...");
                      $("html, body").animate({scrollTop:$("#estore_category_heading").offset().top}, 200);
                    //if($("#loading_popup:visible").length > 0 || window.cu_checks_for_loading_finished > window.cu_max_checks_for_loading_finished){
                      //clearInterval(window.cu_interval_for_loading_finished);
                      //console.log("animate to top of products");
                    //}
                    //window.cu_checks_for_loading_finished++;
                  //},window.cu_check_interval_ms);
              });
            }
          });
        function T087_showResultsOnMobile(){
          var mobile = false;
          if($(window).width() <= 600){
            mobile = true;
          }
          if(!mobile){
            return false;
          }
          setTimeout(function(){
            // scroll to the right point
            $("html, body").animate({scrollTop:$("#estore_category_heading").offset().top}, 200);
          },400);
          
        }
        $("#facet_overlay").click(function(){
          T087_showResultsOnMobile();
        });
        $("#hideLhn").click(function(){
          T087_showResultsOnMobile();
        });
      });
        
  }


  const addButton = () => {
    const loadMore = document.createElement('div');
    loadMore.classList.add(`${shared.ID}-load_more`);
    loadMore.innerHTML = 'Load more products';

    document.querySelector('#estores_product_listing_widget').insertAdjacentElement('afterend', loadMore);
  }

  const pagination = () => {

    const allProducts = document.querySelectorAll('.plp_gridView_redesign ul li');
    const currentPagination = document.querySelector('#estore_Pagination_template_container');

    //hide current pagination
    currentPagination.style.display = 'none';

    for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
    
        if (index >= 0 && index < 12){	
        element.classList.add("list-1");
      } else if (index >= 12 && index < 24){	
        element.classList.add("list-2");
        element.style.display = "none";
      } else if (index >= 24 && index < 36){	
        element.classList.add("list-3");
        element.style.display = "none";
      } else if (index >= 36 && index < 48){	
        element.classList.add("list-4");
        element.style.display = "none";
      } else if (index >= 48 && index < 60){	
        element.classList.add("list-5");
        element.style.display = "none";
      } else if (index >= 60 && index < 72){	
        element.classList.add("list-6");
        element.style.display = "none";
      } else if (index >= 72 && index < 84){	
        element.classList.add("list-7");
        element.style.display = "none";
      } else if (index >= 84 && index < 96){	
        element.classList.add("list-8");
        element.style.display = "none";
      }  else if (index >= 96 && index < 108){	
        element.classList.add("list-9");
        element.style.display = "none";
      } else if (index >= 108 && index < 120){	
        element.classList.add("list-10");
        element.style.display = "none";
      }  else if (index >= 120 && index < 132){	
        element.classList.add("list-11");
        element.style.display = "none";
      } else if (index >= 132 && index < 144){	
        element.classList.add("list-12");
        element.style.display = "none";
      } else if (index >= 144 && index < 156){	
        element.classList.add("list-13");
        element.style.display = "none";
      } else if (index >= 156 && index < 168){	
        element.classList.add("list-14");
        element.style.display = "none";
      } else if (index >= 168 && index < 200){	
        element.classList.add("list-15");
        element.style.display = "none";
      }
    }


    const loadBtn = document.querySelector(`.${shared.ID}-load_more`);
    
    let currentPage = 1;
    loadBtn.addEventListener("click", function(){
  
      currentPage = currentPage + 1;
      if (currentPage <= 15) {
        const currentHiddenClass = document.querySelectorAll('.list-' + currentPage + '');

        for (let index = 0; index < currentHiddenClass.length; index += 1) {
          const element = currentHiddenClass[index];
          element.style.display = "inline-block";
        }

      }
      else {
        currentPagination.style.display = 'block';
      }
    });
  }

  const url = window.location.href;
  if(url.indexOf('#facet:&pageSize:180') === -1) {
    window.location.href = url + '#facet:&pageSize:180';
    window.location.reload();

    setTimeout(() => {
      bootsCode();
      addButton();
      pagination();
    }, 3000);
  } else {
    setTimeout(() => {
      bootsCode();
      addButton();
      pagination();
    }, 3000);
  }


  // for observer
  let oldHref = document.location.href;
  const bodyList = document.querySelector("body");
  const observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if (oldHref != document.location.href) {
                  oldHref = document.location.href;
                  document.body.classList.remove('T087');
                  if(document.location.href.indexOf('&pageSize:180') > -1) {
                      pollerLite([
                          'body', '#estore_Pagination_template_container','.plp_gridView_redesign ul li',
                      ], () => {
                        setTimeout(() => {
                          document.body.classList.add('T087');
                          bootsCode();
                          addButton();
                          pagination();
                        }, 3000);
                      });
                  }
              }
          });
      });
  const config = {
      childList: true,
      subtree: true
  };
  observer.observe(bodyList, config);

};
