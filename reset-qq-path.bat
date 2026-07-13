@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo ============================================
echo   Reset QQ Path Configuration
echo ============================================
echo.

set QQ_PATH_CONFIG=%cd%\config\qq_path.txt

if exist "%QQ_PATH_CONFIG%" (
    echo Current saved path:
    type "!QQ_PATH_CONFIG!"
    echo.
    echo.
    set /p confirm="Delete saved path and reconfigure? (Y/N): "
    if /i "!confirm!"=="Y" (
        del "!QQ_PATH_CONFIG!"
        echo [Info] Saved path deleted.
        echo [Info] Run launcher-user.bat to reconfigure.
    ) else (
        echo [Info] Operation cancelled.
    )
) else (
    echo [Info] No saved QQ path found.
)

echo.
pause
