import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { PAYMENT_TOKEN_TYPE_TOKEN } from "src/helpers/coreconstants";
import { RootState } from "src/store";
import { erc20Abi } from "../src/wallet/erc20Abi";

const useTransaction = (wrapToken: any) => {
  const { addToast } = useToasts();
  const { library } = useWeb3React();

  const [transactionIsLoading, setTransactionIsLoading] = useState(false);
  const [transactionIsSuccess, setTransactionIsSuccess] = useState(false);

  const signer = library.getSigner();
  const contractAddress = wrapToken?.contract_address || "";
  const contract = new ethers.Contract(contractAddress, erc20Abi, signer);
  const tokenWithSigner = contract.connect(signer);

  // deposit
  const transactionDeposit = async (val: string, setShowCloseBtn: any) => {
    try {
      const transaction = await contract.deposit({
        value: ethers.utils.parseEther(val),
      });

      setTransactionIsLoading(true);

      await transaction.wait();

      setTransactionIsLoading(false);
      setTransactionIsSuccess(true);
    } catch (err: any) {
      setShowCloseBtn(true);
      setTransactionIsLoading(false);
      setTransactionIsSuccess(false);
      addToast(`${err.code}: ${err.message}`, { appearance: "error" });
    }
  };

  const transactionWithdraw = async (val: string, setShowCloseBtn: any) => {
    const tokenValue = ethers.utils.parseUnits(val, wrapToken?.total_decimal);

    try {
      const withdraw = await tokenWithSigner.withdraw(tokenValue);

      setTransactionIsLoading(true);

      await withdraw.wait();

      setTransactionIsLoading(false);
      setTransactionIsSuccess(true);
    } catch (err: any) {
      setShowCloseBtn(true);
      setTransactionIsLoading(false);
      setTransactionIsSuccess(false);
      addToast(`${err.code}: ${err.message}`, { appearance: "error" });
    }
  };

  // withdraw

  return {
    transactionIsLoading,
    transactionIsSuccess,
    transactionDeposit,
    transactionWithdraw,
  };
};

export default useTransaction;
