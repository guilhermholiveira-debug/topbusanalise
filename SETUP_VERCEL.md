# Setup Variáveis de Ambiente no Vercel

## 📋 Passo a Passo

### 1. Acessar o Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta
3. Selecione o projeto `topbusanalise`

### 2. Acessar Configurações de Ambiente

1. Clique em **Settings** (Configurações)
2. No menu esquerdo, clique em **Environment Variables** (Variáveis de Ambiente)

### 3. Adicionar Variáveis

Adicione as seguintes variáveis com os valores abaixo:

| Variável | Valor | Ambiente |
|----------|-------|----------|
| `VITE_DASHBOARD_LOGIN` | `sinistro` | Production, Preview, Development |
| `VITE_DASHBOARD_PASSWORD` | `139702` | Production, Preview, Development |
| `VITE_APPS_SCRIPT_URL` | `https://script.google.com/macros/s/AKfycbzWN0zjwL0iN_4WuDIbl7W-foaf3ckIJO_YmByQEt-PpnQpWR5HcQtT1OcBK4DS79Q5LA/exec` | Production, Preview, Development |

### 4. Passos Detalhados para Cada Variável

#### Para `VITE_DASHBOARD_LOGIN`

1. Clique em **Add New**
2. Nome: `VITE_DASHBOARD_LOGIN`
3. Valor: `sinistro`
4. Selecione todos os ambientes (✓ Production, ✓ Preview, ✓ Development)
5. Clique em **Save**

#### Para `VITE_DASHBOARD_PASSWORD`

1. Clique em **Add New**
2. Nome: `VITE_DASHBOARD_PASSWORD`
3. Valor: `139702`
4. Selecione todos os ambientes (✓ Production, ✓ Preview, ✓ Development)
5. Clique em **Save**

#### Para `VITE_APPS_SCRIPT_URL`

1. Clique em **Add New**
2. Nome: `VITE_APPS_SCRIPT_URL`
3. Valor: `https://script.google.com/macros/s/AKfycbzWN0zjwL0iN_4WuDIbl7W-foaf3ckIJO_YmByQEt-PpnQpWR5HcQtT1OcBK4DS79Q5LA/exec`
4. Selecione todos os ambientes (✓ Production, ✓ Preview, ✓ Development)
5. Clique em **Save**

### 5. Fazer Redeploy

Após adicionar as variáveis:

1. Vá para **Deployments** (Implantações)
2. Clique no deployment mais recente
3. Clique em **Redeploy** (Reimplantar)
4. Escolha **Use existing Build Cache** (Usar Cache Existente)
5. Clique em **Redeploy**

Ou faça um novo push para o repositório:

```bash
git push origin main
```

### ✅ Verificação

Após o redeploy:

1. Acesse seu site no Vercel
2. Tente fazer login com: `sinistro / 139702`
3. Teste a seleção de empresa no formulário

## 🔐 Notas Importantes

- ⚠️ **Nunca** exponha as credenciais no `.env.local` em commits públicos
- ✅ O `.env.local` está no `.gitignore` para segurança
- ✅ As variáveis com prefixo `VITE_` são expostas ao frontend (seguras para credenciais de demo)
- ✅ As variáveis devem estar em **todos os ambientes** (Production, Preview, Development)

## 🐛 Solução de Problemas

### Login não funciona após deploy

1. Verifique se as variáveis foram adicionadas corretamente
2. Faça redeploy do projeto
3. Limpe o cache do navegador (Ctrl+Shift+Delete)

### Dropdown não abre

1. Verifique o console do navegador (F12 → Console)
2. Procure por erros JavaScript
3. Verifique se o CSS está sendo carregado corretamente

### App Script não responde

1. Verifique a URL em `VITE_APPS_SCRIPT_URL`
2. Teste a URL em um navegador separado
3. Verifique os logs do Apps Script no Google

---

**Data de Atualização:** 14 de Novembro de 2025
