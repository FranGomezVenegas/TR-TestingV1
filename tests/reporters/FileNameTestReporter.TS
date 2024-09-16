// FileNameTestReporter.ts:
import { Reporter, TestCase, TestResult, FullResult, FullConfig } from '@playwright/test/reporter';
import * as fs from 'fs'; // Importar fs para operaciones sincrónicas
import * as fs1 from 'fs/promises'; // Importar fs/promises para operaciones asíncronas
import * as path from 'path'; 
import { exec } from 'child_process'; 
import { promisify } from 'util';

// Convertir exec en una promesa
const execPromise = promisify(exec);

class FileNameTestReporter implements Reporter {
  private baseDir: string; 
  private logFile: string; 


  constructor() {
    this.baseDir = 'htmlreport'; 
    this.logFile = path.join(this.baseDir, 'test_names.log'); 
  }

  async onBegin(config: FullConfig): Promise<void> {
    console.log('Inicializando el reporter...'); 
    await fs1.mkdir(this.baseDir, { recursive: true }); 
    await fs1.writeFile(this.logFile, ''); 
    console.log('Archivo de log inicializado:', this.logFile); 
  
  }

  async onTestEnd(test: TestCase, result: TestResult): Promise<void> {
    try {
      const fileName = path.parse(test.location.file).name; 
      const testName = test.title.replace(/\s+/g, '_'); 
      const logEntry = `${testName} ${testName}\n`; // Corrección: usar fileName en lugar de testName
      await fs1.appendFile(this.logFile, logEntry); 
      console.log('Registro de prueba añadido al log:', logEntry.trim()); 
    } catch (error) {
      console.error('Error en onTestEnd:', error); 
    }
  }

  // async onEnd(result: FullResult): Promise<void> {
  //   console.log("Reporte finalizado.")
  // }

  
  // async onEnd(result: FullResult): Promise<void> {
  //   console.log('Finalizando el reporter...');

  //   try {
  //     // Llamada al archivo .bat después de completar los tests y generar los reportes
  //     const scriptPath = path.join(__dirname, 'RenameAndAWS.bat');
  //     console.log(`Ruta absoluta del script: ${scriptPath}`);

  //     const { stdout, stderr } = await execPromise(`"${scriptPath}"`);
  //     if (stderr) {
  //       throw new Error(`Error al ejecutar el script: ${stderr}`);
  //     }
  //     console.log('Salida del script:', stdout);
  //   } catch (error) {
  //     console.error('Error al ejecutar el script .bat:', error);
  //   }
  // }
  
}


export default FileNameTestReporter;
