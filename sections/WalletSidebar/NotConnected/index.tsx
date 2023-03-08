import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import useWallet from "../../../hooks/useWallet";
import classes from "./NotConnected.module.css";

export const NotConnected = () => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { connectMetaMask, connectCoinbase, connectWalletConnect } =
    useWallet();

  const supportedChains: any = useSelector(
    (state: RootState) => state.chains.supportedChains
  );

  return (
    <div className={classes.wrapper}>
      <div className={`row ${classes.topSection}`}>
        <BiUserCircle className={classes.userIcon} />
        <h3>{t("My wallet")}</h3>
      </div>

      <div className={classes.infoSection}>
        <p>
          {t(
            "Connect with one of our available wallet providers."
          )}
        </p>
      </div>

      <div className={`list-group ${classes.btnWrapper}`}>
        <button
          className={`list-group-item ${classes.btnWrapperItem}`}
          onClick={() => connectMetaMask(supportedChains)}
        >
          <span>
            <Image
              src="/assets/images/wallets/metamask1.svg"
              width="25px"
              height="25px"
              alt="Metamask"
            />{" "}
            <span className={classes.buttonText}>{"MetaMask"}</span>
          </span>{" "}
          <small>{t("Popular")}</small>
        </button>

        <button
          className={`list-group-item ${classes.btnWrapperItem}`}
          onClick={() => connectCoinbase(supportedChains)}
        >
          <span>
            <Image
              src="/assets/images/wallets/coinbase.png"
              width="25px"
              height="25px"
              alt="Coinbase Wallet "
            />{" "}
            <span className={classes.buttonText}>{"Coinbase Wallet"}</span>
          </span>
        </button>

        {/* <button
          className={`list-group-item ${classes.btnWrapperItem}`}
          onClick={() => connectWalletConnect(supportedChains)}
        >
          <span>
            <Image
              src="/assets/images/wallets/walletconnect.svg"
              width="25px"
              height="25px"
              alt="WalletConnect"
            />{" "}
            <span className={classes.buttonText}>{t("WalletConnect")}</span>
          </span>
        </button> */}

      </div>
    </div>
  );
};
