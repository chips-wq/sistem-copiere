import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ClientOnlyPortal from './ClientOnlyPortal'
import LessonComponent from './lesson'

interface NewLessonInterface {
  categoryId: number
  reloadLectii: () => void
}
const NewLessonComponent = ({
  categoryId,
  reloadLectii,
}: NewLessonInterface) => {
  const [loading, setLoading] = useState(false)
  const [showingEditor, setShowingEditor] = useState<boolean>(false)
  const [markdown, setMarkdown] = useState<string>(
    '# Titlu\nLectia trebuie sa contina cel putin un paragraf si un titlu.'
  )
  const [stackEditor, setStackEditor] = useState<any>()

  const createLesson = async () => {
    await axios.post('/api/lessons', {
      secret: '1234',
      markdown: markdown,
      categoryId: categoryId,
    })
    reloadLectii()
    stackEditor.close()
  }
  const openEditor = () => {
    setShowingEditor(true)
    const Stackedit = require('stackedit-js')
    const stackedit = new Stackedit()

    setStackEditor(stackedit)
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
    })
  }
  return (
    <>
      {showingEditor && (
        <ClientOnlyPortal selector="#modal">
          <button
            type="button"
            className="modal rounded-md bg-blue-400 p-2 text-xl text-white"
            onClick={() => createLesson()}
          >
            Creeaza
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
      <a
        onClick={openEditor}
        className="mt-6 cursor-pointer rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
      >
        <h3 className="text-lg font-bold">Creeaza lectie &rarr;</h3>
        <p className="mt-4 text-sm">Creeaza o noua lectie</p>
      </a>
    </>
  )
}

export default NewLessonComponent
