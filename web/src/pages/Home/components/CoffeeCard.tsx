import { priceFormatter } from '../../../utils/formatter'
import { CoffeeCardForm } from './CoffeCardForm'

interface CoffeeCardProps {
  name: string
  tags: string[]
  imageURL: string
  description: string
  price: number
}

export function CoffeeCard({
  name,
  tags,
  imageURL,
  description,
  price,
}: CoffeeCardProps) {
  return (
    <div className="w-64 bg-gray-200 rounded-md rounded-tr-[36px] rounded-bl-[36px] flex flex-col items-center px-5">
      <img
        src={imageURL}
        alt=""
        className="mt-[-1.25rem] w-[7.5rem] h-[7.5rem]"
      />
      <div className="mt-3 flex justify-center flex-wrap gap-1 leading-4">
        {tags.map((tag) => {
          return (
            <span
              key={`${tag}-${name}`.replace(' ', '-').toLowerCase()}
              className="py-1 px-2 text-yellow-600 bg-yellow-200 text-[10px] font-bold uppercase rounded-full"
            >
              {tag}
            </span>
          )
        })}
      </div>
      <div className="flex flex-col gap-2 justify-center items-center mt-4">
        <span className="text-xl font-cursive font-bold text-gray-800">
          {name}
        </span>
        <span className="text-center text-gray-600 text-sm">{description}</span>
      </div>
      <div className="mt-8 text-gray-700 flex gap-[1.375rem] items-center mb-5">
        <span className="text-sm text-center">
          R${' '}
          <strong className="font-cursive font-extrabold text-2xl">
            {priceFormatter.format(price).replace('R$ ', '')}
          </strong>
        </span>
        <CoffeeCardForm name={name} imageURL={imageURL} price={price} />
      </div>
    </div>
  )
}
