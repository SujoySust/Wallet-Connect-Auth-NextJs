import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { ListGroup } from "components/ListGroup";
import { FiEdit2, FiList } from "react-icons/fi";
import { Banner } from "../../../components/Banner";
import { RcTooltip } from "../../../components/Tooltip/rcTooltip";
import { BLOCKCHAIN_STATUS_ACTIVE } from "../../../src/helpers/coreconstants";
import classes from "./CollectionDetailsTop.module.css";

export const CollectionDetailsTop = ({ collection, myCollection }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <>
      {myCollection && (
        <div className={classes.actionWrapper}>
          <div className="container">
            <div className={classes.actions}>
              <ListGroup hr={true}>
                <Link href={`/collections/edit/${collection.slug}`}>
                  <a className={`list-group-item `}>
                    <RcTooltip overlay={t("Edit")}>
                      <FiEdit2 />
                    </RcTooltip>
                  </a>
                </Link>
                <Link
                  href={`/collections/payouts/${collection.slug}?collectionid=${collection.id}`}
                >
                  <a className={`list-group-item `}>
                    <RcTooltip overlay={t("Creator Earnings")}>
                      <FiList />
                    </RcTooltip>
                  </a>
                </Link>{" "}
              </ListGroup>

              {collection.blockchain.status == BLOCKCHAIN_STATUS_ACTIVE ? (
                <Link href={`/assets/create?collectionId=${collection.id}`}>
                  <a className={`primary-btn ${classes.AddBtn}`}>
                    {t("Add Item")}
                  </a>
                </Link>
              ) : (
                <RcTooltip overlay={t("Blockchain is inactive.")}>
                  <a
                    className={`primary-btn text-white ${classes.disableLink}`}
                  >
                    {t("Add Item")}
                  </a>
                </RcTooltip>
              )}
            </div>
          </div>
        </div>
      )}

      <Banner imgSrc={collection.banner_image} />
    </>
  );
};
//lang ok
