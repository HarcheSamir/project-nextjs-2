'use client'
import { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {RiImageAddFill} from 'react-icons/ri'
import Image from "next/image";

import axios from "axios";
import { FcRemoveImage} from "react-icons/fc";



export default function Page() {

  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const handleChangee = (event) => {
    setValue(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  return (






    <div className="w-full p-8 bh-full ">
   <Formik 
    initialValues={{
        images: [],
      }}
      
      validationSchema={Yup.object({
        images: Yup.array().min(1, "Please select at least one image"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();
        for (let i = 0; i < values.images.length; i++) {
          formData.append("pic", values.images[i]);
        }
        formData.append("status", "pending");
       formData.append("requestedBy", localStorage.getItem('id'));
        formData.append("about", values.about);
        formData.append("description",values.description);
        axios
          .post("https://server-social-benefits.vercel.app/uploadRequest", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
            setSubmitting(false);
          })
          .catch((error) => {
            console.log(error);
            setSubmitting(false);
          });
      }}
    
    >
      {({ values,errors, touched , isSubmitting, setFieldValue ,handleBlur ,handleChange }) => (









        <Form className="  relative gap-2 grid grid-cols-2  " >





















<div className="w-full">
<div className="grid gap-2 w-fit grid-cols-2">

{values.images && Array.from(values.images).map((image ,index) => (
<div key={index} className="w-40 relative h-40">
<Image key={image.name} fill src={URL.createObjectURL(image)} alt="selected" className="rounded object-cover" />
<div className="absolute -top-0 -right-0">
        <button type="button" onClick={() => {
          const newImages = [...values.images];
          newImages.splice(index, 1);
          setFieldValue("images", newImages);
        }} >
          <FcRemoveImage className="w-12 h-12 text-red-500" />
        </button>
      </div>
</div>
))}

<div className=" aspect-square w-40  rounded border-[3px]  border-zinc-400  relative">
<RiImageAddFill className="h-16  text-zinc-400 w-16 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
<input
id="images"
name="images"
type="file"
accept=".png, .jpg, .jpeg"
onChange={(event) => {
const files = event.currentTarget.files;
const fileArray = Array.from(files);
setFieldValue("images", fileArray);
}}
className="opacity-0 cursor-pointer  w-40 h-40 bg-red-900"
multiple
/>


</div>
</div>

<ErrorMessage name="images" component="span" className="text-red-500 text-xs error-message font-bold" />

<button type="submit" disabled={isSubmitting} className="bg-blue-500 w-20 h-10 text-white px-4 py-2 rounded">
  Submit
</button>
</div>
         
        </Form>
      )}
    </Formik>
    </div>
 
  );
};
