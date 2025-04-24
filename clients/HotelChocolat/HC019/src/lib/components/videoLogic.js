import { events } from "../../../../../../lib/utils";
import shared from "../shared";
import { scrollToElement } from "./scrollToEl";

export default () => {

    const { ID, VARIATION }= shared;
    

    /**
     * Add youtube API
     */
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
        if(shared.VARIATION === '1') {
            document.querySelector(`.${ID}-topHeader`).appendChild(video);
        } else if(shared.VARIATION === '2') {
            document.querySelector(`.${ID}-journeyContent .${ID}-container`).appendChild(video);
        } else {
            document.querySelector(`.${ID}-journeyContent .${ID}-container`).insertAdjacentElement('beforebegin', video);
        }
        
        // video header events
        if(VARIATION === '1') {
            // header clicks
            const playVideo = document.querySelector(`.${ID}-topHeader .${ID}-play`);
            const headerBlock = document.querySelector(`.${ID}-headerWrap`);
            const video = document.querySelector(`.${ID}-video`);

            playVideo.addEventListener('click', () => {
                headerBlock.style.display = 'none';
                video.style.display = 'block';
                events.send(`${ID} variation:${VARIATION} - Velvetiser Journey`, 'click', 'header play video');
            });


            function readyYoutubeV1() {
                let player;
                if ((typeof YT !== "undefined") && YT && YT.Player) {
                    player = new YT.Player('player', {
                        height: "100%",
                        width: "100%",
                        videoId: 'Xx5CwfpjToE',
                    });

                    function play1() { 
                        player.playVideo();
                    }
         
                    // auto play video
                    playVideo.addEventListener('click', () => {
                        play1();
                    });

                    // on video end
                    const topReviews = document.querySelector(`.${ID}-topReviews`);
                    player.addEventListener("onStateChange", function(state){
                        if(state.data === 0) {
                            headerBlock.style.display = 'block';
                            video.style.display = 'none';
                            scrollToElement(topReviews);
                        }
                    });

                } else {
                    setTimeout(readyYoutubeV1, 1000);
                }
            }
            readyYoutubeV1();
        

       } else {
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
    }


    addYTapi();
    addAndPlayVideo();
}