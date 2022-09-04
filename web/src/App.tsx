import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { Router } from './Router'

import './styles/global.css'

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CartProvider>
  )
}
