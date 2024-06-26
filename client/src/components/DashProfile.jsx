import { useSelector } from 'react-redux'
import {Alert, Button, TextInput} from 'flowbite-react'
import { useState, useRef, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user)
  const [imageFile, setimageFile] = useState(null);
  const [imgaeFileUrl, setimgaeFileUrl] = useState(null);
  const [imageFileUploadError, setimageFileUploadError] = useState(null);
  const [imageFileUploadPrograss, setimageFileUploadPrograss] = useState(null);
  console.log(imageFile,imageFileUploadError,imageFileUploadPrograss,imgaeFileUrl)
  const filePickerRef =useRef()
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setimageFile(file)
      setimgaeFileUrl(URL.createObjectURL(file))
    }
  }
  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])
  
  const uploadImage = async () => {
    // allow read;
    // allow write: if
    // request.resource.size < 2 * 1024 * 1024 &&
    // request.resource.contentType.matches('image/.*')
    setimageFileUploadError(null)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on('state_changed',
      (snapsort) => {
        setimageFileUploadError(null)
        const porgress = (snapsort.bytesTransferred / snapsort.totalBytes) * 100
        setimageFileUploadPrograss(porgress.toFixed(0))
      },
      (error) => {
        setimageFileUploadError("conn't upload Image file must be 2mb")
        setimageFileUploadPrograss(null)
        setimageFile(null)
        setimgaeFileUrl(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimgaeFileUrl(downloadURL)
          setimageFileUploadPrograss(null)
        })
      }
    )
  }

  
  
  return (
      <div className='mx-auto'>
          <h1 className='text-center p-4 font-bold'>Profile</h1>
      <form className='flex flex-col gap-3 md:w-[500px] w-[300px]'>
        <input type="file" accept='image/*' onChange={handleImageChange} hidden ref={filePickerRef}/>
        <div className="relative w-32 h-32 self-center cursor-pointer" onClick={()=>filePickerRef.current.click()}>
          {imageFileUploadPrograss && (
            <CircularProgressbar
              value={imageFileUploadPrograss || 0}
              text={`${imageFileUploadPrograss}`}
              strokeWidth={5}
              styles={{
                root: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                },
                path: {
                  stroke:`rgba(62,152,199,${imageFileUploadPrograss /100})`
                }
              }}
            />
          )}
          <img src={imgaeFileUrl || currentUser.avater}
            className={`rounded-full w-full h-full border-8 border-[lightgray]
            ${imageFileUploadPrograss && imageFileUploadPrograss <100 && 'opacity-60'}`} alt="" />
        </div>
        {imageFileUploadError && (
          <Alert color={'failure'}>
            {imageFileUploadError}
        </Alert>
        )}
        <TextInput
          className='w-full'
          type='text'
          id='userName'
          placeholder='User name'
          defaultValue={currentUser.userName}
        />
        <TextInput
          type='eamil'
          id='eamil'
          placeholder='example@gmail.com'
          defaultValue={currentUser.email}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
        />
        <Button gradientDuoTone='purpleToBlue' outline type='submit'>
          Update
        </Button>
      </form>
      <div className="flex justify-between pt-2">
        <span className='text-red-600 font-semibold cursor-pointer'>Delete Account</span>
        <span className='text-red-400 font-semibold cursor-pointer'>Sing Out</span>
      </div>
    </div>
  )
}
