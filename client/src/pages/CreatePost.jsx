import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {useNavigate} from 'react-router-dom'

export default function CreatePost() {
  const [file, setfile] = useState(null);
  const [imageUploadError, setimageUploadError] = useState(null);
  const [imageUploadProgress, setimageUploadProgress] = useState(null);
  const [formData, setformData] = useState({});
  const [publish, setpublish] = useState(null);
  const navigate =useNavigate()
  const imageUpload = async () => {
    if (!file) {
      setimageUploadError('Please upload a image')
      return;
    }
    try {
      setimageUploadError(null)
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on('state_changed', 
        (snapsort) => {
          const progress = (snapsort.bytesTransferred / snapsort.totalBytes) * 100
          setimageUploadProgress(progress.toFixed(0))
        },
        (error) => {
          setimageUploadError('Image upload Error') 
          setimageUploadProgress(null)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setimageUploadError(null)
            setimageUploadProgress(null)
            setformData({ ...formData, image: downloadURL })
          })
        }
      )
      
    } catch (error) {
      setimageUploadError(error)
    }
  }

  const postSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/post/create-post', {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      const data =await res.json()
      if (!res.ok) {
        setpublish(data.message)
      } else {
        setpublish(null)
        navigate(`/post/${data.slug}`)
        
      }
    } catch (error) {
      setpublish("Something is Wrong")
    }
  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center font-semibold text-3xl my-7'>Create Post</h1>
      <form onSubmit={postSubmit} className='flex flex-col gap-4 '>
        <div className="flex flex-col gap-4 sm:flex-row">
          <TextInput onChange={(e) => setformData({ ...formData, title: e.target.value })} type='text' placeholder='Title' required id='title' className='flex-1'/>
          <Select onChange={(e)=>setformData({...formData,category:e.target.value})}>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="wordpress">WordPress</option>
            <option value="laravel">Laravel</option>
            <option value="spotify">Spotify</option>
          </Select>
        </div>
        <div className=" gap-4 p-3 flex items-center justify-between border-4 border-teal-700 border-dotted">
          <FileInput type='file' accept='image/*' onChange={(e)=>setfile(e.target.files[0])}/>
          <Button
            onClick={imageUpload}
            type='button'
            size='sm'
            gradientDuoTone='purpleToBlue'
            outline
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-12 h-12">
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress}%`} />
              </div>
            ):"Upload Image"}
          </Button>
        </div>
        {imageUploadError && (
          <Alert color='failure'>
            {imageUploadError}
          </Alert>
        )}
        {
          formData.image && (
            <img
              src={formData.image}
              alt=""
              className='w-full h-72 object-cover'
            />
          )
        }

        <ReactQuill onChange={(value)=>setformData({...formData,content:value})} required className='mb-12 h-72' theme='snow' placeholder='write somethings...'/>
        <Button  gradientDuoTone='purpleToPink' type='submit'>Publish</Button>
      </form>
      {publish && (
        <Alert color='failure' className='mt-5'>{publish}</Alert>
      )}
    </div>
  )
}
