import { events } from "../../../../../lib/utils";
import shared from "./shared";

export default () => {

    const { ID, VARIATION } = shared;
 
    const addYTapi = () => {
        var tag = document.createElement('script');
        tag.className = `youtube`;
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    /**
     * Add video
     */
    const addAndPlayVideo = () => {

        const video = document.createElement('div');
        video.classList.add(`${ID}-video`);
        video.innerHTML = `<div id="player"></div>`;
        document.querySelector(`.${ID}-videoBlock`).appendChild(video);
        
        
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

    addYTapi();
    addAndPlayVideo();
}