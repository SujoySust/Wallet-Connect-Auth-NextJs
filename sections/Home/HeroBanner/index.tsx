import classes from "./Hero.module.css";
import Link from "next/link";
import { absPath } from "../../../src/helpers/functions";
import useTranslation from "next-translate/useTranslation";
import { useWeb3React } from "@web3-react/core";
import {
  SETTINGS_SLUG_BANNER_DESCRIPTION,
  SETTINGS_SLUG_BANNER_IMAGE,
  SETTINGS_SLUG_BANNER_TITLE,
} from "src/helpers/slugcontanst";
import { walletConnected } from "hooks/useWallet";

const HeroBannerSection = ({ homePageSettings }: any) => {
  const { active } = useWeb3React();
  const { t } = useTranslation("common");

  return (
    <div
      className={classes.heroBanner}
      style={{
        background: `url(${
          (homePageSettings && homePageSettings[SETTINGS_SLUG_BANNER_IMAGE]) ||
          "/assets/images/hero-banner-bg.jpg"
        }) no-repeat center center/cover`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div
              className={
                "hero-banner-info text-center text-lg-left " +
                classes.heroBannerInfo
              }
            >
              <div className={classes.heroText}>
                <h2>
                  {(homePageSettings &&
                    homePageSettings[SETTINGS_SLUG_BANNER_TITLE]) ||
                    t("Welcome!")}
                </h2>

                <p>
                  {(homePageSettings &&
                    homePageSettings[SETTINGS_SLUG_BANNER_DESCRIPTION]) ||
                    t(
                      "The NFT can be associated with particular digital files such as photos, videos, audio, or any physical asset. It will be the certification of ownership of the asset."
                    )}
                </p>
              </div>

              <div>
                <Link href={absPath("marketplace")}>
                  <a className={classes.bannerBtn}>{t("Explore")}</a>
                </Link>

                {walletConnected(active) && (
                  <Link href={absPath("collections/create")}>
                    <a
                      className={
                        classes.bannerBtn + " " + classes.bannerBtnFilled
                      }
                    >
                      {t("Create")}
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerSection;
//lang ok
