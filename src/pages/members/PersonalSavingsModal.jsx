import React, { useState, useEffect } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Grid, Skeleton } from "@mui/material";
import FormattedPrice from "../../utils/FormattedPrice";
import sOne from "../../assets/savings/s-1.svg";
import sTwo from "../../assets/savings/s-2.svg";
import sThree from "../../assets/savings/s-33.svg";
import sFour from "../../assets/savings/s-4.svg";
import sFive from "../../assets/savings/s-5.svg";
import CustomCard from "../../components/CustomCard";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useDateContext } from "../../utils/DateContext";
import { savingsBreakdownUrl } from "../../api/endpoint";
import useFetchData from "../../hooks/useFetchData";

const PersonalSavingsModal = ({ close, memberId }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [apiId, setApiId] = useState("");
  const { selectedDates } = useDateContext();
  const [currentPage, setCurrentPage] = useState(1);

  const apiUrl = savingsBreakdownUrl(apiId, selectedDates);
  const queryKey = ["fetchSavingsBreakdown", apiUrl];

  const { data, error, isLoading } = useFetchData(queryKey, apiUrl);
  console.log("dd", apiId);
  console.log("human", data);

  const totalPages = data?.pages;

  console.log(data);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setApiId(memberId);
  }, [memberId]);

  const getColor = (color) => {
    let returnColor;

    switch (color) {
      case "BIRTHDAY":
        returnColor = "text-[#00A26B]";
        break;
      case "GADGET-PURCHASE":
        returnColor = "text-[#FF6D84]";
        break;
      default:
        break;
    }

    return returnColor;
  };
  const getIcon = (icon) => {
    let returnIcon;

    switch (icon) {
      case "BIRTHDAY":
        returnIcon = sOne;
        break;
      case "GADGET-PURCHASE":
        returnIcon = sFour;
        break;
      default:
        break;
    }

    return returnIcon;
  };

  const FirstCard = ({ titleOne, textOne, textTwo, img, color, link }) => {
    return (
      <>
        {isLoading ? (
          <Skeleton variant="rounded" width="100%" height={227} />
        ) : (
          <CustomCard style="w-full h-full">
            <div className="bg-text_white flex-col items-start">
              <div className="flex gap-2 items-center ">
                <img src={img} alt="s-1" />
                <p className={`${color}`}>{titleOne}</p>
              </div>

              <div className="flex flex-col items-start gap-2 mt-5  mb-4">
                <p className="text-[14px] text-primary_grey_2">
                  Total Number of Cycles:
                </p>
                <p className="text-[20px] text-general">{textOne}</p>
              </div>

              <div className="flex flex-col items-start gap-2 mb-4">
                <p className="text-[14px] text-primary_grey_2">
                  Current Total Savings:
                </p>
                <p className="text-[20px] text-general">
                  <FormattedPrice amount={textTwo} />
                </p>
              </div>
            </div>
          </CustomCard>
        )}
      </>
    );
  };
  return (
    <div className=" flex flex-col items-start gap-3 w-full">
      <div className="flex items-center justify-between w-full mb-3">
        <p className="text-general font-[500] text-[20px] ">
          Personal Savings Breakdown
        </p>

        <ClearRoundedIcon
          sx={{ color: "#1E1E1E", cursor: "pointer" }}
          onClick={close}
        />
      </div>

      {/* cards */}

      <div className="w-full">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {isLoading ? (
              <Skeleton variant="rounded" width="100%" height={120} />
            ) : (
              <div className="w-full flex-col items-start gap-2 rounded-md border-[1px] border-[#E3E3E3] p-2">
                <p className="text-general font-[500] text-[15px] ">Summary</p>

                <div className="w-full flex justify-between items-center mt-3">
                  <div className="items-start flex  gap-2 flex-col">
                    <p className="font-[400] text-[14px] text-[#5E5E5E]">
                      Total Personal Savings Cycle:
                    </p>
                    <p className="text-general font-[500] text-[20px] ">
                      {data?.results?.overview?.total_cycle}
                    </p>
                  </div>
                  <div className="items-start flex  gap-2 flex-col">
                    <p className="font-[400] text-[14px] text-[#5E5E5E]">
                      All-Time Total Personal Savings:
                    </p>
                    <p className="text-general font-[500] text-[20px] ">
                      <FormattedPrice
                        amount={data?.results?.overview?.total_savings}
                      />
                    </p>
                  </div>
                  <div className="items-start flex  gap-2 flex-col">
                    <p className="font-[400] text-[14px] text-[#5E5E5E]">
                      Current Total Personal Savings:
                    </p>
                    <p className="text-general font-[500] text-[20px] ">
                      <FormattedPrice
                        amount={data?.results?.overview?.current_Savings}
                      />
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Grid>

          {isLoading ? (
            <Grid item xs={12}>
              <Skeleton variant="rounded" width="100%" height={180} />
            </Grid>
          ) : (
            data?.results?.investments &&
            Array.isArray(data?.results?.investments) &&
            data?.results?.investments?.map((item) => (
              <Grid item xs={4} key={`${item?.type} + ${item?.cycle}`}>
                <FirstCard
                  img={getIcon(item?.type)}
                  titleOne={`Savings Towards ${item?.type}`}
                  textOne={item?.cycle}
                  textTwo={item?.amount_saved}
                  color={getColor(item?.type)}
                  link={{ title: "Savings Towards Birthdays", val: "birth" }}
                />
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </div>
  );
};

export default PersonalSavingsModal;
