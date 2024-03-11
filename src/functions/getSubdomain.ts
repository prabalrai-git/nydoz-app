import APP_SETTING from "../config/AppSetting.ts";
const { DOMAIN, ENVIRONMENT, LOCAL_SUBDOMAIN } = APP_SETTING;

const getBaseUrl = (url: string) => {
  const parsedUrl = new URL(url);
  return `${parsedUrl.protocol}//${parsedUrl.host}`;
};

export const getSubdomain = () => {
  const baseUrl = getBaseUrl(window.location.href);
  const [_httpPartMain, mainDomainPart] = DOMAIN.split("://");

  if (ENVIRONMENT === "development") {
    return {
      subDomain: LOCAL_SUBDOMAIN,
      protocol: "",
      domainBase: "",
    };
  }

  if (ENVIRONMENT !== "development" && baseUrl === DOMAIN) {
    return {
      subDomain: mainDomainPart,
      protocol: "",
      domainBase: "",
    };
  }

  if (ENVIRONMENT !== "development" && baseUrl !== DOMAIN) {
    const domainWithSubdomain = baseUrl;

    const removeDomainFromSubDomain = domainWithSubdomain.replace(
      `.${mainDomainPart}`,
      ""
    );
    const [_httpPartSubDomain, subDomain] =
      removeDomainFromSubDomain.split("://");

    return {
      subDomain,
      protocol: _httpPartMain,
      domainBase: mainDomainPart,
    };
  }
};

export default getSubdomain;
