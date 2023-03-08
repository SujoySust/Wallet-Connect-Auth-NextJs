import useTranslation from "next-translate/useTranslation";
import { CreatorEarningsSection } from "sections/Collections/CreatorEarnings";
import { TabHeader } from "../TabHeader";

export const EarningsSettings = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <TabHeader title={t("Creator Earnings")} />
      <CreatorEarningsSection profile={true} />
    </>
  );
};
//lang ok
