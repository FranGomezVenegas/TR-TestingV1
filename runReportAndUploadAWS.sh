#!/bin/bash

# El nombre del bucket es pasado como argumento al script
AWS_BUCKET="$1"

# Definir los directorios base y nuevo nombre
REPORTS_DIR="pathDeReports/htmlreport"
FILE_NAME="filename"
TEST_NAME="testname"

# Definir los nuevos nombres basados en las pruebas ejecutadas
NEW_FILE_NAME="Instruments-Update-InstrumentFamily"
NEW_TEST_NAME="UpdateInstrumentFamily"

# Rutas actuales y nuevas
CURRENT_OUTER_DIR="${REPORTS_DIR}/${FILE_NAME}"
CURRENT_INNER_DIR="${CURRENT_OUTER_DIR}/${TEST_NAME}"

NEW_OUTER_DIR="${REPORTS_DIR}/${NEW_FILE_NAME}"
NEW_INNER_DIR="${NEW_OUTER_DIR}/${NEW_TEST_NAME}"

# Verificar si el directorio actual existe
if [ -d "$CURRENT_INNER_DIR" ]; then
    echo "Renombrando directorios..."

    # Renombrar la carpeta interior
    mv "$CURRENT_INNER_DIR" "$NEW_INNER_DIR"

    # Renombrar la carpeta exterior
    mv "$CURRENT_OUTER_DIR" "$NEW_OUTER_DIR"

    echo "Directorio renombrado exitosamente a: ${NEW_INNER_DIR}"

    # Subir a AWS
    echo "Subiendo el reporte a AWS Bucket: $AWS_BUCKET"
    aws s3 cp "$NEW_OUTER_DIR" s3://$AWS_BUCKET/$NEW_FILE_NAME/ --recursive

    echo "Reporte subido exitosamente a AWS Bucket: $AWS_BUCKET"
else
    echo "El directorio ${CURRENT_INNER_DIR} no existe, no se puede renombrar"
    exit 1
fi
