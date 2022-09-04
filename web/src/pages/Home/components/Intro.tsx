import { IntroInfoItem } from './IntroInfoItem'

import introCoffeeUrl from '../../../assets/intro-coffee.svg'

export function Intro() {
  return (
    <div className="flex justify-center w-full bg-blur-background bg-center bg-no-repeat bg-cover">
      <div className="flex justify-between items-center w-[70rem] py-[5.75rem]">
        <div className="flex flex-col items-start">
          <div className="flex flex-col gap-4 w-[36.75rem]">
            <h1 className="font-cursive text-5xl font-extrabold text-gray-900">
              Encontre o café perfeito para qualquer hora do dia
            </h1>
            <h3 className="text-xl text-gray-800">
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </h3>
          </div>
          <ul className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-5 mt-[4.125rem] w-[35.5rem] text-gray-700">
            <IntroInfoItem
              text="Compra simples e segura"
              iconColor="bg-yellow-600"
              icon="shoppingCart"
            />
            <IntroInfoItem
              text="Embalagem mantém o café intacto"
              iconColor="bg-gray-700"
              icon="package"
            />
            <IntroInfoItem
              text="Entrega rápida e rastreada"
              iconColor="bg-yellow-400"
              icon="timer"
            />
            <IntroInfoItem
              text="O café chega fresquinho até você"
              iconColor="bg-purple-400"
              icon="coffee"
            />
          </ul>
        </div>
        <img
          src={introCoffeeUrl}
          alt="Imagem de um copo de café e alguns grãos de café ao fundo"
        />
      </div>
    </div>
  )
}
