import { defineConfig } from '@playwright/test';

const FileNameTestReporter = require.resolve('./tests/reporters/FileNameTestReporter');

export default defineConfig({
  testDir: 'tests', // Directorio donde se encuentran los tests
  fullyParallel: false, // Ejecutar pruebas en paralelo
  forbidOnly: !!process.env.CI, // Prohibir .only en CI
  retries: process.env.CI ? 2 : 0, // Reintentar pruebas fallidas en CI
  workers: process.env.CI ? 1 : undefined, // Número de trabajadores en CI
  reporter: [
    [FileNameTestReporter],
    ['html', { outputFolder: 'htmlreport/filename/testname', open: 'never' }],
    ['list', { printSteps: true }], // Reporte en lista con pasos
  ],
  timeout: 90000, // Timeout de 90 segundos (1 minuto y 30 segundos)

  use: {
    trace: 'on-first-retry', // Traza en el primer reintento
    video: 'on', // Grabar video en todas las ejecuciones de prueba
  },

  projects: [
    {
      name: 'Chrome', // Configuración para Chrome
      use: {
        browserName: 'chromium', // Usar Chromium para Chrome
        channel: 'chrome', // Especificar el canal de Chrome
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
