' MaximizeWord.vbs
Dim wordApp
Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True
wordApp.WindowState = 3 ' 3 = wdWindowMaximized
