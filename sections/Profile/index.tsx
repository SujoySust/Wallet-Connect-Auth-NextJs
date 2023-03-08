import { useEffect, useState } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { Loading } from "../../components/Loader/Loading";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import { BsFileEarmarkPlus, BsGraphUp } from "react-icons/bs";
import { RiPaintBrushFill } from "react-icons/ri";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store";
import { Tabs } from "../../components/Tabs";
import { FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import classes from "./ProfileSection.module.css";
import { Drawer } from "../../components/Drawer";
import { NoItems } from "../../components/NoItems";
import { OwnedNft } from "./Dashboard/OwnedNft";
import { Collections } from "./Dashboard/Collections";
import { Banner } from "../../components/Banner";
import { HeadlessMenu } from "components/HUI/HeadlessMenu";
import DashboardItem from "./Dashboard/Items";
import FavouriteList from "./Dashboard/Favourite";
import { ActivityDashboard } from "sections/Collections/ActivityDashboard";
import Made from "./Dashboard/Made";
import Recieve from "./Dashboard/Recieve";
import ActiveInactive from "./Dashboard/ActiveExpired";
import Select from "react-select";
import useTranslation from "next-translate/useTranslation";

export const ProfileSection = ({ account, setting }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  // check it's me or not
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const me = userData.wallet_address === account.wallet_address;

  const router = useRouter();
  const [selected, setSelected]: any = useState("ownednft");

  useEffect(() => {
    if (router.query.tab) {
      setSelected(router.query.tab);
    } else {
      setSelected("ownednft");
      // router.push(`/profile?tab=ownednft`);
    }
  }, [router]);

  const DropDownItemlist = [
    {
      value: <OwnedNft ownerId={account.id} />,
      label: t("Owned NFT"),
      tab: "ownednft",
    },
    {
      value: <FavouriteList userId={account.id} />,
      label: t("Favorite Item"),
      tab: "favorite-item",
    },
    {
      value: (
        <ActivityDashboard Chart={false} userId={account.id} profile={true} />
      ),
      label: t("Activity"),
      tab: "activity",
    },
    {
      value: <Collections userId={account.id} />,
      label: t("Collections"),
      tab: "collections",
    },
    {
      value: <DashboardItem creatorId={account.id} />,
      label: t("Created Items"),
      tab: "created-items",
    },
    {
      value: <Made userId={account.id} />,
      label: t("Offer Made"),
      tab: "offer-made",
    },
    {
      value: <Recieve userId={account.id} />,
      label: t("Offer Recieved"),
      tab: "offer-recieved",
    },
    {
      value: <ActiveInactive userId={account.id} status={1} />,
      label: t("Active Listing"),
      tab: "active-listing",
    },
    {
      value: <ActiveInactive userId={account.id} status={2} />,
      label: t("Expired Listing"),
      tab: "expired-listing",
    },
  ];

  const handleSelected = (selected: any) => {
    setSelected(selected.tab);
    router.push(
      `/profile${router.query.account ? "/" + router.query.account : ""}?tab=${
        selected.tab
      }`
    );
  };

  return (
    <>
      <Banner imgSrc={account.banner_img} />

      <div className="section-top">
        {/* Profile Header section */}
        <div className="container mb-5">
          {!account.wallet_address ? (
            <Loading />
          ) : (
            <ProfileHeader account={account} me={me} />
          )}
        </div>

        <div className={classes.selectSection}>
          <Select
            classNamePrefix="profile"
            className={classes.select}
            isSearchable={false}
            name="Select"
            placeholder={t("Select")}
            id="sorting"
            instanceId="sorting"
            options={DropDownItemlist}
            // defaultValue={DropDownItemlist.find(
            //   (item) => item.tab === selected
            // )}
            value={DropDownItemlist.find((item) => item.tab === selected)}
            onChange={(el) => handleSelected(el)}
          />
        </div>

        {/* {JSON.stringify(selected)} */}

        {account.id && (
          <div
            className={
              selected === "ownednft" || "activity" ? "" : classes.contents
            }
          >
            {selected === "ownednft" ? (
              <OwnedNft ownerId={account.id} setting={setting}/>
            ) : selected === "favorite-item" ? (
              <FavouriteList userId={account.id} />
            ) : selected === "activity" ? (
              <ActivityDashboard
                Chart={false}
                userId={account.id}
                profile={true}
                setting={setting}
              />
            ) : selected === "collections" ? (
              <Collections userId={account.id} />
            ) : selected === "created-items" ? (
              <DashboardItem creatorId={account.id} />
            ) : selected === "offer-made" ? (
              <Made userId={account.id} />
            ) : selected === "offer-recieved" ? (
              <Recieve userId={account.id} />
            ) : selected === "active-listing" ? (
              <ActiveInactive userId={account.id} status={1} />
            ) : selected === "expired-listing" ? (
              <ActiveInactive userId={account.id} status={2} />
            ) : (
              <OwnedNft ownerId={account.id} />
            )}
          </div>
        )}
      </div>
    </>
  );
};
