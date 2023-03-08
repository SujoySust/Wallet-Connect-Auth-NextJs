import Link from "next/link";
import classes from "../Category.module.css";
import Slider from "react-slick";
import { absPath } from "../../../../src/helpers/functions";
import { ImageItem } from "components/Images";

export const SliderSection = (props: any) => {
  const { settings, data } = props;

  return (
    <Slider {...settings}>
      {data?.length
        ? data.map((cat: any, idx: number) => {
            return (
              <div
                key={cat.id}
                className={`${classes.wrapper}  ${
                  settings.slidesToShow === 2 && idx === 0
                    ? classes.wrapperFirstItem
                    : settings.slidesToShow === 2 && idx === 1
                    ? classes.wrapperSecondItem
                    : ""
                }`}
              >
                <div className={classes.categoryCard}>
                  <div className={classes.catagoryThumbnail}>
                    <Link
                      href={{
                        pathname: absPath("marketplace"),
                        query: {
                          tab: cat.title.toLowerCase(),
                        },
                      }}
                    >
                      <a>
                        {/* <ImageItem
                          src={cat.image}
                          alt={cat.title}
                          // width={200}
                          // height={200}
                          layout="responsive"
                        /> */}
                        <ImageItem
                          src={cat.image}
                          alt={cat.title}
                          height={40}
                          layout="responsive"
                        />
                      </a>
                    </Link>
                  </div>

                  <div className={classes.catagoryInfo}>
                    <h3 className={classes.categoryTitle + " overflow-text"}>
                      <Link
                        href={{
                          pathname: absPath("marketplace"),
                          query: {
                            tab: cat.title.toLowerCase(),
                          },
                        }}
                      >
                        {cat.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </Slider>
  );
};
