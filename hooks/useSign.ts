import { useSelector } from "react-redux";
import { RootState } from "../src/store";

/*

      Not in use atm

*/

const useSign = () => {
  const library: any = useSelector(
    (state: RootState) => state.web3Library.web3Library
  );

  const handleSignMessage = async (message: any) => {
    if (library) {
      const signer = await library.getSigner();

      try {
        const res = await signer.signMessage(message);
        return res;
      } catch (err) {
        // console.log(err);
      }
    }
  };

  return { handleSignMessage };
};

export default useSign;
