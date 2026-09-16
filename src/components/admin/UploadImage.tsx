import type { UploadImage } from '@/types'
import { actions } from 'astro:actions'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {
  label: string
}

export default function UploadImage({ label }: Props) {
  // 1. Tipado explícito de los estados en React
  const [image, setImage] = useState()
  const [errorMessage, setErrorMessage] = useState(null)

  const maxFiles = 1
  
  const onDrop = useCallback(async (files: File[]) => {
    setErrorMessage(null)
    
    if (files.length === 0) return

    const formData = new FormData()
    files.forEach(file => {
      formData.append('file', file)
    })

    const { data, error } = await actions.upload.uploadImage(formData)

    if (error) {
      console.error("Error al subir:", error)
      setErrorMessage(error.message || 'Error al subir la imagen')
      return
    }

    if (data) {
      setImage(data)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles
  })

  return (
    <>
    <div className="col-span-full">
  <label
    htmlFor="cover-photo"
    className="block text-sm/6 font-medium text-gray-900">{label}
  </label>
  <div {...getRootProps({
    className: `
            mt-2 py-20 outline-1 outline-dashed -outline-offset-1 outline-gray-300 text-center 
            ${isDragActive ? 'outline-gray-900 text-gray-900 bg-gray-200 ' : 'border-gray-400 text-gray-400 bg-white'} 
            ${isDragReject ? 'border-none cursor-not-allowed' : ''}
      `})}>
    <svg
      className="mx-auto size-12 text-gray-600"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      data-slot="icon"
    >
      <path
        fillRule="evenodd"
        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
        clipRule="evenodd"
      ></path>
    </svg>
    <input {...getInputProps()} />
    {isDragAccept && (<p>Suelta la Imagen</p>)}
    {isDragReject && (<p>Archivo no válido</p>)}
    {!isDragActive && (<p className='text-gray-600'> <span className=''>Arrastra </span> y suelta una imagen aquí</p>)}
  </div>
</div>
{image && (
  <div className='py-5 space-y-3  sm:col-span-3'>
    <p className='font-bold'>Imagen Producto:</p>
    <img src={image.source_url} alt="Imagen Publicada" className='W-92' />
  </div>
)}

<input type='hidden' name='feature_media' value={image?.id} /> 
</>
  )
}
