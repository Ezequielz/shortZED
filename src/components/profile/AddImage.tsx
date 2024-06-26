'use client'

import { setImage } from "@/action";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";

type FormInputs = {
  images: File[]
};
export const AddImage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { register, formState: { errors, isSubmitting }, watch, getValues } = useForm<FormInputs>();
  const [loading, setLoading] = useState(false)
  useEffect(() => {

    const watchImages = watch((data: { images?: (File | undefined)[] }) => {
      setLoading(true)
      // console.log(data)
      const { images } = data;
      // console.log(images)
      const formData = new FormData();
      if (images !== undefined) {

        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]!)
        }

        const saveImageToCloud = async () => {
          const { ok } = await setImage(formData);
          if (!ok) return;
          return ok
        }

        saveImageToCloud()
          .then(res => {
            console.log(res)
            setLoading(false)
          })
          // .then(res => window.location.replace('/profile'))
          .catch(err => setErrorMessage(err.message))
      }
    })

    return () => watchImages.unsubscribe()

  }, [watch])

  if (loading) return <p className="text-neutral-900">Cargando imagen...</p>

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col absolute top-1 right-1 hover:scale-105">
      <input
        type="file"
        id="fileInput"
        className="p-2 border rounded-md bg-neutral-800 w-full hidden"
        accept="image/png, image/jpeg, image/avif"
        {...register('images', { required: true })}
      />
      <label htmlFor="fileInput">
        <FaRegEdit size={30} className="text-blue-500 cursor-pointer bg-slate-100 rounded-full p-1"/>
      </label>

      {/* <button
        disabled={isSubmitting}
        className="bg-violet-500 p-2 rounded-lg">
        {isSubmitting ? 'Guardando imagen...' : 'Guardar'}
      </button> */}

    </form>
  )
}
