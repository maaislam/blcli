import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
// import copy from './lib/clipboard';

/**
 * {{NH026}} - {{Share Results}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH026',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    events.setTrackerName('tracker2');
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    // Append the share popup
    services.sharePopup();
    // Append share link
    services.appendShare();
    // Append Link on click
    poller([
      'a.nh26-share',
    ], services.appendLink);
    // Copy functionality
    services.copyLink();
    // control popup
    services.closePopup();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    appendShare: function appendShare() {
      const items = document.querySelectorAll('.main-content .search-content .two-columns .right .result-item');
      for (let i = 0; items.length > i; i += 1) {
        const link = items[i].querySelector('.buttons a.btn-more-info').getAttribute('href');
        const shareHTMl = `
          <div class="nh26-share-link">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABU1BMVEUAAAAWitMXjNAWjdAWjs8Vis8YjM8WjdAWjdAVjs8Wjc8WjdAWjdAXi9EWjdAXi9EcjsYXjdEWjNAA//8akcwXjNEWjdAUjdAWjc8Wjc4UkNEYi88XjdAWjNEPh9IggN8VjdAWjdAWjdAXjtEamcwkktsVjs8WjdAWjtArgNUVjdAZj80WjM8WjdEVjNAYks4WjdAXjdAWjdAWjdAWjs8WjdAXjs8Ujs4XjdAWjdAWjc8SidEXjdEVjNAWjdAXjdEVjc8YjdAWjtAWjtAWjdAVjdAVjdAVjdAWjdEVjNEVjtEWjM8Xi9EVjNIXjdEVjNAWjdEWjdAVjtEVjdAWjdAWjdAXjNAWjdAVjc8YjtAWjdAVjNAYj88WjdEXj84AqqoWjdAWjdAWjdAXi9EWjc8UidgWjdEVjdAWjs8WjdAWjdAWj88Xj9IWjdAWjdAWjdAAAACm8896AAAAb3RSTlMAI6nlqyU19fCQi+32N9ILCcvYAR5kXCY6LydAkooRCHf88mMKB1/vmQYxKVvhgxWk7uuuavRaP8z+oRw4eH1Da0FGrf3KvqiwVD1FLD6qsmmvSLPCxWbnVTbEpyB/RAPd+IkWsQ10nNHZ9zsi5KzIdQmxAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB+IEChIBEBZrALYAAAECSURBVCjPY2BAA4xMzMwsrAwYgI2dg5OLm4cXQ4KPj5+BQUBQSBhNXCRfFESJ5YujSUjkS4IoqXxpNAnWfBkQJZsvhyIsr8ChqKSsoqqmrgHma2ppg+wS1tHl0dM3yDc0yjfmB4mbmObnc5sxmFtYWlkDuTa2dvZg9Q6KTI5Ozi6u+W5aKOaqmrqDKI98T3Sv5nuBKO98HwwJXxDlhCGhqeQHovzzddBDJ8Al0D4o2CXEMhQ95MI48vPDIxgioyyjY0DOVYiNg8rES0qB6YiExKRkK5AHU1LR7EuDBUk6uoU4AhFPsOOMKIYMSNRmokctg5YpKDFkZTNggBym3PA8oPMBa+4sEdDzX9wAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDQtMTBUMTg6MDE6MTYrMDI6MDCASRtkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA0LTEwVDE4OjAxOjE2KzAyOjAw8RSj2AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=">
            <a class="nh26-share" href="${link}">Share itinerary</a>
          </div>
        `;
        const ref = items[i].querySelector('.buttons a.btn-book-now');
        ref.insertAdjacentHTML('afterend', shareHTMl);
      }
    },
    sharePopup: function sharePopup() {
      const html = `
        <div class="nh26-share--popup">
          <div class="nh26-popup--wrap">
            <div class="nh26-popup--container">
              <div class="nh26-close">
                <span></span>
                <span></span>
              </div>
              <h2>Share URL</h2>
              <div class="nh26-wrap">
                <input id="valueToCopy" contenteditable="true" readonly="false" type="text" value="">
                <button data-clipboard-target="#valueToCopy" class="copy">Copy</button>
                <a href="" id="nh26-email">Email Link</a>
              </div>
              <div>
                <a href="#" id="nh26-close-link">Close</a>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', html);
      /*
      * Work out absolute position fix for issue
      * with IOS highlighting the wrong area (Known IOS issue)
      */
      function dw_getScrollOffsets() {
        var doc = document, w = window;
        var x, y, docEl;
        
        if ( typeof w.pageYOffset === 'number' ) {
          x = w.pageXOffset;
          y = w.pageYOffset;
        } else {
          docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat')?
          doc.documentElement: doc.body;
          x = docEl.scrollLeft;
          y = docEl.scrollTop;
        }
        return {x:x, y:y};
      }
      const scrollFunc = () => {
        window.addEventListener('scroll', () => {
          const topOffset = dw_getScrollOffsets();
          const el = document.querySelector('.nh26-share--popup');
          el.style.top = (topOffset.y + window.innerHeight / 2) + 'px';
        });
      };
      scrollFunc();

    },
    appendLink: function appendLink() {
      const links = document.querySelectorAll('.main-content .search-content .two-columns .right .result-item .buttons a.nh26-share');
      const linkInput = document.querySelector('.nh26-share--popup .nh26-popup--container input');
      const popup = document.querySelector('.nh26-share--popup');
      const copyBtn = document.querySelector('.nh26-share--popup .nh26-wrap button.copy');
      // Share link event
      const shareLinksEvent = () => {
        events.send('NH026', 'Click', 'User clicked the share itinerary link', { sendOnce: true });
      };
      for (let i = 0; links.length > i; i += 1) {
        const link = links[i];
        link.addEventListener('click', (e) => {
          e.preventDefault();
          shareLinksEvent();
          const linkUrl = link.getAttribute('href');
          if (linkInput) {
            linkInput.value = `${linkUrl}&utm_source=NH026`;
          }
          // Reset copied to copy
          copyBtn.classList.remove('nh26-copied');
          copyBtn.textContent = 'Copy';
          // Add href to link
          const emailBtn = document.querySelector('.nh26-share--popup #nh26-email');
          const emailHref = `mailto:?subject=Our%20National%20Holidays%20Itinerary&body=Check%20out%20this%20great%20deal%20on%20NationalHolidays;%0A%0A${linkUrl}`;
          emailBtn.setAttribute('href', emailHref);
          popup.classList.add('nh26-show--popup');
        });
      }
    },
    copyLink: function copyLink() {
      const copyBtn = document.querySelector('.nh26-share--popup .nh26-wrap button');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          // Send event
          events.send('NH026', 'Click', 'User clicked the copy button', { sendOnce: true });
          // const input = document.querySelector('.nh26-share--popup .nh26-wrap input');
          /*
          * Orginal method of copying the text however this method does
          * not work in Ios10 and below.
          */
          //if (input) {
            //input.select();
            //--------------------------
            // Fix for copying on IOS
            //--------------------------
            // const range = document.createRange();
            // range.selectNode(input);
            // window.getSelection().addRange(range);

            // try {
            //   const success = document.execCommand('Copy');
            //   const msg = success ? 'success' : 'fail';
            //   copyBtn.classList.add('nh26-copied');
            //   copyBtn.textContent = 'Copied';
            //   console.log(msg);
            // } catch (err) {
            //   console.log('Cannot copy');
            // }
          //}
          /*
          * Using copy JS plugin below.
          */
          Experiment.components.select_all_and_copy(document.querySelector('.nh26-share--popup .nh26-wrap input'));
        });
      }
      // Email link events
      const emailBtn = document.querySelector('.nh26-share--popup .nh26-wrap a#nh26-email');
      if (emailBtn) {
        emailBtn.addEventListener('click', () => {
          events.send('NH026', 'Click', 'User cliked the email link button', { sendOnce: true });
        });
      }
    },
    closePopup: function closePopup() {
      const btn = document.querySelector('.nh26-share--popup .nh26-close');
      const popup = document.querySelector('.nh26-share--popup');
      const closeLink = document.querySelector('.nh26-share--popup #nh26-close-link');
      if (btn) {
        btn.addEventListener('click', () => {
          popup.classList.remove('nh26-show--popup');
        });
      }
      if (closeLink) {
        closeLink.addEventListener('click', (e) => {
          e.preventDefault();
          popup.classList.remove('nh26-show--popup');
        });
      }
      // Escape key
      /* eslint-disable */
      document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
          popup.classList.remove('nh26-show--popup');
        }
      };
      /* eslint-enable */
    },
  },

  components: {
    tooltip: function tooltip(el, message)
    {
      var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      var x = parseInt(el.getBoundingClientRect().left) + scrollLeft + 10;
      var y = parseInt(el.getBoundingClientRect().top) + scrollTop + 10;
      if (!document.getElementById("copy_tooltip"))
      {
        var tooltip = document.createElement('div');
        tooltip.id = "copy_tooltip";
        tooltip.style.position = "absolute";
        // tooltip.style.border = "1px solid black";
        tooltip.style.borderRadius = '4px';
        tooltip.style.background = "#ef8526";
        tooltip.style.color = '#ffffff';
        tooltip.style.fontFamily = '"vag_roundedbold",Arial';
        tooltip.style.fontSize = '14px';
        tooltip.style.padding = '8px 12px';
        tooltip.style.boxShadow = '1px 3px 1px #D3DDDE';
        tooltip.style.opacity = 1;
        tooltip.style.transition = "opacity 0.3s";
        tooltip.style.zIndex = "1999999999"; // Version 1.2b
        document.body.appendChild(tooltip);
      }
      else
      {
        var tooltip = document.getElementById("copy_tooltip")
      }
      tooltip.style.opacity = 1;
      tooltip.style.display = "block"; // Version 1.2b
      tooltip.style.left = x + "px";
      tooltip.style.top = y + "px";
      tooltip.innerHTML = message;
      setTimeout(function() { tooltip.style.display = "none"; tooltip.style.opacity = 0; }, 2000);
    },

    paste: function paste(el) 
    {
        if (window.clipboardData) { 
          // IE
          el.value = window.clipboardData.getData('Text');
          el.innerHTML = window.clipboardData.getData('Text');
        }
        else if (window.getSelection && document.createRange) {
            // non-IE
            if (el.tagName.match(/textarea|input/i) && el.value.length < 1)
              el.value = " "; // iOS needs element not to be empty to select it and pop up 'paste' button
            else if (el.innerHTML.length < 1)
              el.innerHTML = "&nbsp;"; // iOS needs element not to be empty to select it and pop up 'paste' button
            var editable = el.contentEditable; // Record contentEditable status of element
            var readOnly = el.readOnly; // Record readOnly status of element
            el.contentEditable = true; // iOS will only select text on non-form elements if contentEditable = true;
            el.readOnly = false; // iOS will not select in a read only form element
            var range = document.createRange();
            range.selectNodeContents(el);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range); 
            if (el.nodeName == "TEXTAREA" || el.nodeName == "INPUT") 
              el.select(); // Firefox will only select a form element with select()
            if (el.setSelectionRange && navigator.userAgent.match(/ipad|ipod|iphone/i))
              el.setSelectionRange(0, 999999); // iOS only selects "form" elements with SelectionRange
            if (document.queryCommandSupported("paste")) 
            {  
          var successful = document.execCommand('Paste');  
            if (successful) Experiment.components.tooltip(el, "Pasted.");
            else 
          {
            if (navigator.userAgent.match(/android/i) && navigator.userAgent.match(/chrome/i))
            {
              Experiment.components.tooltip(el, "Click blue tab then click Paste");
            
                if (el.tagName.match(/textarea|input/i))
                {
                      el.value = " "; el.focus();
                      el.setSelectionRange(0, 0); 
                    }
                    else 
                      el.innerHTML = "";
        
            }
            else	
              Experiment.components.tooltip(el, "Press CTRL-V to paste");
          }   
        } 
        else 
        {  
            if (!navigator.userAgent.match(/ipad|ipod|iphone|android|silk/i))
            Experiment.components.tooltip(el, "Press CTRL-V to paste"); 
        } 
        el.contentEditable = editable; // Restore previous contentEditable status
            el.readOnly = readOnly; // Restore previous readOnly status
        }
    },

    select_all_and_copy: function select_all_and_copy(el) 
    {
        // Copy textarea, pre, div, etc.
      if (document.body.createTextRange) {
            // IE 
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.select();
            textRange.execCommand("Copy");   
        Experiment.components.tooltip(el, "Copied!");  
        }
      else if (window.getSelection && document.createRange) {
            // non-IE
            var editable = el.contentEditable; // Record contentEditable status of element
            var readOnly = el.readOnly; // Record readOnly status of element
            el.contentEditable = true; // iOS will only select text on non-form elements if contentEditable = true;
            el.readOnly = false; // iOS will not select in a read only form element
            var range = document.createRange();
            range.selectNodeContents(el);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range); // Does not work for Firefox if a textarea or input
            if (el.nodeName == "TEXTAREA" || el.nodeName == "INPUT") 
              el.select(); // Firefox will only select a form element with select()
            if (el.setSelectionRange && navigator.userAgent.match(/ipad|ipod|iphone/i))
              el.setSelectionRange(0, 999999); // iOS only selects "form" elements with SelectionRange
            el.contentEditable = editable; // Restore previous contentEditable status
            el.readOnly = readOnly; // Restore previous readOnly status 
          if (document.queryCommandSupported("copy"))
          {
          var successful = document.execCommand('copy');  
            if (successful) Experiment.components.tooltip(el, "Copied to clipboard.");
            else Experiment.components.tooltip(el, "Press CTRL+C to copy");
        }
        else
        {
          if (!navigator.userAgent.match(/ipad|ipod|iphone|android|silk/i))
            Experiment.components.tooltip(el, "Press CTRL+C to copy");	
        }
        }
    }, // end function select_all_and_copy(el) 

    make_copy_button: function make_copy_button(el)
    {
      //var copy_btn = document.createElement('button');
      //copy_btn.type = "button";
      var copy_btn = document.createElement('span');
      copy_btn.style.border = "1px solid black";
      copy_btn.style.padding = "5px";
      copy_btn.style.cursor = "pointer";
      copy_btn.style.display = "inline-block";
      copy_btn.style.background = "lightgrey";
      copy_btn.setAttribute("role", "button");
      copy_btn.setAttribute("tabindex", 0);
      
      el.parentNode.insertBefore(copy_btn, el.nextSibling);
      copy_btn.onclick = function() { Experiment.components.select_all_and_copy(el); };
      
      //if (document.queryCommandSupported("copy") || parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]) >= 42)
      // Above caused: TypeError: 'null' is not an object (evaluating 'navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]') in Safari
      if (document.queryCommandSupported("copy"))
      {
        // Desktop: Copy works with IE 4+, Chrome 42+, Firefox 41+, Opera 29+
        // Mobile: Copy works with Chrome for Android 42+, Firefox Mobile 41+	
        //copy_btn.value = "Copy to Clipboard";
        copy_btn.innerHTML = "Copy to Clipboard";
      }	
      else
      {
        // Select only for Safari and older Chrome, Firefox and Opera
        /* Mobile:
            Android Browser: Selects all and pops up "Copy" button
            iOS Safari: Selects all and pops up "Copy" button
            iOS Chrome: Form elements: Selects all and pops up "Copy" button 
        */
        //copy_btn.value = "Select All";
        copy_btn.innerHTML = "Select All";
            
      }
    },
  },
};

export default Experiment;
