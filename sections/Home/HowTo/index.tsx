import { ImageItem } from "components/Images";
import useTranslation from "next-translate/useTranslation";
import { imageAsset } from "src/helpers/functions";
import {
  SETTINGS_SLUG_INSTRUCTION_ADD_NFTS,
  SETTINGS_SLUG_INSTRUCTION_CREATE_COLLECTION,
  SETTINGS_SLUG_INSTRUCTION_IMAGE,
  SETTINGS_SLUG_INSTRUCTION_LIST_FOR_SALE,
  SETTINGS_SLUG_INSTRUCTION_SECTION_DESCRIPTION,
  SETTINGS_SLUG_INSTRUCTION_SECTION_TITLE,
  SETTINGS_SLUG_INSTRUCTION_SETUP_WALLET,
} from "src/helpers/slugcontanst";
import classes from "./HowTo.module.css";
import { Item } from "./Item";

const HowToUseSection = ({ homePageSettings }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const HowToItems = [
    {
      id: "item001",
      icon: "process-wallet.svg",
      title: t("Set up your wallet"),
      subtitle:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_INSTRUCTION_SETUP_WALLET]) ||
        t(
          "It is a long established fact reader will be distracted by the content ofpage when looking at its layout."
        ),
    },
    {
      id: "item002",
      icon: "creative-process.svg",
      title: t("Create your collection"),
      subtitle:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_INSTRUCTION_CREATE_COLLECTION]) ||
        t(
          "It is a long established fact reader will be distracted by the content ofpage when looking at its layout."
        ),
    },
    {
      id: "item003",
      icon: "add.svg",
      title: t("Add your nfts"),
      subtitle:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_INSTRUCTION_ADD_NFTS]) ||
        t(
          "It is a long established fact reader will be distracted by the content ofpage when looking at its layout."
        ),
    },
    {
      id: "item004",
      icon: "clipboard.svg",
      title: t("List them for sale"),
      subtitle:
        (homePageSettings &&
          homePageSettings[SETTINGS_SLUG_INSTRUCTION_LIST_FOR_SALE]) ||
        t(
          "It is a long established fact reader will be distracted by the content ofpage when looking at its layout."
        ),
    },
  ];
  return (
    <section className={"section-top " + classes.howTo}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title text-center mb-45">
              <h2 className="title mb-15">
                {(homePageSettings &&
                  homePageSettings[SETTINGS_SLUG_INSTRUCTION_SECTION_TITLE]) ||
                  t("Create & sell your NFT")}
              </h2>
              <p className="sub-title mb-0">
                {(homePageSettings &&
                  homePageSettings[
                    SETTINGS_SLUG_INSTRUCTION_SECTION_DESCRIPTION
                  ]) ||
                  t(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sedquis accumsan nisi Ut ut felis congue nisl hendrerit commodo"
                  )}
              </p>
            </div>
          </div>
        </div>

        <div className={classes.howToLeft}>
          <div className={classes.useImgWrap}>
            <ImageItem
              src={
                (homePageSettings &&
                  homePageSettings[SETTINGS_SLUG_INSTRUCTION_IMAGE]) ||
                imageAsset("assets/images/use-img.png")
              }
              className={"image-one " + classes.thumbnailImg}
              alt={t("how to use")}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 offset-lg-4">
            <div className="process-area">
              <div className="row">
                {HowToItems.map((el) => (
                  <Item key={el.id} data={el} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
