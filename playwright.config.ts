import { defineConfig } from '@playwright/test';

const FileNameTestReporter = require.resolve('./tests/reporters/FileNameTestReporter');

export default defineConfig({
  testDir: 'tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.NO_HTML_REPORT === 'true' 
    ? [['list']]  // Usamos el arreglo de reportes correctamente
    : [
        ['html', { outputFolder: 'htmlreport/filename/testname', open: 'never' }],
        ['list', { printSteps: true }],
      ],
  timeout: 90000,
  use: {
    trace: 'on-first-retry',
    video: 'on'
  },
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: true,
        video: 'on'
      },
    },
    // {
    //   name: 'Firefox', // Configuración para Firefox
    //   use: {
    //     browserName: 'firefox', // Usar Firefox
    //     video: 'on'
    //   },
    // },
    // {
    //   name: 'Safari', // Configuración para Safari
    //   use: {
    //     //browserName: 'webkit', // Usar WebKit para Safari
    //     video: 'on'
    //   },
    // },
    // {
    //   name: 'Microsoft Edge', // Configuración para Edge
    //   use: {
    //     browserName: 'chromium', // Usar Chromium para Edge
    //     channel: 'msedge', // Especificar el canal de Edge
    //     video: 'on'
    //   },
    // },
  ],
});
