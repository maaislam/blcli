import { setCookie } from '../helpers/cookie';

const renderPackageSec = (id, fireEvent) => {
  //   const packageSection = `
  //     <section class="HDA007__package">

  //     <div class="HDA007__package--container container">

  //         <div class="HDA007__package--title">Finde dein passendes Paket</div>
  //         <div class="HDA007__package--subtitle">Mit den HD Austria Paketen gibt es sogar die wichtigsten deutschen Sender
  //             in HD und die TV-App kostenlos dazu!
  //             Jedes unserer Pakete ist jetzt auch in Verbindung mit HD Austria Hardware zu Aktionspreisen erhältlich.
  //             Du hast kein SAT? Dann kannst du auch über die TV-App oder den Streaming-Player fernsehen. Die HD Austria
  //             TV-App ist in allen Paketen inkludiert.</div>

  //         <div class="HDA007__package--content">

  //             <div class="HDA007__package--options">
  //                 <div class="option-1">
  //                     <div class="logo"><img
  //                              src="https://ucds.ams3.digitaloceanspaces.com/HDAustria/app_package_icon%20%282%29%201.png"
  //                              alt=""></div>
  //                     <div class="name">TV-App <span>30 Tage gratis!</span></div>
  //                     <div class="headline">danach 6 Monate zum Aktionspreis ab 9,90 Euro pro Monat statt 14,90
  //                         Euro</div>
  //                     <div class="description">Mit unseren TV-App Paketen kannst du am Handy, Tablet, Laptop und
  //                         Smart-TV via Internet fernsehen. Genieße mehr als 80 Sender auf bis zu 5 Geräten gleichzeitig
  //                         und streame zahlreiche großartige Filme & Serien.</div>
  //                     <div data-package="3" class="tv-app-option button">TV-App Pakete</div>
  //                 </div>
  //                 <div class="option-2">
  //                     <div class="logo"><img
  //                              src="https://ucds.ams3.digitaloceanspaces.com/HDAustria/sat_package_icon%20%282%29%201.png"
  //                              alt=""></div>
  //                     <div class="name">SAT-TV</div>
  //                     <div class="headline">6 Monate lang zum Aktionspreis ab 9,90 Euro pro Monat statt 14,90
  //                         Euro</div>
  //                     <div class="description">Unsere SAT-TV Pakete sind ideal für alle, die Fernsehen in HD und
  //                         UHD auch klassisch über Satellit empfangen wollen – egal ob du bereits SAT-Hardware besitzt oder
  //                         noch benötigst! Genieße mehr als 80 HD-Sender am SAT-TV und in der TV-App.</div>
  //                     <div data-package="2" class="sat-tv-option button">SAT-TV Pakete</div>
  //                 </div>
  //             </div>
  //         </div>
  //         <a href="/pakete/" class="HDA007__package--button">Pakete entdecken</a>
  //     </div>

  // </section>`;

  document.querySelector(`#channel-list-new`).insertAdjacentHTML('beforebegin', window.packageSection);

  const optionsBtn = [document.querySelector('.tv-app-option'), document.querySelector('.sat-tv-option')];
  optionsBtn.forEach((option) => {
    option.addEventListener('click', (e) => {
      fireEvent(`customer has clicked package CTA--${e.target.innerText}`);
      setCookie('packageClicked', e.target.getAttribute('data-package'));
      location.pathname = 'pakete';
    });
  });
  document.querySelector(`.${id}__package--button`).addEventListener('click', () => {
    fireEvent(`customer has clicked discover all packages button`);
  });
};

export default renderPackageSec;
