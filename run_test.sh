#!/bin/bash

# Nombre del bucket de AWS como variable
AWS_BUCKET="demov0.9.2.testing"

# Definir las variables
PROC_INSTANCE_NAME="mb_em"
TRAZIT_TEST_NAME="DeviationInvestigationsPrintVertical"
PLAYWRIGHT_FILENAME="Print.spec.ts"
PLAYWRIGHT_TESTNAME="Print"

# Ejecutar el test específico utilizando Playwright
TRAZIT_TEST_NAME="$TRAZIT_TEST_NAME" PROC_INSTANCE_NAME="$PROC_INSTANCE_NAME" npx playwright test "$PLAYWRIGHT_FILENAME" -g "$PLAYWRIGHT_TESTNAME"

# Verificar si el test fue exitoso (código de salida 0)
if [ $? -eq 0 ]; then
    echo "Test ejecutado exitosamente"
    # Pasar el nombre del bucket, las variables adicionales y el procInstanceName al script de renombrado y subida
    ./rename_and_upload.sh "$AWS_BUCKET" "$TRAZIT_TEST_NAME" "$PLAYWRIGHT_FILENAME" "$PLAYWRIGHT_TESTNAME" "$PROC_INSTANCE_NAME"
    read -p "rename_and_upload ejecutado. Presiona Enter para continuar..."
else
    echo "El test falló"
    read -p "Presiona Enter para continuar..."
    exit 1
fi