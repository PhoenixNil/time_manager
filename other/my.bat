@echo off&setlocal enabledelayedexpansion
for /f "eol=* tokens=*" %%i in (other\open.vbs) do (
set a=%%i
set "a=!a:关闭程序=input!"
echo !a!>>$)
move $ other\open.vbs
start other\open.vbs