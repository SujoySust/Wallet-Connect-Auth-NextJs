import { getCookie, setCookies } from "cookies-next";
import { ethers } from "ethers";
import { checkSSRTokenValidity } from "../../middleware/authCheck";
import {
  CheckUniqueUserDocument,
  CheckUniqueUserQuery,
  CheckUniqueUserQueryVariables,
  GenerateLoginMessageDocument,
  GenerateLoginMessageMutation,
  GenerateLoginMessageMutationVariables,
  GetAccountByAddressDocument,
  GetAccountByAddressQuery,
  GetAccountByAddressQueryVariables,
  GetAccountDocument,
  GetAccountQuery,
  GetAccountQueryVariables,
  GetBlockchainListsDocument,
  GetBlockchainListsForChainIdsDocument,
  GetBlockchainListsForChainIdsQuery,
  GetBlockchainListsForChainIdsQueryVariables,
  GetBlockchainListsQuery,
  GetBlockchainListsQueryVariables,
  GetUserByTokenDocument,
  GetUserByTokenQuery,
  GetUserByTokenQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  WalletLoginDocument,
  WalletLoginMutation,
  WalletLoginMutationVariables,
  GetNativeNwrapTokenQuery,
  GetNativeNwrapTokenQueryVariables,
  GetNativeNwrapTokenDocument,
} from "../graphql/generated";
import { graphqlFetcher, graphqlSSRFetcher } from "../lib/fetcher";

export async function getMe(req: any, res: any) {
  const token = getCookie("token", { req, res });
  const checkSSRToken = await checkSSRTokenValidity(req, res);
  if (checkSSRToken) {
    const meQuery = graphqlSSRFetcher<MeQuery, MeQueryVariables>(MeDocument);
    const me = await meQuery(token);
    return me.me ? me.me : null;
  } else {
    return null;
  }
}

// export async function getSingleCollection(address: string) {
//   const singleCollection = graphqlFetcher<
//     SingleCollectionQuery,
//     SingleCollectionQueryVariables
//   >(SingleCollectionDocument, { address });
//   return await singleCollection();
// }

export async function getAccountByAddress(account: string) {
  const getAccountQuery = graphqlFetcher<
    GetAccountByAddressQuery,
    GetAccountByAddressQueryVariables
  >(GetAccountByAddressDocument, { wallet_address: account });
  return await getAccountQuery();
}

export async function getAccount(address_or_username: string) {
  const data = graphqlFetcher<GetAccountQuery, GetAccountQueryVariables>(
    GetAccountDocument,
    { address_or_username: address_or_username }
  );

  return await data();
}

export async function generateLoginMessage(account: string) {
  const getData = graphqlFetcher<
    GenerateLoginMessageMutation,
    GenerateLoginMessageMutationVariables
  >(GenerateLoginMessageDocument, { wallet_address: account });

  return await getData();
}

export async function walletLogin(
  address: string,
  nonce: string,
  signature: string
) {
  const getData = graphqlFetcher<
    WalletLoginMutation,
    WalletLoginMutationVariables
  >(WalletLoginDocument, {
    address,
    nonce,
    signature,
  });

  return await getData();
}


export async function getBlockchainList() {
  const getData = graphqlFetcher<
    GetBlockchainListsQuery,
    GetBlockchainListsQueryVariables
  >(GetBlockchainListsDocument);

  const data = await getData();
  if (data.getBlockchainLists) {
    return data.getBlockchainLists;
  }
  return null;
}

export async function checkUniqueUser(wallet_address: string, username: string) {
  const getData = graphqlFetcher<
    CheckUniqueUserQuery,
    CheckUniqueUserQueryVariables
  >(CheckUniqueUserDocument, { wallet_address: wallet_address, username: username });
  const data = await getData();
  if (data.checkUniqueUser) {
    return data.checkUniqueUser;
  }
  return null;
}

export async function checkUniqueEmail(wallet_address: string, email: string) {
  const getData = graphqlFetcher<
    CheckUniqueUserQuery,
    CheckUniqueUserQueryVariables
  >(CheckUniqueUserDocument, { wallet_address: wallet_address, email: email });
  const data = await getData();
  if (data.checkUniqueUser) {
    return data.checkUniqueUser;
  }
  return null;
}

export async function checkAuthentication(wallet_address: string) {
  try {
    const getUserByToken = graphqlFetcher<
      GetUserByTokenQuery,
      GetUserByTokenQueryVariables
    >(GetUserByTokenDocument, {});
    const response = await getUserByToken();
    return (
      response.getUserByToken &&
      response.getUserByToken.wallet_address === wallet_address
    );
  } catch (error) {
    return false;
  }
}

export async function checkOnPageAuthentication(
  wallet_address: string,
  setAutheticateAction?: any
) {
  let provider: any;
  if (typeof window !== "undefined" && (window as any).ethereum) {
    provider = new ethers.providers.Web3Provider((window as any).ethereum);
  }
  try {
    const userQuery = graphqlFetcher<
      GetUserByTokenQuery,
      GetUserByTokenQueryVariables
    >(GetUserByTokenDocument, {});
    const user = await userQuery();
    const checkValid =
      user.getUserByToken &&
      user.getUserByToken.wallet_address === wallet_address;
    if (checkValid) {
      setAutheticateAction && setAutheticateAction(true);
      return true;
    } else {
      throw new Error("Invalid user!");
    }
  } catch (error) {
    const data = await generateLoginMessage(wallet_address);
    const { login_message, nonce } = data.generateLoginMessage;
    if (provider) {
      const signer: any = await provider.getSigner();
      const signature = await signer.signMessage(login_message);
      if (signature) {
        const login = await walletLogin(wallet_address, nonce, signature);
        setCookies("token", JSON.stringify(login.walletLogin), {
          expires: new Date(login.walletLogin.expireAt),
        });
      }
      setAutheticateAction && setAutheticateAction(true);
      return true;
    }
    return false;
  }
}

export async function getBlockchainListForChainIds() {
  const res = graphqlFetcher<
    GetBlockchainListsForChainIdsQuery,
    GetBlockchainListsForChainIdsQueryVariables
  >(GetBlockchainListsForChainIdsDocument);

  const data = await res();

  return data.getBlockchainLists;
}

export async function getNativeNwrapTokenWithChainId(chainId: number) {
  const res = graphqlFetcher<
    GetNativeNwrapTokenQuery,
    GetNativeNwrapTokenQueryVariables
  >(GetNativeNwrapTokenDocument, {
    chain_id: chainId,
  });

  const data = await res();

  return data.getNativeNwrapToken;
}
