export const capitalizeText = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export function replaceUnderscoreWithSpace(str: string) {
    return str.replace(/_/g, " ");
}
