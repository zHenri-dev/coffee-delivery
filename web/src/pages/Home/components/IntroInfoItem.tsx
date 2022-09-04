import { ShoppingCart, Package, Timer, Coffee } from 'phosphor-react'

const icons = {
  shoppingCart: <ShoppingCart weight="fill" size={13} className="w-4 h-4" />,
  package: <Package weight="fill" size={13} className="w-4 h-4" />,
  timer: <Timer weight="fill" size={13} className="w-4 h-4" />,
  coffee: <Coffee weight="fill" size={13} className="w-4 h-4" />,
} as const

interface IntroInfoItemProps {
  text: string
  icon: keyof typeof icons
  iconColor: string
}

export function IntroInfoItem({ text, icon, iconColor }: IntroInfoItemProps) {
  return (
    <li className="flex gap-3 items-center">
      <span className={`p-2 ${iconColor} text-white rounded-full`}>
        {icons[icon]}
      </span>
      {text}
    </li>
  )
}
