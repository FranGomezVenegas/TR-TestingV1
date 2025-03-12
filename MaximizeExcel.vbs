' MaximizeExcel.vbs
Dim xlApp
Set xlApp = CreateObject("Excel.Application")
xlApp.Visible = True
xlApp.WindowState = 3 ' 3 = xlMaximized
