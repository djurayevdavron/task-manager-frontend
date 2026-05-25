import axios from "axios";

const api = axios.create({
  baseURL:
    "https://task-management-backend-czvp.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "accessToken"
      );
    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(
      error
    );
  }
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {

    // INTERNET YO'Q

    if (
      !error.response
    ) {
      window.location.href =
        "/500";
    }
    // SERVER ERROR
    if (
      error.response?.status === 500
    ) {
      window.location.href =
        "/500";
    }
    const originalRequest =
      error.config;
    // TOKEN EXPIRED
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes(
        "/auth/login"
      )
    ) {
      originalRequest._retry =
        true;
      try {
        const refreshToken =
          localStorage.getItem(
            "refreshToken"
          );
        const response =
          await axios.post(
            "https://task-management-backend-czvp.onrender.com/api/auth/refresh",
            {
              refreshToken,
            }
          );

        const newAccessToken =
          response.data.tokens
            .accessToken;
        const newRefreshToken =
          response.data.tokens
            .refreshToken;

        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        localStorage.setItem(
          "refreshToken",
          newRefreshToken
        );
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;
        return api(
          originalRequest
        );
      } catch (refreshError) {
        localStorage.removeItem(
          "accessToken"
        );
        localStorage.removeItem(
          "refreshToken"
        );
        localStorage.removeItem(
          "user"
        );
        window.location.href =
          "/login";
        return Promise.reject(
          refreshError
        );
      }
    }
    return Promise.reject(
      error
    );
  }
);
export default api;