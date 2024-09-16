const fs = require('fs');
const { exec } = require('child_process');

async function uploadReport(AWS_BUCKET) {
  // Si no se pasa el argumento AWS_BUCKET, se lanza un error.
  if (!AWS_BUCKET) {
    console.error('Error: Debes proporcionar el nombre del bucket de AWS como argumento.');
    return;
  }
  await waitForFile(reportPath, 60000); 
  
  const profile = 'default';
  const playwrightReportsDir = 'playwright_reports';
  //const reportsDir = '/D/FrontE-Testing-master/htmlreport';
  const reportsDir = 'E:/FrontE-Testing-master/htmlreport';
  const currentFileName = 'filename';
  const currentTestName = 'testname';

  const newFileName = 'UpdateInstrumentFamily';
  const newTestName = 'UpdateInstrumentFamily';

  const currentOuterDir = `${reportsDir}/${currentFileName}`;
  const currentInnerDir = `${currentOuterDir}/${currentTestName}`;
  const newOuterDir = `${reportsDir}/${newFileName}`;
  const newInnerDir = `${newOuterDir}/${newTestName}`;

  // Mostrar configuración inicial
  console.log(`Configuración inicial:
    AWS_BUCKET: ${AWS_BUCKET}
    Profile: ${profile}
    Playwright Reports Directory: ${playwrightReportsDir}
    Report Directory: ${reportsDir}
    Current File Name: ${currentFileName}
    Current Test Name: ${currentTestName}
    New File Name: ${newFileName}
    New Test Name: ${newTestName}
    Rutas actuales:
    Current Outer Directory: ${currentOuterDir}
    Current Inner Directory: ${currentInnerDir}
    Rutas nuevas:
    New Outer Directory: ${newOuterDir}
    New Inner Directory: ${newInnerDir}`);

  // Verificar si el directorio actual existe
  if (fs.existsSync(currentInnerDir)) {
    console.log(`El directorio interior existe: ${currentInnerDir}`);
    
    // Crear el nuevo directorio si no existe
    if (!fs.existsSync(newOuterDir)) {
      fs.mkdirSync(newOuterDir, { recursive: true });
    }

    // Mover el directorio interior
    fs.renameSync(currentInnerDir, newInnerDir);
    console.log(`Carpeta interior renombrada y movida: ${currentInnerDir} -> ${newInnerDir}`);

    // Eliminar el directorio exterior anterior y renombrar el nuevo
    fs.rmdirSync(currentOuterDir);
    fs.renameSync(newInnerDir, `${newOuterDir}/${newTestName}`);
    console.log(`Carpeta exterior renombrada: ${currentOuterDir} -> ${newOuterDir}`);

    // Subir a AWS S3
    console.log(`Subiendo el reporte a AWS Bucket: ${AWS_BUCKET}`);

    // Eliminar carpeta existente en S3
    exec(`aws --profile ${profile} s3 rm s3://${AWS_BUCKET}/${playwrightReportsDir}/${newFileName} --recursive`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error al eliminar carpeta existente en S3: ${stderr}`);
        return;
      }

      // Subir nueva carpeta de reportes a S3
      exec(`aws --profile ${profile} s3 sync "${newOuterDir}" s3://${AWS_BUCKET}/${playwrightReportsDir}/${newFileName} --delete --sse AES256 --cache-control no-cache`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error al subir el reporte a S3: ${stderr}`);
          return;
        }
        console.log(`Reporte subido exitosamente a AWS Bucket: ${AWS_BUCKET}`);
      });
    });
  } else {
    console.error(`Error: El directorio ${currentInnerDir} no existe. No se puede renombrar.`);
  }
}
function waitForFile(filePath, timeout = 50000, interval = 500) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const intervalId = setInterval(() => {
      if (fs2.existsSync(filePath)) {
        clearInterval(intervalId);
        resolve(true);
      } else if (Date.now() - start > timeout) {
        clearInterval(intervalId);
        reject(new Error(`El archivo ${filePath} no apareció después de ${timeout}ms`));
      }
    }, interval);
  });
}
module.exports = { uploadReport };
