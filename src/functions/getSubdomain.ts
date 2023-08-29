import APP_SETTING from "../config/AppSetting.ts";
const { DOMAIN, PROD } = APP_SETTING;

function getSubdomain(url: string) {
    // Regular expression pattern to match the subdomain
    // eslint-disable-next-line no-useless-escape
    const subdomainPattern = /^(?:https?:\/\/)?([^\/]+)/i;
    const match = url.match(subdomainPattern);
    return match ? match[1] : undefined;
}

export const getSubdomainV2 = () => {
    const fullDomainFromUrl = PROD
        ? window.location.hostname
        : "https://sabkura.app.dev.nydoz.com";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_httpPart2, mainDomainPart] = DOMAIN.split("://");
    const parts = fullDomainFromUrl.split(mainDomainPart);
    const subdomainAndHttp = parts[0];
    const subdomainByPart = subdomainAndHttp.split("://");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_httpPart, subdomain] = subdomainByPart;
    console.log({ subdomain });
    return subdomain;
};

export default getSubdomain;
