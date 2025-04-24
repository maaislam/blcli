var _ME116 = (function () {

    // PLUGINS ------------------------------------

    // UC Library - Poller -- @version 0.2.2
    // ---------------------------------------------
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Send GA Events With Tracker Name -----------
    // ---------------------------------------------
    function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;

    // Magnific popup
    // Magnific Popup v1.1.0 by Dmitry Semenov
    // http://bit.ly/magnific-popup#build=inline+image+ajax+iframe+gallery+retina+imagezoom
    (function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w=function(a,b){n.ev.on(i+a+j,b)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},z=function(b){if(b!==v||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),v=b;return n.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isLowIE=n.isIE8=document.all&&!document.addEventListener,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=B(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),s=a(document),n.popupsCache={}},open:function(b){var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],u="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=s,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=x("bg").on("click"+j,function(){n.close()}),n.wrap=x("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=x("container",n.wrap)),n.contentContainer=x("content"),n.st.preloader&&(n.preloader=x("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}y("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(w(f,function(a,b,c,d){c.close_replaceWith=z(d.type)}),u+=" mfp-close-btn-in"):n.wrap.append(z())),n.st.alignTop&&(u+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:s.height(),position:"absolute"}),n.st.enableEscapeKey&&s.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(u+=" mfp-auto-cursor"),u&&n.wrap.addClass(u);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),y("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||a(document.body)),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),s.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),y(g),b},close:function(){if(!n.isOpen)return;y(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){y(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}s.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n.st.autoFocusLast&&n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,y(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),y("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;y("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;y("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}t&&t!==b.type&&n.container.removeClass("mfp-"+t+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,y(h,b),t=b.type,n.container.prepend(n.contentContainer),y("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(z()):n.content=a:n.content="",y(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,y("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey||b.altKey||b.shiftKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};y("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?s.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(f,[b,c,d]),a.each(c,function(c,d){if(d===undefined||d===!1)return!0;e=c.split("_");if(e.length>1){var f=b.find(j+"-"+e[0]);if(f.length>0){var g=e[1];g==="replaceWith"?f[0]!==d[0]&&f.replaceWith(d):g==="img"?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(j+"-"+c).html(d)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return A(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(b){A();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var C="inline",D,E,F,G=function(){F&&(E.after(F.addClass(D)).detach(),F=null)};a.magnificPopup.registerModule(C,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){n.types.push(C),w(b+"."+C,function(){G()})},getInline:function(b,c){G();if(b.src){var d=n.st.inline,e=a(b.src);if(e.length){var f=e[0].parentNode;f&&f.tagName&&(E||(D=d.hiddenClass,E=x(D),D="mfp-"+D),F=e.after(E).detach().removeClass(D)),n.updateStatus("ready")}else n.updateStatus("error",d.tNotFound),e=a("<div>");return b.inlineElement=e,e}return n.updateStatus("ready"),n._parseMarkup(c,{},b),c}}});var H="ajax",I,J=function(){I&&a(document.body).removeClass(I)},K=function(){J(),n.req&&n.req.abort()};a.magnificPopup.registerModule(H,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){n.types.push(H),I=n.st.ajax.cursor,w(b+"."+H,K),w("BeforeChange."+H,K)},getAjax:function(b){I&&a(document.body).addClass(I),n.updateStatus("loading");var c=a.extend({url:b.src,success:function(c,d,e){var f={data:c,xhr:e};y("ParseAjax",f),n.appendContent(a(f.data),H),b.finished=!0,J(),n._setFocus(),setTimeout(function(){n.wrap.addClass(k)},16),n.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),b.finished=b.loadError=!0,n.updateStatus("error",n.st.ajax.tError.replace("%url%",b.src))}},n.st.ajax.settings);return n.req=a.ajax(c),""}}});var L,M=function(b){if(b.data&&b.data.title!==undefined)return b.data.title;var c=n.st.image.titleSrc;if(c){if(a.isFunction(c))return c.call(n,b);if(b.el)return b.el.attr(c)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=n.st.image,d=".image";n.types.push("image"),w(g+d,function(){n.currItem.type==="image"&&c.cursor&&a(document.body).addClass(c.cursor)}),w(b+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),r.off("resize"+j)}),w("Resize"+d,n.resizeImage),n.isLowIE&&w("AfterChange",n.resizeImage)},resizeImage:function(){var a=n.currItem;if(!a||!a.img)return;if(n.st.image.verticalFit){var b=0;n.isLowIE&&(b=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",n.wH-b)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(n.content&&n.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var b=0,c=a.img[0],d=function(e){L&&clearInterval(L),L=setInterval(function(){if(c.naturalWidth>0){n._onImageHasSize(a);return}b>200&&clearInterval(L),b++,b===3?d(10):b===40?d(50):b===100&&d(500)},e)};d(1)},getImage:function(b,c){var d=0,e=function(){b&&(b.img[0].complete?(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("ready")),b.hasSize=!0,b.loaded=!0,y("ImageLoadComplete")):(d++,d<200?setTimeout(e,100):f()))},f=function(){b&&(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("error",g.tError.replace("%url%",b.src))),b.hasSize=!0,b.loaded=!0,b.loadError=!0)},g=n.st.image,h=c.find(".mfp-img");if(h.length){var i=document.createElement("img");i.className="mfp-img",b.el&&b.el.find("img").length&&(i.alt=b.el.find("img").attr("alt")),b.img=a(i).on("load.mfploader",e).on("error.mfploader",f),i.src=b.src,h.is("img")&&(b.img=b.img.clone()),i=b.img[0],i.naturalWidth>0?b.hasSize=!0:i.width||(b.hasSize=!1)}return n._parseMarkup(c,{title:M(b),img_replaceWith:b.img},b),n.resizeImage(),b.hasSize?(L&&clearInterval(L),b.loadError?(c.addClass("mfp-loading"),n.updateStatus("error",g.tError.replace("%url%",b.src))):(c.removeClass("mfp-loading"),n.updateStatus("ready")),c):(n.updateStatus("loading"),b.loading=!0,b.hasSize||(b.imgHidden=!0,c.addClass("mfp-loading"),n.findImageSize(b)),c)}}});var N,O=function(){return N===undefined&&(N=document.createElement("p").style.MozTransform!==undefined),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;w("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,y("ZoomAnimationEnded")},16)},f)},16)}}),w(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),w(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return O()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}});var P="iframe",Q="//about:blank",R=function(a){if(n.currTemplate[P]){var b=n.currTemplate[P].find("iframe");b.length&&(a||(b[0].src=Q),n.isIE8&&b.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){n.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(b+"."+P,function(){R()})},getIframe:function(b,c){var d=b.src,e=n.st.iframe;a.each(e.patterns,function(){if(d.indexOf(this.index)>-1)return this.id&&(typeof this.id=="string"?d=d.substr(d.lastIndexOf(this.id)+this.id.length,d.length):d=this.id.call(this,d)),d=this.src.replace("%id%",d),!1});var f={};return e.srcAction&&(f[e.srcAction]=d),n._parseMarkup(c,f,b),n.updateStatus("ready"),c}}});var S=function(a){var b=n.items.length;return a>b-1?a-b:a<0?b+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=n.st.gallery,d=".mfp-gallery";n.direction=!0;if(!c||!c.enabled)return!1;u+=" mfp-gallery",w(g+d,function(){c.navigateByImgClick&&n.wrap.on("click"+d,".mfp-img",function(){if(n.items.length>1)return n.next(),!1}),s.on("keydown"+d,function(a){a.keyCode===37?n.prev():a.keyCode===39&&n.next()})}),w("UpdateStatus"+d,function(a,b){b.text&&(b.text=T(b.text,n.currItem.index,n.items.length))}),w(f+d,function(a,b,d,e){var f=n.items.length;d.counter=f>1?T(c.tCounter,e.index,f):""}),w("BuildControls"+d,function(){if(n.items.length>1&&c.arrows&&!n.arrowLeft){var b=c.arrowMarkup,d=n.arrowLeft=a(b.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(m),e=n.arrowRight=a(b.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(m);d.click(function(){n.prev()}),e.click(function(){n.next()}),n.container.append(d.add(e))}}),w(h+d,function(){n._preloadTimeout&&clearTimeout(n._preloadTimeout),n._preloadTimeout=setTimeout(function(){n.preloadNearbyImages(),n._preloadTimeout=null},16)}),w(b+d,function(){s.off(d),n.wrap.off("click"+d),n.arrowRight=n.arrowLeft=null})},next:function(){n.direction=!0,n.index=S(n.index+1),n.updateItemHTML()},prev:function(){n.direction=!1,n.index=S(n.index-1),n.updateItemHTML()},goTo:function(a){n.direction=a>=n.index,n.index=a,n.updateItemHTML()},preloadNearbyImages:function(){var a=n.st.gallery.preload,b=Math.min(a[0],n.items.length),c=Math.min(a[1],n.items.length),d;for(d=1;d<=(n.direction?c:b);d++)n._preloadItem(n.index+d);for(d=1;d<=(n.direction?b:c);d++)n._preloadItem(n.index-d)},_preloadItem:function(b){b=S(b);if(n.items[b].preloaded)return;var c=n.items[b];c.parsed||(c=n.parseEl(b)),y("LazyLoad",c),c.type==="image"&&(c.img=a('<img class="mfp-img" />').on("load.mfploader",function(){c.hasSize=!0}).on("error.mfploader",function(){c.hasSize=!0,c.loadError=!0,y("LazyLoadError",c)}).attr("src",c.src)),c.preloaded=!0}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=n.st.retina,b=a.ratio;b=isNaN(b)?b():b,b>1&&(w("ImageHasSize."+U,function(a,c){c.img.css({"max-width":c.img[0].naturalWidth/b,width:"100%"})}),w("ElementParse."+U,function(c,d){d.src=a.replaceSrc(d,b)}))}}}}),A()})

    // Full Story Tagging --------------------------
    // ---------------------------------------------
    UC.poller([
        function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'ME116',
            variation_str: 'Variation 1 Mobile'
        });
    }, {multiplier: 1.2, timeout: 0});

    // Triggers ------------------------------------
    // ---------------------------------------------
    var _triggers = (function () {
        UC.poller([
            function () {
                return window.jQuery
            },
            function () {
                return window.ga
            }
        ], activate);
    })();

    // ---------------------------------------------
    function activate() {
        var $ = window.jQuery;
        var $body = $('body');
        $body.addClass('ME116');

        var buildLightbox = function () {
            // Create base HTML template
            var $html = $([
                '<div class="ME116_popup_wrapper">',
                    '<p class="ME116_successAdd">Item Successfully Added to Cart</p>',
                    '<p class="ME116_youmayalsolike">You may also like: </p>',
                    '<div class="ME116_products_wrapper">',
                        '<div class="ME116_productLeft">',
                            '<div><img class="ME116_productImgLeft"></div>',
                            '<p class="ME116_productNameLeft"></p>',
                            '<p class="ME116_productPriceLeft"></p>',
                            '<div class="ME116_productSizeLeft"></div>',
                            '<div class="ME116_prodLinkWrapper"><a class="ME116_productLeft_Link"><button class="ME116_buttonLeft">ADD TO CART</button></a></div>',
                        '</div>',
                        '<div class="ME116_productRight">',
                            '<div><img class="ME116_productImgRight"></div>',
                            '<p class="ME116_productNameRight"></p>',
                            '<p class="ME116_productPriceRight"></p>',
                            '<div class="ME116_productSizeRight"></div>',
                            '<div class="ME116_prodLinkWrapper"><a class="ME116_productRight_Link"><button class="ME116_buttonRight">ADD TO CART</button></a></div>',
                        '</div>',
                    '</div>',
                    '<div class="ME116_footer">',
                        //'<a href="https://www.merchoid.com/cart/" class="ME116_viewBasket"><span>View Basket > </span> </a>',
                        '<a href="https://www.merchoid.com/cart/" class="ME116_checkoutLink"><button class="ME116_checkoutButton">VIEW BASKET > </button></a>',
                    '</div>',
                '</div>'
            ].join(''));

            // Open popup
            $.magnificPopup.open({
                items: {
                    src: $html,
                    type: 'inline'
                }
            });
        }; // buildLightbox

        // This assumes products displayed in the popup will have sizes (e.g it doesn't contain info for mugs...)
        function specificBrands(brandName) {
            var brands = {
                // --------------------------------------ZELDA---------------------------------------------------------
                "Zelda": [
                    {
                        product_with_size: true, // true if product contains multiple sizes (false otherwise e.g mugs)
                        product_id: 16247,
                        variations_in_stock: [
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "16330"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "16331"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/official-legend-of-zelda-luxury-bath-robe/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2015/05/Official-Zelda-Luxury-Bath-Robe.jpg',
                        product_name: 'Official Legend of Zelda Luxury Bathrobe',
                        product_short: 'Zelda Luxury Bathrobe',
                        product_price: '£39.99',
                        product_background: '//cdn.optimizely.com/img/6087172626/8cf825500fc6437db06065ef0a64db08.jpg'
                    }, // prod 1
                    {
                        product_with_size: true,
                        product_id: 248410,
                        variations_in_stock: [
                            {"attribute_pa_size": "s", attribute_name: "Small", "variation_id": "248419"},
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "248418"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "248417"},
                            {"attribute_pa_size": "xl", attribute_name: "XtraLarge", "variation_id": "248416"},
                            {"attribute_pa_size": "xxl", attribute_name: "XtraXtraLarge", "variation_id": "248415"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/legend-of-zelda-o-hyrule-y-night-christmas-jumper-sweater/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/09/zeld-jumper-green-front-510x690.jpg',
                        product_name: 'Legend of Zelda: O Hyrule-y Night Christmas Sweater/Jumper Preorder',
                        product_short: 'Zelda: O Hyrule-y Night Christmas Sweater/Jumper',
                        product_price: '£42.99',
                        product_background: '//cdn.optimizely.com/img/6087172626/8cf825500fc6437db06065ef0a64db08.jpg'
                    }, // prod 2
                    {
                        product_with_size: false,
                        product_id: 200507,
                        // Params
                        generateURL: function (prodID) {
                            return window.location.pathname + '?add-to-cart=' + prodID;
                        },
                        product_originalURL: 'https://www.merchoid.com/product/zelda-link-s-heat-changing-mug/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/02/Untitled-5-510x555.jpg',
                        product_name: 'Zelda: Heat Changing Stained Glass Window Mug Preorder',
                        product_short: 'Zelda: Heat Changing Stained Glass Window Mug',
                        product_price: '£14.99',
                        product_background: '//cdn.optimizely.com/img/6087172626/8cf825500fc6437db06065ef0a64db08.jpg'
                    } // prod 3
                ],
                // --------------------------------------DESTINY-------------------------------------------------------
                "Destiny": [
                    {
                        product_with_size: true, // true if product contains multiple sizes (false otherwise e.g mugs)
                        product_id: 12117,
                        variations_in_stock: [
                            {"attribute_pa_size": "s", attribute_name: "Small", "variation_id": "12938"},
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "12939"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "12940"},
                            {"attribute_pa_size": "xl", attribute_name: "XtraLarge", "variation_id": "12941"},
                            {"attribute_pa_size": "xxl", attribute_name: "XtraXtraLarge", "variation_id": "12942"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/destiny-green-black-hunter-hoodie/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2015/01/IMG_9264-510x510.jpg',
                        product_name: 'Destiny: Master of the Frontier Hunter Hoodie',
                        product_short: 'Destiny: Master of the Frontier Hunter Hoodie',
                        product_price: '£39.99',
                        product_background: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/09/destiny-bg.jpg'
                    }, // prod 1
                    {
                        product_with_size: true,
                        product_id: 12119,
                        variations_in_stock: [
                            {"attribute_pa_size": "s", attribute_name: "Small", "variation_id": "12948"},
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "12949"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "12950"},
                            {"attribute_pa_size": "xl", attribute_name: "XtraLarge", "variation_id": "12951"},
                            {"attribute_pa_size": "xxl", attribute_name: "XtraXtraLarge", "variation_id": "12952"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/destiny-orange-grey-warlock-hoodie/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2015/01/IMG_9252-510x510.jpg',
                        product_name: 'Destiny: The Traveler Warlock Hoodie',
                        product_short: 'Destiny: The Traveler Warlock Hoodie',
                        product_price: '£39.99',
                        product_background: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/09/destiny-bg.jpg'
                    }, // prod 2
                    {
                        product_with_size: true,
                        product_id: 12118,
                        variations_in_stock: [
                            {"attribute_pa_size": "s", attribute_name: "Small", "variation_id": "12943"},
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "12944"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "12945"},
                            {"attribute_pa_size": "xl", attribute_name: "XtraLarge", "variation_id": "12946"},
                            {"attribute_pa_size": "xxl", attribute_name: "XtraXtraLarge", "variation_id": "12947"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/destiny-red-grey-titan-hoodie/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2015/01/IMG_9280-510x510.jpg',
                        product_name: 'Destiny: Strength and Sacrifice Titan Hoodie',
                        product_short: 'Destiny: Strength and Sacrifice Titan Hoodie',
                        product_price: '£39.99',
                        product_background: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/09/destiny-bg.jpg'
                    } // prod 3
                ],
                // --------------------------------------STAR WARS-----------------------------------------------------
                "Star Wars": [
                    {
                        product_with_size: true, // true if product contains multiple sizes (false otherwise e.g mugs)
                        product_id: 247175,
                        variations_in_stock: [
                            {"attribute_pa_size": "xs", attribute_name: "XtraSmall", "variation_id": "250865"},
                            {"attribute_pa_size": "s", attribute_name: "Small", "variation_id": "247182"},
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "247181"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "247180"},
                            {"attribute_pa_size": "xl", attribute_name: "XtraLarge", "variation_id": "247179"},
                            {"attribute_pa_size": "xxl", attribute_name: "XtraXtraLarge", "variation_id": "247178"},
                            {"attribute_pa_size": "xxxl", attribute_name: "XtraXtraXtraLarge", "variation_id": "247176"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/star-wars-happy-hoth-idays-christmas-sweater-jumper/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/07/Star-Wars-AT-AT-Snow-Scene-Christmas-Sweater-Jumper-510x617.jpeg',
                        product_name: 'Star Wars: Happy Hoth-idays Christmas Sweater/Jumper Preorder',
                        product_short: 'Star Wars: Happy Hoth-idays Christmas Sweater/Jumper',
                        product_price: '£36.99',
                        product_background: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/09/starwars-bg.jpg'
                    }, // prod 1
                    {
                        product_with_size: true,
                        product_id: 23495,
                        variations_in_stock: [
                            {"attribute_pa_size": "xs", attribute_name: "XtraSmall", "variation_id": "33792"},
                            {"attribute_pa_size": "s", attribute_name: "Small", "variation_id": "23506"},
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "23507"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "23508"},
                            {"attribute_pa_size": "xl", attribute_name: "XtraLarge", "variation_id": "23509"},
                            {"attribute_pa_size": "xxl", attribute_name: "XtraXtraLarge", "variation_id": "23510"},
                            {"attribute_pa_size": "xxxl", attribute_name: "XtraXtraXtraLarge", "variation_id": "33793"},
                            {"attribute_pa_size": "xxxxl", attribute_name: "XtraXtraXtraXtraLarge", "variation_id": "241383"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/star-wars-x-wing-vs-tie-fighter-unisex-knitted-christmas-sweaterjumper/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2015/10/IMG_1041-510x510.jpg',
                        product_name: 'Star Wars: X-Wing Vs TIE Fighter Unisex Knitted Christmas Sweater/Jumper',
                        product_short: 'Star Wars: X-Wing Vs TIE Fighter Unisex Knitted Christmas Sweater/Jumper',
                        product_price: '£36.99',
                        product_background: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/09/starwars-bg.jpg'
                    }, // prod 2
                    {
                        product_with_size: false,
                        product_id: 82506,
                        // Params
                        generateURL: function (prodID) {
                            return window.location.pathname + '?add-to-cart=' + prodID;
                        },
                        product_originalURL: 'https://www.merchoid.com/product/star-wars-resistance-messenger-bag/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2016/02/IMG_1375-510x510.jpg',
                        product_name: 'Star Wars: Resistance Messenger Bag',
                        product_short: 'Star Wars: Resistance Messenger Bag',
                        product_price: '£27.99',
                        product_background: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/09/starwars-bg.jpg'
                    } // prod 3
                ],
                // --------------------------------------RICK AND MORTY------------------------------------------------
                "Rick and Morty": [
                    {
                        product_with_size: true, // true if product contains multiple sizes (false otherwise e.g mugs)
                        product_id: 256662,
                        variations_in_stock: [
                            {"attribute_pa_size": "s", attribute_name: "Small", "variation_id": "256668"},
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "256667"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "256666"},
                            {"attribute_pa_size": "xl", attribute_name: "XtraLarge", "variation_id": "256665"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/rick-morty-cruisin-for-a-bruisin-baseball-tee/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/08/Rick-Morty-Cruisin-For-A-Bruisin-Baseball-Tee-510x510.jpg',
                        product_name: 'Rick and Morty: Cruisin’ For A Bruisin’ Baseball Tee Preorder',
                        product_short: 'Rick and Morty: Cruisin’ For A Bruisin’ Baseball Tee',
                        product_price: '£17.99',
                        product_background: '//cdn.optimizely.com/img/6087172626/8cf825500fc6437db06065ef0a64db08.jpg'
                    }, // prod 1
                    {
                        product_with_size: false,
                        product_id: 230744,
                        // Params
                        generateURL: function (prodID) {
                            return window.location.pathname + '?add-to-cart=' + prodID;
                        },
                        product_originalURL: 'https://www.merchoid.com/product/rick-morty-portal-gun/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/06/Rick-Morty-Portal-Gun-510x432.jpg',
                        product_name: 'Rick and Morty: Portal Gun Preorder',
                        product_short: 'Rick and Morty: Portal Gun',
                        product_price: '£26.99',
                        product_background: '//cdn.optimizely.com/img/6087172626/8cf825500fc6437db06065ef0a64db08.jpg'
                    }, // prod 2
                    {
                        product_with_size: false,
                        product_id: 289101,
                        // Params
                        generateURL: function (prodID) {
                            return window.location.pathname + '?add-to-cart=' + prodID;
                        },
                        product_originalURL: 'https://www.merchoid.com/product/rick-morty-pickle-rick-laser-pop-vinyl-figure/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/08/Rick-Morty-Pickle-Rick-Laser-Pop-Vinyl-Figure-510x510.jpg',
                        product_name: 'Rick and Morty: Pickle Rick Laser Pop! Vinyl Figure Preorder',
                        product_short: 'Rick and Morty: Pickle Rick Laser Pop! Vinyl Figure',
                        product_price: '£14.99',
                        product_background: '//cdn.optimizely.com/img/6087172626/8cf825500fc6437db06065ef0a64db08.jpg'
                    } // prod 3
                ],
                // --------------------------------------MARVEL--------------------------------------------------------
                "Marvel": [
                    {
                        product_with_size: true, // true if product contains multiple sizes (false otherwise e.g mugs)
                        product_id: 71569,
                        variations_in_stock: [
                            {"attribute_pa_size": "s", attribute_name: "Small", "variation_id": "71574"},
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "71573"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "71572"},
                            {"attribute_pa_size": "xl", attribute_name: "XtraLarge", "variation_id": "71571"},
                            {"attribute_pa_size": "xxl", attribute_name: "XtraXtraLarge", "variation_id": "71575"},
                            {"attribute_pa_size": "xxxl", attribute_name: "XtraXtraXtraLarge", "variation_id": "81207"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/spiderman-premium-hoodie/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2016/01/IMG_78061-510x510.jpg',
                        product_name: 'Spiderman: Premium Hoodie',
                        product_short: 'Spiderman: Premium Hoodie',
                        product_price: '£39.99',
                        product_background: '//cdn.optimizely.com/img/6087172626/8cf825500fc6437db06065ef0a64db08.jpg'
                    }, // prod 1
                    {
                        product_with_size: true,
                        product_id: 249785,
                        variations_in_stock: [
                            {"attribute_pa_size": "s", attribute_name: "Small", "variation_id": "249786"},
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "249787"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "249788"},
                            {"attribute_pa_size": "xl", attribute_name: "XtraLarge", "variation_id": "249789"},
                            {"attribute_pa_size": "xxl", attribute_name: "XtraXtraLarge", "variation_id": "249790"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/spider-man-spitting-venom-hoodie/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/07/IMG_8533-510x601.jpg',
                        product_name: 'Spider-Man: Spitting Venom Hoodie',
                        product_short: 'Spider-Man: Spitting Venom Hoodie',
                        product_price: '£46.99',
                        product_background: '//cdn.optimizely.com/img/6087172626/8cf825500fc6437db06065ef0a64db08.jpg'
                    }, // prod 2
                    {
                        product_with_size: true,
                        product_id: 213544,
                        variations_in_stock: [
                            {"attribute_pa_size": "s", attribute_name: "Small", "variation_id": "213549"},
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "213548"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "213547"},
                            {"attribute_pa_size": "xl", attribute_name: "XtraLarge", "variation_id": "213546"},
                            {"attribute_pa_size": "xxl", attribute_name: "XtraXtraLarge", "variation_id": "213545"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/guardians-of-the-galaxy-vol-2-yeah-baby-gears-shift-replica-long-sleeve-shirt/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/05/mannequin-1-510x561.jpg',
                        product_name: 'Guardians of the Galaxy Vol. 2: Yeah Baby/Gears Shift Replica Long Sleeve Shirt',
                        product_short: 'GoG Yeah Baby/Gears Shift Replica Long Sleeve Shirt',
                        product_price: '£32.99',
                        product_background: '//cdn.optimizely.com/img/6087172626/8cf825500fc6437db06065ef0a64db08.jpg'
                    } // prod 3
                ],
                // --------------------------------------DC------------------------------------------------------------
                "DC": [
                    {
                        product_with_size: true, // true if product contains multiple sizes (false otherwise e.g mugs)
                        product_id: 250238,
                        variations_in_stock: [
                            {"attribute_pa_size": "s", attribute_name: "Small", "variation_id": "250246"},
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "250245"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "250244"},
                            {"attribute_pa_size": "xl", attribute_name: "XtraLarge", "variation_id": "250243"},
                            {"attribute_pa_size": "xxl", attribute_name: "XtraXtraLarge", "variation_id": "250242"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/superman-kryptonian-khristmas-jumper/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/07/Superman-Super-Christmas-Sweater-Jumper-510x589.jpg',
                        product_name: 'Superman: Kryptonian Christmas Sweater/Jumper Preorder',
                        product_short: 'Superman: Kryptonian Christmas Sweater/Jumper',
                        product_price: '£36.99',
                        product_background: '//cdn.optimizely.com/img/6087172626/8cf825500fc6437db06065ef0a64db08.jpg'
                    }, // prod 1
                    {
                        product_with_size: true,
                        product_id: 249870,
                        variations_in_stock: [
                            {"attribute_pa_size": "s", attribute_name: "Small", "variation_id": "249878"},
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "249877"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "249876"},
                            {"attribute_pa_size": "xl", attribute_name: "XtraLarge", "variation_id": "249875"},
                            {"attribute_pa_size": "xxl", attribute_name: "XtraXtraLarge", "variation_id": "249874"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/batman-a-freeze-is-coming-christmas-sweater-jumper/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/07/Batman-Cosplay-Christmas-Jumper-510x595.jpeg',
                        product_name: 'Batman: A Freeze Is Coming Christmas Sweater/Jumper Preorder',
                        product_short: 'Batman: A Freeze Is Coming Christmas Sweater/Jumper',
                        product_price: '£36.99',
                        product_background: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/09/batman-bg.jpg'
                    }, // prod 2
                    {
                        product_with_size: true,
                        product_id: 94240,
                        variations_in_stock: [
                            {"attribute_pa_size": "s", attribute_name: "Small", "variation_id": "94242"},
                            {"attribute_pa_size": "m", attribute_name: "Medium", "variation_id": "94243"},
                            {"attribute_pa_size": "l", attribute_name: "Large", "variation_id": "94244"},
                            {"attribute_pa_size": "xl", attribute_name: "XtraLarge", "variation_id": "94245"},
                            {"attribute_pa_size": "xxl", attribute_name: "XtraXtraLarge", "variation_id": "94246"}
                        ],
                        // Params
                        generateURL: function (prodID, variationID, variationSize) {
                            return window.location.pathname + '?add-to-cart=' + prodID + '&variation_id='
                                + variationID + '&attribute_pa_size='
                                + variationSize
                        },
                        product_originalURL: 'https://www.merchoid.com/product/harley-quinn-daddy-s-lil-monster-official-replica-shirt/',
                        product_image: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2016/05/dlm3quarter-510x510.jpg',
                        product_name: 'Harley Quinn: Daddy’s Lil Monster Official Replica Shirt',
                        product_short: 'Harley Quinn: Daddy’s Lil Monster Official Replica Shirt',
                        product_price: '£19.99',
                        product_background: '//cdn.optimizely.com/img/6087172626/8cf825500fc6437db06065ef0a64db08.jpg'
                    } // prod 3
                ]
                // ----------------------------------------------------------------------------------------------------
            };
            // --------------------------------------------------------------------------------------------------------
            return brands[brandName];
        } // specificBrands
        // ------------------------------------------------------------------------------------------------------------
        // ------------------------------------------------------------------------------------------------------------
        // ------------------------------------------------------------------------------------------------------------

        // Function to get the size index specific to the product the user has selected (size values: s, m, l, xl, xxl)
        // product param references the product upon which the size selection is made (e.g thisBrand[0] --> first product in the 'Zelda' category of products)
        // The returned value will be the index of (variations_in_stock) -> which can be used to extract the required data to generate
        // the correct queries to append to the product url such that it correctly adds the right product to cart (in terms of size, specific variation id)
        function getSizeIndex(product, size) {
            var i;
            for (i = 0; i < product.variations_in_stock.length; i++) {
                if (product.variations_in_stock[i].attribute_pa_size === size) {
                    return i; // the index at which the size is found (which will be used to get addition info)
                }
            }
            return false;
        } // getSizeIndex

        // Get the 'product size' select tag and let the user choose their desired product sizes
        // based on which the correct query will be computed such that when users add to basket
        // the correct product is added (e.g a product with size 'm' is different than the same product with size 'l')

        // Params -> object: object e.g thisBrand[0]
        //           leftOrRight: string, only accepts values ('Left' or 'Right') Note: case sensitive
        function leftAndRightProducts(object, leftOrRight) {
            // Update the product displayed in the popup (both, function will be called twice...)
            $('.ME116_productImg' + leftOrRight).prop('src', object.product_image);
            $('.ME116_productName' + leftOrRight).text(object.product_name);
            $('.ME116_productPrice' + leftOrRight).html('Now: ' + object.product_price);

            if (object.product_with_size === true) {
                var $productSizeLeftOrRight = $('.ME116_productSize' + leftOrRight);
                $.ajax({
                    type: 'GET',
                    url: object.product_originalURL,
                    success: function (data) {
                        var $data = $(data);
                        var $size = $data.find('#pa_size');
                        $size.appendTo($productSizeLeftOrRight);

                        // -------------
                        // Retrieve the size for the product the user has selected
                        // This is to ensure the correct link is generated
                        var $paSizeLeftOrRight = $productSizeLeftOrRight.find('#pa_size');

                        // Get current default value selected on load
                        var attr_pa_size_leftOrRight = $paSizeLeftOrRight.val();

                        $paSizeLeftOrRight.on('change', function () {
                            attr_pa_size_leftOrRight = $(this).prop('value');
                        });
                        // -------------

                        // Event listener for the product
                        var $leftOrRightLink = $('.ME116_button' + leftOrRight);
                        $leftOrRightLink.on('click', function (e) {
                            var indexWhenClicked = getSizeIndex(object, attr_pa_size_leftOrRight);
                            if (indexWhenClicked !== false) {
                                object.product_url = object
                                    .generateURL(object.product_id, object.variations_in_stock[indexWhenClicked].variation_id,
                                        object.variations_in_stock[indexWhenClicked].attribute_pa_size);

                                // Redirect (to /cart which will be updated to contain the selected product)
                                window.location.href = object.product_url;
                            }

                        });
                    }, // success
                    error: function () {
                        alert('Something went wrong');
                    } // error
                }); // ajax
            } else { // product has no size (e.g mug)
                // Event listener for the product
                var $leftOrRightLink = $('.ME116_button' + leftOrRight);
                $leftOrRightLink.on('click', function (e) {
                        object.product_url = object.generateURL(object.product_id);

                        // Redirect (to /cart which will be updated to contain the selected product)
                        window.location.href = object.product_url;

                });
            } // else
        } // leftAndRightProducts

        // When clicking the add to cart button open the lightbox as well as add the product to cart
        $('.single_add_to_cart_button').on('click', function (e) {
            // Testing only while still not live
            // e.preventDefault();

            // send event
            sendEvent('ME116', 'User clicked add to cart', 'ME116 - Product Page Upsell', true);

            // when we're live...
            $('.variations_form, form.cart').append([
                '<input type="hidden" name="_add-to-cart-redirect" value="',
                window.location.pathname + '?uc-did-add-to-cart=1',
                '" />'
            ].join(''));

            // Testing only
            // window.location.href = $('input[name="_add-to-cart-redirect"]').attr('value');
        });

        // Check the brand the user is checking
        var $checkBrand = $('.mobile-target-product-title').text();
        var thisBrand;
        if ($checkBrand.indexOf('Zelda') > -1) {
            thisBrand = specificBrands('Zelda');
        } else if ($checkBrand.indexOf('Destiny') > -1) {
            thisBrand = specificBrands('Destiny');
        } else if ($checkBrand.indexOf('Star Wars') > -1) {
            thisBrand = specificBrands('Star Wars');
        } else if ($checkBrand.indexOf('Rick and Morty') > -1) {
            thisBrand = specificBrands('Rick and Morty');
        } else if ($('.ME114_brandSpecific > img').prop('alt') === 'Marvel' || $checkBrand.indexOf('Spiderman') > -1
                    || $checkBrand.indexOf('Spider-Man') > -1 || $checkBrand.indexOf('Guardians of the Galaxy') > -1
                    || $('.merchoid_price_framing > img').prop('src').indexOf('Marvel') > -1) {
            thisBrand = specificBrands('Marvel');
        } else if ($('.ME114_brandSpecific > img').prop('alt') === 'DC'
                    || $('.merchoid_price_framing > img').prop('src').indexOf('latest-1') > -1) {
            thisBrand = specificBrands('DC');
        } else {
            return;
        }

        // If match in url (product was added to basket) build the lightbox
        if(window.location.href.match(/uc-did-add-to-cart/)) {
            buildLightbox();

            // Add a background to the model specific to the large brands (e.g. 'Zelda' etc.)
            $('.ME116_popup_wrapper').css('background', 'url(' + thisBrand[0].product_background + ')');
            $('.woocommerce-message.message-success').hide();
            // $('.ME116_successAdd').html($('.woocommerce-message.message-success'));
        }

        // Add the left product
        // If user viewing the second product use the fallback (third product indexed to 2)
        if ($checkBrand.indexOf(thisBrand[0].product_short) > -1) {
            leftAndRightProducts(thisBrand[2], 'Left');
        } else {
            leftAndRightProducts(thisBrand[0], 'Left');
        }

        // Add the right product
        // If user viewing the second product use the fallback (third product indexed to 2)
        if ($checkBrand.indexOf(thisBrand[1].product_short) > -1) {
            leftAndRightProducts(thisBrand[2], 'Right');
        } else {
            leftAndRightProducts(thisBrand[1], 'Right');
        }

        // If user click 'x' to close lightbox take them to the cart page
        $('.mfp-close').on('click', function () {
            sendEvent('ME116', 'Lightbox closed', 'ME116 - Product Page Upsell', true);
            location.href = 'https://www.merchoid.com/cart/';
        });

        // Evt for when users add product to cart (in lightbox)
        var $addToCartBtns = $('.ME116_buttonLeft').add('.ME116_buttonRight');
        $addToCartBtns.on('click', function () {
            sendEvent('ME116', 'Lightbox product added to cart', 'ME116 - Product Page Upsell', true);
        });

        // Events
        sendEvent('ME116', 'Page View', 'ME116 - Product Page Upsell', true);

        $('.ME116_viewBasket').on('click', function () {
            sendEvent('ME116', 'User clicked view basket', 'ME116 - Product Page Upsell', true);
        });

        $('.ME116_checkoutLink').on('click', function () {
            sendEvent('ME116', 'User clicked checkout btn', 'ME116 - Product Page Upsell', true);
        });

    } // activate

}()); // _ME116