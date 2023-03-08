import Link from "next/link";
import { absPath } from "../../../../src/helpers/functions";
import classes from "./Item.module.css";
import { FiMoreVertical } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../src/store";
import { OptionMenu } from "../../../../components/HUI/OptionMenu";
import useTranslation from "next-translate/useTranslation";
import { ImageItem } from "components/Images";
import { RcTooltip } from "components/Tooltip/rcTooltip";

export const Item = ({ item }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const totalItems = item?._count?.items;

  return (
    <>
      <article className={classes.singleAuthor}>
        <div className={classes.authorThumbnail}>
          <OptionMenu btnText={<FiMoreVertical aria-label="more options" />}>
            <div className={`option-list-group`}>
              <Link href={`/collections/edit/${item.slug}`}>
                <a className={"list-item " + classes.link}>
                  <i className="icon fas fa-edit"></i>
                  {t("Edit")}
                </a>
              </Link>
            </div>
          </OptionMenu>
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
            height={50}
            width={50}
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
            by{" "}
            <Link href="/profile">
              <a>
                {item.user?.id == userData?.id ? t("you") : item.user?.name}
              </a>
            </Link>
          </small>

          <p className={classes.description}>
            {t("Explore the ")}
            <Link href={absPath(`collections/${item.slug}`)}>
              <a>
                <strong>{item.name}</strong>
              </a>
            </Link>{" "}
            {t("collection")}
          </p>
          <small className={classes.itemCount}>
            {totalItems} {totalItems > 1 ? t("items") : t("item")}
          </small>
        </div>
      </article>
    </>
  );
};
//lang ok
