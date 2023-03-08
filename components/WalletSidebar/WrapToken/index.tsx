import classes from "./WrapToken.module.css";
import useBalance from "../../../hooks/useBalance";
import useTransaction from "../../../hooks/useTransaction";
import { InputError } from "../../InputField";
import { useEffect, useState } from "react";
import { LoadingContent } from "../../Loader/LoadingContent";
import { SuccessContent, SuccessContentButton } from "./SuccessContent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { TokenInput } from "./TokenInput";
import useTranslation from "next-translate/useTranslation";
import { FiRefreshCcw } from "react-icons/fi";
import { RcTooltip } from "components/Tooltip/rcTooltip";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { setShowSidebar } from "src/store/slices/walletDrawerSlice";

export const WrapToken = ({ wrap, setWrap, setShowCloseBtn, onClose }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { nativeToken, wrapToken } = useSelector(
    (state: RootState) => state.paymentTokens
  );

  const dispatch = useDispatch();

  // balance to transfer
  const { balanceIsLoading, balance }: any = useBalance(nativeToken);
  const { balance: wrapBalance }: any = useBalance(wrapToken);

  const [tokenBalance, setTokenBalance] = useState("");
  const [balanceError, setBalanceError] = useState<any>(false);

  // error message
  useEffect(() => {
    if (wrap && Number(tokenBalance) > Number(balance)) {
      setBalanceError(
        t("You do not have enough funds to transfer. You have ") +
          ` ${balance} ${nativeToken && nativeToken.token_symbol}.`
      );
    } else if (!wrap && Number(tokenBalance) > Number(wrapBalance)) {
      setBalanceError(
        t("You do not have enough funds to transfer. You have ") +
          ` ${wrapBalance} ${wrapToken && wrapToken.token_symbol}.`
      );
    } else {
      setBalanceError(false);
    }
  }, [balance, tokenBalance, wrap]);

  const {
    transactionIsLoading,
    transactionIsSuccess,
    transactionDeposit,
    transactionWithdraw,
  } = useTransaction(wrapToken);

  const [disableButton, setDisableButton] = useState(false);

  // form validity
  const formIsValid =
    // @ts-ignore
    tokenBalance !== "" && tokenBalance !== Number(0) && !balanceError;

  const handleTransaction = async () => {
    setDisableButton(true);
    setShowCloseBtn(false);

    try {
      wrap
        ? await transactionDeposit(String(tokenBalance),setShowCloseBtn)
        : await transactionWithdraw(String(tokenBalance),setShowCloseBtn);
      setDisableButton(false);
    } catch (err) {
      setDisableButton(false);
      setShowCloseBtn(true);
    }
  };

  const ToggleWrapButton = () => (
    <div className="d-flex justify-content-end">
      <button
        type="button"
        className={classes.toggleWrapBtn}
        aria-label={wrap ? "unwrap" : "wrap"}
        disabled={disableButton}
        onClick={() => setWrap(!wrap)}
      >
        <RcTooltip overlay={wrap ? "unwrap" : "wrap"}>
          <FiRefreshCcw aria-label={wrap ? "unwrap" : "wrap"} />
        </RcTooltip>
      </button>
    </div>
  );

  const handleTransactionSuccess = () => {
    dispatch(setShowSidebar(false));
    onClose();
    setTimeout(() => {
      dispatch(setShowSidebar(true));
    }, 10);
  };

  return (
    <>
      <h2 className={classes.modalTitle}>{t("Convert Tokens")}</h2>

      {transactionIsLoading && !transactionIsSuccess ? (
        <LoadingContent />
      ) : null}

      {transactionIsSuccess ? <SuccessContent /> : null}

      {/* input fields */}
      <div className={classes.tokenListWrapper}>
        {!transactionIsLoading && !transactionIsSuccess && (
          <>
            {wrap ? (
              <>
                <TokenInput
                  idx={0}
                  token={{
                    ...nativeToken,
                    balance: balance,
                    loading: balanceIsLoading,
                  }}
                  tokenBalance={tokenBalance}
                  setTokenBalance={setTokenBalance}
                />

                <ToggleWrapButton />

                <TokenInput
                  idx={1}
                  token={{
                    ...wrapToken,
                    balance: wrapBalance,
                    loading: balanceIsLoading,
                  }}
                  tokenBalance={tokenBalance}
                  setTokenBalance={setTokenBalance}
                />
              </>
            ) : (
              <>
                <TokenInput
                  idx={0}
                  token={{
                    ...wrapToken,
                    balance: wrapBalance,
                    loading: balanceIsLoading,
                  }}
                  tokenBalance={tokenBalance}
                  setTokenBalance={setTokenBalance}
                />

                <ToggleWrapButton />

                <TokenInput
                  idx={1}
                  token={{
                    ...nativeToken,
                    balance: balance,
                    loading: balanceIsLoading,
                  }}
                  tokenBalance={tokenBalance}
                  setTokenBalance={setTokenBalance}
                />
              </>
            )}

            {!balanceIsLoading && balanceError && (
              <InputError error={balanceError} />
            )}
          </>
        )}
      </div>

      {/* footer & button */}
      <div className={classes.footer}>
        {transactionIsSuccess ? (
          <SuccessContentButton onClick={handleTransactionSuccess} />
        ) : null}

        {!transactionIsLoading && !transactionIsSuccess && (
          <>
            {!disableButton ? (
              <button
                type="button"
                className="primary-btn"
                disabled={!formIsValid || disableButton}
                onClick={handleTransaction}
              >
                {t("Convert Tokens")}
              </button>
            ) : (
              <button
                type="button"
                disabled={true}
                className={classes.loadingDisabled}
              >
                <LoadingCircles />
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};
//lang ok
