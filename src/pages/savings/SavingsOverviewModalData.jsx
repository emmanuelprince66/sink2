import React from 'react'
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Skeleton , Divider } from '@mui/material';
import FormattedPrice from '../../utils/FormattedPrice';
import CustomLinearProgress from "../../components/CustomLinearProgress";


const SavingsOverviewModalData = ({participantModalQuery , title  , modalLoading}) => {

  return (
    <>
          <div className="flex flex-col items-start gap-3 w-full   ">
        

          <div className="flex gap-2 items-center">
            <p className="text-primary_green font-[500] text-[18px]">{title}</p>
          </div>

          {modalLoading || !participantModalQuery ? (
            <Skeleton variant="rounded" width="100%" height={220} />
          ) : (
            <div className="flex flex-col items-start gap-2 w-full  mt-3">
              <div className="rounded-md w-full border-[1px] bg-[#F9F8FF] border-[#E3E3E3] p-2 flex flex-col items-start">
                <div className="w-full flex justify-between mt-1">
                  <p className="text-[14px] text-primary_grey_2">
                    Description:
                  </p>
                  <p className="text-[14px] text-general font-[500]">
                    Savings Plans
                  </p>
                </div>
                <Divider sx={{ color: "#E3E3E3", width: "100%", my: "8px" }} />

                <div className="w-full flex justify-between">
                  <p className="text-[14px] text-primary_grey_2">User:</p>
                  <p className="text-[14px] text-general font-[500]">
                    {participantModalQuery?.user}
                  </p>
                </div>

                <Divider sx={{ color: "#E3E3E3", width: "100%", my: "8px" }} />

                <div className="w-full flex justify-between">
                  <p className="text-[14px] text-primary_grey_2">
                    Target Amount:
                  </p>
                  <p className="text-[14px] text-general font-[500]">
                    <FormattedPrice amount={participantModalQuery?.target_amount} />
                  </p>
                </div>
                <Divider sx={{ color: "#E3E3E3", width: "100%", my: "8px" }} />

                <div className="w-full flex justify-between">
                  <p className="text-[14px] text-primary_grey_2">
                    Amount Saved:
                  </p>
                  <p className="text-[14px] text-general font-[500]">
                    <FormattedPrice amount={participantModalQuery?.saved} />
                  </p>
                </div>
                <Divider sx={{ color: "#E3E3E3", width: "100%", my: "8px" }} />

                <div className="w-full flex justify-between">
                  <p className="text-[14px] text-primary_grey_2">
                    Frequency of Savings:
                  </p>
                  <p className="text-[14px] text-general font-[500]">
                    {participantModalQuery?.frequency}
                  </p>
                </div>
                <Divider sx={{ color: "#E3E3E3", width: "100%", my: "8px" }} />

                <div className="w-full flex justify-between">
                  <p className="text-[14px] text-primary_grey_2">
                    Expected Amount Per Saving:
                  </p>
                  <p className="text-[14px] text-general font-[500]">
                    <FormattedPrice
                      amount={participantModalQuery?.amount_per_savings}
                    />
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex w-full items-center justify-between">
            {modalLoading || !participantModalQuery ? (
              <Skeleton variant="rounded" width="100%" height={30} />
            ) : (
              <CustomLinearProgress
                startDate={participantModalQuery?.start_date}
                endDate={participantModalQuery?.end_date}
              />
            )}
          </div>
        </div>

    </>
  )
}

export default SavingsOverviewModalData