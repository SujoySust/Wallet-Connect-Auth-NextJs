import useTranslation from "next-translate/useTranslation";
import MetaHeadSection from "../../../components/Meta/MetaHeadSection";
import { TabHeader } from "../TabHeader";

export const OffersSettings = () => {
  const { t } = useTranslation("common");

  const metadata = {
    page_title: t("Notifications Settings"),
    name: t("Name"),
    description: t("Name"),
  };

  return (
    <>
      <MetaHeadSection metadata={metadata} />

      <TabHeader
        title="Offers Settings"
        url="/profile"
        btnText="View my offers"
      />
    </>
  );
};
//lang ok
