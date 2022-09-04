import { FormEvent, useContext, useState } from 'react'
import { Minus, Plus, ShoppingCartSimple } from 'phosphor-react'
import { CartContext } from '../../../contexts/CartContext'

interface CoffeeCardFormProps {
  name: string
  imageURL: string
  price: number
}

export function CoffeeCardForm({ name, imageURL, price }: CoffeeCardFormProps) {
  const [cartAmount, setCartAmount] = useState(1)
  const { updateCartItem } = useContext(CartContext)

  function handleChangeCartAmount(event: FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) return

    let value = parseInt(event.currentTarget.value)
    if (value > 99) value = 99
    if (value < 0) value = 1

    setCartAmount(value)
  }

  function handleIncrementCartAmount() {
    if (cartAmount < 99) {
      setCartAmount((state) => state + 1)
    }
  }

  function handleDecrementCartAmount() {
    if (cartAmount > 1) {
      setCartAmount((state) => state - 1)
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    updateCartItem({
      name,
      imageURL,
      price,
      amount: cartAmount,
    })
  }

  return (
    <form
      className="flex items-center gap-2 min-w-[4.5rem] h-[2.375rem]"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between p-2 rounded-md bg-gray-400 gap-1 h-[2.375rem]">
        <button
          type="button"
          onClick={handleDecrementCartAmount}
          className="focus:shadow-none text-purple-400 hover:text-purple-600 focus:text-purple-600 transition-colors"
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
          className="focus:shadow-none text-purple-400 hover:text-purple-600 focus:text-purple-600 transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>
      <button
        type="submit"
        className="p-2 bg-purple-600 text-gray-200 rounded-md hover:bg-purple-400 transition-colors"
      >
        <ShoppingCartSimple
          size={18}
          weight="fill"
          className="w-[1.375rem] h-[1.375rem]"
        />
      </button>
    </form>
  )
}
