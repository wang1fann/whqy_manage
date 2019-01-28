@echo off&setlocal enabledelayedexpansion

set NOW_TIME_HH=%time:~0,2%
if "%NOW_TIME_HH%" lss "10" (set NOW_TIME_HH=0%time:~1,1%) else (set NOW_TIME_HH=%time:~0,2%)
set NOW_TIME=%date:~0,4%%date:~5,2%%date:~8,2%%NOW_TIME_HH%%time:~3,2%%time:~6,2%
set NOW_ONLY_TIME=%NOW_TIME_HH%:%time:~3,2%:%time:~6,2%
set date=%Date:~0,4%/%Date:~5,2%/%Date:~8,2% %NOW_ONLY_TIME%
::set date=%Date:~0,4%/%Date:~5,2%/%Date:~8,2% %Time:~0,2%:%Time:~3,2%:%Time:~6,2% 

title 【渭华起义-后台管理-前端-运行服务-%date%】
color A0

@echo ------This script is used to run service------
::define variables
set var=%~dp0
set var=%var:~,-1%

@echo run start......
call cnpm run dev
@echo run stop......

exit