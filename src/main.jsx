import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import CryptoContext from './CryptoContext.jsx'
import { HashRouter } from 'react-router-dom'
// import 'react-alice-carousel/lib/alice-carousel.css';

createRoot(document.getElementById('root')).render(
 <HashRouter>
    <CryptoContext>
    <App />
    </CryptoContext>,
 </HashRouter>
)
