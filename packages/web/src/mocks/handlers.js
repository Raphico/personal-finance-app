import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(getUrl("/user"), () => {
    return new HttpResponse("unauthorized", {
      status: 401,
    });
  }),

  http.post(getUrl("/auth/refresh"), () => {
    return new HttpResponse("unauthorized", {
      status: 401,
    });
  }),

  http.post(getUrl("/auth/login"), async ({ request }) => {
    const { email } = await request.json();

    return HttpResponse.json({
      data: {
        id: "p0n0m3aeh1a54m25937zs90n",
        email,
        name: "john doe",
      },
      status: "ok",
      message: "login successful",
    });
  }),

  http.post(getUrl("/auth/signup"), async ({ request }) => {
    const { email, name } = await request.json();

    return HttpResponse.json({
      data: {
        id: "p0n0m3aeh1a54m25937zs90n",
        email,
        name,
      },
      status: "ok",
      message:
        "User signup successful. A verification code has been sent to your email",
    });
  }),

  http.post(getUrl("/auth/verification"), async () => {
    return HttpResponse.json({
      data: {
        isEmailVerified: true,
      },
      message: "email verification successful",
      status: "ok",
    });
  }),

  http.post(getUrl("/auth/resend-verification"), async () => {
    return HttpResponse.json({
      data: null,
      status: "ok",
      message:
        "If the email exists in our records, you will receive a verification code shortly.",
    });
  }),

  http.post(getUrl("/auth/password-reset-requests"), () => {
    return HttpResponse.json({
      data: null,
      message:
        "If your email is in our records, a password reset link will be sent shortly",
      status: "ok",
    });
  }),

  http.patch(getUrl("/auth/password-resets/:token"), () => {
    return HttpResponse.json({
      data: null,
      message: "password reset successful",
      status: "ok",
    });
  }),
];

function getUrl(endpoint) {
  return `http://localhost:8080/api/v1${endpoint}`;
}
