import { useWeb3React } from "@web3-react/core";
import classes from "./AddWallet.module.css";
import Image from "next/image";
import useWallet, { walletConnected } from "../../hooks/useWallet";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { getCookie } from "cookies-next";

const AddWalletComponent = () => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { connectMetaMask, connectCoinbase, connectWalletConnect } =
    useWallet();
  const { library, active, account } = useWeb3React();

  const supportedChains: any = useSelector(
    (state: RootState) => state.chains.supportedChains
  );

  console.log(supportedChains);
  

  const wallets = [
    {
      id: 1,
      title: "MetaMask",
      imgSrc: "/assets/images/wallets/metamask1.svg",
      fn: connectMetaMask,
    },
    {
      id: 2,
      title: "Coinbase",
      imgSrc: "/assets/images/wallets/coinbase.png",
      fn: connectCoinbase,
    },
    /* {
      id: 3,
      title: "WalletConnect",
      imgSrc: "/assets/images/wallets/walletconnect.svg",
      fn: connectWalletConnect,
    }, */
  ];

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-title text-center">
                <h2 className="title">{t("Connect your wallet")}</h2>
                <p className="sub-title">
                  {t("Connect with one of our available wallet providers.")}
                </p>
              </div>
            </div>
          </div>

          <div className="row gx-4 gy-4 justify-content-center">
            {!walletConnected(active) &&
              wallets.map((el) => (
                <div key={el.id} className="col-lg-4 col-md-6">
                  <button
                    type="button"
                    className={classes.singleWallet}
                    onClick={() => el.fn(supportedChains)}
                  >
                    <Image
                      src={el.imgSrc}
                      alt={el.title}
                      width={48}
                      height={48}
                      className={classes.image}
                    />
                    <span>{el.title}</span>
                  </button>
                </div>
              ))}

            {walletConnected(active) && (
              <div className="text-center">
                {t("You're connected to")} <p>{account}</p>
              </div>
            )}

            {/* {walletConnected(active) && (
              <>
                <div className="col-12">
                  <button
                    type="button"
                    className={classes.singleWallet + " bg-success text-white"}
                    onClick={handleSignMessage}
                  >
                    Sign Message
                  </button>
                </div>
              </>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWalletComponent;
//lang ok
