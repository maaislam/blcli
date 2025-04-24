import { h } from 'preact';

export const DesktopData = (isLoggedIn) => {
    return [{
        name: `${window.userObj.isLoggedIn === "false" ? 'Login/Register' : 'Account'}`,
        link: `${window.userObj.isLoggedIn === "false" ? 'https://www.boots.com/webapp/wcs/stores/servlet/LogonForm' : 'https://www.boots.com/AjaxLogonForm?myAcctMain=1&catalogId=28501&langId=-1&storeId=11352'}`,
        hasSubmenu: false,
        desktop: false,
        icon: '#',
        noneCat: true,
      },
    {
      name: 'Advantage Card',
      link: 'https://www.boots.com/advantage-card',
      hasSubmenu: false,
      desktop: false,
      colour: '#b8237b',
      icon: '#',
      noneCat: true,
    },

    // Christmas
    {
      name: 'christmas',
      regex: '/christmas',
      link: 'https://www.boots.com/christmas',
      hasSubmenu: true,
      children: [{
          name: 'visit christmas',
          allLink: true,
          link: 'https://www.boots.com/christmas',
          hasSubmenu: false,
        },
        {
          name: '3 for 2 mix & match',
          link: 'https://www.boots.com/christmas/christmas-3-for-2',
          hasSubmenu: false,
        },
        {
          name: 'star gifts',
          link: 'https://www.boots.com/christmas/christmas-weekly-offers',
          hasSubmenu: false,
        },
        {
          name: 'shop christmas',
          link: 'https://www.boots.com/christmas/all-christmas',
          hasSubmenu: true,
              content: [
                <div class="container">
                  <div class="column oneColumn">
                  <span class="title">shop by recipient</span>
                  <div class="inner">
                      <ul class="subList">
                        <li><a href="https://www.boots.com/christmas/all-christmas">all christmas</a></li>
                        <li><a href="https://www.boots.com/christmas/gifts-for-her">gifts for her</a></li>
                        <li><a href="https://www.boots.com/christmas/gifts-for-him">gifts for him</a></li>
                        <li><a href="https://www.boots.com/christmas/christmas-gifts-for-kids">gifts for kids</a></li>
                      </ul>
                  </div>
                </div>
                <div class="column oneColumn">
                <span class="title">shop by category</span>
                  <div class="inner">
                      <ul class="subList">
                        <li><a href="https://www.boots.com/christmas/advent-calendars">advent calendars</a></li>
                        <li><a href="https://www.boots.com/christmas/stocking-fillers">stocking fillers</a></li>
                        <li><a href="https://www.boots.com/christmas/secret-santa">secret santa</a></li>
                        <li><a href="https://www.boots.com/christmas/personalised-gifts">personalised gifts</a></li>
                      </ul>
                  </div>
                </div>
                <div class="column oneColumn">
                  <span class="title">special offers</span>
                  <div class="inner">
                  <ul class="subList">
                     <li><a href="https://www.boots.com/christmas/christmas-weekly-offers">star gifts</a></li>
                     <li><a href="https://www.boots.com/christmas/christmas-3-for-2">3 for 2 mix &amp; match</a></li>
                  </ul>
                </div>
              </div>
              </div>
              ],
            },
        {
          name: '100 best christmas gifts 2021',
          link: 'https://www.boots.com/christmas/best-christmas-gifts',
          hasSubmenu: false,
        },
        {
          name: 'christmas inspiration',
          link: 'https://www.boots.com/christmas-gift-guide',
          hasSubmenu: false,
        },
      ],
    },
    // Black Friday
    {
      name: 'black friday',
      regex: '/black-friday',
      link: 'https://www.boots.com/black-friday',
      hasSubmenu: true,
      children: [{
          name: 'visit black friday',
          allLink: true,
          link: 'https://www.boots.com/black-friday',
          hasSubmenu: false,
        },
        {
          name: 'all black friday deals',
          link: 'https://www.boots.com/black-friday/all-blackfriday-deals',
          hasSubmenu: false,
        },
        {
          name: 'shop black friday offers',
          link: 'https://www.boots.com/black-friday',
          hasSubmenu: true,
              content: [
                <div class="container">
                  <div class="column oneColumn">
                  <span class="title">shop offers</span>
                  <div class="inner">
                      <ul class="subList">
                        <li><a href="https://www.boots.com/black-friday/all-blackfriday-deals">all black friday deals</a></li>
                        <li><a href="https://www.boots.com/black-friday/christmas-weekly-offers">star gifts</a></li>
                        <li><a href="https://www.boots.com/black-friday/tuesday-offer">£10 Tuesday</a></li>
                      </ul>
                  </div>
                </div>
                <div class="column oneColumn">
                <span class="title">shop by category</span>
                  <div class="inner">
                      <ul class="subList">
                        <li><a href="https://www.boots.com/black-friday/blackfriday-fragrance">all fragrance black friday deals'</a></li>
                        <li><a href="https://www.boots.com/black-friday/blackfriday-electrical">all electrical beauty black friday deals</a></li>
                        <li><a href="https://www.boots.com/black-friday/blackfriday-luxury-beauty">all premium beauty black friday deals</a></li>
                        <li><a href="https://www.boots.com/black-friday/blackfriday-beauty">all beauty black friday deals</a></li>
                        <li><a href="https://www.boots.com/black-friday/blackfriday-gifting">all gifting black friday deals</a></li>
                        <li><a href="https://www.boots.com/black-friday/blackfriday-health">all health black friday deals</a></li>
                        <li><a href="https://www.boots.com/black-friday/blackfriday-baby">all baby black friday deals</a></li>
                        <li><a href="https://www.boots.com/black-friday/blackfriday-toiletries">all toiletries black friday deals</a></li>
                      </ul>
                  </div>
                </div>
              </div>
              ],
            },
      ],
    },
    // Beauty
    {
      name: 'beauty',
      regex: '/beauty',
      link: 'https://www.boots.com/beauty',
      hasSubmenu: true,
      children: [
        {
          name: 'new in',
          link: 'https://www.boots.com/new-to-boots/new-in-beauty-skincare',
          hasSubmenu: false,
        },
        {
          name: 'offers',
          colour: '#b8237b',
          link: 'https://www.boots.com/beauty/beauty-skincare-offers',
          hasSubmenu: false,
        },
        {
          name: 'make up',
          link: 'https://www.boots.com/beauty/makeup',
          hasSubmenu: false,
          content: [
            <div class="container">
                <div class="column oneColumn">
                <span class="title">shop by body area</span>
                  <div class="inner">
                    <ul class="subList"> 
                      <li><a href="https://www.boots.com/beauty/makeup/face">face</a></li>
                      <li><a href="https://www.boots.com/beauty/makeup/eyes">eyes</a></li>
                      <li><a href="https://www.boots.com/beauty/makeup/lips">lips</a></li>
                      <li><a href="https://www.boots.com/beauty/makeup/nails">nails</a></li>
                    </ul>
                </div>
              </div>  
                <div class="column two-columns">
                <span class="title">shop by category</span>
                <div class="inner">
                  <div class="col1">
                    <ul class="subList">
                      <li><a href="https://www.boots.com/beauty/makeup/make-up-gift-sets">beauty gift sets</a></li>
                      <li><a href="https://www.boots.com/beauty/makeup/brushes-sponges">brushes &amp; sponges</a></li>
                      <li><a href="https://www.boots.com/beauty/makeup/glitter-accessories">glitter and accessories</a></li>
                      <li><a href="https://www.boots.com/beauty/makeup/palettes">palettes</a></li>
                      <li><a href="https://www.boots.com/beauty/makeup/make-up-remover-">make-up remover</a></li> 
                    </ul>
                  </div>
                  <div class="col2">
                    <ul class="subList">
                      <li><a href="https://www.boots.com/beauty/makeup/make-up-mirrors">mirrors</a></li>
                      <li><a href="https://www.boots.com/beauty/makeup/wash-bags">wash bags &amp; organisers</a></li>
                      <li><a href="https://www.boots.com/beauty/makeup/vegan-makeup-products">vegan makeup</a></li>
                   </ul>
                  </div>
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'hair',
          link: 'https://www.boots.com/beauty/hair',
          hasSubmenu: false,
          content: [
            <div class="container">
                <div class="column oneColumn">
                <span class="title">shop hair</span>
                <div class="inner">
                  <ul class="subList">
                   <li><a href="https://www.boots.com/beauty/hair">visit hair</a></li>
                   <li><a href="https://www.boots.com/beauty/hair/all-hair">all hair</a></li>
                   <li><a href="https://www.boots.com/beauty/hair/new-in-hair">new in hair</a></li>
                   <li><a href="https://www.boots.com/beauty/hair/luxury-beauty-hair">premium hair</a></li>
                   </ul>
                </div>
              </div>
                <div class="column two-columns">
                <span class="title">shop by category</span>
                <div class="inner">
                  <div class="col1">
                    <ul class="subList">
                      <li><a href="https://www.boots.com/beauty/hair/hair-dye">hair dye</a></li>
                      <li><a href="https://www.boots.com/beauty/hair/hair-styling">hair styling</a></li>
                      <li><a href="https://www.boots.com/beauty/hair/shampoo">shampoo</a></li>
                      <li><a href="https://www.boots.com/beauty/hair/conditioner">conditioner</a></li>
                      <li><a href="https://www.boots.com/beauty/hair/hair-treatments-and-masks">hair treatments and masks</a></li>
                      <li><a href="https://www.boots.com/beauty/hair/hair-accessories">hair accessories</a></li>
                      <li><a href="https://www.boots.com/beauty/hair/brushes-and-combs">brushes &amp; combs</a></li>
                      
                    </ul>
                  </div>
                  <div class="col2">
                      <ul class="subList">
                        <li><a href="https://www.boots.com/beauty/hair/hair-value-packs-and-bundles">hair value packs and bundles</a></li>
                        <li><a href="https://www.boots.com/beauty/hair/textured-hair">curls, kinks and coils</a></li>
                        <li><a href="https://www.boots.com/beauty/hair/hair-health-vitamins">hair health vitamins</a></li>
                        <li><a href="https://www.boots.com/beauty/hair/thinning-hair">thinning hair</a></li>
                        <li><a href="https://www.boots.com/beauty/hair/mens-hair">men's hair</a></li>
                      </ul>
                  </div>
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'toiletries',
          link: 'https://www.boots.com/toiletries',
          hasSubmenu: false,
          content: [
            <div class="container">
                <div class="column oneColumn">
                <span class="title">shop toiletries</span>
                <div class="inner">
                  
                  <ul class="subList">
                    <li><a href="https://www.boots.com/toiletries/new-in-toiletries">new in toiletries</a></li>
                   <li><a href="https://www.boots.com/toiletries/toiletries-offers">toiletries offers</a></li>
                   <li><a href="https://www.boots.com/toiletries/toiletries-value-packs-and-bundles">toiletries value packs &amp; bundles</a></li>
                   <li><a href="https://www.boots.com/toiletries/mens-toiletries">men's toiletries</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">shop by category</span>
                <div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://www.boots.com/beauty/skincare">skincare</a></li>
                   <li><a href="https://www.boots.com/toiletries/hair/shampoo">shampoo</a></li>
                   <li><a href="https://www.boots.com/beauty/hair/conditioner">conditioner</a></li>
                   <li><a href="https://www.boots.com/holidays/suncare">suncare</a></li>
                   <li><a href="https://www.boots.com/toiletries/fake-gradual-tan">fake &amp; gradual tan</a></li>
                   <li><a href="https://www.boots.com/toiletries/skincare-female-hair-removal">female hair removal</a></li>
                   </ul>
                </div>
              </div>
                <div class="column two-columns">
                <span class="title">bathroom essentials</span>
                <div class="inner">
                  <div class="col1">
                    <ul class="subList">
                        <li><a href="https://www.boots.com/toiletries/washing-bathing">all bathroom essentials</a></li>
                        <li><a href="https://www.boots.com/toiletries/washing-bathing/shower-gel">shower gels &amp; scrubs</a></li>
                        <li><a href="https://www.boots.com/toiletries/washing-bathing/soap-hand-wash">soap &amp; hand wash</a></li>
                        <li><a href="https://www.boots.com/toiletries/washing-bathing/body-scrub">body scrub</a></li>
                        <li><a href="https://www.boots.com/toiletries/washing-bathing/face-wash">face wash</a></li>
                        <li><a href="https://www.boots.com/toiletries/washing-bathing/tissues-wipes-sanitisers">tissues, wipes &amp; sanitisers</a></li>
                        <li><a href="https://www.boots.com/toiletries/washing-bathing/baby-child-toiletries">baby &amp; child toiletries</a></li>
                    </ul>
                   </div>
                   <div class="col2">
                      <ul class="subList">
                        <li><a href="https://www.boots.com/toiletries/luxury-bath-body">luxury bath &amp; body</a></li>
                        <li><a href="https://www.boots.com/toiletries/feminine-hygiene">feminine hygiene</a></li>
                        <li><a href="https://www.boots.com/toiletries/deodorants-antiperspirants">deodorants &amp; antiperspirants</a></li>
                        <li><a href="https://www.boots.com/toiletries/mens-toiletries">men's toiletries</a></li>
                      </ul>
                   </div>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">dental</span>
                <div class="inner">
                  <ul class="subList">
                   <li><a href="https://www.boots.com/toiletries/bootsdental/mouthwash">mouthwash</a></li>
                   <li><a href="https://www.boots.com/toiletries/bootsdental/kids-dental">kids dental</a></li>
                   <li><a href="https://www.boots.com/toiletries/bootsdental/oral-health">oral health</a></li>
                   <li><a href="https://www.boots.com/toiletries/bootsdental/toothpaste">toothpaste</a></li>
                   <li><a href="https://www.boots.com/toiletries/bootsdental/electrical-dental">electrical dental</a></li>
                   <li><a href="https://www.boots.com/toiletries/bootsdental/toothbrushes">toothbrushes</a></li>
                   </ul>
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'premium beauty',
          link: 'https://www.boots.com/beauty/luxury-beauty-skincare',
          hasSubmenu: false,
          content: [
            <div class="container">
                <div class="column two-columns">
                <span class="title">shop premium beauty</span>
                <div class="inner">
                    <div class="col1">
                      <ul class="subList">
                        <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-gift">premium beauty gifts</a></li>
                        <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-offers">Boss Beauty Deals</a></li>
                        <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/new-in-luxury--1">new in premium beauty &amp; skincare</a></li>
                        <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/all-luxury-skincare">premium skincare</a></li>
                        <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-makeup">premium makeup</a></li>
                        <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-value-packs-and-bundles">premium value packs &amp; bundles</a></li>
                        <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-makeup-tools">premium makeup tools</a></li>
                      </ul>
                     </div>
                     <div class="col2">
                      <ul class="subList">
                        <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-makeup-tools">men's premium</a></li>
                        <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-suncare-tanning-travel">premium suncare &amp; SPF</a></li>
                        <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-suncare-tanning-travel">premium beauty book an appointment</a></li>
                        <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/luxury-beauty-hair">premium hair</a></li>
                        </ul>
                     </div>
                </div>
              </div>
              </div>
            ],
          },

        {
          name: 'electrical beauty',
          link: 'https://www.boots.com/electrical/beauty-tools',
          hasSubmenu: false,
          content: [
            <div class="container">
                <div class="column oneColumn">
                <span class="title">hair styling tools</span><div class="inner">
                  
                  <ul class="subList">
            <li><a href="https://www.boots.com/electrical/hair-styling-tools">visit hair styling tools</a></li>
                   <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-curlers">hair curlers</a></li>
                   <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-dryers">hair dryers</a></li>
                   <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-straighteners">hair straighteners</a></li>
                   <li><a href="https://www.boots.com/electrical/hair-styling-tools/hot-brushes-air-stylers">hot brushes &amp; air stylers</a></li>
                   <li><a href="https://www.boots.com/electrical/hair-styling-tools/hair-tools-accessories-spares">accessories &amp; spares</a></li>
                   <li><a href="https://www.boots.com/electrical/hair-styling-tools/all-electrical-hair-styling-tools">all hair styling tools</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">electrical dental</span><div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://www.boots.com/electrical/electrical-dental">visit electrical dental</a></li>
                   <li><a href="https://www.boots.com/electrical/electrical-dental/all-electrical-dental-">all electrical dental</a></li>
                     <li><a href="https://www.boots.com/electrical/electrical-dental/electric-toothbrushes">electric toothbrushes</a></li>
                   <li><a href="https://www.boots.com/electrical/electrical-dental/kids-electric-toothbrushes">kids electric toothbrushes</a></li>
                     <li><a href="https://www.boots.com/electrical/electrical-dental/dental-brush-heads">brush heads</a></li>
                   <li><a href="https://www.boots.com/electrical/electrical-dental/electric-flossers">electric flossers</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">beauty tools</span><div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://www.boots.com/electrical/beauty-tools">visit beauty tools</a></li>
                   <li><a href="https://www.boots.com/electrical/beauty-tools/acne-treatments">acne treatments</a></li>
                   <li><a href="https://www.boots.com/electrical/beauty-tools/anti-ageing">anti-ageing</a></li>
                   <li><a href="https://www.boots.com/electrical/beauty-tools/facial-beauty-tools">facial beauty tools</a></li>
                   <li><a href="https://www.boots.com/electrical/beauty-tools/facial-cleansing-brush">facial cleansing brushes</a></li>
                   <li><a href="https://www.boots.com/electrical/beauty-tools/manicure-pedicure-tools">manicure &amp; pedicure tools</a></li>
                   <li><a href="https://www.boots.com/electrical/beauty-tools/all-electrical-beauty-tools">all beauty tools</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">male grooming</span><div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://www.boots.com/electrical/male-grooming-tools">visit male grooming tools</a></li>
                   <li><a href="https://www.boots.com/electrical/male-grooming-tools/shavers">shavers</a></li>
                   <li><a href="https://www.boots.com/electrical/male-grooming-tools/beard-stubble-trimmers">beard &amp; stubble trimmers</a></li>
                   <li><a href="https://www.boots.com/electrical/male-grooming-tools/mens-hair-clippers">hair clippers</a></li>
                   <li><a href="https://www.boots.com/electrical/male-grooming-tools/body-groomers">body groomers</a></li>
                   <li><a href="https://www.boots.com/electrical/male-grooming-tools/nose-ear-trimmers">nose &amp; ear trimmers</a></li>
                   <li><a href="https://www.boots.com/electrical/male-grooming-tools/male-grooming-accessories-spares">accessories &amp; spares</a></li>
                   <li><a href="https://www.boots.com/electrical/male-grooming-tools/all-electrical-male-grooming">all male grooming</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">female hair removal</span><div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://www.boots.com/electrical/female-hair-removal-tools">visit female hair removal tools</a></li>
                   <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-removal-tools-">all female hair removal tools</a></li>
                   <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/all-female-hair-remov">all female hair removal</a></li>
                   <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/epilators">epilators</a></li>
                   <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/ipl-hair-removal">IPL hair removal</a></li>
                   <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/lady-shavers">lady shavers</a></li>
                   <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/body-face-trimmers">body and face trimmers</a></li>
                   <li><a href="https://www.boots.com/electrical/female-hair-removal-tools/hair-removal-accessories-spares">accessories &amp; spares</a></li>
                   </ul>
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'vegan beauty',
          link: 'https://www.boots.com/beauty/vegan-range',
          hasSubmenu: false,
        },
        {
          name: 'accessories',
          link: 'https://www.boots.com/beauty/beauty-accessories',
          hasSubmenu: false,
        },
        {
          name: 'beauty minis',
          link: 'https://www.boots.com/beauty/travel-beauty-minis',
          hasSubmenu: false,
        },
        {
          name: 'skincare',
          link: 'https://www.boots.com/beauty/skincare',
          hasSubmenu: false,
        },
        {
          name: 'inspiration',
          link: 'https://www.boots.com/skincare-beauty-advice',
          hasSubmenu: false,
        },
      ],
    },

    // Skincare
    {
      name: 'skincare',
      regex: 'beauty/skincare',
      link: 'https://www.boots.com/beauty/skincare',
      hasSubmenu: true,
      children: [{
          name: 'visit skincare',
          allLink: true,
          link: 'https://www.boots.com/beauty/skincare',
          hasSubmenu: false,
        },
        {
          name: 'new in skincare',
          link: 'https://www.boots.com/beauty/new-in-beauty-skincare',
          hasSubmenu: false,
        },
        {
          name: 'skincare offers',
          link: 'https://www.boots.com/beauty/beauty-skincare-offers',
          colour: '#b8237b',
          hasSubmenu: false,
        },
        {
          name: 'shop skincare',
          link: 'https://www.boots.com/beauty/skincare',
          hasSubmenu: false,
          content: [
            <div class="container">
                <div class="column oneColumn">
                <span class="title">shop by product</span><div class="inner">
                  
                  <ul class="subList">
              <li><a href="https://www.boots.com/beauty/luxury-beauty-skincare/all-luxury-skincare">premium skincare</a></li>
                     <li><a href="https://www.boots.com/beauty/skincare/vegan-skincare-products">vegan skincare</a></li>
                     <li><a href="https://www.boots.com/beauty/skincare/skincare-body">men's skincare &amp; body</a></li>
                     </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">shop by category</span><div class="inner">
                  
                  <ul class="subList">
              <li><a href="https://www.boots.com/beauty/skincare/facial-skincare">facial skincare</a></li>
                   <li><a href="https://www.boots.com/beauty/skincare/body-skincare">body skincare</a></li>
                   <li><a href="https://www.boots.com/beauty/skincare/fake-gradual-tan">fake &amp; gradual tan</a></li>
                   <li><a href="https://www.boots.com/beauty/skincare/skincare-female-hair-removal">female hair removal</a></li>
                   <li><a href="https://www.boots.com/beauty/skincare/expert-skincare-">expert skincare &amp; treatments</a></li>
                   </ul>
                </div>
              </div>
              </div>
              
              ],
            },
        {
          name: 'skincare inspiration',
          link: 'https://www.boots.com/skincare-beauty-advice/skincare-advice',
          hasSubmenu: false,
        },
      ],
    },

    // Fragrance
    {
      name: 'fragrance',
      regex: '/fragrance',
      link: 'https://www.boots.com/fragrance',
      hasSubmenu: true,
      children: [{
          name: 'visit fragrance',
          allLink: true,
          link: 'https://www.boots.com/fragrance',
          hasSubmenu: false,
        },
        {
          name: 'new in fragrance',
          link: 'https://www.boots.com/fragrance/new-in-fragrance',
          hasSubmenu: false,
        },
        {
          name: 'shop fragrance',
          link: 'https://www.boots.com/fragrance/fragrance-offers',
          hasSubmenu: false,
          content: [
            <div class="container">
                 <div class="column oneColumn">
                <span class="title">fragrance offers</span><div class="inner">
                  
                  <ul class="subList">
              <li><a href="https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-save-up-to-half-price">save up to half price</a></li>
                     <li><a href="https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-save-10-pounds">save 10 pounds</a></li>
                     <li><a href="https://www.boots.com/fragrance/fragrance-offers/complimentary-free-gifts-and-offers-with-selected-purchases">free gifts</a></li>
                     <li><a href="https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-every-day-low-prices">everyday low prices</a></li>
                     <li><a href="https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-clearance">clearance</a></li>
                     </ul>
                </div>
                </div>
                <div class="column oneColumn">
                <span class="title">shop by category</span><div class="inner">
                  
                  <ul class="subList">
                    <li><a href="https://www.boots.com/fragrance/perfume">perfume</a></li>
                     <li><a href="https://www.boots.com/fragrance/aftershave">aftershave</a></li>
                     <li><a href="https://www.boots.com/fragrance/fragrance-gift-sets">fragrance gift sets</a></li>
                     <li><a href="https://www.boots.com/fragrance/luxury-fragrance">luxury fragrance</a></li>
                     <li><a href="https://www.boots.com/fragrance/vegan-fragrances">vegan fragrance</a></li>
                     <li><a href="https://www.boots.com/fragrance/fragrance-home-fragrances">home fragrance</a></li>
                     </ul>
                </div>
              </div>
              </div>
              
              ],
            },
            
        {
          name: 'fragrance inspiration',
          link: 'https://www.boots.com/fragrance-advice',
          hasSubmenu: false,
        },
      ],
    },    

    // Baby & Child
    {
      name: 'baby & child',
      regex: '/baby-child',
      link: 'https://www.boots.com/baby-child',
      hasSubmenu: true,
      children: [
        {
          name: 'value packs and bundles',
          link: 'https://www.boots.com/baby-child/baby-value-packs-and-bundles',
          hasSubmenu: false,
        },
        {
          name: 'baby & child offers',
          colour: '#b8237b',
          link: 'https://www.boots.com/baby-child/baby-child-offers',
          hasSubmenu: false,
        },
        {
          name: 'Parenting Club',
          link: 'https://www.boots.com/baby-child/parenting-club',
          hasSubmenu: false,
        },
        {
          name: 'baby event',
          link: 'https://www.boots.com/baby-child/baby-child-offers',
          hasSubmenu: false,
        },
        {
          name: 'travel & nursery',
          link: 'https://www.boots.com/baby-child/pushchairs-car-seats',
          hasSubmenu: false,
          content: [
            <div class="container">
                <div class="column oneColumn">
                <span class="title">travel</span><div class="inner">
                  
                  <ul class="subList">
                    <li><a href="https://www.boots.com/baby-child/pushchairs-car-seats/pushchairs-strollers-prams-doubles">pushchairs, strollers, prams &amp; doubles</a></li>
                    <li><a href="https://www.boots.com/baby-child/pushchairs-car-seats/car-seats-accessories">car seats &amp; accessories</a></li>
                    <li><a href="https://www.boots.com/baby-child/pushchairs-car-seats/travel-systems">travel systems</a></li>
                    <li><a href="https://www.boots.com/baby-child/pushchairs-car-seats/travel-accessories">travel accessories</a></li>
                   </ul>
                </div>
              </div>
                <div class="column two-columns">
                <span class="title">nursery</span>
                <div class="inner">
                  <div class="col1">
                      <ul class="subList">
                          <li><a href="https://www.boots.com/baby-child/nursery-furniture/furniture-sets">nursery furniture</a></li>
                          <li><a href="https://www.boots.com/baby-child/nursery-furniture/cots-cot-beds">cots &amp; cot beds</a></li>
                          <li><a href="https://www.boots.com/baby-child/nursery-furniture/cribs-moses-baskets">cribs &amp; moses baskets</a></li>
                          <li><a href="https://www.boots.com/baby-child/nursery-furniture/thermometers">thermometers</a></li>
                          <li><a href="https://www.boots.com/baby-child/nursery-furniture/baby-safety">baby safety</a></li>
                          <li><a href="https://www.boots.com/baby-child/nursery-furniture/bedside-sleeping">bedside sleeping</a></li>
                          
                      </ul>
                    </div>
                    <div class="col2">
                      <ul class="subList">
                      <li><a href="https://www.boots.com/baby-child/nursery-furniture/mobiles-night-lights">mobiles &amp; night lights</a></li>
                          <li><a href="https://www.boots.com/baby-child/nursery-furniture/baby-monitors">baby monitors</a></li>
                          <li><a href="https://www.boots.com/baby-child/nursery-furniture/baby-bedding">bedding</a></li>
                          <li><a href="https://www.boots.com/baby-child/nursery-furniture/bouncers-swings-play-gyms">bouncers, swings &amp; play gyms</a></li>
                          <li><a href="https://www.boots.com/baby-child/nursery-advice-service">nursery advice service</a></li>
                         
                      </ul>
                    </div>
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'clothing',
          link: 'https://www.boots.com/baby-child/mothercare-clothing',
          hasSubmenu: false,
          content: [
            <div class="container">  
                <div class="column oneColumn">
                <span class="title">shop clothing</span>
                <div class="inner">
                  
                  <ul class="subList">
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/shop-all-baby-kids-clothing">shop all baby &amp; kids clothing</a></li>
                    <li><a href="https://www.boots.com/baby-child/mothercare-clothing/new-clothing-collection">new in baby &amp; kids clothes</a></li>
                   </ul>
                  </div>
                  </div>  
                <div class="column oneColumn">
                <span class="title">shop by category</span>
                <div class="inner">
            
                  <ul class="subList">
                  <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months">baby clothes 0-24 months</a></li>
                   <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-girls-clothes-9-months-6-years">girls clothes 9 months - 6 years</a></li>
                   <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-boys-clothes-9-months-6-years">boys clothes 9 months - 6 years</a></li>
                   <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-nightwear-underwear">nightwear &amp; underwear</a></li>
                   <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-maternity-bras">maternity bras</a></li>
                   <li><a href="https://www.boots.com/baby-child/mothercare-clothing/mothercare-premature-baby-range">premature baby range</a></li>
                   </ul>
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'feeding',
          link: 'https://www.boots.com/baby-child/babyfeeding',
          hasSubmenu: false,
          content: [
            <div class="container">  
                <div class="column oneColumn">
                  <span class="title">shop offers</span><div class="inner">
                    <ul class="subList">
                    <li><a href="https://www.boots.com/baby-child/babyfeeding/baby-value-packs-and-bundles">baby value packs &amp; bundles</a></li>
                    </ul>
                  </div>
                </div>
                <div class="column two-columns">
                <span class="title">shop by category</span>
                  <div class="inner">
                    <div class="col1">
                      <ul class="subList">
                        <li><a href="https://www.boots.com/baby-child/babyfeeding/baby-milk-formula">baby milk &amp; formula</a></li>
                        <li><a href="https://www.boots.com/baby-child/babyfeeding/baby-food-weaning">baby food &amp; weaning</a></li>
                        <li><a href="https://www.boots.com/baby-child/babyfeeding/breastfeeding-pumps">breastfeeding</a></li>
                        <li><a href="https://www.boots.com/baby-child/babyfeeding/toddler-food-drink">toddler food &amp; drink</a></li>
                        <li><a href="https://www.boots.com/baby-child/babyfeeding/baby-bottles-teats">bottle feeding</a></li>
                        <li><a href="https://www.boots.com/baby-child/babyfeeding/baby-cups">cups</a></li>
                        <li><a href="https://www.boots.com/baby-child/babyfeeding/soothers-teethers">soothers &amp; teethers</a></li>
                      </ul>
                    </div>
                    <div class="col2">
                      <ul class="subList">
                      <li><a href="https://www.boots.com/baby-child/babyfeeding/child-dinnerware">dinnerware</a></li>
                        <li><a href="https://www.boots.com/baby-child/babyfeeding/sterilising">sterilising</a></li>
                        <li><a href="https://www.boots.com/baby-child/babyfeeding/bibs-muslins">bibs &amp; muslins</a></li>
                        <li><a href="https://www.boots.com/baby-child/babyfeeding/highchairs-booster-seats">highchairs &amp; booster seats</a></li>
                        <li><a href="https://www.boots.com/baby-child/babyfeeding/lunch-bags">lunch bags</a></li>
                      </ul>
                    </div>
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'bathing & changing',
          link: 'https://www.boots.com/baby-child/bathing-changing',
          hasSubmenu: false,
          content: [
            <div class="container">    
                <div class="column two-columns">
                <span class="title">shop by category</span><div class="inner">
                  <div class="col1">
                      <ul class="subList">
                          <li><a href="https://www.boots.com/baby-child/bathing-changing/kids-dental">kids dental</a></li>
                          <li><a href="https://www.boots.com/baby-child/bathing-changing/changing-bag-essentials">changing bag essentials</a></li>
                          <li><a href="https://www.boots.com/baby-child/bathing-changing/baby-value-packs-and-bundles">baby value packs &amp; bundles</a></li>
                          <li><a href="https://www.boots.com/baby-child/bathing-changing/baby-child-toiletries">baby &amp; child toiletries</a></li>
                          <li><a href="https://www.boots.com/baby-child/bathing-changing/nappies">nappies</a></li>
                          <li><a href="https://www.boots.com/baby-child/bathing-changing/baby-baths-accessories">baby baths &amp; accessories</a></li>
                          
                      </ul>
                  </div>
                  <div class="col2">
                      <ul class="subList">
                      <li><a href="https://www.boots.com/baby-child/bathing-changing/baby-wipes">baby wipes</a></li>
                          <li><a href="https://www.boots.com/baby-child/bathing-changing/changing-bags-mats">changing bags &amp; mats</a></li>
                          <li><a href="https://www.boots.com/baby-child/bathing-changing/potty-training">potty training</a></li>
                          <li><a href="https://www.boots.com/baby-child/bathing-changing/nappy-disposal">nappy disposal</a></li>
                          <li><a href="https://www.boots.com/baby-child/bathing-changing/baby-cotton-wool">cotton wool</a></li>
                      </ul>
                  </div>
                 
                </div>
              </div>
              </div>
            ],
          },

        {
          name: 'pregnancy & child health',
          link: 'https://www.boots.com/baby-child/baby-child-health',
          hasSubmenu: false,
          content: [
            <div class="container">      
                <div class="column oneColumn">
                  <span class="title">shop baby & child health</span>
                  <div class="inner">
                    <ul class="subList">
                      <li><a href="https://www.boots.com/baby-child/baby-child-health/baby-child-vitamins">baby &amp; child vitamins</a></li>
                      <li><a href="https://www.boots.com/baby-child/baby-child-health/fever-pain-relief">fever &amp; pain relief</a></li>
                      <li><a href="https://www.boots.com/baby-child/baby-child-health/child-cough-cold-flu">cough, cold &amp; flu</a></li>
                      <li><a href="https://www.boots.com/baby-child/baby-child-health/skincare-conditions">skincare conditions</a></li>
                      <li><a href="https://www.boots.com/baby-child/baby-child-health/teething">teething</a></li>
                      <li><a href="https://www.boots.com/baby-child/baby-child-health/allergy-hayfever-children">allergy &amp; hayfever</a></li>
                      <li><a href="https://www.boots.com/baby-child/baby-child-health/child-first-aid">first aid</a></li>
                      <li><a href="https://www.boots.com/baby-child/baby-child-health/nits-lice-worms">nits, lice &amp; worms</a></li>
                      <li><a href="https://www.boots.com/baby-child/baby-child-health/colic">colic management</a></li>
                    </ul>
                  </div>
                </div>
                <div class="column two-columns">
                  <span class="title">shop by pregnancy & maternity</span>
                  <div class="inner">
                      <div class="col1">
                        <ul class="subList">
                          <li><a href="https://www.boots.com/baby-child/pregnancy-maternity">visit pregnancy & maternity</a></li>
                          <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/all-premature-baby">all premature baby</a></li>
                          <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/hospital-bag-essentials">hospital bag essentials</a></li>
                          <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/new-mum-toiletries">new mum toiletries</a></li>
                          <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/maternity-nursing-clothing">maternity &amp; nursing clothes</a></li>
                          <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-tests">pregnancy tests</a></li>
                          <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/pregnancysupplements">pregnancy supplements</a></li>
                        </ul>
                      </div>
                      <div class="col2">
                        <ul class="subList">
                        <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/maternity-tens-machine">maternity TENs machines</a></li>
                        <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/pregnancy-maternity-pillows">pillows</a></li>
                        <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/ovulation-fertility-tests">ovulation &amp; fertility tests</a></li>
                        <li><a href="https://www.boots.com/baby-child/pregnancy-maternity/gift-baby-shower">baby shower gifting</a></li>
                        </ul>
                      </div>
                  </div>
                </div>
              </div>
            ],
          },
        {
          name: 'toys',
          link: 'https://www.boots.com/toys',
          hasSubmenu: false,
        },
       
      ],
    },

    // Health & Wellness
    {
      name: 'health & wellness',
      regex: '/health-pharmacy',
      link: 'https://www.boots.com/health-pharmacy',
      hasSubmenu: true,
      children: [{
          name: 'offers',
          colour: '#b8237b',
          link: 'https://www.boots.com/health-pharmacy/health-offers',
          hasSubmenu: false,
          content: [
            <div class="container">         
                <div class="column oneColumn">
                <span class="title">shop offers</span><div class="inner">
                  
                  <ul class="subList">
                    <li><a href="https://www.boots.com/health-pharmacy/health-offers">health offers</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/new-in-health">new in health</a></li>
                    <li><a href="https://www.boots.com/wellness/new-in-wellness">new in wellness</a></li>
                   </ul>
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'shop health',
          link: 'https://www.boots.com/health-pharmacy',
          hasSubmenu: false,
          content: [
            <div class="container">     
                <div class="column two-columns">
                <span class="title">women's health</span>
                <div class="inner">
                  <div class="col1">
                    <ul class="subList">
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth">visit women's health</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/familyplanning">planning for a baby</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/intimate-dryness--1">intimate dryness</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/vaginitis">bacterial vaginosis</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/female-incontinence">female incontinence</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/feminine-wash-wipes">feminine wash &amp; wipes</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/thrush">thrush</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/menopause-support">menopause</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/womenshealth-supplements">women's health supplements</a></li>
                        
                    </ul>
                  </div>
                  <div class="col2">
                    <ul class="subList">
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/morning-after-pill">Morning After Pill</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/period-delay-clinic">Period Delay Online Clinic</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/cystitis-urinary-tract-infections">cystitis &amp; urinary tract infections</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/womens-hair-loss">hair loss</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/period-pain">period pain</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/cervicalcancer">Cervical Cancer Vaccination Service</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/womenshealth/womens-alternative-therapy">alternative therapy</a></li>
                    </ul>
                  </div>  
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">men's health</span><div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://www.boots.com/health-pharmacy/menshealth">visit men's health</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/menshealth/mens-sexual-health">men's sexual health</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/menshealth/male-incontinence">male incontinence</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/menshealth/mens-hair-loss">hair loss</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/menshealth/menshealth-supplements">men's health supplements</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/menshealth/jock-rash">jock rash</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">baby &amp; child health</span>
                <div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://www.boots.com/health-pharmacy/baby-child-health">visit baby &amp; child health</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/baby-child-health/baby-child-vitamins">baby &amp; child vitamins</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/baby-child-health/fever-pain-relief">fever &amp; pain relief</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/baby-child-health/child-cough-cold-flu">cough, cold &amp; flu</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/baby-child-health/skincare-conditions">skincare conditions</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/baby-child-health/teething">teething</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/baby-child-health/allergy-hayfever-children">allergy &amp; hayfever</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/baby-child-health/child-first-aid">first aid</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/baby-child-health/nits-lice-worms">nits, lice &amp; worms</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/baby-child-health/colic">colic management</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">sexual pleasure &amp; wellbeing</span><div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health">visit sexual pleasure &amp; wellbeing</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health/adult-toys">adult toys</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health/condoms">condoms</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health/lubricants-massagers-gels">lubricants &amp; gels</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health/feminine-hygiene-and-health">feminine hygiene &amp; health</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health/mens-hygiene-and-health">men's hygiene &amp; health</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health/intimate-hair-removal">intimate hair removal &amp; grooming</a></li>
                   </ul>
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'medicines & treatments',
          link: 'https://www.boots.com/health-pharmacy/medicines-treatments',
          hasSubmenu: false,
          content: [
            <div class="container"> 
                <div class="column three-columns">
                <span class="title">shop by category</span><div class="inner">
                  <div class="col1">
                      <ul class="subList">
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/painrelief">pain</a></li>
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/eye-care">eyecare</a></li>
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/digestion">stomach &amp; bowel</a></li>
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/heartburn-indigestion-">heartburn &amp; indigestion</a></li>
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/footcare">footcare</a></li>
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/allergy-hayfever">allergy &amp; hayfever</a></li>
                      </ul>

                  </div>
                  <div class="col2">
                  <ul class="subList">
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/skin-problems">specialist skincare</a></li>
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/first-aid">first aid</a></li>
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/cold-flu-medication">cough, cold &amp; flu</a></li>
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/mouth-oral-care">mouth &amp; oral care</a></li>
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/sleep">sleep</a></li>
                      </ul>

                  </div>
                  <div class="col3">
                  <ul class="subList">
                         <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/ear-care">earcare</a></li>
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/mens-hair-loss">hair loss</a></li>
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/diabetes">diabetes</a></li>
                          <li><a href="https://www.boots.com/health-pharmacy/medicines-treatments/healthyheart">heart health</a></li>
                          <li><a href="https://www.boots.com/health-pharmacy/pharmacy-medicines">pharmacy medicines</a></li>
                      </ul>
                  </div>
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'vitamins & supplements',
          link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements',
          hasSubmenu: false,
          content: [
            <div class="container"> 
                <div class="column oneColumn">
                <span class="title">vitamins</span>
                <div class="inner">
                  <ul class="subList">
                    <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/vitamin-selector-tool">vitamin selector</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/multivitamins">multivitamins</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/immunehealth">immune health</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/baby-child-vitamins">baby &amp; child vitamins</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/hair-health-vitamins">hair health vitamins</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/vegan-vitamins">vegan vitamins</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/50plus-multivitamins">50+ multivitamins</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">supplements</span>
                <div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/pregnancysupplements">pregnancy supplements</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/cannabidiol-cbd-oil">CBD</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/beautysupplements">beauty supplements</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/menshealth-supplements">mens health supplements</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">shop by problem</span><div class="inner">
                  
                  <ul class="subList">
                    <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/digestive-health">digestive health</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/supplements-for-energy">energy support</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/eyehealth">eye health</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/bonehealth">bone health</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/brainhealth">brain health</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/vitaminsandsupplements/jointhealth">joint health</a></li>
                   </ul>
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'wellness',
          link: 'https://www.boots.com/wellness',
          hasSubmenu: true,
          content: [
            <div class="container"> 
                <div class="column oneColumn">
                <span class="title">lifestyle &amp; wellbeing</span><div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing">visit lifestyle &amp; wellbeing</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/wellness-supplements">alternative therapies</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/weightloss">diet &amp; weight management</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/bootsdental">dental</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/stopsmoking">smoking control</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/health-food">health food</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/fitness">fitness equipment &amp; activity trackers</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/familyplanning">planning for a baby</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/sports-nutrition">sports nutrition</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/lifestyle-wellbeing/home-pet-care">home &amp; pet care</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">diet &amp; weight management</span><div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://www.boots.com/wellness/weightloss">visit diet &amp; weight management</a></li>
                   <li><a href="https://www.boots.com/wellness/weightloss/new-in-diet-and-weight-management">new in diet &amp; weight management</a></li>
                   <li><a href="https://www.boots.com/wellness/weightloss/diet-weight-slimming-aids">slimming aids</a></li>
                   <li><a href="https://www.boots.com/wellness/weightloss/meal-replacements">meal replacements</a></li>
                   <li><a href="https://www.boots.com/wellness/weightloss/weight-management-bars-snacks">bars &amp; snacks</a></li>
                   <li><a href="https://www.boots.com/wellness/weightloss/weighing-scales-body-fat-monitors">weighing scales &amp; body fat monitors</a></li>
                   <li><a href="https://www.boots.com/wellness/sports-nutrition">sports nutrition</a></li>
                   <li><a href="https://www.boots.com/wellness/recipe-book-accessories">recipe books &amp; accessories</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">sexual pleasure</span><div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health">visit sexual pleasure &amp; wellbeing</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health/adult-toys">adult toys</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health/condoms">condoms</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health/lubricants-massagers-gels">lubricants &amp; gels</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health/feminine-hygiene-and-health">feminine hygiene &amp; health</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health/mens-hygiene-and-health">men's hygiene &amp; health</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/condoms-sexual-health/intimate-hair-removal">intimate hair removal &amp; grooming</a></li>
                   </ul>
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'incontinence',
          link: 'https://www.boots.com/health-pharmacy/incontinence',
          hasSubmenu: false,
        },
        {
          name: 'health hub',
          link: 'https://www.boots.com/healthhub',
          hasSubmenu: false,
          content: [
            <div class="container"> 
                <div class="column oneColumn">
                <span class="title">Health Hub</span><div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://onlinedoctor.boots.com/">Boots online doctor</a></li>
                   <li><a href="https://www.boots.com/appointment-booking">appointment booking</a></li>
                   <li><a href="https://www.boots.com/covid-19-testing">COVID-19 testing</a></li>
                   <li><a href="https://www.boots.com/flujab">Winter Flu Jab Service</a></li>
                   <li><a href="https://www.boots.com/opticians">opticians</a></li>
                   <li><a href="https://www.boots.com/healthhub">health &amp; pharmacy</a></li>
                   <li><a href="https://www.boots.com/hearingcare">hearingcare</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">online doctor</span>
                <div class="inner">  
                  <ul class="subList">
                   <li><a href="https://onlinedoctor.boots.com/">visit boots online doctor</a></li>
                   <li><a href="https://onlinedoctor.boots.com/mens-health">mens health</a></li>
                   <li><a href="https://onlinedoctor.boots.com/womens-health">womens health</a></li>
                   <li><a href="https://onlinedoctor.boots.com/general-health">general health</a></li>
                   <li><a href="https://onlinedoctor.boots.com/acne-skin-conditions">acne &amp; skin conditions</a></li>
                   <li><a href="https://onlinedoctor.boots.com/sexual-health">sexual health</a></li>
                   <li><a href="https://onlinedoctor.boots.com/home-testing-kits">testing services</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">COVID-19</span><div class="inner">
                  
                  <ul class="subList">
                   <li><a href="https://www.boots.com/covid-19-testing">visit covid-19 testing</a></li>
                   <li><a href="https://www.boots.com/covid-19-testing/covid-19-at-home-testing-kits">At-Home COVID-19 Testing Kits</a></li>
                   <li><a href="https://www.boots.com/covid-19-testing/covid-19-testing-service">COVID-19 PCR Testing Service</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/covid-vaccination">what is a COVID-19 vaccination?</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/how-to-stop-covid-spreading">how to help prevent the spread of COVID-19</a></li>
                   <li><a href="https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/recognising-coronavirus-symptoms">recognising symptoms</a></li>
                   </ul>
                </div>
              </div>
                <div class="column oneColumn">
                <span class="title">products</span>
                <div class="inner">
              
                  <ul class="subList">
                    <li><a href="https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/surgical-reusable-face-masks">reusable &amp; disposable face masks</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/thermometers">thermometers</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/immunehealth">immune health</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/cold-flu-medication">cough, cold &amp; flu</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/hand-sanitiser-antibacterial-cleaners-disinfectants">antibacterial &amp; disinfectants</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/skin-problems">specialist skincare</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/multivitamins">multivitamins</a></li>
                    <li><a href="https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/baby-child-vitamins">baby &amp; child vitamins</a></li>
                   </ul>
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'electrical health & diagnostics',
          link: 'https://www.boots.com/electrical/electrical-health-diagnostics',
          hasSubmenu: false,
          content: [
            <div class="container"> 
                <div class="column three-columns">
                <span class="title">shop by product</span>
                <div class="inner">
                  <div class="col1">
                      <ul class="subList">
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/blood-pressure-monitors">blood pressure monitors</a></li>
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/diabetes">diabetes</a></li>
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/back-neck-massagers">back &amp; neck massagers</a></li>
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/activity-trackers-1">activity trackers</a></li>
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/foot-massagers-spas">foot massagers &amp; spas</a></li>
                       
                      </ul>
                  </div>
                  <div class="col2">
                      <ul class="subList">
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/dna-test-kits">test kits</a></li>
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/thermometers">thermometers</a></li>
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/electrical-footcare">electrical footcare</a></li>
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/tens-machines">TENS machines</a></li>
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/air-filters-humidifiers-de-humidifiers">air filters, humidifiers, de-humidifiers &amp; fans</a></li>
                        
                      </ul>
                  </div>
                  <div class="col3">
                      <ul class="subList">
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/healthyheart">heart health</a></li>
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/light-therapy">light therapy, wake up &amp; SAD lights</a></li>
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/weighing-scales-body-fat-monitors">weighing scales &amp; body fat monitors</a></li>
                        <li><a href="https://www.boots.com/electrical/electrical-health-diagnostics/electric-blankets">heated bedding &amp; hot water bottles</a></li>
                        <li><a href="https://www.boots.com/health-pharmacy/livingaids">mobility &amp; daily living aids</a></li>
                      </ul>
                  </div> 
                </div>
              </div>
              </div>
            ],
          },
        {
          name: 'travel health',
          link: 'https://www.boots.com/health-pharmacy/travel-health',
          hasSubmenu: false,
        },
        {
          name: 'advice',
          link: 'https://www.boots.com/health',
          hasSubmenu: false,
        },
      ],
    },

    // brands
    {
      name: 'brand A-Z',
      regex: '/health-pharmacy',
      link: 'https://www.boots.com/brands',
      hasSubmenu: false,
    },


    {
      name: 'Help',
      link: 'https://www.boots.com/advantage-card',
      hasSubmenu: false,
      desktop: false,
      icon: '#',
      noneCat: true,
    },
    {
      name: '',
      hasSubmenu: false,
      desktop: false,
      noneCat: true,
      currency: true,
    },

  ];
}
