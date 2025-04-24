export const findNumberAndContainer = (arr, target) => {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            const result = findNumberAndContainer(arr[i], target);
            if (result) {
                return {
                    number: target,
                    container: arr[i],
                    path: [i].concat(result.path),
                    json: result.json
                };
            }
        } else if (arr[i] === target) {
            let jsonOutput = {};
            let containerCopy = [...arr];
            containerCopy.splice(i, 1);
            jsonOutput[target] = containerCopy;
            return {
                number: target,
                container: arr,
                path: [i],
                json: jsonOutput
            };
        }
    }
    return null;
}