'use client'

import { uploadImage } from "@/action";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  images: File[]
};
export const AddImage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();



  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const { images } = data;
    const formData = new FormData();
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }
    // Server action
    const resp = await uploadImage(formData);

    window.location.replace('/profile');

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col">
      <input
        type="file"
        className="p-2 border rounded-md bg-gray-200 w-full"
        accept="image/png, image/jpeg, image/avif"
        {...register('images', { required: true })}
      />
      <button className="bg-violet-500 p-2 rounded-lg">
        guardar
      </button>

    </form>
  )
}
