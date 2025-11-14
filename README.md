# TOPBUS Sinistros v2.0

Sistema de registro e acompanhamento de sinistros de frota com suporte a múltiplas unidades (TOPBUS e BELO MONTE).

## 🏗️ Arquitetura

```
Frontend React (Netlify)
    ↓ HTTPS POST/GET
Google Apps Script (Backend)
    ↓
├─→ Google Sheets (2 abas separadas)
│   ├── TOPBUS (gid=0)
│   └── BELO_MONTE (gid=760103440)
└─→ Google Drive (Imagens organizadas por unidade)
    ├── TOPBUS/SIN-TB-XXXX/
    └── BELO_MONTE/SIN-BM-XXXX/
```

## 📂 Estrutura do Projeto

```
topbus-sinistros/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── FormularioSinistro.jsx  # Formulário com seleção de unidade
│   │   └── ListaSinistros.jsx      # Listagem com filtro por unidade
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── .env.local                       # Credenciais (NÃO COMMITAR)
├── .env.example                     # Template
├── .gitignore
├── package.json
├── tailwind.config.js
├── netlify.toml
├── .vscode/
│   └── settings.json                # Configuração UTF-8
└── README.md
```

## ⚙️ Funcionalidades

### Registro de Sinistros

- ✅ **Seleção de Unidade**: TOPBUS ou BELO MONTE
- ✅ Dados do acidente (data, local, veículo, motorista, chapa)
- ✅ Identificação de culpabilidade (Motorista/Terceiro)
- ✅ Dados de terceiros (nome, placa, veículo, telefone)
- ✅ Testemunhas (múltiplas, dinâmico)
- ✅ 8 categorias de fotos guiadas com câmera
- ✅ Upload de documentos (BO, CNH, etc.)
- ✅ Validação completa de campos
- ✅ Suporte UTF-8 (português brasileiro)

### Listagem

- ✅ Filtro por unidade (Todas/TOPBUS/BELO MONTE)
- ✅ Busca por protocolo, local, motorista
- ✅ Filtro por período (hoje, semana, mês)
- ✅ Badge de empresa e culpabilidade
- ✅ Links diretos para planilha e Drive

## 🚀 Setup Local

### 1. Pré-requisitos

- Node.js 18+
- npm 9+

### 2. Instalação

```bash
cd C:\Users\DELL\OneDrive\Desktop\TOPBUSDEV
npm install
```

### 3. Configurar Credenciais

Crie `.env.local` na raiz:

```env
REACT_APP_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbynbT_LfA0QClk7u7So3mfL9zjU9Q4Q-SDlPSbEASTCi3bbbUWd78EgbjiUfDVN5qP0Kg/exec
REACT_APP_API_KEY=a03f60d688b3b52900e5cd8faa74a4d5c4a551e27d02828e4f11e0d5d4584812
```

### 4. Executar

```bash
npm start
```

Acesse: `http://localhost:3000`

## 📦 Deploy (Netlify)

### Opção A: Git (Recomendado)

1. Conecte repositório no Netlify
2. Configure variáveis de ambiente:
   - `REACT_APP_APPS_SCRIPT_URL`
   - `REACT_APP_API_KEY`
3. Deploy automático a cada push

### Opção B: CLI

```bash
npm run build
netlify deploy --prod
```

## 🔐 Segurança

- `.env.local` **NÃO** é commitado (`.gitignore`)
- API Key configurada no Apps Script (Propriedades)
- Credenciais apenas em variáveis de ambiente
- HTTPS obrigatório

## 📊 Dados Segregados

Cada unidade possui:
- **Aba exclusiva** na planilha
- **Pasta exclusiva** no Drive
- **Protocolo único**: `SIN-TB-XXXX` ou `SIN-BM-XXXX`

## 🛠️ Stack Tecnológica

- **Frontend**: React 18, Tailwind CSS, Lucide Icons
- **Backend**: Google Apps Script
- **Banco**: Google Sheets (2 abas)
- **Storage**: Google Drive
- **Deploy**: Netlify
- **Encoding**: UTF-8

## 📝 IDs Configurados

| Recurso | ID |
|---------|-----|
| Planilha | 1ZtatcnU7jwHXrso5mSIMRFQIFFUhsihUyGvRK36klSo |
| Aba TOPBUS | gid=0 |
| Aba BELO_MONTE | gid=760103440 |
| Drive (Imagens) | 1AQFiXi9-xDulKgO-qZCF3tRrBIsrWcf4 |

## 🧪 Teste Completo

1. Selecionar unidade (TOPBUS ou BELO MONTE)
2. Preencher todos os campos
3. Tirar mínimo 5 fotos (guiadas)
4. Adicionar documentos (opcional)
5. Registrar sinistro
6. Verificar protocolo gerado
7. Verificar planilha (aba correta)
8. Verificar pasta no Drive

## 📚 Documentação Adicional

- `CONFIGURACAO_APPSCRIPT.md` - Setup backend
- `COMANDOS_COPILOT.md` - Comandos VS Code
- `CONFIGURACAO_FINAL.md` - Credenciais e IDs

## 🐛 Troubleshooting

### Erro "Invalid API key"

Verifique `.env.local` e variáveis do Netlify

### Imagens não salvam

Confirme permissões da pasta Drive

### Dados não aparecem

Verifique se aba existe na planilha

### CORS blocked

Reimplante Apps Script e atualize URL

## 📞 Suporte

Consulte logs:
- **Frontend**: Chrome DevTools (F12) → Console
- **Backend**: Google Apps Script → Executar → Logs

---

**Versão**: 2.0  
**Status**: ✅ Produção  
**Última atualização**: Novembro 2025  
**Desenvolvido para**: TOPBUS e BELO MONTE
