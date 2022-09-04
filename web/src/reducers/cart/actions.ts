import { CartItem } from '../../contexts/CartContext'

export enum ActionTypes {
  UPDATE_CART_ITEM = 'UPDATE_CART_ITEM',
  REMOVE_CART_ITEM = 'REMOVE_CART_ITEM',
  RESET_CART = 'RESET_CART',
}

export function updateCartItemAction(cartItem: CartItem) {
  return {
    type: ActionTypes.UPDATE_CART_ITEM,
    payload: {
      cartItem,
    },
  }
}

export function removeCartItemAction(coffeeName: string) {
  return {
    type: ActionTypes.REMOVE_CART_ITEM,
    payload: {
      coffeeName,
    },
  }
}

export function resetCartAction() {
  return {
    type: ActionTypes.RESET_CART,
  }
}
