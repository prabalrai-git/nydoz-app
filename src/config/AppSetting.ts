const APP_SETTING = {
  PROD: import.meta.env.PROD,
  VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
  DOMAIN: import.meta.env.VITE_DOMAIN,
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT,
  LOCAL_SUBDOMAIN: import.meta.env.VITE_LOCAL_SUBDOMAIN,
  LOGIN_URL: import.meta.env.VITE_LOGIN_URL,
};

export default APP_SETTING;
