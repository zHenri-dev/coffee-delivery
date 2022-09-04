import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Bank,
  CircleNotch,
  CreditCard,
  MapPinLine,
  Money,
} from 'phosphor-react'
import { CartItem } from './components/CartItem'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { priceFormatter } from '../../utils/formatter'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import * as RadioGroup from '@radix-ui/react-radio-group'
import * as zod from 'zod'

const checkoutInfoFormSchema = zod.object({
  cep: zod
    .string()
    .max(9)
    .refine((value) => /^\d{5}-?\d{3}$/.test(value)),
  street: zod.string().min(1),
  number: zod.number(),
  complement: zod.string().optional(),
  neighborhood: zod.string(),
  city: zod.string().min(1),
  state: zod.string().min(2),
  paymentType: zod.enum(['credit', 'debit', 'money']),
})

type checkoutInfoFormInputs = zod.infer<typeof checkoutInfoFormSchema>

export function Checkout() {
  document.title = 'Coffee Delivery | Checkout'

  const { cartItems, resetCart } = useContext(CartContext)
  const navigate = useNavigate()

  const totalPrices = cartItems.reduce(
    (acc, cartItem) => {
      acc.deliveryTax = 3.5
      acc.itemsTotal += cartItem.price * cartItem.amount
      acc.total = acc.itemsTotal + acc.deliveryTax

      return acc
    },
    {
      itemsTotal: 0,
      deliveryTax: 0,
      total: 0,
    },
  )

  const {
    control,
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<checkoutInfoFormInputs>({
    resolver: zodResolver(checkoutInfoFormSchema),
    defaultValues: {
      paymentType: 'credit',
    },
  })

  const cep = watch('cep')

  if (cep && /^\d{5}-?\d{3}$/.test(cep)) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) return
        if (data.logradouro) setValue('street', data.logradouro)
        if (data.bairro) setValue('neighborhood', data.bairro)
        if (data.localidade) setValue('city', data.localidade)
        if (data.uf) setValue('state', data.uf)
      })
  }

  async function handleConfirmOrder(data: checkoutInfoFormInputs) {
    await new Promise((resolve) => setTimeout(resolve, 1230))

    navigate(
      `/success?deliveryAt=${data.street}, ${data.number}&secondAddress=${data.neighborhood} - ${data.city}, ${data.state}&prediction=20 min - 30 min&paymentType=${data.paymentType}`,
    )
    reset()
    resetCart()

    toast.success('Pedido realizado com sucesso!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const inputDefaultStyle =
    'h-[2.625rem] rounded-[4px] bg-gray-300 p-3 border border-gray-400 focus:border-0 focus:shadow-yellow-600 text-sm text-gray-700 placeholder:text-gray-600'

  return (
    <div className="flex w-[70rem] m-auto mt-10 gap-8">
      <div className="flex gap-[0.9375rem] flex-col w-[40rem]">
        <h1 className="font-cursive font-bold text-lg text-gray-800">
          Complete seu pedido
        </h1>
        <div className="w-full gap-3 flex flex-col">
          <div className="bg-gray-200 rounded-md p-10 flex flex-col gap-8">
            <header className="flex justify-start gap-2">
              <MapPinLine size={22} color="#C47F17" />
              <div className="flex flex-col">
                <span className="text-gray-800">Endereço de Entrega</span>
                <span className="text-sm text-gray-700">
                  Informe o endereço onde deseja receber seu pedido
                </span>
              </div>
            </header>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="CEP"
                className={`${inputDefaultStyle} w-[12.5rem]`}
                required
                {...register('cep')}
              />
              <input
                type="text"
                className={`${inputDefaultStyle} w-full`}
                placeholder="Rua"
                required
                {...register('street')}
              />

              <div className="flex gap-3">
                <input
                  type="number"
                  className={`${inputDefaultStyle} w-[12.5rem]`}
                  placeholder="Número"
                  required
                  {...register('number', { valueAsNumber: true })}
                />

                <div className="flex w-full relative">
                  <input
                    type="text"
                    className={`${inputDefaultStyle} w-full`}
                    placeholder="Complemento"
                    {...register('complement')}
                  />

                  <span className="absolute top-[50%] -translate-y-[50%] right-[12px] italic text-gray-600 text-xs">
                    Opcional
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  className={`${inputDefaultStyle} w-[12.5rem]`}
                  placeholder="Bairro"
                  required
                  {...register('neighborhood')}
                />
                <input
                  type="text"
                  className={`${inputDefaultStyle} w-full`}
                  placeholder="Cidade"
                  required
                  {...register('city')}
                />
                <input
                  type="text"
                  className={`${inputDefaultStyle} w-[3.5rem]`}
                  maxLength={2}
                  placeholder="UF"
                  required
                  {...register('state')}
                />
              </div>
            </form>
          </div>
          <div className="bg-gray-200 rounded-md p-10 flex flex-col gap-8">
            <header className="flex justify-start gap-2">
              <MapPinLine size={22} className="text-purple-400" />
              <div className="flex flex-col">
                <span className="text-gray-800">Pagamento</span>
                <span className="text-sm text-gray-700">
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </span>
              </div>
            </header>
            <div>
              <Controller
                control={control}
                name="paymentType"
                render={({ field }) => {
                  return (
                    <RadioGroup.Root
                      className="flex gap-3 text-gray-700 text-xs"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <RadioGroup.Item
                        value="credit"
                        className="w-full uppercase flex p-4 bg-gray-400 rounded-md items-center gap-3 transition-colors border hover:bg-gray-500 radix-state-checked:bg-purple-200 radix-state-checked:border-purple-400"
                      >
                        <CreditCard size={16} className="text-purple-400" />
                        Cartão de Crédito
                      </RadioGroup.Item>

                      <RadioGroup.Item
                        value="debit"
                        className="w-full uppercase flex p-4 bg-gray-400 rounded-md items-center gap-3 transition-colors border hover:bg-gray-500 radix-state-checked:bg-purple-200 radix-state-checked:border-purple-400"
                      >
                        <Bank size={16} className="text-purple-400" />
                        Cartão de Débito
                      </RadioGroup.Item>

                      <RadioGroup.Item
                        value="money"
                        className="w-full uppercase flex p-4 bg-gray-400 rounded-md items-center gap-3 transition-colors border hover:bg-gray-500 radix-state-checked:bg-purple-200 radix-state-checked:border-purple-400"
                      >
                        <Money size={16} className="text-purple-400" />
                        Dinheiro
                      </RadioGroup.Item>
                    </RadioGroup.Root>
                  )
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-[28rem] flex flex-col gap-3">
        <h1 className="font-cursive font-bold text-lg text-gray-800">
          Cafés selecionados
        </h1>

        <div className="flex flex-col w-full p-10 bg-gray-300 rounded-md rounded-tr-[44px] rounded-bl-[44px] gap-6">
          {cartItems.length > 0 ? (
            cartItems.map((cartItem) => {
              return (
                <CartItem
                  key={`${cartItem.name}-cartItem`}
                  coffeeName={cartItem.name}
                  imageURL={cartItem.imageURL}
                  price={cartItem.price}
                  amount={cartItem.amount}
                />
              )
            })
          ) : (
            <div className="w-full flex items-center justify-center p-2 text-gray-800 text-lg">
              <span>
                Seu carrinho está vazio 😭, clique{' '}
                <Link to="/" className="text-blue-700 hover:underline">
                  aqui
                </Link>{' '}
                para ser redirecionado até a página principal
              </span>
            </div>
          )}

          {cartItems.length > 0 && (
            <>
              <div className="flex flex-col gap-3 w-full text-gray-700">
                <div className="flex justify-between">
                  <span className="text-sm">Total de itens</span>
                  <span>{priceFormatter.format(totalPrices.itemsTotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm">Entrega</span>
                  <span>{priceFormatter.format(totalPrices.deliveryTax)}</span>
                </div>

                <div className="flex justify-between text-gray-800 text-xl font-bold">
                  <span>Total</span>
                  <span>{priceFormatter.format(totalPrices.total)}</span>
                </div>
              </div>

              <button
                className="flex items-center justify-center uppercase py-3 w-full bg-yellow-400 text-white rounded-md transition-colors font-bold text-sm hover:bg-yellow-600 focus:shadow-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-400"
                onClick={handleSubmit(handleConfirmOrder)}
                disabled={isSubmitting || cartItems.length < 1}
              >
                {isSubmitting ? (
                  <CircleNotch
                    weight="bold"
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  'Confirmar Pedido'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
