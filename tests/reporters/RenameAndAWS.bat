@REM RenameAndAWS.bat: 
@echo off
setlocal enabledelayedexpansion

set "TEXT_FILE_PATH=D:\FrontE-Testing-master\htmlreport\test_names.log"

REM Verifico si el archivo de texto existe
if not exist "%TEXT_FILE_PATH%" (
  echo Error: El archivo %TEXT_FILE_PATH% no existe.
  exit /b 1
)

REM Verifico si el archivo está vacío
for %%A in ("%TEXT_FILE_PATH%") do set "filesize=%%~zA"
if %filesize%==0 (
  echo Error: El archivo %TEXT_FILE_PATH% está vacío.
  exit /b 1
)

REM Leo las líneas del archivo de texto
set /p "line=" < "%TEXT_FILE_PATH%"

REM Separo los nombres de archivo y de los tests
for /f "tokens=1,2" %%A in ("%line%") do (
  set "filename=%%A"
  set "testname=%%B"
)

REM Muestro los valores de filename y testname para verificar que son correctos
echo Filename obtenido: '%filename%'
echo Testname obtenido: '%testname%'
   
REM Verifico si la carpeta con el nombre de archivo ya existe
if exist "htmlreport\%filename%" (
  echo El directorio 'htmlreport\%filename%' ya existe.
  
  REM Verifico si la carpeta de test placeholder existe
  if exist "htmlreport\filename\testname" (
    REM Muevo solo la carpeta de test al directorio existente
    move "htmlreport\filename\testname" "htmlreport\%filename%\%testname%"
    echo Se ha movido el directorio de test a 'htmlreport\%filename%\%testname%'.
  ) else (
    echo Error: La carpeta 'htmlreport\filename\testname' no existe.
    exit /b 1
  )
) else (
  REM Si el directorio de archivo no existe, muevo toda la estructura
  if exist "htmlreport\filename" (
    REM Renombro la carpeta [filename] a %filename%
    move "htmlreport\filename" "htmlreport\%filename%"
    
    REM Ahora renombro la carpeta [testname] a %testname% dentro del nuevo directorio
    if exist "htmlreport\%filename%\testname" (
      move "htmlreport\%filename%\testname" "htmlreport\%filename%\%testname%"
    ) else (
      echo Error: La carpeta 'htmlreport\%filename%\testname' no existe.
      exit /b 1
    )
  ) else (
    echo Error: La carpeta 'htmlreport\filename' no existe.
    pause
    exit /b 1
  )
)

echo Nombres de carpetas actualizados correctamente.

REM Elimino el archivo test_names.log creado por 'FileNameTestReport'
del "%TEXT_FILE_PATH%"
echo El archivo %TEXT_FILE_PATH% ha sido eliminado.
pause

@REM REM Configuración
@REM set "profile=default"
@REM set "bucket=demov0.9.2.testing"
@REM set "playwright_reports_dir=playwright_reports"
@REM set "local_report_dir=E:\FrontE-Testing-master\htmlreport\%filename%"

@REM REM Crear la carpeta 'playwright_reports' en el bucket si no existe
@REM aws --profile %profile% s3api head-object --bucket %bucket% --key %playwright_reports_dir%/ >nul 2>&1 || aws --profile %profile% s3api put-object --bucket %bucket% --key %playwright_reports_dir%/

@REM REM Obtener el nombre de la carpeta a subir
@REM set "report_name=%~n1"

@REM REM Borrar la carpeta existente en S3 que tenga el mismo nombre
@REM aws --profile %profile% s3 rm s3://%bucket%/%playwright_reports_dir%/%report_name% --recursive

@REM REM Subir la nueva carpeta de reportes
@REM aws --profile %profile% s3 sync "%local_report_dir%" s3://%bucket%/%playwright_reports_dir%/%report_name% --delete --sse AES256 --cache-control no-cache

@REM REM Imprimir mensaje de éxito
@REM echo Report uploaded successfully to S3://%bucket%/%playwright_reports_dir%/%report_name%
pause
