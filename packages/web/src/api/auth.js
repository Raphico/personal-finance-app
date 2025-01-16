import { http } from "@/lib/http";

export const auth = {
  login(email, password) {
    return http.post("/auth/login", {
      email,
      password,
    });
  },
  signup(name, email, password) {
    return http.post("/auth/signup", {
      name,
      email,
      password,
    });
  },
  verifyEmail(code) {
    return http.post("/auth/verification", {
      code,
    });
  },
  resendEmailVerification(email) {
    return http.post("/auth/resend-verification", { email });
  },
  logout() {
    return http.post("/auth/logout");
  },
};
