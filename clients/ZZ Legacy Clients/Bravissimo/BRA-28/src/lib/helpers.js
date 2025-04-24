/**
 * @description Used for navigating up and down CUP sizes
 * @param {String} key 
 * @param {Object} obj 
 */

export const findNextCup = (key, obj) => { 
    const keys = Object.keys(obj);
    // console.log('find next cup: ', {
    //     keys,
    // })
    return keys[(keys.indexOf(key) + 1) % keys.length];
}

export const findPrevCup = (key, obj) => {
    console.log('key, ', key);
    console.log('obj, ', obj);
    const keys = Object.keys(obj);
    console.log('return = ', keys[(keys.indexOf(key) - 1) % keys.length]);
    return keys[(keys.indexOf(key) - 1) % keys.length];
}
  


/**
 * @description Uses the cupsize to determine the array to traverse a size up
 * If no size exists, e.g. 48 -> 50 then go up a cup.
 * @param {String} cupSize 
 * @param {String} currentBackSize 
 * @param {Object} obj 
 */
export const findNextBack = (cupSize, currentBackSize, obj, cupCb) => {
    
    let sizeArr = obj[cupSize];
    
    if (!sizeArr) return;
    let currentIndex = sizeArr.indexOf(currentBackSize);

    if (sizeArr[currentIndex + 1]) {

        return sizeArr[currentIndex + 1];
    } else {
        // Up the CUP
        const newCup = findNextCup(cupSize, obj);
        if (!newCup) {

            return null;
        }
        sizeArr = obj[newCup];
        
        cupCb(newCup);
        return sizeArr[0];
    }
}

/**
 * @description Uses the cupsize to determine the array to traverse a size down
 * If no size exists, e.g. 28 -> 26 then go down a cup.
 * @param {String} cupSize 
 * @param {String} currentBackSize 
 * @param {Object} obj 
 */
export const findPrevBack = (cupSize, currentBackSize, obj, cupCb) => {
    let sizeArr = obj[cupSize];
    console.log('current back size =', currentBackSize);
    let currentIndex = sizeArr.indexOf(currentBackSize);
    console.log('current index =', currentIndex);
    console.log('find prev back =', sizeArr[currentIndex - 1]);
    if (sizeArr[currentIndex - 1]) {
    
        return sizeArr[currentIndex - 1];
    } else {
        // Down the CUP
        const newCup = findPrevCup(cupSize, obj);
        if (!newCup) {
            
            return null;
        }
        sizeArr = obj[newCup];
        
        cupCb(newCup);
        console.log('size Arr 0 = ', sizeArr[0]);
        return sizeArr[0];
    }
}


/**
 * @description Switches country string
 * @param {String} currentCountry 
 */
export const switchCountry = (currentCountry) => {
    switch (currentCountry) {
        case 'US':
            return 'UK'
            break;
        case 'UK':
            return 'US'
        default:
            return 'US';
            break;
    }
};


export const runConfetti = (el) => {
    const settings = {
        numConfetti: 150,
        distance: 75,
        colors: ["blue", "green", "yellow", "red", "pink"],
        shapes: ["square", "circle", "rectangle"]
    };
    
    function getRandomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
    }
    
    function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
    }
    
    function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
    }
    
    function getRotation() {
    return Math.floor(Math.random() * 360) + 1;
    }
    
    function emit(container) {
        
        var containerRect = container.getBoundingClientRect();
        var containerData = {
          x: containerRect.left,
          y: containerRect.top,
          height: containerRect.right - containerRect.left,
          width: containerRect.bottom - containerRect.top
        };
      
        var start = {
          x: containerData.x + containerData.width / 2,
          y: containerData.y + containerData.height / 2
        };
      
        var maxY = containerData.y + containerData.height + settings.distance;
        var minY = containerData.y - settings.distance;
      
        var maxX = containerData.x + containerData.width + settings.distance;
        var minX = containerData.x - settings.distance;
      
        var docFrag = document.createDocumentFragment();
      
        for (var i = 0; i < settings.numConfetti; i++) {
          let confetti = document.createElement("div");
          let color = getRandomArrayItem(settings.colors);
          let shape = getRandomArrayItem(settings.shapes);
          let size = getRandomInt(8, 4);
          let newX = getRandomInt(minX, maxX);
          let newY = getRandomInt(minY, maxY);
          confetti.className += "confetti " + color + " " + shape;
          confetti.style.top = start.y + "px";
          confetti.style.left = start.x + "px";
          confetti.style.height = size + "px";
          confetti.style.width = size + "px";
          confetti.style.transform = "rotate(" + getRotation() + "deg)";
          docFrag.appendChild(confetti);
      
          setTimeout(function() {
            confetti.style.transition = "all " + getRandomFloat(1.5, 0.5) + "s ease";
            confetti.style.top = newY + "px";
            confetti.style.left = newX + "px";
            confetti.style.transform = "rotate(" + getRotation() + "deg)";
      
            confetti.addEventListener("transitionend", function() {
              confetti.style.transition = "all " + getRandomFloat(1.25, 1) + " ease";
              confetti.style.opacity = 0;
              confetti.style.transform = "rotate(" + getRotation() + "deg)";
              confetti.style.top = parseInt(confetti.style.top) + 10 + "px";
              setTimeout(function() {
                confetti.remove();
                confetti = null;
              }, 1000);
            });
          }, 1);
        }
        document.body.appendChild(docFrag);
    }
    
    el ? emit(el) : null;
}