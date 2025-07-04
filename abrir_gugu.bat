@echo off
echo Abrindo Google Chrome com depuração remota na porta 9222...
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-address=0.0.0.0 --remote-debugging-port=9222 --user-data-dir="C:\chrome-data"
echo Chrome iniciado. Mantenha essa janela do Chrome aberta enquanto roda o script.
pause
