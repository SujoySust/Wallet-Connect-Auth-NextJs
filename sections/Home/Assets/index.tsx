import React from "react";
import { ItemCard } from "components/ItemCard";
import Slider, { CustomArrowProps } from "react-slick";
import { useGetTrendingItemListQuery } from "src/graphql/generated";
import Link from "next/link";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import {
  SETTINGS_SLUG_ASSET_DESCRIPTION,
  SETTINGS_SLUG_ASSET_TITLE,
} from "src/helpers/slugcontanst";
import { SlickArrowLeft, SlickArrowRight } from "components/Slider";

export const HomeAsset = ({ homePageSettings }: any) => {
  // for drawer
  const { t } = useTranslation("common");
  // get data of collections in paginate
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const {
    data: assets,
    isLoading,
    error,
    isSuccess,
  } = useGetTrendingItemListQuery({
    limit: 9,
    viewer_id: userData?.id,
  });

  const totalItems = Number(assets?.getTrendingItemList?.length ?? 0);

  const settings: any = {
    infinite: true,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 3000,
    dots: true,
    //@ts-ignore
    slidesToShow: totalItems < 3 ? totalItems : 3,
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
    <section className="top-collections-area section-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title text-center">
              <h2 className="title">
                {(homePageSettings &&
                  homePageSettings[SETTINGS_SLUG_ASSET_TITLE]) ||
                  t("Trending assets")}{" "}
              </h2>
              <p className="sub-title mb-0">
                {(homePageSettings &&
                  homePageSettings[SETTINGS_SLUG_ASSET_DESCRIPTION]) ||
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

        {totalItems === 0 ? (
          <div className="text-center">{t("No items to display")}</div>
        ) : (
          <>
            <div className="row">
              <div className="col-12">
                <Slider {...settings}>
                  {assets?.getTrendingItemList?.map((item) => {
                    return (
                      <div
                        className="px-5 d-flex justify-content-center align-items-center"
                        id="item-card"
                        key={item.id}
                      >
                        <ItemCard
                          item={item}
                          fixedWidth={false}
                          widthValue={55}
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>

              {totalItems !== 0 && (
                <div className="col-lg-12 text-center mt-5">
                  <Link href="/assets">
                    <a className="primary-btn mt-5">{t("Show more")}</a>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
