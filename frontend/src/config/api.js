const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").trim();

export const apiBaseUrl = API_BASE_URL.replace(/\/$/, "");

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return apiBaseUrl ? `${apiBaseUrl}${normalizedPath}` : normalizedPath;
};

export default apiBaseUrl;
