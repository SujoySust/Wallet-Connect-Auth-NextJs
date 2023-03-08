import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

// const RPC_URLS = {
//   1: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
//   4: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
// };

// MetaMask
// export const Injected = new InjectedConnector({
//   supportedChainIds: getSupportedChainIds(),
// });

// this function will set the injected to MetaMask only
const activateInjectedProvider = (providerName: "MetaMask" | "CoinBase") => {
  if (typeof window !== "undefined") {
    const { ethereum } = window as any;

    if (!ethereum?.providers) {
      return undefined;
    }

    let provider;
    switch (providerName) {
      case "CoinBase":
        provider = ethereum.providers.find(
          ({ isCoinbaseWallet }: any) => isCoinbaseWallet
        );
        break;
      case "MetaMask":
        provider = ethereum.providers.find(({ isMetaMask }: any) => isMetaMask);
        break;
    }

    if (provider) {
      ethereum.setSelectedProvider(provider);
    }
  } else return;
};

activateInjectedProvider("MetaMask");

// // wallet connect
// const WalletConnect = new WalletConnectConnector({
//   //rpc: RPC_URLS,
//   bridge: "https://bridge.walletconnect.org",
//   qrcode: true,
// });

// // Coinbase
// const CoinbaseWallet = new WalletLinkConnector({
//   //url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
//   url: "",
//   appName: "My dApp 😎",
//   supportedChainIds: getSupportedChainIds(),
// });

export async function loadConnector(supportedChains: number[]) {
  // const supportedChains = await getSupportedChainIds();
  // MetaMask
  const metamask = new InjectedConnector({
    supportedChainIds: supportedChains,
  });

  // wallet connect
  const walletConnect = new WalletConnectConnector({
    /* rpc: {
      1: "https://mainnet.infura.io/v3/065fecc7aaff497cbdb1eac4ba4b30b8",
      4: "https://rinkeby.infura.io/v3/065fecc7aaff497cbdb1eac4ba4b30b8",
    }, */
    supportedChainIds: supportedChains,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  // Coinbase
  const coinbaseWallet = new WalletLinkConnector({
    //url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
    url: "",
    appName: process.env.NEXT_PUBLIC_APP_NAME ?? "",
    supportedChainIds: supportedChains,
  });

  return {
    metamask,
    walletConnect,
    coinbaseWallet,
  };
}

// export const connectors = {
//   metamask: Injected,
//   walletConnect: WalletConnect,
//   coinbaseWallet: CoinbaseWallet,
// };
