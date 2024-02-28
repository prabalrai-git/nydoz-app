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
    // console.log("development condition running");
    return {
      subDomain: LOCAL_SUBDOMAIN,
      protocol: "",
      domainBase: "",
    };
  }

  if (ENVIRONMENT !== "development" && baseUrl === DOMAIN) {
    // console.log("deployed and no subdomain  condition running");
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
    // console.log("deployed with subdomain  condition running", {
    //     domianFromEnv: DOMAIN,
    //     domainWithSubdomain,
    //     _httpPartMain,
    //     mainDomainPart,
    //     removeDomainFromSubDomain,
    //     _httpPartSubDomain,
    //     subDomain,
    // });
    return {
      subDomain,
      protocol: _httpPartMain,
      domainBase: mainDomainPart,
    };
  }
};

export default getSubdomain;
