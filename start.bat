@echo off
REM LeadPilot Quick Start Script for Windows
REM This script sets up the Next.js project and starts development

echo.
echo LeadPilot Landing Page - Quick Start
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo X Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo Y Node.js version:
node --version
echo.

REM Install dependencies
echo 1 Installing dependencies...
call npm install

if errorlevel 1 (
    echo X Failed to install dependencies
    pause
    exit /b 1
)

echo Y Dependencies installed
echo.

REM Start development server
echo ! Starting development server...
echo - Open http://localhost:3000 in your browser
echo.

call npm run dev
