import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { OptionProvider } from './AppProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <OptionProvider>
    <App />
  </OptionProvider>
)
