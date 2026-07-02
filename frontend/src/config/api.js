const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const apiBaseUrl = API_BASE_URL.replace(/\/$/, "");

export const buildApiUrl = (path) => `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;

export default apiBaseUrl;
