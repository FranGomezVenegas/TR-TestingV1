' MaximizeNotepad.vbs
Option Explicit

Dim WshShell
Set WshShell = WScript.CreateObject("WScript.Shell")

' Esperar un momento para asegurarse de que el Bloc de notas esté abierto
WScript.Sleep 1500

' Activar la ventana del Bloc de notas
If WshShell.AppActivate("Bloc de notas") Then
    WScript.Sleep 800
    ' Abrir el menú de la ventana con Alt + Espacio
    WshShell.SendKeys "% "
    WScript.Sleep 800
    ' Presionar 'x' para maximizar
    WshShell.SendKeys "x"
    WScript.Sleep 800

End If

' Liberar el objeto
Set WshShell = Nothing
