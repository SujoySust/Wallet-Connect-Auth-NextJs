import { ImageItem } from "components/Images";
import useTranslation from "next-translate/useTranslation";
import {
  SETTINGS_SLUG_RESOURCE_SECTION_DESCRIPTION,
  SETTINGS_SLUG_RESOURCE_SECTION_ONE_DESCRIPTION,
  SETTINGS_SLUG_RESOURCE_SECTION_ONE_IMAGE,
  SETTINGS_SLUG_RESOURCE_SECTION_ONE_LINK,
  SETTINGS_SLUG_RESOURCE_SECTION_ONE_TITLE,
  SETTINGS_SLUG_RESOURCE_SECTION_THREE_DESCRIPTION,
  SETTINGS_SLUG_RESOURCE_SECTION_THREE_IMAGE,
  SETTINGS_SLUG_RESOURCE_SECTION_THREE_LINK,
  SETTINGS_SLUG_RESOURCE_SECTION_THREE_TITLE,
  SETTINGS_SLUG_RESOURCE_SECTION_TITLE,
  SETTINGS_SLUG_RESOURCE_SECTION_TWO_DESCRIPTION,
  SETTINGS_SLUG_RESOURCE_SECTION_TWO_IMAGE,
  SETTINGS_SLUG_RESOURCE_SECTION_TWO_LINK,
  SETTINGS_SLUG_RESOURCE_SECTION_TWO_TITLE,
} from "src/helpers/slugcontanst";
import classes from "./Resources.module.css";

const Resources = ({ homePageSettings }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const content = [
    {
      title:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_RESOURCE_SECTION_ONE_TITLE]) ||
        "lorem ipsum dolor sit amet",
      link:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_RESOURCE_SECTION_ONE_LINK]) ||
        "#",
      description:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_RESOURCE_SECTION_ONE_DESCRIPTION]) ||
        "Lorem ipsum dolor sit amet consectetur",
      image:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_RESOURCE_SECTION_ONE_IMAGE]) ||
        "https://opensea.io/blog/wp-content/uploads/2022/02/image-13.png",
    },
    {
      title:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_RESOURCE_SECTION_TWO_TITLE]) ||
        "lorem ipsum dolor sit amet",
      link:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_RESOURCE_SECTION_TWO_LINK]) ||
        "#",
      description:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_RESOURCE_SECTION_TWO_DESCRIPTION]) ||
        "Lorem ipsum dolor sit amet consectetur",
      image:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_RESOURCE_SECTION_TWO_IMAGE]) ||
        "https://opensea.io/blog/wp-content/uploads/2022/02/image-13.png",
    },
    {
      title:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_RESOURCE_SECTION_THREE_TITLE]) ||
        "lorem ipsum dolor sit amet",
      link:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_RESOURCE_SECTION_THREE_LINK]) ||
        "#",
      description:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_RESOURCE_SECTION_THREE_DESCRIPTION]) ||
        "Lorem ipsum dolor sit amet consectetur",
      image:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_RESOURCE_SECTION_THREE_IMAGE]) ||
        "https://opensea.io/blog/wp-content/uploads/2022/02/image-13.png",
    },
  ];

  return (
    <div className={"section-top " + classes.introduction}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title text-center mb-45">
              <h6 className="title mb-15">
                {(homePageSettings &&
                  homePageSettings[SETTINGS_SLUG_RESOURCE_SECTION_TITLE]) ||
                  t("Resources for getting started")}
              </h6>
              <p>
                {(homePageSettings &&
                  homePageSettings[
                    SETTINGS_SLUG_RESOURCE_SECTION_DESCRIPTION
                  ]) ||
                  t("Resources for getting started")}
              </p>
            </div>
          </div>
        </div>

        <div className={"row justify-content-center"}>
          {content.map((item, index) => (
            <div className="col-sm-6 col-lg-4 mb-5" key={index}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.content}
              >
                <div className={classes.contentImage}>
                  <ImageItem
                    src={item.image || "/assets/images/star.svg"}
                    className={classes.contentImage}
                  />
                </div>
                <div className={"p-4 " + classes.resourcesText}>
                  <h2 className="text-capitalize mb-3">{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
//lang ok
