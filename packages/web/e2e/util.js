import { handlers } from "@/mocks/handlers";
import { test as base, expect } from "@playwright/test";
import { createWorker } from "playwright-msw";

const test = base.extend({
  worker: [
    async ({ page }, use) => {
      const server = await createWorker(page, handlers);
      await use(server);
    },
    {
      scope: "test",
      auto: true,
    },
  ],
});

export { expect, test };
