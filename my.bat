@echo off&setlocal enabledelayedexpansion
for /f "eol=* tokens=*" %%i in (open.vbs) do (
set a=%%i
set "a=!a:关闭程序=input!"
echo !a!>>$)
move $ open.vbs
start open.vbs