import { CurrencyDollar, MapPin, Timer } from 'phosphor-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import successManImg from '../../assets/success-man.svg'

import './styles.css'

export function Success() {
  document.title = 'Coffee Delivery | Success'

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const deliveryAt = searchParams.get('deliveryAt')
  const secondAddress = searchParams.get('secondAddress')
  const prediction = searchParams.get('prediction')
  let paymentType = searchParams.get('paymentType')

  switch (paymentType) {
    case 'credit':
      paymentType = 'Cartão de Crédito'
      break
    case 'debit':
      paymentType = 'Cartão de Débito'
      break
    case 'money':
      paymentType = 'Dinheiro'
      break
  }

  if (!deliveryAt || !secondAddress || !prediction || !paymentType) {
    navigate('/')
  }

  return (
    <div className="mt-20 w-[70rem] m-auto flex gap-[6.25rem]">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <span className="text-yellow-600 font-cursive font-extrabold text-[32px]">
            Uhu! Pedido confirmado
          </span>
          <span className="text-gray-800 text-xl">
            Agora é só aguardar que logo o café chegará até você
          </span>
        </div>

        <div className="flex flex-col p-10 gap-8 rounded-md rounded-tr-[36px] rounded-bl-[36px] relative border-1 border-transparent bg-gray-100 linear-gradient-border">
          <div className="flex gap-3 items-center text-gray-700">
            <span className="p-2 bg-purple-400 text-white rounded-full w-8 h-8">
              <MapPin weight="fill" size={16} />
            </span>

            <div className="flex flex-col">
              <span>
                Entrega em <strong>{deliveryAt}</strong>
              </span>
              <span>{secondAddress}</span>
            </div>
          </div>

          <div className="flex gap-3 items-center text-gray-700">
            <span className="p-2 bg-yellow-400 text-white rounded-full w-8 h-8">
              <Timer weight="fill" size={16} />
            </span>

            <div className="flex flex-col">
              <span>Previsão de entrega</span>
              <strong>{prediction}</strong>
            </div>
          </div>

          <div className="flex gap-3 items-center text-gray-700">
            <span className="flex justify-center p-2 bg-yellow-600 text-white rounded-full w-8 h-8">
              <CurrencyDollar weight="fill" size={16} />
            </span>

            <div className="flex flex-col">
              <span>Pagamento de entrega</span>
              <strong>{paymentType}</strong>
            </div>
          </div>
        </div>
      </div>

      <img
        src={successManImg}
        alt="Homem de moto em movimento indo entregar seu pedido"
      />
    </div>
  )
}
