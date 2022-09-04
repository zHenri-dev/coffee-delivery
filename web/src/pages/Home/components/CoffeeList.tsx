import { useEffect, useState } from 'react'
import { api } from '../../../lib/axios'
import { CoffeeCard } from './CoffeeCard'

interface Coffee {
  name: string
  tags: string[]
  imageURL: string
  description: string
  price: number
}

export function CoffeeList() {
  const [coffees, setCoffees] = useState<Coffee[]>([])

  useEffect(() => {
    api.get('/coffees').then((response) => setCoffees(response.data))
  }, [])

  return (
    <main className="max-w-[70rem] flex flex-col justify-center items-start mb-40 mt-8 mx-auto">
      <h1 className="font-cursive font-extrabold text-[32px] text-gray-800">
        Nossos cafés
      </h1>
      <ul className="flex flex-wrap mt-[3.375rem] gap-x-8 gap-y-10 items-start">
        {coffees.map((coffee) => {
          return (
            <CoffeeCard
              key={coffee.name.replace(' ', '-').toLowerCase()}
              name={coffee.name}
              tags={coffee.tags}
              imageURL={coffee.imageURL}
              description={coffee.description}
              price={coffee.price}
            />
          )
        })}
      </ul>
    </main>
  )
}
