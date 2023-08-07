export function arrayToObject(arr: string[]) {
    return arr.reduce((obj, key) => {
        obj[key as string] = "";
        return obj;
    }, {} as { [key: string]: string });
}
