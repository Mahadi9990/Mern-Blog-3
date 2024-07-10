import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center font-semibold text-3xl my-7'>Create Post</h1>
      <form className='flex flex-col gap-4 '>
        <div className="flex flex-col gap-4 sm:flex-row">
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javaScript">JavaScript</option>
            <option value="wordPress">WordPress</option>
            <option value="laravel">Laravel</option>
            <option value="spotify">Spotify</option>
          </Select>
        </div>
        <div className=" gap-4 p-3 flex items-center justify-between border-4 border-teal-700 border-dotted">
          <FileInput type='file' accept='image/*' />
          <Button type='button' size='sm' gradientDuoTone='purpleToBlue' outline>Upload image</Button>
        </div>
        <ReactQuill required className='mb-12 h-72' theme='snow' placeholder='write somethings...'/>
        <Button gradientDuoTone='purpleToPink' type='submit'>Publish</Button>
      </form>
    </div>
  )
}
