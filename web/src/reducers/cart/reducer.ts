import { CartItem } from '../../contexts/CartContext'
import { ActionTypes } from './actions'

export function cartReducer(state: CartItem[], action: any) {
  switch (action.type) {
    case ActionTypes.UPDATE_CART_ITEM:
      if (!state.find((item) => item.name === action.payload.cartItem.name)) {
        return [...state, action.payload.cartItem]
      } else {
        return state.map((item) => {
          if (item.name === action.payload.cartItem.name) {
            item.amount = action.payload.cartItem.amount
          }

          return item
        })
      }
    case ActionTypes.REMOVE_CART_ITEM: {
      return state.filter((item) => item.name !== action.payload.coffeeName)
    }
    case ActionTypes.RESET_CART: {
      return []
    }
    default:
      return state
  }
}
