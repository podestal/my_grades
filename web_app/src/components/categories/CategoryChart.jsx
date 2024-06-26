import { DonutChart, Legend } from "@tremor/react"
import { useState } from "react"

const CategoryChart = ({ categories }) => {

    const legendNames = []
    const catChartData = categories && categories?.map(cat => {
        legendNames.push(cat.title)
        return {
            name: cat.title,
            value: cat.weight * 100
        }
    })

  return (
    <div className=" text-white flex flex-col items-center justify-center gap-8 mt-12">
        <DonutChart 
            data={catChartData}
            variant="pie"
            showAnimation={true}
            className="w-[320px] h-[320px]"
        />
        <Legend 
            categories={legendNames}
        />
    </div>
  )
}

export default CategoryChart