import React from "react";
import Select from "react-select";
import classes from "./RankingHead.module.css";
import useTranslation from "next-translate/useTranslation";
const RankingHead = () => {
  const [activeTab, setActiveTab] = React.useState(1);
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  return (
    <div className={classes.groupContainer}>
      <div className={classes.tabContainer}>
        <div
          className={activeTab === 1 ? classes.activeTab : classes.tab}
          onClick={() => setActiveTab(1)}
        >
          {t("1 days")}
        </div>
        <div
          className={activeTab === 2 ? classes.activeTab : classes.tab}
          onClick={() => setActiveTab(2)}
        >
          {"7 days"}
        </div>
        <div
          className={activeTab === 3 ? classes.activeTab : classes.tab}
          onClick={() => setActiveTab(3)}
        >
          {"30 days"}
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
          options={[
            { value: 1, label: "Ethereum" },
            { value: 2, label: "Bitcoin" },
          ]}
          // styles={reactSelectCustomStyles}
          // defaultValue={sortingValue}
          // onChange={(el) => handleSortChange(el)}
        />
      </>
    </div>
  );
};

export default RankingHead;
