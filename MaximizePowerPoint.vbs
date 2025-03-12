' MaximizePowerPoint.vbs
Dim pptApp
Set pptApp = CreateObject("PowerPoint.Application")
pptApp.Visible = True
pptApp.WindowState = 3 ' 3 = ppWindowMaximized
