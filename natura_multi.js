const fs = require('fs');
const { chromium } = require('playwright');

const contas = fs.readFileSync('contas.txt', 'utf-8').split('\n').filter(l => l.trim());
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  // Conecta no Chrome real
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const context = browser.contexts()[0];

  for (const conta of contas) {
    const [login, senha] = conta.split(':');
    if (!login || !senha) continue;

    const page = await context.newPage();

    try {
      console.log(`\n🔐 Testando: ${login}`);
      console.log(`🌐 Acessando home para capturar URL de login...`);

      await page.goto('https://consultoria.natura.com.br/webfv', { waitUntil: 'domcontentloaded' });
      await delay(5000);

      const currentUrl = page.url();
      console.log(`📡 URL de login capturada:\n${currentUrl}`);

      if (!currentUrl.includes('ssoauth')) {
        console.log(`❌ Não foi possível capturar URL de login com tokens.`);
        await page.close();
        continue;
      }

      await delay(3000);

      console.log(`🍪 Cookies antes do login:`);
      console.table(await context.cookies());

      await page.fill('input[name="username"]', login.trim());
      await page.fill('input[name="password"]', senha.trim());

      await page.waitForSelector('.krRdwH', { timeout: 10000 });
      console.log(`➡️ Enviando formulário via JS…`);

      // Executa form.submit() no navegador real
      await page.evaluate(() => {
        document.querySelector('form').submit();
      });

      await delay(7000);

      const urlFinal = page.url();
      console.log(`🌐 URL após login: ${urlFinal}`);

      if (urlFinal.includes('consultoria.natura') || urlFinal.includes('webfv')) {
        console.log(`✅ Login OK: ${login}`);
      } else {
        console.log(`⚠️ Login falhou ou não redirecionou.`);
      }

      await delay(3000);

    } catch (err) {
      console.error(`❌ Erro ao processar ${login}:`, err.message);
    }

    await page.close();
    await delay(1000);
  }

  console.log('\n🏁 Testes concluídos.');
  await browser.close();
})();
