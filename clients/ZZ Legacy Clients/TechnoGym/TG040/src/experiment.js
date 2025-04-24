import { fullStory, events, viewabilityTracker } from '../../../../lib/utils';
import data from './lib/posts';

/**
 * {{TG040}} - {{Related Posts on Product}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TG040',
    VARIATION: '{{VARIATION}}',
    posts: data, // Posts array
  },

  postCounter: 0,

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    // Get country code
    const countryCode = components.whatCountry();
    // console.log(countryCode);
    // Get category name
    const categoryName = components.whatCategory();
    // console.log(categoryName);
    // Get the list of posts
    const postArr = components.getPosts(countryCode, categoryName);
    console.log(postArr);
    // Append empty HTML container
    const containerHtml = components.relatedPostsHtml(categoryName);
    if (containerHtml) {
      document.querySelector('div[role="main"] .product-view > .container').insertAdjacentHTML('afterend', containerHtml);
    }
    // Initial ajax call
    components.fetchPosts(postArr, false);
    // View more click ajax call
    const viewMoreBtn = document.querySelector('.TG040-add-more > button.TG040-more');
    viewMoreBtn.addEventListener('click', () => {
      components.fetchPosts(postArr, true);
      // Add Tracking events
      components.trackPosts();
    });
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
      return `
        <div class="TG040-related-posts container">
        <h1>/newsroom</h1>
          <h2>ARTICLES ABOUT ${cat}</h2>
          <div class="TG040-post-list">
          </div>
          <div class="TG040-add-more">
            <button class="TG040-more button button_submit">View More</button>
          </div>
        </div>
      `;
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
         * retrun the html which will be appended to the
         * new container
         */
        if (Experiment.postCounter < 2) {
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
              let subText = null;
              if (subEl) {
                subText = subEl;
              }
              // Excerpt
              const excerptEl = html.querySelector('.single-blog-post .post-entry .shortcode-text');
              let excerpt = null;
              // Have an excerptEl?
              if (excerptEl) {
                excerpt = excerptEl.textContent;
              } else {
                excerpt = html.querySelector('.single-blog-post .post-entry p:first-of-type').textContent;
              }
              // Restrict to X characters
              excerpt = excerpt.substr(0, excerpt.lastIndexOf(' ', 420));

              // Post object
              const postEls = {
                link: url,
                img: imgSrc,
                title: titleText,
                sub: subText,
                exc: excerpt,
              };
              /**
               * Build the html for the new post.
               */
              const postHtml = `
                <article class="single-blog-post">
                  <div class="TG040-left" style="background: url(${postEls.img}) no-repeat center">
                    <a href="${postEls.link}"></a>
                  </div>
                  <div class="TG040-right">
                    <div class="TG040-copy">
                      ${postEls.sub.outerHTML}
                      <h1><a href="${postEls.link}">${postEls.title}</a></h1>
                      <p>${postEls.exc}...</p>
                    </div>
                  </div>
                </article>
              `;
              /**
               * Reference to the container element and append.
               */
              const ref = document.querySelector('.TG040-related-posts .TG040-post-list');
              if (ref) {
                ref.insertAdjacentHTML('beforeend', postHtml);
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
      const posts = document.querySelectorAll('.TG040 .TG040-related-posts .TG040-post-list article a');
      const clickEvent = () => {
        events.send('TG040', 'Clicked', 'User clicked on a blog post', { sendOnce: true });
      };
      if (posts) {
        [].forEach.call(posts, (post) => {
          post.addEventListener('click', clickEvent);
        });
      }
      /**
       * Elements have been seen
       */
      const firstPost = document.querySelector('.TG040 .TG040-related-posts .TG040-post-list article');
      viewabilityTracker(firstPost, () => {
        events.send('TG040', 'In View', 'User has seen the blog posts', { sendOnce: true });
      });
    },
  },
};

export default Experiment;
