import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { cross } from '../App'
import { toast } from 'react-toastify'

const EditProductModal = ({ token, product, close, onSuccess }) => {
  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState(product.price)
  const [code, setCode] = useState(product.code)
  const [category, setCategory] = useState(product.category)
  const [subCategory, setSubCategory] = useState(product.subCategory)
  const [sizes, setSizes] = useState(product.sizes)
  const [bestseller, setBestseller] = useState(product.bestseller)
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)
  const [reviewImage1, setReviewImage1] = useState(null)
  const [reviewImage2, setReviewImage2] = useState(null)
  const [reviewImage3, setReviewImage3] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('code', code)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('bestseller', bestseller)
      if (image1) formData.append('image1', image1)
      if (image2) formData.append('image2', image2)
      if (image3) formData.append('image3', image3)
      if (image4) formData.append('image4', image4)
      if (reviewImage1) formData.append('reviewImage1', reviewImage1)
      if (reviewImage2) formData.append('reviewImage2', reviewImage2)
      if (reviewImage3) formData.append('reviewImage3', reviewImage3)

      const response = await axios.put(backendUrl + `/api/product/edit/${product._id}`, formData, { headers: { token } })
      console.log(response.data)
      if (response.data.success) {
        toast.success('Product updated successfully')
        onSuccess()
      } else {
        toast.error('Failed to update product')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to update product')
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center'>
      <div className='bg-white h-[560px] p-4 top-20 rounded-md w-1/2 relative'>
        <h2 className='text-2xl font-bold mb-2'>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className='w-full'>
            <p className='mb-2 font-medium'>Product name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 mb-3' type="text" placeholder='Type here' required />
          </div>

          <div className='w-full'>
            <p className='my-2 font-medium'>Product description</p>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 mb-3' type="text" placeholder='Write content here' required />
          </div>

          <div className='w-full'>
            <p className='my-2 font-medium'>Product Code</p>
            <input onChange={(e) => setCode(e.target.value)} value={code} className='w-full max-w-[500px] px-3 py-2 uppercase mb-3' type="text" placeholder='Type Product code' required />
          </div>

          <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
              <p className='my-2 font-medium'>Product category</p>
              <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 mb-3'>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>

            <div>
              <p className='my-2 font-medium'>Sub category</p>
              <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2 mb-3'>
                <option value="Customtshirt">Custom T-shirt</option>
                <option value="Oversizedtshirt">Over Sized T-shirt</option>
                <option value="Quotesdesigns">Quotes Designs</option>
                <option value="Plaintshirt">Plain T-shirt</option>
                <option value="Polotshirt">Polo T-shirt</option>
                <option value="Acidwash">Acid Wash</option>
                <option value="Hoddies">Hoddies</option>
                <option value="Sweattshirts">Sweat T-shirt</option>
              </select>
            </div>

            <div>
              <p className='my-2 font-medium'>Product Price</p>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full py-2 px-3 sm:w-[120px] mb-3' type="number" placeholder='399' />
            </div>
          </div>

          <div className='flex gap-10'>
            <div>
              <p className='my-2 font-medium'>Product Sizes</p>
              <div className='flex gap-3 mb-1'>
                <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                  <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
                </div>
                <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                  <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
                </div>
                <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                  <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
                </div>
                <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                  <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
                </div>
                <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                  <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col-reverse justify-center items-start gap-2'>
              <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" className='w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500-6'/>
              <label className='cursor-pointer font-medium' htmlFor="bestseller">Add to bestseller</label>
            </div>
          </div>

          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 absolute bottom-4 right-4'>
            Update Product
          </button>
        </form>
        <button onClick={close} className=' hover:bg-red-700 hover:text-white text-black font-bold text-2xl py-2 px-2 rounded absolute top-4 right-4'>
          {cross}
        </button>
      </div>
    </div>
  )
}

export default EditProductModal