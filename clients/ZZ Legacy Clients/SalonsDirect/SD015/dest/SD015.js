var _SD015 = (function($) {

	// Plugins and Helpers

	/* UC Library
	   @version 0.2.2 */
	var UC = UC || {};
	// Poller
	UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	// Observer
	UC=function(a){return a.observer={active:[],connect:function(a,b,c){var d={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(c)for(var e in c)d[e]=c[e];else c=d;for(var f,g=new MutationObserver(function(c){c.forEach(function(c){f||(f=!0,b(a,c),setTimeout(function(){f=!1},d.throttle))})}),h=0;h<a.length;h++)g.observe(a[h],d.config),this.active.push([a[h],g])},disconnect:function(a){for(var c=this.active,d=0;d<a.length;d++)for(var e=a[d],f=0;f<c.length;f++)e===c[f][0]&&c[f][1].disconnect()}},a}(UC||{});

	// Magnific Popup v1.1.0 by Dmitry Semenov
	// http://bit.ly/magnific-popup#build=inline
	(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w=function(a,b){n.ev.on(i+a+j,b)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},z=function(b){if(b!==v||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),v=b;return n.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isLowIE=n.isIE8=document.all&&!document.addEventListener,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=B(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),s=a(document),n.popupsCache={}},open:function(b){var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],u="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=s,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=x("bg").on("click"+j,function(){n.close()}),n.wrap=x("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=x("container",n.wrap)),n.contentContainer=x("content"),n.st.preloader&&(n.preloader=x("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}y("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(w(f,function(a,b,c,d){c.close_replaceWith=z(d.type)}),u+=" mfp-close-btn-in"):n.wrap.append(z())),n.st.alignTop&&(u+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:s.height(),position:"absolute"}),n.st.enableEscapeKey&&s.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(u+=" mfp-auto-cursor"),u&&n.wrap.addClass(u);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),y("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||a(document.body)),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),s.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),y(g),b},close:function(){if(!n.isOpen)return;y(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){y(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}s.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n.st.autoFocusLast&&n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,y(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),y("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;y("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;y("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}t&&t!==b.type&&n.container.removeClass("mfp-"+t+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,y(h,b),t=b.type,n.container.prepend(n.contentContainer),y("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(z()):n.content=a:n.content="",y(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,y("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey||b.altKey||b.shiftKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};y("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?s.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(f,[b,c,d]),a.each(c,function(c,d){if(d===undefined||d===!1)return!0;e=c.split("_");if(e.length>1){var f=b.find(j+"-"+e[0]);if(f.length>0){var g=e[1];g==="replaceWith"?f[0]!==d[0]&&f.replaceWith(d):g==="img"?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(j+"-"+c).html(d)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return A(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(b){A();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var C="inline",D,E,F,G=function(){F&&(E.after(F.addClass(D)).detach(),F=null)};a.magnificPopup.registerModule(C,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){n.types.push(C),w(b+"."+C,function(){G()})},getInline:function(b,c){G();if(b.src){var d=n.st.inline,e=a(b.src);if(e.length){var f=e[0].parentNode;f&&f.tagName&&(E||(D=d.hiddenClass,E=x(D),D="mfp-"+D),F=e.after(E).detach().removeClass(D)),n.updateStatus("ready")}else n.updateStatus("error",d.tNotFound),e=a("<div>");return b.inlineElement=e,e}return n.updateStatus("ready"),n._parseMarkup(c,{},b),c}}});var H,I=function(){return H===undefined&&(H=document.createElement("p").style.MozTransform!==undefined),H};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;w("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,y("ZoomAnimationEnded")},16)},f)},16)}}),w(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),w(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return I()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}}),A()})

	
	// Triggers
	var _triggers = (function() {
		UC.poller([
			function() { return window.jQuery },
			function() { return window.ga },
			'.onestepcheckout-threecolumns',
			'.onestepcheckout-coupons',
			'.commando-img'
		], activate);
	})();

	function activate() {
		// Full Story Integration
		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'SD015',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		var $ = window.jQuery;
		$('body').addClass('SD015');

		// Customer services opening times
		$('.customer-services-number:first').append('<div class="SD015_opening-times">Monday - Thursday 8am - 6pm, Friday 8am - 5pm, Saturday 9am -1pm</div>');
		
		// Trust logo for mobile
		var $trustLogo = $('.commando-img');
		var $mobileTrustLogo = $trustLogo.clone().addClass('SD015_mobile-secure').removeClass('commando-img');
		$('.onestepcheckout-title').after($mobileTrustLogo);

		// Columns
		var $checkout = $('.onestepcheckout-threecolumns'),
			$left = $checkout.children('.onestepcheckout-column-left'),
			$middle = $checkout.children('.onestepcheckout-column-middle'),
			$right = $checkout.children('.onestepcheckout-column-right');

		// Dispatch message
        var now = new Date(),
            cutoff = new Date(),
            cutoffDay = 4,
            days = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', ''],
            day = now.getDay(),
            deliveryDayString,
            dispatchMsg;
 
		cutoff.setUTCHours(16, 0, 0);
        if (day > 0 && day <= 4 && now < cutoff) {
        	dispatchMsg = '<span>✓</span> Your item(s) will be dispatched today';
        } else {
            if (day === 4 && now > cutoff) {
                deliveryDayString = days[1];
            } else if (day === 5) {
                if (now > cutoff) {
                    deliveryDayString = days[2];
                } else {
                    deliveryDayString = days[1];
                }
            } else if (day === 6) {
                deliveryDayString = days[2];
            } else if (day === 0) {
                deliveryDayString = days[2];
            } else if (now > cutoff) {
                deliveryDayString = days[day + 2];
            }
            if (deliveryDayString) {
                dispatchMsg = 'Your item(s) will be with you by ' + deliveryDayString + ' ';
            } else {
                dispatchMsg = 'Your item(s) will be with you very soon ';
            }
        }
		
     	var tooltipMessage = "The Seller's policy is to dispatch goods within 24 hours of receiving an order, however this can vary subject to stock availability. If orders are received and fully completed before 4pm (UK time) between Monday to Thursday, we aim to deliver them the next working day."; 
     	var $deliveryMessage = $('<div class="uc12_deliveryInfo"><h3></h3><div class="uc12_tooltip"><span>i</span><div class="uc12_tooltipmessage">'+tooltipMessage+'</div></div></div>').insertAfter('.onestepcheckout-title');
      
		$deliveryMessage.find('h3').append(dispatchMsg);
      
		$deliveryMessage.find('.uc12_tooltip span').hover(function() {
			$('.uc12_tooltipmessage').toggleClass('active');
      	});

		/**** Left column changes ****/
		$left.prepend('<div class="SD015_col-title">Billing Address</div>');

		// Billing Address
		var $billing = $left.children('#billing_address');
		// Hide invoice
		$billing.find('> ul > li:first').hide();
		// Hide desc
		$billing.find('> ul > li:has(#billing-address-select)').children('label').hide();

		// Delivery Address
		var $delivery = $left.children('#shipping_address');

		// Delivery Updates
		var $deliveryUpdates = $left.children('.form-list');
		// Hide email field
		$deliveryUpdates.children('li:first').hide();
		// Remove special instructions desc
		$deliveryUpdates.find('> li:last > label > span').hide();
		// Remove nbsp
		$left.find('.input-box:has("#shipping\\:entrant_phone")').contents().filter(function() {
        	return this.nodeType === 3; 
		}).remove();

		/**** Middle column changes ****/
		$middle.prepend('<div class="SD015_col-title">Review Order</div>');
		
		// Delivery Methods
		var $deliveryMethods = $middle.find('.onestepcheckout-shipping-method-block');
		// Hide delivery methods title
		$deliveryMethods.find('> .shipment-methods > dd').hide();
		// Move to left col
		$deliveryMethods.appendTo('.onestepcheckout-column-left');

		// Voucher box
		var $voucher = $middle.children('.onestepcheckout-coupons'),
			$voucherField = $voucher.children('.field-wrapper-coupon'),
			$voucherToggle = $('<div class="SD015_voucher-toggle">Apply Voucher Code</div>');
		
		$voucherToggle.on('click', function() {
			$voucherField.slideToggle();
		});
		$voucher
			.insertAfter($middle.children('.onestepcheckout-summary'))
			.prepend($voucherToggle);
		$voucherField.hide();
		
		/**** Right column changes ****/
		$right.prepend('<div class="SD015_col-title">Payment Method</div>');
		// Delivery message
		$right.find('#finalstep').after('<div class="SD015_final-del-msg">' + dispatchMsg + '</div>');

		/* The changes below are undone when the cart is updated (such as 
		   changing delivery address, applying voucher, changing delivery 
		   method). We will watch cart updates with a mutationObserver
		   and modify the elements again when needed */

		var $paymentMethods;

		var paymentChanges = function() {
			// Payment methods
			// Update variable with latest payment methods div
			$paymentMethods = $right.find('.payment-methods');
			// Change text
			$paymentMethods
				.find('label[for="p_method_sagepaydirectpro"]')
				.text('Credit/Debit Card');
			// Hide nbsp div if it's empty
			var $paymentNbsp = $paymentMethods.find('#tokencards-payment-sagepaydirectpro');
			if ($paymentNbsp.html() === '&nbsp;') {
				$paymentNbsp.hide();
			}
		};

		paymentChanges(); // Make initial payment changes

		// Connect mutationObserver to right column and watch for childList changes
		UC.observer.connect($right, function() {
			/* Check if the payment div changed.
			   If it did, run paymentChanges again */
			if ($right.find('.payment-methods') !== $paymentMethods) {
				paymentChanges();
			}
		}, {
			config: { childList: true, attributes: false, subtree: false }
		})

		// New title for mobile
		$mobileTrustLogo.before('<h1 class="SD015_mobile-title">Checkout</h1>');

		// Auto-check deliver to same address
		var $checkbox = $left.find('#billing\\:use_for_shipping_yes');
		if (!$checkbox[0].checked) {
			$checkbox.trigger('click');
		}

		/* Show popup when logo is clicked
		   options are to go to basket, go to homepage or stay on checkout */
		var $popup = $([
			'<div class="SD015_popup">',
				'What would you like to do?',
				'<div class="SD015_popup-opts">',
					'<a href="/checkout/cart/" class="SD015_popup-opt">Go to Basket</a>',
					'<a href="http://www.salonsdirect.com" class="SD015_popup-opt">Continue Shopping</a>',
				'</div>',
				'<div class="SD015_popup-close">Stay here</div>',
			'</div>'
		].join(''));
		$popup.find('.SD015_popup-close').on('click', function() {
			$('.mfp-close').trigger('click');
		});

		var $logo = $('a.logo');
		$logo.on('click', function(e) {
			e.preventDefault();
			// Trigger popup
			$.magnificPopup.open({
				items: { src: $popup, type: 'inline' }
			});
		});

	}

})(jQuery);