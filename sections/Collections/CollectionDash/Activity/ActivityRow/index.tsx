import classes from "../Activity.module.css";
import moment from "moment";
import Link from "next/link";
import { RcTooltip } from "../../../../../components/Tooltip/rcTooltip";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { ActivityEventTitle } from "components/ActivityEventTitle";
import useTranslation from "next-translate/useTranslation";
import { ImageItem } from "components/Images";

export const ActivityRow = ({ data }: any) => {
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const { t } = useTranslation("common");
  // console.log(data, "data");
  return (
    <tr className={classes.row}>
      <td className={classes.event}>
        <ActivityEventTitle
          hash={data.hash}
          // url={item.collection.blockchain.explorer_url}
          event={data.event}
          status={data.status}
        />
      </td>

      <td className={classes.item}>
        <div className={classes.itemImage}>
          {/* <img
            src={data.item.thumbnail_path}
            alt={data.item.name}
            width={48}
            height={48}
          />
           */}
          <ImageItem
            src={data.item.thumbnail_path || "/assets/images/star.svg"}
            alt={data.item.name}
            layout="fixed"
          />
        </div>

        <h4 className={classes.itemName}>
          <Link href={`/assets/${data.item.slug}`}>
            <a>{data.item.name}</a>
          </Link>
        </h4>
      </td>

      <td className={classes.prices}>
        <h4>
          {data.payment_token && (
            <RcTooltip overlay={data?.payment_token?.token_symbol}>
              {/* <img
                src={data?.payment_token?.logo || "/assets/images/star.svg"}
                alt={data?.payment_token?.token_symbol}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevent looping
                  currentTarget.src = "/assets/images/star.svg";
                }}
                width={16}
                height={16}
              /> */}
              <ImageItem
                src={data?.payment_token?.logo || "/assets/images/star.svg"}
                alt={data?.payment_token?.token_symbol}
                layout="fixed"
                width={22}
                height={22}
              />
            </RcTooltip>
          )}
          <span>{data.amount ?? "--"}</span>
        </h4>

        {/* <p>$ {(data.total_amount * converRate).toFixed(2)}</p> */}
      </td>

      <td>
        {data.from?.wallet_address === userData?.wallet_address ? (
          <Link href={`/profile/${data.from?.username}`}>
            <a className={classes.username}>{t("You")}</a>
          </Link>
        ) : data.from?.wallet_address ? (
          <Link href={`/profile/${data.from?.username}`}>
            <a className={classes.username}>{data.from?.username}</a>
          </Link>
        ) : (
          "---"
        )}
      </td>

      <td>
        {data.to?.wallet_address === userData?.wallet_address ? (
          <Link href={`/profile/${data.to?.username}`}>
            <a className={classes.username}>{t("You")}</a>
          </Link>
        ) : data.to?.wallet_address ? (
          <Link href={`/profile/${data.to?.username}`}>
            <a className={classes.username}>{data?.to?.username}</a>
          </Link>
        ) : (
          "---"
        )}
      </td>

      <td>
        <RcTooltip overlay={moment(data.created_at).format("llll")}>
          {moment(data.created_at).fromNow()}
          {/* <IoOpenOutline /> */}
        </RcTooltip>
      </td>
    </tr>
  );
};
//lang ok
