import { test, expect } from "./util";

test.describe.parallel("Auth", () => {
  test("user can login with valid credentials", async ({ page }) => {
    await page.goto("/auth/login");

    await page.getByLabel("email").fill("test@gmail.com");
    await page.getByLabel(/^password/).fill("password@999");

    await page.getByRole("button", { name: /login/i }).dispatchEvent("click");

    await expect(page).toHaveURL("/overview");
  });

  test("user can signup with valid credentials", async ({ page }) => {
    await page.goto("/auth/signup");

    await page.getByLabel("name").fill("test");
    await page.getByLabel("email").fill("test@gmail.com");
    await page.getByLabel(/^password/).fill("password@999");

    await page
      .getByRole("button", { name: /create account/i })
      .dispatchEvent("click");

    await expect(page).toHaveURL(/\/auth\/verify-email\?redirect=.*&email=.*/);
  });

  test("user should be able to verify their email", async ({ page }) => {
    await page.goto("/auth/verify-email");

    await page.locator("[data-test='input-1']").press("1");
    await page.locator("[data-test='input-2']").press("2");
    await page.locator("[data-test='input-3']").press("3");
    await page.locator("[data-test='input-4']").press("4");
    await page.locator("[data-test='input-5']").press("5");
    await page.locator("[data-test='input-6']").press("6");

    await page.getByRole("button", { name: /verify/i }).dispatchEvent("click");

    await expect(page).toHaveURL(/\/auth\/login\?redirect=.*/);
  });

  test("user can request reset password", async ({ page }) => {
    await page.goto("/auth/forgot-password");

    await page.getByLabel("email").fill("test@gmail.com");

    await page
      .getByRole("button", { name: /continue/i })
      .dispatchEvent("click");

    await expect(page).toHaveURL(
      /\/auth\/forgot-password-confirmation\?redirect=.*&email=.*/
    );
  });

  test("user can reset password", async ({ page }) => {
    await page.goto("/auth/reset-password/token");

    await page.getByLabel(/new password/i).fill("password@999");

    await page
      .getByRole("button", { name: /reset password/i })
      .dispatchEvent("click");

    await expect(page).toHaveURL("/auth/login");
  });
});
