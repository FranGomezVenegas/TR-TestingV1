import { defineConfig, devices } from '@playwright/test';

const FileNameTestReporter = require.resolve('./tests/reporters/FileNameTestReporter');

export default defineConfig({
  testDir: 'tests', // Directorio donde se encuentran los tests
  fullyParallel: false, // Ejecutar pruebas en paralelo
  forbidOnly: !!process.env.CI, // Prohibir .only en CI
  retries: process.env.CI ? 2 : 0, // Reintentar pruebas fallidas en CI
  workers: process.env.CI ? 1 : undefined, // Número de trabajadores en CI
  reporter: [
    [FileNameTestReporter], 
    ['html', { outputFolder: 'htmlreport/filename/testname', open: 'never'}],
    ['list', { printSteps: true }], // Reporte en lista con pasos
  ],
  timeout: 80000,
  
  use: {
    trace: 'on-first-retry', 
  //video: 'on', // Guardar videos de pruebas
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'Google Chrome', // Configuración para Google Chrome
      use: { ...devices['Desktop Chrome'], video: 'on' },
      
    }
    
    //  {
    //    name: 'Firefox',
    //    use: { ...devices['Firefox'], video: 'on'},
    //  },

    // {
    //   name: 'Apple Safari',
    //    use: { ...devices['Safari'], video: 'on' },
    // },

    // {
	  //  name: 'Microsoft Edge',
    //    use: { ...devices['Desktop Edge'], 
    //    channel: 'msedge', video: 'on' },
    // },
  ],
});
