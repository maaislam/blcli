//https://www.codeply.com/go/HgAVBVfQFY

export const slidingNav = () => {
    let metrics = {};
    let amountToScroll;

    const container = document.querySelector('.DesktopNav__level.DesktopNav__level-1');
    const bar = document.querySelector('.DesktopNav__listing.DesktopNav__level-1Wrap');

    const setMetrics = () => {
        metrics = {
            bar: bar.scrollWidth||0,
            container: container.clientWidth||0,
            left: parseInt(bar.offsetLeft),
            getHidden() {
                return (this.bar+this.left)-this.container
            }
        }
        
        updateArrows();
        updateDropdown();
    }

    const doSlide = (direction) => {
        setMetrics();
        var pos = metrics.left;
        if (direction==="right") {
            amountToScroll = -(Math.abs(pos) + Math.min(metrics.getHidden(), metrics.container));
        }
        else {
            amountToScroll = Math.min(0, (metrics.container + pos));
        }
        bar.style.left = amountToScroll + "px";
        setTimeout(function(){
            setMetrics();
        },400);
    }



    // update dropdown
    const updateDropdown = () => {

        const allDropdowns = document.querySelectorAll('.lvl1title');
        for (let index = 0; index < allDropdowns.length; index += 1) {
            const element = allDropdowns[index];
            const elDropdown = element.querySelector('.DesktopSlidingNav__level.DesktopSlidingNav__level-2');

            if(elDropdown) {
                elDropdown.style.left = `calc(50% + ${Math.abs(amountToScroll) + "px"}`;
            
                if (metrics.getHidden() === 0) {
                    elDropdown.style.left = `calc(50% + ${Math.abs(amountToScroll) + "px"}`;
                    
                } else {
                    elDropdown.style.left = `50%`;
                    element.classList.remove('noSlide');
                }

                if (metrics.left === 0) {
                    elDropdown.style.left = `50%`;
                }
                else {
                    elDropdown.style.left = `calc(50% + ${Math.abs(amountToScroll) + "px"}`;
                }
            }

            
        }
        
    }

    const updateArrows = () => {
        if (metrics.getHidden() === 0) {
            document.querySelector(".chevronArr.prev").classList.add("visible");
        }
        else {
            document.querySelector(".chevronArr.prev").classList.remove("visible");
        }
        
        if (metrics.left === 0) {
            document.querySelector(".chevronArr.next").classList.add("visible");
        }
        else {
            document.querySelector(".chevronArr.next").classList.remove("visible");
        }
    }

    const adjust = () => {
        bar.style.left = 0;
        document.querySelector(".chevronArr.next").classList.add("visible");
        setMetrics();
    }

    document.querySelector(".chevronArr.next").addEventListener("click", function(e){
        e.preventDefault()
        doSlide("right")
    });

    document.querySelector(".chevronArr.prev").addEventListener("click", function(e){
        e.preventDefault()
        doSlide("left")
    });

    window.addEventListener("resize",function(){
        // reset to left pos 0 on window resize
        adjust();
    });

    setMetrics();
}


export const tabs = () => {
    // make shop active by default
    document.querySelector(`.CatTab[target="shop"]`).classList.add('tabActive');
    document.querySelector(`.wrapper.shop`).classList.add('navActive');
    
    let navContainers;
   
    const tabs = document.querySelectorAll(`.CatTab`);
    navContainers = document.querySelectorAll(`.wrapper`);

    for (let index = 0; index < tabs.length; index += 1) {
        const el = tabs[index];
        el.addEventListener('click', (e) => {
            const navTarget = e.currentTarget.getAttribute('target');
            const navToShow = document.querySelector(`.wrapper.${navTarget}`);
            
            navContainers.forEach(el => el.classList.remove('navActive'));

            if(document.querySelector('.tabActive')) {
                document.querySelector('.tabActive').classList.remove('tabActive');
            }
            navToShow.classList.add('navActive');
            e.currentTarget.classList.add('tabActive');
        });
    }

        
}
