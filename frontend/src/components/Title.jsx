import React from 'react'

const Title = ({text1, text2, text3, className}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3 sm:text-3xl font-medium text-lg'>
        <p className='text-gray-500'>{text1} <span className='text-gray-700 font-medium'>{text2}</span>
          <span className={className}>{text3}</span></p>
        <p className='w-8 sm:w-11 h-[1px] sm:h-[2px] bg-gray-700'></p>
    </div>
  )
}

export default Title