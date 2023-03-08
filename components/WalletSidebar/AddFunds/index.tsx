import Image from "next/image";
import classes from "./AddFunds.module.css";
import wallectImg from "../../../public/assets/images/process-wallet.svg";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiInfo } from "react-icons/fi";
import { RcTooltip } from "../../Tooltip/rcTooltip";
import useTranslation from "next-translate/useTranslation";

export const AddFunds = ({ token = "selected token" }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { account } = useWeb3React();

  const [copied, setCopied] = useState(false);

  const handleCopyListener = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={classes.modalWrapper}>
      <div className={classes.titleWrapper}>
        <h3>{t("Add Funds")}</h3>
      </div>

      <div className={classes.imgWrapper}>
        <Image src={wallectImg} alt="wllect image" width={80} height={80} />
      </div>

      <div className={classes.infoWrapper}>
        <p>
          {t("Transfer funds from an")}{" "}
          <RcTooltip
            overlay={t(
              `An exchange allows individuals to trade cryptocurrencies. Compatible crypto exchanges include Coinbase, Gemini, Kraken, eToro, and many other exchanges.`
            )}
          >
            <span className={classes.tooltipIcon}>
              {t("exchange")} <FiInfo />{" "}
            </span>
          </RcTooltip>{" "}
          {t("or another wallet to your wallet address below:")}
        </p>
      </div>

      <div className={classes.copyAddressWrapper}>
        <p className="overflow-text">{account}</p>

        <CopyToClipboard
          text={account || "No Account Found"}
          onCopy={handleCopyListener}
        >
          {copied ? (
            <button type="button">{t("Copied")}</button>
          ) : (
            <button type="button">{t("Copy")}</button>
          )}
        </CopyToClipboard>
      </div>

      <div className={classes.bottomInfoWrapper}>
        <p className="m-0">
          {t("Only send")} {token}{" "}
          {t("or any other ERC-20 token to this address.")}
        </p>
      </div>
    </div>
  );
};
//lang ok
