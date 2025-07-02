@echo off
echo Instalando dependências do projeto Natura...

if not exist package.json (
  npm init -y
)

npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth

echo Instalação concluída. Para rodar, use:
echo node natura_multi.js
pause