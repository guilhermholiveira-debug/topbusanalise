import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

export default function FormularioSinistro() {
  const [formData, setFormData] = useState({
    empresa: '',  // OBRIGATÓRIO
    dataHora: '',
    local: '',
    onibus: '',
    motorista: '',
    chapa: '',
    terceiro: { nome: '', placa: '', veiculo: '', telefone: '' },
    testemunhas: [{ nome: '', telefone: '' }],
    culpabilidade: '',
    descricao: ''
  })

  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [todasFotos, setTodasFotos] = useState([])
  const [documentosAnexos, setDocumentosAnexos] = useState([])
  const [enviando, setEnviando] = useState(false)

  const API_CONFIG = {
    URL: import.meta.env.VITE_APPS_SCRIPT_URL || process.env.REACT_APP_APPS_SCRIPT_URL,
    API_KEY: import.meta.env.VITE_API_KEY || process.env.REACT_APP_API_KEY
  }

  const validarFormulario = () => {
    if (!formData.empresa) {
      setErro('Selecione a unidade (TOPBUS ou BELO MONTE)')
      return false
    }
    if (!formData.dataHora) {
      setErro('Preencha a data e hora do sinistro')
      return false
    }
    if (!formData.local) {
      setErro('Preencha o local do sinistro')
      return false
    }
    if (!formData.onibus) {
      setErro('Preencha a placa/identificação do ônibus')
      return false
    }
    if (!formData.culpabilidade) {
      setErro('Indique a culpabilidade do sinistro')
      return false
    }
    if (todasFotos.length < 1) {
      setErro('Adicione pelo menos uma foto do sinistro')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setSucesso('')

    if (!validarFormulario()) return

    setEnviando(true)

    const payload = {
      empresa: formData.empresa,  // 'topbus' ou 'belomonte'
      dataHora: formData.dataHora,
      local: formData.local,
      onibus: formData.onibus,
      motorista: formData.motorista,
      chapa: formData.chapa,
      terceiro: `${formData.terceiro.nome} | ${formData.terceiro.placa} | ${formData.terceiro.veiculo} | ${formData.terceiro.telefone}`,
      testemunhas: formData.testemunhas.map(t => `${t.nome} - ${t.telefone}`).join(' | '),
      culpabilidade: formData.culpabilidade,
      descricao: formData.descricao,
      images: [...todasFotos, ...documentosAnexos],
      apiKey: API_CONFIG.API_KEY
    }

    try {
      const response = await fetch(API_CONFIG.URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (data.success) {
        setSucesso(`✅ Sinistro registrado! Protocolo: ${data.protocolo}`)
        setFormData({
          empresa: '',
          dataHora: '',
          local: '',
          onibus: '',
          motorista: '',
          chapa: '',
          terceiro: { nome: '', placa: '', veiculo: '', telefone: '' },
          testemunhas: [{ nome: '', telefone: '' }],
          culpabilidade: '',
          descricao: ''
        })
        setTodasFotos([])
        setDocumentosAnexos([])
        setTimeout(() => window.location.href = '/', 3000)
      } else {
        setErro(data.error || 'Erro ao registrar sinistro')
      }
    } catch (err) {
      setErro('Erro de conexão: ' + err.message)
    } finally {
      setEnviando(false)
    }
  }

  const adicionarTestemunha = () => {
    setFormData(prev => ({
      ...prev,
      testemunhas: [...prev.testemunhas, { nome: '', telefone: '' }]
    }))
  }

  const removerTestemunha = (index) => {
    setFormData(prev => ({
      ...prev,
      testemunhas: prev.testemunhas.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          📋 Registro de Sinistro
        </h1>

        {erro && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p className="font-bold">⚠️ Erro</p>
            <p>{erro}</p>
          </div>
        )}

        {sucesso && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
            <p className="font-bold">✅ Sucesso</p>
            <p>{sucesso}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-8">
          {/* Seleção de Unidade - OBRIGATÓRIO */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <label className="block text-gray-800 font-bold text-lg mb-4 text-center">
              Selecione a Unidade *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, empresa: 'topbus' }))}
                className={`p-6 rounded-lg border-3 font-bold text-xl transition-all ${
                  formData.empresa === 'topbus'
                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg scale-105'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
                }`}
              >
                🚌 TOPBUS
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, empresa: 'belomonte' }))}
                className={`p-6 rounded-lg border-3 font-bold text-xl transition-all ${
                  formData.empresa === 'belomonte'
                    ? 'border-green-600 bg-green-600 text-white shadow-lg scale-105'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-green-400'
                }`}
              >
                🏔️ BELO MONTE
              </button>
            </div>
          </div>

          {/* Dados do Sinistro */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">📍 Dados do Sinistro</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Data e Hora *</label>
                <input
                  type="datetime-local"
                  value={formData.dataHora}
                  onChange={(e) => setFormData(prev => ({ ...prev, dataHora: e.target.value }))}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Local *</label>
                <input
                  type="text"
                  value={formData.local}
                  onChange={(e) => setFormData(prev => ({ ...prev, local: e.target.value }))}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Endereço completo"
                  required
                />
              </div>
            </div>
          </div>

          {/* Dados do Ônibus */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">🚌 Dados do Ônibus</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Placa/ID *</label>
                <input
                  type="text"
                  value={formData.onibus}
                  onChange={(e) => setFormData(prev => ({ ...prev, onibus: e.target.value }))}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="ABC-1234"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Motorista</label>
                <input
                  type="text"
                  value={formData.motorista}
                  onChange={(e) => setFormData(prev => ({ ...prev, motorista: e.target.value }))}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Chapa</label>
                <input
                  type="text"
                  value={formData.chapa}
                  onChange={(e) => setFormData(prev => ({ ...prev, chapa: e.target.value }))}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Número da chapa"
                />
              </div>
            </div>
          </div>

          {/* Culpabilidade */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">⚖️ Culpabilidade *</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, culpabilidade: 'Motorista' }))}
                className={`p-4 rounded-lg border-2 font-bold transition-all ${
                  formData.culpabilidade === 'Motorista'
                    ? 'border-red-600 bg-red-600 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-red-400'
                }`}
              >
                👤 Motorista TOPBUS
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, culpabilidade: 'Terceiro' }))}
                className={`p-4 rounded-lg border-2 font-bold transition-all ${
                  formData.culpabilidade === 'Terceiro'
                    ? 'border-yellow-600 bg-yellow-600 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-yellow-400'
                }`}
              >
                🚗 Terceiro
              </button>
            </div>
          </div>

          {/* Dados de Terceiro (se culpabilidade = Terceiro) */}
          {formData.culpabilidade === 'Terceiro' && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">👤 Dados do Terceiro</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.terceiro.nome}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    terceiro: { ...prev.terceiro, nome: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                  placeholder="Nome completo"
                />
                <input
                  type="text"
                  value={formData.terceiro.placa}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    terceiro: { ...prev.terceiro, placa: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                  placeholder="Placa do veículo"
                />
                <input
                  type="text"
                  value={formData.terceiro.veiculo}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    terceiro: { ...prev.terceiro, veiculo: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                  placeholder="Tipo de veículo"
                />
                <input
                  type="tel"
                  value={formData.terceiro.telefone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    terceiro: { ...prev.terceiro, telefone: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                  placeholder="Telefone"
                />
              </div>
            </div>
          )}

          {/* Testemunhas */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">👥 Testemunhas</h2>
            {formData.testemunhas.map((test, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={test.nome}
                  onChange={(e) => {
                    const newTest = [...formData.testemunhas]
                    newTest[index].nome = e.target.value
                    setFormData(prev => ({ ...prev, testemunhas: newTest }))
                  }}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                  placeholder="Nome"
                />
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={test.telefone}
                    onChange={(e) => {
                      const newTest = [...formData.testemunhas]
                      newTest[index].telefone = e.target.value
                      setFormData(prev => ({ ...prev, testemunhas: newTest }))
                    }}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg"
                    placeholder="Telefone"
                  />
                  {formData.testemunhas.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removerTestemunha(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={adicionarTestemunha}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
            >
              <Plus size={20} /> Adicionar testemunha
            </button>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Descrição do Sinistro</label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Descreva os detalhes do sinistro..."
              rows="4"
            />
          </div>

          {/* Fotos e Documentos */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">📸 Fotos e Documentos</h2>
            <p className="text-gray-600 mb-4">Fotos adicionadas: {todasFotos.length} | Documentos: {documentosAnexos.length}</p>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-600">Funcionalidade de upload integrada com Google Drive</p>
              <p className="text-sm text-gray-500 mt-2">Total de anexos: {todasFotos.length + documentosAnexos.length}</p>
            </div>
          </div>

          {/* Botão Enviar */}
          <button
            type="submit"
            disabled={enviando}
            className={`w-full py-3 rounded-lg font-bold text-white text-lg transition-all ${
              enviando
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            {enviando ? '⏳ Enviando...' : '✅ Registrar Sinistro'}
          </button>
        </form>
      </div>
    </div>
  )
}
