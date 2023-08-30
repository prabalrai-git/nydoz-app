import APP_SETTING from "../config/AppSetting.ts";
const { DOMAIN, LOCALHOST } = APP_SETTING;

const getBaseUrl = (url: string) => {
    const parsedUrl = new URL(url);
    return `${parsedUrl.protocol}//${parsedUrl.host}`;
};

export const getSubdomain = () => {
    const baseUrl = getBaseUrl(window.location.href);
    console.log(baseUrl, "baseUrl");
    if (LOCALHOST || baseUrl === DOMAIN) return "";
    const domainWithSubdomain = baseUrl;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_httpPartMain, mainDomainPart] = DOMAIN.split("://");
    const removeDomainFromSubDomain = domainWithSubdomain.replace(
        `.${mainDomainPart}`,
        ""
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_httpPartSubDomain, subDomain] =
        removeDomainFromSubDomain.split("://");
    console.log("subDomain", subDomain);
    return subDomain;
};

export default getSubdomain;
