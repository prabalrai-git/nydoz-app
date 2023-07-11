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
    DELETE_COMPANY_BY_ID: "/api/v1/companies",

    // company documents
    GET_DOCUMENTS_BY_COMPANY_ID: "/api/v1/companies",
    POST_DOCUMENTS_BY_COMPANY_ID: "/api/v1/companies",

    // products
    products: "/api/v1/products",

    //roles
    GET_ROLES: "/api/v1/roles",
    POST_ROLES: "/api/v1/roles",

    //  Client Management agents routes
    GET_CLIENT_MANAGEMENT_AGENTS: "/api/v1/client-management/agents",
};

// export default API_ROUTE as { [key in keyof typeof API_ROUTE]: string };
export default API_ROUTE;
