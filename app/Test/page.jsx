'use client'
import { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Page() {
  return (
    <div className="flex justify-center items-center sm:py-16 flex-col">
      <Formik
        initialValues={{ description: "" }}
        validationSchema={Yup.object({
          description: Yup.string().required(),
        })}
        onSubmit={(values) => {}}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          handleBlur,
          handleChange,
        }) => (
          <Form id="my-form" className="w-full">

 <div className="flex  flex-col">
   </div>
          



   <div className="flex flex-col mt-5 ml-2 mr-2 mb-8 col-span-2 ">
<p
          htmlFor="title"
          className="block mb-4  font-bahnschrift font-bold text-[#0B59A1] mt-8 text-26px"
          >Description:</p>
<div className="relative  flex w-full flex-col  ">


<div className="relative  break-all w-[20%] py-2" >
  <p className="opacity-0 w-full text-sm">{values.description}</p>

<div className="w-full h-full absolute top-0">

<div className="relative h-full  flex flex-col w-full ">

<Field component="textarea"  onChange={handleChange} value={values.description}   name="description"   onBlur={handleBlur} className={`block h-full min-h-[2.5rem] resize-none  z-50 pt-1 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " />
<label  className="pl-2   peer-focus:font-medium absolute text-sm text-gray-500  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">More Details...</label>
<ErrorMessage className="mt-4 cursor-default text-red-500 text-xs error-message font-bold" name="description" component="span"/>

</div>

</div>


</div>






  </div>

</div>


          
          </Form>
        )}
      </Formik>
    </div>
  );
};
