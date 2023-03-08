import classes from "./ActivityEventTitle.module.css";
import { FiShoppingCart, FiTag } from "react-icons/fi";
import { itemEvents } from "src/helpers/corearray";
import { ImCross } from "react-icons/im";
import { GiThorHammer } from "react-icons/gi";
import {
  ITEM_EVENT_TYPE_BIDS,
  ITEM_EVENT_TYPE_BID_CANCEL,
  ITEM_EVENT_TYPE_BUY_OFFERS,
  ITEM_EVENT_TYPE_BUY_OFFER_CANCEL,
  ITEM_EVENT_TYPE_LISTINGS,
  ITEM_EVENT_TYPE_LISTING_CANCEL,
  ITEM_EVENT_TYPE_MINT,
  ITEM_EVENT_TYPE_SALES,
  ITEM_EVENT_TYPE_TRANSFERS,
  ITEM_MINT_STATUS_FAILED,
  ITEM_MINT_STATUS_IN_PROGRESS,
} from "src/helpers/coreconstants";
import { clearTrailingSlash } from "src/helpers/functions";
import { IoHandRightOutline } from "react-icons/io5";
import { BsArrowLeftRight, BsEmojiNeutral, BsCheckLg } from "react-icons/bs";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import useTranslation from "next-translate/useTranslation";

interface ActivityEventTitleType {
  hash: string | null;
  url?: string;
  event: number;
  status: number;
}

export const ActivityEventTitle = ({
  hash,
  url,
  event,
  status,
}: ActivityEventTitleType) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  return (
    <span>
      {event === ITEM_EVENT_TYPE_MINT ? (
        status === ITEM_MINT_STATUS_FAILED ? (
          <span
            className={status === ITEM_MINT_STATUS_FAILED ? "text-danger" : ""}
            title={
              status === ITEM_MINT_STATUS_FAILED ? t("Minting Failed!") : ""
            }
          >
            <ImCross className={classes.icon} />
          </span>
        ) : (
          <BsCheckLg className={classes.icon} />
        )
      ) : event === ITEM_EVENT_TYPE_LISTINGS ? (
        <FiTag className={classes.icon} />
      ) : event === ITEM_EVENT_TYPE_SALES ? (
        <FiShoppingCart className={classes.icon} />
      ) : event === ITEM_EVENT_TYPE_BUY_OFFERS ? (
        <IoHandRightOutline className={classes.icon} />
      ) : event === ITEM_EVENT_TYPE_BIDS ? (
        <GiThorHammer className={classes.icon} />
      ) : event === ITEM_EVENT_TYPE_TRANSFERS ? (
        <BsArrowLeftRight className={classes.icon} />
      ) : event === ITEM_EVENT_TYPE_LISTING_CANCEL ? (
        <FiTag className={"text-danger " + classes.icon} />
      ) : event === ITEM_EVENT_TYPE_BUY_OFFER_CANCEL ? (
        <BsEmojiNeutral className={"text-danger " + classes.icon} />
      ) : event === ITEM_EVENT_TYPE_BID_CANCEL ? (
        <GiThorHammer className={"text-danger " + classes.icon} />
      ) : null}

      {hash && url ? (
        <a
          href={`${clearTrailingSlash(url)}/tx/${hash}`}
          target="_blank"
          rel="noreferrer"
        >
          {t(itemEvents[event])}
        </a>
      ) : (
        <span
          title={
            (event === ITEM_EVENT_TYPE_MINT && status) ===
            ITEM_MINT_STATUS_FAILED
              ? t("Minting Failed!")
              : ""
          }
        >
          {t(itemEvents[event])}
        </span>
      )}

      {/* in progress  */}
      {status === ITEM_MINT_STATUS_IN_PROGRESS && <LoadingCircles />}
    </span>
  );
};
