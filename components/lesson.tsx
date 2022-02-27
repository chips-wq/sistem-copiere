import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Lesson } from '../interfaces/interfaces'
import ClientOnlyPortal from './ClientOnlyPortal'

interface LessonEditorComponent {
  lesson: Lesson
  reloadLectii: () => void
}
const LessonComponent = ({ lesson, reloadLectii }: LessonEditorComponent) => {
  const {
    id,
    title,
    description,
    markdown: initialMarkdown,
    categoryId,
  } = lesson
  const [loading, setLoading] = useState(false)
  const [showingEditor, setShowingEditor] = useState<boolean>(false)
  const [markdown, setMarkdown] = useState<string>()
  useEffect(() => {
    const fetchData = async () => {
      const lesson = await axios.get<Lesson>(`/api/lessons/${id}`)

      setLoading(false)
      if (lesson.data.markdown) {
        setMarkdown(lesson.data.markdown)
      }
    }
    fetchData()
  }, [])
  const save = async () => {
    await axios.put(`/api/lessons/${id}`, {
      markdown: markdown,
    })
  }
  const openEditor = () => {
    setShowingEditor(true)
    const Stackedit = require('stackedit-js')
    const stackedit = new Stackedit()

    // Open the iframe
    stackedit.openFile({
      name: 'Filename', // with an optional filename
      content: {
        text: markdown, // and the Markdown content.
      },
    })

    stackedit.on('fileChange', (file: any) => {
      setMarkdown(file.content.text)
    })

    stackedit.on('close', () => {
      setShowingEditor(false)
      reloadLectii()
    })
  }
  return (
    <>
      {showingEditor && (
        <ClientOnlyPortal selector="#modal">
          <button
            type="button"
            className="modal rounded-md bg-blue-400 p-2 text-xl text-white"
            onClick={() => save()}
          >
            Salveaza
          </button>

          <style jsx>{`
            :global(body) {
              overflow: hidden;
            }
            .modal {
              z-index: 99999999;
              position: fixed;
              bottom: 10px;
              left: 10px;
            }
          `}</style>
        </ClientOnlyPortal>
      )}
      <div className="relative cursor-pointer rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
        <div className="absolute top-1 right-1 flex gap-3">
          <div onClick={openEditor}>Edit</div>
          <div>
            <a href={`/api/simple/${id}`} target="_blank">
              Simple
            </a>
          </div>
        </div>

        <h3 className="text-lg font-bold">{title} &rarr;</h3>
        <p className="mt-4 break-words text-sm">{description}</p>
      </div>
    </>
  )
}

export default LessonComponent
