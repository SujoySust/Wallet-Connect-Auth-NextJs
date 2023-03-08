import { useMutation, UseMutationOptions, useQuery, UseQueryOptions, useInfiniteQuery, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '../lib/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type. Basically string */
  Date: any;
  /** Decimal custom scalar type. Basically string or number */
  Decimal: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ApplicationSettingsInput = {
  minting_interval_duration_in_min?: InputMaybe<Scalars['String']>;
  per_day_minting_limit?: InputMaybe<Scalars['String']>;
  settings_buy_sell_fee_percentage?: InputMaybe<Scalars['String']>;
  settings_max_interval_for_buy_sell_offer_in_min?: InputMaybe<Scalars['String']>;
  settings_min_interval_for_buy_sell_offer_in_min?: InputMaybe<Scalars['String']>;
};

export type BlockchainModel = {
  __typename?: 'BlockchainModel';
  chain_id?: Maybe<Scalars['Int']>;
  currency_symbol: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  exchange_contract?: Maybe<Scalars['String']>;
  explorer_url?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  logo?: Maybe<Scalars['String']>;
  network_name: Scalars['String'];
  nft_contract?: Maybe<Scalars['String']>;
  payment_tokens?: Maybe<Array<PaymentTokenModel>>;
  provider: Scalars['Int'];
  public_rpc_url?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  status?: Maybe<Scalars['Int']>;
};

export type BlockchainModelEdge = {
  __typename?: 'BlockchainModelEdge';
  cursor: Scalars['String'];
  node: BlockchainModel;
};

export type BlockchainStaffConnection = {
  __typename?: 'BlockchainStaffConnection';
  edges?: Maybe<Array<BlockchainStaffModelEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type BlockchainStaffModel = {
  __typename?: 'BlockchainStaffModel';
  api_key?: Maybe<Scalars['String']>;
  chain_id?: Maybe<Scalars['Int']>;
  currency_symbol: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  exchange_contract?: Maybe<Scalars['String']>;
  explorer_url?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  logo?: Maybe<Scalars['String']>;
  network_name: Scalars['String'];
  nft_contract?: Maybe<Scalars['String']>;
  payment_tokens?: Maybe<Array<PaymentTokenModel>>;
  provider: Scalars['Int'];
  public_rpc_url?: Maybe<Scalars['String']>;
  rpc_url?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  status?: Maybe<Scalars['Int']>;
  wss_url?: Maybe<Scalars['String']>;
};

export type BlockchainStaffModelEdge = {
  __typename?: 'BlockchainStaffModelEdge';
  cursor: Scalars['String'];
  node: BlockchainStaffModel;
};

export type CreateBlockChainDto = {
  api_key?: InputMaybe<Scalars['String']>;
  currency_symbol: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  exchange_contract?: InputMaybe<Scalars['String']>;
  explorer_url?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['Upload']>;
  network_name: Scalars['String'];
  nft_contract?: InputMaybe<Scalars['String']>;
  provider: Scalars['Int'];
  public_rpc_url?: InputMaybe<Scalars['String']>;
  rpc_url?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
  status?: InputMaybe<Scalars['Int']>;
  wss_url?: InputMaybe<Scalars['String']>;
};

export type CreatePaymentTokenDto = {
  blockchain_id: Scalars['Int'];
  contract_address: Scalars['String'];
  is_default?: InputMaybe<Scalars['Int']>;
  is_wrapable?: InputMaybe<Scalars['Int']>;
  logo?: InputMaybe<Scalars['Upload']>;
  min_amount_to_execute_auction: Scalars['Float'];
  name: Scalars['String'];
  status?: InputMaybe<Scalars['Int']>;
  sync_rate_status?: InputMaybe<Scalars['Int']>;
  token_symbol: Scalars['String'];
  total_decimal: Scalars['Int'];
  type: Scalars['Int'];
  usd_rate?: InputMaybe<Scalars['Float']>;
};

export type FileObject = {
  __typename?: 'FileObject';
  name: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
  variants?: Maybe<Array<FileVariant>>;
};

export type FileVariant = {
  __typename?: 'FileVariant';
  type: Scalars['String'];
  url: Scalars['String'];
};

export type HomepageSettingsInput = {
  asset_description?: InputMaybe<Scalars['String']>;
  asset_title?: InputMaybe<Scalars['String']>;
  banner_description?: InputMaybe<Scalars['String']>;
  banner_image?: InputMaybe<Scalars['Upload']>;
  banner_title?: InputMaybe<Scalars['String']>;
  category_description?: InputMaybe<Scalars['String']>;
  category_title?: InputMaybe<Scalars['String']>;
  featured_collection_description?: InputMaybe<Scalars['String']>;
  featured_collection_title?: InputMaybe<Scalars['String']>;
  instruction_add_nfts?: InputMaybe<Scalars['String']>;
  instruction_create_collection?: InputMaybe<Scalars['String']>;
  instruction_description?: InputMaybe<Scalars['String']>;
  instruction_image?: InputMaybe<Scalars['Upload']>;
  instruction_list_for_sale?: InputMaybe<Scalars['String']>;
  instruction_setup_wallet?: InputMaybe<Scalars['String']>;
  instruction_title?: InputMaybe<Scalars['String']>;
  resource_description?: InputMaybe<Scalars['String']>;
  resource_description_1?: InputMaybe<Scalars['String']>;
  resource_description_2?: InputMaybe<Scalars['String']>;
  resource_description_3?: InputMaybe<Scalars['String']>;
  resource_image_1?: InputMaybe<Scalars['Upload']>;
  resource_image_2?: InputMaybe<Scalars['Upload']>;
  resource_image_3?: InputMaybe<Scalars['Upload']>;
  resource_link_1?: InputMaybe<Scalars['String']>;
  resource_link_2?: InputMaybe<Scalars['String']>;
  resource_link_3?: InputMaybe<Scalars['String']>;
  resource_title?: InputMaybe<Scalars['String']>;
  resource_title_1?: InputMaybe<Scalars['String']>;
  resource_title_2?: InputMaybe<Scalars['String']>;
  resource_title_3?: InputMaybe<Scalars['String']>;
  selloffer_description?: InputMaybe<Scalars['String']>;
  selloffer_title?: InputMaybe<Scalars['String']>;
  top_collection_description?: InputMaybe<Scalars['String']>;
  top_collection_title?: InputMaybe<Scalars['String']>;
  trending_collection_description?: InputMaybe<Scalars['String']>;
  trending_collection_title?: InputMaybe<Scalars['String']>;
  video_section_description?: InputMaybe<Scalars['String']>;
  video_section_title?: InputMaybe<Scalars['String']>;
  video_url?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  StaffLogin: Token;
  adminFileUpload: FileObject;
  applicationSettingsSave: ResponseModel;
  changePassword: ResponseMessageWithStatusModel;
  changeStaffPassword: ResponseModel;
  createBlockchain: ResponseModel;
  createPaymentToken: ResponseModel;
  createRole: ResponseModel;
  createStaff: ResponseModel;
  deleteBlockchain: ResponseModel;
  deletePaymentToken: ResponseModel;
  deleteRole: ResponseModel;
  deleteStaff: ResponseModel;
  generalSettingsSave: ResponseModel;
  generateLoginMessage: WalletLoginMessage;
  homepageSettingsSave: ResponseModel;
  logoSettingsSave: ResponseModel;
  mailSettingsSave: ResponseModel;
  refreshToken: Token;
  resendVerifcationEmail: ResponseModel;
  sendForgetPasswordMail: ResponseMessageWithStatusModel;
  sendStaffForgetPasswordMail: ResponseModel;
  socialSettingsSave: ResponseModel;
  syncUsdRates: ResponseModel;
  updateBlockchain: ResponseModel;
  updateBlockchainStatus: ResponseModel;
  updatePaymentToken: ResponseModel;
  updatePaymentTokenStatus: ResponseModel;
  updateProfile: ResponseModel;
  updateRole: ResponseModel;
  updateStaff: ResponseModel;
  updateStaffPassword: ResponseModel;
  updateStaffProfile: ResponseModel;
  uploadFile: FileObject;
  usefulLinkSettingsSave: ResponseModel;
  userVerifyMail: ResponseModel;
  walletLogin: Token;
};


export type MutationStaffLoginArgs = {
  data: StaffLoginInput;
};


export type MutationAdminFileUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationApplicationSettingsSaveArgs = {
  data: ApplicationSettingsInput;
};


export type MutationChangePasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationChangeStaffPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationCreateBlockchainArgs = {
  data: CreateBlockChainDto;
};


export type MutationCreatePaymentTokenArgs = {
  data: CreatePaymentTokenDto;
};


export type MutationCreateRoleArgs = {
  data: RoleInput;
};


export type MutationCreateStaffArgs = {
  data: StaffCreateInput;
};


export type MutationDeleteBlockchainArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePaymentTokenArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteStaffArgs = {
  id: Scalars['Int'];
};


export type MutationGeneralSettingsSaveArgs = {
  data: GeneralSettingsInput;
};


export type MutationGenerateLoginMessageArgs = {
  wallet_address: Scalars['String'];
};


export type MutationHomepageSettingsSaveArgs = {
  data: HomepageSettingsInput;
};


export type MutationLogoSettingsSaveArgs = {
  data: LogoSettingsInput;
};


export type MutationMailSettingsSaveArgs = {
  data: MailSettingsInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String'];
};


export type MutationSendForgetPasswordMailArgs = {
  email: Scalars['String'];
};


export type MutationSendStaffForgetPasswordMailArgs = {
  email: Scalars['String'];
};


export type MutationSocialSettingsSaveArgs = {
  data: SocialSettingsInput;
};


export type MutationUpdateBlockchainArgs = {
  data: UpdateBlockChainDto;
  id: Scalars['Int'];
};


export type MutationUpdateBlockchainStatusArgs = {
  id: Scalars['Int'];
  status: Scalars['Int'];
};


export type MutationUpdatePaymentTokenArgs = {
  data: UpdatePaymentTokenDto;
  id: Scalars['Int'];
};


export type MutationUpdatePaymentTokenStatusArgs = {
  id: Scalars['Int'];
  status: Scalars['Int'];
};


export type MutationUpdateProfileArgs = {
  data: UpdateProfileInput;
};


export type MutationUpdateRoleArgs = {
  data: RoleInput;
  id: Scalars['Int'];
};


export type MutationUpdateStaffArgs = {
  data: StaffUpdateInput;
  id: Scalars['Int'];
};


export type MutationUpdateStaffPasswordArgs = {
  data: UpdatePasswordInput;
};


export type MutationUpdateStaffProfileArgs = {
  data: StaffUpdateInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};


export type MutationUsefulLinkSettingsSaveArgs = {
  data: UsefulLinkSettingsInput;
};


export type MutationUserVerifyMailArgs = {
  verificationCode: Scalars['String'];
};


export type MutationWalletLoginArgs = {
  data: WalletLoginInput;
};

export type NativeNwrapTokenModel = {
  __typename?: 'NativeNwrapTokenModel';
  native_token?: Maybe<PaymentTokenModel>;
  wrap_token?: Maybe<PaymentTokenModel>;
};

export type Order = {
  direction: Scalars['String'];
  field: Scalars['String'];
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PaymentTokenConnection = {
  __typename?: 'PaymentTokenConnection';
  edges?: Maybe<Array<PaymentTokenModelEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PaymentTokenModel = {
  __typename?: 'PaymentTokenModel';
  blockchain?: Maybe<BlockchainModel>;
  blockchain_id: Scalars['Int'];
  contract_address?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  is_default: Scalars['Int'];
  is_wrapable: Scalars['Int'];
  logo?: Maybe<Scalars['String']>;
  min_amount_to_execute_auction: Scalars['Decimal'];
  name: Scalars['String'];
  status?: Maybe<Scalars['Int']>;
  sync_rate_status: Scalars['Int'];
  token_symbol?: Maybe<Scalars['String']>;
  total_decimal: Scalars['Int'];
  type: Scalars['Int'];
  usd_rate: Scalars['Decimal'];
};

export type PaymentTokenModelEdge = {
  __typename?: 'PaymentTokenModelEdge';
  cursor: Scalars['String'];
  node: PaymentTokenModel;
};

export type PaymentTokenOrder = {
  direction: OrderDirection;
  field: PaymentTokenOrderField;
};

/** Properties by which payment token connections can be ordered. */
export enum PaymentTokenOrderField {
  Id = 'id',
  Name = 'name'
}

export type Query = {
  __typename?: 'Query';
  adminFileList: Array<FileObject>;
  checkUniqueUser: ResponseModel;
  getAccount: User;
  getAccountByAddress: User;
  getBlockchainById: BlockchainStaffModel;
  getBlockchainDetails?: Maybe<BlockchainModel>;
  getBlockchainLists: Array<BlockchainModel>;
  getItemsTokens: Array<PaymentTokenModel>;
  getNativeNwrapToken: NativeNwrapTokenModel;
  getPaymentTokenById: PaymentTokenModel;
  getRole: Role;
  getRoles: Array<Role>;
  getSettingsData: Array<Setting>;
  getStaff: Staff;
  getStaffBlockchainListPaginate: BlockchainStaffConnection;
  getStaffLists: StaffConnection;
  getStaffPaymentTokenListPaginate: PaymentTokenConnection;
  getTokenLists: Array<PaymentTokenModel>;
  getTokenListsPaginate: PaymentTokenConnection;
  getUserByToken: User;
  listFile: Array<FileObject>;
  me: User;
  staff: Staff;
};


export type QueryCheckUniqueUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  wallet_address: Scalars['String'];
};


export type QueryGetAccountArgs = {
  address_or_username: Scalars['String'];
};


export type QueryGetAccountByAddressArgs = {
  wallet_address: Scalars['String'];
};


export type QueryGetBlockchainByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetBlockchainDetailsArgs = {
  chain_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetBlockchainListsArgs = {
  status?: InputMaybe<Scalars['Int']>;
};


export type QueryGetItemsTokensArgs = {
  item_id: Scalars['Int'];
};


export type QueryGetNativeNwrapTokenArgs = {
  blockchain_id?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetPaymentTokenByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetRoleArgs = {
  id: Scalars['Int'];
};


export type QueryGetRolesArgs = {
  orderBy?: InputMaybe<RoleOrder>;
  query?: InputMaybe<Scalars['String']>;
};


export type QueryGetSettingsDataArgs = {
  optionGroup?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryGetStaffArgs = {
  id: Scalars['Int'];
};


export type QueryGetStaffBlockchainListPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
};


export type QueryGetStaffListsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<StaffOrder>;
  paginateNumber?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryGetStaffPaymentTokenListPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  blockchain_id?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
  collection_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
};


export type QueryGetTokenListsArgs = {
  blockchain_id?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetTokenListsPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  blockchain_id?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
  collection_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PaymentTokenOrder>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
};

export type ResetPasswordInput = {
  code: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type ResponseMessageWithStatusModel = {
  __typename?: 'ResponseMessageWithStatusModel';
  /** message */
  message: Scalars['String'];
  /** success */
  success: Scalars['Boolean'];
};

export type ResponseModel = {
  __typename?: 'ResponseModel';
  /** custom code */
  code: Scalars['Int'];
  /** message */
  message: Scalars['String'];
  /** success */
  success: Scalars['Boolean'];
};

export type Role = {
  __typename?: 'Role';
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  id: Scalars['Int'];
  name: Scalars['String'];
  permissions?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
};

export type RoleOrder = {
  direction: Scalars['String'];
  field: Scalars['String'];
};

export type Setting = {
  __typename?: 'Setting';
  id: Scalars['Int'];
  option_group?: Maybe<Scalars['String']>;
  option_key: Scalars['String'];
  option_value?: Maybe<Scalars['String']>;
  value_type?: Maybe<Scalars['Int']>;
};

export type Staff = {
  __typename?: 'Staff';
  avatar?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailVerifiedAt?: Maybe<Scalars['Date']>;
  id: Scalars['Int'];
  isEmailVerified: Scalars['Boolean'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  resetCode?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['Int']>;
  status: Scalars['Int'];
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
  username: Scalars['String'];
};

export type StaffConnection = {
  __typename?: 'StaffConnection';
  edges?: Maybe<Array<StaffEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type StaffCreateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  username: Scalars['String'];
};

export type StaffEdge = {
  __typename?: 'StaffEdge';
  cursor: Scalars['String'];
  node: Staff;
};

export type StaffLoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type StaffOrder = {
  direction: Scalars['String'];
  field: Scalars['String'];
};

export type StaffUpdateInput = {
  avatarFile?: InputMaybe<Scalars['Upload']>;
  description?: InputMaybe<Scalars['String']>;
  /** Send email field only if it is admin */
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT expiration time */
  expireAt: Scalars['Date'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
};

export type UpdateBlockChainDto = {
  api_key?: InputMaybe<Scalars['String']>;
  currency_symbol: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  exchange_contract?: InputMaybe<Scalars['String']>;
  explorer_url?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['Upload']>;
  network_name: Scalars['String'];
  nft_contract?: InputMaybe<Scalars['String']>;
  provider: Scalars['Int'];
  public_rpc_url?: InputMaybe<Scalars['String']>;
  rpc_url?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
  status?: InputMaybe<Scalars['Int']>;
  wss_url?: InputMaybe<Scalars['String']>;
};

export type UpdatePasswordInput = {
  oldPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type UpdatePaymentTokenDto = {
  blockchain_id: Scalars['Int'];
  contract_address: Scalars['String'];
  is_default?: InputMaybe<Scalars['Int']>;
  is_wrapable?: InputMaybe<Scalars['Int']>;
  logo?: InputMaybe<Scalars['Upload']>;
  min_amount_to_execute_auction: Scalars['Float'];
  name: Scalars['String'];
  status?: InputMaybe<Scalars['Int']>;
  sync_rate_status?: InputMaybe<Scalars['Int']>;
  token_symbol: Scalars['String'];
  total_decimal: Scalars['Int'];
  type: Scalars['Int'];
  usd_rate?: InputMaybe<Scalars['Float']>;
};

export type UpdateProfileInput = {
  banner_img_file?: InputMaybe<Scalars['Upload']>;
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  instagram_link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  profile_img_file?: InputMaybe<Scalars['Upload']>;
  username: Scalars['String'];
  website_link?: InputMaybe<Scalars['String']>;
};

export type UsefulLinkSettingsInput = {
  footer_useful_link_title_1?: InputMaybe<Scalars['String']>;
  footer_useful_link_title_2?: InputMaybe<Scalars['String']>;
  footer_useful_link_title_3?: InputMaybe<Scalars['String']>;
  footer_useful_link_title_4?: InputMaybe<Scalars['String']>;
  footer_useful_link_title_5?: InputMaybe<Scalars['String']>;
  footer_useful_link_url_1?: InputMaybe<Scalars['String']>;
  footer_useful_link_url_2?: InputMaybe<Scalars['String']>;
  footer_useful_link_url_3?: InputMaybe<Scalars['String']>;
  footer_useful_link_url_4?: InputMaybe<Scalars['String']>;
  footer_useful_link_url_5?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  banner_img?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  email?: Maybe<Scalars['String']>;
  email_verified_at?: Maybe<Scalars['Date']>;
  id: Scalars['Int'];
  is_email_verified?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profile_img?: Maybe<Scalars['String']>;
  reset_code?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
  username?: Maybe<Scalars['String']>;
  wallet_address: Scalars['String'];
};

export type WalletLoginInput = {
  address: Scalars['String'];
  nonce: Scalars['String'];
  signature: Scalars['String'];
};

export type WalletLoginMessage = {
  __typename?: 'WalletLoginMessage';
  login_message?: Maybe<Scalars['String']>;
  nonce: Scalars['String'];
};

export type GeneralSettingsInput = {
  address?: InputMaybe<Scalars['String']>;
  admin_commission?: InputMaybe<Scalars['String']>;
  application_title?: InputMaybe<Scalars['String']>;
  contract_email?: InputMaybe<Scalars['String']>;
  contract_phone?: InputMaybe<Scalars['String']>;
  copy_right_text?: InputMaybe<Scalars['String']>;
  wallet_address?: InputMaybe<Scalars['String']>;
};

export type LogoSettingsInput = {
  app_logo_large?: InputMaybe<Scalars['Upload']>;
  app_logo_small?: InputMaybe<Scalars['Upload']>;
  favicon_logo?: InputMaybe<Scalars['Upload']>;
};

export type MailSettingsInput = {
  mail_driver?: InputMaybe<Scalars['String']>;
  mail_encryption?: InputMaybe<Scalars['String']>;
  mail_from_address?: InputMaybe<Scalars['String']>;
  mail_from_name?: InputMaybe<Scalars['String']>;
  mail_host?: InputMaybe<Scalars['String']>;
  mail_password?: InputMaybe<Scalars['String']>;
  mail_port?: InputMaybe<Scalars['String']>;
  mail_username?: InputMaybe<Scalars['String']>;
};

export type RoleInput = {
  name: Scalars['String'];
  permissions?: InputMaybe<Scalars['String']>;
};

export type SocialSettingsInput = {
  discord_link?: InputMaybe<Scalars['String']>;
  facebook_link?: InputMaybe<Scalars['String']>;
  instagram_link?: InputMaybe<Scalars['String']>;
  linkedin_link?: InputMaybe<Scalars['String']>;
  twitter_link?: InputMaybe<Scalars['String']>;
  whatsapp_link?: InputMaybe<Scalars['String']>;
};

export type GenerateLoginMessageMutationVariables = Exact<{
  wallet_address: Scalars['String'];
}>;


export type GenerateLoginMessageMutation = { __typename?: 'Mutation', generateLoginMessage: { __typename?: 'WalletLoginMessage', login_message?: string | null | undefined, nonce: string } };

export type ResendVerifcationEmailMutationVariables = Exact<{ [key: string]: never; }>;


export type ResendVerifcationEmailMutation = { __typename?: 'Mutation', resendVerifcationEmail: { __typename?: 'ResponseModel', code: number, message: string, success: boolean } };

export type UpdateProfileMutationVariables = Exact<{
  banner_img_file?: InputMaybe<Scalars['Upload']>;
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  instagram_link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  profile_img_file?: InputMaybe<Scalars['Upload']>;
  username: Scalars['String'];
  website_link?: InputMaybe<Scalars['String']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'ResponseModel', code: number, message: string, success: boolean } };

export type UserVerifyMailMutationVariables = Exact<{
  verificationCode: Scalars['String'];
}>;


export type UserVerifyMailMutation = { __typename?: 'Mutation', userVerifyMail: { __typename?: 'ResponseModel', code: number, message: string, success: boolean } };

export type WalletLoginMutationVariables = Exact<{
  address: Scalars['String'];
  nonce: Scalars['String'];
  signature: Scalars['String'];
}>;


export type WalletLoginMutation = { __typename?: 'Mutation', walletLogin: { __typename?: 'Token', accessToken: string, expireAt: any, refreshToken: string } };

export type CheckUniqueUserQueryVariables = Exact<{
  wallet_address: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
}>;


export type CheckUniqueUserQuery = { __typename?: 'Query', checkUniqueUser: { __typename?: 'ResponseModel', code: number, success: boolean, message: string } };

export type GetAccountQueryVariables = Exact<{
  address_or_username: Scalars['String'];
}>;


export type GetAccountQuery = { __typename?: 'Query', getAccount: { __typename?: 'User', banner_img?: string | null | undefined, bio?: string | null | undefined, created_at: any, email?: string | null | undefined, id: number, name?: string | null | undefined, phone?: string | null | undefined, profile_img?: string | null | undefined, status?: number | null | undefined, updated_at: any, username?: string | null | undefined, is_email_verified?: number | null | undefined, wallet_address: string } };

export type GetAccountByAddressQueryVariables = Exact<{
  wallet_address: Scalars['String'];
}>;


export type GetAccountByAddressQuery = { __typename?: 'Query', getAccountByAddress: { __typename?: 'User', banner_img?: string | null | undefined, bio?: string | null | undefined, email?: string | null | undefined, id: number, name?: string | null | undefined, phone?: string | null | undefined, profile_img?: string | null | undefined, status?: number | null | undefined, username?: string | null | undefined, wallet_address: string, is_email_verified?: number | null | undefined } };

export type GetBlockchainListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlockchainListsQuery = { __typename?: 'Query', getBlockchainLists: Array<{ __typename?: 'BlockchainModel', chain_id?: number | null | undefined, currency_symbol: string, exchange_contract?: string | null | undefined, explorer_url?: string | null | undefined, id: number, description?: string | null | undefined, logo?: string | null | undefined, network_name: string, nft_contract?: string | null | undefined, provider: number, status?: number | null | undefined, payment_tokens?: Array<{ __typename?: 'PaymentTokenModel', blockchain_id: number, contract_address?: string | null | undefined, id: number, is_default: number, logo?: string | null | undefined, min_amount_to_execute_auction: any, name: string, status?: number | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, type: number }> | null | undefined }> };

export type GetBlockchainListsForChainIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlockchainListsForChainIdsQuery = { __typename?: 'Query', getBlockchainLists: Array<{ __typename?: 'BlockchainModel', chain_id?: number | null | undefined }> };

export type GetBlockchainListsForFilterQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlockchainListsForFilterQuery = { __typename?: 'Query', getBlockchainLists: Array<{ __typename?: 'BlockchainModel', id: number, chain_id?: number | null | undefined, network_name: string, logo?: string | null | undefined, status?: number | null | undefined }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', wallet_address: string } };

export type GetNativeNwrapTokenQueryVariables = Exact<{
  blockchain_id?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
}>;


export type GetNativeNwrapTokenQuery = { __typename?: 'Query', getNativeNwrapToken: { __typename?: 'NativeNwrapTokenModel', native_token?: { __typename?: 'PaymentTokenModel', id: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, is_wrapable: number, is_default: number, min_amount_to_execute_auction: any, type: number, logo?: string | null | undefined, usd_rate: any, blockchain?: { __typename?: 'BlockchainModel', id: number, network_name: string } | null | undefined } | null | undefined, wrap_token?: { __typename?: 'PaymentTokenModel', id: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, is_wrapable: number, is_default: number, min_amount_to_execute_auction: any, type: number, logo?: string | null | undefined, usd_rate: any, blockchain?: { __typename?: 'BlockchainModel', id: number, network_name: string } | null | undefined } | null | undefined } };

export type GetUserByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserByTokenQuery = { __typename?: 'Query', getUserByToken: { __typename?: 'User', wallet_address: string } };


export const GenerateLoginMessageDocument = `
    mutation generateLoginMessage($wallet_address: String!) {
  generateLoginMessage(wallet_address: $wallet_address) {
    login_message
    nonce
  }
}
    `;
export const useGenerateLoginMessageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<GenerateLoginMessageMutation, TError, GenerateLoginMessageMutationVariables, TContext>) =>
    useMutation<GenerateLoginMessageMutation, TError, GenerateLoginMessageMutationVariables, TContext>(
      'generateLoginMessage',
      (variables?: GenerateLoginMessageMutationVariables) => graphqlFetcher<GenerateLoginMessageMutation, GenerateLoginMessageMutationVariables>(GenerateLoginMessageDocument, variables)(),
      options
    );
export const ResendVerifcationEmailDocument = `
    mutation resendVerifcationEmail {
  resendVerifcationEmail {
    code
    message
    success
  }
}
    `;
export const useResendVerifcationEmailMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ResendVerifcationEmailMutation, TError, ResendVerifcationEmailMutationVariables, TContext>) =>
    useMutation<ResendVerifcationEmailMutation, TError, ResendVerifcationEmailMutationVariables, TContext>(
      'resendVerifcationEmail',
      (variables?: ResendVerifcationEmailMutationVariables) => graphqlFetcher<ResendVerifcationEmailMutation, ResendVerifcationEmailMutationVariables>(ResendVerifcationEmailDocument, variables)(),
      options
    );
export const UpdateProfileDocument = `
    mutation updateProfile($banner_img_file: Upload, $bio: String, $email: String, $instagram_link: String, $name: String, $phone: String, $profile_img_file: Upload, $username: String!, $website_link: String) {
  updateProfile(
    data: {banner_img_file: $banner_img_file, bio: $bio, email: $email, instagram_link: $instagram_link, name: $name, phone: $phone, profile_img_file: $profile_img_file, username: $username, website_link: $website_link}
  ) {
    code
    message
    success
  }
}
    `;
export const useUpdateProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateProfileMutation, TError, UpdateProfileMutationVariables, TContext>) =>
    useMutation<UpdateProfileMutation, TError, UpdateProfileMutationVariables, TContext>(
      'updateProfile',
      (variables?: UpdateProfileMutationVariables) => graphqlFetcher<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, variables)(),
      options
    );
export const UserVerifyMailDocument = `
    mutation userVerifyMail($verificationCode: String!) {
  userVerifyMail(verificationCode: $verificationCode) {
    code
    message
    success
  }
}
    `;
export const useUserVerifyMailMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UserVerifyMailMutation, TError, UserVerifyMailMutationVariables, TContext>) =>
    useMutation<UserVerifyMailMutation, TError, UserVerifyMailMutationVariables, TContext>(
      'userVerifyMail',
      (variables?: UserVerifyMailMutationVariables) => graphqlFetcher<UserVerifyMailMutation, UserVerifyMailMutationVariables>(UserVerifyMailDocument, variables)(),
      options
    );
export const WalletLoginDocument = `
    mutation walletLogin($address: String!, $nonce: String!, $signature: String!) {
  walletLogin(data: {address: $address, nonce: $nonce, signature: $signature}) {
    accessToken
    expireAt
    refreshToken
  }
}
    `;
export const useWalletLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<WalletLoginMutation, TError, WalletLoginMutationVariables, TContext>) =>
    useMutation<WalletLoginMutation, TError, WalletLoginMutationVariables, TContext>(
      'walletLogin',
      (variables?: WalletLoginMutationVariables) => graphqlFetcher<WalletLoginMutation, WalletLoginMutationVariables>(WalletLoginDocument, variables)(),
      options
    );
export const CheckUniqueUserDocument = `
    query checkUniqueUser($wallet_address: String!, $email: String, $username: String) {
  checkUniqueUser(
    wallet_address: $wallet_address
    email: $email
    username: $username
  ) {
    code
    success
    message
  }
}
    `;
export const useCheckUniqueUserQuery = <
      TData = CheckUniqueUserQuery,
      TError = unknown
    >(
      variables: CheckUniqueUserQueryVariables,
      options?: UseQueryOptions<CheckUniqueUserQuery, TError, TData>
    ) =>
    useQuery<CheckUniqueUserQuery, TError, TData>(
      ['checkUniqueUser', variables],
      graphqlFetcher<CheckUniqueUserQuery, CheckUniqueUserQueryVariables>(CheckUniqueUserDocument, variables),
      options
    );
export const useInfiniteCheckUniqueUserQuery = <
      TData = CheckUniqueUserQuery,
      TError = unknown
    >(
      variables: CheckUniqueUserQueryVariables,
      options?: UseInfiniteQueryOptions<CheckUniqueUserQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<CheckUniqueUserQuery, TError, TData>(
      ['checkUniqueUser.infinite', variables],
      (metaData) => graphqlFetcher<CheckUniqueUserQuery, CheckUniqueUserQueryVariables>(CheckUniqueUserDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetAccountDocument = `
    query getAccount($address_or_username: String!) {
  getAccount(address_or_username: $address_or_username) {
    banner_img
    bio
    created_at
    email
    id
    name
    phone
    profile_img
    status
    updated_at
    username
    is_email_verified
    wallet_address
  }
}
    `;
export const useGetAccountQuery = <
      TData = GetAccountQuery,
      TError = unknown
    >(
      variables: GetAccountQueryVariables,
      options?: UseQueryOptions<GetAccountQuery, TError, TData>
    ) =>
    useQuery<GetAccountQuery, TError, TData>(
      ['getAccount', variables],
      graphqlFetcher<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, variables),
      options
    );
export const useInfiniteGetAccountQuery = <
      TData = GetAccountQuery,
      TError = unknown
    >(
      variables: GetAccountQueryVariables,
      options?: UseInfiniteQueryOptions<GetAccountQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAccountQuery, TError, TData>(
      ['getAccount.infinite', variables],
      (metaData) => graphqlFetcher<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetAccountByAddressDocument = `
    query getAccountByAddress($wallet_address: String!) {
  getAccountByAddress(wallet_address: $wallet_address) {
    banner_img
    bio
    email
    id
    name
    phone
    profile_img
    status
    username
    wallet_address
    is_email_verified
  }
}
    `;
export const useGetAccountByAddressQuery = <
      TData = GetAccountByAddressQuery,
      TError = unknown
    >(
      variables: GetAccountByAddressQueryVariables,
      options?: UseQueryOptions<GetAccountByAddressQuery, TError, TData>
    ) =>
    useQuery<GetAccountByAddressQuery, TError, TData>(
      ['getAccountByAddress', variables],
      graphqlFetcher<GetAccountByAddressQuery, GetAccountByAddressQueryVariables>(GetAccountByAddressDocument, variables),
      options
    );
export const useInfiniteGetAccountByAddressQuery = <
      TData = GetAccountByAddressQuery,
      TError = unknown
    >(
      variables: GetAccountByAddressQueryVariables,
      options?: UseInfiniteQueryOptions<GetAccountByAddressQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAccountByAddressQuery, TError, TData>(
      ['getAccountByAddress.infinite', variables],
      (metaData) => graphqlFetcher<GetAccountByAddressQuery, GetAccountByAddressQueryVariables>(GetAccountByAddressDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetBlockchainListsDocument = `
    query getBlockchainLists {
  getBlockchainLists {
    chain_id
    currency_symbol
    exchange_contract
    explorer_url
    id
    description
    logo
    payment_tokens {
      blockchain_id
      contract_address
      id
      is_default
      logo
      min_amount_to_execute_auction
      name
      status
      token_symbol
      total_decimal
      type
    }
    network_name
    nft_contract
    provider
    status
  }
}
    `;
export const useGetBlockchainListsQuery = <
      TData = GetBlockchainListsQuery,
      TError = unknown
    >(
      variables?: GetBlockchainListsQueryVariables,
      options?: UseQueryOptions<GetBlockchainListsQuery, TError, TData>
    ) =>
    useQuery<GetBlockchainListsQuery, TError, TData>(
      variables === undefined ? ['getBlockchainLists'] : ['getBlockchainLists', variables],
      graphqlFetcher<GetBlockchainListsQuery, GetBlockchainListsQueryVariables>(GetBlockchainListsDocument, variables),
      options
    );
export const useInfiniteGetBlockchainListsQuery = <
      TData = GetBlockchainListsQuery,
      TError = unknown
    >(
      variables?: GetBlockchainListsQueryVariables,
      options?: UseInfiniteQueryOptions<GetBlockchainListsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetBlockchainListsQuery, TError, TData>(
      variables === undefined ? ['getBlockchainLists.infinite'] : ['getBlockchainLists.infinite', variables],
      (metaData) => graphqlFetcher<GetBlockchainListsQuery, GetBlockchainListsQueryVariables>(GetBlockchainListsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetBlockchainListsForChainIdsDocument = `
    query getBlockchainListsForChainIds {
  getBlockchainLists {
    chain_id
  }
}
    `;
export const useGetBlockchainListsForChainIdsQuery = <
      TData = GetBlockchainListsForChainIdsQuery,
      TError = unknown
    >(
      variables?: GetBlockchainListsForChainIdsQueryVariables,
      options?: UseQueryOptions<GetBlockchainListsForChainIdsQuery, TError, TData>
    ) =>
    useQuery<GetBlockchainListsForChainIdsQuery, TError, TData>(
      variables === undefined ? ['getBlockchainListsForChainIds'] : ['getBlockchainListsForChainIds', variables],
      graphqlFetcher<GetBlockchainListsForChainIdsQuery, GetBlockchainListsForChainIdsQueryVariables>(GetBlockchainListsForChainIdsDocument, variables),
      options
    );
export const useInfiniteGetBlockchainListsForChainIdsQuery = <
      TData = GetBlockchainListsForChainIdsQuery,
      TError = unknown
    >(
      variables?: GetBlockchainListsForChainIdsQueryVariables,
      options?: UseInfiniteQueryOptions<GetBlockchainListsForChainIdsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetBlockchainListsForChainIdsQuery, TError, TData>(
      variables === undefined ? ['getBlockchainListsForChainIds.infinite'] : ['getBlockchainListsForChainIds.infinite', variables],
      (metaData) => graphqlFetcher<GetBlockchainListsForChainIdsQuery, GetBlockchainListsForChainIdsQueryVariables>(GetBlockchainListsForChainIdsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetBlockchainListsForFilterDocument = `
    query getBlockchainListsForFilter {
  getBlockchainLists {
    id
    chain_id
    network_name
    logo
    status
  }
}
    `;
export const useGetBlockchainListsForFilterQuery = <
      TData = GetBlockchainListsForFilterQuery,
      TError = unknown
    >(
      variables?: GetBlockchainListsForFilterQueryVariables,
      options?: UseQueryOptions<GetBlockchainListsForFilterQuery, TError, TData>
    ) =>
    useQuery<GetBlockchainListsForFilterQuery, TError, TData>(
      variables === undefined ? ['getBlockchainListsForFilter'] : ['getBlockchainListsForFilter', variables],
      graphqlFetcher<GetBlockchainListsForFilterQuery, GetBlockchainListsForFilterQueryVariables>(GetBlockchainListsForFilterDocument, variables),
      options
    );
export const useInfiniteGetBlockchainListsForFilterQuery = <
      TData = GetBlockchainListsForFilterQuery,
      TError = unknown
    >(
      variables?: GetBlockchainListsForFilterQueryVariables,
      options?: UseInfiniteQueryOptions<GetBlockchainListsForFilterQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetBlockchainListsForFilterQuery, TError, TData>(
      variables === undefined ? ['getBlockchainListsForFilter.infinite'] : ['getBlockchainListsForFilter.infinite', variables],
      (metaData) => graphqlFetcher<GetBlockchainListsForFilterQuery, GetBlockchainListsForFilterQueryVariables>(GetBlockchainListsForFilterDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const MeDocument = `
    query me {
  me {
    wallet_address
  }
}
    `;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['me'] : ['me', variables],
      graphqlFetcher<MeQuery, MeQueryVariables>(MeDocument, variables),
      options
    );
export const useInfiniteMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      variables?: MeQueryVariables,
      options?: UseInfiniteQueryOptions<MeQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<MeQuery, TError, TData>(
      variables === undefined ? ['me.infinite'] : ['me.infinite', variables],
      (metaData) => graphqlFetcher<MeQuery, MeQueryVariables>(MeDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetNativeNwrapTokenDocument = `
    query getNativeNwrapToken($blockchain_id: Int, $chain_id: Int) {
  getNativeNwrapToken(blockchain_id: $blockchain_id, chain_id: $chain_id) {
    native_token {
      id
      name
      contract_address
      token_symbol
      total_decimal
      is_wrapable
      is_default
      min_amount_to_execute_auction
      type
      logo
      usd_rate
      blockchain {
        id
        network_name
      }
    }
    wrap_token {
      id
      name
      contract_address
      token_symbol
      total_decimal
      is_wrapable
      is_default
      min_amount_to_execute_auction
      type
      logo
      usd_rate
      blockchain {
        id
        network_name
      }
    }
  }
}
    `;
export const useGetNativeNwrapTokenQuery = <
      TData = GetNativeNwrapTokenQuery,
      TError = unknown
    >(
      variables?: GetNativeNwrapTokenQueryVariables,
      options?: UseQueryOptions<GetNativeNwrapTokenQuery, TError, TData>
    ) =>
    useQuery<GetNativeNwrapTokenQuery, TError, TData>(
      variables === undefined ? ['getNativeNwrapToken'] : ['getNativeNwrapToken', variables],
      graphqlFetcher<GetNativeNwrapTokenQuery, GetNativeNwrapTokenQueryVariables>(GetNativeNwrapTokenDocument, variables),
      options
    );
export const useInfiniteGetNativeNwrapTokenQuery = <
      TData = GetNativeNwrapTokenQuery,
      TError = unknown
    >(
      variables?: GetNativeNwrapTokenQueryVariables,
      options?: UseInfiniteQueryOptions<GetNativeNwrapTokenQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetNativeNwrapTokenQuery, TError, TData>(
      variables === undefined ? ['getNativeNwrapToken.infinite'] : ['getNativeNwrapToken.infinite', variables],
      (metaData) => graphqlFetcher<GetNativeNwrapTokenQuery, GetNativeNwrapTokenQueryVariables>(GetNativeNwrapTokenDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetUserByTokenDocument = `
    query getUserByToken {
  getUserByToken {
    wallet_address
  }
}
    `;
export const useGetUserByTokenQuery = <
      TData = GetUserByTokenQuery,
      TError = unknown
    >(
      variables?: GetUserByTokenQueryVariables,
      options?: UseQueryOptions<GetUserByTokenQuery, TError, TData>
    ) =>
    useQuery<GetUserByTokenQuery, TError, TData>(
      variables === undefined ? ['getUserByToken'] : ['getUserByToken', variables],
      graphqlFetcher<GetUserByTokenQuery, GetUserByTokenQueryVariables>(GetUserByTokenDocument, variables),
      options
    );
export const useInfiniteGetUserByTokenQuery = <
      TData = GetUserByTokenQuery,
      TError = unknown
    >(
      variables?: GetUserByTokenQueryVariables,
      options?: UseInfiniteQueryOptions<GetUserByTokenQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetUserByTokenQuery, TError, TData>(
      variables === undefined ? ['getUserByToken.infinite'] : ['getUserByToken.infinite', variables],
      (metaData) => graphqlFetcher<GetUserByTokenQuery, GetUserByTokenQueryVariables>(GetUserByTokenDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};
