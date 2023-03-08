import classes from "./TokenInput.module.css";
import { formatPriceK } from "src/helpers/functions";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import useTranslation from "next-translate/useTranslation";
import { COMMON_COIN_DECIMAL_VISUAL, MIN_COIN_INPUT_AMOUNT } from "src/helpers/coreconstants";

export const TokenInput = ({
  token,
  idx,
  forPlaceBid = false,
  tokenBalance,
  setTokenBalance,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <div>
      {/* info & balance */}
      {!forPlaceBid && (
        <div className={classes.headerInfo}>
          <h3>{idx == 0 ? "From" : "To"}</h3>

          <p>
            {token.loading ? (
              <LoadingCircles />
            ) : (
              <>
                {t("Balance")}:{" "}
                {token.balance &&
                  formatPriceK(token.balance, COMMON_COIN_DECIMAL_VISUAL)}{" "}
                {token?.token_symbol} (
                {token.balance * token.usd_rate === 0
                  ? "---"
                  : "$" + formatPriceK(token.balance * token.usd_rate)}{" "}
                USD)
              </>
            )}
          </p>
        </div>
      )}

      {/* input */}
      <div className={classes.inputWrapper}>
        <div className={classes.inputWrapperLeft}>
          <img
            src={token?.logo}
            alt={token?.token_symbol}
            width={16}
            height={16}
          />

          <div>
            <h4>{token?.token_symbol}</h4>
            {!forPlaceBid && <span>{token?.blockchain.network_name}</span>}
          </div>
        </div>

        <input
          type="number"
          name="token-input"
          id="token-input"
          placeholder="Amount"
          className={classes.input}
          min={0}
          step={MIN_COIN_INPUT_AMOUNT}
          disabled={idx !== 0}
          defaultValue={tokenBalance}
          onChange={(e: any) => setTokenBalance(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
//lang ok
