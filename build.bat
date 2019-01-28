@echo off&setlocal enabledelayedexpansion

set NOW_TIME_HH=%time:~0,2%
if "%NOW_TIME_HH%" lss "10" (set NOW_TIME_HH=0%time:~1,1%) else (set NOW_TIME_HH=%time:~0,2%)
set NOW_TIME=%date:~0,4%%date:~5,2%%date:~8,2%%NOW_TIME_HH%%time:~3,2%%time:~6,2%
set NOW_ONLY_TIME=%NOW_TIME_HH%:%time:~3,2%:%time:~6,2%
set date=%Date:~0,4%/%Date:~5,2%/%Date:~8,2% %NOW_ONLY_TIME%
::set date=%Date:~0,4%/%Date:~5,2%/%Date:~8,2% %Time:~0,2%:%Time:~3,2%:%Time:~6,2% 

title 【渭华起义-后台管理-前端-编译打包-%date%】
color A0

@echo ------This script is used to build dist------
::define variables
set var=%~dp0
set var=%var:~,-1%

@echo build start......
call cnpm run build
@echo build stop......

cls && explorer "%var%\dist"

exit