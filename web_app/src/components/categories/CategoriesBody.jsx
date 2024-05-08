import CategoryChart from "./CategoryChart"
import Category from "./Category"
import CategoriesTotal from "./CategoriesTotal"

const CategoriesBody = ({ categories }) => {

  return (
    <div className='w-full flex flex-row mt-12 mx-auto items-center justify-evenly h-full'>
        <div className='flex flex-col'>
            {categories && categories.map( category => (
                <Category 
                    key={category.id}
                    category={category}
                />
            ) )}
            <CategoriesTotal 
                categories={categories}
            />
        </div>
        <CategoryChart 
            categories={categories}
        />
    </div>
  )
}

export default CategoriesBody