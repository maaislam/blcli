var _acfeedback = (function () {
	
		var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
			
		 var trackerName;
			function sendEvent(action, label, nonInteractionValue) {
				var category = 'PD003---Desktop-Category';
				label = label || '';
				nonInteractionValue = nonInteractionValue || true;
		
				ga('send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
			}
		
	  
			
			// -----------------------------------------------
			// Full story integration
			// -----------------------------------------------
			UC.poller([
				function() {
					var fs = window.FS;
					if (fs && fs.setUserVars) return true;
				}
			], function () {
				window.FS.setUserVars({
					experiment_str: 'ACfeedback',
					variation_str: 'Variation 1'
				});
			}, { multiplier: 1.2, timeout: 0 });
		
			// Poll start
			UC.poller([
				'body',
				function() {
					if (window.jQuery) return true;
				},
				function() {
					if (window.ga) return true;
				}
			], ACFBT, {
				timeout: 7000,
				multiplier: 'disable'
			});
			function ACFBT() {
				var $ = window.jQuery;
		
			 $('body').addClass('ACFeedback');

			 var feedbackTab = $(['<div class="ac-feedbackTab">Feedback</div>',
									 '<div class="ac-feedbackbox">',
										'<div class="ac-exit">x</div>',
										'<div style="display:none;" id="thankyou_message">',
										'<h2>Thankyou for your feedback!</h2>',
									  '</div>',
									  		'<div id="acfeedbackTabtext">',
										   	 "<h3>We'd love to hear your feedback!</h3>",
												"<p>Please let us know any feedback you have about our website. We appreciate it all!</p>",
											'</div>',
												'<form id="gform" method="POST" action="https://script.google.com/macros/s/AKfycbzwvgcqCH5FKE8j5jIBQA6EGXmHbxPxmMsQC6UI5Zxk5D2hftZy/exec">',
													'<textarea name ="message" value="feedback" class="acfeedbacktext" id="messagerow" rows="6" cols="30"></textarea>',
													'<div id="messageError">Please enter a message</div>',
													'<button type="submit" value="submit">Submit</button>',
												"<form>",
										"</div>",
									 "</div>"].join(''));




			 feedbackTab.prependTo('body');

	
			 function validEmail(message) { // see:
				var re = /^$/;
				return re.test(message);
			}
			  // get all data in form and return object
			  function getFormData() {
				var elements = document.getElementById("gform").elements; // all form elements
				var fields = Object.keys(elements).map(function(k) {
				  if(elements[k].name !== undefined) {
					return elements[k].name;
				  // special case for Edge's html collection
				  }else if(elements[k].length > 0){
					return elements[k].item(0).name;
				  }
				}).filter(function(item, pos, self) {
				  return self.indexOf(item) == pos && item;
				});
				var data = {};
				fields.forEach(function(k){
				  data[k] = elements[k].value;
				  var str = ""; // declare empty string outside of loop to allow
								// it to be appended to for each item in the loop
				  if(elements[k].type === "checkbox"){ // special case for Edge's html collection
					str = str + elements[k].checked + ", "; // take the string and append 
															// the current checked value to 
															// the end of it, along with 
															// a comma and a space
					data[k] = str.slice(0, -2); // remove the last comma and space 
												// from the  string to make the output 
												// prettier in the spreadsheet
				  }else if(elements[k].length){
					for(var i = 0; i < elements[k].length; i++){
					  if(elements[k].item(i).checked){
						str = str + elements[k].item(i).value + ", "; // same as above
						data[k] = str.slice(0, -2);
					  }
					}
				  }
				});
				console.log(data);
				return data;
			  }
			  
			  function handleFormSubmit(event) {  // handles form submit withtout any jquery
				event.preventDefault();           // we are submitting via xhr below
				var data = getFormData();         // get the values submitted in the form
			  
				/* OPTION: Remove this comment to enable SPAM prevention, see README.md
				if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
				  return false;
				}
				*/
				if(validEmail(data.message) ) {   // if email is not valid show error
					$('#messageError').css({'display':'block'});
					$('#messageError').css({'color':'red'});
					return false;
				} else {


			    var url = event.target.action;  //
				  var xhr = new XMLHttpRequest();
				  xhr.open('POST', url);
				  // xhr.withCredentials = true;
				  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				  xhr.onreadystatechange = function() {
					  document.getElementById('gform').style.display = 'none'; // hide form
					  document.getElementById('thankyou_message').style.display = 'block';
					  document.getElementById('acfeedbackTabtext').style.display = 'none';
                      
					setTimeout(function(){
						$('.ac-feedbackTab').removeClass('ac-hidden');
						$('.ac-feedbackbox').removeClass('ac-ftvisible');
					},4000);

					  return;
				  };
				  // url encode form data for sending as post data
				  var encoded = Object.keys(data).map(function(k) {
					  return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
				  }).join('&')
				  xhr.send(encoded);
				}

			}
		
	
	
			  
			  function loaded() {
				
				// bind to the submit event of our form
				var form = document.getElementById('gform');
				form.addEventListener("submit", handleFormSubmit, false);
				};
				
       loaded();


			 $('.ac-feedbackTab').click(function(){
				$('.ac-feedbackbox').addClass('ac-ftvisible');
				$(this).addClass('ac-hidden');
			 });

			 $('.ac-exit').click(function(){
				$('.ac-feedbackTab').removeClass('ac-hidden');
				$('.ac-feedbackbox').removeClass('ac-ftvisible');
			 });
		
			}

	})();
	