import classes from "./Settings.module.css";
import { Tab } from "@headlessui/react";
import { BiUserCircle, BiShieldQuarter } from "react-icons/bi";
import { FiBell, FiDollarSign } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { ProfileContent } from "./Profile";
import { NotificationsSettings } from "./Notifications";
import { OffersSettings } from "./Offers";
import { AccountSupportSettings } from "./AccountSupport";
import { EarningsSettings } from "./Earnings";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
export const SettingsContent = ({ userData }: any) => {
  const router = useRouter();
  const { tab } = router.query;
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const TabContents = [
    {
      icon: <BiUserCircle />,
      title: t("Profile"),
      tab: t("profile"),
      content: <ProfileContent userData={userData} />,
    },
    {
      icon: <FiBell />,
      title: t("Notifications"),
      tab: t("notifications"),
      content: <NotificationsSettings userData={userData} />,
    },
    // {
    //   icon: <MdOutlineLocalOffer />,
    //   title: "Offers",
    //   tab: "offers",
    //   content: <OffersSettings />,
    // },
    {
      icon: <BiShieldQuarter />,
      title: t("Account Support"),
      tab: t("account-support"),
      content: <AccountSupportSettings />,
    },
    {
      icon: <FiDollarSign />,
      title: t("Earnings"),
      tab: t("earnings"),
      content: <EarningsSettings />,
    },
  ];

  return (
    <div className={classes.SettingsCustomContainer}>
      <Tab.Group
        defaultIndex={tab ? TabContents.findIndex((x) => x.tab === tab) : 0}
        as="div"
        className={`section ${classes.wrapper}`}
        //@ts-ignore
        onChange={(e: any, index: any) => {
          router.push(`/settings?tab=${TabContents[e].tab}`);
        }}
      >
        <Tab.List as="div" className={classes.sidebar}>
          <span className={classes.label}>{t("Settings")}</span>

          <div className={classes.buttonList}>
            {TabContents.map((el) => (
              <Tab
                key={el.title}
                className={({ selected }: any) =>
                  selected
                    ? classes.buttonListButton + " " + classes.selected
                    : classes.buttonListButton + " "
                }
              >
                <span className={classes.icon}>{el.icon}</span>
                <span className={classes.title}>{el.title}</span>
              </Tab>
            ))}
          </div>
        </Tab.List>

        <Tab.Panels as="div" className={classes.contents}>
          {TabContents.map((el) => (
            <Tab.Panel key={el.title}>{el.content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
