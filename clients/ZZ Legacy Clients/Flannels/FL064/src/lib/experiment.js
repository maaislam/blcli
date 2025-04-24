/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import { observer } from '../../../../../lib/uc-lib';
import { FL041 } from './FL041/index';
import { zoomIn, zoomOut } from './zoom';
import { pollerLite } from '../../../../../lib/uc-lib';


events.analyticsReference = '_gaUAT';

const activate = () => {

  if (settings.VARIATION == '3') {
    events.send(settings.ID, `Control is Active`, 'Control');
    return false;
  } else {
    events.send(settings.ID, `Variation ${settings.VARIATION} is Active`, 'Test is active');
  }

  
  setup();

  // Run FL041
  if (settings.VARIATION == '2') {
    FL041(true);
  } else {
    FL041();
  }

  // Add observer for zoom
  document.body.insertAdjacentHTML('beforeend', `
    <div class="FL064-lens"></div>
  `);
  const productList = document.querySelectorAll('#productlistcontainer > ul > li');
  const zoomLens = document.querySelector('.FL064-lens');
  for (let i = 0; productList.length > i; i += 1) {
    observer.connect(productList[i], () => {

      const addSlideImgZoom = () => {
        if (window.innerWidth > 679) {
          const sliderImages = document.querySelectorAll('.FL064-popup .FL064-slider img');
          // Add zoom to each
          for (let k = 0; sliderImages.length > k; k += 1) {
            sliderImages[k].addEventListener('mousemove', (e) => {
              // attach background image to lens.
              const imageSrc = sliderImages[k].getAttribute('src');
              zoomLens.style.backgroundImage = '';
              zoomLens.style.backgroundImage = `url(${imageSrc})`;
              zoomIn(e);
            });  
            sliderImages[k].addEventListener('mouseout', (e) => zoomOut(e));  
          }
        }
      }


      const swapSizeToBtns = () => {
        // Change dropdown to buttons
        // let sizeRef, sizes, sizeDropDown;
        const sizeRef = document.getElementById('productVariantAndPrice');
        const sizes = document.querySelectorAll('.SizeDropDown option');
        const sizeDropDown = document.querySelector('.FL064-popup .swapSize');
        // pollerLite(['.FL064-popup .swapSize', '.productVariantAndPrice'], () => {
          const sizesDupe = [];
          for (let i = 1; sizes.length > i; i += 1) {
            const { value } = sizes[i];
            const { title } = sizes[i];
            const pos = i;
            const newEl = `<button class="FL064-sizeBtn" position=${pos} data-size="${value}">${title}</button>`;
            sizesDupe.push(newEl);
          }
          
          if (sizeRef) {
            sizeRef.insertAdjacentHTML('beforeend', `
              <div class="FL064-mobileSizes">
                <h2>Sizes Available</h2>
                ${sizesDupe.length ? sizesDupe.map((el) => {
                  return el;
                }).join(' ') : ''}
              </div>
            `);
          }
        // });

        // Add events to buttons.
        pollerLite(['.FL064-sizeBtn'], () => {
          // Hide old one
          if (sizeDropDown) {
            sizeDropDown.classList.add('hidden');
          }

          const addedButtons = document.querySelectorAll('.FL064-sizeBtn');

          for (let j = 0; addedButtons.length > j; j += 1) {
            addedButtons[j].addEventListener('click', (e) => {
              const selectedBtn = document.querySelector('.FL064-sizeBtn.active');
              if (selectedBtn) {
                selectedBtn.classList.remove('active');
              }
              e.preventDefault();
              const el = e.currentTarget;
              el.classList.add('active');
              const val = el.getAttribute('data-size');
              const pos = el.getAttribute('position');
              const getSize = document.querySelector(`.SizeDropDown option[value="${val}"]`);
              
              if (getSize) {
                getSize.selected = true;
              }
            })
          }
        });
      };

      addSlideImgZoom();
      swapSizeToBtns();
      
      
      // Add size guide link
      if (!window.location.href.match(/kids/g)) {
        // if (window.location.href.match(/men/g) || window.location.href.match(/wommen/g)) {
          const sizeGuideRef = document.querySelector('.addToBasketContainer.SizeRequiredButton');
          if (sizeGuideRef) {
            sizeGuideRef.insertAdjacentHTML('beforebegin', `
              <a href="" id="FL064-sizeLink" class="sizeslink" rel="nofollow help">
                <span id="dnn_ctr176031_ViewTemplate_ctl00_ctl14_spnSizeGuideText" class="SizeGuideText" style="text-decoration: underline;">Size guide</span>
                <span class="SizeGuideIco"><span id="dnn_ctr176031_ViewTemplate_ctl00_ctl14_spnSizeGuidIco" class="sr-only">View size information</span></span>
              </a>
            `);
  
  
            const addedSizeLink = document.querySelector('.FL064-popup #FL064-sizeLink'); 
            const sgRef = document.querySelector('.FL064-popup');
            if (addedSizeLink && sgRef) {
              addedSizeLink.addEventListener('click', (e) => {
                e.preventDefault();

                events.send(settings.ID, 'Click', 'Size guide link');
                
                sgRef.insertAdjacentHTML('beforeend', `
                  <div class="FL064-oldSizeGuide">                      
                    <div class="wrap">
                      <div class="row">
  
                        <div class="FL064-popup--close">
                          <div>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                        
                        <div class="col-xs-12">
                          <p>SIZE GUIDE</p>
                          <p>Below is our sizing guide to help you select the correct items. Inevitably there is some variance in the sizing standards used by manufacturers. Please refer to the bulleted description within each product for further detail on each product and sizing and country of origin.</p>
                        </div>
                        <div class="col-xs-12">
  
                          <div id="tab-men" class="col-xs-12 sizeTab ${window.location.href.match(/\/men\//g) ? 'activeTab' : ''}">
                            <div class="tablediv table-responsive">
                              <table class="table-striped table table-hover">
                                <tbody>
                                  <tr>
                                    <td>CASUAL SHIRTS</td>
                                    <td>STANDARD</td>
                                    <td>XS</td>
                                    <td>S</td>
                                    <td>M</td>
                                    <td>L</td>
                                    <td>XL</td>
                                    <td>XXL</td>
                                    <td>3XL</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>INCHES</td>
                                    <td>36</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>44</td>
                                    <td>46</td>
                                    <td>48</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>CM</td>
                                    <td>92</td>
                                    <td>97</td>
                                    <td>102</td>
                                    <td>107</td>
                                    <td>112</td>
                                    <td>117</td>
                                    <td>122</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>EUROPEAN</td>
                                    <td>44</td>
                                    <td>46</td>
                                    <td>48</td>
                                    <td>50</td>
                                    <td>52</td>
                                    <td>54</td>
                                    <td>56</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>ROMAN</td>
                                    <td>0</td>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>6</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>FORMAL SHIRTS</td>
                                    <td>STANDARD</td>
                                    <td>XS</td>
                                    <td>S</td>
                                    <td>&nbsp;</td>
                                    <td>M</td>
                                    <td>&nbsp;</td>
                                    <td>L</td>
                                    <td>XL</td>
                                    <td>XXL</td>
                                    <td>&nbsp;</td>
                                    <td>3XL</td>
                                    <td>&nbsp;</td>
                                    <td>4XL</td>
                                    <td>5XL</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>INCHES</td>
                                    <td>14.5</td>
                                    <td>15</td>
                                    <td>15.5</td>
                                    <td>15.75</td>
                                    <td>&nbsp;</td>
                                    <td>16</td>
                                    <td>16.5</td>
                                    <td>17</td>
                                    <td>17.5</td>
                                    <td>17.75</td>
                                    <td>&nbsp;</td>
                                    <td>18</td>
                                    <td>18.5</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>CM</td>
                                    <td>37</td>
                                    <td>38</td>
                                    <td>39</td>
                                    <td>40</td>
                                    <td>&nbsp;</td>
                                    <td>41</td>
                                    <td>42</td>
                                    <td>43</td>
                                    <td>44</td>
                                    <td>45</td>
                                    <td>&nbsp;</td>
                                    <td>46</td>
                                    <td>47</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>TROUSERS</td>
                                    <td>STANDARD</td>
                                    <td>S</td>
                                    <td>&nbsp;</td>
                                    <td>M</td>
                                    <td>&nbsp;</td>
                                    <td>L</td>
                                    <td>XL</td>
                                    <td>XXL</td>
                                    <td>3XL</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>BRITISH</td>
                                    <td>28</td>
                                    <td>30</td>
                                    <td>32</td>
                                    <td>34</td>
                                    <td>36</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>EUROPEAN</td>
                                    <td>44</td>
                                    <td>46</td>
                                    <td>48</td>
                                    <td>50</td>
                                    <td>52</td>
                                    <td>54</td>
                                    <td>56</td>
                                    <td>58</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>AMERICAN</td>
                                    <td>28</td>
                                    <td>30</td>
                                    <td>32</td>
                                    <td>34</td>
                                    <td>36</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>OTHER</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>44</td>
                                    <td>46</td>
                                    <td>48</td>
                                    <td>50</td>
                                    <td>52</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>JEANS</td>
                                    <td>STANDARD</td>
                                    <td>S</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>M</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>L</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>XL</td>
                                    <td>&nbsp;</td>
                                    <td>XXL</td>
                                    <td>3XL</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>BRITISH</td>
                                    <td>28</td>
                                    <td>29</td>
                                    <td>30</td>
                                    <td>31</td>
                                    <td>32</td>
                                    <td>33</td>
                                    <td>34</td>
                                    <td>35</td>
                                    <td>36</td>
                                    <td>37</td>
                                    <td>38</td>
                                    <td>39</td>
                                    <td>40</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>CONTINENTAL</td>
                                    <td>44</td>
                                    <td>&nbsp;</td>
                                    <td>46</td>
                                    <td>&nbsp;</td>
                                    <td>48</td>
                                    <td>&nbsp;</td>
                                    <td>50</td>
                                    <td>&nbsp;</td>
                                    <td>52</td>
                                    <td>&nbsp;</td>
                                    <td>54</td>
                                    <td>&nbsp;</td>
                                    <td>56</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>OUTERWEAR</td>
                                    <td>STANDARD</td>
                                    <td>XXS</td>
                                    <td>XS</td>
                                    <td>S</td>
                                    <td>M</td>
                                    <td>L</td>
                                    <td>XL</td>
                                    <td>XXL</td>
                                    <td>3XL</td>
                                    <td>4XL</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>BRITISH</td>
                                    <td>34</td>
                                    <td>36</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>44</td>
                                    <td>46</td>
                                    <td>48</td>
                                    <td>50</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>EUROPEAN</td>
                                    <td>44</td>
                                    <td>46</td>
                                    <td>48</td>
                                    <td>50</td>
                                    <td>52</td>
                                    <td>54</td>
                                    <td>56</td>
                                    <td>58</td>
                                    <td>60</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>AMERICAN</td>
                                    <td>34</td>
                                    <td>36</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>44</td>
                                    <td>46</td>
                                    <td>48</td>
                                    <td>50</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>JAPANESE</td>
                                    <td>0</td>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>6</td>
                                    <td>7</td>
                                    <td>8</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>ITALIAN ROMAN</td>
                                    <td>&nbsp;</td>
                                    <td>I</td>
                                    <td>II</td>
                                    <td>III</td>
                                    <td>IV</td>
                                    <td>V</td>
                                    <td>VI</td>
                                    <td>VII</td>
                                    <td>VIII</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>TAILORING</td>
                                    <td>STANDARD</td>
                                    <td>&nbsp;</td>
                                    <td>S</td>
                                    <td>&nbsp;</td>
                                    <td>M</td>
                                    <td>&nbsp;</td>
                                    <td>L</td>
                                    <td>&nbsp;</td>
                                    <td>XL</td>
                                    <td>XXL</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>BRITISH</td>
                                    <td>34</td>
                                    <td>36</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>44</td>
                                    <td>46</td>
                                    <td>48</td>
                                    <td>50</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>EUROPEAN</td>
                                    <td>44</td>
                                    <td>46</td>
                                    <td>48</td>
                                    <td>50</td>
                                    <td>52</td>
                                    <td>54</td>
                                    <td>56</td>
                                    <td>58</td>
                                    <td>60</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>CHEST</td>
                                    <td>34</td>
                                    <td>36</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>44</td>
                                    <td>46</td>
                                    <td>48</td>
                                    <td>50</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>WAIST</td>
                                    <td>28</td>
                                    <td>30</td>
                                    <td>32</td>
                                    <td>34</td>
                                    <td>36</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>44</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>TOPS/KNITWEAR</td>
                                    <td>STANDARD</td>
                                    <td>XS</td>
                                    <td>S</td>
                                    <td>M</td>
                                    <td>L</td>
                                    <td>XL</td>
                                    <td>XXL</td>
                                    <td>3XL</td>
                                    <td>4XL</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>EUROPEAN</td>
                                    <td>44</td>
                                    <td>46</td>
                                    <td>48</td>
                                    <td>50</td>
                                    <td>52</td>
                                    <td>54</td>
                                    <td>56</td>
                                    <td>58</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>JAPANESE</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>6</td>
                                    <td>7</td>
                                    <td>8</td>
                                    <td>9</td>
                                    <td>10</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>ITALIAN ROMAN</td>
                                    <td>&nbsp;</td>
                                    <td>I</td>
                                    <td>II</td>
                                    <td>III</td>
                                    <td>IV</td>
                                    <td>V</td>
                                    <td>VI</td>
                                    <td>VII</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>FOOTWEAR</td>
                                    <td>BRITISH</td>
                                    <td>5</td>
                                    <td>5.5</td>
                                    <td>6</td>
                                    <td>6.5</td>
                                    <td>7</td>
                                    <td>7.5</td>
                                    <td>8</td>
                                    <td>8.5</td>
                                    <td>9</td>
                                    <td>9.5</td>
                                    <td>10</td>
                                    <td>10.5</td>
                                    <td>11</td>
                                    <td>11.5</td>
                                    <td>12</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>EUROPEAN</td>
                                    <td>39</td>
                                    <td>39.5</td>
                                    <td>40</td>
                                    <td>40.5</td>
                                    <td>41</td>
                                    <td>41.5</td>
                                    <td>42</td>
                                    <td>42.5</td>
                                    <td>43</td>
                                    <td>43.5</td>
                                    <td>44</td>
                                    <td>44.5</td>
                                    <td>45</td>
                                    <td>45.5</td>
                                    <td>46</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>AMERICAN</td>
                                    <td>6</td>
                                    <td>6.5</td>
                                    <td>7</td>
                                    <td>7.5</td>
                                    <td>8</td>
                                    <td>8.5</td>
                                    <td>9</td>
                                    <td>9.5</td>
                                    <td>10</td>
                                    <td>10.5</td>
                                    <td>11</td>
                                    <td>11.5</td>
                                    <td>12</td>
                                    <td>12.5</td>
                                    <td>13</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>HATS</td>
                                    <td>STANDARD</td>
                                    <td>&nbsp;</td>
                                    <td>S</td>
                                    <td>&nbsp;</td>
                                    <td>M</td>
                                    <td>&nbsp;</td>
                                    <td>L</td>
                                    <td>&nbsp;</td>
                                    <td>XL</td>
                                    <td>&nbsp;</td>
                                    <td>XXL</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>IN (DIAMETER)</td>
                                    <td>6¾</td>
                                    <td>6?</td>
                                    <td>7</td>
                                    <td>7?</td>
                                    <td>7¼</td>
                                    <td>7?</td>
                                    <td>7½</td>
                                    <td>7?</td>
                                    <td>7¾</td>
                                    <td>7?</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>CM (CIRCUMFERENCE)</td>
                                    <td>54</td>
                                    <td>55</td>
                                    <td>56</td>
                                    <td>57</td>
                                    <td>58</td>
                                    <td>59</td>
                                    <td>60</td>
                                    <td>61</td>
                                    <td>62</td>
                                    <td>63</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>BELTS</td>
                                    <td>STANDARD</td>
                                    <td>S</td>
                                    <td>&nbsp;</td>
                                    <td>M</td>
                                    <td>L</td>
                                    <td>XL</td>
                                    <td>XXL</td>
                                    <td>&nbsp;</td>
                                    <td>3XL</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>INCHES</td>
                                    <td>28</td>
                                    <td>30</td>
                                    <td>32</td>
                                    <td>34</td>
                                    <td>36</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>ITALIAN</td>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>6</td>
                                    <td>7</td>
                                    <td>8</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>EUROPEAN</td>
                                    <td>75</td>
                                    <td>80</td>
                                    <td>85</td>
                                    <td>90</td>
                                    <td>95</td>
                                    <td>100</td>
                                    <td>105</td>
                                    <td>110</td>
                                    <td>115</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>ITALIAN ROMAN</td>
                                    <td>0</td>
                                    <td>I</td>
                                    <td>II</td>
                                    <td>III</td>
                                    <td>IV</td>
                                    <td>V</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>SWIM/UNDERWEAR</td>
                                    <td>STANDARD</td>
                                    <td>XXS</td>
                                    <td>XS</td>
                                    <td>S</td>
                                    <td>M</td>
                                    <td>L</td>
                                    <td>XL</td>
                                    <td>XXL</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>SWIM/UNDERWEAR</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>5</td>
                                    <td>6</td>
                                    <td>7</td>
                                    <td>8</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>GLOVES</td>
                                    <td>STANDARD</td>
                                    <td>7.5</td>
                                    <td>8</td>
                                    <td>8.5</td>
                                    <td>9</td>
                                    <td>9.5</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>BRITISH</td>
                                    <td>S</td>
                                    <td>M</td>
                                    <td>L</td>
                                    <td>XL</td>
                                    <td>XXL</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>SOCKS</td>
                                    <td>STANDARD</td>
                                    <td>S-M</td>
                                    <td>M-L</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>EUROPEAN</td>
                                    <td>39-42</td>
                                    <td>43-45</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>HUGO BOSS</td>
                                    <td>5.5</td>
                                    <td>8.5</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
  
                          <!--womens size table below-->
                          <div id="tab-women" class="col-xs-12 sizeTab ${window.location.href.match(/women/g) ? 'activeTab' : ''}"> 
                            <!--Womens Sizes -->
                            <div class="tablediv table-responsive">
                              <table class="table-striped table table-hover">
                                <tbody>
                                  <tr>
                                    <td>CLOTHING</td>
                                    <td>STANDARD</td>
                                    <td>3XS</td>
                                    <td>XXS</td>
                                    <td>XS</td>
                                    <td>S</td>
                                    <td>M</td>
                                    <td>L</td>
                                    <td>XL</td>
                                    <td>XXL</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>BRITISH</td>
                                    <td>4</td>
                                    <td>6</td>
                                    <td>8</td>
                                    <td>10</td>
                                    <td>12</td>
                                    <td>14</td>
                                    <td>16</td>
                                    <td>18</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>ITALIAN</td>
                                    <td>36</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>44</td>
                                    <td>46</td>
                                    <td>48</td>
                                    <td>50</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>FRENCH</td>
                                    <td>32</td>
                                    <td>34</td>
                                    <td>36</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>44</td>
                                    <td>46</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>AMERICAN</td>
                                    <td>0</td>
                                    <td>2</td>
                                    <td>4</td>
                                    <td>6</td>
                                    <td>8</td>
                                    <td>10</td>
                                    <td>12</td>
                                    <td>14</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>DANISH</td>
                                    <td>30</td>
                                    <td>32</td>
                                    <td>34</td>
                                    <td>36</td>
                                    <td>38</td>
                                    <td>40</td>
                                    <td>42</td>
                                    <td>44</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>JAPANESE</td>
                                    <td>3</td>
                                    <td>5</td>
                                    <td>7</td>
                                    <td>9</td>
                                    <td>11</td>
                                    <td>13</td>
                                    <td>15</td>
                                    <td>17</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>ITALIAN ROMAN</td>
                                    <td>&nbsp;</td>
                                    <td>I</td>
                                    <td>II</td>
                                    <td>III</td>
                                    <td>IV</td>
                                    <td>V</td>
                                    <td>VI</td>
                                    <td>VII</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>ROMAN</td>
                                    <td>0.0</td>
                                    <td>0</td>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>6</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>AUSTRALIAN</td>
                                    <td>4</td>
                                    <td>6</td>
                                    <td>8</td>
                                    <td>10</td>
                                    <td>12</td>
                                    <td>14</td>
                                    <td>16</td>
                                    <td>18</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>JEANS</td>
                                    <td>STANDARD</td>
                                    <td>&nbsp;</td>
                                    <td>XXS</td>
                                    <td>&nbsp;</td>
                                    <td>XS</td>
                                    <td>&nbsp;</td>
                                    <td>S</td>
                                    <td>&nbsp;</td>
                                    <td>M</td>
                                    <td>&nbsp;</td>
                                    <td>L</td>
                                    <td>XL</td>
                                    <td>&nbsp;</td>
                                    <td>XXL</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>WAIST (IN)</td>
                                    <td>22</td>
                                    <td>23</td>
                                    <td>24</td>
                                    <td>25</td>
                                    <td>26</td>
                                    <td>27</td>
                                    <td>28</td>
                                    <td>29</td>
                                    <td>30</td>
                                    <td>31</td>
                                    <td>32</td>
                                    <td>33</td>
                                    <td>34</td>
                                    <td>35</td>
                                    <td>36</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>CONTINENTAL</td>
                                    <td>36</td>
                                    <td>&nbsp;</td>
                                    <td>38</td>
                                    <td>&nbsp;</td>
                                    <td>40</td>
                                    <td>&nbsp;</td>
                                    <td>42</td>
                                    <td>&nbsp;</td>
                                    <td>44</td>
                                    <td>&nbsp;</td>
                                    <td>46</td>
                                    <td>&nbsp;</td>
                                    <td>48</td>
                                    <td>&nbsp;</td>
                                    <td>50</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>FOOTWEAR</td>
                                    <td>BRITISH</td>
                                    <td>2</td>
                                    <td>2.5</td>
                                    <td>3</td>
                                    <td>3.5</td>
                                    <td>4</td>
                                    <td>4.5</td>
                                    <td>5</td>
                                    <td>5.5</td>
                                    <td>6</td>
                                    <td>6.5</td>
                                    <td>7</td>
                                    <td>7.5</td>
                                    <td>8</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>ITALIAN</td>
                                    <td>35</td>
                                    <td>35.5</td>
                                    <td>36</td>
                                    <td>36.5</td>
                                    <td>37</td>
                                    <td>37.5</td>
                                    <td>38</td>
                                    <td>38.5</td>
                                    <td>39</td>
                                    <td>39.5</td>
                                    <td>40</td>
                                    <td>40.5</td>
                                    <td>41</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>FRENCH</td>
                                    <td>36</td>
                                    <td>36.5</td>
                                    <td>37</td>
                                    <td>37.5</td>
                                    <td>38</td>
                                    <td>38.5</td>
                                    <td>39</td>
                                    <td>39.5</td>
                                    <td>40</td>
                                    <td>40.5</td>
                                    <td>41</td>
                                    <td>41.5</td>
                                    <td>42</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>AMERICAN</td>
                                    <td>4</td>
                                    <td>4.5</td>
                                    <td>5</td>
                                    <td>5.5</td>
                                    <td>6</td>
                                    <td>6.5</td>
                                    <td>7</td>
                                    <td>7.5</td>
                                    <td>8</td>
                                    <td>8.5</td>
                                    <td>9</td>
                                    <td>9.5</td>
                                    <td>10</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>BELTS</td>
                                    <td>STANDARD</td>
                                    <td>&nbsp;</td>
                                    <td>XS</td>
                                    <td>&nbsp;</td>
                                    <td>S</td>
                                    <td>&nbsp;</td>
                                    <td>M</td>
                                    <td>&nbsp;</td>
                                    <td>L</td>
                                    <td>&nbsp;</td>
                                    <td>XL</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>LENGTH (CM)</td>
                                    <td>65</td>
                                    <td>70</td>
                                    <td>75</td>
                                    <td>80</td>
                                    <td>85</td>
                                    <td>90</td>
                                    <td>95</td>
                                    <td>100</td>
                                    <td>105</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <td>GLOVES</td>
                                    <td>STANDARD</td>
                                    <td>XS</td>
                                    <td>S</td>
                                    <td>&nbsp;</td>
                                    <td>M</td>
                                    <td>&nbsp;</td>
                                    <td>L</td>
                                    <td>XL</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                    <td>BRITISH</td>
                                    <td>6</td>
                                    <td>6.5</td>
                                    <td>7</td>
                                    <td>7.5</td>
                                    <td>8</td>
                                    <td>8.5</td>
                                    <td>9</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
  
                        </div>
                      </div>
                    </div>
                  </div>
                `);
  
  
                // Add close events
                pollerLite(['.FL064-oldSizeGuide .FL064-popup--close'], () => {
                  const addedSg = document.querySelector('.FL064-oldSizeGuide');
                  const addedSgWrap = document.querySelector('.FL064-oldSizeGuide .wrap');
                  
                  if (addedSg) {
    
                    addedSg.addEventListener('click', (e) => {
                      // Close btn
                      const closeBtn = document.querySelector('.FL064-oldSizeGuide .FL064-popup--close');
                      if (e.target.closest('.FL064-popup--close')) {
                        addedSg.parentNode.removeChild(addedSg);
                      }

                      const isClickInside = addedSgWrap.contains(e.target);
                      if (addedSgWrap) {
                        if (!isClickInside) {
                          addedSg.parentNode.removeChild(addedSg);
                        }
                      }
    
                    });
                  }
                });
  
              });
            }
          }
        // }
      }


      // Add observer to popup to watch for product change within.
      setTimeout(() => {
        const thisQuickView = document.querySelector('.FL064-popup');
        if (thisQuickView) {
          observer.connect(thisQuickView, () => {
            // Remove old size buttons and show dropdown as a fall back
            const oldSizeBtns = document.querySelector('.FL064-mobileSizes');
            if (oldSizeBtns) {
              const sizeDropDown = document.querySelector('.FL064-popup .swapSize');
              sizeDropDown.classList.remove('hidden');

              oldSizeBtns.parentNode.removeChild(oldSizeBtns);
            }

            
            addSlideImgZoom();
            swapSizeToBtns();
          }, {
            config: {
              attributes: true,
              childList: false,
              subtree: false,
            }
          })
        }
      }, 1000);

      
    }, {
      config: {
        attributes: false,
        childList: true,
        subtree: false,
      }
    })
  }

  // Add size guide link


};

export default activate;
