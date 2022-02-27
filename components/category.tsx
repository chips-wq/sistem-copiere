import Link from 'next/link'

let lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
import { Category } from '../interfaces/interfaces'
const CategoryComponent = ({ id, name, description = lorem }: Category) => {
  return (
    <Link href={`/category/${id}`}>
      <a className="rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
        <h3 className="text-2xl font-bold">{name} &rarr;</h3>
        <p className="mt-4 text-xl">{description}</p>
      </a>
    </Link>
  )
}

export default CategoryComponent
