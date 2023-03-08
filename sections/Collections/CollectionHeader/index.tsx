import classes from "./CollectionHeader.module.css";
import { Info } from "./Info";
import { formatPriceK } from "../../../src/helpers/functions";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "../../../components/Modal";
import { ImageItem, ImageProfile } from "components/Images";
import { RcTooltip } from "components/Tooltip/rcTooltip";
import useTranslation from "next-translate/useTranslation";
import { COMMON_COIN_DECIMAL_VISUAL } from "src/helpers/coreconstants";

export function CollectionHeader({
  userData,
  socialLinks,
  singleCollection,
}: any) {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const collection = singleCollection?.collection;
  const nativeToken = singleCollection?.native_token;
  const floorPrice = singleCollection?.floor_price;
  const volumePrice = singleCollection?.volume;
  const ownerCount = singleCollection?.owner_count;
  // console.log(collection);
  // console.log(ownerCount);

  const [showLogo, setShowLogo] = useState(false);

  return (
    <>
      <div className={classes.logoWrapper}>
        <div className={classes.imgWrap}>
          <div className={classes.logoWrapperParent}>
            <ImageItem
              src={collection.logo || "/assets/images/star.svg"}
              alt={collection.name}
              className={classes.logo}
              onClick={() => setShowLogo(true)}
            />
          </div>
        </div>
      </div>
      <Info
        collection={collection}
        socialLinks={socialLinks}
        singleCollection={singleCollection}
      />
      <div className={classes.infoWrapper}>
        {/* Name */}
        <h2 className={classes.itemName}>{collection.name}</h2>

        <p className={classes.ownerName}>
          {t("Owned by")}{" "}
          <Link href={`/profile/${collection.user.username}`}>
            <a>
              {" "}
              {collection.user.wallet_address === userData.wallet_address
                ? t("you")
                : "@" + collection.user.username}
            </a>
          </Link>
        </p>

        <p className={classes.description}>{collection.description}</p>

        <div className={classes.list}>
          <button className={classes.item}>
            <span className={classes.amount}>
              {singleCollection?.itemCount || "---"}
            </span>
            <span className={classes.label}>
              {singleCollection?.itemCount > 1 ? t("items") : t("item")}
            </span>
          </button>

          <button className={classes.item}>
            <span className={classes.amount}>
              {singleCollection?.owner_count || "---"}
            </span>
            <span className={classes.label}>
              {singleCollection?.owner_count > 1
                ? t("Item Owners")
                : t("Item Owner")}
            </span>
          </button>

          <button className={classes.item}>
            <span className={classes.amount}>{collection?.royalties}%</span>
            <span className={classes.label}>{t("Royalty")}</span>
          </button>

          <button className={classes.item}>
            <span className={classes.amount}>
              <RcTooltip overlay={nativeToken?.token_symbol}>
                <img
                  src={nativeToken?.logo}
                  alt={nativeToken?.currency_symbol}
                  width={14}
                  className="mr-2"
                />
              </RcTooltip>

              {floorPrice?.native_price
                ? formatPriceK(
                    Number(floorPrice?.native_price),
                    COMMON_COIN_DECIMAL_VISUAL
                  )
                : "---"}
            </span>

            {/* <span className={classes.label}>
              ${formatPriceK(Number(floorPrice?.usd_price), 2)}
            </span> */}
            <span className={classes.label}>{t("Floor Price")}</span>
          </button>

          <button className={classes.item}>
            <span className={classes.amount}>
              <RcTooltip overlay={nativeToken?.token_symbol}>
                <img
                  src={nativeToken?.logo}
                  alt={nativeToken?.currency_symbol}
                  width={14}
                  className="mr-2"
                />
              </RcTooltip>

              {volumePrice?.native_price
                ? formatPriceK(
                    Number(volumePrice?.native_price),
                    COMMON_COIN_DECIMAL_VISUAL
                  )
                : "---"}
            </span>
            {/* <span className={classes.label}>
              ${formatPriceK(Number(volumePrice?.usd_price), 2)}
            </span> */}
            <span className={classes.label}>{t("Volume Traded")}</span>
          </button>
        </div>
      </div>

      <Modal show={showLogo} onClose={() => setShowLogo(false)}>
        <div className="text-center">
          <ImageProfile
            src={collection.logo}
            alt={collection.name}
            forModal={true}
          />
        </div>
      </Modal>
    </>
  );
}
//lang ok
