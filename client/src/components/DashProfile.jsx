import { useSelector } from 'react-redux'
import {Alert, Button, Modal, TextInput} from 'flowbite-react'
import { useState, useRef, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch } from 'react-redux';
import {
  updateStart,
  updateSuccess,
  updateFailuar,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailuar,
  singoutUserSuccess,
  singoutUserFailuar
} from '../redux/user/userSlice.js';
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function DashProfile() {
  const dispatch =useDispatch()
  const { currentUser,error } = useSelector((state) => state.user)
  const [imageFile, setimageFile] = useState(null);
  const [imgaeFileUrl, setimgaeFileUrl] = useState(null);
  const [imageFileUploadError, setimageFileUploadError] = useState(null);
  const [imageUploading, setimageUploading] = useState(null);
  const [imageFileUploadPrograss, setimageFileUploadPrograss] = useState(null);
  const [updateUserSuccess, setupdateUserSuccess] = useState(null);
  const [updataError, setupdataError] = useState(null);
  const [formData, setformData] = useState({});
  const [showModle, setshowModle] = useState(false);
  const filePickerRef = useRef()
  const handleChange = (e) => {
    setformData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setupdataError(null)
    setupdateUserSuccess(null)
    if (Object.keys(formData).length === 0) {
      setupdataError('No change made')
      return
    }
    if (imageUploading) {
      updataError('Please wait image for upload')
      return
    }
    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        })
      const data = await res.json()
      if (!res.ok) {
        dispatch(updateFailuar(data.message))
        setupdataError(data.message)
      } else {
        dispatch(updateSuccess(data))
        setupdateUserSuccess("User update successfully")
      }
    } catch (error) {
      dispatch(updateFailuar(error.message))
      setupdataError(error.message)
    }
  }
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
    setimageUploading(true)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on('state_changed',
      (snapsort) => {
        setimageFileUploadError(null)
        setupdateUserSuccess(null)
        const porgress = (snapsort.bytesTransferred / snapsort.totalBytes) * 100
        setimageFileUploadPrograss(porgress.toFixed(0))
      },
      (error) => {
        setimageFileUploadError("conn't upload Image file must be 2mb")
        setimageFileUploadPrograss(null)
        setimageFile(null)
        setimgaeFileUrl(null)
        setimageUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimgaeFileUrl(downloadURL)
          setformData({...formData,avater:downloadURL})
          setimageFileUploadPrograss(null)
          setimageUploading(false)
        })
      }
    )
  }
  const handleDelete = async () => {
    setshowModle(false)
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method:'delete'
      })
      const data = await res.json()
      if (!res.ok) {
        dispatch(deleteUserFailuar(data.message))
      } else {
        dispatch(deleteUserSuccess(data))
      }
    } catch (error) {
      dispatch(deleteUserFailuar(error.message))
    }
}
  
  const userSingout = async () => {
    try {
      const res = await fetch(`/api/user/singout`, {
        method:'POST'
      })
      const data = await res.json()
      if (!res.ok) {
        dispatch(singoutUserFailuar(data.message))
      } else {
        dispatch(singoutUserSuccess(data))
      }
    } catch (error) {
      dispatch(singoutUserFailuar(error.message))
    }
}
  
  
  return (
      <div className='mx-auto'>
          <h1 className='text-center p-4 font-bold'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 md:w-[500px] w-[300px]'>
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
          onChange={handleChange}          
        />
        <TextInput
          type='eamil'
          id='eamil'
          placeholder='example@gmail.com'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
        />
        <Button gradientDuoTone='purpleToBlue' outline type='submit'>
          Update
        </Button>
      </form>
      <div className="flex justify-between pt-2">
        <span onClick={()=>setshowModle(true)} className='text-red-600 font-semibold cursor-pointer'>Delete Account</span>
        <span onClick={userSingout} className='text-red-400 font-semibold cursor-pointer'>Sing Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='md:ps-[180px] ps-[70px] mt-3'>
          {updateUserSuccess}
        </Alert>
      )}
      {updataError && (
        <Alert color='failure' className='md:ps-[180px] ps-[70px] mt-3'>
          {updataError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='md:ps-[180px] ps-[70px] mt-3'>
          {error}
        </Alert>
      )}
      <Modal show={showModle} onClose={()=>setshowModle(false) } size='md' popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto '/>
            <h3 className='text-gray-600 dark:text-gray-400 mb-5 text-lg font-semibold'>Are you sure want to delete your account</h3>
            <div className="flex justify-center gap-8">
              <Button color='failure' onClick={handleDelete}>Yes,I'm sure</Button>
              <Button gradientDuoTone='purpleToPink' outline onClick={()=>setshowModle(false)}>No,Cancle</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
