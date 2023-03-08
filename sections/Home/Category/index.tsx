import { useGetCategoriesQuery } from "../../../src/graphql/generated";
import Slider, { CustomArrowProps } from "react-slick";
import Link from "next/link";

import classes from "./Category.module.css";
import { SliderSection } from "./Slider";
import useTranslation from "next-translate/useTranslation";
import {
  SETTINGS_SLUG_CATEGORY_DESCRIPTION,
  SETTINGS_SLUG_CATEGORY_TITLE,
} from "src/helpers/slugcontanst";
import { SlickArrowLeft, SlickArrowRight } from "components/Slider";
import { LoadingCircles } from "components/Loader/LoadingCircles";

const CategorySection = ({ homePageSettings }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  // remove status after test
  const { data, isLoading, isSuccess, error } = useGetCategoriesQuery({
    status: 1,
  });
  const totalItems = Number(data?.getCategories?.length ?? 0);

  const sliderSettings: any = {
    infinite: true,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 3000,
    dots: true,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    // @ts-ignore
    slidesToShow: totalItems < 3 ? totalItems : 3,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className={"catagory-area  " + classes.mainSection}>
      {/* Main Content  */}
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title text-center">
              <h2 className="title">
                {(homePageSettings &&
                  homePageSettings[SETTINGS_SLUG_CATEGORY_TITLE]) ||
                  t("Explore By Categories")}
              </h2>
              <p className="sub-title mb-0">
                {(homePageSettings &&
                  homePageSettings[SETTINGS_SLUG_CATEGORY_DESCRIPTION]) ||
                  t(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo."
                  )}
              </p>
            </div>
          </div>
        </div>

        {/* Slider */}

        {isLoading && (
          <div className="text-center">
            <LoadingCircles />
          </div>
        )}

        {isSuccess && totalItems === 0 ? (
          <div className="text-center">{t("No items to display")}</div>
        ) : (
          <>
            <div className="row">
              <div className="col-12">
                <SliderSection
                  settings={sliderSettings}
                  data={data?.getCategories}
                  totalItems={totalItems}
                />
              </div>

              <div className="col-lg-12 text-center mt-25">
                <Link href="/marketplace">
                  <a className="primary-btn mt-5">{t("Explore marketplace")}</a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
