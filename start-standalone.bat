@echo off
chcp 65001 > nul
title QCE 独立模式
cd /d "%~dp0"

echo.
echo [QCE] 独立模式
echo [QCE] 无需登录QQ即可浏览已导出的聊天记录
echo.

:: 检查 Node.js - 首先尝试使用打包的 Node
set "NODE_EXE="

:: 检查是否有打包的 Node.js
if exist "%~dp0node.exe" (
    set "NODE_EXE=%~dp0node.exe"
    goto :found_node
)

:: 检查系统 Node.js
where node >nul 2>&1
if %errorlevel% equ 0 (
    set "NODE_EXE=node"
    goto :found_node
)

:: 未找到 Node.js
echo [错误] 未检测到 Node.js
echo.
echo 解决方案:
echo   1. 安装 Node.js: https://nodejs.org/
echo   2. 或使用完整版 NapCat+QCE 包（运行 launcher-user.bat）
echo.
pause
exit /b 1

:found_node
echo [信息] 正在启动独立模式服务器...
echo.
"%NODE_EXE%" plugins/napcat-plugin-qce/standalone.mjs %1

pause
