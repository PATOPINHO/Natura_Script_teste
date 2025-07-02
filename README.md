# 🧪 Script de Login e Extração - Natura (com Puppeteer + Brave)

Este projeto automatiza o login no portal de consultoria da [Natura](https://login.natura.net/ssoauth), simulando um usuário real com o navegador Brave e extraindo dados como **nome**, **saldo** e **endereço** da conta.

---

## ✅ Funcionalidades

- Login automatizado por Puppeteer com Stealth Plugin
- Emulação de Android e ações humanas (movimento de mouse)
- Leitura de múltiplas contas a partir de `contas.txt`
- Geração automática de `resultados.txt` com os dados coletados
- Compatível com Brave Browser (alta taxa de bypass de bot detection)

---

## 📁 Estrutura do Projeto

```
natura_bot/
├── contas.txt           # Contas no formato email:senha ou cpf:senha
├── resultados.txt       # Saída dos resultados da automação
├── natura_multi.js      # Script principal com Puppeteer + Brave
└── install.bat          # Script automático para instalar dependências
```

---

## 🔧 Requisitos

- **Node.js** (v16+): [https://nodejs.org](https://nodejs.org)
- **Brave Browser** instalado no caminho padrão:
  ```
  C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe
  ```

> ⚠️ Se o Brave estiver em outro local, edite o caminho no arquivo `natura_multi.js`, linha:

```js
executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe'
```

---

## 🚀 Como usar

1. **Clone o repositório ou baixe o `.zip`**
2. Coloque suas credenciais no arquivo `contas.txt`, no formato:

```
email1@exemplo.com:senha123
123.456.789-00:minhasenha
```

3. Execute o instalador automático:

```bash
install.bat
```

4. Após instalar, rode o script:

```bash
node natura_multi.js
```

5. Os resultados aparecerão em `resultados.txt`.

---

## 📦 Exemplo de saída

```
✅ rafael@email.com | Nome: Rafael Silva | Saldo: R$ 120,00 | Endereço: Rua das Flores, 123
❌ 123.456.789-00 | Falha no login
⚠️ usuario@email.com | Erro: Navigation timeout
```

---

## 🔐 Segurança

- O script simula interação humana (mouse, delays, navegação real)
- Captura dinâmica de tokens (`bmctx`, `request_id`) para evitar bloqueios

---

## 📌 Futuras melhorias (opcional)

- Integração com bot Telegram
- Suporte a proxies e 2Captcha
- Exportação para `.json` ou Google Sheets

---

## 🧑‍💻 Autor

Desenvolvido por Senhor Destino  
Contato: t.me/senhordestinoofc
