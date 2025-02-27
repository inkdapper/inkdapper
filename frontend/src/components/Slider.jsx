import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Slider = () => {
  const { backendUrl } = useContext(ShopContext)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderImagesList, setSliderImagesList] = useState([])

  const slides = [
    { slideNo: 1, image: assets.banner_one },
    { slideNo: 2, image: assets.banner_two },
    { slideNo: 3, image: assets.banner_three },
  ];

  const sliderImages = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/banner-list")
      if (response.data.success) {
        console.log(response.data.banners)
        setSliderImagesList(response.data.banners)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const sliderLoading = () => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }

  useEffect(() => {
    sliderLoading()
    sliderImages() // Call the sliderImages function here
  }, []);

  return (
    <div>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-1000"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {sliderImagesList.map((slide, index) => (
              <img
                key={index}
                src={slide.imageBanner[0]}
                alt={`Slide ${index + 1}`}
                className="w-full object-cover"
              />
            ))}
          {/* {slides.map((slide) => (
            <img
              key={slide.slideNo}
              src={slide.image}
              alt={`Slide ${slide.slideNo}`}
              className="w-full object-cover"
            />
          ))} */}
        </div>
      </div>
    </div>
  )
}

export default Slider