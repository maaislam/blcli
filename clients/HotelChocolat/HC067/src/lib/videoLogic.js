import { events } from "../../../../../lib/utils";
import shared from "./shared";

export default () => {

    const { ID, VARIATION }= shared;
 
    /**
     * Add video
     */
    const addAndPlayVideo = () => {

        const video = document.createElement('div');
        video.classList.add(`${ID}-video`);
        video.innerHTML = `<div id="player"></div>`;
        if(VARIATION === '2' && window.innerWidth > 767) {
            document.querySelector(`.${ID}-productDetails`).appendChild(video);
        } else {
            document.querySelector(`.${ID}-journeyContent .${ID}-container`).appendChild(video);
        }
        
        let player;

            function readyYoutube() {
                if ((typeof YT !== "undefined") && YT && YT.Player) {
                    player = new YT.Player('player', {
                        height: "100%",
                        width: "100%",
                        videoId: 'Xx5CwfpjToE',
                        events: {
                            'onStateChange': onPlayerStateChange,
                        }
                    });

                    let done = false;

                    function onPlayerStateChange(event) {
                        if (event.data == YT.PlayerState.PLAYING && !done) {
                            events.send(`${ID} varitation: ${VARIATION} - Velvetiser Journey`, 'click', 'play video', {
                                sendOnce: true
                            });
                            done = true;
                        }
                    }
                } else {
                    setTimeout(readyYoutube, 1000);
                }
            }
            readyYoutube();
    }

    addAndPlayVideo();
}