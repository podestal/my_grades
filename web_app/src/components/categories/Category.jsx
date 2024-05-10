import UpdateCategory from "./UpdateCategory"
import DeleteCategory from "./DeleteCategory"

const Category = ({ category }) => {

    const weight = (category?.weight * 100).toFixed(0) || '-'
    const title = category?.title || ''

  return (
    <>
        <div className="flex w-[520px] gap-8 my-4 ">
            <DeleteCategory 
                category={category}
            />
            <UpdateCategory    
                category={category}
            />
            <div className='w-full flex justify-between items-center'>
                <p className='text-white font-poppins text-xl'>{title}</p>
                <p className='text-white font-poppins'>{weight}</p>
            </div>
        </div>

    </>
  )
}

export default Category