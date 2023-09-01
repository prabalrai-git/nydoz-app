import APP_SETTING from "../config/AppSetting.ts";
const { DOMAIN, ENVIRONMENT } = APP_SETTING;

const getBaseUrl = (url: string) => {
    const parsedUrl = new URL(url);
    return `${parsedUrl.protocol}//${parsedUrl.host}`;
};

export const getSubdomain = () => {
    const baseUrl = getBaseUrl(window.location.href);
    console.log("url from browser", baseUrl);
    if (ENVIRONMENT === "development" || baseUrl === DOMAIN)
        return {
            subDomain: "",
            protocol: "",
            domainBase: "",
        };
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
    console.log("subDomain from Function", {
        domianFromEnv: DOMAIN,
        domainWithSubdomain,
        _httpPartMain,
        mainDomainPart,
        removeDomainFromSubDomain,
        _httpPartSubDomain,
        subDomain,
    });
    return {
        subDomain,
        protocol: _httpPartMain,
        domainBase: mainDomainPart,
    };
};

export default getSubdomain;
