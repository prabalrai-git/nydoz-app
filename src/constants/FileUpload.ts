import { FileType } from "../types/fileUpload.type";

const FILE_UPLOAD_TYPE = {
    ANY_FILE_UPLOAD: "ANY_FILE_UPLOAD",
    IMAGE: "IMAGE",
    AUDIO: "AUDIO",
    VIDEO: "VIDEO",
    WORD_DOCS: "WORD_DOCS",
    PDF: "PDF",
    JSON: "JSON",
    XML: "XML",
    CSV: "CSV",
    EXCEL: "EXCEL",
};

export const FILE_ACCEPT_TYPE = {
    ANY_FILE_UPLOAD: "*",
    IMAGE: "image/*",
    AUDIO: "audio/*",
    VIDEO: "video/*",
    WORD_DOCS: ".doc,.docx,.rtf",
    PDF: ".pdf",
    JSON: ".json",
    XML: ".xml",
    CSV: ".csv",
    EXCEL: ".xls,.xlsx",
};

export default FILE_UPLOAD_TYPE as { [key in FileType]: FileType };
