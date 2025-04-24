const ls = window.localStorage;


export const Storage = {
    add(obj) {
        const wishList = ls.getItem('MP-wish');
        
        let tempArr = [];
        if (!wishList) { // No storage
            tempArr.push(obj);
            ls.setItem('MP-wish', JSON.stringify(tempArr));
        } else { // Existing storage
            tempArr = JSON.parse(ls.getItem('MP-wish'));
        
            // Loop and check
            for (let i = 0; tempArr.length > i; i += 1) {
                if (tempArr[i] && tempArr[i].url === obj.url) {
                    return;
                }
            }

            if (Object.prototype.toString.call(obj) === '[object Object]') {
                tempArr.push(obj);
                
                
                return ls.setItem('MP-wish', JSON.stringify(tempArr));
            }
            
        }
    },
    delete(link) {
        
        let storedArr = JSON.parse(ls.getItem('MP-wish'));
        if (!storedArr) {
            console.error('no wishlist saved');
            return;
        }

        let tempArr = [];
        for(let i of storedArr)
            i && tempArr.push(i);

        storedArr = tempArr;

        // Get all but this product
        let allButArr = storedArr.map((obj) => {
            
            if (!obj) {
                return;
            }
            if (obj.url !== link) {
                return obj;
            }
        });
        
        if (!allButArr) {
            return;
        }

        return ls.setItem('MP-wish', JSON.stringify(allButArr));
    },
    fetch(cb) {
        setTimeout(() => {
            let storedArr = JSON.parse(ls.getItem('MP-wish'));
            
            if (!storedArr) {
                return;
            }

            return cb(storedArr);
        }, 1000);
    }
};