import { useWeb3React } from "@web3-react/core";
import { getCookie } from "cookies-next";
import { ethers } from "ethers";
import { useCallback, useEffect, useRef, useState } from "react";
import { useToasts } from "react-toast-notifications";
import {
  PAYMENT_TOKEN_TYPE_NATIVE_COIN,
  PAYMENT_TOKEN_TYPE_TOKEN,
} from "src/helpers/coreconstants";
import { erc20Abi } from "../src/wallet/erc20Abi";
import { walletConnected } from "./useWallet";

const useBalance = (tokenProps: any) => {
  const mounted = useRef(false);
  const [token, setToken] = useState(tokenProps);
  const { active, library, account, chainId } = useWeb3React();
  const { addToast } = useToasts();

  const [balanceIsLoading, setBalanceIsLoading] = useState(false);
  const [convertRate, setConvertRate] = useState<undefined | number>();
  const [balance, setBalance] = useState<undefined | number>();

  const getBalance = useCallback(async () => {
    try {
      setBalanceIsLoading(true);

      let balance = "";
      if (token && token.type == PAYMENT_TOKEN_TYPE_NATIVE_COIN) {
        balance = await library.getBalance(account);
        balance = ethers.utils.formatEther(balance);
      } else if (token && token.type == PAYMENT_TOKEN_TYPE_TOKEN) {
        const erc20OCntract = new ethers.Contract(
          token.contract_address,
          erc20Abi,
          library
        );
        balance = await erc20OCntract.balanceOf(account);
        balance = ethers.utils.formatUnits(balance, token.total_decimal);
      }

      setBalance(Number(balance));
      setConvertRate(Number(token?.usd_rate));
      setBalanceIsLoading(false);
    } catch (err: any) {
      addToast(err.message, { appearance: "error" });
      setBalanceIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    mounted.current = true;

    if (chainId) {
      if (mounted.current) {
        getBalance();
      }
    }

    return () => {
      mounted.current = false;
    };
  }, [token]);

  // check if you're active
  if (!(walletConnected(active))) {
    addToast("You are not connected to any wallet", { appearance: "warning" });
    return;
  }

  return {
    balanceIsLoading,
    balance,
    convertRate,
    setToken,
    token,
  };
};

export default useBalance;
