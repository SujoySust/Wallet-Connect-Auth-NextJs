import { ProfileHeader } from "./ProfileHeader";
import { Loading } from "../../components/Loader/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store";
import { Banner } from "../../components/Banner";
import useTranslation from "next-translate/useTranslation";

export const ProfileSection = ({ account, setting }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  // check it's me or not
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const me = userData.wallet_address === account.wallet_address;

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
      </div>
    </>
  );
};
