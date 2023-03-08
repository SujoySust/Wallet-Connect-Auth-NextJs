import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { SETTINGS_SLUG_VIDEO_SECTION_DESCTIPTION, SETTINGS_SLUG_VIDEO_SECTION_TITLE, SETTINGS_SLUG_VIDEO_URL } from "src/helpers/slugcontanst";
import classes from "./introduction.module.css";

const Introduction = ({ homePageSettings }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  return (
    <div className={"section " + classes.introduction}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title text-center mb-45">
              <h2 className="title mb-15">
              {homePageSettings && homePageSettings[SETTINGS_SLUG_VIDEO_SECTION_TITLE] || t("Meet NFT")}
              </h2>
              <p className="sub-title mb-0">
              {homePageSettings && homePageSettings[SETTINGS_SLUG_VIDEO_SECTION_DESCTIPTION] ||
                  "Lorem ipsum dolor sit amet"}
              </p>
            </div>
          </div>
        </div>
        <div className={"text-center " + classes.iframe}>
          <iframe
            width="100%"
            height="100%"
            src={
              homePageSettings && homePageSettings[SETTINGS_SLUG_VIDEO_URL] ||
              "https://www.youtube.com/embed/AQlT5naScqk"
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className="col-lg-12 text-center mt-60">
          <Link href="/marketplace">
            <a className="primary-btn mt-5">{t("Explore marketplace")}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
//lang ok
