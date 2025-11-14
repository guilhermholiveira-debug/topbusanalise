# 📋 REVISÃO COMPLETA DE ERROS - TOPBUS SINISTROS

Data: 14 de Novembro de 2025
Status: Crítico

---

## ❌ LISTA COMPLETA DE ERROS ENCONTRADOS

### 🔴 ERRO 1: Variáveis de Ambiente Incorretas (CRÍTICO)

**Arquivo**: `topbus-sinistros/src/App.jsx` (linhas 4-5)
**Problema**:
```javascript
const API_URL = process.env.REACT_APP_APPS_SCRIPT_URL;  // ❌ ERRADO
const API_KEY = process.env.REACT_APP_API_KEY;           // ❌ ERRADO
```
**Causa**: Usando `process.env` (Node.js) em vez de `import.meta.env` (Vite)
**Impacto**: API_URL e API_KEY ficarão indefinidos → Erros ao carregar sinistros
**Solução**: Mudar para `import.meta.env.VITE_APPS_SCRIPT_URL`

---

### 🔴 ERRO 2: Dropdown Empresa Não Funciona (CRÍTICO)

**Arquivo**: `src/components/FormularioSinistro.jsx` (linhas 195-230)
**Problema**:
```jsx
<div className="relative">              {/* ❌ Falta z-10 */}
  <button>...</button>
  {dropdownAberto && (
    <div className="absolute z-50 ... overflow-hidden">  {/* ❌ overflow-hidden corta */}
```
**Causa**: 
- Container sem z-index, impede sobreposição
- `overflow-hidden` corta o dropdown
**Impacto**: Dropdown não abre ou fica cortado
**Solução**: 
- Adicionar `z-10` ao container
- Mudar `overflow-hidden` para `overflow-auto`
- Adicionar `maxHeight: '300px'`

---

### 🔴 ERRO 3: Sem Fallback para Erros de API (CRÍTICO)

**Arquivo**: `topbus-sinistros/src/App.jsx` (linhas 13-50)
**Problema**:
```javascript
carregarRegistros = () => {
  if (!API_URL || !API_KEY) {
    setErroLista("Configure REACT_APP_APPS_SCRIPT_URL e REACT_APP_API_KEY."); // ❌ Mensagem confusa
    return;
  }
  // ❌ Sem tratamento para resposta vazia ou malformada
```
**Causa**: Apps Script pode retornar array vazio ou estrutura diferente
**Impacto**: Lista de sinistros não carrega, mensagem genérica
**Solução**: Melhorar validação e fallbacks

---

### 🔴 ERRO 4: Inconsistência de Nomes de Campos (CRÍTICO)

**Arquivo**: `topbus-sinistros/src/components/ListaSinistros.jsx` (linhas 80-150)
**Problema**: Múltiplos nomes para o mesmo campo
```javascript
registro.dataHora ||
registro.ocorrenciaEm ||
registro.ocorridoEm ||     // ❌ Indefinido
registro.atualizadoEm      // ❌ Não é data original
```
**Causa**: Apps Script retorna estrutura diferente esperada
**Impacto**: Datas não aparecem, filtros não funcionam
**Solução**: Padronizar nomes de campos

---

### 🟡 ERRO 5: Método HTTP GET para Listar (AVISO)

**Arquivo**: `topbus-sinistros/src/App.jsx` (linha 24)
**Problema**:
```javascript
const resposta = await fetch(API_URL, {
  method: "GET",  // ❌ GET com headers não é padrão para Apps Script
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "X-API-Key": API_KEY,
  },
});
```
**Causa**: Apps Script funciona melhor com POST
**Impacto**: Pode não receber os dados corretamente
**Solução**: Mudar para POST com `action: "listar"`

---

### 🔴 ERRO 6: Sem Tratamento de Resposta Vazia (CRÍTICO)

**Arquivo**: `topbus-sinistros/src/App.jsx` (linhas 35-42)
**Problema**:
```javascript
const dadosLista = Array.isArray(payload)
  ? payload
  : payload?.registros || payload?.sinistros || [];  // ❌ Falta verificação para undefined
```
**Causa**: Se payload for null/undefined, causa erro
**Impacto**: App quebra ao carregar dados
**Solução**: Adicionar verificação: `|| { registros: [] }`

---

### 🔴 ERRO 7: Imagens Não Aparecem na Lista (CRÍTICO)

**Arquivo**: `topbus-sinistros/src/components/ListaSinistros.jsx` (linha 403)
**Problema**:
```javascript
const imagensLista = sinistro.imagens || sinistro.imageUrls || sinistro.images || [];
// ❌ Nenhuma validação se são URLs válidas
```
**Causa**: Apps Script retorna IDs de Drive, não URLs
**Impacto**: Links de imagens quebrados
**Solução**: Converter IDs para URLs do Google Drive

---

### 🔴 ERRO 8: Dropdown com Comportamento Confuso (CRÍTICO)

**Arquivo**: `src/components/FormularioSinistro.jsx` (linhas 195-230)
**Problema**: Container com classe `relative` simples
```jsx
<div className="relative">  {/* ❌ Sem z-index contextual */}
```
**Causa**: Falta contexto de stacking, outros elementos podem sobrepor
**Impacto**: Dropdown fica atrás de modais ou outros elementos
**Solução**: Usar `relative z-10` ou `fixed` com `z-50`

---

### 🟡 ERRO 9: Sem Validação de Formato de Imagem (AVISO)

**Arquivo**: `topbus-sinistros/src/components/FormularioSinistro.jsx` (linha 82)
**Problema**:
```javascript
if (!arquivo.type.startsWith("image/")) {
  // ❌ Não valida MIME type real, apenas verificação MIME
```
**Causa**: Usuário pode renomear arquivo .exe para .jpg
**Impacto**: Upload de arquivo malicioso
**Solução**: Validar bytes mágicos do arquivo

---

### 🟡 ERRO 10: LocalStorage Sem Persistência (AVISO)

**Arquivo**: `src/App.jsx` (linhas 10-15)
**Problema**: Estado de autenticação perdido ao recarregar
```javascript
const [dashboardAuth, setDashboardAuth] = useState(false)
// ❌ Sem localStorage, logout ao recarregar F5
```
**Causa**: Estado em memória, não persiste
**Impacto**: Usuário precisa fazer login a cada recarregar
**Solução**: Adicionar localStorage para token

---

### 🔴 ERRO 11: Sem Tratamento de Timeout (CRÍTICO)

**Arquivo**: `topbus-sinistros/src/App.jsx` (linhas 23-50)
**Problema**:
```javascript
const resposta = await fetch(API_URL, {
  // ❌ Sem timeout, pode travar indefinidamente
});
```
**Causa**: Requisição lenta não tem limite de tempo
**Impacto**: App fica congelado se Apps Script estiver lento
**Solução**: Adicionar AbortController com timeout

---

### 🟡 ERRO 12: Consoles de Debug Deixados (AVISO)

**Arquivo**: `topbus-sinistros/src/components/FormularioSinistro.jsx` (linha 104)
**Problema**:
```javascript
console.error(erroConversao);  // ❌ Deixado para produção
```
**Causa**: Debug code não removido
**Impacto**: Poluição de console, possível exposição de dados
**Solução**: Remover console.error ou envolver com process.env.NODE_ENV

---

## 📊 RESUMO EXECUTIVO

| Severidade | Qtd | Categoria |
|-----------|-----|-----------|
| 🔴 Crítico | 8 | Login, API, Dropdown, Imagens |
| 🟡 Aviso | 4 | Validação, Performance |
| **TOTAL** | **12** | **Bloqueadores** |

---

## 🎯 PROBLEMAS PRINCIPAIS POR PRIORIDADE

### P1 (Bloqueador Imediato):

1. ❌ Variáveis de ambiente erradas (process.env vs import.meta.env)
2. ❌ Dropdown empresa não abre
3. ❌ Lista de sinistros não carrega (API retorna erro)
4. ❌ Imagens não mostram

### P2 (Funcionalidade Quebrada):

5. ⚠️ Sem validação correta de resposta JSON
6. ⚠️ Sem timeout nas requisições
7. ⚠️ Inconsistência de nomes de campos

### P3 (Melhorias):

8. 💡 Persistência de sessão (localStorage)
9. 💡 Validação de tipo de arquivo
10. 💡 Remover console.log

---

## ✅ PRÓXIMOS PASSOS

1. **Fase 1**: Corrigir variáveis de ambiente
2. **Fase 2**: Refatorar dropdown com select simples
3. **Fase 3**: Adicionar validação de API
4. **Fase 4**: Testar com dados reais do Apps Script
5. **Fase 5**: Implementar melhorias P2 e P3

---

**Pronto para corrigir? Responda com "sim" e começaremos pelas correções.**
