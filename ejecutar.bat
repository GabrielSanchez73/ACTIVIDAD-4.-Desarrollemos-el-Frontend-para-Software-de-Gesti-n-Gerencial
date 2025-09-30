@echo off
setlocal
set SCRIPT_DIR=%~dp0

echo ========================================
echo Iniciando Sistema de Nomina (modo rapido)
echo Script: %SCRIPT_DIR%
echo ========================================
echo.

echo Verificando dependencias...
if not exist "%SCRIPT_DIR%server\node_modules" (
  pushd "%SCRIPT_DIR%server"
  npm install
  popd
)
if not exist "%SCRIPT_DIR%client\node_modules" (
  pushd "%SCRIPT_DIR%client"
  npm install
  popd
)

echo Ejecutando pruebas rapidas...
pushd "%SCRIPT_DIR%"
node test-system.js
if %errorlevel% neq 0 (
  echo Aviso: pruebas arrojaron advertencias/errores. Continuando de todas formas.
)
popd

echo Abriendo backend...
start "Servidor - Nomina" cmd /k "cd /d %SCRIPT_DIR%server && npm run dev"

echo Abriendo frontend (puerto 3000)...
start "Cliente - Nomina" cmd /k "cd /d %SCRIPT_DIR%client && set PORT=3000 && npm start"

echo.
echo Frontend: http://localhost:3000
echo Backend : http://localhost:5000
echo.
echo Listo! Puedes cerrar esta ventana.
endlocal
