import axios from 'axios'
import { ChangeEvent, EventHandler, FormEventHandler, useState } from 'react'
import ClientOnlyPortal from './ClientOnlyPortal'

interface props {
  handleModal: (showModal: boolean) => void
  reloadCategories: () => void
}
export default function CreateCategoryModal({
  handleModal,
  reloadCategories,
}: props) {
  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryDescription, setCategoryDescription] = useState<string>('')

  const handleSubmit: FormEventHandler = async (e: any) => {
    e.preventDefault()
    await axios.post('/api/categories', {
      name: categoryName,
      description: categoryDescription,
    })
    await reloadCategories()
    handleModal(false)
  }

  return (
    <>
      <ClientOnlyPortal selector="#modal">
        <div className="backdrop">
          <div className="modal">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <label>
                Nume Categorie:
                <input
                  className="rounded-sm border-2 border-blue-500 p-2"
                  onChange={(e: any) => setCategoryName(e.target.value)}
                  type="text"
                  name="categoryName"
                />
              </label>
              <label className="flex flex-col">
                Descriere categorie
                <textarea
                  className="rounded-sm border-2 border-blue-500 p-2"
                  onChange={(e: any) => setCategoryDescription(e.target.value)}
                ></textarea>
              </label>
              <input
                className="cursor-pointer self-center rounded-md border-2 bg-blue-500 p-2 text-white"
                type="submit"
                value="Submit"
              />
            </form>
            <button type="button" onClick={() => handleModal(false)}>
              Inchide
            </button>
          </div>
          <style jsx>{`
            :global(body) {
              overflow: hidden;
            }
            .backdrop {
              position: fixed;
              background-color: rgba(0, 0, 0, 0.7);
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
            }
            .modal {
              background-color: white;
              position: absolute;
              top: 10%;
              right: 10%;
              bottom: 10%;
              left: 10%;
              padding: 1em;
            }
          `}</style>
        </div>
      </ClientOnlyPortal>
    </>
  )
}
