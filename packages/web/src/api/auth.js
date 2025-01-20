import { http } from "@/lib/http";

export const auth = {
  baseUrl: "/auth",
  login(email, password) {
    return http.post(`${this.baseUrl}/login`, {
      email,
      password,
    });
  },
  signup(name, email, password) {
    return http.post(`${this.baseUrl}/signup`, {
      name,
      email,
      password,
    });
  },
  refreshAccessToken() {
    return http.post(`${this.baseUrl}/refresh`);
  },
  verifyEmail(code) {
    return http.post(`${this.baseUrl}/verification`, {
      code,
    });
  },
  resendEmailVerification(email) {
    return http.post(`${this.baseUrl}/resend-verification`, { email });
  },
  logout() {
    return http.post(`${this.baseUrl}/logout`);
  },
};
