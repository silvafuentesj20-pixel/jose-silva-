import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:8743', channel: process.env.PLAYWRIGHT_CHANNEL || undefined },
  webServer: { command: 'node serve.mjs', url: 'http://127.0.0.1:8743/', reuseExistingServer: !process.env.CI },
});
