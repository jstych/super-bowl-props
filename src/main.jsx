import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HallOfFame from './components/HallOfFame.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/friends-family" replace />} />
        <Route path="/:group/hall-of-fame" element={<HallOfFame />} />
        <Route path="/:group" element={<App />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
