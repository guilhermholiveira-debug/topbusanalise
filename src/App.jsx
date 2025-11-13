import { useState } from 'react'
import FormularioSinistro from './components/FormularioSinistro'
import ListaSinistros from './components/ListaSinistros'

export default function App() {
  const [pagina, setPagina] = useState('formulario')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚌</span>
            <h1 className="text-2xl font-bold">TOPBUS Sinistros v2.0</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setPagina('formulario')}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${
                pagina === 'formulario'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'hover:bg-blue-700'
              }`}
            >
              📝 Novo Sinistro
            </button>
            <button
              onClick={() => setPagina('lista')}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${
                pagina === 'lista'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'hover:bg-blue-700'
              }`}
            >
              📊 Sinistros
            </button>
          </div>
        </div>
      </nav>

      {/* Conteúdo */}
      <div className="py-8">
        {pagina === 'formulario' ? (
          <FormularioSinistro />
        ) : (
          <ListaSinistros />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 TOPBUS Sinistros v2.0 | Desenvolvido para TOPBUS e BELO MONTE
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Sistema seguro | Dados protegidos | Google Apps Script + Sheets
          </p>
        </div>
      </footer>
    </div>
  )
}
