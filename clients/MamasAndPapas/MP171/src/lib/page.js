import { events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

const page = (ref) => {
  if (!ref) return;

  // <nav class="MP171-nav">
  //   <ul>
  //     <li><a href="#bundles">Bundles</a></li>
  //     <li><a href="#categories">Categories</a></li>
  //     <li><a href="#offers">Offers</a></li>
  //     <li><a href="#collections">Collections</a></li>
  //     <li><a href="#decor">Decor</a></li>
  //     <li><a href="#advice">Advice</a></li>
  //   </ul>
  // </nav>

  // <section class="blue-row">
  //   <div class="wrap">
  //     <div class="save-pounds">
  //       <p>£</p>
  //     </div>

  //     <p><strong>Save the hassle</strong></p>

  //     <p>Buy furniture bundles to get what you need for great value</p>
  //   </div>
  // </section>

  // <section class="offers" id="offers">
  //   <div class="wrap">
  //     <ul class="offers-list">
  //       <li class="clearfix">
  //         <div class="image" style="background: url('https://storage.googleapis.com/ucimagehost/mp171/offer1.jpeg') no-repeat center;">
  //           <a href="/c/nursery/nursery-furniture/coordinating-furniture-collections/heaton">
              
  //           </a>
  //         </div>
  //         <div class="info">
  //           <p class="offer-title">SPECIAL OFFER</p>

  //           <p>Heaton 3 Piece Cot Bed Furniture Collection</p>

  //           <div class="price">
              
  //             <p class="save">SAVE 40%</p>

  //             <p class="now">NOW ONLY £549</p>

  //             <a href="/c/nursery/nursery-furniture/coordinating-furniture-collections/heaton">Shop Now</a>
  //           </div>
  //         </div>
  //       </li>
  //       <li class="clearfix">
  //         <div class="image" style="background: url('https://storage.googleapis.com/ucimagehost/mp171/offer2.jpeg') no-repeat center;">
  //           <a href="/melrose-3-piece-nursery-furniture-set-with-cot-to-toddler-bed-dresser-changer-wardrobe-washed-oak/p/ramrwa101">
              
  //           </a>
  //         </div>
  //         <div class="info">
  //           <p class="offer-title">SPECIAL OFFER</p>

  //           <p>Melrose 3 Piece Cot Bed Furniture Collection</p>

  //           <div class="price">
              
  //             <p class="save">SAVE 40%</p>

  //             <p class="now">NOW ONLY £699</p>

  //             <a href="/melrose-3-piece-nursery-furniture-set-with-cot-to-toddler-bed-dresser-changer-wardrobe-washed-oak/p/ramrwa101">Shop Now</a>
  //           </div>
  //         </div>
  //       </li>
  //     </ul>
  //   </div>
  // </section>

  // <section class="MP171-ctas" id="decor">
    
  //   <h2><span>Shop</span> Nursery Decor</h2>

  //   <div class="row four-wide">
  //     <div class="box">
        
  //       <a href="/c/nursery/nursery-furniture/moses-baskets-stands">
  //         <div class="image">
  //           <img src="https://storage.googleapis.com/ucimagehost/mp171/mosesbasket.jpeg" alt="Moses Basket"/>

  //         </div>
          
  //         <p class="title">MOSES BASKETS</p>
      
  //       </a>

  //     </div>

  //     <div class="box">
        
  //       <a href="/c/nursery/interiors">
  //         <div class="image">
  //           <img src="https://storage.googleapis.com/ucimagehost/mp171/Bedding.png" alt="Bedding"/>

  //         </div>
          
  //         <p class="title">BEDDING</p>
          
  //       </a>

  //     </div>

  //     <div class="box">
        
  //       <a href="/c/nursery/accessories">
  //         <div class="image">
  //           <img src="https://storage.googleapis.com/ucimagehost/mp171/Decor.png" alt="Decor"/>

  //         </div>
          
  //         <p class="title">DECOR</p>
          
  //       </a>

  //     </div>

  //     <div class="box">
        
  //       <a href="/c/nursery/interiors/baby-bedding">
  //         <div class="image">
  //           <img src="https://storage.googleapis.com/ucimagehost/mp171/Beddingcollections.png" alt="Bedding Collections"/>

  //         </div>
          
  //         <p class="title">BEDDING COLLECTIONS</p>
          
  //       </a>

  //     </div>

      

  //   </div>

  // </section>

  const html = `
    <div class="MP171-page">
      <div class="wrap">
        <h1>Nursery Furniture</h1>

        <div class="MP171-intro">
          <p>Whether you prefer to mix and match designs or stick with a theme, our nursery furniture and baby furniture sets are sure to inspire.</p>
          
          <span id="MP-toggle">READ MORE</span>

          <p class="MP-toToggle">You'll find everything from traditionally charming wooden baby changing tables to modern sleeping cribs among our extensive range. As well
          as our stylish own brand products, we stock a selection of brands that specialise in cute cot furniture, such as Clair de Lune and SnuzPod. Not only are all items
          gorgoues in design, but they're also super safe and durable. There's plenty of choice to suit all interior design styles in this range
          of baby furniture, so your dream nursery is just a click away.</p>
        </div>

        <hr/>

        <section class="MP171-ctas" id="bundles">
          
          <h2><span>Shop</span> by bundle size</h2>

          <p>At Mamas &amp; Papas, we understand that creating a dream nursery can be pricey. Our furniture bundles are a great way to get all
          your furniture needs and save up to 18% on everything.</p>

          <div class="row three-wide">
            
            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/furniture-bundles/2-piece-bundles">
                <div class="image">
                  <span>SAVE UP TO 10%</span>
                  <img src="https://storage.googleapis.com/ucimagehost/mp171/2pieceNew.png" alt="two piece bunldes"/>
                </div>

                <p class="title"><strong>SHOP</strong> 2 PIECE BUNDLES</p>
                <p>Includes a Cotbed and Dresser/changer</p>
              </a>

            </div>
            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/furniture-bundles/3-piece-bundles">
                <div class="image">
                  <span>SAVE UP TO 18%</span>
                  <img src="https://storage.googleapis.com/ucimagehost/mp171/3pieceNew.png" alt="3 piece bundle"/>
                </div>

                <p class="title"><strong>SHOP</strong> 3 PIECE BUNDLES</p>
                <p>Includes a Cotbed, Dresser/changer &amp; Wardrobe</p>
              </a>

            </div>
          </div>

        </section>


        <section class="MP171-usps">
          <div class="row three-wide">
          
            <div class="box">
              <div class="img-wrap">
                <img src="https://storage.googleapis.com/ucimagehost/mp171/2-year-guarantee%402x.png" alt="2 year guarantee"/>
              </div>
              <p class="title">2 Year Guarantee</p>
              <p>All of our products come with a 2 year manufacturing guarantee</p>
            </div>
            <div class="box">
              <div class="img-wrap">
                <img src="https://storage.googleapis.com/ucimagehost/mp171/delivery%402x.png" alt="Named day delivery"/>
              </div>
              <p class="title">Named Day Delivery</p>
              <p>Shopping to suit your lifestyle, select a delivery day that's best for you</p>
            </div>
            <div class="box">
              <div class="img-wrap">
                <img src="https://storage.googleapis.com/ucimagehost/mp171/deliver-and-build%402x.png" alt="Deliver and build"/>
              </div>
              <p class="title">Deliver &amp; Build Available</p>
              <p>Why not let our trained team deliver and build your furniture in the room of your choice<sup>*</sup></p>
            </div>

          </div>
        </section>


        <section class="MP171-ctas" id="categories">
          
          <h2><span>Shop</span> by category</h2>

          <a href="https://www.mamasandpapas.com/c/nursery/nursery-furniture">Shop All</a>

          <hr/>
          
          <div class="row four-wide">
            <div class="box">
              
              <a href="/c/nursery/nursery-furniture">
                <div class="image">
                  <img src="https://storage.googleapis.com/ucimagehost/mp171/allfurniture.jpeg" alt="All furniture"/>

                  </div>
                  
                <div class="copy">
                  <p class="title">Furniture Sets &amp; Ranges</p>
                  <p>Shop our full range of stylish furniture collections, perfect for your dream nursery. <a href="/c/nursery/nursery-furniture">Shop now.</a></p>
                </div>
              </a>

            </div>

            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/cots-cribs-cotbeds">
                <div class="image">
                  <img src="https://media.mamasandpapas.com/i/mamasandpapas/CBDO02700_LS_3/Nursery/Nursery+Furniture/Furniture+Collections/Dover" alt="Cots and Cotbeds"/>

                  </div>
                  
                <div class="copy">
                  <p class="title">COTS &amp; COT BEDS</p>
                  <p>Ensure your little one sleeps soundly, with our range of cots and beds. <a href="/c/nursery/nursery-furniture/cots-cribs-cotbeds">Shop now.</a></p>
                </div>
              </a>

            </div>

            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/dressers-changers">
                <div class="image">
                  <img src="https://i1.adis.ws/i/mamasandpapas/DCLCBB600_02_LUCCA_GREY_DRESSER_CHANGER" alt="Dresses and changers"/>

                  </div>
                  
                <div class="copy">
                  <p class="title">DRESSERS &amp; CHANGING UNITS</p>
                  <p>Keep clothes and changing accessories close by with our range of dressers and changers. <a href="/c/nursery/nursery-furniture/dressers-changers">Shop now.</a></p>
                </div>
              </a>

            </div>

            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/nursery-wardrobes">
                <div class="image">
                  <img src="https://media.mamasandpapas.com/i/mamasandpapas/WRFRX6600_NEW_7/Nursery/Nursery+Furniture/Furniture+Collections/Franklin" alt="Wardrobes"/>

                  </div>
                  
                <div class="copy">
                  <p class="title">WARDROBES &amp; STORAGE</p>
                  <p>Keep your little one's clothes organised with our range of wardrobes, perfect for any nursery space. <a href="/c/nursery/nursery-furniture/nursery-wardrobes">Shop now.</a></p>
                </div>
              </a>

            </div>

            <div class="box">
              
              <a href="/c/nursery/mattresses/mattress-covers">
                <div class="image">
                  <img src="https://storage.googleapis.com/ucimagehost/mp171/Mattress-img%402x.png" alt="Mattresses"/>

                  </div>
                  
                <div class="copy">
                  <p class="title">MATTRESSES</p>
                  <p>Discover our range of mattresses, perfect for a comfy night's sleep. <a href="/c/nursery/mattresses/mattress-covers">Shop now.</a></p>
                </div>
              </a>

            </div>

            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/bedside-sleeping">
                <div class="image">
                  <img src="https://media.mamasandpapas.com/i/mamasandpapas/CTPE46800_NEW/Nursery/Nursery+Furniture/Bedside+Sleeping+%26+Cribs" alt="BEDSIDE SLEEPING & CRIBS"/>

                  </div>
                  
                <div class="copy">
                  <p class="title">BEDSIDE SLEEPING &amp; CRIBS</p>
                  <p>Keep your little one close, with our range of bedside sleeping & cribs. <a href="/c/nursery/nursery-furniture/bedside-sleeping">Shop now.</a></p>
                </div>
              </a>

            </div>

            <div class="box">
              
              <a href="https://www.mamasandpapas.com/en-gb/c/moses-baskets-stands">
                <div class="image">
                  <img src="https://media.mamasandpapas.com/i/mamasandpapas/770067200_HERO/Nursery/Nursery+Furniture/Moses+Baskets" alt="Moses Basket"/>

                  </div>
                  
                <div class="copy">
                  <p class="title">MOSES BASKET</p>
                  <p>Cleaning up after playtime is easy with our longlasting storage solutions. <a href="https://www.mamasandpapas.com/en-gb/c/moses-baskets-stands">Shop now.</a></p>
                </div>
              </a>

            </div>

            

            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/hilston-collection">
                <div class="image">
                  <img src="https://media.mamasandpapas.com/i/mamasandpapas/CHNSOA100_LS_5/Nursery/Nursery+Furniture" alt="NURSING CHAIRS"/>

                  </div>
                  
                <div class="copy">
                  <p class="title">NURSING CHAIRS</p>
                  <p>Stay supported with our ergonomically designed nursing chairs. <a href="/c/nursery/nursery-furniture/hilston-collection">Shop now.</a></p>
                </div>
              </a>

            </div>

          </div>

        </section>

        
        
        <section class="MP171-ctas" id="collections">
        
          <h2><span>Shop</span> by Collection</h2>
          
          <div class="slider-arrows">
            <button class="prev-arrow"></button>
            
            <button class="next-arrow"></button>
          </div>

          <hr/>
        
          <div class="row three-wide center-slider clearfix">
            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/coordinating-furniture-collections/atlas">
                <div class="image">
                  <img src="https://storage.googleapis.com/ucimagehost/mp171/Atlas.jpeg" alt="Atlas Collection"/>
                </div>

                <p class="title">Atlas</p>
                <p>The rustic collection</p>
              </a>

            </div>
            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/coordinating-furniture-collections/dover">
                <div class="image">
                  <img src="https://storage.googleapis.com/ucimagehost/mp171/Dover.jpeg" alt="Dover collection"/>
                </div>

                <p class="title">Dover</p>
                <p>The costal collection</p>
              </a>

            </div>
            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/coordinating-furniture-collections/franklin">
                <div class="image">
                  <img src="https://storage.googleapis.com/ucimagehost/mp171/Franklin.jpeg" alt="FRANKLIN Collection"/>
                </div>

                <p class="title">Franklin</p>
                <p>The distinct collection</p>
              </a>

            </div>

            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/coordinating-furniture-collections/heaton">
                <div class="image">
                  <img src="https://storage.googleapis.com/ucimagehost/mp171/Heaton.jpeg" alt="Heaton Collection"/>
                </div>

                <p class="title">Heaton</p>
                <p>The timeless collection</p>
              </a>

            </div>

            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/coordinating-furniture-collections/lucca">
                <div class="image">
                  <img src="https://media.mamasandpapas.com/i/mamasandpapas/RALCBB600_HERO_LUCCA_GREY_3PC_PORTRAIIT/Nursery/Nursery+Furniture/Furniture+Sets" alt="Lucca Collection"/>
                </div>

                <p class="title">Lucca</p>
                <p>The two-tone collection</p>
              </a>

            </div>

            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/coordinating-furniture-collections/mia-17">
                <div class="image">
                  <img src="https://media.mamasandpapas.com/i/mamasandpapas/RCMS46802_MIA_SLEIGH_GREY_3PC_PORTRAIT_AW19" alt="Mia Collection"/>
                </div>

                <p class="title">Mia</p>
                <p>The sleigh collection</p>
              </a>

            </div>

            <div class="box">
              
              <a href="/c/nursery/nursery-furniture/coordinating-furniture-collections/oxford-white">
                <div class="image">
                  <img src="https://storage.googleapis.com/ucimagehost/mp171/Oxford.jpeg" alt="Oxford Collection"/>
                </div>

                <p class="title">Oxford</p>
                <p>The grand collection</p>
              </a>

            </div>


            <div class="box">
              
              <a href="https://www.mamasandpapas.com/en-gb/c/ripley">
                <div class="image">
                  <img src="https://media.mamasandpapas.com/i/mamasandpapas/RARP46800_HERO_RIPLEY_GREY_3PC_PORTRAIT" alt="Classic Collection"/>
                </div>

                <p class="title">Ripley</p>
                <p>The classic collection</p>
              </a>

            </div>

            <div class="box">
              
              <a href="https://www.mamasandpapas.com/en-gb/c/nursery/nursery-furniture/coordinating-furniture-collections/melrose">
                <div class="image">
                  <img src="https://media.mamasandpapas.com/i/mamasandpapas/RAMRWA100_1/Nursery/Nursery+Furniture/Furniture+Sets" alt="Melrose Collection"/>
                </div>

                <p class="title">Melrose</p>
                <p>The washed grain collection</p>
              </a>

            </div>

          </div>

        </section>


        <hr/>

        <section class="MP171-ctas MP171-final" id="advice">
          
          <h2><span>Advice &amp; Guidance</span></h2>

          <div class="row four-wide">
            <div class="box">
              
              <a href="/discover/home/nest-assured-building-your-nursery-with-mamas-and-papas-furniture">
                <div class="image">
                  <img src="https://storage.googleapis.com/ucimagehost/mp171/buildingyourperfectnest.png" alt="BUILD YOUR PERFECT NEST"/>

                </div>
                
                <p class="title">Build Your Perfect Nest</p>
                <p>Helping you create a dream nursery from start to finish</p>
              </a>

            </div>

            <div class="box">
              
              <a href="/discover/home/how-to-style-a-nursery">
                <div class="image">
                  <img src="https://storage.googleapis.com/ucimagehost/mp171/howtostyleyournursery.png" alt="HOW TO STYLE YOUR NURSERY"/>

                </div>
                
                <p class="title">How To Style Your Nursery</p>
                <p>Designing your little one's room from scratch</p>
              </a>

            </div>

            <div class="box">
              
              <a href="/discover/sleep/helping-your-baby-nod-off">
                <div class="image">
                  <img src="https://storage.googleapis.com/ucimagehost/mp171/helpingbabynodoffexpertguide.png" alt="HELPING BABY NOD OFF - AN EXPERT GUIDE"/>

                </div>
                
                <p class="title">Helping Baby Nod Off - An Expert Guide</p>
                <p>Tips for a better nights sleep from someone who knows best</p>
              </a>

            </div>

            <div class="box">
              
              <a href="/discover/sleep/bedside-sleeping-the-safer-way-to-co-sleep">
                <div class="image">
                  <img src="https://storage.googleapis.com/ucimagehost/mp171/saferwaystocosleep.png" alt="SAFER WAY TO CO-SLEEP"/>

                </div>
                
                <p class="title">Safer Way To Co-Sleep</p>
                <p>With a range of bedside cots, you can keep your little one close but still stay safe</p>
              </a>

            </div>

            

          </div>

        </section>

      </div>
    </div>
  `;

  ref.innerHTML = '';
  ref.insertAdjacentHTML('beforeend', html);


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      });
  });

  // Load slick onto the sliders
  pollerLite(['.MP171-ctas'], () => {
    if (window.jQuery) {
      const jQ = window.jQuery;
      const $offerSlider = jQ('section.offers ul.offers-list');
      const $collectionSlider = jQ('.center-slider');
      const $uspSlider = jQ('.MP171-usps .row');
      const theSlick = window.jQuery.fn.slick;

      jQ($offerSlider).slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        responsive: [
          {
            breakpoint: 979,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              dots: true
            }
          },
        ]
      });

      jQ($collectionSlider).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        centerMode: true,
        variableWidth: false,
        nextArrow: '.slider-arrows .next-arrow',
        prevArrow: '.slider-arrows .prev-arrow',
        responsive: [
          {
            breakpoint: 979,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              dots: true
            }
          },
          {
            breakpoint: 749,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              dots: true,
              arrows: false,
              variableWidth: true,
              centerMode: true
            }
          },
          {
            breakpoint: 479,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false,
              variableWidth: true,
              centerMode: true
            }
          },
        ]
      });
      
      if (window.innerWidth < 649) {
        jQ($uspSlider).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: '40px',
          variableWidth: true,
          responsive: [
            {
              breakpoint: 479,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true
              }
            },
          ]
        });
      }
    }

    // Add read more toggle
    const toggle = document.querySelector('span#MP-toggle');
    const toToggle = document.querySelector('p.MP-toToggle');
    if (toggle && toToggle) {
      toggle.addEventListener('click', () => {
        toToggle.classList.add('MP-show');
        toggle.classList.add('MP-hide');
      });
    }
  });


  // Add events
  const addEvents = () => {
    const navItems = document.querySelectorAll('nav.MP171-nav ul li');
    const bundleLinks = document.querySelectorAll('#bundles .box');
    const catLinks = document.querySelectorAll('#categories .box');
    const offerLinks = document.querySelectorAll('#offers ul li');
    const collecLinks = document.querySelectorAll('#collections .box');
    const decorLinks = document.querySelectorAll('#decor .box');
    const adviceLinks = document.querySelectorAll('#advice .box');

    const pingEvent = (evName, el) => {
      if (!el) return;
      el.addEventListener('click', () => {
        events.send('MP171', `MP171 Clicked ${evName}`, `MP171 ${evName} was clicked`);
      });
    }

    Array.from(navItems).forEach((el) => {
      pingEvent('Nav Item', el);
    });

    Array.from(bundleLinks).forEach((el) => {
      pingEvent('Bundle Link', el);
    });

    Array.from(catLinks).forEach((el) => {
      pingEvent('Category Link', el);
    });

    Array.from(offerLinks).forEach((el) => {
      pingEvent('Offer Link', el);
    });

    Array.from(collecLinks).forEach((el) => {
      pingEvent('Collection Link', el);
    });

    Array.from(decorLinks).forEach((el) => {
      pingEvent('Decor Link', el);
    });

    Array.from(adviceLinks).forEach((el) => {
      pingEvent('Advice Link', el);
    });

  };
  addEvents();

};


export default page;