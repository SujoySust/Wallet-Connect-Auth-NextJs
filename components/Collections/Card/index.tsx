import Link from "next/link";
import classes from "./Card.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/store";
import { absPath, collapseAddress } from "../../../src/helpers/functions";
import useTranslation from "next-translate/useTranslation";
import { ImageItem } from "components/Images";
import { RcTooltip } from "components/Tooltip/rcTooltip";

export const Card = ({ item, fixedWidth, widthValue }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const totalItems = item?._count?.items;

  return (
    <div
      className={
        fixedWidth && fixedWidth === true && !widthValue && classes.fixedWidth
      }
      style={{ width: widthValue && `${widthValue}rem` }}
    >
      <article className={classes.singleAuthor}>
        <div className={classes.authorThumbnail}>
          <Link href={absPath(`collections/${item.slug}`)}>
            <a>
              <ImageItem
                src={item?.feature_image ? item?.feature_image : item?.logo}
                alt={item.name}
              />
            </a>
          </Link>
        </div>
        <div className={classes.content}>
          <ImageItem
            src={item?.logo || "/assets/images/star.svg"}
            alt={item.name}
            className={classes.roundImg}
          />
        </div>

        <div className={classes.authorInfo}>
          <RcTooltip overlay={item.name}>
            <h3 className={classes.authorName + " overflow-text"}>
              <Link href={absPath(`collections/${item.slug}`)}>
                <a>{item.name}</a>
              </Link>
            </h3>
          </RcTooltip>

          <small className="mb-2 mt-0">
            {t("by")}{" "}
            <Link
              href={`/profile/${
                item.user.username || item.user.wallet_address
              }`}
            >
              <a>
                {item.user?.id == userData?.id
                  ? t("you")
                  : item.user.username ||
                    collapseAddress(item.user.wallet_address)}
              </a>
            </Link>
          </small>

          <small className={classes.itemCount}>
            {totalItems} {totalItems > 1 ? t("items") : t("item")}
          </small>
        </div>
      </article>
    </div>
  );
};
//lang ok
