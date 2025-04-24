var _IT002 = (function($) {

	// PLUGINS & HELPERS
	// UC Library - Poller -- @version 0.2.2
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	UC.group=function(r,n){for(var u=[],e=0;e<r.length;e+=n)u.push(r.slice(e,e+n));return u};

	// Changes the value of a select box
	function setSelectedIndex(s, i) {
		s.options[i].selected = true;
		return;
	}

	// Magnific Popup v1.1.0 (only init when $ = window.jQuery)
	function initMagnificPopup() {
		(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w=function(a,b){n.ev.on(i+a+j,b)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},z=function(b){if(b!==v||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),v=b;return n.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isLowIE=n.isIE8=document.all&&!document.addEventListener,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=B(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),s=a(document),n.popupsCache={}},open:function(b){var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],u="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=s,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=x("bg").on("click"+j,function(){n.close()}),n.wrap=x("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=x("container",n.wrap)),n.contentContainer=x("content"),n.st.preloader&&(n.preloader=x("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}y("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(w(f,function(a,b,c,d){c.close_replaceWith=z(d.type)}),u+=" mfp-close-btn-in"):n.wrap.append(z())),n.st.alignTop&&(u+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:s.height(),position:"absolute"}),n.st.enableEscapeKey&&s.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(u+=" mfp-auto-cursor"),u&&n.wrap.addClass(u);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),y("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||a(document.body)),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),s.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),y(g),b},close:function(){if(!n.isOpen)return;y(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){y(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}s.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n.st.autoFocusLast&&n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,y(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),y("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;y("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;y("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}t&&t!==b.type&&n.container.removeClass("mfp-"+t+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,y(h,b),t=b.type,n.container.prepend(n.contentContainer),y("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(z()):n.content=a:n.content="",y(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,y("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey||b.altKey||b.shiftKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};y("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?s.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(f,[b,c,d]),a.each(c,function(c,d){if(d===undefined||d===!1)return!0;e=c.split("_");if(e.length>1){var f=b.find(j+"-"+e[0]);if(f.length>0){var g=e[1];g==="replaceWith"?f[0]!==d[0]&&f.replaceWith(d):g==="img"?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(j+"-"+c).html(d)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return A(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(b){A();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var C="inline",D,E,F,G=function(){F&&(E.after(F.addClass(D)).detach(),F=null)};a.magnificPopup.registerModule(C,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){n.types.push(C),w(b+"."+C,function(){G()})},getInline:function(b,c){G();if(b.src){var d=n.st.inline,e=a(b.src);if(e.length){var f=e[0].parentNode;f&&f.tagName&&(E||(D=d.hiddenClass,E=x(D),D="mfp-"+D),F=e.after(E).detach().removeClass(D)),n.updateStatus("ready")}else n.updateStatus("error",d.tNotFound),e=a("<div>");return b.inlineElement=e,e}return n.updateStatus("ready"),n._parseMarkup(c,{},b),c}}});var H,I=function(){return H===undefined&&(H=document.createElement("p").style.MozTransform!==undefined),H};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;w("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,y("ZoomAnimationEnded")},16)},f)},16)}}),w(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),w(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return I()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}}),A()})
	}

	var _triggers = (function() {
        UC.poller([
            function() { return window.jQuery },
            function() { return window.ga },
            '.btn-continue span',
            '.page-title',
            '#shopping-cart-table .link-remove',
            '.input-text.qty',
            '.product-name > a',
            '.product-image > img',
            '.cart-price > .price',
            '.item-options > dt',
            '.button.btn-update',
            '#shopping-cart-totals-table tr',
            '#discount-coupon-form'
        ], activate);
	})();
	
	function activate() {
		var $ = window.jQuery; 
		initMagnificPopup();

		// Full Story Integration
		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'IT002',
				variation_str: 'Variation 1 Mobile'
			});
		}, { multiplier: 1.2, timeout: 0 });

		$('body').addClass('IT002');

		// Move continue shopping button to top
		$('.btn-continue').insertBefore('.page-title').find('> span > span').text('< Continue Shopping');
			
		// Recreate each product row
		var $cart = $('#shopping-cart-table');
		var $newProductTable = $('<div class="IT002_products"></div>');

		// Helpers
		String.prototype.toProperCase = function () {
			return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		};

		$cart.children('tbody').children().each(function() {
			// components
			var $el = $(this);
			var $remove = $el.find('.link-remove');
			var $qty = $el.find('.input-text.qty');
			var link = $el.find('.product-name > a').attr('href');
			var productName = $el.find('.product-name > a').text().trim().toProperCase();
			var productImg = $el.find('.product-image > img').attr('src');
			var productPrice = $el.find('.cart-price:first > .price').text().trim();
			var productSize = $el.find('.item-options > dt:contains("Size")').next('dd').text().trim().toProperCase();
			var updateCart = function() {
				$cart.find('.button.btn-update').trigger('click');
			};
			var ajaxSuccess;
			var $loader = $('#bubble-layer-overlay');

			var $newRow = $([
				'<div class="IT002_prod">',
					'<div class="IT002_prod__left">',
						'<div class="IT002_prod__img">',
							'<a href="' + link + '">',
								'<img src="' + productImg + '" />',
							'</a>',
						'</div>',
					'</div>',
					'<div class="IT002_prod__right">',
						'<div class="IT002_prod__title">',
							'<a href="' + link + '">',
								'<h2>' + productName + '</h2>',
							'</a>',
						'</div>',
						'<div class="IT002_prod__price">' + productPrice + '</div>',
						'<div class="IT002_prod__size">Size: ' + productSize + '</div>',
						'<div class="IT002_btn IT002_change-size-btn">Change size</div>',
						'<select class="IT002_prod__size--change"><option selected="selected">Change size</option></select>',
						'<div class="IT002_prod__qty">',
							'<div class="IT002_prod__qty-label">QTY: </div>',
							'<input class="input-text qty" maxlength="12" type="number">',
							'<div class="IT002_prod__qty-update">Update</div>',
						'</div>',
						'<i class="IT002_prod__remove fa fa-close"></i>',
					'</div>',
				'</div>'
			].join(''));

			// Recreate functionality
			// remove
			$newRow.find('.IT002_prod__remove').on('click mousedown touchstart', function() {
				$remove.find('i').trigger('click');
			});

			// quantity
			var quantityEvents = (function() {
				var $newQty = $newRow.find('.IT002_prod__qty');
				var $input = $newQty.children('input');
				var $update = $newQty.children('.IT002_prod__qty-update');
				
				// set initial value
				$input.val($qty.val());

				$update.hide();
				$input.on('click', function() {
					$update.show();
				});

				$update.on('click', function() {
					var newVal = $input.val();
					$qty.val(newVal);
					updateCart();
				});
			})();

			// size change

			// Add a new size product to cart and remove the old one
			var addToCartAjax = function(data, sizeData) {
				var $data = $(data);
				var $form = $data.find('#product_addtocart_form');
				var url = $form.attr('action');
				var data = $form.serialize();
				data += '&isAjax=1';

				
				// Find size attribute part of serialised data and change it to size ID
				var dataSizeInfo = data.match(/(&super_attribute%5B150%5D=[\w\+-\.]+)(&)/)[1];
				data = data.replace(dataSizeInfo, '&super_attribute%5B150%5D='+sizeData);
				
				// Update quantity
				var dataQtyInfo = data.match(/(&qty=[\d]+)(&)/)[1];
				var qty = parseInt($qty.val());
				if (typeof qty === 'number') {
					data = data.replace(dataQtyInfo, '&qty='+qty);
				}

				$.ajax({
					url: 'https://www.inthestyle.com/wt_ajaxcart/index/index/',
					type : 'post',
					data: data,
					success: function(data) {
						window.ga('send', 'event', 'IT002', 'change', 'user changed size', {nonInteraction: true});
						// Remove old product and trigger refresh
						$remove.find('i').trigger('click');
					},
					error: function() {
						window.ga('send', 'event', 'IT002', 'change', 'error changing size', {nonInteraction: true});
						$el.replaceWith('<div style="color: red; display: inline-block; font-size: 11px; position: relative; top: -1px;">Failed to load sizes</div>');
						ajaxSuccess = true;
					}
				});
			};


			// Retrieve sizes and form data
			var getSizes = function(productUrl) {
				var $el = $newRow.find('.IT002_prod__size--change');
				
				// Show AJAX loader
				$loader.show();
				setTimeout(function() {
					$loader.hide();
				}, 7000);

				$.ajax({
					url: productUrl,
					type: 'GET',
					dataType: 'html',
					success: function(data) {
						// Hide AJAX loader
						$loader.hide();
						ajaxSuccess = true;

						var $data = $(data);

						// 1. Extract available sizes and stock levels from script tag
						var productJSON = (function() {
							var script = $data.find('#product-options-wrapper script');
							var JSONStr = script.html().match(/(spConfig = new Product.Config\()(.+)(\))/)[2];
							var productJSON = JSONStr ? JSON.parse(JSONStr) : false;

							return productJSON;
						})();

						var stockJSON = (function() {
							var script = $data.find('.col-main > script').text();
							var JSONStr = script.match(/(switcherConfig = )({.+})/)[2];
							var stockJSON = JSONStr ? JSON.parse(JSONStr).stock : false;

							return stockJSON;
						})();

						// If it failed to extract the JSON, show error message to user
						if (!productJSON) {
							return false;
						} else {
							var sizesArr = productJSON.attributes[150].options;
							$.each(sizesArr, function() {
								var sizeLabel = this.label;
								var sizeId = this.id;
								var variationId = this.products[0];

								if (sizeLabel && sizeId) {
									var $li = $('<option data-size-id="' + sizeId + '">' + sizeLabel + '</option>');
									
									// Disabled option if the size matches the currently selected size
									if (sizeLabel === productSize) {
										$li.attr('disabled', 'disabled');
									}

									// Only append li if size is in stock
									if (stockJSON[variationId] > 0) {
										$el.append($li);	
									}
								}
							});	

							// Create custom select menu
							createCustomSelect($el);
						}

						$el.on('change', function() {
							var selectedIdx = $(this)[0].selectedIndex;
							var sizeId = $(this).children('option').eq(selectedIdx).attr('data-size-id');
							addToCartAjax(data, sizeId);
						});
					}
				});
			};


			/* When the user clicks 'change size' make an AJAX request to the product
			   page to pull in the size and form data. Display the available sizes in a
			   a dropdown and when the user selects a new size, post the serialised form
			   data to the form action url (which adds the product to the cart). Then remove
			   the old product which will trigger a page refresh. */
			var changeSize = (function() {
				$newRow.find('.IT002_prod__size--change').hide();

				/* If user has more than 1 of an item in basket, don't show change size functionality.
				   This is to avoid issues where the new size might not have as many in stock as the old size */
				if ($qty.val() > 1) {
					$newRow.find('.IT002_change-size-btn').hide();
					return false;
				}

				var $el = $newRow.find('.IT002_change-size-btn');


				$el.click(function(e) {			
					// If an AJAX request has previously been made for this product, back out of the function
					if (ajaxSuccess) {
						// show cached response
						return false;
					};

					var productUrl = link;
					/* Retrieve sizes for this product and build/show a custom
					   select menu */
					getSizes(productUrl);
				});
			})();

			/* CUSTOM SELECT MENU - workaround for iOS issue (25/7/17)
			   As the select options are loaded in dynamically, the menu will not be complete at 
			   the time the user clicks 'Change Size'. The default behaviour on iOS is to show the 
			   select wheel the moment a user clicks it resulting in an incomplete dropdown. 
				  
			   This workaround builds a custom modal containing all the sizes, then when a user clicks
			   a size this will trigger a change on the select menu built previously.			   
			*/
			function createCustomSelect($el) {
				// Create popup on click of change size btn
				var $btn = $newRow.find('.IT002_change-size-btn');

				var buildSrc = function() {
					var $src = $([
						'<div class="IT002_change-size-modal">',
							'<div class="IT002_modal-title">Change Size</div>',
							'<ul class="IT002_custom-change-size"></ul>',
						'</div>'
					].join(''));
					var $ul = $src.find('ul');
					var $options = $el.children();
					$options.each(function(i) {
						// Skip the first option as it is just 'Change size'
						if (i === 0) {
							return true;
						}

						var $opt = $(this);
						var isDisabled = !!$opt.attr('disabled');
						var $li = $('<li class="IT002_opt">' + $opt.text() + '</li>');

						if (isDisabled) {
							$li.addClass('IT002_opt--disabled');
						}

						var alreadyClicked;
						$li.on('click', function() {
							if (alreadyClicked) {
								return false;
							}
							
							alreadyClicked = true

							if (isDisabled) {
								// If already selected do nothing
								return false;
							} else {
								/* Else change the value dropdown element and force
								a change event */
								$loader.show();
								setTimeout(function() {
									$loader.hide();
								}, 4000);
								setSelectedIndex($el[0], i);
								$el[0].dispatchEvent(new Event('change'));
							}
						});

						$li.appendTo($ul);
					});

					return $src;
				};

				var openPopup = function() {
					var $src = buildSrc();
					window.jQuery.magnificPopup.open({
						items: {
							src: $src,
							type: 'inline'
						}
					});
				}
				// Open initial popup
				openPopup();

				// Open popup again on click
				$btn.on('click', function() {
					openPopup();
				});
			};

			// GA Events
			$newRow.find('.IT002_prod__title > a').one('click', function() {
				window.ga('send', 'event', 'IT002', 'click', 'clicked product title', {nonInteraction: true});
			});
			
			$newRow.find('.IT002_prod__img > a').one('click', function() {
				window.ga('send', 'event', 'IT002', 'click', 'clicked product image', {nonInteraction: true});
			});

			$newRow.appendTo($newProductTable);
		});

		$newProductTable.insertBefore($cart);
		$cart.hide();


		// Order totals
		var $totals = $('#shopping-cart-totals-table');
		var $totalsSections = $totals.find('> tbody > tr');
		$totalsSections.addClass('IT002_total-field');


		// Country selector
		var countrySelectorChanges = (function(){
			var $countrySelector = $totalsSections.filter('tr[id="bs:country"]');
			$countrySelector.addClass('IT002_country-selector');

			// Text overlay for country select box to allow more control over styling
			var $text = $('<div class="IT002_country-text"></div>');
			var $select = $countrySelector.find('#shipping-country');

			
			var changeText = function() {
				var selectedIdx = $select[0].selectedIndex;
				var selectedText = $select.children('option').eq(232).text();

				$text.text(selectedText);
			};

			changeText();
			$select.on('change', changeText);

			$countrySelector.children('td.a-right').prepend($text);

			/*
			// Right align country select box
			$select.attr('dir', 'rtl');
			*/

		})();
		


		// Delivery Options
		var $deliveryOpts = $('#basket-shipping-options-form');
		var deliveryIsDropdown = (function() {
			if ($deliveryOpts.children('select').length) {
				return true;
			} else {
				return false;
			}
		})();

		if (deliveryIsDropdown) {
			// Create radio buttons for each delivery option
			var $dropdown = $deliveryOpts.children('select');
			var $options = $dropdown.children('option');
			var $newHTML = $([
				'<table>',
					'<tbody>',
					'</tbody>',
				'</table>'
			].join(''));
			var $optsWrap = $newHTML.find('tbody');

			$options.each(function(i) {
				var $el = $(this);

				// Skip any hidden options
				if ($el.css('display') === 'none') {
					return true;
				} else {
					var text = $el.text().trim();
					var price = text.match(/(£|€|$)[\d.]+/)[0].trim();
					text = text.replace(price, '').trim();

					var $opt = $([
						'<tr>',
							'<td>',
								'<input class="shipping_radio" name="estimate_method" type="radio">',
							'</td>',
							'<td style="text-transform: none;">',
								text,
								'<span class="price">' + price + '</span>',
							'</td>',
						'</tr>'
					].join(''));

					/* If this is the currently selected delivery option,
					   preselect the radio button */
					var isSelected = $el.attr('selected') === 'selected';
					if (isSelected) {
						var $radio = $opt.find('input[type="radio"]');
						$radio[0].checked = true;
						$radio.attr('checked', 'checked');
					}

					$opt.on('click', function() {
						if (isSelected) {
							// If already selected do nothing
							return false;
						} else {
							/* Else change the value dropdown element and force
							   a change event */
							setSelectedIndex($dropdown[0], i);
							$dropdown[0].dispatchEvent(new Event('change'));
						}
					});

					$opt.appendTo($optsWrap);
				}
			});

			$newHTML.prependTo($deliveryOpts);
			$deliveryOpts.children('select').hide();
		}

		$deliveryOpts.find('tbody > tr').each(function() {
			var $el = $(this);

			// Restructure text
			var text = $el.text().trim();
			var title = text.match(/[\w\s\-]+/)[0].trim();
			var time  = text.match(/\(.*\)/)[0].trim();
			var price = text.match(/(£|€|$)[\d.]+/)[0].trim();

			var $newText = $([
				'<div class="IT002_delivery-opt">',
					'<span class="IT002_del-title">' + title + '</span>',
					'<span class="IT002_del-price">' + price + '</span>',
					'<span class="IT002_del-time">' + time + '</span>',
				'</div>'
			].join(''));

			$el.children('td:last').empty().html($newText);

			// Make delivery labels clickable
			var $input = $el.find('input');
			$(this).children('td:last').on('click', function() {
				$input[0].checked = true;
				$input.trigger('change');
			});
		});

		// Reinforce sizing information

		
		// Collapse voucher by default
		var $discountForm = $('#discount-coupon-form');
		var $discountCtrl = $('<div class="IT002_discount-ctrl">Apply voucher <span class="IT002_status">+</span></div>');
		var $discountToggleStatus = $discountCtrl.find('.IT002_status');
		var $discountInput = $discountForm.find('.discount');

		$discountCtrl.on('click', function() {
			var isVisible = $discountInput.css('display') !== 'none';

			if (isVisible) {
				$discountInput.slideUp();
				$discountToggleStatus.text('+');
			} else {
				$discountInput.slideDown();
				$discountToggleStatus.text('-');
			}
		});

		$discountCtrl.prependTo($discountForm);
		$discountInput.slideUp();

		// Reduce footer
		var $footer = $('.footer');
		var $footerLinks = $footer.find('.footer-links > ul > li');
		var $footerLinksGroups = UC.group($footerLinks, $footerLinks.length / 2);

		$.each($footerLinksGroups, function(){
			$(this).wrapAll('<div class="IT002_footer-link-group"></div>');
		});
	}

})(window.jQuery);