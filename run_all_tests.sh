#!/bin/bash

# Lista de pruebas que quiero ejecutar
tests=(
  # New, Add Attachment, Remove Attachment, Open Attachment, Print, Export = 36
  # "instruments|ActiveInstrumentsNewInstrument|ClickOnAButtonWithGenericDialog.spec.ts|ClickOnAButtonWithGenericDialog"
  # "instruments|ActiveInstrumentsBalancesNewInstrument|ClickOnAButtonWithGenericDialog.spec.ts|ClickOnAButtonWithGenericDialog"
  # "instruments|ActiveInstrumentsCGNewInstrument|ClickOnAButtonWithGenericDialog.spec.ts|ClickOnAButtonWithGenericDialog"

  # "instruments|ActiveInstrumentsAddAttachment |AddAttachment.spec.ts|AddAttachmentAccept"
  # "instruments|ActiveInstrumentsBalancesAddAttachment|AddAttachment.spec.ts|AddAttachmentAccept"
  # "instruments|ActiveInstrumentsCGAddAttachment|AddAttachment.spec.ts|AddAttachmentAccept"
  # "instruments|EventsInProgressAddAttachment|AddAttachment.spec.ts|AddAttachmentAccept"

  # "instruments|ActiveInstrumentsRemoveAttachment|RemoveAttachment.spec.ts|RemoveAttachmentAccept"
  # "instruments|ActiveInstrumentsBalancesRemoveAttachment|RemoveAttachment.spec.ts|RemoveAttachmentAccept"
  # "instruments|ActiveInstrumentsCGRemoveAttachment|RemoveAttachment.spec.ts|RemoveAttachmentAccept"
  # "instruments|EventsInProgressRemoveAttachment|RemoveAttachment.spec.ts|RemoveAttachmentAccept"

  # "instruments|ActiveInstrumentsOpenAttachment|OpenAttachment.spec.ts|OpenAttachment"
  # "instruments|ActiveInstrumentsBalancesOpenAttachment|OpenAttachment.spec.ts|OpenAttachment"
  # "instruments|ActiveInstrumentsCGOpenAttachment|OpenAttachment.spec.ts|OpenAttachment"
  # "instruments|EventsInProgressOpenAttachment|OpenAttachment.spec.ts|OpenAttachment"

  # "instruments|ActiveInstrumentsPrintHorizontal|Print.spec.ts|Print"
  # "instruments|ActiveInstrumentsPrintVertical|Print.spec.ts|Print"
  # "instruments|ActiveInstrumentsBalancesPrintHorizontal|Print.spec.ts|Print"
  # "instruments|ActiveInstrumentsBalancesPrintVertical|Print.spec.ts|Print"
  # "instruments|ActiveInstrumentsCGPrintHorizontal|Print.spec.ts|Print"
  # "instruments|ActiveInstrumentsCGPrintVertical|Print.spec.ts|Print"
  # "instruments|InstrumentsFamilyListPrintHorizontal|Print.spec.ts|Print"
  # "instruments|InstrumentsFamilyListPrintVertical|Print.spec.ts|Print"
  # "instruments|EventsInProgressPrintHorizontal|Print.spec.ts|Print"
  # "instruments|EventsInProgressPrintVertical|Print.spec.ts|Print"
  # "instruments|DeviationsPendingDecisionPrintHorizontal|Print.spec.ts|Print"
  # "instruments|DeviationsPendingDecisionPrintVertical|Print.spec.ts|Print"
  # "instruments|DeviationsInvestigationsPrintHorizontal|Print.spec.ts|Print"
  # "instruments|DeviationsInvestigationsPrintVertical|Print.spec.ts|Print"

  # "instruments|ActiveInstrumentsExport|ClickOnTheExportButton.spec.ts|ClickOnTheExportButton"
  # "instruments|ActiveInstrumentsBalancesExport|ClickOnTheExportButton.spec.ts|ClickOnTheExportButton"
  # "instruments|ActiveInstrumentsCGExport|ClickOnTheExportButton.spec.ts|ClickOnTheExportButton"
  # "instruments|InstrumentFamilyListExport|ClickOnTheExportButton.spec.ts|ClickOnTheExportButton"
  # "instruments|EventsInProgressExplort|ClickOnTheExportButton.spec.ts|ClickOnTheExportButton"
  # "instruments|DeviationsPendingDecisionExport|ClickOnTheExportButton.spec.ts|ClickOnTheExportButton"
  # "instruments|DeviationsInvestigationsExport|ClickOnTheExportButton.spec.ts|ClickOnTheExportButton"
)

# Archivos de resultado
PASSED_TESTS_FILE="htmlreport/tests_passed.txt"
FAILED_TESTS_FILE="htmlreport/tests_failed.txt"
FAILED_TESTS_DIR="htmlreport/fail"

# Limpiar archivos previos
> "$PASSED_TESTS_FILE"
> "$FAILED_TESTS_FILE"
mkdir -p "$FAILED_TESTS_DIR"

# Contar el total de pruebas
TOTAL_TESTS=${#tests[@]}
echo "Total de pruebas a ejecutar: $TOTAL_TESTS"

# Iterar sobre cada prueba
for ((i=0; i<TOTAL_TESTS; i++)); do
  IFS="|" read -r PROC_INSTANCE_NAME TRAZIT_TEST_NAME PLAYWRIGHT_FILENAME PLAYWRIGHT_TESTNAME <<< "${tests[$i]}"

  echo "Ejecutando prueba $((i+1)) de $TOTAL_TESTS: $TRAZIT_TEST_NAME - $PLAYWRIGHT_TESTNAME"

  # Ejecutar prueba
  NO_HTML_REPORT="false" TRAZIT_TEST_NAME="$TRAZIT_TEST_NAME" PROC_INSTANCE_NAME="$PROC_INSTANCE_NAME" \
    npx playwright test "$PLAYWRIGHT_FILENAME" -g "$PLAYWRIGHT_TESTNAME"
  TEST_RESULT=$?

  if [ $TEST_RESULT -eq 0 ]; then
    echo "Test PASADO: $TRAZIT_TEST_NAME - $PLAYWRIGHT_TESTNAME"
    echo "$TRAZIT_TEST_NAME - $PLAYWRIGHT_TESTNAME" >> "$PASSED_TESTS_FILE"
    ./rename_and_upload.sh "$AWS_BUCKET" "$TRAZIT_TEST_NAME" "$PLAYWRIGHT_FILENAME" "$PLAYWRIGHT_TESTNAME" "$PROC_INSTANCE_NAME"


  else
    echo "Test FALLIDO: $TRAZIT_TEST_NAME - $PLAYWRIGHT_TESTNAME"
    echo "$TRAZIT_TEST_NAME - $PLAYWRIGHT_TESTNAME" >> "$FAILED_TESTS_FILE"

    # Mover el reporte de prueba fallida a la carpeta "fail"
    CURRENT_DIR="htmlreport/$TRAZIT_TEST_NAME/$PLAYWRIGHT_TESTNAME"
    NEW_DIR="$FAILED_TESTS_DIR/$TRAZIT_TEST_NAME/$PLAYWRIGHT_TESTNAME"

    if [ -d "$CURRENT_DIR" ]; then
      mkdir -p "$(dirname "$NEW_DIR")"
      mv "$CURRENT_DIR" "$NEW_DIR"
      echo "Reporte movido a: $NEW_DIR"
    else
      echo "No se encontró el directorio de reporte: $CURRENT_DIR"
    fi
  fi

  # Esperar 5 segundos antes del siguiente test
  sleep 5
done

echo "Pruebas completadas. Resultados:"
echo "Tests pasados: $PASSED_TESTS_FILE"
echo "Tests fallidos: $FAILED_TESTS_FILE"
