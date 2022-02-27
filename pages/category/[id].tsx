import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import LessonComponent from '../../components/lesson'
import NewLessonComponent from '../../components/NewLesson'
import { Category, Lesson } from '../../interfaces/interfaces'

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get<Array<Category>>(
    'http://localhost:3000/api/categories'
  )
  const paths = response.data.map((category) => {
    return {
      params: { id: category.id.toString() },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const id = context.params.id
  return {
    props: {
      id: id,
    },
  }
}

const CategoryPage: any = ({ id }: any) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [category, setCategory] = useState<Category>()
  const [lessons, setLessons] = useState<Array<Lesson>>([])
  const [markdown, setMarkdown] = useState()

  const reloadLectii = async () => {
    setLoading(true)
    const lessons = await axios.get(`/api/categories/${id}/lessons`)
    setLessons(lessons.data)
    setLoading(false)
  }
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const category = await axios.get<Category>(`/api/categories/${id}`)
      setCategory(category.data)
      await reloadLectii()
    }
    fetchData()
  }, [])

  return loading ? (
    <div className="grid h-screen w-screen place-items-center">
      <h1 className="text-6xl font-bold">Se incarca...</h1>{' '}
    </div>
  ) : category ? (
    <>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-2 text-center sm:px-5">
        <h1 className="text-2xl font-bold">Categoria {category.name}</h1>

        <p className="mt-3 text-xl">Lectii</p>
        <div className="mt-4 mb-4 grid grid-cols-1 gap-3 sm:w-full md:grid-cols-2 xl:grid-cols-4 xl:px-11">
          {lessons.map((lesson) => {
            return (
              <LessonComponent
                key={lesson.id}
                lesson={{
                  id: lesson.id,
                  title: lesson.title,
                  description: lesson.description,
                  markdown: null,
                  categoryId: lesson.categoryId,
                }}
                reloadLectii={reloadLectii}
              ></LessonComponent>
            )
          })}
          <NewLessonComponent
            reloadLectii={reloadLectii}
            categoryId={id}
          ></NewLessonComponent>
        </div>
      </main>
    </>
  ) : null
}

export default CategoryPage
