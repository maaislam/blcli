var displayWebsiteMarkup = [
    '<div class="col-xs-12 col-sm-4 col-md-12 AC005B_input-wrap">',
        '<div class="AC005B_web-redirect"><a href="#">Visit Website</a></div>',
        '<div class="AC005B_redirecting">Redirecting...</div>',
        '<div class="AC005B-preload-content">',
            '<p class="AC005B_error">The company name must not be empty.</p>',
            '<div class="AC005B_input-inner">',
                '<input type="text" placeholder="Company Name" />',
                '<a href="#" class="AC005B_show-web">Show</a>',
            '</div>',
            '<p>Entering your company name lets the recruiter know where you found their details.</p>',
            '<p>We WILL NOT ask you to leave your own name or contact information.</p>',
        '</div>',
        '<div class="AC005B_pre-cover">',
            '<div class="AC005B_loader-wrapper">',
                '<div class="AC005B_loader">',
                    '<div class="AC005B_roller"></div>',
                    '<div class="AC005B_roller"></div>',
                '</div>',
                '<div id="AC005B_loader2" class="AC005B_loader">',
                    '<div class="AC005B_roller"></div>',
                    '<div class="AC005B_roller"></div>',
                '</div>',
                '<div id="AC005B_loader3" class="AC005B_loader">',
                    '<div class="AC005B_roller"></div>',
                    '<div class="AC005B_roller"></div>',
                '</div>',
            '</div>',
        '</div>',
    '</div>'
].join('');

export default displayWebsiteMarkup

<style type="text/css">
body.AC005B {
  overflow-y: scroll !important; }
  body.AC005B.AC005B_overflow {
    overflow-y: hidden !important; }
  body.AC005B .AC005B-preload-content {
    position: relative;
    z-index: 20; }
  body.AC005B .AC005B_redirecting {
    display: none;
    position: absolute;
    z-index: 40;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 20px; }
  body.AC005B .AC005B_web-redirect {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 25;
    font-size: 24px;
    line-height: 54px;
    height: 100%; }
    body.AC005B .AC005B_web-redirect a {
      display: inline-block;
      width: -webkit-calc(100% - 40px);
      width: -moz-calc(100% - 40px);
      width: calc(100% - 40px);
      color: #fff;
      background: #46A35E;
      text-align: center;
      top: 50%;
      position: absolute;
      left: 20px;
      margin-top: -27px;
      border: 1px solid #46A35E;
      -webkit-transition-property: background, color;
      -moz-transition-property: background, color;
      -o-transition-property: background, color;
      transition-property: background, color;
      -webkit-transition-duration: 200ms;
      -moz-transition-duration: 200ms;
      -o-transition-duration: 200ms;
      transition-duration: 200ms;
      -webkit-transition-timing-function: ease-in-out;
      -moz-transition-timing-function: ease-in-out;
      -o-transition-timing-function: ease-in-out;
      transition-timing-function: ease-in-out; }
      body.AC005B .AC005B_web-redirect a:hover {
        background: transparent;
        color: #46A35E; }
  body.AC005B .AC005B_input-wrap {
    border-bottom: 1px solid #316CA9;
    background: #E0EEF5;
    padding: 20px 15px;
    display: none; }
    body.AC005B .AC005B_input-wrap .AC005B_input-inner {
      position: relative;
      border: 1px solid #000; }
      body.AC005B .AC005B_input-wrap .AC005B_input-inner input {
        width: -webkit-calc(100% - 142px);
        width: -moz-calc(100% - 142px);
        width: calc(100% - 142px);
        height: 40px;
        border: none;
        padding: 0 15px; }
      body.AC005B .AC005B_input-wrap .AC005B_input-inner .AC005B_show-mobile,
      body.AC005B .AC005B_input-wrap .AC005B_input-inner .AC005B_show-web {
        display: block;
        height: 100%;
        background: #BBD9E9;
        position: absolute;
        right: 0;
        top: 0;
        line-height: 42px;
        text-transform: uppercase;
        color: black;
        border-left: 1px solid black;
        width: 142px;
        text-align: center;
        -webkit-transition-property: background;
        -moz-transition-property: background;
        -o-transition-property: background;
        transition-property: background;
        -webkit-transition-duration: 200ms;
        -moz-transition-duration: 200ms;
        -o-transition-duration: 200ms;
        transition-duration: 200ms;
        -webkit-transition-timing-function: ease-in-out;
        -moz-transition-timing-function: ease-in-out;
        -o-transition-timing-function: ease-in-out;
        transition-timing-function: ease-in-out; }
        body.AC005B .AC005B_input-wrap .AC005B_input-inner .AC005B_show-mobile:hover,
        body.AC005B .AC005B_input-wrap .AC005B_input-inner .AC005B_show-web:hover {
          background: #d8f1fd; }
    body.AC005B .AC005B_input-wrap p {
      font-size: 10px;
      line-height: 12px;
      margin: 10px 0 0 0; }
    body.AC005B .AC005B_input-wrap .AC005B-preload-content {
      opacity: 0;
      -webkit-transition-property: opacity;
      -moz-transition-property: opacity;
      -o-transition-property: opacity;
      transition-property: opacity;
      -webkit-transition-duration: 400ms;
      -moz-transition-duration: 400ms;
      -o-transition-duration: 400ms;
      transition-duration: 400ms;
      -webkit-transition-timing-function: ease-in-out;
      -moz-transition-timing-function: ease-in-out;
      -o-transition-timing-function: ease-in-out;
      transition-timing-function: ease-in-out; }
    body.AC005B .AC005B_input-wrap.AC005B_loaded .AC005B-preload-content {
      opacity: 1; }
    body.AC005B .AC005B_input-wrap.AC005B_loaded .AC005B_loader-wrapper {
      opacity: 0; }
    body.AC005B .AC005B_input-wrap.AC005B_number-show .AC005B-preload-content,
    body.AC005B .AC005B_input-wrap.AC005B_number-show .AC005B_loader-wrapper {
      opacity: 0; }
  body.AC005B #contact-form-container {
    display: none; }
  body.AC005B.AC005B_email-click #contact-form-container {
    display: block; }
  body.AC005B p.AC005B_error {
    display: none;
    margin: 0;
    padding-bottom: 10px;
    color: #a94442;
    font-size: 13px; }
  body.AC005B .AC005B_tel-number {
    display: none;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    z-index: 25;
    text-align: center;
    font-size: 50px;
    line-height: 40px;
    margin-top: -20px;
    color: black; }
  @media (min-width: 768px) and (max-width: 991px) {
    body.AC005B .AC005B_input-wrap {
      width: 100%;
      position: absolute;
      bottom: 98px;
      border: none;
      z-index: 10;
      border: 1px solid;
      left: 50%;
      -webkit-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75); } }

.AC005B_pre-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10; }
  .AC005B_preload-anim .AC005B_pre-cover {
    z-index: 30; }

.AC005B_loader-wrapper {
  -webkit-transition-property: opacity;
  -moz-transition-property: opacity;
  -o-transition-property: opacity;
  transition-property: opacity;
  -webkit-transition-duration: 400ms;
  -moz-transition-duration: 400ms;
  -o-transition-duration: 400ms;
  transition-duration: 400ms;
  -webkit-transition-timing-function: ease-in-out;
  -moz-transition-timing-function: ease-in-out;
  -o-transition-timing-function: ease-in-out;
  transition-timing-function: ease-in-out;
  width: 148px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -45px;
  margin-left: -74px;
  opacity: 1; }

.AC005B_loader {
  width: 148px;
  height: 100px;
  top: 0;
  left: 0;
  position: absolute; }
  .AC005B_loader:after {
    content: "";
    top: auto;
    position: absolute;
    display: block;
    bottom: 0em;
    left: 0;
    height: .25em;
    width: 1em;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-color: #034466;
    opacity: 0.3; }
    .AC005B_preload-anim .AC005B_loader:after {
      -webkit-animation: shadow 1.2s infinite linear;
      -o-animation: shadow 1.2s infinite linear;
      animation: shadow 1.2s infinite linear;
      -moz-animation: shadow 1.2s infinite linear; }

.AC005B_roller,
.AC005B_roller:last-child {
  width: 70px;
  height: 70px;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -ms-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  transform: rotate(135deg); }
  .AC005B_preload-anim .AC005B_roller, .AC005B_preload-anim
  .AC005B_roller:last-child {
    -webkit-animation: rollercoaster 1.2s infinite linear;
    -o-animation: rollercoaster 1.2s infinite linear;
    animation: rollercoaster 1.2s infinite linear;
    -moz-animation: rollercoaster 1.2s infinite linear; }

.AC005B_roller:last-child {
  left: auto;
  right: 0;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg); }
  .AC005B_preload-anim .AC005B_roller:last-child {
    -o-animation: rollercoaster2 1.2s infinite linear;
    animation: rollercoaster2 1.2s infinite linear;
    -webkit-animation: rollercoaster2 1.2s infinite linear;
    -moz-animation: rollercoaster2 1.2s infinite linear; }

.AC005B_roller:before,
.AC005B_roller:last-child:before {
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  background: #000;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%; }

@-webkit-keyframes rollercoaster {
  0% {
    -webkit-transform: rotate(135deg); }
  8% {
    -webkit-transform: rotate(240deg); }
  20% {
    -webkit-transform: rotate(300deg); }
  40% {
    -webkit-transform: rotate(380deg); }
  45% {
    -webkit-transform: rotate(440deg); }
  50% {
    -webkit-transform: rotate(495deg);
    opacity: 1; }
  50.1% {
    -webkit-transform: rotate(495deg);
    opacity: 0; }
  100% {
    -webkit-transform: rotate(495deg);
    opacity: 0; } }

@-webkit-keyframes rollercoaster2 {
  0% {
    opacity: 0; }
  49.9% {
    opacity: 0; }
  50% {
    opacity: 1;
    -webkit-transform: rotate(-45deg); }
  58% {
    -webkit-transform: rotate(-160deg); }
  70% {
    -webkit-transform: rotate(-240deg); }
  80% {
    -webkit-transform: rotate(-300deg); }
  90% {
    -webkit-transform: rotate(-340deg); }
  100% {
    -webkit-transform: rotate(-405deg); } }

@-webkit-keyframes shadow {
  0% {
    opacity: .3;
    -webkit-transform: translateX(65px) scale(0.5, 0.5); }
  8% {
    -webkit-transform: translateX(30px) scale(2, 2); }
  13% {
    -webkit-transform: translateX(0px) scale(1.3, 1.3); }
  30% {
    -webkit-transform: translateX(-15px) scale(0.5, 0.5);
    opacity: 0.1; }
  50% {
    -webkit-transform: translateX(60px) scale(1.2, 1.2);
    opacity: 0.3; }
  60% {
    -webkit-transform: translateX(130px) scale(2, 2);
    opacity: 0.05; }
  65% {
    -webkit-transform: translateX(145px) scale(1.2, 1.2); }
  80% {
    -webkit-transform: translateX(120px) scale(0.5, 0.5);
    opacity: 0.1; }
  90% {
    -webkit-transform: translateX(80px) scale(0.8, 0.8); }
  100% {
    -webkit-transform: translateX(60px);
    opacity: 0.3; } }

@-moz-keyframes rollercoaster {
  0% {
    -moz-transform: rotate(135deg); }
  8% {
    -moz-transform: rotate(240deg); }
  20% {
    -moz-transform: rotate(300deg); }
  40% {
    -moz-transform: rotate(380deg); }
  45% {
    -moz-transform: rotate(440deg); }
  50% {
    -moz-transform: rotate(495deg);
    opacity: 1; }
  50.1% {
    -moz-transform: rotate(495deg);
    opacity: 0; }
  100% {
    -moz-transform: rotate(495deg);
    opacity: 0; } }

@-moz-keyframes rollercoaster2 {
  0% {
    opacity: 0; }
  49.9% {
    opacity: 0; }
  50% {
    opacity: 1;
    -moz-transform: rotate(-45deg); }
  58% {
    -moz-transform: rotate(-160deg); }
  70% {
    -moz-transform: rotate(-240deg); }
  80% {
    -moz-transform: rotate(-300deg); }
  90% {
    -moz-transform: rotate(-340deg); }
  100% {
    -moz-transform: rotate(-405deg); } }

@-moz-keyframes shadow {
  0% {
    opacity: .3;
    -moz-transform: translateX(65px) scale(0.5, 0.5); }
  8% {
    -moz-transform: translateX(30px) scale(2, 2); }
  13% {
    -moz-transform: translateX(0px) scale(1.3, 1.3); }
  30% {
    -moz-transform: translateX(-15px) scale(0.5, 0.5);
    opacity: 0.1; }
  50% {
    -moz-transform: translateX(60px) scale(1.2, 1.2);
    opacity: 0.3; }
  60% {
    -moz-transform: translateX(130px) scale(2, 2);
    opacity: 0.05; }
  65% {
    -moz-transform: translateX(145px) scale(1.2, 1.2); }
  80% {
    -moz-transform: translateX(120px) scale(0.5, 0.5);
    opacity: 0.1; }
  90% {
    -moz-transform: translateX(80px) scale(0.8, 0.8); }
  100% {
    -moz-transform: translateX(60px);
    opacity: 0.3; } }

@-o-keyframes rollercoaster {
  0% {
    -o-transform: rotate(135deg);
    transform: rotate(135deg); }
  8% {
    -o-transform: rotate(240deg);
    transform: rotate(240deg); }
  20% {
    -o-transform: rotate(300deg);
    transform: rotate(300deg); }
  40% {
    -o-transform: rotate(380deg);
    transform: rotate(380deg); }
  45% {
    -o-transform: rotate(440deg);
    transform: rotate(440deg); }
  50% {
    -o-transform: rotate(495deg);
    transform: rotate(495deg);
    opacity: 1; }
  50.1% {
    -o-transform: rotate(495deg);
    transform: rotate(495deg);
    opacity: 0; }
  100% {
    -o-transform: rotate(495deg);
    transform: rotate(495deg);
    opacity: 0; } }

@keyframes rollercoaster {
  0% {
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -o-transform: rotate(135deg);
    transform: rotate(135deg); }
  8% {
    -webkit-transform: rotate(240deg);
    -moz-transform: rotate(240deg);
    -o-transform: rotate(240deg);
    transform: rotate(240deg); }
  20% {
    -webkit-transform: rotate(300deg);
    -moz-transform: rotate(300deg);
    -o-transform: rotate(300deg);
    transform: rotate(300deg); }
  40% {
    -webkit-transform: rotate(380deg);
    -moz-transform: rotate(380deg);
    -o-transform: rotate(380deg);
    transform: rotate(380deg); }
  45% {
    -webkit-transform: rotate(440deg);
    -moz-transform: rotate(440deg);
    -o-transform: rotate(440deg);
    transform: rotate(440deg); }
  50% {
    -webkit-transform: rotate(495deg);
    -moz-transform: rotate(495deg);
    -o-transform: rotate(495deg);
    transform: rotate(495deg);
    opacity: 1; }
  50.1% {
    -webkit-transform: rotate(495deg);
    -moz-transform: rotate(495deg);
    -o-transform: rotate(495deg);
    transform: rotate(495deg);
    opacity: 0; }
  100% {
    -webkit-transform: rotate(495deg);
    -moz-transform: rotate(495deg);
    -o-transform: rotate(495deg);
    transform: rotate(495deg);
    opacity: 0; } }

@-o-keyframes rollercoaster2 {
  0% {
    opacity: 0; }
  49.9% {
    opacity: 0; }
  50% {
    opacity: 1;
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg); }
  58% {
    -o-transform: rotate(-160deg);
    transform: rotate(-160deg); }
  70% {
    -o-transform: rotate(-240deg);
    transform: rotate(-240deg); }
  80% {
    -o-transform: rotate(-300deg);
    transform: rotate(-300deg); }
  90% {
    -o-transform: rotate(-340deg);
    transform: rotate(-340deg); }
  100% {
    -o-transform: rotate(-405deg);
    transform: rotate(-405deg); } }

@keyframes rollercoaster2 {
  0% {
    opacity: 0; }
  49.9% {
    opacity: 0; }
  50% {
    opacity: 1;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg); }
  58% {
    -webkit-transform: rotate(-160deg);
    -moz-transform: rotate(-160deg);
    -o-transform: rotate(-160deg);
    transform: rotate(-160deg); }
  70% {
    -webkit-transform: rotate(-240deg);
    -moz-transform: rotate(-240deg);
    -o-transform: rotate(-240deg);
    transform: rotate(-240deg); }
  80% {
    -webkit-transform: rotate(-300deg);
    -moz-transform: rotate(-300deg);
    -o-transform: rotate(-300deg);
    transform: rotate(-300deg); }
  90% {
    -webkit-transform: rotate(-340deg);
    -moz-transform: rotate(-340deg);
    -o-transform: rotate(-340deg);
    transform: rotate(-340deg); }
  100% {
    -webkit-transform: rotate(-405deg);
    -moz-transform: rotate(-405deg);
    -o-transform: rotate(-405deg);
    transform: rotate(-405deg); } }

@-o-keyframes shadow {
  0% {
    opacity: .3;
    -o-transform: translateX(65px) scale(0.5, 0.5);
    transform: translateX(65px) scale(0.5, 0.5); }
  8% {
    -o-transform: translateX(30px) scale(2, 2);
    transform: translateX(30px) scale(2, 2); }
  13% {
    -o-transform: translateX(0px) scale(1.3, 1.3);
    transform: translateX(0px) scale(1.3, 1.3); }
  30% {
    -o-transform: translateX(-15px) scale(0.5, 0.5);
    transform: translateX(-15px) scale(0.5, 0.5);
    opacity: 0.1; }
  50% {
    -o-transform: translateX(60px) scale(1.2, 1.2);
    transform: translateX(60px) scale(1.2, 1.2);
    opacity: 0.3; }
  60% {
    -o-transform: translateX(130px) scale(2, 2);
    transform: translateX(130px) scale(2, 2);
    opacity: 0.05; }
  65% {
    -o-transform: translateX(145px) scale(1.2, 1.2);
    transform: translateX(145px) scale(1.2, 1.2); }
  80% {
    -o-transform: translateX(120px) scale(0.5, 0.5);
    transform: translateX(120px) scale(0.5, 0.5);
    opacity: 0.1; }
  90% {
    -o-transform: translateX(80px) scale(0.8, 0.8);
    transform: translateX(80px) scale(0.8, 0.8); }
  100% {
    -o-transform: translateX(60px);
    transform: translateX(60px);
    opacity: 0.3; } }

@keyframes shadow {
  0% {
    opacity: .3;
    -webkit-transform: translateX(65px) scale(0.5, 0.5);
    -moz-transform: translateX(65px) scale(0.5, 0.5);
    -o-transform: translateX(65px) scale(0.5, 0.5);
    transform: translateX(65px) scale(0.5, 0.5); }
  8% {
    -webkit-transform: translateX(30px) scale(2, 2);
    -moz-transform: translateX(30px) scale(2, 2);
    -o-transform: translateX(30px) scale(2, 2);
    transform: translateX(30px) scale(2, 2); }
  13% {
    -webkit-transform: translateX(0px) scale(1.3, 1.3);
    -moz-transform: translateX(0px) scale(1.3, 1.3);
    -o-transform: translateX(0px) scale(1.3, 1.3);
    transform: translateX(0px) scale(1.3, 1.3); }
  30% {
    -webkit-transform: translateX(-15px) scale(0.5, 0.5);
    -moz-transform: translateX(-15px) scale(0.5, 0.5);
    -o-transform: translateX(-15px) scale(0.5, 0.5);
    transform: translateX(-15px) scale(0.5, 0.5);
    opacity: 0.1; }
  50% {
    -webkit-transform: translateX(60px) scale(1.2, 1.2);
    -moz-transform: translateX(60px) scale(1.2, 1.2);
    -o-transform: translateX(60px) scale(1.2, 1.2);
    transform: translateX(60px) scale(1.2, 1.2);
    opacity: 0.3; }
  60% {
    -webkit-transform: translateX(130px) scale(2, 2);
    -moz-transform: translateX(130px) scale(2, 2);
    -o-transform: translateX(130px) scale(2, 2);
    transform: translateX(130px) scale(2, 2);
    opacity: 0.05; }
  65% {
    -webkit-transform: translateX(145px) scale(1.2, 1.2);
    -moz-transform: translateX(145px) scale(1.2, 1.2);
    -o-transform: translateX(145px) scale(1.2, 1.2);
    transform: translateX(145px) scale(1.2, 1.2); }
  80% {
    -webkit-transform: translateX(120px) scale(0.5, 0.5);
    -moz-transform: translateX(120px) scale(0.5, 0.5);
    -o-transform: translateX(120px) scale(0.5, 0.5);
    transform: translateX(120px) scale(0.5, 0.5);
    opacity: 0.1; }
  90% {
    -webkit-transform: translateX(80px) scale(0.8, 0.8);
    -moz-transform: translateX(80px) scale(0.8, 0.8);
    -o-transform: translateX(80px) scale(0.8, 0.8);
    transform: translateX(80px) scale(0.8, 0.8); }
  100% {
    -webkit-transform: translateX(60px);
    -moz-transform: translateX(60px);
    -o-transform: translateX(60px);
    transform: translateX(60px);
    opacity: 0.3; } }

#AC005B_loader2:after {
  -webkit-animation-delay: 0.15s;
  -moz-animation-delay: 0.15s;
  -o-animation-delay: 0.15s;
  animation-delay: 0.15s; }

#AC005B_loader2 .AC005B_roller {
  -webkit-animation-delay: 0.15s;
  -moz-animation-delay: 0.15s;
  -o-animation-delay: 0.15s;
  animation-delay: 0.15s; }

#AC005B_loader3:after {
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  -o-animation-delay: 0.3s;
  animation-delay: 0.3s; }

#AC005B_loader3 .AC005B_roller {
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  -o-animation-delay: 0.3s;
  animation-delay: 0.3s; }

.AC005B .AC005B_input_chk {
  position: relative;
  display: inline-block;
  width: 100%;
  font-size: 14px;
  line-height: 14px;
  font-family: Helvetica, Arial, sans-serif;
  color: #111; }
  .AC005B .AC005B_input_chk input,
  .AC005B .AC005B_input_chk label {
    cursor: pointer; }
  .AC005B .AC005B_input_chk label {
    position: relative;
    display: block; }
  .AC005B .AC005B_input_chk input {
    visibility: hidden; }
  .AC005B .AC005B_input_chk.checked label::after {
    content: '';
    display: block;
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    position: absolute;
    top: 1px;
    left: 4px; }
  .AC005B .AC005B_input_chk label {
    padding-left: 24px; }
    .AC005B .AC005B_input_chk label:before {
      content: '';
      color: #fff;
      text-align: center;
      padding: 1px;
      font-size: 10px;
      line-height: 12px;
      height: 14px;
      width: 14px;
      margin-top: -7px;
      border: 1px solid #111;
      background: #111;
      position: absolute;
      left: 0;
      top: 7px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box; }
  .AC005B .AC005B_input_chk.error label::before {
    border: 1px solid #a94442; }

.AC005B .AC005B_pop-up_modal {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  display: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box; }
  .AC005B .AC005B_pop-up_modal * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box; }
  .AC005B .AC005B_pop-up_modal .AC005B_loader {
    display: none; }
  .AC005B .AC005B_pop-up_modal > .AC005B_body_click {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10; }
  .AC005B .AC005B_pop-up_modal > .AC005B_inner_div {
    position: absolute;
    width: -webkit-calc(100% - 40px);
    width: -moz-calc(100% - 40px);
    width: calc(100% - 40px);
    height: auto;
    left: 50%;
    top: 50%;
    max-width: 900px;
    -moz-transform: translate(-50.3%, -50.3%);
    -o-transform: translate(-50.3%, -50.3%);
    -ms-transform: translate(-50.3%, -50.3%);
    -webkit-transform: translate(-50.3%, -50.3%);
    transform: translate(-50.3%, -50.3%);
    background: #fff;
    padding: 15px 0 15px 15px;
    z-index: 20; }
    .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix {
      overflow-y: scroll;
      max-height: 480px;
      max-height: -webkit-calc(100vh - 80px);
      max-height: -moz-calc(100vh - 80px);
      max-height: calc(100vh - 80px);
      padding-right: 3px; }
      @media (min-width: 768px) {
        .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix {
          max-height: 800px;
          max-height: -webkit-calc(100vh - 80px);
          max-height: -moz-calc(100vh - 80px);
          max-height: calc(100vh - 80px); } }
      .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix > h2 {
        text-align: center;
        text-align: center;
        font-size: 22px;
        font-weight: 300;
        margin-top: 30px; }
        .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix > h2 .AC005B_recruitment-name {
          font-weight: 500; }
        .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix > h2 + div {
          text-align: center; }
      .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix .AC005B_logo {
        text-align: center;
        margin-top: 25px; }
        .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix .AC005B_logo svg {
          max-width: 85%; }
      @media (max-width: 767px) {
        .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix > h2 {
          margin-top: 10px; }
        .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix .AC005B_logo {
          margin-top: 10px; } }
    .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix::-webkit-scrollbar {
      -webkit-appearance: none; }
    .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix::-webkit-scrollbar:vertical {
      width: 11px; }
    .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix::-webkit-scrollbar:horizontal {
      height: 11px; }
    .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix::-webkit-scrollbar-thumb {
      -webkit-border-radius: 8px;
      border-radius: 8px;
      border: 2px solid white;
      background-color: rgba(0, 0, 0, 0.5); }
    .AC005B .AC005B_pop-up_modal > .AC005B_inner_div .AC005B_overflow_fix::-webkit-scrollbar-track {
      background-color: #fff;
      -webkit-border-radius: 8px;
      border-radius: 8px; }
    .AC005B .AC005B_pop-up_modal > .AC005B_inner_div h2 {
      font-size: 18px;
      font-weight: 500;
      padding: 0; }
      .AC005B .AC005B_pop-up_modal > .AC005B_inner_div h2 + * {
        margin-top: 20px; }
  .AC005B .AC005B_pop-up_modal .AC005B_close_btn {
    position: absolute;
    top: -15px;
    right: -15px;
    text-transform: uppercase;
    background: #000;
    color: #fff;
    width: 30px;
    height: 30px;
    line-height: 30px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    font-size: 14px;
    text-align: center;
    font-family: Arial;
    font-weight: 700;
    text-decoration: none; }

.AC005B .AC005B_email-form {
  border-top: 1px solid;
  margin-top: 30px;
  padding-top: 10px; }
  .AC005B .AC005B_email-form h3 {
    font-size: 16px;
    font-weight: 400;
    text-align: center; }
  .AC005B .AC005B_email-form .AC005B_radio-wrap {
    text-align: center;
    margin-top: 25px; }
    .AC005B .AC005B_email-form .AC005B_radio-wrap .AC005B_input_radio {
      display: inline-block; }
      .AC005B .AC005B_email-form .AC005B_radio-wrap .AC005B_input_radio + .AC005B_input_radio {
        margin-left: 15px; }
      .AC005B .AC005B_email-form .AC005B_radio-wrap .AC005B_input_radio label {
        font-weight: 400;
        margin: 0 0 0 7px; }
  .AC005B .AC005B_email-form .AC005B_form-wrap {
    display: block;
    width: 680px;
    margin: 20px auto 0; }
    .AC005B .AC005B_email-form .AC005B_form-wrap .AC005B_input-outer + .AC005B_input-outer {
      margin-top: 15px; }
    .AC005B .AC005B_email-form .AC005B_form-wrap .AC005B_input-outer.AC005B_error input,
    .AC005B .AC005B_email-form .AC005B_form-wrap .AC005B_input-outer.AC005B_error textarea,
    .AC005B .AC005B_email-form .AC005B_form-wrap .AC005B_input-outer.AC005B_error select {
      border-color: #a94442; }
    .AC005B .AC005B_email-form .AC005B_form-wrap .AC005B_input-outer.AC005B_error .AC005B_error-msg {
      display: block; }
    .AC005B .AC005B_email-form .AC005B_form-wrap .AC005B_input-outer .AC005B_error-msg {
      display: none;
      color: #ea403c; }
    .AC005B .AC005B_email-form .AC005B_form-wrap > div {
      width: 340px;
      float: left;
      padding: 0 20px; }
      .AC005B .AC005B_email-form .AC005B_form-wrap > div h3 {
        text-align: left;
        margin-bottom: 30px; }
      .AC005B .AC005B_email-form .AC005B_form-wrap > div input {
        width: 100%;
        height: 40px;
        padding: 0 15px;
        border: 1px solid #111; }
      .AC005B .AC005B_email-form .AC005B_form-wrap > div textarea {
        min-height: 260px;
        margin: 0;
        width: 100%;
        max-width: 100%;
        border: 1px solid #111;
        padding: 8px 15px; }
  @media (max-width: 767px) {
    .AC005B .AC005B_email-form {
      margin-top: 15px; }
      .AC005B .AC005B_email-form .AC005B_radio-wrap {
        text-align: left;
        width: 170px;
        margin: 25px auto 0; }
        .AC005B .AC005B_email-form .AC005B_radio-wrap .AC005B_input_radio {
          display: inline-block; }
          .AC005B .AC005B_email-form .AC005B_radio-wrap .AC005B_input_radio + .AC005B_input_radio {
            margin-left: 0; }
      .AC005B .AC005B_email-form .AC005B_form-wrap {
        width: 100%; }
        .AC005B .AC005B_email-form .AC005B_form-wrap > div {
          width: 100%; } }

.AC005B .AC005B_submit-form {
  background: #46A35E;
  color: #fff;
  max-width: 250px;
  width: 90%;
  display: block;
  text-align: center;
  font-weight: 400;
  line-height: 40px;
  text-transform: uppercase;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  cursor: pointer;
  margin: 40px auto 25px; }

.AC005B .AC005B_input_chk {
  width: 500px;
  margin: 0 auto;
  display: block;
  font-size: 12px; }
  .AC005B .AC005B_input_chk label {
    font-weight: 300; }
  .AC005B .AC005B_input_chk input {
    display: none; }
  .AC005B .AC005B_input_chk + .AC005B_input_chk {
    margin-top: 10px; }
  @media (max-width: 767px) {
    .AC005B .AC005B_input_chk {
      width: 100%;
      max-width: 500px; } }

.AC005B .AC005B_loaded-wrapper {
  opacity: 1;
  visibility: visible;
  -webkit-transition-property: opacity, visibility;
  -moz-transition-property: opacity, visibility;
  -o-transition-property: opacity, visibility;
  transition-property: opacity, visibility;
  -webkit-transition-duration: 400ms;
  -moz-transition-duration: 400ms;
  -o-transition-duration: 400ms;
  transition-duration: 400ms;
  -webkit-transition-timing-function: ease-in-out;
  -moz-transition-timing-function: ease-in-out;
  -o-transition-timing-function: ease-in-out;
  transition-timing-function: ease-in-out;
  z-index: 12;
  position: relative; }

.AC005B .AC005B_preload-anim .AC005B_loaded-wrapper {
  opacity: 0;
  visibility: hidden;
  z-index: 1; }

.AC005B .AC005B_preload-anim .AC005B_loader {
  display: block;
  z-index: 10; }

.AC005B .AC005B_employ {
  height: 40px;
  width: 100%; }

    
</style>