@echo off
set base_dir=%~dp0
%base_dir:~0,2%
pushd %base_dir%  
start  open.vbs
popd
pause
