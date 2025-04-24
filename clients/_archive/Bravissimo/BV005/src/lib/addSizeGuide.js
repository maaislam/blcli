import attachEvents from './attachEvents';

const addSizeGuide = () => {
  // If already has been built, just show.
  if (document.querySelector('.BV005-sizeGuide')) {
    // Show it
    const sizeGuide = document.querySelector('.BV005-sizeGuide');
    sizeGuide.classList.add('BV005-showGuide');
    document.body.classList.add('BV005-noScroll');
  } else {
    // Build it
    document.body.classList.add('BV005-noScroll');
    const appRef = document.querySelector('#app .c-page');
    appRef.insertAdjacentHTML('beforeend', `
      <div class="BV005-sizeGuide BV005-showGuide">
        <div class="BV005-sizeGuide--wrap">

        <button class="BV005-close c-action" aria-controls="navigation"><span class="c-icon c-icon--dismiss--large c-icon--label-after"><svg class="c-icon__glyph" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 240 240" role="img"><g transform="rotate(45, 120, 120)"><rect x="-20" y="110" width="280" height="24" rx="12"></rect><rect x="110" y="-20" width="24" height="280" rx="12"></rect></g></svg><span class="c-icon__label"><span>Close</span></span></span></button>

          <h3>Back Size Conversions</h3>

          <table class="BV005-topTable">
            <tr>
              <th>
                UK
              </th>
              <th>
                USA | CANADA
              </th>
              <th>
                GERMANY | SPAIN | ITALY
              </th>
              <th>
                FRANCE
              </th>
            </tr>
            <tr>
              <td>28</td>
              <td>28</td>
              <td>60</td>
              <td>75</td>
            </tr>
            <tr>
              <td>30</td>
              <td>30</td>
              <td>65</td>
              <td>80</td>
            </tr>
            <tr>
              <td>32</td>
              <td>32</td>
              <td>70</td>
              <td>85</td>
            </tr>
            <tr>
              <td>34</td>
              <td>34</td>
              <td>75</td>
              <td>90</td>
            </tr>
            <tr>
              <td>36</td>
              <td>36</td>
              <td>80</td>
              <td>95</td>
            </tr>
            <tr>
              <td>38</td>
              <td>38</td>
              <td>85</td>
              <td>100</td>
            </tr>
            <tr>
              <td>40</td>
              <td>40</td>
              <td>90</td>
              <td>105</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </table>

          <h3>Matching Bottoms Conversions</h3>

          <table class="BV005-bottomTable">
            <tr>
              <th>BOTTOM CONVERSION</th>
              <th>UK</th>
              <th>USA | CANADA</th>
              <th>FRANCE | SPAIN</th>
              <th>GERMANY</th>
              <th>ITALY</th>
            </tr>

            <tr>
              <td>XS</td>
              <td>8</td>
              <td>4</td>
              <td>36</td>
              <td>34</td>
              <td>40</td>
            </tr>
            <tr>
              <td>S</td>
              <td>10</td>
              <td>6</td>
              <td>38</td>
              <td>36</td>
              <td>42</td>
            </tr>
            <tr>
              <td>M</td>
              <td>12</td>
              <td>8</td>
              <td>40</td>
              <td>38</td>
              <td>44</td>
            </tr>
            <tr>
              <td>L</td>
              <td>14</td>
              <td>10</td>
              <td>42</td>
              <td>40</td>
              <td>46</td>
            </tr>
            <tr>
              <td>XL</td>
              <td>16</td>
              <td>12</td>
              <td>44</td>
              <td>42</td>
              <td>48</td>
            </tr>
            <tr>
              <td>2XL</td>
              <td>18</td>
              <td>14</td>
              <td>46</td>
              <td>44</td>
              <td>50</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </table>

          <h3>CUP SIZE CONVERSION</h3>

          <div class="BV005-cupInfo">
            <p>When it comes to cup sizes, things aren’t quite so simple. In most countries, shops sell bras in a variety of cup sizing systems and because we don’t know which of these you may be wearing we can’t give you a simple chart to help you work this out (much as we would love to be able to – believe us!). But don’t worry, we’re here to help!</p>

            <p>The quickest, easiest way for us to help you work out which Bravissimo size to order is on the phone or via live chat so please give us a call on 01926 459 859 or start a live chat. All we’ll need to do is ask you a few questions about the brand of bra, and size, that you are currently wearing. We can also help you over email but there may be a bit of to-ing and fro-ing while we ask you the things we need to know to help you so it can take a bit longer that way.</p>
          </div>

          <button class="BV005-learnMore c-button c-button--large c-button--disabled"><a href="https://www.bravissimo.com/international-size-guide/">LEARN MORE</a></button>
        </div>
      </div>
    `);
    // Then show it
  }

  // Attach the close event
  attachEvents();
};

export default addSizeGuide;
