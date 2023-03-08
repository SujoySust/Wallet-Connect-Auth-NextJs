import { ImageItem } from "components/Images";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { NoItems } from "components/NoItems";
import { RankingVolume } from "components/Ranking/RankingVolume";
import { RcTooltip } from "components/Tooltip/rcTooltip";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { useState } from "react";
import Select from "react-select";
import {
  useGetBlockchainListsForFilterQuery,
  useGetRankingListQuery,
} from "src/graphql/generated";
import {
  COMMON_COIN_DECIMAL_VISUAL,
  DAYS_ONE_DAY,
  DAYS_SEVEN_DAYS,
  DAYS_THIRTY_DAYS,
} from "src/helpers/coreconstants";
import { formatPriceK } from "src/helpers/functions";
import classes from "./RankingList.module.css";

const RankingList = () => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const [blochainList, setBlockchainList] = useState<any>([]);
  const [blockchainId, setBlockchainId] = useState<any>(0);
  const [days, setDays] = useState<any>(DAYS_ONE_DAY);

  useGetBlockchainListsForFilterQuery(
    {},
    {
      onSuccess: ({ getBlockchainLists }) => {
        const list = getBlockchainLists.map((item) => {
          return {
            value: item.id,
            label: item.network_name,
          };
        });

        const newList = list.slice();
        newList.unshift({
          value: 0,
          label: t("All Chain"),
        });
        setBlockchainList(newList);
      },
    }
  );

  const {
    data: rankingList,
    isLoading,
    error,
    isSuccess,
  } = useGetRankingListQuery({
    blockchain_id: blockchainId,
    days: days,
  });

  const totalItems = rankingList?.getRankingList?.length;

  return (
    <>
      <div className={classes.groupContainer}>
        <div className={classes.tabContainer}>
          <div
            className={days === DAYS_ONE_DAY ? classes.activeTab : classes.tab}
            onClick={() => setDays(DAYS_ONE_DAY)}
          >
            {t("1 days")}
          </div>
          <div
            className={
              days === DAYS_SEVEN_DAYS ? classes.activeTab : classes.tab
            }
            onClick={() => setDays(DAYS_SEVEN_DAYS)}
          >
            {t("7 days")}
          </div>
          <div
            className={
              days === DAYS_THIRTY_DAYS ? classes.activeTab : classes.tab
            }
            onClick={() => setDays(DAYS_THIRTY_DAYS)}
          >
            {t("30 days")}
          </div>
        </div>
        <>
          <Select
            classNamePrefix="profile"
            isSearchable={false}
            placeholder={t("All Chains")}
            name="sorting"
            id="sorting"
            className={classes.selectContainer}
            options={blochainList}
            onChange={(el: any) => setBlockchainId(el.value)}
          />
        </>
      </div>

      {isLoading && (
        <NoItems
          title={
            <>
              <LoadingCircles />
            </>
          }
        />
      )}

      {error && <NoItems title={error} />}

      {isSuccess && totalItems === 0 && (
        <NoItems title={t("No items to display")} />
      )}

      {isSuccess && totalItems !== 0 && (
        <div className="table-responsive">
          <table className="table table-sm">
            <thead className="border-bottom">
              <tr>
                <th className="border-0">{t("#")}</th>
                <th className="border-0">{t("Collection")}</th>
                <th className="border-0">{t("Volume")}</th>
                <th className="border-0">{t("Floor Price")}</th>
              </tr>
            </thead>
            <tbody className={classes.tbodyContainer}>
              {rankingList?.getRankingList?.map((item, index) => (
                <tr className={classes.row} key={item.id}>
                  <td className={"border-0 " + classes.item}>{index + 1}</td>

                  <td className={"border-0 " + classes.itemsection}>
                    <div className={classes.itemImage}>
                      {/* <img
                        src={item?.collection?.logo}
                        alt={item?.collection?.name}
                        width={50}
                        height={50}
                      /> */}
                      <ImageItem
                        src={
                          item?.collection?.logo || "/assets/images/star.svg"
                        }
                        alt={item?.collection?.name}
                        layout="fixed"
                        height={60}
                        width={60}
                      />
                    </div>
                    <h4 className={classes.itemName}>
                      <Link href={`/collections/${item?.collection?.slug}`}>
                        <a>{item?.collection?.name}</a>
                      </Link>
                    </h4>
                  </td>
                  {days === DAYS_ONE_DAY ? (
                    <RankingVolume
                      volume_in_native={item?.one_day_volume_in_native}
                      volume_in_usd={item?.one_day_volume_in_usd}
                      volume_percent={item?.one_day_volume_percent}
                      native_token={item?.native_token}
                    />
                  ) : days === DAYS_SEVEN_DAYS ? (
                    <RankingVolume
                      volume_in_native={item?.seven_days_volume_in_native}
                      volume_in_usd={item?.seven_days_volume_in_usd}
                      volume_percent={item?.seven_days_volume_percent}
                      native_token={item?.native_token}
                    />
                  ) : days === DAYS_THIRTY_DAYS ? (
                    <RankingVolume
                      volume_in_native={item?.thirty_days_volume_in_native}
                      volume_in_usd={item?.thirty_days_volume_in_usd}
                      volume_percent={item?.thirty_days_volume_percent}
                      native_token={item?.native_token}
                    />
                  ) : (
                    <td className={"border-0 " + classes.itemImage}></td>
                  )}

                  <td className={"border-0 " + classes.itemImage}>
                    <RcTooltip overlay={item?.native_token?.token_symbol ?? ""}>
                      <img
                        src={item?.native_token?.logo ?? ""}
                        alt={item?.native_token?.token_symbol ?? ""}
                        width={13}
                        className="mr-3"
                      />
                    </RcTooltip>
                    <strong>
                      {item.floor_price_in_native
                        ? formatPriceK(
                            item.floor_price_in_native,
                            COMMON_COIN_DECIMAL_VISUAL
                          )
                        : "---"}
                    </strong>
                    <br />
                    <span>
                      ${" "}
                      {item.floor_price_in_usd
                        ? formatPriceK(item.floor_price_in_usd)
                        : "---"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default RankingList;
//lang ok
