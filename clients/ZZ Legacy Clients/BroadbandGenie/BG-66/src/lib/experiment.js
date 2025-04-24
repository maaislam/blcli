/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import shared from './shared';

const { ID, VARIATION } = shared;

const addForm = () => {
	const speedDiv = document.querySelector('.k-hero__text');
	if(speedDiv) {
		speedDiv.insertAdjacentHTML('beforeend', `
			<div class="${ID}-container">
				<h2>Find fibre broadband deals near you</h2>
				<div class="${ID}-formwrap">
					<div class="pc-checker ucx">
						<form method="get" action="/broadband/fibre-optic#order=monthlyCost_asc&provider=7|90|88|33|39|108|32|28|43|101" id="postcode-form" method="get">
							<div class="pc-checker__wrap -check">
							<label for="pc-checker__input" class="xjs--pc-checker-widget__label pc-checker__label xjs--pc-checker__label hide-mobile"><span>Enter </span>your postcode</label>
							<input value="" class="xjs--pc-checker-widget__input pc-checker__input xjs--pc-checker__input" id="pc-checker__input" name="postcode" type="text" required="">
							</div>
							<button type="submit" href="#" class="xjs--pc-checker-widget__submit pc-checker__submit xjs--postcode-submit -check">Check availability</a>
						</form>
					</div>
					<p><a href="#postcode-why2" class="pc-checker__why xucwhy mfp-inline">Why do we need your postcode?</a></p>
					<div class="mfp-hide" id="postcode-why2">
						<p class="mfp-content__title">Why do we need your postcode?</p>
						<p>Once you've entered your postcode, you'll only see deals available to that address. We partner with Thinkbroadband in order to bring you the most accurate information possible (see our <a href="/about/privacy">privacy policy</a> for further details).</p>
					</div>
				</div>
			</div>
		`);
	}
};

/**
 * This code taken from site
 * Modified as we create our own copy of this form.
 */
const formEventsOnsite = () => {
  $(".xjs--pc-checker").submit(function(a) {
    a.preventDefault();
    var b = $(this).attr("action")
      , c = $(this).find(".xjs--pc-checker__input").val();
    b = b.indexOf("#") > -1 ? b + "&postcode=" + c : b + "#postcode=" + c,
    window.location.href = document.location.protocol + "//" + document.location.hostname + b
  }),
  $(".xjs--pc-checker-widget__submit").click(function(a) {
      fireEvent('New Checker Submit');

      a.preventDefault();
      var b = $(this).closest("form")
        , c = b.find(".xjs--pc-checker-widget__input")
        , d = c.val()
        , e = b.attr("action")
        , f = b.find(".xjs--pc-checker-widget__label")
        , g = checkPostCode(d);
      if (g) {
        fireEvent('New Checker Submit Success');

          c.removeClass("-error");
          f.removeClass("-error -valid").html("Finding the best deals...");
          const urlValue = e + "#postcode=" + d; 
          window.location.href = document.location.protocol + "//" + document.location.hostname + urlValue;
          //window.scrollTo(0, 0);
      } else {
        fireEvent('New Checker Submit Error');

          c.addClass("-error");
          f.addClass("-error").html("Invalid postcode");
      }
  }),
  $(".xjs--pc-checker-widget__input").on("change paste keyup keypress", function(a) {
      var b = $(this).siblings(".xjs--pc-checker-widget__label")
        , c = $(this).val()
        , d = checkPostCode(c);
      c.length < 6 ? b.removeClass("-error -valid").html("Enter your postcode") : c.length > 5 && d ? b.removeClass("-error").addClass("-valid").html("Valid postcode") : c.length > 5 && !d && b.removeClass("-valid").addClass("-error").html("Invalid postcode");
      var e = a.keyCode || a.which;
      13 === e && (a.preventDefault(),
      $(this).closest("form").find(".xjs--postcode-submit").click())
  });
  var inputElements = $(".ucx .pc-checker__input");
  inputElements.focus(function() {
      fireEvent('New Checker Input Focus');
      $(this).prev("label").addClass("-focused focused")
  }),
  inputElements.blur(function() {
      var a = $(this).val();
      "" == a ? ($(this).removeClass("-filled filled"),
      $(this).prev("label").removeClass("-focused focused")) : $(this).addClass("-filled filled")
  });
};

/**
 * Entry point for experiment
 */
export default () => {
  setup();

  // Events for on-site input
  const existingInput = document.querySelector('.pc-checker-widget__input');
  if(existingInput) {
    existingInput.addEventListener('focus', () => {
      fireEvent('Existing Checker Input Focus');
    });
  }

  const existingSubmit = document.querySelector('.pc-checker-widget__submit');
  if(existingSubmit) {
    existingSubmit.addEventListener('click', () => {
      fireEvent('Existing Checker Submit');
    });
  }

  const existingWhy = document.querySelector('.magnific-popup.mfp-inline.why-postcode');
  if(existingWhy) {
    existingWhy.addEventListener('click', (e) => {
      if(e.isTrusted) {
        fireEvent('Existing Checker Why');
      }
    });
  }

  if(shared.VARIATION != 'control') {
    addForm();
    formEventsOnsite();
  }

  const why = document.querySelector('.xucwhy');
  if(why) {
    why.addEventListener('click', () => {
      fireEvent('Clicked Why');

      const existing = document.querySelector('.magnific-popup.mfp-inline.why-postcode');
      if(existing) {
        existing.click();
      }
    });
  }

  window.addEventListener('message', (e) => {
    if(e && e.origin && e.origin.match(/speedtest/) && typeof e.data == 'object' && e.data.download) {
      fireEvent('Speed Test Did Finish');
    
      if(VARIATION == 'control') {
        return;
      }

      const why = document.querySelector('.xucwhy');
      if(why) {
        why.addEventListener('click', () => {
          fireEvent('Clicked Why');

          const existing = document.querySelector('.magnific-popup.mfp-inline.why-postcode');
          if(existing) {
            existing.click();
          }
        });
      }

      const speedDiv = document.querySelector('#broadbanduk-speed-test');
      if(speedDiv) {
        speedDiv.scrollIntoView();
      }
    }
  });
};
