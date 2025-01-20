import { http } from "@/lib/http";

export const user = {
  baseUrl: "/user",
  getCurrentUser() {
    return http.get(this.baseUrl);
  },
};
