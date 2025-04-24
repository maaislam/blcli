
export function callCTA(){
  document.querySelectorAll('.callCTA').forEach((item) => {
    item.remove();
  });
  document.querySelector(".cta-button-wrapper").style.display = "none"
   //**add class to the main call desktop button */
    document.querySelector('.cta-button-wrapper').classList.add('HH080-cta-button-wrapper');
    //**add class to logo for padding */
    document.querySelector('.menu-top').classList.add('HH080-logo-mobile')
    //** get reference for the Infinity number */
    let infinityNumber = document.querySelector('.InfinityNumber').getAttribute("href");
    //**get reference for local branch Div */
    const findLocal = document.querySelector(".find-local");
    //**remove the 'find branch' */
    const findLocalChildren = document.querySelector(".find-local a");
    findLocalChildren.style.display = "none";
    //**add and anchor and set it's href to the number */
    const div = document.createElement("div");
    div.classList.add('callCTA')
    //** and add phone Icon */
    div.innerHTML =  `
    <a href="${infinityNumber}">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="42" fill="none">
    <rect width="39.882" height="41.625" y=".188" fill="#8AC589" rx="19.941"/>
    <path fill="#3D195B" d="M29.207 26.023c-1.548-1.324-3.119-2.126-4.648-.804l-.913.799c-.668.58-1.91 3.29-6.712-2.234-4.8-5.517-1.944-6.376-1.275-6.951l.918-.8c1.521-1.325.947-2.993-.15-4.71l-.662-1.04c-1.102-1.713-2.302-2.838-3.827-1.515l-.824.72c-.674.49-2.558 2.087-3.015 5.119-.55 3.638 1.185 7.804 5.16 12.375 3.97 4.573 7.857 6.87 11.54 6.83 3.06-.033 4.907-1.675 5.485-2.272l.827-.721c1.521-1.322.576-2.668-.973-3.995l-.93-.801Z"/>
  </svg>
  </a>
    `
    findLocal.appendChild(div);
}