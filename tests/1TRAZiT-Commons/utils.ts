import * as fs from 'fs/promises';
import * as path from 'path';
import { exec } from 'child_process';

// Función auxiliar para verificar si un directorio ya existe
export async function directoryExistsv1(dirPath) {
  try {
    await fs.access(dirPath);
    return true;
  } catch (error) {
    return false;
  }
}

export async function renameReportFoldersv1(testInfo) {
  const baseDir = 'htmlreport';
  const logFilePath = path.join(baseDir, 'test_names.log');
  
  try {
    if (!testInfo|| !testInfo.title) {
      throw new Error('testInfo undefined')
    }
    // Lee el archivo test_names.log para obtener el nombre del archivo y de la prueba
    const logContent = await fs.readFile(logFilePath, 'utf8');
    const lines = logContent.trim().split('\n');
    const [fileName, testName] = lines[0].split(' '); 

    // Renombrar las carpetas según el testInfo.title
    const newFileName = testInfo.title.replace(/\s+/g, '_');
    const currentTestDir = path.join(baseDir, `[filename]/[testname]`);
    let newTestDir = path.join(baseDir, `${fileName}/${newFileName}`);

    // Verificar si la carpeta destino ya existe
    if (await directoryExists(newTestDir)) {
      // Si la carpeta ya existe, añadimos un sufijo único para evitar conflictos
      await fs.rm(newTestDir, { recursive: true, force: true });
      console.log(`Carpeta existente eliminada: ${newTestDir}`);
    }

    // Verificar si las carpetas existen y renombrarlas
    if (await fs.stat(currentTestDir)) {
      await fs.rename(currentTestDir, newTestDir);
      console.log(`renameReportFolders: Renombrado el directorio de test a: ${newTestDir}`);
    } else {
      console.error('renameReportFolders: Error: No se encontró la carpeta para renombrar.');
    }
    return newTestDir
  } catch (error) {
    console.error('renameReportFolders: Error al renombrar las carpetas:', error);
    return null
  }
}
export async function renameReportFolders(testInfo) {
  const baseDir = 'htmlreport';
  const logFilePath = path.join(baseDir, 'test_names.log');
  
  try {
    // Lee el archivo test_names.log para obtener el nombre del archivo y de la prueba
    const logContent = await fs.readFile(logFilePath, 'utf8');
    const lines = logContent.trim().split('\n');
    
    // Verifica si el log tiene contenido válido
    if (lines.length === 0) {
      throw new Error('El archivo de log está vacío o no contiene entradas válidas');
    }

    const [fileName, testName] = lines[0].split(' '); 

    // Verifica que se obtuvieron fileName y testName correctamente
    if (!fileName || !testName) {
      throw new Error(`No se pudo obtener fileName o testName desde el archivo de log. fileName: ${fileName}, testName: ${testName}`);
    }

    // Renombrar las carpetas según el testInfo.title
    const newFileName = testInfo.title.replace(/\s+/g, '_');
    const currentTestDir = path.join(baseDir, "[fileName]", "[testName]"); // Usamos fileName y testName del log
    const newTestDir = path.join(baseDir, newFileName, newFileName); // Renombramos a newFileName

    // Verificar si la carpeta de origen existe
    if (!await directoryExists(currentTestDir)) {
      throw new Error(`El directorio a renombrar no existe: ${currentTestDir}`);
    }

    // Si existe, eliminamos la carpeta destino si ya existe
    if (await directoryExists(newTestDir)) {
      await fs.rm(newTestDir, { recursive: true, force: true });
      console.log(`Carpeta existente eliminada: ${newTestDir}`);
    }

    // Renombrar la carpeta actual
    await fs.rename(currentTestDir, newTestDir);
    console.log(`Renombrado el directorio de test a: ${newTestDir}`);

    // Devuelve la nueva ruta renombrada
    return newTestDir;

  } catch (error) {
    console.error('Error en RenameReportFolders:', error);
    return null;
  }
}

// Función auxiliar para verificar si un directorio ya existe
export async function directoryExists(dirPath) {
  try {
    await fs.access(dirPath);
    return true;
  } catch (error) {
    return false;
  }
}

export async function uploadReportToAWS(bucketName, renameReportDir, newInnerDir) {
  if (!renameReportDir|| typeof renameReportDir != 'string') {
    throw new Error('testInfo undefined '+renameReportDir)
  }

  const profile = 'default';
  const playwrightReportsDir = 'playwright_reports';

  // Comando para subir a AWS
  const awsCommand = `
    aws --profile ${profile} s3 sync ${renameReportDir} s3://${bucketName}/${playwrightReportsDir}/ --delete --sse AES256 --cache-control no-cache
  `;

  // Ejecutar el comando de AWS en un proceso hijo
  exec(awsCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Error al subir el reporte a AWS:', error);
      return;
    }
    if (stderr) {
      console.error('AWS Error:', stderr);
    }
    console.log('Reporte subido exitosamente a AWS:', stdout);
  });
}
