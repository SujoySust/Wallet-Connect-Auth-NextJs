import classes from "./Connected.module.css";
import { HeadlessMenu } from "../../../components/HUI/HeadlessMenu";
import { FiChevronDown, FiLogOut, FiRefreshCcw } from "react-icons/fi";
import { FcCheckmark } from "react-icons/fc";
import { useWeb3React } from "@web3-react/core";
import { collapseAddress } from "../../../src/helpers/functions";
import CopyToClipboard from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
import { TokenList } from "../../../components/WalletSidebar/TokenList";
import useBalance from "../../../hooks/useBalance";
import { AddFunds } from "../../../components/WalletSidebar/AddFunds";
import { Modal } from "../../../components/Modal";
import useWallet from "../../../hooks/useWallet";
import { RcTooltip } from "../../../components/Tooltip/rcTooltip";
import { LoadingCircles } from "../../../components/Loader/LoadingCircles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/store";
import { getCookie } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import { ImageProfile } from "components/Images";
import { getNativeNwrapTokenWithChainId } from "src/ssr/data";
import {
  setNativeToken,
  setWrapToken,
} from "src/store/slices/paymentTokenSlice";
import { setShowSidebar } from "src/store/slices/walletDrawerSlice";

export const Connected = () => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { account, chainId } = useWeb3React();
  const { disConnectWallet } = useWallet();

  const dispatch = useDispatch();
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const { nativeToken, wrapToken } = useSelector(
    (state: RootState) => state.paymentTokens
  );

  useEffect(() => {
    if (chainId && !nativeToken) {
      getNativeNwrapTokenWithChainId(chainId).then((res) => {
        dispatch(setNativeToken(res.native_token));
        dispatch(setWrapToken(res.wrap_token));
      });
    }
  }, [chainId, nativeToken]);

  // connected wallet
  const [connectedWallet, setConnectedWallet] = useState<any>();

  useEffect(() => {
    setTimeout(() => {
      setConnectedWallet(getCookie("walletIsConnectedTo"));
    }, 2000);

    return () => {
      setConnectedWallet({});
    };
  }, []);

  // modals
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);

  // copy
  const [copied, setCopied] = useState(false);

  const handleCopyListener = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // get  balance
  const { balanceIsLoading, balance, convertRate, setToken }: any =
    useBalance(nativeToken);
  const { balance: wrapBalance, setToken: setTokenWrap }: any =
    useBalance(wrapToken);

  useEffect(() => {
    if (wrapToken && nativeToken) {
      setToken(nativeToken);
      setTokenWrap(wrapToken);
    }
  }, [wrapToken, nativeToken]);

  const refreshWallet = () => {
    dispatch(setShowSidebar(false));
    setTimeout(()=>{
      dispatch(setShowSidebar(true));
    },10)
  } 

  return (
    <>
      <div className={classes.header}>
        <HeadlessMenu
          btnText={
            <>
              <ImageProfile
                src={userData.profile_img}
                alt={userData.username || "mrfox"}
              />

              <h3 className="overflow-text">
                {userData.username ? userData.username : "anonymous"}
              </h3>

              <span>
                <FiChevronDown />
              </span>
            </>
          }
          btnClass={classes.dropdownBtn}
        >
          <div className={"list-group " + classes.dropdownMenu}>
            <div className={"list-group-item " + classes.dropdownMenuItem}>
              <div className={classes.dropdownMenuItemLeft}>
                <img
                  src={`/assets/images/wallets/${
                    connectedWallet === "metamask"
                      ? "metamask.svg"
                      : connectedWallet === "coinbase"
                      ? "coinbase.png"
                      : connectedWallet === "walletConnect"
                      ? "walletconnect.svg"
                      : ""
                  }`}
                  alt={connectedWallet || "wallet image"}
                />{" "}
              </div>
              <span>{connectedWallet}</span>

              <span className="text-success" style={{ marginLeft: "auto" }}>
                <FcCheckmark aria-label="connected" className="mr-3" />
              </span>
            </div>

            <button
              type="button"
              className={"list-group-item " + classes.dropdownMenuItem}
              onClick={refreshWallet}
            >
              <div className={classes.dropdownMenuItemLeft}>
                <FiRefreshCcw aria-label="reload page" />
              </div>

              <span>{t("Refresh")}</span>
            </button>

            <button
              className={"list-group-item " + classes.dropdownMenuItem}
              onClick={disConnectWallet}
            >
              <div className={classes.dropdownMenuItemLeft}>
                <FiLogOut aria-label="log out" />
              </div>

              <span>{t("Log out")}</span>
            </button>
          </div>
        </HeadlessMenu>

        <div className={classes.address}>
          {!account ? (
            "O_O"
          ) : (
            <>
              <CopyToClipboard text={account} onCopy={handleCopyListener}>
                {copied ? (
                  <span className="text-success">{t("Copied")}</span>
                ) : (
                  <div>
                    <RcTooltip overlay={"Copy"}>
                      {collapseAddress(account)}
                    </RcTooltip>
                  </div>
                )}
              </CopyToClipboard>
            </>
          )}
        </div>
      </div>

      <div className={classes.balanceWrapper}>
        <div className={classes.balanceWrapperContainer}>
          <span>
            {nativeToken?.token_symbol} {t("Balance")}
          </span>

          <p>
            {balanceIsLoading ? (
              <LoadingCircles />
            ) : (
              <>${(balance * convertRate).toFixed(4)} USD</>
            )}
          </p>
        </div>

        <button type="button" onClick={() => setShowAddFundsModal(true)}>
          {t("Add Funds")}
        </button>
      </div>

      <div className={"mt-5 list-group " + classes.tokenList}>
        <TokenList
          data={{ ...nativeToken, balance: balance, loading: balanceIsLoading }}
        />

        <TokenList
          data={{
            ...wrapToken,
            balance: wrapBalance,
            loading: balanceIsLoading,
          }}
        />
      </div>

      {/* add funds modal */}
      <Modal
        show={showAddFundsModal}
        onClose={() => setShowAddFundsModal(false)}
      >
        <AddFunds token={nativeToken?.token_symbol} />
      </Modal>
    </>
  );
};
