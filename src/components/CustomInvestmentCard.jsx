import React from "react";
import { Card, CardHeader, CardContent, Skeleton } from "@mui/material";
import mEl from "../assets/member-profile/m-11.svg";
import iOne from "../assets/investment/i-1.svg";
import banner from "../assets/investment/banner.png";
import mSeven from "../assets/member-profile/m-7.svg";
import FormattedPrice from "../utils/FormattedPrice";

const CustomInvestmentCard = ({
  item,
  handleShowDetails,
  investmentListLoading,
}) => {
  const {
    id,
    image,
    interest_rate,
    name,
    user_investments_count,
    unit_share,
    is_active,
    quota,
  } = item;

  return (
    <>
      <Card sx={{ width: "20%", cursor: "pointer", pb: "2rem" }}>
        <div className=" h-1/2  relative" onClick={() => handleShowDetails(id)}>
          <img
            src={image}
            alt="banner"
            className="object-fill max-h-[200px] min-w-full rounded-b-0 w-full h-full"
          />

          <span
            className={`py-[10px] px-[16px] rounded-[20px] ${
              !is_active
                ? "bg-[#FBEBEC] text-[#DC3545] "
                : "bg-[#E6F5E8]  text-[#015B11]"
            } absolute top-5 right-3 z-10 text-[14px] font-[500] `}
          >
            {is_active ? "Available" : "Sold"}
          </span>
        </div>

        <CardContent>
          <div className="flex flex-col items-start gap-2 ">
            <p className="text-general font -[600] text-[20px] mb-3 ">
              {name} Portfolio
            </p>

            <div className="gap-3 items-center flex mb-1">
              <img src={iOne} alt="i-one" />
              <p className="flex text-[14px] gap-2">
                {" "}
                <span className="text-primary_green">{interest_rate}%</span>in
                10 Months
              </p>
            </div>
            <div className="gap-3 items-center flex mb-1">
              <img src={mEl} alt="i-one" />
              <p className="flex text-[14px] gap-2">
                {" "}
                <span className="font-[500]">
                  <FormattedPrice amount={unit_share} />
                </span>
                per unit
              </p>
            </div>
            <div className="gap-3 items-center flex ">
              <img src={mSeven} alt="i-one" />
              <p className="flex text-[14px] gap-2">
                {user_investments_count} investor
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default CustomInvestmentCard;
