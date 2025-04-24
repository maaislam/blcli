var experiment = {
	id: 'IT010',
	jQ: window.jQuery,

	initPlugins: function() {
		this.plugins = {};
		// UC Library (Poller) @version 0.2.2
		var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(this.plugins.UC||{});
		
		// UC Library (Observer) @version 0.2.2
		UC.observer={active:[],connect:function(t,e,n){var i={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(n)for(var o in n)i[o]=n[o];else n=i;for(var r,c=new MutationObserver(function(n){n.forEach(function(n){r||(r=!0,e(t,n),setTimeout(function(){r=!1},i.throttle))})}),f=0;f<t.length;f++)c.observe(t[f],i.config),this.active.push([t[f],c])},disconnect:function(t){for(var e=this.active,n=0;n<t.length;n++)for(var i=t[n],o=0;o<e.length;o++)i===e[o][0]&&e[o][1].disconnect()}};

		this.plugins.UC = UC;

		// Magnific Popup v1.1.0
		(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w=function(a,b){n.ev.on(i+a+j,b)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},z=function(b){if(b!==v||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),v=b;return n.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isLowIE=n.isIE8=document.all&&!document.addEventListener,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=B(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),s=a(document),n.popupsCache={}},open:function(b){var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],u="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=s,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=x("bg").on("click"+j,function(){n.close()}),n.wrap=x("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=x("container",n.wrap)),n.contentContainer=x("content"),n.st.preloader&&(n.preloader=x("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}y("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(w(f,function(a,b,c,d){c.close_replaceWith=z(d.type)}),u+=" mfp-close-btn-in"):n.wrap.append(z())),n.st.alignTop&&(u+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:s.height(),position:"absolute"}),n.st.enableEscapeKey&&s.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(u+=" mfp-auto-cursor"),u&&n.wrap.addClass(u);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),y("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||a(document.body)),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),s.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),y(g),b},close:function(){if(!n.isOpen)return;y(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){y(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}s.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n.st.autoFocusLast&&n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,y(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),y("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;y("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;y("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}t&&t!==b.type&&n.container.removeClass("mfp-"+t+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,y(h,b),t=b.type,n.container.prepend(n.contentContainer),y("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(z()):n.content=a:n.content="",y(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,y("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey||b.altKey||b.shiftKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};y("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?s.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(f,[b,c,d]),a.each(c,function(c,d){if(d===undefined||d===!1)return!0;e=c.split("_");if(e.length>1){var f=b.find(j+"-"+e[0]);if(f.length>0){var g=e[1];g==="replaceWith"?f[0]!==d[0]&&f.replaceWith(d):g==="img"?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(j+"-"+c).html(d)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return A(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(b){A();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var C="inline",D,E,F,G=function(){F&&(E.after(F.addClass(D)).detach(),F=null)};a.magnificPopup.registerModule(C,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){n.types.push(C),w(b+"."+C,function(){G()})},getInline:function(b,c){G();if(b.src){var d=n.st.inline,e=a(b.src);if(e.length){var f=e[0].parentNode;f&&f.tagName&&(E||(D=d.hiddenClass,E=x(D),D="mfp-"+D),F=e.after(E).detach().removeClass(D)),n.updateStatus("ready")}else n.updateStatus("error",d.tNotFound),e=a("<div>");return b.inlineElement=e,e}return n.updateStatus("ready"),n._parseMarkup(c,{},b),c}}});var H,I=function(){return H===undefined&&(H=document.createElement("p").style.MozTransform!==undefined),H};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;w("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,y("ZoomAnimationEnded")},16)},f)},16)}}),w(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),w(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return I()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}}),A()});
	},
	
	_cacheDom: function() {
		var $ = experiment.jQ;
		var elems = {};
		
		// Elements
		elems.body = document.getElementsByTagName('body')[0];
		elems.$loader = $('#bubble-layer-overlay');
		elems.$products = $('.products-grid > li > .item');

		this.elems = elems;
		return elems;
	},

	modules: {
		addToBag: {
			_components: {
				src: {
					select: '<select class="IT010_select"><option selected="selected">Select size</option></select>',
					button: '<div class="add-to-cart-button IT010_add-to-cart"><button type="button" title="Add to Bag" class="button btn-cart"><span><span>Add to Bag</span></span></button></div>',
				},
				instance: {},
				init: function() {
					for (var component in this.src) {
						var src = this.src[component];
						this.instance[component] = experiment.jQ(src);
					}
				}
			},

			_getSizes: function(productUrl, $item) {
				var $ = experiment.jQ;
				var $select = $item.find('.IT010_select');
				var $button = $item.find('.IT010_add-to-cart');
				var ajaxAddToBag = this._ajaxAddToBag;

				// Show AJAX loader
				experiment.elems.$loader.show();
				// Disable add to cart button
				$button.children('button').addClass('disable loading');
				// Fallback for hiding loader
				setTimeout(function() {
					experiment.elems.$loader.hide();
				}, 7000);

				$.ajax({
					url: productUrl,
					type: 'GET',
					dataType: 'html',
					success: function(data) {
						// Hide AJAX loader
						experiment.elems.$loader.hide();
						// Re-enable add to cart button
						$button.children('button').removeClass('disable loading');

						var $data = $(data);

						// 1. Extract available sizes and stock levels from script tag
						var productJSON = (function() {
							//var script = $data.find('#product-options-wrapper script');
							var JSONStr = data.match(/(spConfig = new Product.Config\()(.+)(\))/)[2];
							var productJSON = JSONStr ? JSON.parse(JSONStr) : false;

							return productJSON;
						})();

						var stockJSON = (function() {
							//var script = $data.find('.col-main > script').text();
							var JSONStr = data.match(/(switcherConfig = )({.+})/)[2];
							var stockJSON = JSONStr ? JSON.parse(JSONStr).stock : false;

							return stockJSON;
						})();

						// If it failed to extract the JSON, show error message to user
						if (!productJSON) {
							alert('Oops sorry! There was an error retrieving the sizes for this product. Please try again from the product page.');
							window.ga('send', 'event', 'IT010', 'Error', 'Error extracting JSON from AJAX response');
							return false;
						} else {
							var sizesArr = productJSON.attributes[150].options;
							$.each(sizesArr, function() {
								var sizeLabel = this.label;
								var sizeId = this.id;
								var variationId = this.products[0];

								if (sizeLabel && sizeId) {
									var $li = $('<option data-size-id="' + sizeId + '">' + sizeLabel + '</option>');

									// Only append li if size is in stock
									if (stockJSON[variationId] > 0) {
										$select.append($li);	
									}
								}
							});	

							// Create custom select menu
							experiment.modules.customSelect($select, $button);
						}

						$select.on('change', function() {
							var selectedIdx = $(this)[0].selectedIndex;
							var sizeId = $(this).children('option').eq(selectedIdx).attr('data-size-id');
							ajaxAddToBag(data, sizeId, $item);
						});
						
						// If GET was successful, mark the element with a data attribute
						// so we know not to make this request again
						$item.attr('data-IT010', 'success');
					},

					error: function(jqXHR, textStatus, errorThrown) {
						alert('Oops sorry! There was an error retrieving the sizes for this product. Please try again from the product page.');
						window.ga('send', 'event', 'IT010', 'Error', 'AJAX error getting sizes');
					}
				});
			},
			
			_ajaxAddToBag: function(data, sizeData, $item) {
				var $ = experiment.jQ;
				var $data = $(data);
				var $form = $data.find('#product_addtocart_form');
				var form = $form[0];
				var url = $form.attr('action');
				var productName = $item.children('a:first').attr('title');
				var data = $form.serialize();
				data += '&isAjax=1';
				
				// Empty AJAX messages container
				window.$('ajax_messages').update('');
				
				// Remove alerts
				window.$$('.alert-box').each(function (element) {
					$(element).remove();
				});

				// Find size attribute part of serialised data and change it to size ID
				var dataSizeInfo = data.match(/(&super_attribute%5B150%5D=[\w\+-\.]+)(&)/)[1];
				data = data.replace(dataSizeInfo, '&super_attribute%5B150%5D='+sizeData);
				
				// Update quantity
				var dataQtyInfo = data.match(/(&qty=[\d]+)(&)/)[1];

				$.ajax({
					url: 'https://www.inthestyle.com/wt_ajaxcart/index/index/',
					type : 'POST',
					data: data,
					success: function(data) {
						 window.ga('send', 'event', 'IT010', 'Submit', 'Product added to bag', {nonInteraction: true});
						experiment.elems.$loader.hide();
						$.magnificPopup.close();
						updateCart();
					},
					error: function() {
						window.ga('send', 'event', 'IT010', 'Error', 'Error selecting size', {nonInteraction: true});
						experiment.elems.$loader.hide();
						$.magnificPopup.close();
						alert('Oops sorry! There was an error selecting your size. Please try again from the product page.');
					}
				});

				/* This is a slightly modified version of some code in ajaxCart.js */
				function updateCart() {
					// Refresh page / update mini basket
					window.$(form).request({
						onSuccess: function (response) {
							var json = response.responseText.evalJSON();
							setTimeout(function () {
								// Update cart contents
								window.$$('.right-off-canvas-menu .block-cart').each(function (element) {
									window.$(element).replace(json.sidebar);
								});
	
								window.$$('#cart-dropdown .block-cart').each(function (element) {
									window.$(element).replace(json.sidebar);
								});
	
								// Replace bag link contents
								window.$$('.header-bag').each(function (element) {
									window.$(element).update(json.top_cart);
								});
	
								window.$$('.mobile-bag').each(function (element) {
									window.$(element).update(json.mobile_cart);
								});
	
								// Add messages
								var $successMessage = $('<div data-alert="" class="alert-box success-msg"><p>' + productName + ' was added to your shopping bag.</p><a href="javascript:void(0)" class="close">×</a></div>');
								$successMessage.find('.close').click(function() {
									$successMessage.remove();
								});

								setTimeout(function () {
									$('.right-off-canvas-menu .block-cart').prepend($successMessage);
									$('#cart-dropdown .block-cart').prepend($successMessage.clone());
								}, 300);
			
								// Show cart contents
								$('.link-bag.right-off-canvas-toggle > i').trigger('click');
							}, 200);
	
							if (json.updated_item_id != null) {
								var originalAction = window.$(form).action;
								var newAction = originalAction.replace(/id\/([0-9])+\//g, "id/" + json.updated_item_id + "/");
								$('product_addtocart_form').writeAttribute('action', newAction);
							}
						}
					});
				}
			},

			_bindEvents: function() {
				var $ = experiment.jQ;
				var getSizes = this._getSizes;
				var module = this;

				// On click of add to bag, retrieve sizes with GET request
				var $button = this._components.instance.button;

				var sentBtnEvent = false;
				$button.click(function() {
					if (!sentBtnEvent) {
						window.ga('send', 'event', 'IT010', 'Click', 'Clicked add to bag');
						sentBtnEvent = true;
					}
					var $item = $(this).closest('.item');

					if (!$item.attr('data-IT010')) {
						var productUrl = $(this).closest('.item').children('a:first').attr('href');
						getSizes.call(module, productUrl, $item);
					}
				});
			},

			_render: function() {
				var $ = experiment.jQ;
				return this._components.instance.select.add(this._components.instance.button);
			},

			init: function() {
				// Init instance of components
				this._components.init();
				this._bindEvents();
				return this._render();
			}
		},

		customSelect: function($select, $button) {
			/* CUSTOM SELECT MENU - workaround for iOS issue (25/7/17)
			As the select options are loaded in dynamically, the menu will not be complete at 
			the time the user clicks 'Select Size'. The default behaviour on iOS is to show the 
			select wheel the moment a user clicks it resulting in an incomplete dropdown. 
				
			This workaround builds a custom modal containing all the sizes, then when a user clicks
			a size this will trigger a select on the select menu built previously.
			*/
			var $ = experiment.jQ;
	
			// Create popup on click of select size btn
			var $btn = $button;
	
			var buildSrc = function() {
				var $src = $([
					'<div class="IT010_select-size-modal">',
						'<div class="IT010_modal-title">Select Size</div>',
						'<ul class="IT01-_custom-select-size"></ul>',
					'</div>'
				].join(''));
				var $ul = $src.find('ul');
				var $options = $select.children();
	
				$options.each(function(i) {
					// Skip the first option as it is just 'Select size'
					if (i === 0) {
						return true;
					}
	
					var $opt = $(this);
					var isDisabled = !!$opt.attr('disabled');
					var $li = $('<li class="IT010_opt">' + $opt.text() + '</li>');
	
					if (isDisabled) {
						$li.addClass('IT010_opt--disabled');
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
							experiment.elems.$loader.show();
							setTimeout(function() {
								experiment.elems.$loader.hide();
							}, 4000);
							//setSelectedIndex($select[0], i);
							$select[0].options[i].selected = true;
							$select[0].dispatchEvent(new Event('change'));
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
			};
	
			// Open initial popup
			openPopup();
	
			// Open popup again on click
			$btn.on('click', function() {
				openPopup();
			});
		},
	},

	init: function() {
		var exp = this;
		var $ = this.jQ;
		var addToBag = this.modules.addToBag;

		this.initPlugins();

		this.plugins.UC.poller([
			function() { return window.jQuery },
			function() { return window.jQuery.magnificPopup },
			'.item'
		], function() {
			activate.call(exp);
		});

		function activate() {
			this._cacheDom();

			// Namespace CSS
			this.elems.body.className += ' ' + experiment.id;

			function modifyProducts($products) {
				// for each product, create an instance of add to bag module
				for (var i = 0; i < $products.length; i++) {
					var addToBagModule = addToBag.init();
					$products.eq(i)
						.append(addToBagModule)
						.css('height', '456px');
				}

				// Product li amends - stretch height to account for new add to bag btn
				// var btnHeight = $('.IT010_add-to-cart').height();
				// var liHeight = $products.height();
				//$products.css('height', '456px');
			}

			modifyProducts(this.elems.$products);

			// Lazy Load Fix
			// On lazy load a div is added to category-products
			// When a mutation happens on this element find the new div and init a 
			// new add to bag module for each new product
			var $categoryProducts = $('.category-products');
			this.plugins.UC.observer.connect($categoryProducts, function() {
				
				// Get products sets that haven't been modified
				function checkProductSets() {
					var $productsSets = $categoryProducts.find('.products-set');
					var $newProducts = $();
					$productsSets.each(function() {
						var isModified = !!$(this).find('.products-grid > li > .item .IT010_add-to-cart').length;

						if (!isModified) {
							$newProducts = $newProducts.add($(this).find('.products-grid > li > .item'));
						}
					});

					if ($newProducts.length) {
						modifyProducts($newProducts);
					}
				}

				checkProductSets();

				// Check again after 2s to make sure add to bag has been added
				setTimeout(checkProductSets, 2000);
			}, {
				config: { childList: true, attributes: false, subtree: false }
			});
		}
	}

};

experiment.init();