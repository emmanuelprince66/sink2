import React from 'react'
import noInvestment from "../../assets/noInvestment.png"


const NoActivity = () => {
  return (
    <div className='w-full flex justify-center items-center min-h-[30rem]'>
    <div className='flex flex-col items-center  gap-2'>
         <img src={noInvestment} alt="no-active-investment" /> 
         <p className='font-[600] text-[20px] text-general'>No Active Investment</p>
         <p className='font-[400] text-[14px] text-primary_grey_2'>This user has no active investment</p>
    </div>
</div>
  )
}

export default NoActivity