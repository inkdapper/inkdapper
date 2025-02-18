import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from './ProductItem'
import { Link } from 'react-router-dom'

const RelatedProducts = ({category, subCategory}) => {

    const { products } = useContext(ShopContext)
    const [related, setRelated] = useState([])

    useEffect(() => {
      if (products.length > 0 && category && subCategory) {
        const filteredProducts = products.filter((item) => item.category === category && item.subCategory === subCategory);
        setRelated(filteredProducts.slice(0, 4));
      }
    }, [products, category, subCategory]);

  return (
    <div className='my-8 md:my-12 lg:my-24'>
        <div className='text-center text-xl md:text-2xl lg:text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-col-5 gap-4 gap-y-6'>
            {
              related.map((items,index) =>(
                <ProductItem   key={index} id={items._id} name={items.name} image={items.image} 
                price={items.price}/>

              ))
            }
          </div>
    </div>
  )
}

export default RelatedProducts