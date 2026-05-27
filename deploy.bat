@echo off
:: ======================================================================
::  Rajadhani Sweets Production & Dispatch Portal - Local Deployment Tool
:: ======================================================================
title Rajadhani Sweets - Deployment Tool
color 0E
cls

echo =======================================================================
echo     ____        _           _ _                 _ 
echo    ^|  _ \ __ _ (_) __ _  __^|^| ^|__   __ _ _ __ (_)
echo    ^| ^|_) / _` ^| ^|/ _` ^|/ _` ^| '_ \ / _` ^| '_ \^| ^|
echo    ^|  _ < (_^| ^| ^| (_^| ^| (_^| ^| ^| ^| ^| (_^| ^| ^| ^| ^| ^|
echo    ^|_^| \_\__,_^|/ ^|\__,_^|\__,_^|_^| ^|_^|\__,_^|_^| ^|_^|_^|
echo              ^|__/                                     
echo =======================================================================
echo          DAILY PRODUCTION, KITCHEN ledgers ^& DISPATCH SYSTEM
echo =======================================================================
echo.

:: 1. Verify Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
    color 0C
    echo [ERROR] Node.js is NOT installed or not added to your system PATH!
    echo Microsoft Windows requires Node.js ^& NPM to run this application.
    echo.
    echo Please install Node.js from https://nodejs.org/ and restart this script.
    echo.
    pause
    exit /b
)

echo [OK] Node.js is detected on your machine.
node --version
echo.

:MENU
echo -----------------------------------------------------------------------
echo  SELECT OPERATION MODE
echo -----------------------------------------------------------------------
echo  [1] Run Portal in Development Mode (Live Hot-reload, runs tsx server)
echo  [2] Build and Run Portal in Production Mode (Pre-compiled, fast launch)
echo  [3] Install Project Dependencies Only (Useful for initial setups)
echo  [4] Close Script
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto DEV_MODE
if "%choice%"=="2" goto PROD_MODE
if "%choice%"=="3" goto INSTALL_ONLY
if "%choice%"=="4" goto EXIT_PROG
echo    [INVALID SELECTION] Please enter a option number from 1 to 4.
echo.
goto MENU

:DEV_MODE
cls
echo =======================================================================
echo  LAUNCHING SYSTEM IN DEVELOPMENT MODE
echo =======================================================================
echo  - Step 1: Querying system dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
    color 0C
    echo.
    echo [ERROR] NPM install failed. Make sure your network is connected.
    pause
    goto MENU
)
echo.
echo  - Step 2: Booting Express server with live tsx runner...
echo  - Service local URL: http://localhost:5000
echo  - Please press Ctrl+C inside this window to terminate the application.
echo.
color 0A
call npm run dev
goto EXIT_PROG

:PROD_MODE
cls
echo =======================================================================
echo  BUILDING ^& LAUNCHING SYSTEM IN PRODUCTION MODE
echo =======================================================================
echo  - Step 1: Querying system dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
    color 0C
    echo.
    echo [ERROR] Dependency installation failed.
    pause
    goto MENU
)
echo.
echo  - Step 2: Compiling React layouts and bundling server via esbuild...
call npm run build
if %ERRORLEVEL% neq 0 (
    color 0C
    echo.
    echo [ERROR] Build step failed. Review compilation logs.
    pause
    goto MENU
)
echo.
echo  - Step 3: Starting production runtime...
echo  - Express local ingress point: http://localhost:5000
echo  - Please press Ctrl+C inside this window to terminate the application.
echo.
color 0A
call npm run start
goto EXIT_PROG

:INSTALL_ONLY
cls
echo =======================================================================
echo  DOWNLOADING ^& INSTALLING ALL DEPENDENCIES
echo =======================================================================
call npm install
if %ERRORLEVEL% equ 0 (
    echo.
    echo [SUCCESS] Dependencies installed! You can now run or build the app.
) else (
    color 0C
    echo.
    echo [ERROR] Dependencies failed to download properly. Check your network.
)
echo.
pause
goto MENU

:EXIT_PROG
echo.
echo Closing the deploy script. Thank you!
timeout /t 3 >nul
exit /b
