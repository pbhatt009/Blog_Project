import React from 'react'
import { Editor } from  '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function Rte({name,control,label,defaultValue=""}){
    // console.log(defaultValue);
    // console.log(control);
    return(
   <div className='w-fulll'>
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
    <Controller
     name={name||"content"}
     control={control}
     render={({field:{onChange}})=>(
        <Editor
        initialValue={defaultValue}
        apiKey='awb7ms2y9httyife9bgr5knwqthtuptk4fojaec8yufs147x'
        init={{
            initialValue:defaultValue,
           height:500,
            menubar:true,
            plugins:['link','image','media'],
            toolbar:'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style:'body{font-family:Inter,sans-serif;font-size:16px}'
        }}
        onEditorChange={onChange}
        
        />
     )}
    />
   </div>

    )
}