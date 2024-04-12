export const capitalizeText = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export function replaceUnderscoreWithSpace(str) {
    return str.replace(/_/g, " ");
}
