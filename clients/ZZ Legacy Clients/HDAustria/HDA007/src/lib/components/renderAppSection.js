const renderTvAppsteps = (id, fireEvent) => {
  // const htmlStr = `
  //     <section class="HDA007__tvApp">

  //     <div class="HDA007__tvApp--container container">

  //         <div class="HDA007__tvApp--title">So kommst du zur HD Austria TV-App</div>
  //         <div class="HDA007__tvApp--subtitle">Ganz einfach: Die Anmeldung ist in 2 Minuten erledigt. Du erhältst von uns
  //             ein Aktivierungs-E-Mail, klickst auf den Link, wählst dein Passwort und schon kann es losgehen!</div>

  //         <div class="HDA007__tvApp--content">
  //             <div class="HDA007__tvApp--register-process">
  //                 <div class="row align-items-top mt-md-4">
  //                     <div class="col-md my-3 my-lg-0">
  //                         <div class="item row align-items-stretch">
  //                             <div class="w-100">
  //                                 <svg xmlns="http://www.w3.org/2000/svg"
  //                                      xmlns:xlink="http://www.w3.org/1999/xlink"
  //                                      version="1.1"
  //                                      width="20"
  //                                      height="20"
  //                                      viewBox="0 0 20 20"
  //                                      class="icon-48 color-grey1 d-block mx-auto">
  //                                     <path d="M18.5 5h-3.001c0.315-0.418 0.501-0.938 0.501-1.5 0-1.378-1.122-2.5-2.5-2.5-1.39 0-2.556 1.101-3.127 1.758-0.346 0.397-0.644 0.823-0.873 1.235-0.229-0.412-0.527-0.837-0.873-1.235-0.571-0.656-1.737-1.758-3.127-1.758-1.378 0-2.5 1.122-2.5 2.5 0 0.562 0.187 1.082 0.501 1.5h-3.001c-0.276 0-0.5 0.224-0.5 0.5v3c0 0.276 0.224 0.5 0.5 0.5h0.5v9.5c0 0.827 0.673 1.5 1.5 1.5h14c0.827 0 1.5-0.673 1.5-1.5v-9.5h0.5c0.276 0 0.5-0.224 0.5-0.5v-3c0-0.276-0.224-0.5-0.5-0.5zM11.127 3.414c0.782-0.899 1.647-1.414 2.373-1.414 0.827 0 1.5 0.673 1.5 1.5s-0.673 1.5-1.5 1.5h-3.378c0.173-0.442 0.523-1.032 1.005-1.586zM11 19h-3v-13h3v13zM4 3.5c0-0.827 0.673-1.5 1.5-1.5 0.726 0 1.591 0.515 2.373 1.414 0.482 0.554 0.832 1.144 1.005 1.586h-3.378c-0.827 0-1.5-0.673-1.5-1.5zM1 6h6v2h-6v-2zM2 18.5v-9.5h5v10h-4.5c-0.276 0-0.5-0.224-0.5-0.5zM17 18.5c0 0.276-0.224 0.5-0.5 0.5h-4.5v-10h5v9.5zM18 8h-6v-2h6v2z"
  //                                           fill="#000000"></path>
  //                                 </svg>
  //                             </div>
  //                             <div class="col mt-3 text-center">
  //                                 <p class="color-grey1 bold font-15 mb-0">Schritt 1:</p>
  //                                 <p class="mb-2 color-grey1 lh-auto w-80 d-table font-16">Melde dich für dein
  //                                     Gratis-Monat bei HD Austria an.</p>
  //                             </div>
  //                         </div>
  //                     </div>
  //                     <div class="col-sm-auto align-self-center hidden-sm-down">
  //                         <i class="lnr-chevron-right font-40 font-md-80 light opacity-10"></i>
  //                     </div>
  //                     <div class="col-md my-3 my-lg-0">
  //                         <div class="item row align-items-stretch">
  //                             <div class="w-100">
  //                                 <svg xmlns="http://www.w3.org/2000/svg"
  //                                      xmlns:xlink="http://www.w3.org/1999/xlink"
  //                                      version="1.1"
  //                                      width="20"
  //                                      height="20"
  //                                      viewBox="0 0 20 20"
  //                                      class="icon-48 color-grey1 d-block mx-auto">
  //                                     <path d="M9.5 11c-3.033 0-5.5-2.467-5.5-5.5s2.467-5.5 5.5-5.5 5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5zM9.5 1c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5c2.481 0 4.5-2.019 4.5-4.5s-2.019-4.5-4.5-4.5z"
  //                                           fill="#000000"></path>
  //                                     <path d="M11.5 20h-10c-0.827 0-1.5-0.673-1.5-1.5 0-0.068 0.014-1.685 1.225-3.3 0.705-0.94 1.67-1.687 2.869-2.219 1.464-0.651 3.283-0.981 5.406-0.981 0.351 0 0.698 0.011 1.031 0.031 0.276 0.017 0.485 0.255 0.468 0.53s-0.255 0.486-0.53 0.468c-0.313-0.019-0.639-0.029-0.969-0.029-3.487 0-6.060 0.953-7.441 2.756-1.035 1.351-1.058 2.732-1.059 2.746 0 0.274 0.224 0.498 0.5 0.498h10c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"
  //                                           fill="#000000"></path>
  //                                     <path d="M15.5 20c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5zM15.5 12c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"
  //                                           fill="#000000"></path>
  //                                     <path d="M17.5 15h-1.5v-1.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v1.5h-1.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h1.5v1.5c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-1.5h1.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5z"
  //                                           fill="#000000"></path>
  //                                 </svg>
  //                             </div>
  //                             <div class="col mt-3 text-center">
  //                                 <p class="color-grey1 bold font-15 mb-0">Schritt 2:</p>
  //                                 <p class="mb-2 color-grey1 lh-auto w-80 d-table font-16">Wenn noch nicht
  //                                     erledigt, lade dir die HD Austria TV-App für Handy, Tablet, Web oder Smart-TV
  //                                     herunter.</p>
  //                             </div>
  //                         </div>
  //                     </div>
  //                     <div class="col-sm-auto align-self-center hidden-sm-down">
  //                         <i class="lnr-chevron-right font-40 font-md-80 light opacity-10"></i>
  //                     </div>
  //                     <div class="col-md my-3 my-lg-0">
  //                         <div class="item row align-items-stretch">
  //                             <div class="w-100">
  //                                 <svg xmlns="http://www.w3.org/2000/svg"
  //                                      xmlns:xlink="http://www.w3.org/1999/xlink"
  //                                      version="1.1"
  //                                      width="20"
  //                                      height="20"
  //                                      viewBox="0 0 20 20"
  //                                      class="icon-48 color-grey1 d-block mx-auto">
  //                                     <path d="M11.5 14h-8c-0.827 0-1.5-0.673-1.5-1.5v-8c0-0.827 0.673-1.5 1.5-1.5h13c0.827 0 1.5 0.673 1.5 1.5v1c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5v-1c0-0.276-0.224-0.5-0.5-0.5h-13c-0.276 0-0.5 0.224-0.5 0.5v8c0 0.276 0.224 0.5 0.5 0.5h8c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"
  //                                           fill="#000000"></path>
  //                                     <path d="M11.5 18h-10c-0.827 0-1.5-0.673-1.5-1.5v-1c0-0.276 0.224-0.5 0.5-0.5h11c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5h-10.5v0.5c0 0.276 0.224 0.5 0.5 0.5h10c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"
  //                                           fill="#000000"></path>
  //                                     <path d="M18.5 18h-4c-0.827 0-1.5-0.673-1.5-1.5v-8c0-0.827 0.673-1.5 1.5-1.5h4c0.827 0 1.5 0.673 1.5 1.5v8c0 0.827-0.673 1.5-1.5 1.5zM14.5 8c-0.276 0-0.5 0.224-0.5 0.5v8c0 0.276 0.224 0.5 0.5 0.5h4c0.276 0 0.5-0.224 0.5-0.5v-8c0-0.276-0.224-0.5-0.5-0.5h-4z"
  //                                           fill="#000000"></path>
  //                                     <path d="M16.5 16c-0.132 0-0.26-0.053-0.353-0.147s-0.147-0.222-0.147-0.353 0.053-0.261 0.147-0.353c0.093-0.093 0.222-0.147 0.353-0.147s0.261 0.053 0.353 0.147c0.093 0.093 0.147 0.222 0.147 0.353s-0.053 0.261-0.147 0.353c-0.093 0.093-0.222 0.147-0.353 0.147z"
  //                                           fill="#000000"></path>
  //                                 </svg>
  //                             </div>
  //                             <div class="col mt-3 text-center">
  //                                 <p class="color-grey1 bold font-15 mb-0">Schritt 3:</p>
  //                                 <p class="mb-2 color-grey1 lh-auto w-80 d-table font-16">Genieße mehr als 100
  //                                     Sender wo und wie du willst!</p>
  //                             </div>
  //                         </div>
  //                     </div>

  //                 </div>
  //             </div>
  //         </div>
  //         <div class="HDA007__tvApp--video">
  //             <div class="headline">Sieh dir hier an was die HD Austria TV-App alles kann!</div>
  //             <div class="row">
  //                 <div class="col-lg-6 offset-lg-3">
  //                     <div class="border">
  //                         <iframe width="560"
  //                                 height="315"
  //                                 src="https://www.youtube.com/embed/y-aMEpzHxN0"
  //                                 frameborder="0"
  //                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //                                 allowfullscreen=""></iframe>
  //                     </div>
  //                 </div>
  //             </div>
  //         </div>
  //         <a href="/pakete/" class="HDA007__tvApp--button">Pakete entdecken</a>
  //     </div>

  // </section>`;
  //window.appSteps

  document.querySelector('#call-me-now-banner').insertAdjacentHTML('beforebegin', window.appSteps);

  document.querySelector(`.${id}__tvApp--button`).addEventListener('click', () => {
    fireEvent(`customer has clicked discover all packages button`);
  });
};

export default renderTvAppsteps;
