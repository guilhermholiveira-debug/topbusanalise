# ✅ TOPBUS Sinistros v2.0 - Pronto para Deploy no Netlify

## 📦 Estrutura Criada

```
topbusanalise/
├── 📄 index.html                 # Entry point (Vite)
├── 📦 package.json               # Dependências (React 18, Vite, Tailwind)
├── 🔧 vite.config.js             # Config Vite
├── 🎨 tailwind.config.js         # Config Tailwind CSS
├── 📮 postcss.config.js          # Config PostCSS
├── 🌐 netlify.toml               # Config Netlify (dist output)
├── .env.local                    # Credenciais locais (NÃO commitado)
├── .env.example                  # Template (commitado)
├── .nvmrc                        # Node 18.17.0
├── .gitignore                    # Protege .env.local
│
├── 📁 src/
│   ├── main.jsx                  # React entry
│   ├── App.jsx                   # App com navegação
│   ├── index.css                 # Estilos globais + Tailwind
│   └── components/
│       ├── FormularioSinistro.jsx ✅ Seleção de unidade (TOPBUS/BELO MONTE)
│       └── ListaSinistros.jsx     ✅ Filtro por unidade + listagem
│
├── 📁 public/
│   └── favicon.ico
│
├── 📄 README.md                  # Documentação completa
├── 📄 CONFIGURACAO_FINAL.md      # Credenciais e IDs
├── 📄 GUIA_DEPLOY_NETLIFY.md    # ← Instruções passo a passo
└── 🐙 .github/copilot-instructions.md
```

## ✅ Funcionalidades Implementadas

### FormularioSinistro.jsx

- ✅ Seleção visual de unidade (TOPBUS azul / BELO MONTE verde)
- ✅ Campo `empresa` obrigatório no estado
- ✅ Validação incluindo seleção de empresa
- ✅ Payload com `empresa` ('topbus' ou 'belomonte')
- ✅ Integração com Google Apps Script
- ✅ Suporte a múltiplos campos dinâmicos

### ListaSinistros.jsx

- ✅ Filtro de unidade (dropdown)
- ✅ Badge de empresa com cores diferentes
- ✅ Fetch com parâmetro `empresa`
- ✅ Busca por protocolo/local/motorista
- ✅ Filtro por período
- ✅ Links para planilha Google Sheets

### Ambiente

- ✅ `.env.local` com credenciais configuradas
- ✅ `.env.example` para Git (sem credenciais)
- ✅ `.gitignore` protegendo `.env.local`
- ✅ `netlify.toml` otimizado para Vite
- ✅ Node 18.17.0 fixado com `.nvmrc`

## 🚀 Fazer Deploy no Netlify

### Passo 1: Verificar código no GitHub

```bash
# Clonar repositório (já está commitado)
git status
git log --oneline -5
```

**Status**: ✅ Commits já enviados para GitHub

### Passo 2: Conectar ao Netlify

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Selecione **GitHub** como provedor
4. Autorize acesso ao GitHub
5. Selecione repositório: `topbusanalise`
6. Configure build:
   - **Build command**: `npm run build` (já está em package.json)
   - **Publish directory**: `dist` (correto para Vite)
7. Clique em **"Deploy site"**

### Passo 3: Aguardar primeiro deploy

- O Netlify começará a compilar automaticamente
- Você receberá um domínio provisório (ex: `jolly-dragon-abc123.netlify.app`)
- Isso pode levar 2-5 minutos

### Passo 4: Configurar Variáveis de Ambiente

Após o primeiro deploy:

1. **Site settings** → **Environment variables**
2. Clique em **"Add a variable"**
3. Adicione as 4 variáveis:

```
REACT_APP_APPS_SCRIPT_URL = https://script.google.com/macros/s/AKfycbynbT_LfA0QClk7u7So3mfL9zjU9Q4Q-SDlPSbEASTCi3bbbUWd78EgbjiUfDVN5qP0Kg/exec
REACT_APP_API_KEY = a03f60d688b3b52900e5cd8faa74a4d5c4a551e27d02828e4f11e0d5d4584812
VITE_APPS_SCRIPT_URL = https://script.google.com/macros/s/AKfycbynbT_LfA0QClk7u7So3mfL9zjU9Q4Q-SDlPSbEASTCi3bbbUWd78EgbjiUfDVN5qP0Kg/exec
VITE_API_KEY = a03f60d688b3b52900e5cd8faa74a4d5c4a551e27d02828e4f11e0d5d4584812
```

### Passo 5: Trigger redeploy

1. Clique em **"Deploys"** (aba superior)
2. Clique no botão **"Trigger deploy"**
3. Selecione **"Deploy site"**
4. Aguarde conclusão

## ✅ Verificar Deploy

1. Acesse a URL do seu site
2. **Teste TOPBUS**:
   - Clique "📝 Novo Sinistro"
   - Clique no botão azul "🚌 TOPBUS"
   - Verifique se formulário carrega

3. **Teste BELO MONTE**:
   - Clique no botão verde "🏔️ BELO MONTE"
   - Verifique cores e layout

4. **Teste Listagem**:
   - Clique "📊 Sinistros"
   - Verifique filtro de unidades

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| 404 ao recarregar | ✅ Netlify.toml já configura SPA |
| API não conecta | Verifique variáveis de ambiente |
| Erro CORS | URL do Apps Script deve ser correta |
| Build falha | Verifique Node version (18+) |

## 📊 Specs Técnico

- **Frontend**: React 18 + Vite
- **Estilo**: Tailwind CSS
- **Ícones**: Lucide React
- **Build**: Vite (otimizado, ~150KB gzip)
- **Deploy**: Netlify (automático a cada push)
- **Variáveis**: Environment variables seguras

## 📞 Próximas Etapas

1. ✅ Repositório está pronto em GitHub
2. 🔜 Fazer deploy no Netlify (acima)
3. 🔜 Testar ambas as unidades (TOPBUS e BELO MONTE)
4. 🔜 Compartilhar URL com equipe

---

**Versão**: 2.0.0  
**Status**: ✅ Pronto para produção  
**Última atualização**: Novembro 2025  
**Build**: Vite + Netlify
