@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
cd /d "%~dp0"

net session >nul 2>&1
if %errorLevel% == 0 (
    echo Administrator mode detected.
) else (
    echo Please run this script in administrator mode.
    powershell -Command "Start-Process 'cmd.exe' -ArgumentList '/c cd /d \"%~dp0\" && \"%~f0\" %*' -Verb runAs"
    exit
)

cd /d "%~dp0"
set NAPCAT_PATCH_PACKAGE=%cd%\qqnt.json
set NAPCAT_LOAD_PATH=%cd%\loadNapCat.js
set NAPCAT_INJECT_PATH=%cd%\NapCatWinBootHook.dll
set NAPCAT_LAUNCHER_PATH=%cd%\NapCatWinBootMain.exe
set NAPCAT_MAIN_PATH=%cd%\napcat.mjs
set QQ_PATH_CONFIG=%cd%\config\qq_path.txt

:resolve_qq_path
rem Priority 1: Command line argument
if not "%~1"=="" (
    if exist "%~1" (
        set "QQPath=%~1"
        goto :save_and_boot
    ) else (
        echo [Error] Provided QQ path is invalid: %~1
        goto :try_env
    )
)

:try_env
rem Priority 2: Environment variable
if not "%NAPCAT_QQ_PATH%"=="" (
    if exist "!NAPCAT_QQ_PATH!" (
        set "QQPath=!NAPCAT_QQ_PATH!"
        goto :napcat_boot
    ) else (
        echo [Warning] NAPCAT_QQ_PATH is set but invalid: !NAPCAT_QQ_PATH!
    )
)

:try_saved
rem Priority 3: Saved path from previous run
if exist "%QQ_PATH_CONFIG%" (
    set /p SavedPath=<"!QQ_PATH_CONFIG!"
    if exist "!SavedPath!" (
        set "QQPath=!SavedPath!"
        echo [Info] Using saved QQ path: !SavedPath!
        goto :napcat_boot
    )
)

:try_registry
rem Priority 4: Registry query
for /f "tokens=2*" %%a in ('reg query "HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\QQ" /v "UninstallString" 2^>nul') do (
    set "RetString=%%~b"
    for %%x in ("!RetString!") do set "pathWithoutUninstall=%%~dpx"
    set "QQPath=!pathWithoutUninstall!QQ.exe"
    if exist "!QQPath!" goto :save_and_boot
)

:try_common_paths
rem Priority 5: Common installation paths
rem Hoist %ProgramFiles(x86)% out of the for-list so the literal `(x86)` does
rem not collide with the surrounding `for ... in (...)` parentheses (#291).
set "PFX86=%ProgramFiles(x86)%"
for %%p in (
    "%ProgramFiles%\Tencent\QQNT\QQ.exe"
    "!PFX86!\Tencent\QQNT\QQ.exe"
    "%LocalAppData%\Programs\Tencent\QQNT\QQ.exe"
    "C:\Program Files\Tencent\QQNT\QQ.exe"
    "D:\Program Files\Tencent\QQNT\QQ.exe"
) do (
    if exist %%p (
        set "QQPath=%%~p"
        goto :save_and_boot
    )
)

:manual_select
echo.
echo ============================================
echo   QQ Installation Not Found
echo ============================================
echo.
echo Could not detect QQ installation automatically.
echo This may happen if you are using a portable/green version of QQ.
echo.
echo Options:
echo   [1] Browse for QQ.exe (GUI file picker)
echo   [2] Enter path manually
echo   [3] Exit
echo.
set /p choice="Select option (1/2/3): "

if "%choice%"=="1" goto :gui_select
if "%choice%"=="2" goto :text_input
if "%choice%"=="3" exit /b 1
goto :manual_select

:gui_select
echo.
echo [Info] Opening file picker...
for /f "delims=" %%i in ('powershell -Command "Add-Type -AssemblyName System.Windows.Forms; $f = New-Object System.Windows.Forms.OpenFileDialog; $f.Filter = 'QQ Executable (QQ.exe)|QQ.exe|All Files (*.*)|*.*'; $f.Title = 'Select QQ.exe'; $f.InitialDirectory = 'C:\Program Files'; if ($f.ShowDialog() -eq 'OK') { $f.FileName } else { '' }"') do set "QQPath=%%i"

if "%QQPath%"=="" (
    echo [Error] No file selected.
    goto :manual_select
)
goto :validate_path

:text_input
echo.
set /p "QQPath=Enter full path to QQ.exe: "

:validate_path
if not exist "!QQPath!" (
    echo [Error] File not found: !QQPath!
    goto :manual_select
)

for %%f in ("!QQPath!") do set "filename=%%~nxf"
if /i not "%filename%"=="QQ.exe" (
    echo [Warning] Selected file is not QQ.exe, continue anyway? (Y/N)
    set /p confirm="Confirm: "
    if /i not "!confirm!"=="Y" goto :manual_select
)

:save_and_boot
if not exist "%cd%\config" mkdir "%cd%\config"
echo !QQPath!>"%QQ_PATH_CONFIG%"
echo [Info] QQ path saved to config\qq_path.txt

:napcat_boot
echo.
echo [Info] Using QQ: "!QQPath!"

rem Check if this is QQNT (required) vs old QQ
set "isOldQQ="
if not "!QQPath:\Bin\QQ.exe=!"=="!QQPath!" set "isOldQQ=1"
if defined isOldQQ (
    echo.
    echo ============================================
    echo   [Error] Incompatible QQ Version Detected
    echo ============================================
    echo.
    echo The selected QQ appears to be the OLD version ^(QQ 9.x^).
    echo NapCat requires QQNT ^(QQ 9.9.x or later^).
    echo.
    echo Your path: "!QQPath!"
    echo.
    echo QQNT paths typically look like:
    echo   - C:\Program Files\Tencent\QQNT\QQ.exe
    echo   - %LocalAppData%\Programs\Tencent\QQNT\QQ.exe
    echo.
    echo Please:
    echo   1. Download QQNT from https://im.qq.com/
    echo   2. Run reset-qq-path.bat to clear saved path
    echo   3. Run this launcher again
    echo.
    goto :end_script
)

call :sync_patch_package

echo.

set NAPCAT_MAIN_PATH=%NAPCAT_MAIN_PATH:\=/%
echo (async () =^> {await import("file:///%NAPCAT_MAIN_PATH%")})() > "%NAPCAT_LOAD_PATH%"

"%NAPCAT_LAUNCHER_PATH%" "!QQPath!" "%NAPCAT_INJECT_PATH%" %*
goto :end_script

:sync_patch_package
set "QQPackageJson="
set "QQDir="
for %%f in ("!QQPath!") do set "QQDir=%%~dpf"

if exist "!QQDir!resources\app\package.json" (
    set "QQPackageJson=!QQDir!resources\app\package.json"
)

if "!QQPackageJson!"=="" if exist "!QQDir!versions" (
    for /f "delims=" %%d in ('dir /b /ad /o-n "!QQDir!versions" 2^>nul') do (
        if exist "!QQDir!versions\%%d\resources\app\package.json" (
            set "QQPackageJson=!QQDir!versions\%%d\resources\app\package.json"
            goto :sync_patch_package_found
        )
    )
)

:sync_patch_package_found
if "!QQPackageJson!"=="" (
    echo [Warning] QQNT package.json not found, using bundled qqnt.json.
    goto :eof
)

echo [Info] Syncing qqnt.json from installed QQNT metadata...
set "QCE_QQ_PACKAGE_JSON=!QQPackageJson!"
set "QCE_PATCH_PACKAGE=%NAPCAT_PATCH_PACKAGE%"
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$ErrorActionPreference='Stop';" ^
    "$source = Get-Content -Raw -LiteralPath $env:QCE_QQ_PACKAGE_JSON | ConvertFrom-Json;" ^
    "$patch = [ordered]@{};" ^
    "foreach ($name in 'name','verHash','version','linuxVersion','linuxVerHash','private','description','productName','author','homepage','sideEffects','bin','buildVersion') { if ($source.PSObject.Properties.Name -contains $name) { $patch[$name] = $source.$name } };" ^
    "$patch['main'] = './loadNapCat.js';" ^
    "$patch['isPureShell'] = $true;" ^
    "$patch['isByteCodeShell'] = $true;" ^
    "$patch['platform'] = 'win32';" ^
    "$patch['eleArch'] = 'x64';" ^
    "$patch | ConvertTo-Json -Depth 16 | Set-Content -LiteralPath $env:QCE_PATCH_PACKAGE -Encoding UTF8"

if errorlevel 1 (
    echo [Warning] Failed to refresh qqnt.json, falling back to bundled metadata.
) else (
    echo [Info] qqnt.json refreshed successfully.
)
goto :eof

:end_script
