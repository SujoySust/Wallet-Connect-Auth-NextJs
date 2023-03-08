import classes from "./Hero.module.css";
import useTranslation from "next-translate/useTranslation";
import { useWeb3React } from "@web3-react/core";

const HeroBannerSection = () => {
  const { active } = useWeb3React();
  const { t } = useTranslation("common");

  return (
    <div
      className={classes.heroBanner}
      style={{
        background: `url(${
          "/assets/images/theme_image.webp"
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
                  {t("Welcome!")}
                </h2>

                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur rerum laboriosam explicabo deleniti optio. Eligendi, exercitationem assumenda impedit ipsum unde vero fuga. Excepturi facere odit et, totam quo non doloribus.
                </p>
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
