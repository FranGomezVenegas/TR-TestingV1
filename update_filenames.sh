TEXT_FILE_PATH="htmlreport/test_names.log"

# Verifico si el archivo de texto existe, si no existe termina el script.
if [ ! -f "$TEXT_FILE_PATH" ]; then
  echo "Error: El archivo $TEXT_FILE_PATH no existe."
  exit 1
fi

# Verifico si el archivo está vacío, si está vacío termina el script.
if [ ! -s "$TEXT_FILE_PATH" ]; then
  echo "Error: El archivo $TEXT_FILE_PATH está vacío."
  exit 1
fi

# Leo las líneas del archivo de texto
readarray -t lines < "$TEXT_FILE_PATH"

# Separo los nombres de archivo y de los tests
filename=$(echo "${lines[0]}" | awk '{print $1}')
testname=$(echo "${lines[0]}" | awk '{print $2}')

# Muestro los valores de filename y testname para verificar que son correctos
echo "Filename obtenido: '$filename'"
echo "Testname obtenido: '$testname'"

# Verifico si la carpeta con el nombre de archivo ya existe
if [ -d "htmlreport/$filename" ]; then
  echo "El directorio 'htmlreport/$filename' ya existe."
  
  # Verifico si la carpeta de test placeholder existe
  if [ -d "htmlreport/filename/testname" ]; then
    # Muevo solo la carpeta de test al directorio existente
    mv "htmlreport/filename/testname" "htmlreport/$filename/$testname"
    echo "Se ha movido el directorio de test a 'htmlreport/$filename/$testname'."
  else
    echo "Error: La carpeta 'htmlreport/filename/testname' no existe."
    exit 1
  fi
else
  # Si el directorio de archivo no existe, muevo toda la estructura
  if [ -d "htmlreport/filename" ]; then
    # Renombro la carpeta [filename] a $filename
    mv "htmlreport/filename" "htmlreport/$filename"
    
    # Ahora renombro la carpeta [testname] a $testname dentro del nuevo directorio
    if [ -d "htmlreport/$filename/testname" ]; then
      mv "htmlreport/$filename/testname" "htmlreport/$filename/$testname"
    else
      echo "Error: La carpeta 'htmlreport/$filename/testname' no existe."
      exit 1
    fi
  else
    echo "Error: La carpeta 'htmlreport/filename' no existe."
	read -p "Presiona Enter para continuar..."
	
    exit 1
  fi
fi

echo "Nombres de carpetas actualizados correctamente."

# Elimino el archivo test_names.log creado por 'FileNameTestReport', dónde se almacenan los 
# nombres de archivos y de los test
rm "$TEXT_FILE_PATH"
echo "El archivo $TEXT_FILE_PATH ha sido eliminado."
read -p "Presiona Enter para continuar..."
