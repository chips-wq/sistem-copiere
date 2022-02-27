import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import CategoryComponent from '../components/category'
import { Category } from '../interfaces/interfaces'
import CreateCategoryModal from '../components/CreateCategoryModal'
const Home: NextPage = () => {
  const [categories, setCategories] = useState<Array<Category>>([])
  const [showingCreateModal, setShowingCreateModal] = useState<boolean>(false)

  const reloadCategories = async () => {
    const categories = await axios.get<Array<Category>>('/api/categories')
    setCategories(categories.data)
  }

  useEffect(() => {
    reloadCategories()
  }, [])

  return (
    <>
      <Head>
        <title>Jos sistemul de invatamant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showingCreateModal && (
        <CreateCategoryModal
          handleModal={setShowingCreateModal}
          reloadCategories={reloadCategories}
        ></CreateCategoryModal>
      )}
      <div
        onClick={() => setShowingCreateModal(true)}
        className="fixed right-4 bottom-4 grid cursor-pointer place-items-center rounded-full bg-blue-600 p-2 text-xs"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32px"
          width="32px"
          viewBox="0 0 24 24"
          fill="#fff"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </div>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-2 text-center sm:px-20">
        <h1 className="text-4xl font-bold md:text-6xl">Sistem de copiere</h1>

        <p className="mt-3 text-2xl">Categorii</p>

        <div className="mt-6 grid max-w-4xl grid-cols-1 gap-4 sm:w-full md:grid-cols-2">
          {categories.map((category) => {
            return (
              <CategoryComponent
                id={category.id}
                key={category.id}
                name={category.name}
                description={category.description}
              />
            )
          })}
        </div>
      </main>
    </>
  )
}

export default Home
