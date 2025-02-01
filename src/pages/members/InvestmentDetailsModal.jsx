import React from 'react'
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Grid } from '@mui/material';
import ActiveInvestments from './ActiveInvestments';
import InvestmentHistory from './InvestmentHistory';
import { useState , useEffect } from 'react';



const InvestmentDetailsModal = ({ close , memberId}) => {
  const [showActiveInvestment , setShowActivInvestment] = useState(true)

  return (
    <div  className=' flex flex-col items-start gap-3 w-full'>
         <div className="flex items-center justify-between w-full mb-3">
            <p className="text-general font-[500] text-[20px] ">Investment Details</p>

            <ClearRoundedIcon sx={{ color: "#1E1E1E", cursor: "pointer" }}  onClick={close} />
          </div>

           <div className='flex w-full h-full'>
           <Grid container spacing={2}>
            <Grid item xs={2.4}>
              <div className='h-[80vh] w-full  flex-col items-start gap-2 rounded-md border-[1px] border-[#E3E3E3] '>
                 <div
                 onClick={() => setShowActivInvestment(true)}
                 className={`${showActiveInvestment ? 'bg-[#EFFFF1] ' : 'bg-text_white'  } mt-4 cursor-pointer rounded-[8px] py-[10px] pl-[16px] flex w-full justify-between items-center`}>
                  <p className={`${showActiveInvestment ? 'text-[#02981D]' : 'text-[#5E5E5E]'} text-[14px] font-[500]`}>Active Investments</p>
                  { showActiveInvestment && (
                  <div className='h-[24px] rounded-[8px] bg-[#02981D] w-[6px]'></div>

                   ) }
                 </div>
                 <div 
                  onClick={() => setShowActivInvestment(false)}
                 className={`${!showActiveInvestment ? 'bg-[#EFFFF1] ' : 'bg-text_white'  } mt-4 cursor-pointer rounded-[8px] py-[10px] pl-[16px] flex w-full justify-between items-center`}>
                  <p className={`${!showActiveInvestment ? 'text-[#02981D]' : 'text-[#5E5E5E]'} text-[14px] font-[500]`}>Investment History</p>
                  { !showActiveInvestment && (
                  <div className='h-[24px] rounded-[8px] bg-[#02981D] w-[6px]'></div>

                   ) }
                 </div>
              </div>
            </Grid>
            <Grid item xs={9.6}>
              <div className='max-h-[80vh] overflow-y-auto'>
                 
               {
                showActiveInvestment ? <ActiveInvestments memberId={memberId}/> : <InvestmentHistory memberId={memberId}/>
               }
              </div>

            </Grid>
           </Grid>
           </div>
       


    </div>
  )
}

export default InvestmentDetailsModal