var _TP054 = (function () {
	
		//PLUGINS
	// UC Library - Poller -- @version 0.2.2 -------
	// ---------------------------------------------
	var UC=function(t){var n=n||window.jQuery;return t.poller=function(t,n,e){var o={wait:50,multiplier:1.1,timeout:0},r=Date.now||function(){return(new Date).getTime()};if(e)for(var a in e)o[a]=e[a];else e=o;for(var i=!!o.timeout&&new Date(r()+o.timeout),s=o.wait,f=o.multiplier,l=[],c=function(e,o){if(i&&r()>i)return!1;o=o||s,function(){var t=typeof e;return"function"===t?e():"string"!==t||document.querySelector(e)}()?(l.push(!0),l.length===t.length&&n()):setTimeout(function(){c(e,o*f)},o)},m=0;m<t.length;m++)c(t[m])},t.throttle=function(t,n){var e,o,r,a=null,i=0;return function(){var s=Date.now||function(){return(new Date).getTime()};s=s(),i||(i=s);var f=n-(s-i);return e=this,o=arguments,(f<=0||f>n)&&(a&&(clearTimeout(a),a=null),i=s,r=t.apply(e,o),a||(e=o=null)),r}},t.group=function(t,n){for(var e=[],o=0;o<t.length;o+=n)e.push(t.slice(o,o+n));return e},t.hoverDelay=function(t,e,o){if(!n)return!1;var r,a,i=Date.now||function(){return(new Date).getTime()};return o||(o=1e3),n(t).hover(function(){a=i()},function(){r||i()-a>=o&&(e(),r=!0)}),t},t.observer={active:[],connect:function(t,n,e){var o={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(e)for(var r in e)o[r]=e[r];else e=o;for(var a,i=new MutationObserver(function(e){e.forEach(function(e){a||(a=!0,n(t,e),setTimeout(function(){a=!1},o.throttle))})}),s=0;s<t.length;s++)i.observe(t[s],o.config),this.active.push([t[s],i])},disconnect:function(t){for(var n=this.active,e=0;e<t.length;e++)for(var o=t[e],r=0;r<n.length;r++)o===n[r][0]&&n[r][1].disconnect()}},t.feedbackTab=function(){if(!n)return!1;var t,e,o,r,a,i,s,f=function(n){var e=t||{label:!1,content:!1,position:"left",customClass:!1,sessionClose:!0,tabDimensions:{height:"auto",width:"350px"},contentDimensions:{height:"350px",width:"600px"},mobileBreakpoint:768,animationSpeed:600,dimBackground:!1,zIndex:99999};if(n)for(var o in n)e[o]=n[o];else n=e;return e},l=function(){var e=n(['<div class="UC_fb-tab-container">','<div class="UC_fb-tab">','<span class="UC_fb-tab__inner"></span>','<span class="UC_fb-tab__close">&#215;</span>',"</div>",'<div class="UC_fb-content">','<div class="UC_fb-content__inner"></div>',"</div>","</div>"].join("")),r=e.find(".UC_fb-tab"),a=e.find(".UC_fb-content");return t.label&&r.find(".UC_fb-tab__inner").html(t.label),t.content&&a.find(".UC_fb-content__inner").html(t.content),t.customClass&&e.addClass(t.customClass),t.dimBackground&&(o=n('<div class="UC_fb-tab-bg"></div>')),r.css({height:t.tabDimensions.height,width:t.tabDimensions.width}),a.css({height:t.contentDimensions.height,width:t.contentDimensions.width}),e},c=function(){e&&e.remove(),o&&o.remove()},m=function(){var n,e;switch(t.position){case"left":n="-webkit-transform:rotate(-90deg) translateX(-50%);-moz-transform:rotate(-90deg) translateX(-50%);-ms-transform:rotate(-90deg) translateX(-50%);-o-transform:rotate(-90deg) translateX(-50%);transform:rotate(-90deg) translateX(-50%);transform-origin:top left;top:50%;left:100%;",e="top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);left:-100%;",s="width";break;case"right":n="-webkit-transform:rotate(-90deg) translateY(-100%);-moz-transform:rotate(-90deg) translateY(-100%);-ms-transform:rotate(-90deg) translateY(-100%);-o-transform:rotate(-90deg) translateY(-100%);transform:rotate(-90deg) translateY(-100%);transform-origin:top right;right:100%;",e="top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);right:-100%;",s="width";break;case"bottom":n="-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:100%;left:50%;",e="left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:-100%;",s="height";break;case"top":n="-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:100%;left:50%;",e="left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:-100%;",s="height";break;default:n="",e="",s="width"}var o=document.createElement("style");o.type="text/css";var r=".UC_fb-tab,.UC_fb-tab__close{display:inline-block;cursor:pointer}.UC_fb-content,.UC_fb-tab{max-width:100%;max-height:100%;box-sizing:border-box;background:#fff}.UC_fb-tab-container{position:fixed;z-index:"+t.zIndex+";"+e+"}.UC_fb-tab{position:absolute;margin:0 auto;text-align:center;z-index:"+t.zIndex+";color:#333;font-size:15px;padding:10px 10px 10px 20px;"+n+"}.UC_fb-tab__inner{display:inline-block;margin:0 auto}.UC_fb-tab__close{position:absolute;right:10px;font-family:sans-serif}.UC_fb-content{padding:20px;text-align:left;position:relative;}.UC_fb-tab-bg{display:none;background:#000;opacity:0.7;position:fixed;top:0;right:0;bottom:0;left:0;z-index:"+(t.zIndex-1)+";}";return o.styleSheet?o.styleSheet.cssText=r:o.appendChild(document.createTextNode(r)),o},d=function(){r&&r.parentElement.removeChild(r)},u=function(){var t=n(".UC_fb-tab-container"),e=t.children(".UC_fb-tab"),o=t.children(".UC_fb-content"),r=n(window);return{window:{width:r.innerWidth(),height:r.innerHeight()},tab:{width:e.outerWidth(),height:e.outerHeight()},content:{width:o.outerWidth(),height:o.outerHeight()}}},b=function(n){n||(n=u()),t||(t=f());var e={remove:{},open:{},close:{}};return e.remove[t.position]="-100%",e.open[t.position]="0",e.close[t.position]="-"+n.content[s]+"px",e},h=function(n){if(!n)return!1;var e=n.find(".UC_fb-tab"),r=n.find(".UC_fb-content"),s="closed";e.click(function(){var e,f,l;i=u(),a=b(i),e=i.window.width-i.tab.height-5,f=i.window.height-i.tab.height-5,r.css({"max-width":e,"max-height":f}),i.content.width>e&&(i.content.width=e),i.content.height>f&&(i.content.height=f),"open"===s?(l=a.close,o&&o.fadeOut()):(l=a.open,o&&o.fadeIn()),n.animate(l,t.animationSpeed,function(){s="open"===s?"closed":"open"})}),e.find(".UC_fb-tab__close").click(function(e){e.stopPropagation(),o&&o.fadeOut(),n.animate(a.remove,t.animationSpeed),t.sessionClose&&window.sessionStorage.setItem("ucfbtab-closed",1)})};return{init:function(n){var c=f(n);t!==c&&(t=c),t.sessionClose&&window.sessionStorage.getItem("ucfbtab-closed")||(e=l(),r=m(),e.prependTo("body"),document.body.insertBefore(r,e[0]),t.dimBackground&&e.before(o),i=u(),a=b(i),h(e),e.css(t.position,"-"+i.content[s]+"px"))},destroy:{component:c,css:d,all:function(){c(),d()}},refresh:function(t){this.destroy.all(),this.init(t)}}}(),t}(UC||{});
	
	// Send GA Events With Tracker Name ------------
	// ---------------------------------------------
	function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;
	
		
	  // -----------------------------------------------
	  // Full story integration
	 // -----------------------------------------------
		UC.poller([
			function () {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'TP054',
				variation_str: 'Variation 1'
			});
		}, {
			multiplier: 1.2,
			timeout: 0
		});

		// Poll start
		UC.poller([
			'body',
			'#products',
			'.prod_info',
			function () {
				if (window.jQuery) return true;
			},
			function () {
				if (window.ga) return true;
			}
		], TP054, {
			timeout: 7000,
			multiplier: 'disable'
		});
		// Variation
		function TP054() {

			var $ = window.jQuery;
			$('body').addClass('TP054');

			sendEvent('TP054', 'Page View', 'TP054 - Technical Specs - PLP', true);

			/*-------------------------------
			Create Tech Spec Link, add to each product
			---------------------------------*/
			var techSpeclink = $('<div class="tp54-techlink">View technical specifications</div>');

			var products = $('.list_view #products .prod');

			if (products) {
				products.each(function () {
					/*create link, get each products URL for ajax request*/
					var techSpeclink = $(['<div class="tp54-techlink">',
						'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoMAQdVjS46AAAEpUlEQVRo3s3Zy2tVVxQG8J/mYoKPJC2iNZCigoIT0ZKJbdRUHGakCE7tPyA4E8WgE5GKE6UgQtGpTivoIFa0ooiUooIgOFFji6KtQWpijKuDu+/tSc+5r6i9fmdyztrr8e2zX2vvTevosNcD8Z/ngb06ZuFtFjiUC155DrXubE7LFnP9qdsvfvRuhvQ7g8Z9NkP6UdAvhK05+VYh9Lden1ZRbue3OfnbTOkHIrDEgJ6c9MsG/+e/6DFgScvV1OWkECbsqcpKthtN3W0oZzGUSkZty/yHPSaEcFJXa+EvZPr2YSxzwOP0PeGiVTmbVS6mYOGR/Zbi+4yXC81TqIQ/Zb1LQrjujRBeOWunRTUtF9nprFdCmHRDCJesd6oVCpXwP5iD+S6nGow7qLupCnQ7aDxZXTYfc/zQLIWZ4WGBK147anErbWixo167YkH6bpJCPjwstLKl4BWstDDz1RSFUwXhPxwqFE7VUuhLxR8nfJlCuYp9xcVfC2H9RwsP64XwdZbTv+j1h04/G/Z3E67WWa1PH5544r7fmrCZ7yffmvSFv4oV9qShs6Cumw2Oe5hbih86bkNduwVpSO+pp1Seu67M6L9ZrHU+E/S5u+56npGct7aG5UJXqvNqXdwQXhcOvA7HTAthzAlbdFZLOm1xwpgQph0rXBNXei1cbxR+qUnhaEFJT5ojntltXqHtPLs9S2O9p6D8qPDGsvoE9gvjBbNejztCOFd1vcIOR4wadcQOK6p654Rwp4DCYuPCgXrhOzwSDhbILwjv7Evfw4WdcDiV7vNOuFDQEAeFx0q1CWwTXhUsOceESOF7nUkhp9x22mm3TSXJGb2JQgjHcn66vRK21yYwKpzNSdeaFs6BwdTVbhrMzOldBt1M3XMQnBOmC0bEWWE0H3iufsttFMLOXOl54Zke9BoTpowU/MaSEVPCmF70eCacz2ntFMImy/VX0sEOh7ystuRELt3YIITd4IwwZWPNP7jRlHAG7BYiNzUtqmZN4aVDOtg7oytdzDk9LoyZh2EhjKiHESEMY54x4XhO4+KMeHt5IFy11WabbS7I9R4KJ6pvN+v1YZTcFB6CE9W3LFYZMmTIVleFB4Swq6bDdULYghVCpC5WD4NCWIEtQlhXU3OXEOWOEDWVVoNrGMBbtxoSuOVt0r6W8VCEoPHOqA8vTCaX90w0JDDhXtKe9CJ5qINmCPxOcvlrw/CS1gDJ8j0JfHQ0IvCEtH7dwldN+fwqaZctn7w/gc91JpdrmtjbdFmTtDt93iyB2nnwffBNcllKbVsPA0pJ+5uMhyKkqG2fiNo+Fbd9MaKyHG9qz3KcRdsSkgq2tzslK3nc3qSUA+1Ny1nmTXs3Jlxv79bscHs3p23Ynn9SBxRtOaLJou2HVG0/pvsEDirbflSbp/C/H1ZnKfx7XH/DpFaP69+4blbH9VkK5ed7LLXfo2rW1OjC4rEDlqnMqy1fWJQp5K9sOmxr6spme2bBneWVTRnFl1Yb6xLYlJM3uLSqlxw89bRA+qgu6Xwa/rL+jrr1veF0DeKlTGkLKLVqYMy4biP6c1e3jBtr2d8s8EEvr2eDD3p9/w+WW1C9x1w+OQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNC0yNlQxMjowMTowNyswMjowMAxaXEgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDQtMjZUMTI6MDE6MDcrMDI6MDB9B+T0AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="/>',
						'<span>View technical specifications</span>',
						'</div>',

						'<div class="tp54-techBox"/>'
					].join(''));

					$(this).find('.prod_info .bold').append(techSpeclink);

				});



				//*-------------------------------
				//Loop through each product listing and do AJAX on click 
				//---------------------------------*/

				products.each(function () {
					var showTechlink = $(this).find('.tp54-techlink');
					var showTechSpec;
					showTechlink.on('click', function (e) {

						var productURL = $(this).closest('.prod_info').find('a').attr('href');

						/*EVENT*/
						if (!showTechSpec) {
							sendEvent('TP054', 'click', 'TP054 user clicked show technical specifications', true);
							showTechSpec = true;
						}


						/*-------------------------------	
						Ajax to get tech spec using product URL
						---------------------------------*/

						/*if tech spec has alread been loading in activate the sliding function & change text*/
						if (showTechlink.next('.tp54-techBox').find('.prod_content').length) {

							showTechlink.next().slideToggle();

							if (showTechlink.find('span').text() === 'Hide technical specifications') {
								showTechlink.find('span').text('View technical specifications');

							} else {
								showTechlink.find('span').text('Hide technical specifications');
							}

						} else { //If tech spec hasnt loaded in and is not in process of being loaded in show it
							if (!showTechlink.hasClass('tp54-inprogress')) {

								showTechlink.addClass('tp54-inprogress');
								showTechlink.append('<img src="http://sb.monetate.net/img/1/581/1180676.gif" class="tp54-loader"/>');
								$.ajax({
									url: productURL,
									success: function (data) {
										var d = document.createElement('div');
										d.innerHTML = data;

										var technicalSpecifications = $(d).find('#tab-techspecs');
										showTechlink.next('.tp54-techBox').empty().append(technicalSpecifications);
										showTechlink.removeClass('tp54-techbox');
										$('.tp54-loader').remove();
										showTechlink.find('span').text('Hide technical specifications');
									}

								});

							}

						}

					});

				});
			}

		}

})();