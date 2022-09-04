import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { Router } from './Router'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import './styles/global.css'

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>

      <ToastContainer />
    </CartProvider>
  )
}
