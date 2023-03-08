import classes from "./Chart.module.css";
import Select from "react-select";
import { useState } from "react";
import { useGetDayWiseCollectionPriceQuery } from "src/graphql/generated";
import { PriceChart } from "components/Chart/PriceChart";
import useTranslation from "next-translate/useTranslation";

export const CollectionChart = ({ margin, collection_id }: any) => {
  const { t } = useTranslation("common");
  
  const PRICE_HISTORY_OPTIONS = [
    { value: "7", label: t("Last 7 Days") },
    { value: "14", label: t("Last 14 Days") },
    { value: "30", label: t("Last 30 Days") },
    { value: "60", label: t("Last 60 Days") },
    { value: "90", label: t("Last 90 Days") },
    { value: "365", label: t("Last Year") },
    // { value: "all", label: t("All Time") },
  ];

  const [days, setDays] = useState<any>(PRICE_HISTORY_OPTIONS[0].value);
  const { data: collectionPrice, refetch: collectionRefetch } =
    useGetDayWiseCollectionPriceQuery({
      collection_id: collection_id,
      days: days,
    });

  const data =
    collectionPrice?.getDayWiseCollectionPrice?.day_wise_price_count.map(
      (item) => {
        return {
          date:
            new Date(item.date.toString()).getDate() +
            "/" +
            (new Date(item.date.toString()).getMonth() + 1),
          volume: item.sum_price,
          avg_price: item.avg_price,
        };
      }
    );

  const handleDayChange = (e: any) => {
    setDays(e.value);
    collectionRefetch();
  };

  return (
    <div className={`${margin ? "my-5" : ""}`}>
      {/* the dropdown and info */}
      <div className={classes.info}>
        <Select
          classNamePrefix="profile"
          className={classes.select}
          isSearchable={false}
          name="priceHistory"
          id="priceHistory"
          options={PRICE_HISTORY_OPTIONS}
          defaultValue={PRICE_HISTORY_OPTIONS[0]}
          onChange={handleDayChange}
        />
        {collectionPrice?.getDayWiseCollectionPrice?.total_avg_price ||
        collectionPrice?.getDayWiseCollectionPrice?.total_sum_price ? (
          <div className={classes.stats}>
            <div className={classes.statCard}>
              <span>
                {days} {t("Day Avg Price")}
              </span>
              <span className={classes.statsAmount}>
                {"="} ${" "}
                {collectionPrice?.getDayWiseCollectionPrice?.total_avg_price?.toFixed(
                  2
                )}
              </span>
            </div>

            <div className={classes.statCard}>
              <span>
                {days} {t("Day Volume")}
              </span>
              <span className={classes.statsAmount}>
                {"="} ${" "}
                {collectionPrice?.getDayWiseCollectionPrice?.total_sum_price?.toFixed(
                  2
                )}
              </span>
            </div>
          </div>
        ) : null}
      </div>
      {data && data.length > 0 ? (
        <PriceChart data={data} />
      ) : (
        <p className={"text-center mt-5 mb-5 " + classes.noData}>
          {t("No price history available for the last ")}
          {days}
          {t(" days.")}
        </p>
      )}
    </div>
  );
};
