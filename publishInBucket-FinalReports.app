#!/bin/bash
profile='default'
bucket='fetestig.reports'
fecha=$(date +%Y%m%d) # Obtiene la fecha en formato YYYYMMDD
ruta_s3_original="s3://$bucket/FinalReports/"
ruta_s3_renombrada="s3://$bucket/FinalReports_$fecha/"

echo "Perfil: $profile"
echo "Bucket: $bucket"
echo "Fecha: $fecha"

# Verificar si la carpeta FinalReports existe
if aws --profile $profile s3 ls "$ruta_s3_original" ; then
    # Renombrar la carpeta existente
    echo "Renombrando la carpeta existente $ruta_s3_original a $ruta_s3_renombrada..."
    aws --profile $profile s3 mv $ruta_s3_original $ruta_s3_renombrada --recursive

    # Subir los nuevos archivos a FinalReports
    echo "Subiendo archivos a $ruta_s3_original..."
    aws --profile $profile s3 cp ./FinalReports/ $ruta_s3_original --exclude "*" --include "*" --recursive --metadata-directive REPLACE --sse AES256 --cache-control max-age=604800
else
    echo "La carpeta $ruta_s3_original no existe. Subiendo archivos..."
    aws --profile $profile s3 cp ./FinalReports/ $ruta_s3_original --exclude "*" --include "*" --recursive --metadata-directive REPLACE --sse AES256 --cache-control max-age=604800
fi


## Vaciar la carpeta si existe
#echo "Ejecutando los tests..."

#echo "Plataform-HolidaysCalendar-Open..."
#npx playwright test Plataform-HolidaysCalendar.spec.ts -g "Trazit-Plataform-HolidaysCalendar-Open$"

## Vaciar la carpeta si existe
#echo "Vaciar carpeta $ruta_s3 si existe..."
#aws --profile $profile s3 rm $ruta_s3 --recursive

## Subir los archivos a la carpeta
#echo "Subiendo archivos a $ruta_s3"
#aws --profile $profile s3 cp ./ s3://$bucket/PlatformFinalReports_$fecha/ --exclude "*" --include "htmlreport/**/*" --recursive --metadata-directive REPLACE --sse AES256 --cache-control max-age=604800

