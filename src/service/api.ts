const API_ROUTE = {
  //AUth Routes
  LOGIN: "/api/auth/login",
  USER_REGISTER: "/api/auth/registrations",
  EMAIL_VERIFICATION: "/api/auth/email-verifications",
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  RESET_PASSWORD: "/api/auth/reset-password",
  CHANGE_PASSWORD: "/api/auth/change-password",
  LOGGED_IN_USER: "/api/auth/me",
  LOGOUT: "/api/auth/logout",
  GET_USER_COMPANY_AND_PRODUCTS: "/api/auth/my/company-products",

  // File Upload Routes
  ANY_FILE_UPLOAD: "/api/v1/uploads",
  IMAGE: "/api/v1/uploads/images",
  AUDIO: "/api/v1/uploads/audios",
  VIDEO: "/api/v1/uploads/videos",
  WORD_DOCS: "/api/v1/uploads/word-docs",
  EXCEL: "/api/v1/uploads/spread-sheets",
  CSV: "/api/v1/uploads/csvs",
  PDF: "/api/v1/uploads/pdfs",
  JSON: "/api/v1/uploads/jsons",
  XML: "/api/v1/uploads/xmls",

  // compnanies
  POST_COMPANIES: "/api/v1/companies",
  GET_COMPANIES: "/api/v1/companies",
  GET_COMPANY_BY_ID: "/api/v1/companies",
  GET_COMPANY_BY_SUBDOMAIN: "/api/v1/companies",
  GET_COMPANY_BY_SUBDOMAIN_TEST: "/api/v1/companies/sabkura",
  DELETE_COMPANY_BY_ID: "/api/v1/companies",
  UPDATE_COMPANY_BY_ID: "/api/v1/companies",

  // company product
  BUY_COMPANY_PRODUCT_BY_ID: "/api/v1/companies",

  // company documents
  GET_DOCUMENTS_BY_COMPANY_ID: "/api/v1/companies",
  POST_DOCUMENTS_BY_COMPANY_ID: "/api/v1/companies",

  // products
  GET_PRODUCTS_LIST: "/api/v1/products",
  GET_PRODUCTS_BY_ID: "/api/v1/products",

  //roles
  GET_ROLES: "/api/v1/roles",
  POST_ROLES: "/api/v1/roles",

  // Socisl Links
  GET_SOCIAL_LINKS_BY_COMPANYID: "/api/v1/companies",

  // visa types
  GET_VISA_TYPES: "/api/v1/visa-types",
  POST_VISA_TYPES: "/api/v1/visa-types",

  //  Client Management agents routes
  CLIENT_MANAGEMENT_AGENTS: "/api/v1/client-management/agents",
  GET_CLIENT_MANAGEMENT_AGENTS: "/api/v1/client-management/agents",
  POST_CLIENT_MANAGEMENT_AGENTS: "/api/v1/client-management/agents",
  UPDATE_CLIENT_MANAGEMENT_AGENTS: "/api/v1/client-management/agents",

  //  Client Management institutes routes
  CM_ENROLLMENT: "/api/v1/client-management/enroll-institutes",
  CM_VISITORS: "/api/v1/client-management/visitors",
  CM_AGENTS: "/api/v1/client-management/agents",
  CM_ENROLLMENT_OPENINGS: "/api/v1/client-management/enrollment-openings",
  CM_INFORMATION_CHANNEL:
    "/api/v1/client-management/common-information-channels",
  CM_VISITING_PURPOSES: "/api/v1/client-management/common-visiting-purposes",

  // user
  USER: "/api/v1/users",
  GET_CURRENCY: "/api/v1/currencies",
  CM_CLIENTS: "/api/v1/client-management/clients",

  //  payment methods
  PAYMENT_METHODS: "/api/v1/payment-methods",

  //transaction types
  TRANSACTION_TYPE: "/api/v1/client-management/transaction-types",
  GET_TRANSACTION_TYPE: "/api/v1/client-management/transaction-types",
  POST_TRANSACTION_TYPE: "/api/v1/client-management/transaction-types",
  UPDATE_TRANSACTION_TYPE: "/api/v1/client-management/transaction-types",
  DELETE_TRANSACTION_TYPE: "/api/v1/client-management/transaction-types",

  // financial accounts

  FINANCIAL_ACCOUNT: "/api/v1/financial-accounts",
  GET_FINANCIAL_ACCOUNT: "/api/v1/financial-accounts",
  POST_FINANCIAL_ACCOUNT: "/api/v1/financial-accounts",
  UPDATE_FINANCIAL_ACCOUNT: "/api/v1/financial-accounts",
  DELETE_FINANCIAL_ACCOUNT: "/api/v1/financial-accounts",

  // company statuses
  STATUSES: "/api/v1/statuses",
  GET_STATUSES: "/api/v1/statuses",
  POST_STATUSES: "/api/v1/statuses",
  UPDATE_STATUSES: "/api/v1/statuses",
  DELETE_STATUSES: "/api/v1/statuses",

  // Client-management CM transtations
  TRANSACTION: "/api/v1/client-management/clients/transactions",
  GET_TRANSACTION: "/api/v1/client-management/clients",
  POST_TRANSACTION: "/api/v1/client-management/clients",
};

// export default API_ROUTE as { [key in keyof typeof API_ROUTE]: string };
export default API_ROUTE;
