#!/bin/bash

# Verify arguments
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ] || [ -z "$5" ]; then
    echo "Error: Debes proporcionar el nombre del bucket de AWS, TRAZIT_TEST_NAME, PLAYWRIGHT_FILENAME, PLAYWRIGHT_TESTNAME y PROC_INSTANCE_NAME como argumentos."
    exit 1
fi

# Arguments and configuration
AWS_BUCKET="$1"
TRAZIT_TEST_NAME="$2"
PLAYWRIGHT_FILENAME="$3"
PLAYWRIGHT_TESTNAME="$4"
PROC_INSTANCE_NAME="$5"
profile='default'
playwright_reports_dir='playwright_reports'

# Directory paths
REPORTS_DIR="./htmlreport"
CURRENT_FILE_NAME="filename"
CURRENT_TEST_NAME="testname"
CURRENT_OUTER_DIR="${REPORTS_DIR}/${CURRENT_FILE_NAME}"
CURRENT_INNER_DIR="${CURRENT_OUTER_DIR}/${CURRENT_TEST_NAME}"
NEW_OUTER_DIR="${REPORTS_DIR}/${TRAZIT_TEST_NAME}"
NEW_INNER_DIR="${NEW_OUTER_DIR}/${PLAYWRIGHT_TESTNAME}"

# Show configuration
echo "Configuración inicial:"
echo "AWS_BUCKET: $AWS_BUCKET"
echo "Profile: $profile"
echo "Playwright Reports Directory: $playwright_reports_dir"
echo "Report Directory: $REPORTS_DIR"
echo "Current File Name: $CURRENT_FILE_NAME"
echo "Current Test Name: $CURRENT_TEST_NAME"
echo "New File Name: $TRAZIT_TEST_NAME"
echo "New Test Name: $PLAYWRIGHT_TESTNAME"
echo "Proc Instance Name: $PROC_INSTANCE_NAME"

echo "Rutas actuales:"
echo "Current Outer Directory: $CURRENT_OUTER_DIR"
echo "Current Inner Directory: $CURRENT_INNER_DIR"
echo "Rutas nuevas:"
echo "New Outer Directory: $NEW_OUTER_DIR"
echo "New Inner Directory: $NEW_INNER_DIR"

# Function to safely remove directory
safe_remove() {
    local dir="$1"
    if [ -d "$dir" ]; then
        echo "Eliminando directorio: $dir"
        rm -rf "$dir" || {
            echo "Error al eliminar directorio: $dir"
            return 1
        }
    fi
    return 0
}

# Function to safely create directory
safe_create_dir() {
    local dir="$1"
    if [ ! -d "$dir" ]; then
        echo "Creando directorio: $dir"
        mkdir -p "$dir" || {
            echo "Error al crear directorio: $dir"
            return 1
        }
    fi
    return 0
}

# Function to safely copy directory
safe_copy() {
    local src="$1"
    local dst="$2"
    if [ -d "$src" ]; then
        echo "Copiando de $src a $dst"
        cp -r "$src" "$dst" || {
            echo "Error al copiar de $src a $dst"
            return 1
        }
    else
        echo "Directorio origen no existe: $src"
        return 1
    fi
    return 0
}

# Main process
if [ -d "$CURRENT_INNER_DIR" ]; then
    echo "El directorio interior existe: ${CURRENT_INNER_DIR}"
    
    # Remove existing destination if it exists
    safe_remove "$NEW_OUTER_DIR" || exit 1
    
    # Create new outer directory
    safe_create_dir "$NEW_OUTER_DIR" || exit 1
    
    # Copy files instead of moving them
    safe_copy "$CURRENT_INNER_DIR" "$NEW_OUTER_DIR/" || exit 1
    
    # Rename the copied directory to the correct name
    if [ -d "$NEW_OUTER_DIR/testname" ]; then
        mv "$NEW_OUTER_DIR/testname" "$NEW_OUTER_DIR/$PLAYWRIGHT_TESTNAME" || {
            echo "Error al renombrar directorio"
            exit 1
        }
    fi
    
    # Upload to AWS
    echo "Subiendo el reporte a AWS Bucket: $AWS_BUCKET"
    
    # Remove existing S3 folder
    echo "Eliminando carpeta existente en S3 si la hay..."
    aws --profile $profile s3 rm "s3://$AWS_BUCKET/$playwright_reports_dir/$TRAZIT_TEST_NAME" --recursive
    
    # Upload new report folder
    echo "Sincronizando el nuevo reporte a S3..."
    aws --profile $profile s3 sync "$NEW_OUTER_DIR" "s3://$AWS_BUCKET/$playwright_reports_dir/$TRAZIT_TEST_NAME" --delete --sse AES256 --cache-control no-cache
    
    echo "Reporte subido exitosamente a AWS Bucket: $AWS_BUCKET"
else
    echo "Error: El directorio ${CURRENT_INNER_DIR} no existe."
    exit 1
fi