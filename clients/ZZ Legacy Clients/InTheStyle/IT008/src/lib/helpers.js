const countrySizes = {
    6: {
        'us': 2,
        'au': 6,
        'eu': 34
    },
    8: {
        'us': 4,
        'au': 8,
        'eu': 36
    },
    10: {
        'us': 6,
        'au': 10,
        'eu': 38
    },
    12: {
        'us': 8,
        'au': 12,
        'eu': 40
    },
    14: {
        'us': 10,
        'au': 14,
        'eu': 42
    },
    16: {
        'us': 12,
        'au': 16,
        'eu': 44
    },
    18: {
        'us': 14,
        'au': 18,
        'eu': 46
    },
    20: {
        'us': 16,
        'au': 20,
        'eu': 48
    },
    22: {
        'us': 18,
        'au': 22,
        'eu': 50
    },
    24: {
        'us': 20,
        'au': 24,
        'eu': 52
    },
    26: {
        'us': 22,
        'au': 26,
        'eu': 54
    },
    28: {
        'us': 24,
        'au': 28,
        'eu': 56
    },
};

const hipMap = {
    34: 6,
    35: 8,
    37: 10,
    39: 12,
    41: 14,
    43: 16,
    45: 18,
    47: 20,
    49: 22,
    51: 24,
    53: 26,
    55: 28
};

const waistMap = {
    24: 6,
    25: 8,
    27: 10,
    29: 12,
    31: 14,
    33: 16,
    35: 18,
    37: 20,
    39: 22,
    41: 24,
    43: 26,
    45: 28
};

const bustMap = {
    31: 6,
    32: 8,
    34: 10,
    36: 12,
    38: 14,
    40: 16,
    42: 18,
    44: 20,
    46: 22,
    48: 24,
    50: 26,
    52: 28
};

/**
 * Helper returns closest key value that we have available
 * for any given entered value by calculating differences
 */
function getKey(map, valueGiven) {
    let confKey = null, confLowestDifference = null;
    Object.keys(map).forEach((size) => {
        size = parseInt(size, 10);
        const given = parseInt((valueGiven + '').trim(), 10),
            diff = Math.abs(given - size);    

        if(confLowestDifference === null || diff <= confLowestDifference) {
            confLowestDifference = diff;
            confKey = size
        }
    });

    return confKey;
}

export function calculateSize(bust, waist, hip) {
    // --------------------------------------------------------
    // Calculate differences between values given to determine key
    // --------------------------------------------------------
    const hipKey = getKey(hipMap, hip);
    const waistKey = getKey(waistMap, waist);
    const bustKey = getKey(bustMap, bust);

    if(hipKey && waistKey && bustKey) {
        const hipValue = hipMap[hipKey];
        const waistValue = waistMap[waistKey];
        const bustValue = bustMap[bustKey];

        return Math.max(hipValue, waistValue, bustValue);
    }
}

export function ukSizeToCountrySize(ukSize) {
    return countrySizes[parseInt(ukSize, 10)];
}
