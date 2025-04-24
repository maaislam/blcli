/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const startExperiment = () => {

  addPoller(['.pl-8.pr-8.pt-5.pb-5.divider--container.background--paper', '.relative.top-0.bottom-0.w-full.h-full.overflow-hidden'], () => {
    
    let newHTML = `
    
      <div class="${ID}-video-content">

        <h2> Erhelle dein Leben mit besseren Blumen </h2>

        <div class="${ID}-video-content--inner">
        
          <ul>
            <li> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="black"/></g></svg> <span>Erfreue dich an wunderschöne professionell gestaltete saisonale Arrangements</span> </li>
            <li> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="black"/></g></svg> <span>Lerne, wie ein Florist zu arrangieren, und fühle dich durch deine Kreationen erfrischt</span> </li>
            <li> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="black"/></g></svg> <span>Blumen direkt vom Züchter, die wochenlang halten</span> </li>
          </ul>

          <div class="${ID}-video-content--innervideo">
            <button class="${ID}-video-play-button" id="${ID}-video-play-button"><svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="26" cy="26" r="26" fill="black" fill-opacity="0.3"/><path d="M34.8325 24.7495C36.2093 25.5104 36.2093 27.4896 34.8325 28.2505L21.9674 35.3601C20.6344 36.0968 19 35.1326 19 33.6097L19 19.3903C19 17.8674 20.6344 16.9032 21.9674 17.6399L34.8325 24.7495Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M26 50.9167C39.7611 50.9167 50.9167 39.7611 50.9167 26C50.9167 12.2389 39.7611 1.08333 26 1.08333C12.2389 1.08333 1.08333 12.2389 1.08333 26C1.08333 39.7611 12.2389 50.9167 26 50.9167ZM26 52C40.3594 52 52 40.3594 52 26C52 11.6406 40.3594 0 26 0C11.6406 0 0 11.6406 0 26C0 40.3594 11.6406 52 26 52Z" fill="white"/></svg></button>
            
            <video id="${ID}-video">

                <source src="https://blcro.fra1.digitaloceanspaces.com/FF-306/ffexplainer.mp4" type="video/mp4" />
            
                Entschuldigung, Ihr Browser unterstützt keine eingebetteten Videos.
            </video>   
          </div>

        </div>

        <div class="divider-paper--bottom"></div>
      </div>
    
    
    `;

    let insertionPoint = document.querySelector('.pl-8.pr-8.pt-5.pb-5.divider--container.background--paper');

    insertionPoint.insertAdjacentHTML('beforebegin', newHTML);

    let videoPlayButton = document.getElementById(`${ID}-video-play-button`);
    let videoSource = document.getElementById(`${ID}-video`)
    videoPlayButton.addEventListener('click', (e) => {

      videoPlayButton.remove();
      videoSource.controls = "controls";
      videoSource.play();

      fireEvent('Click - user has clicked on the play button to view the video', true);

    });

    let mainHero = document.querySelector('.relative.top-0.bottom-0.w-full.h-full.overflow-hidden');

    mainHero.querySelector('.divider-paper--bottom').remove();

    fireEvent('Interaction - video element has been added to the page');

  });


}




export default () => {
  

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  startExperiment();
};
