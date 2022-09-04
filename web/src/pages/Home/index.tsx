import { CoffeeList } from './components/CoffeeList'
import { Intro } from './components/Intro'

export function Home() {
  document.title = 'Coffee Delivery | Home'

  return (
    <>
      <Intro />
      <CoffeeList />
    </>
  )
}
