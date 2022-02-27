import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ClientOnlyPortal({ children, selector }: any): any {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? ref.current && createPortal(children, ref.current) : null
}
