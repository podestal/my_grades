import React from 'react'

const Category = ({ category }) => {
  return (
    <div className='flex w-[980px] justify-between'>
        <p className='text-white font-poppins'>{category.title}</p>
        <p className='text-white font-poppins'>{category.weight ? `${ategory.weight }%` : '-'}</p>
    </div>
  )
}

export default Category