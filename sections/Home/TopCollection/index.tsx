import { useGetTopCollectionListQuery } from "../../../src/graphql/generated";
import { Card } from "../../../components/Collections/Card";
import useTranslation from "next-translate/useTranslation";
import Slider, { CustomArrowProps } from "react-slick";
import Link from "next/link";
import { LoadingCircles } from "../../../components/Loader/LoadingCircles";
import { useState } from "react";
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

const TopCollectionSection = ({ homePageSettings }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const [sort, setSort] = useState<any>({
    field: "id",
    direction: "desc",
  });

  const { data, isLoading, isSuccess, error } = useGetTopCollectionListQuery({
    limit: 9,
  });
  const totalCount = Number(data?.getTopCollectionList?.length ?? 0);
  const settings: any = {
    infinite: true,
    autoplay: true,
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
    <section className="top-collections-area section-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title text-center">
              <h2 className="title">
                {homePageSettings?.top_collection_title ??
                  t("Trending collections")}{" "}
              </h2>

              <p className="sub-title mb-0">
                {homePageSettings?.top_collection_description ??
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
            <Slider {...settings}>
              {data?.getTopCollectionList?.map((item: any, index: number) => (
                <div
                  key={item}
                  className="px-5 d-flex justify-content-center align-items-center"
                >
                  <Card key={index} item={item} widthValue={55} />
                </div>
              ))}
            </Slider>

            <div className="col-lg-12 text-center mt-5">
              <Link href="/marketplace">
                <a className="primary-btn mt-5">{t("Show more")}</a>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TopCollectionSection;
//lang ok
