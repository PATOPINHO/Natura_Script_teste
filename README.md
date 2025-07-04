
# 🌐 Natura Login Automation

Automação para login em massa no portal [consultoria.natura.com.br](https://consultoria.natura.com.br), utilizando **Playwright** com suporte a:
- Captura dinâmica dos tokens de sessão
- Preenchimento automático de login e senha
- Execução via navegador Chrome real com CDP
- Logs detalhados no terminal

---

## 📋 Pré-requisitos

✅ [Node.js](https://nodejs.org) >= 18  
✅ [Google Chrome](https://www.google.com/chrome/) instalado  
✅ Dependências Node instaladas no projeto  
✅ Lista de contas no formato `login:senha`

---

## 🗂 Estrutura do projeto

```
.
├── contas.txt              # Contas para login (uma por linha, login:senha)
├── natura_multi.js         # Script principal com Playwright
├── start_chrome.bat        # Atalho para iniciar o Chrome com CDP
├── README.md               # Este arquivo
```

---

## 🚀 Como usar

### 1️⃣ Instale as dependências

Execute dentro do diretório do projeto:

```bash
npm install playwright
```

---

### 2️⃣ Abra o Chrome em modo depuração

Execute o `.bat` incluído no projeto para abrir o Chrome com suporte a CDP:

```bat
start_chrome.bat
```

Esse comando abrirá o Chrome com o parâmetro `--remote-debugging-port=9222`.  
**Mantenha essa janela do Chrome aberta enquanto o script estiver rodando.**

Você pode verificar se está ativo acessando no navegador:  
👉 [http://127.0.0.1:9222/json](http://127.0.0.1:9222/json)

---

### 3️⃣ Prepare o arquivo `contas.txt`

Adicione suas contas no formato:

```
usuario1@email.com:senha1
usuario2@email.com:senha2
12345678900:senhasecreta
```

---

### 4️⃣ Execute o script

Com o Chrome em CDP já aberto, execute:

```bash
node natura_multi.js
```

O script vai:
✅ Abrir o portal  
✅ Capturar a URL de login com tokens válidos  
✅ Preencher login e senha  
✅ Enviar formulário e aguardar  
✅ Imprimir no terminal as capturas, cookies e status final

---

## 📝 Notas

⚠️ Cada conta é testada separadamente em uma nova aba do navegador.  
⚠️ Se a rede ou o servidor bloquear requisições para `/auth_cred_submit`, o login não será completado.  
⚠️ Se necessário, edite o script para ajustar os `delays` para a sua velocidade de rede.

---

## 🛠 Solução de problemas

🔷 **Erro: `ECONNREFUSED ::1:9222`**
- Verifique se o Chrome está aberto com o `.bat`
- Verifique se o link [http://127.0.0.1:9222/json](http://127.0.0.1:9222/json) responde

🔷 **Erro: `ERR_HTTP2_PROTOCOL_ERROR`**
- Pode indicar problema na conta ou bloqueio da rede/servidor

🔷 **Outro erro?**
- Rode novamente com `headless: false` (já está por padrão) para observar o comportamento no navegador

---

## 📄 Licença

MIT — Este projeto é apenas para fins educacionais.  
**Não é afiliado à Natura.**
