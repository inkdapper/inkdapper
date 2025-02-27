import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const BannerImages = ({ token }) => {

  const [imageBanner1, setImageBanner1] = useState(false)
  const [imageBanner2, setImageBanner2] = useState(false)
  const [imageBanner3, setImageBanner3] = useState(false)
  const [imageBanner4, setImageBanner4] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      imageBanner1 && formData.append("imageBanner1", imageBanner1)
      imageBanner2 && formData.append("imageBanner2", imageBanner2)
      imageBanner3 && formData.append("imageBanner3", imageBanner3)
      imageBanner4 && formData.append("imageBanner4", imageBanner4)

      const response = await axios.post(backendUrl + "/api/product/add-banner", formData, { headers: { token } })
      console.log(response.data)
      if (response.data.success) {
        toast.success(response.data.message)
        setImageBanner1(false)
        setImageBanner2(false)
        setImageBanner3(false)
        setImageBanner4(false)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div className=''>
        <div className=''>
          <Link to='/banner-list' className='absolute right-10'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>Banner List</button>
          </Link>
        </div>
        <p className='font-semibold mt-3 text-2xl mb-3'>Upload Banner Image</p>
        <p className='mt-3 mb-2'>Product Banner Images</p>
        <div className='flex gap-2'>
          <label htmlFor="imageBanner1">
            <img className='w-20 h-25' src={!imageBanner1 ? assets.upload_area : URL.createObjectURL(imageBanner1)} alt="" />
            <input onChange={(e) => setImageBanner1(e.target.files[0])} type="file" id='imageBanner1' hidden />
          </label>
          <label htmlFor="imageBanner2">
            <img className='w-20 h-25' src={!imageBanner2 ? assets.upload_area : URL.createObjectURL(imageBanner2)} alt="" />
            <input onChange={(e) => setImageBanner2(e.target.files[0])} type="file" id='imageBanner2' hidden />
          </label>
          <label htmlFor="imageBanner3">
            <img className='w-20 h-25' src={!imageBanner3 ? assets.upload_area : URL.createObjectURL(imageBanner3)} alt="" />
            <input onChange={(e) => setImageBanner3(e.target.files[0])} type="file" id='imageBanner3' hidden />
          </label>
          <label htmlFor="imageBanner4">
            <img className='w-20 h-25' src={!imageBanner4 ? assets.upload_area : URL.createObjectURL(imageBanner4)} alt="" />
            <input onChange={(e) => setImageBanner4(e.target.files[0])} type="file" id='imageBanner4' hidden />
          </label>
        </div>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

    </form>
  )
}

export default BannerImages