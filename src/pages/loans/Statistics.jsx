import React from "react";
import LoanCustomCardContent from "../../components/LoanCustomCardContent";
import lTwo from "../../assets/loan/l-2.svg";
import lOne from "../../assets/loan/l-1.svg";
import lFive from "../../assets/loan/l-5.svg";
import lFour from "../../assets/loan/l-4.svg";
import lSix from "../../assets/loan/l-6.svg";
import lSeven from "../../assets/loan/l-7.svg";
import bankNotes from "../../assets/loan/banknotes.svg";
import user from "../../assets/loan/user.svg";
import CustomCard from "../../components/CustomCard";
import Lfour from "../../assets/loan/Lfour";
import useFetchData from "../../hooks/useFetchData";
import { loanStatisticsDataUrl } from "../../api/endpoint";
import { Skeleton } from "@mui/material";

const Statistics = ({ handleCloseShowStatatistics, setStatTitle }) => {
  const apiUrl = loanStatisticsDataUrl();
  const queryKey = ["fetchLoanStatistics", apiUrl];
  // fetch loan statistics

  const { data, isLoading } = useFetchData(queryKey, apiUrl);

  const handleOpenRequest = (text) => {
    setStatTitle(text);
    handleCloseShowStatatistics("request");
  };
  return (
    <div className="flex flex-col items-start gap-4 w-full mt-5">
      <p className="font-[600] text-[16px] text-general">Statistics </p>
      <div className="flex w-full justify-between gap-4 items-center ">
        {isLoading || !data ? (
          <Skeleton variant="rounded" width="100%" height={210} />
        ) : (
          <CustomCard style="w-full">
            <LoanCustomCardContent
              textOne="Total Approved Loan amount:"
              icon={bankNotes}
              textTwo={data?.total_amount}
              textThree={data?.total_amount_filter}
            />
          </CustomCard>
        )}

        {isLoading || !data ? (
          <Skeleton variant="rounded" width="100%" height={210} />
        ) : (
          <CustomCard style="w-full">
            <LoanCustomCardContent
              textOne="Interest From Loans:"
              icon={lFive}
              textTwo="22,000"
              textThree="300"
            />
          </CustomCard>
        )}

        {isLoading || !data ? (
          <Skeleton variant="rounded" width="100%" height={210} />
        ) : (
          <CustomCard style="w-full">
            <LoanCustomCardContent
              textOne="Interest From Loans:"
              icon={lFive}
              textTwo={data?.approved_request}
              textThree={data?.approved_filter}
            />
          </CustomCard>
        )}
        {isLoading || !data ? (
          <Skeleton variant="rounded" width="100%" height={210} />
        ) : (
          <CustomCard style="w-full">
            <LoanCustomCardContent
              textOne="Loan Beneficiaries:"
              icon={user}
              textTwo={data?.loan_beneficiary}
              textThree={data?.loan_beneficiary_filter}
            />
          </CustomCard>
        )}
      </div>
      {/*  */}
      <p
        onClick={() => handleOpenRequest("Overdue Repayments")}
        className="font-[600] text-[16px] text-general mt-3"
      >
        Request Summary{" "}
      </p>
      <div className="flex w-full justify-between gap-4 items-center ">
        {isLoading || !data ? (
          <Skeleton variant="rounded" width="100%" height={210} />
        ) : (
          <CustomCard style="w-full">
            <LoanCustomCardContent
              textOne="Approved Request"
              icon={lSeven}
              textTwo={data?.approved_request}
              textThree={data?.approved_filter}
              status="approved"
              handleOpenRequest={handleOpenRequest}
            />
          </CustomCard>
        )}
        {isLoading || !data ? (
          <Skeleton variant="rounded" width="100%" height={210} />
        ) : (
          <CustomCard style="w-full">
            <LoanCustomCardContent
              textOne="Pending Request"
              icon={lFour}
              textTwo={data?.pending_request}
              textThree={data?.pending_request_filter}
              status="pending"
              handleOpenRequest={handleOpenRequest}
            />
          </CustomCard>
        )}

        {isLoading || !data ? (
          <Skeleton variant="rounded" width="100%" height={210} />
        ) : (
          <CustomCard style="w-full">
            <LoanCustomCardContent
              textOne="Declined Requests"
              icon={lSix}
              textTwo={data?.rejected_request}
              textThree={data?.rejected_request_filter}
              status="rejected"
              handleOpenRequest={handleOpenRequest}
            />
          </CustomCard>
        )}
      </div>
      {/*  */}
      {/*  */}
      <p className="font-[600] text-[16px] text-general mt-3">
        Repayment Summary{" "}
      </p>
      <div className="flex w-full  gap-4 items-center ">
        {isLoading || !data ? (
          <Skeleton variant="rounded" width="100%" height={210} />
        ) : (
          <CustomCard style="min-h-[14.9rem] w-[33%]">
            <LoanCustomCardContent
              textOne="Total Repayment"
              icon={bankNotes}
              textTwo="22,000"
              textThree="300"
            />
          </CustomCard>
        )}

        {isLoading || !data ? (
          <Skeleton variant="rounded" width="100%" height={210} />
        ) : (
          <CustomCard style="w-[33%]">
            <LoanCustomCardContent
              textOne="Overdue Repayments"
              icon={lTwo}
              textTwo="22,000"
              textThree="300"
              status="overdue"
              handleOpenRequest={handleOpenRequest}
            />
          </CustomCard>
        )}
      </div>
      {/*  */}
    </div>
  );
};

export default Statistics;
