import { useState } from 'react'
import conecthusLogo from './assets/logo_conectus.png'
import salcompLogo from './assets/logo_salcomp.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://www.conecthus.org.br/" target="_blank">
          <img src={conecthusLogo} className="logo" alt="Vite logo"  />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={salcompLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>Gerenciamento de NPI</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <button onClick={() => setCount((count) => count + 1)}>
          Entrar
        </button>
      </div>
      <p className="read-the-docs">
      <a href="https://github.com/raquelConecthus/teste-inova" target="_blank">Link do repositorio</a>

      </p>
    </>
  )
}

export default App
