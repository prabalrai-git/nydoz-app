export function arrayToObject(arr) {
    return arr.reduce((obj, key) => {
        obj[key] = "";
        return obj;
    }, {});
}
