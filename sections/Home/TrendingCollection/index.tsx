import { useGetTrendingCollectionListQuery } from "../../../src/graphql/generated";
import useTranslation from "next-translate/useTranslation";
import Slider, { CustomArrowProps } from "react-slick";
import Link from "next/link";
import { LoadingCircles } from "../../../components/Loader/LoadingCircles";
import { useState } from "react";
import { CardRaw } from "components/Collections/Card/CardRaw";
import {
  SETTINGS_SLUG_HOME_COLLECTION_DESCRIPTION,
  SETTINGS_SLUG_HOME_COLLECTION_TITLE,
} from "src/helpers/slugcontanst";
const SlickArrowLeft = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <i
    {...props}
    className={
      "slick-prev slick-arrow fas fa-angle-left" +
      (currentSlide === 0 ? " slick-disabled" : "")
    }
  />
);

const SlickArrowRight = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <i
    {...props}
    className={
      "slick-next slick-arrow fas fa-angle-right " +
      (currentSlide === slideCount ?? 1 - 1 ? " slick-disabled" : "")
    }
  />
);

const TrendingCollectionSection = ({ homePageSettings }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { data, isLoading, isSuccess, error } =
    useGetTrendingCollectionListQuery({
      limit: 9,
    });
  const totalCount = Number(data?.getTrendingCollectionList?.length ?? 0);
  const settings: any = {
    infinite: true,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 3000,
    dots: true,
    //@ts-ignore
    slidesToShow: totalCount < 3 ? totalCount : 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        dots: false,

        settings: {
          dots: false,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="top-collections-area section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title text-center">
              <h2 className="title">
                {(homePageSettings &&
                  homePageSettings[SETTINGS_SLUG_HOME_COLLECTION_TITLE]) ||
                  t("Trending collections")}{" "}
              </h2>

              <p className="sub-title mb-0">
                {(homePageSettings &&
                  homePageSettings[
                    SETTINGS_SLUG_HOME_COLLECTION_DESCRIPTION
                  ]) ||
                  t(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis Ut ut felis congue nisl hendrerit commodo."
                  )}
              </p>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="text-center">
            <LoadingCircles />
          </div>
        )}

        {error && <div className="text-center">{t("No items to display")}</div>}

        {isSuccess && totalCount === 0 ? (
          <div className="text-center">{t("No items to display")}</div>
        ) : (
          <>
            <div className="row">
              <div className="col-12" style={{ width: "100%" }}>
                <Slider {...settings}>
                  {data?.getTrendingCollectionList?.map(
                    (item: any, index: number) => (
                      <div
                        key={item.id}
                        className="px-5 d-flex justify-content-center align-items-center"
                      >
                        <CardRaw
                          key={index}
                          fixedWidth={true}
                          item={item}
                          widthValue={32}
                        />
                      </div>
                    )
                  )}
                </Slider>
              </div>
              <div className="col-lg-12 text-center mt-5">
                <Link href="/marketplace">
                  <a className="primary-btn mt-5">{t("Show more")}</a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TrendingCollectionSection;
//lang ok
