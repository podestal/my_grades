import React from 'react'
import { useEffect } from 'react'

const ReportPage = () => {

    useEffect(() => {
        print()
    }, [])

  return (
    <div className='bg-white w-[100%] min-h-[100vh] z-20'>ReportPage</div>
  )
}

export default ReportPage