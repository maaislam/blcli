import { fullStory, events, viewabilityTracker } from '../../../../lib/utils';
import data from './lib/posts';

/**
 * {{TG040}} - {{Related Posts on Product}}
 */
let title;
let italian = false;
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TG061',
    VARIATION: '1',
    posts: data, // Posts array
  },
  postCounter: 0,
  init() {
    // Setup
    const { settings, services, components } = Experiment;
    if (window.location.pathname.indexOf('/it/') > -1) {
      italian = true;
    }
    services.tracking();
    document.body.classList.add('TG040');
    document.body.classList.add(settings.ID);
    title = document.querySelector('.product-name h1').textContent;
    // Get country code
    const countryCode = components.whatCountry();
    // console.log(countryCode);
    // Get category name
    const categoryName = components.whatCategory();
    // console.log(categoryName);
    // Get the list of posts
    const postArr = components.getPosts(countryCode, categoryName);
    // Append empty HTML container
    const containerHtml = components.relatedPostsHtml(categoryName);

    if (containerHtml) {
      const SEO = document.getElementById('seo_cnt');
      SEO.insertAdjacentHTML('beforebegin', containerHtml);
      if (italian === true) {
        SEO.insertAdjacentHTML('beforebegin', `<div class="container TG061_seo_header"><h3>${title} IN SINTESI</h3></div>`);
      } else {
        SEO.insertAdjacentHTML('beforebegin', `<div class="container TG061_seo_header"><h3>${title} - key information in summary</h3></div>`);
      }
  
      components.fetchPosts(postArr, false);
    }
    // Initial ajax call
    // View more click ajax call
    // const viewMoreBtn = document.querySelector('.TG040-add-more > button.TG040-more');
    // viewMoreBtn.addEventListener('click', () => {
    //   components.fetchPosts(postArr, true);
    //   // Add Tracking events
    //   components.trackPosts();
    // });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Returns the HTML wrap that contains the related posts
     * passing in the category title.
     * @param {String} productCat
     */
    relatedPostsHtml(productCat) {
      const cat = productCat.toUpperCase();
      let content = '';

      if (italian === true) {
        content = `
          <div class="TG040-related-posts container">
          <h1>/newsroom</h1>
            <h2>Gli ultimi articoli della redazione Technogym sulle tecniche, le curiosità e i benefici della corsa</h2>
            <div class="TG040-post-list clearfix">
            </div>
            <div class="TG040-add-more">
              <button class="TG040-more button button_submit">View More</button>
            </div>
          </div>
        `;
      } else {
        content = `
          <div class="TG040-related-posts container">
          <h1>/newsroom</h1>
            <h2>The latest articles from the Technogym editorial staff on the techniques, curiosities and benefits of running</h2>
            <div class="TG040-post-list clearfix">
            </div>
            <div class="TG040-add-more">
              <button class="TG040-more button button_submit">View More</button>
            </div>
          </div>
        `;
      }
      return content;
    },
    /**
     * Returns category name in lower case. To be used as key in posts.
     * Returns a lower case string.
     */
    whatCategory() {
      const catTitle = function () {
        return document.querySelector('.product-main-info > .product-name > h1[itemprop="name"]');
      };
      if (catTitle()) {
        const lcTitle = catTitle().textContent.toLocaleLowerCase().trim();
        if (lcTitle.match('™')) {
          return lcTitle.split('™')[0];
        } else if (lcTitle.match(/\w\s\w+/)) {
          return lcTitle.split(' ')[0];
        } else {
          return lcTitle;
        }
      }
    },
    /**
     * Returns a string containing the country code.
     */
    whatCountry() {
      const urlPath = window.location.pathname;
      const url = urlPath.split('/')[1];
      return url;
    },
    /**
     * @desc Returns an array of urls of related posts.
     * @param {String} countryCode
     * @param {String} catName
     */
    getPosts(countryCode, catName) {
      const postsArr = Experiment.settings.posts[catName][countryCode];
      return postsArr;
    },
    /**
     * @desc AJAX Request for each iteration in the array.
     * Removes item from the array after calling the request.
     * @param {Array} postList
     * @param {Boolean} fromClick
     */
    fetchPosts(postList, fromClick) {
      if (fromClick === true) {
        Experiment.postCounter = 0;
      }
      postList.forEach((url) => {
        // console.log(url);
        /**
         * Run and AJAX request for each URL passed and
         * return the html which will be appended to the
         * new container
         */
        if (Experiment.postCounter < 4) {
          Experiment.postCounter += 1;
          const request = new XMLHttpRequest();
          request.open('GET', url, true);
          request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
              // Success!
              // Remove requested url from array.
              postList.splice(postList.indexOf(url), 1);
              if (postList.length === 0) {
                const showMoreBtn = document.querySelector('.TG040 .TG040-related-posts .TG040-add-more button');
                showMoreBtn.classList.add('TG040-hide');
              }
              const resp = request.responseText;
              const html = document.createElement('div');
              html.classList.add('TG040-post-item');
              html.innerHTML = resp;
              /**
               * Store elements from post
               */
              const imgEl = html.querySelector('.newsroom_post_wrapper .featuredpost .bg');
              const imgSrc = imgEl.getAttribute('style').split(/[()]+/)[1];
              // Title & sub
              const titleEl = html.querySelector('.newsroom_post_wrapper .featuredpost .container h1');
              let titleText = null;
              if (titleEl) {
                titleText = titleEl.textContent;
              }
              const subEl = html.querySelector('.newsroom_post_wrapper .featuredpost .container ul.head');
              let time = '';
              let catType = '';
              if (subEl) {
                time = subEl.querySelector('.time').textContent.trim().replace('\'', '');
                catType = subEl.querySelector('.category a').textContent.trim();
              }
              // Excerpt
              const excerptEl = html.querySelector('.single-blog-post .post-entry .shortcode-text');
              let excerpt = null;
              if (url.indexOf('/come-correre-modo-corretto/') > -1) {
                excerpt = html.querySelector('.wrapper_container:nth-child(2)').textContent.trim();
              } else if (excerptEl) {
                excerpt = excerptEl.textContent;
              } else {
                excerpt = html.querySelector('.single-blog-post .post-entry p:first-of-type').textContent;
              }
              // // Have an excerptEl?
              
              // Restrict to X characters
              excerpt = excerpt.substr(0, excerpt.lastIndexOf(' ', 300)) + '...';

              // Post object
              const postEls = {
                link: url,
                img: imgSrc,
                title: titleText,
                sub: excerpt,
                time: time,
                catType: catType,
              };
              /**
               * Build the html for the new post.
               */

               // Wellbeing //cdn.optimizely.com/img/8355110909/2aebd95d2a3a41cfb65908fa4939cf88.png
               // Top locations //cdn.optimizely.com/img/8355110909/c06a63464a5f444491804005143138ad.png
               // Lightning bolt //cdn.optimizely.com/img/8355110909/870e5e18a64441bb8026b06979415920.png
               // Lifestyle //cdn.optimizely.com/img/8355110909/ffe905b5b99a4238a1700d989ffcf96d.png
               // Insight //cdn.optimizely.com/img/8355110909/45d784ad939941cbb69904c1ce6da041.png
               // Energy Out //cdn.optimizely.com/img/8355110909/3823762e05f34118b3f6d1eca09099ac.png
               // Energy In White //cdn.optimizely.com/img/8355110909/580c52f506ee423fafe9f2dc22af23eb.png
               // Corporate //cdn.optimizely.com/img/8355110909/2e5eb6130e60435e8e2067057b2f5d88.png

               let catImg = '';
               if (catType.indexOf('Wellness Insight') > -1) {
                catImg = `<div class="TG061_tool-wrap"><span class="TG061_category-icon"><img src="https://cdn.optimizely.com/img/8355110909/45d784ad939941cbb69904c1ce6da041.png" /></span></div>`;
               } else if (catType.indexOf('Wellness') > -1) {
                catImg = `<div class="TG061_tool-wrap"><span class="TG061_category-icon"><img src="https://cdn.optimizely.com/img/8355110909/2aebd95d2a3a41cfb65908fa4939cf88.png" /></span></div>`;
               } else if (catType.indexOf('Top Locations') > -1) {
                catImg = `<div class="TG061_tool-wrap"><span class="TG061_category-icon"><img src="https://cdn.optimizely.com/img/8355110909/c06a63464a5f444491804005143138ad.png" /></span></div>`;
               } else if (catType.indexOf('Instant Stories') > -1) {
                catImg = `<div class="TG061_tool-wrap"><span class="TG061_category-icon"><img src="https://cdn.optimizely.com/img/8355110909/870e5e18a64441bb8026b06979415920.png" /></span></div>`;
               } else if (catType.indexOf("Let's Move") > -1) {
                catImg = `<div class="TG061_tool-wrap"><span class="TG061_category-icon"><img src="https://cdn.optimizely.com/img/8355110909/ffe905b5b99a4238a1700d989ffcf96d.png" /></span></div>`;
               } else if (catType.indexOf('Energy Out') > -1) {
                catImg = `<div class="TG061_tool-wrap"><span class="TG061_category-icon"><img src="https://cdn.optimizely.com/img/8355110909/3823762e05f34118b3f6d1eca09099ac.png" /></span></div>`;
               } else if (catType.indexOf('Energy In') > -1) {
                catImg = `<div class="TG061_tool-wrap"><span class="TG061_category-icon"><img src="https://cdn.optimizely.com/img/8355110909/580c52f506ee423fafe9f2dc22af23eb.png" /></span></div>`;
               } else if (catType.indexOf('News') > -1) {
                catImg = `<div class="TG061_tool-wrap"><span class="TG061_category-icon"><img src="https://cdn.optimizely.com/img/8355110909/872ea811f4eb44489459012bae5dd2c1.png" /></span></div>`;
               } else if (catType.indexOf('Lifestyle') > -1) {
                catImg = `<div class="TG061_tool-wrap"><span class="TG061_category-icon"><img src="https://cdn.optimizely.com/img/8355110909/3d18eaede62a475581fbbfb1ddbaf685.png" /></span></div>`;
               }
               // <span class="TG061_tooltip">${catType}</span>
              const postHtml = `
                <article class="single-blog-post">
                  <a href="${postEls.link}" class="TG061_img" style="background-image: url('${postEls.img}')"></a>
                  ${catImg}
                  <span class="TG061_tooltip">${catType}</span>
                  <section class="TG061_blog-content">
                    <span class="TG061_article-type"></span>
                    <h2 class="TG061_article-name"><a class="TG061_title" href="${postEls.link}">${postEls.title}</a></h2>
                    <p class="TG061_paragraph">${postEls.sub}</p>
                    <div class="TG061_read-time">
                      <i class="fa fa-clock-o" aria-hidden="true"></i>
                      <span>${postEls.time} minutes</span>
                    </div>
                    <a href="${postEls.link}" class="TG040-more button button_submit">Read more</a>
                  </section>
                  <div class="TG061_shadow"></div>
                </article>
              `;
              /**
               * Reference to the container element and append.
               */
              const ref = document.querySelector('.TG040-related-posts .TG040-post-list');
              if (ref) {
                ref.insertAdjacentHTML('beforeend', postHtml);
                const posts = document.querySelector('.TG040 .TG040-related-posts .single-blog-post:last-child');
                const clickEvent = () => {
                  events.send('TG061', 'Clicked', 'User clicked on a blog post', { sendOnce: true });
                };
                posts.addEventListener('click', clickEvent);
              }
              const viewMore = document.querySelector('.TG040-add-more');
              if (viewMore) {
                viewMore.classList.add('TG040-show-more');
              }
              /**
               * Run Tracking once posts have been added
               */
              Experiment.components.trackPosts();
            } else {
              // We reached our target server, but it returned an error
              // console.log('error');
            }
          };
          request.onerror = () => {
            // There was a connection error of some sort
          };
          request.send();
        } // End if < 2
      });
    },
    trackPosts() {  
      /**
       * Elements have been seen
       */
      const firstPost = document.querySelector('.TG040 .TG040-related-posts .TG040-post-list article:first-child');
      viewabilityTracker(firstPost, () => {
        events.send('TG061', 'In View', 'User has seen the blog posts', { sendOnce: true });
      });
    },
  },
};

export default Experiment;
