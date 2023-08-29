import APP_SETTING from "../config/AppSetting.ts";
const { VITE_BASE_URL } = APP_SETTING;

function getSubdomain(url: string) {
    // Regular expression pattern to match the subdomain
    // eslint-disable-next-line no-useless-escape
    const subdomainPattern = /^(?:https?:\/\/)?([^\/]+)/i;
    const match = url.match(subdomainPattern);
    return match ? match[1] : undefined;
}

export const getSubdomainV2 = () => {
    const DOMAIN = "https://app.dev.nydoz.com";
    const fullDomainFromUrl = "https://sabkura.app.dev.nydoz.com";
    const [httpPart, mainDomainPart] = DOMAIN.split("://");
    console.log({ httpPart, mainDomainPart });
    const parts = fullDomainFromUrl.split(mainDomainPart);
    console.log(parts, "parts");
    const subdomainAndHttp = parts[0];
    const subdomainByPart = subdomainAndHttp.split("://");
    console.log(subdomainByPart, "subdomainByPart");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_httpPart, subdomain] = subdomainByPart;

    return subdomain;
};

export default getSubdomain;
