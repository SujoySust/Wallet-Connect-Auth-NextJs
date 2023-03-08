import { useWeb3React } from "@web3-react/core";
import { getCookie, removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { RootState } from "src/store";
import {
  setNativeToken,
  setWrapToken,
} from "src/store/slices/paymentTokenSlice";
import { setSupportedChains } from "src/store/slices/supportedChainsSlice";
import useWallet, { walletConnected } from "../hooks/useWallet";
import {
  getAccountByAddress,
  getBlockchainListForChainIds,
  getNativeNwrapTokenWithChainId,
} from "../src/ssr/data";
import {
  setUserData,
  setUserDataError,
} from "../src/store/slices/userDataSlice";
import moment from "moment";
import "moment/locale/es";
import "moment/locale/en-gb";

// @ts-ignore
const GeneralLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    connectMetaMask,
    connectCoinbase,
    connectWalletConnect,
    disConnectWallet,
  } = useWallet();
  const { account, active, library, chainId } = useWeb3React();

  const supportedChains: any = useSelector(
    (state: RootState) => state.chains.supportedChains
  );

  // momentjs locale
  const notInitialRenderOnLocaleChange = useRef(false);

  useEffect(() => {
    moment.locale(router?.locale);

    if (notInitialRenderOnLocaleChange.current) {
      router.push(router.asPath);
    } else {
      notInitialRenderOnLocaleChange.current = true;
    }
  }, [router.locale, dispatch]);

  // settings data
  // useEffect(() => {
  //   getSettingsData([
  //     SETTINGS_GROUP_APPLICATION,
  //     SETTINGS_GROUP_GENERAL,
  //     SETTINGS_GROUP_LOGO,
  //     SETTINGS_GROUP_SOCIAL,
  //     SETTINGS_GROUP_FOOTER,
  //   ]).then((res) => dispatch(setSettings(res)));
  // }, [dispatch]);

  const { addToast } = useToasts();

  // get user data from db
  useEffect(() => {
    if (walletConnected(active)) {
      getAccountByAddress(String(account))
        .then((userData) => {
          userData?.getAccountByAddress &&
            dispatch(setUserData(userData.getAccountByAddress));
        })
        .catch((err) => {
          // console.log(err);
          addToast(err.message, { appearance: "error" });
          dispatch(setUserDataError(err));
        });
    }
  }, [account]);

  // get native & wrap tokens and store in redux
  useEffect(() => {
    let cleanup = false;

    if (chainId) {
      getNativeNwrapTokenWithChainId(chainId).then((res) => {
        if (cleanup) return;
        dispatch(setNativeToken(res.native_token));
        dispatch(setWrapToken(res.wrap_token));
      });
    }

    return () => {
      cleanup = true;
    };
  }, [chainId]);

  // connect based on prev connected
  const connectWalletOnPageLoad = useCallback(() => {
    switch (getCookie("walletIsConnectedTo")) {
      case "metamask":
        connectMetaMask(supportedChains);

        break;
      case "coinbase":
        connectCoinbase(supportedChains);
        break;
      case "walletConnect":
        connectWalletConnect(supportedChains);
        break;
      default:
        break;
    }
  }, [supportedChains]);

  useEffect(() => {
    connectWalletOnPageLoad();
  }, [supportedChains]);

  //account change event
  useEffect(() => {
    if (library) {
      const { provider: ethereum } = library;

      ethereum.on("accountsChanged", async () => {
        const addr = await library.listAccounts();
        if (addr.length < 1) {
          disConnectWallet();
        } else {
          removeCookies("token");
        }
      });
    }
  }, [library]);

  // check & get supportedChains from db & store in redux
  useEffect(() => {
    if (!supportedChains) {
      getBlockchainListForChainIds().then((res) => {
        const list = res.map((el: any) => el.chain_id);
        dispatch(setSupportedChains(list));
      });
    }
  }, []);

  // network change
  useEffect(() => {
    if (library && supportedChains) {
      const { provider: ethereum } = library;

      ethereum.on("chainChanged", (data: any) => {
        if (!supportedChains.includes(Number(data))) {
          disConnectWallet();

          // router.push(router.asPath);
          window.location.reload();
          return;
        }
      });
    }
  }, [library, supportedChains]); // keet it as it is

  return <>{children}</>;
};

export default GeneralLayout;
