import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import classes from "./CollectionDash.module.css";
import { ProfileLayout } from "../../Profile/ProfileLayout";
import { BsGrid3X3Gap, BsGraphUp } from "react-icons/bs";
import { ItemsContent } from "./ItemsContent";
import { CollectionActivity } from "./Activity";
import { FilterPrice } from "components/Filters/FilterPrice";
import { FilterEventType } from "components/Filters/FilterEventType";
import { useRouter } from "next/router";
import { Tabs } from "components/Tabs";
import { AssetDashboard } from "sections/Asset/AssetDashboard";
import { ActivityDashboard } from "../ActivityDashboard";
import useTranslation from "next-translate/useTranslation";

export const CollectionDash = ({ collectionData, queryInput }: any) => {

  const { t } = useTranslation('common');
  const router = useRouter();
  const [selected, setSelected]: any = useState("items");

  const [customFilterForItems, setCustomFilter]: any = useState({
    FilterStatus: true,
    FilterOnSaleIn: true,
    FilterPrice: true,
    FilterCollections: false,
    FilterChains: false,
    FilterCategories: false,
  });
  const tabName = router.query.tab || "items";
  const TabItems = [
    {
      tab: "items",
      title: t("Items"),
      icon: <BsGrid3X3Gap />,
      content: (
        <AssetDashboard
          customFilter={customFilterForItems}
          customSidebarHeight={880}
          collectionId={collectionData.collection.id}
        />
      ),
    },
    {
      tab: "activity",
      title: t("Activity"),
      icon: <BsGraphUp />,
      content: (
        <ActivityDashboard
          collectionId={collectionData.collection.id}
          blockchainId={collectionData.collection.blockchain.id}
        />
      ),
    },
  ];
  const filteredItem = TabItems.filter((el: any) => el.tab === tabName)[0];

  return (
    <div className="mt-5">
      <Tabs items={TabItems} all={false} selected={selected} />
      <div className={classes.contents}>{filteredItem?.content}</div>
    </div>
  );
};
//lang ok
