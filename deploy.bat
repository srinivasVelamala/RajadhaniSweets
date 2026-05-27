@echo off
setlocal enabledelayedexpansion

REM ====================================================================
REM Rajdhani Sweets Production Deployment Tool for Windows
REM ====================================================================
REM Purpose: Deploy and run Rajdhani Sweets application
REM Usage: Run this script from Command Prompt or PowerShell
REM ====================================================================

echo.
echo  ╔════════════════════════════════════════════════════════════════╗
echo  ║        RAJDHANI SWEETS - PRODUCTION DEPLOYMENT TOOL            ║
echo  ║                    Windows Environment                         ║
echo  ╚════════════════════════════════════════════════════════════════╝
echo.
echo  System Information:
echo  - Timestamp: %date% %time%
echo  - Working Directory: %cd%
echo  - User: %username%
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo  [ERROR] Node.js is not installed or not found in PATH.
  echo.
  echo  Please install Node.js from: https://nodejs.org/
  echo  After installation, restart your terminal and run this script again.
  echo.
  pause
  exit /b 1
)

echo  ✓ Node.js found: 
node --version
echo.

REM Check if npm is available
npm --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo  [ERROR] npm is not available.
  echo.
  pause
  exit /b 1
)

echo  ✓ npm found: 
npm --version
echo.

echo.
echo  - Step 1: Installing project dependencies...
echo.
echo  Running: npm install
echo.
npm install
if %ERRORLEVEL% neq 0 (
  echo.
  echo  [ERROR] Failed to install dependencies.
  echo.
  pause
  exit /b 1
)

echo.
echo  - Step 2: Booting Express server with live tsx runner...
echo  - Service local URL: http://localhost:5000
echo  - Please press Ctrl+C inside this window to terminate the application.
echo.
color 0A

REM Run the development server
echo.
npm run dev

REM If the above fails, try tsx directly
if %ERRORLEVEL% neq 0 (
  echo.
  echo  Attempting alternative startup method...
  echo.
  npx tsx watch server.ts
)

if %ERRORLEVEL% neq 0 (
  color 0C
  echo.
  echo  [FATAL] Failed to start the development server.
  echo.
  pause
  exit /b 1
)

exit /b 0