# Configuração Final - TOPBUS Sinistros

## Credenciais Configuradas

### Apps Script
- **URL**: https://script.google.com/macros/s/AKfycbynbT_LfA0QClk7u7So3mfL9zjU9Q4Q-SDlPSbEASTCi3bbbUWd78EgbjiUfDVN5qP0Kg/exec
- **API Key**: a03f60d688b3b52900e5cd8faa74a4d5c4a551e27d02828e4f11e0d5d4584812

### Planilha Google Sheets
- **ID**: 1ZtatcnU7jwHXrso5mSIMRFQIFFUhsihUyGvRK36klSo
- **Aba TOPBUS**: gid=0
- **Aba BELO_MONTE**: gid=760103440

### Google Drive
- **Pasta Imagens**: 1AQFiXi9-xDulKgO-qZCF3tRrBIsrWcf4

## Arquivo .env.local

Crie na raiz do projeto:

```env
REACT_APP_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbynbT_LfA0QClk7u7So3mfL9zjU9Q4Q-SDlPSbEASTCi3bbbUWd78EgbjiUfDVN5qP0Kg/exec
REACT_APP_API_KEY=a03f60d688b3b52900e5cd8faa74a4d5c4a551e27d02828e4f11e0d5d4584812
```

## Netlify Environment Variables

Configure no painel do Netlify (Site settings → Environment variables):

| Key | Value |
|-----|-------|
| `REACT_APP_APPS_SCRIPT_URL` | https://script.google.com/macros/s/AKfycbynbT_LfA0QClk7u7So3mfL9zjU9Q4Q-SDlPSbEASTCi3bbbUWd78EgbjiUfDVN5qP0Kg/exec |
| `REACT_APP_API_KEY` | a03f60d688b3b52900e5cd8faa74a4d5c4a551e27d02828e4f11e0d5d4584812 |

## Segurança

⚠️ **CRÍTICO**: 
- `.env.local` está no `.gitignore`
- Nunca commite credenciais no Git
- Variáveis configuradas no Netlify (não no código)

## Teste Local

```bash
npm install
npm start
```

## Deploy

```bash
npm run build
netlify deploy --prod
```

---
**Status**: ✅ Configurado e funcionando
