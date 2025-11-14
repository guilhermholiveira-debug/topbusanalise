# 🚀 Guia de Deploy no Netlify

## Pré-requisitos

- GitHub com repositório criado
- Conta no Netlify (netlify.com)
- Node.js 18+

## 📋 Passo a Passo

### 1. Fazer commit e push para GitHub

```bash
cd /workspaces/topbusanalise
git add .
git commit -m "feat: implementar TOPBUS Sinistros v2.0 com múltiplas unidades"
git push origin main
```

### 2. Conectar repositório ao Netlify

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em "Add new site"
3. Selecione "Import an existing project"
4. Escolha GitHub como provedor
5. Selecione o repositório `topbusanalise`
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Clique em "Deploy site"

### 3. Configurar Variáveis de Ambiente

Após o primeiro deploy:

1. No painel do Netlify, vá para **Site settings** → **Environment variables**
2. Adicione as seguintes variáveis:

| Key | Value |
|-----|-------|
| `REACT_APP_APPS_SCRIPT_URL` | https://script.google.com/macros/s/AKfycbynbT_LfA0QClk7u7So3mfL9zjU9Q4Q-SDlPSbEASTCi3bbbUWd78EgbjiUfDVN5qP0Kg/exec |
| `REACT_APP_API_KEY` | a03f60d688b3b52900e5cd8faa74a4d5c4a551e27d02828e4f11e0d5d4584812 |
| `VITE_APPS_SCRIPT_URL` | https://script.google.com/macros/s/AKfycbynbT_LfA0QClk7u7So3mfL9zjU9Q4Q-SDlPSbEASTCi3bbbUWd78EgbjiUfDVN5qP0Kg/exec |
| `VITE_API_KEY` | a03f60d688b3b52900e5cd8faa74a4d5c4a551e27d02828e4f11e0d5d4584812 |

### 4. Trigger redeploy

Após adicionar as variáveis, clique em **Trigger deploy** para reconstruir com as novas variáveis.

## ✅ Verificar Deploy

1. Acesse a URL do site (ex: https://seu-site.netlify.app)
2. Teste ambos os formulários (TOPBUS e BELO MONTE)
3. Verifique console (F12) para erros

## 🐛 Troubleshooting

### Erro 404 ao recarregar página

- Configuração de redirects no `netlify.toml` já está pronta ✅

### API não conecta

- Verifique variáveis de ambiente no painel do Netlify
- Confirme que URLs estão corretas no Apps Script

### Imagens não carregam

- Permissões da pasta Drive
- URL do Apps Script correta

## 📚 Documentação

- Vite: https://vitejs.dev
- React 18: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Lucide Icons: https://lucide.dev

---

**Status**: Pronto para deploy ✅
