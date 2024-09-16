#!/bin/bash

# Verificar si se ha pasado un argumento para el nombre del bucket
if [ -z "$1" ]; then
    echo "Error: Debes proporcionar el nombre del bucket de AWS como argumento."
    exit 1
fi

# El nombre del bucket es pasado como argumento al script
AWS_BUCKET="$1"
profile='default'
playwright_reports_dir='playwright_reports'

# Definir los directorios base y nuevo nombre
REPORTS_DIR="/D/FrontE-Testing-master/htmlreport"
CURRENT_FILE_NAME="filename"
CURRENT_TEST_NAME="testname"

# Definir los nuevos nombres basados en las pruebas ejecutadas
NEW_FILE_NAME="UpdateInstrumentFamily"
NEW_TEST_NAME="UpdateInstrumentFamily"

# Rutas actuales y nuevas
CURRENT_OUTER_DIR="${REPORTS_DIR}/${CURRENT_FILE_NAME}"
CURRENT_INNER_DIR="${CURRENT_OUTER_DIR}/${CURRENT_TEST_NAME}"

NEW_OUTER_DIR="${REPORTS_DIR}/${NEW_FILE_NAME}"
NEW_INNER_DIR="${NEW_OUTER_DIR}/${NEW_TEST_NAME}"

# Mostrar la configuración inicial
echo "Configuración inicial:"
echo "AWS_BUCKET: $AWS_BUCKET"
echo "Profile: $profile"
echo "Playwright Reports Directory: $playwright_reports_dir"
echo "Report Directory: $REPORTS_DIR"
echo "Current File Name: $CURRENT_FILE_NAME"
echo "Current Test Name: $CURRENT_TEST_NAME"
echo "New File Name: $NEW_FILE_NAME"
echo "New Test Name: $NEW_TEST_NAME"
echo "Rutas actuales:"
echo "Current Outer Directory: $CURRENT_OUTER_DIR"
echo "Current Inner Directory: $CURRENT_INNER_DIR"
echo "Rutas nuevas:"
echo "New Outer Directory: $NEW_OUTER_DIR"
echo "New Inner Directory: $NEW_INNER_DIR"

# Verificar si el directorio interior actual existe
if [ -d "$CURRENT_INNER_DIR" ]; then
    echo "El directorio interior existe: ${CURRENT_INNER_DIR}"

    echo "Renombrando directorios..."

    # Crear el nuevo directorio exterior si no existe
    if [ ! -d "$NEW_OUTER_DIR" ]; then
        mkdir -p "$NEW_OUTER_DIR"
    fi

    # Mover el directorio interior a la nueva ubicación
    mv "$CURRENT_INNER_DIR" "$NEW_INNER_DIR"
    echo "Carpeta interior renombrada y movida: $CURRENT_INNER_DIR -> $NEW_INNER_DIR"

    # Mover el directorio exterior a la nueva ubicación
    rmdir "$CURRENT_OUTER_DIR"
    mv "$NEW_INNER_DIR" "$NEW_OUTER_DIR/$NEW_TEST_NAME"
    echo "Carpeta exterior renombrada: $CURRENT_OUTER_DIR -> $NEW_OUTER_DIR"

    # Subir a AWS
    echo "Subiendo el reporte a AWS Bucket: $AWS_BUCKET"
    
    # Borrar la carpeta existente en S3 que tenga el mismo nombre
    echo "Eliminando carpeta existente en S3 si la hay..."
    aws --profile $profile s3 rm s3://$AWS_BUCKET/$playwright_reports_dir/$NEW_FILE_NAME --recursive
    
    # Subir la nueva carpeta de reportes
    echo "Sincronizando el nuevo reporte a S3..."
    aws --profile $profile s3 sync "$NEW_OUTER_DIR" s3://$AWS_BUCKET/$playwright_reports_dir/$NEW_FILE_NAME --delete --sse AES256 --cache-control no-cache
    read -p "Presiona Enter para continuar..."
    echo "Reporte subido exitosamente a AWS Bucket: $AWS_BUCKET"
else
    echo "Error: El directorio ${CURRENT_INNER_DIR} no existe. No se puede renombrar."
    read -p "Error: Presiona Enter para continuar..."
    exit 1
fi
