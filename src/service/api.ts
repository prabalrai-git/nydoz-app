const API_ROUTE = {
    //AUth Routes
    LOGIN: "auth/login",
    USER_REGISTER: "auth/registrations",
    EMAIL_VERIFICATION: "auth/email-verifications",
    FORGOT_PASSWORD: "auth/forgot-password",
    RESET_PASSWORD: "auth/reset-password",
    CHANGE_PASSWORD: "auth/change-password",
    LOGGED_IN_USER: "auth/me",
    LOGOUT: "auth/logout",

    // File Upload Routes
    ANY_FILE_UPLOAD: "v1/uploads",
    IMAGE: "v1/uploads/images",
    AUDIO: "v1/uploads/audios",
    VIDEO: "v1/uploads/videos",
    WORD_DOCS: "v1/uploads/word-docs",
    EXCEL: "v1/uploads/excel-sheets",
    CSV: "v1/uploads/csvs",
    PDF: "v1/uploads/pdfs",
    JSON: "v1/uploads/jsons",
    XML: "v1/uploads/xmls",
};

// export default API_ROUTE as { [key in keyof typeof API_ROUTE]: string };
export default API_ROUTE;
