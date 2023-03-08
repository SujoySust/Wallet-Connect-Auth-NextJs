import { RcTooltip } from "components/Tooltip/rcTooltip";
import { COMMON_COIN_DECIMAL_VISUAL } from "src/helpers/coreconstants";
import { formatPriceK } from "src/helpers/functions";
import classes from "../../sections/Ranking/RankingList/RankingList.module.css";

export const RankingVolume = ({
  volume_in_native,
  volume_in_usd,
  volume_percent,
  native_token,
}: any) => {
  return (
    <td className={"border-0 " + classes.itemImage}>
      <RcTooltip overlay={native_token?.token_symbol}>
        <img
          src={native_token?.logo}
          alt={native_token?.token_symbol}
          width={13}
          className="mr-3"
        />
      </RcTooltip>
      <strong>
        {volume_in_native
          ? formatPriceK(volume_in_native, COMMON_COIN_DECIMAL_VISUAL)
          : "---"}
      </strong>

      <br />

      <span className="text-center">
        ${volume_in_usd ? formatPriceK(volume_in_usd) : "---"}
      </span>
      <span
        className={`text-center ml-2 ${
          volume_percent
            ? volume_percent > 0
              ? "text-success"
              : "text-danger"
            : ""
        }`}
      >
        {volume_percent
          ? (volume_percent > 0
              ? "+" + volume_percent.toFixed(2)
              : volume_percent.toFixed(2)) + `%`
          : `---`}
      </span>
    </td>
  );
};
