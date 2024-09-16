#!/bin/bash
 
# Configuración
profile='default'
bucket='demov0.9.2.testing'
playwright_reports_dir='playwright_reports'
local_report_dir='/E/FrontE-Testing-master/htmlreport/Trazit-Instruments-Add_Attachment-Accept' # Cambia esto a la ruta local de tu carpeta a subir
 
# Crear la carpeta 'playwright_reports' en el bucket si no existe
aws --profile $profile s3api head-object --bucket $bucket --key $playwright_reports_dir/ || \
aws --profile $profile s3api put-object --bucket $bucket --key $playwright_reports_dir/
 
# Obtener el nombre de la carpeta a subir
report_name=$(basename "$local_report_dir")
 
# Borrar la carpeta existente en S3 que tenga el mismo nombre
aws --profile $profile s3 rm s3://$bucket/$playwright_reports_dir/$report_name --recursive
 
# Subir la nueva carpeta de reportes
aws --profile $profile s3 sync $local_report_dir s3://$bucket/$playwright_reports_dir/$report_name --delete --sse AES256 --cache-control no-cache
 
# Imprimir mensaje de éxito
echo "Report uploaded successfully to S3://$bucket/$playwright_reports_dir/$report_name"
read -p "Presiona Enter para continuar..."