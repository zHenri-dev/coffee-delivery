import { MapPin, ShoppingCart } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import coffeeDeliveryLogo from '../assets/logo.svg'
import { CartContext } from '../contexts/CartContext'

interface userLocation {
  city: string
  state: string
}

export function Header() {
  const [userLocation, setUserLocation] = useState<userLocation | null>(null)
  const { cartItems } = useContext(CartContext)

  useEffect(() => {
    fetch('http://ip-api.com/json/')
      .then((response) => response.json())
      .then((data) => {
        setUserLocation({
          city: data.city,
          state: data.region,
        })
      })
  }, [])

  return (
    <header className="max-w-[70rem] m-auto py-8 flex items-center justify-between">
      <Link to="/">
        <img src={coffeeDeliveryLogo} alt="Logo do Coffee Delivery" />
      </Link>

      <div className="flex gap-3 items-center justify-center text-sm">
        <button className="text-purple-600 flex gap-1 items-center p-2 bg-purple-200 rounded-md cursor-pointer">
          <MapPin className="text-purple-400" size={18} weight="fill" />
          {userLocation?.city}, {userLocation?.state}
        </button>

        <Link
          className="p-2 bg-yellow-200 rounded-md relative focus:shadow-yellow-600"
          to="/checkout"
        >
          <ShoppingCart className="text-yellow-600" size={18} weight="fill" />

          {cartItems && cartItems.length > 0 && (
            <span className="absolute -right-[8px] -top-[8px] py-[0.6rem] px-[0.4rem] text-white bg-yellow-600 rounded-full flex justify-center items-center leading-[0] text-xs font-bold">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
