const ls = window.localStorage;


export const Storage = {
    add(obj) {
        const wishList = ls.getItem('MP-wish');
        console.log('OBJ 1 = ', obj);
        let tempArr = [];
        if (!wishList) { // No storage
            tempArr.push(obj);
            ls.setItem('MP-wish', JSON.stringify(tempArr));
        } else { // Existing storage
            tempArr = JSON.parse(ls.getItem('MP-wish'));
            console.log('OBJ = ', obj);
            // Loop and check
            for (let i = 0; tempArr.length > i; i += 1) {
                if (tempArr[i] && tempArr[i].url === obj.url) {
                    return;
                }
            }

            if (Object.prototype.toString.call(obj) === '[object Object]') {
                tempArr.push(obj);
                console.log('tempArr ', tempArr);
                
                return ls.setItem('MP-wish', JSON.stringify(tempArr));
            }
            
        }
    },
    delete(link) {
        console.log('delete, ', link);
        let storedArr = JSON.parse(ls.getItem('MP-wish'));
        if (!storedArr) {
            console.error('no wishlist saved');
            return;
        }

        // Get all but this product
        let allButArr = storedArr.map((obj) => {
            console.log('all but object ', obj);
            if (!obj) {
                console.log('delete, no object');
                return;
            }
            if (obj.url !== link) {
                return obj;
            }
        });
        console.log('all but, ', allButArr);
        if (!allButArr) {
            console.log('no product found in wishlist');
            return;
        }

        return ls.setItem('MP-wish', JSON.stringify(allButArr));
    },
    fetch(cb) {
        setTimeout(() => {
            let storedArr = JSON.parse(ls.getItem('MP-wish'));
            console.log('stored arr ', storedArr);
            if (!storedArr) {
                console.log('Could not fetch, no storage');
                return;
            }

            return cb(storedArr);
        }, 1000);
    }
};


export const findFirstChildByClass = (element, className) => {
        var foundElement = null, found;
        function recurse(element, className, found) {
            for (var i = 0; i < element.childNodes.length && !found; i++) {
                var el = element.childNodes[i];
                var classes = el.className != undefined? el.className.split(" ") : [];
                for (var j = 0, jl = classes.length; j < jl; j++) {
                    if (classes[j] == className) {
                        found = true;
                        foundElement = element.childNodes[i];
                        break;
                    }
                }
                if(found)
                    break;
                recurse(element.childNodes[i], className, found);
            }
        }
        recurse(element, className, false);
        return foundElement;
    }