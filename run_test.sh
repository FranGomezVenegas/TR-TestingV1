#!/bin/bash

# Nombre del bucket de AWS como variable
AWS_BUCKET="demov0.9.2.testing"

# Definir las variables
TRAZIT_TEST_NAME="ActiveInventoryCultureMediaLotsAddAttachment"
PLAYWRIGHT_FILENAME="AddAttachment.spec.ts"
PLAYWRIGHT_TESTNAME="AddAttachmentAccept"

# Ejecutar el test específico utilizando Playwright
TRAZIT_TEST_NAME="$TRAZIT_TEST_NAME" npx playwright test "$PLAYWRIGHT_FILENAME" -g "$PLAYWRIGHT_TESTNAME$"
#read -p "Test ejecutado. Presiona Enter para continuar..."
# Verificar si el test fue exitoso (código de salida 0)
if [ $? -eq 0 ]; then
    echo "Test ejecutado exitosamente"
    
    # Pasar el nombre del bucket y las variables adicionales al script de renombrado y subida
    ./rename_and_upload.sh "$AWS_BUCKET" "$TRAZIT_TEST_NAME" "$PLAYWRIGHT_FILENAME" "$PLAYWRIGHT_TESTNAME"
    read -p "rename_and_upload ejecutado. Presiona Enter para continuar..."
else
    echo "El test falló"
    read -p "Presiona Enter para continuar..."
    exit 1
fi
