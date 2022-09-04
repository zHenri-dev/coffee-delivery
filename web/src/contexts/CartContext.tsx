import { createContext, ReactNode, useEffect, useReducer } from 'react'
import {
  removeCartItemAction,
  resetCartAction,
  updateCartItemAction,
} from '../reducers/cart/actions'
import { cartReducer } from '../reducers/cart/reducer'

export interface CartItem {
  name: string
  imageURL: string
  price: number
  amount: number
}

interface CartContextType {
  cartItems: CartItem[]
  updateCartItem: (cartItem: CartItem) => Promise<void>
  removeCartItem: (coffeeName: string) => Promise<void>
  resetCart: () => Promise<void>
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartContextProviderProps) {
  const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
    const storedStateAsJSON = localStorage.getItem(
      '@coffee-delivery:cart-items-state-1.0.0',
    )

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    } else return []
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cartItems)

    localStorage.setItem('@coffee-delivery:cart-items-state-1.0.0', stateJSON)
  }, [cartItems])

  async function updateCartItem(cartItem: CartItem) {
    dispatch(updateCartItemAction(cartItem))
  }

  async function removeCartItem(coffeeName: string) {
    dispatch(removeCartItemAction(coffeeName))
  }

  async function resetCart() {
    dispatch(resetCartAction())
  }

  return (
    <CartContext.Provider
      value={{ cartItems, updateCartItem, removeCartItem, resetCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
