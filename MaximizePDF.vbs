Dim objShell
Set objShell = CreateObject("WScript.Shell")

' Esperar un poco para que el lector de PDF se abra completamente
WScript.Sleep 2000 

' Intentar activar Adobe Acrobat Reader
If objShell.AppActivate("Adobe Acrobat Reader DC") Then
    WScript.Sleep 500
    objShell.SendKeys "% {SPACE}x" ' ALT + ESPACIO, luego X (Maximizar)
Else
    ' Si no se encuentra Adobe Reader, intentar con Microsoft Edge
    If objShell.AppActivate("Microsoft Edge") Then
        WScript.Sleep 500
        objShell.SendKeys "% {SPACE}x"
    End If
End If
