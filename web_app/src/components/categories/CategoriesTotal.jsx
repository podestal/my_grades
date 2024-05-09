import { Divider } from "@tremor/react"

const CategoriesTotal = ({ categories }) => {

    const total = categories && categories.reduce((sum, category) => {
        return sum + category.weight
    }, 0)


  return (
    <>
        <Divider></Divider>
        <div className="text-white flex justify-between mb-6">
            <p className="text-2xl font-bold font-poppins ml-8">Total</p>
            <p 
                className={`
                    text-xl font-bold 
                    ${total < 1 && 'text-yellow-400'}
                    ${total == 1 && 'text-green-500'}
                    ${total > 1 && 'text-red-500'}
                `}
            >{(total * 100).toFixed(0)}%</p>
        </div>
    </>
  )
}

export default CategoriesTotal