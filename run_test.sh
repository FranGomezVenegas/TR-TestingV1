#!/bin/bash

# Nombre del bucket de AWS como variable
AWS_BUCKET="demov0.9.2.testing"

# Ejecutar el test específico utilizando Playwright
npx playwright test Instruments-Update-InstrumentFamily.spec.ts -g "UpdateInstrumentFamily$"
#read -p "Test ejecutado. Presiona Enter para continuar..."
# Verificar si el test fue exitoso (código de salida 0)
if [ $? -eq 0 ]; then
    echo "Test ejecutado exitosamente"
    
    # Pasar el nombre del bucket como argumento al script de renombrado y subida
    ./rename_and_upload.sh "$AWS_BUCKET"
	read -p "rename_and_upload ejecutado. Presiona Enter para continuar..."
else
    echo "El test falló"
	read -p "Presiona Enter para continuar..."
    exit 1
fi
