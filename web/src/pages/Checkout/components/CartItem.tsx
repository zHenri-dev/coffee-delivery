import { FormEvent, useContext, useState } from 'react'
import { Minus, Plus, Trash } from 'phosphor-react'
import { priceFormatter } from '../../../utils/formatter'
import { CartContext } from '../../../contexts/CartContext'
import { toast } from 'react-toastify'

interface CartItemProps {
  coffeeName: string
  imageURL: string
  price: number
  amount: number
}

export function CartItem({
  coffeeName,
  imageURL,
  price,
  amount,
}: CartItemProps) {
  const { updateCartItem, removeCartItem } = useContext(CartContext)
  const [cartAmount, setCartAmount] = useState(amount)

  function handleChangeCartAmount(event: FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) return

    let value = parseInt(event.currentTarget.value)
    if (value > 99) value = 99
    if (value <= 0) value = 1

    setCartAmount(value)
    handleUpdateCartItem(value)
  }

  function handleUpdateCartItem(value: number) {
    updateCartItem({
      name: coffeeName,
      imageURL,
      price,
      amount: value,
    })
  }

  function handleIncrementCartAmount() {
    if (cartAmount < 99) {
      setCartAmount((state) => state + 1)
      handleUpdateCartItem(cartAmount + 1)
    }
  }

  function handleDecrementCartAmount() {
    if (cartAmount > 1) {
      setCartAmount((state) => state - 1)
      handleUpdateCartItem(cartAmount - 1)
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    removeCartItem(coffeeName)

    toast.error('Café removido do seu carrinho!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <div className="flex pb-6 border-b border-gray-400 gap-[3.125rem]">
      <div className="flex gap-5">
        <img src={imageURL} alt="" className="w-16 h-16" />
        <div className="flex flex-col gap-2">
          <span className="text-gray-800">{coffeeName}</span>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex justify-between p-2 rounded-md bg-gray-400 gap-1 w-[4.5rem]">
              <button
                type="button"
                onClick={handleDecrementCartAmount}
                className="focus:shadow-none text-purple-400 hover:text-purple-600 transition-colors"
              >
                <Minus size={14} />
              </button>
              <input
                type="number"
                min={1}
                max={99}
                onChange={handleChangeCartAmount}
                value={cartAmount}
                className="w-5 h-full outline-none text-center bg-transparent text-gray-900 focus:shadow-none border-b-2 border-b-transparent focus:border-b-purple-400"
              />
              <button
                type="button"
                onClick={handleIncrementCartAmount}
                className="focus:shadow-none text-purple-400 hover:text-purple-600 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              type="submit"
              className="flex gap-1 p-2 items-center text-gray-700 rounded-md bg-gray-400 transition-colors hover:bg-gray-500 hover:text-gray-800 uppercase group text-xs leading-[0]"
            >
              <Trash
                size={16}
                className="text-purple-400 group-hover:text-purple-600"
              />
              Remover
            </button>
          </form>
        </div>
      </div>

      <span className="text-gray-700 font-bold">
        {priceFormatter.format(price)}
      </span>
    </div>
  )
}
