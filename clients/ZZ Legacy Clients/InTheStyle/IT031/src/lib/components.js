export const createPopup = ($, options) => {
  const $element = $(`<div class="${options.classList}" style="display: none;">${options.html}</div>`);
  const isVisible = () => $element.css('display') !== 'none';
  const open = () => $element.fadeIn();
  const close = () => $element.fadeOut();

  if (options.closeOnClick) {
    $element.on('click', () => isVisible() ? close() : false);
  }

  return {
    $element,
    isVisible,
    open,
    close,
  };
};

export const createMiniSizeGuide = ($, options, data) => {
  const measurements = ['waist', 'hips', 'bust'];

  // Build element
  const $element = $('<div class="IT031_MiniSizeGuide"><p>The measurements for this size:</p><ul class="IT031_MiniSizeGuide__Measurements"></ul></div>');
  const $measurements = $element.find('.IT031_MiniSizeGuide__Measurements');
  
  // Create list of measurements
  for (let i = 0; i < measurements.length; i++) {
    const measurement = measurements[i];
    const $li = $(`
      <li data-type="${measurement}">
        <div class="IT031_MiniSizeGuide__IconWrap">
          <span class="IT031_MiniSizeGuide__Title">${measurement}</span>
          <div class="IT031_MiniSizeGuide__Icon IT031_MiniSizeGuide__Icon--${measurement}"></div>
        </div>
        <div class="IT031_MiniSizeGuide__Values">
        </div>
      </li>
    `);
    $measurements.append($li);
  }

  // Method to update just the measurements when the size is changed
  const update = (newSize) => {
    const sizeData = data[newSize];
    if (!sizeData) {
      // No size data availible for this size
      $element.hide();
    } else {
      $element.show();
      $measurements.children().each(function() {
        const $el = $(this);
        const type = $el.data('type');
        const typeData = sizeData[type];
        $el.find('.IT031_MiniSizeGuide__Values').html(`
          <div>
            <em>${typeData.inch}</em> <span>(in)</span>
          </div>
          <div>
            <em>${typeData.cm}</em> <span>(cm)</span>
          </div>
        `);
      });
    }
  };
  update(options.size);

  return {
    $element,
    update
  };
};

export const createReviews = ($, reviews) => {
  var $element = $('<div><ul class="IT031_Reviews"></ul></div>');
  var $reviews = $element.find('.IT031_Reviews');

  for (let i = 0; i < reviews.length; i++) {
    let review = reviews[i];

    $reviews.append(`
      <li class="IT031_Review">
        <a target="_blank" href="${review.link}">
          <div class="IT031_Review__Rating IT031_Review__Rating--${review.rating}"></div>
          <div class="IT031_Review__Author">${review.author}</div>
          <p class="IT031_Review__Content">${review.content}</p>
        </a>
      </li>
    `);
  }
  
  return $element;
};
