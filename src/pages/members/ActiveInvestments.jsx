import React from "react";
import { useState, useEffect } from "react";
import NoActivity from "./NoActivity";
import InvestmentActivityData from "./InvestmentActivityData";
import useFetchData from "../../hooks/useFetchData";
import { activeInvestmentsUrl } from "../../api/endpoint";

const ActiveInvestments = ({ memberId }) => {
  const [apiId, setApiId] = useState("");

  const apiUrl = activeInvestmentsUrl(apiId);
  const queryKey = ["fetchActiveInvestments", apiUrl];

  const { data, error, isLoading } = useFetchData(queryKey, apiUrl);

  console.log("cassere", data);

  useEffect(() => {
    setApiId(memberId);
  }, [memberId]);
  return (
    <div className="w-full h-full">
      {data?.results?.investments?.length === 0 && <NoActivity />}

      {data?.results?.investments?.length > 0 && (
        <InvestmentActivityData data={data || []} isLoading={isLoading} />
      )}
    </div>
  );
};

export default ActiveInvestments;
