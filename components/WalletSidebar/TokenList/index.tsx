import classes from "./TokenList.module.css";
import { HeadlessMenu } from "../../HUI/HeadlessMenu";
import { FiMoreVertical, FiPlusCircle, FiRefreshCcw } from "react-icons/fi";
import { formatPriceK } from "../../../src/helpers/functions";
import { RcTooltip } from "../../Tooltip/rcTooltip";
import { LoadingCircles } from "../../Loader/LoadingCircles";
import { useState } from "react";
import { Modal } from "components/Modal";
import { AddFunds } from "../AddFunds";
import useTranslation from "next-translate/useTranslation";
import {
  PAYMENT_TOKEN_TYPE_NATIVE_COIN,
  PAYMENT_TOKEN_TYPE_TOKEN,
} from "src/helpers/coreconstants";
import { WrapToken } from "../WrapToken";

export const TokenList = ({ data }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showWrapTokenModal, setShowWrapTokenModal] = useState(false);

  // wrap & unwrap
  const [wrap, setWrap] = useState(true);

  // show close button
  const [showCloseBtn, setShowCloseBtn] = useState(true);

  return (
    <>
      <div className={"list-group-item " + classes.tokenListItem}>
        <div>
          <img
            src={data?.logo || ""}
            alt={data?.name || "token name"}
            width={18}
          />

          <div className={classes.nameInfo}>
            <h3>{data?.token_symbol}</h3>
            <p>{data?.blockchain?.network_name}</p>
          </div>
        </div>

        <div>
          {/* balance */}
          <div className={classes.balanceInfo}>
            {data.loading ? (
              <LoadingCircles />
            ) : (
              <>
                {" "}
                <h3>{data.balance && data.balance.toFixed(4)}</h3>
                <p>
                  {data.balance * data.usd_rate === 0
                    ? "---"
                    : "$" + formatPriceK(data.balance * data.usd_rate)}{" "}
                  USD
                </p>
              </>
            )}
          </div>

          {/* dropdowns */}
          <HeadlessMenu
            wrapperWidth={"auto"}
            btnText={
              <RcTooltip overlay={"More"}>
                <FiMoreVertical />
              </RcTooltip>
            }
            btnClass={classes.dropdownBtn}
          >
            <div className={"list-group " + classes.dropdownMenu}>
              <button
                className={"list-group-item " + classes.dropdownMenuItem}
                onClick={() => setShowAddFundsModal(true)}
              >
                <div>
                  <FiPlusCircle />

                  <span>
                    {t("Add")} {data?.token_symbol}
                  </span>
                </div>
              </button>
              <button
                className={"list-group-item " + classes.dropdownMenuItem}
                onClick={() => {
                  data?.type === PAYMENT_TOKEN_TYPE_NATIVE_COIN &&
                    setWrap(true);
                  data?.type === PAYMENT_TOKEN_TYPE_TOKEN && setWrap(false);
                  setShowWrapTokenModal(true);
                }}
              >
                <div>
                  <FiRefreshCcw />

                  <span>
                    {data?.type === PAYMENT_TOKEN_TYPE_NATIVE_COIN && t("Wrap")}
                    {data?.type === PAYMENT_TOKEN_TYPE_TOKEN && t("Unwrap")}
                  </span>
                </div>
              </button>
            </div>
          </HeadlessMenu>
        </div>
      </div>

      {/* add funds */}
      <Modal
        show={showAddFundsModal}
        onClose={() => setShowAddFundsModal(false)}
      >
        <AddFunds token={data?.token_symbol} />
      </Modal>

      {/* wrap modal */}
      <Modal
        outsideClose={false}
        showClose={showCloseBtn}
        show={showWrapTokenModal}
        onClose={() => setShowWrapTokenModal(false)}
      >
        <WrapToken
          wrap={wrap}
          setWrap={setWrap}
          setShowCloseBtn={setShowCloseBtn}
          onClose={() => setShowWrapTokenModal(false)}
        />
      </Modal>
    </>
  );
};
//lang ok
