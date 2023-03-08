import { SyntheticEvent, useEffect, useState } from "react";
import {
  Input,
  InputError,
  InputField,
  Textarea,
} from "../../../../components/InputField";
import { BlockchainModal, BlockchainSelect } from "./Blockchain";
import { GoAlert } from "react-icons/go";
import { CategorySelect } from "./Category";
import { ExplicitSubTitle, ExplicitSwitch } from "./Explicit";
import { DisplayTheme } from "./DisplayTheme";
import { ImageUploader } from "../../../../components/ImageUploader";

// icons
import { FiInstagram, FiInfo } from "react-icons/fi";
import { MdWeb } from "react-icons/md";
import { FaDiscord, FaEthereum } from "react-icons/fa";
import { BsMedium, BsCurrencyBitcoin } from "react-icons/bs";
import { SelectedTokens } from "./SelectedTokens";
import {
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
} from "../../../../src/graphql/generated";
import { useToasts } from "react-toast-notifications";
import Router from "next/router";
import {
  absPath,
  checkSlug,
  containsSpecialChars,
} from "../../../../src/helpers/functions";
import useTranslation from "next-translate/useTranslation";
import { ethers } from "ethers";
import {
  checkOnPageAuthentication,
  checkUniqueCollectionName,
  checkUniqueCollectionSlug,
} from "../../../../src/ssr/data";
import { ConfirmDeleteModal } from "../../../../components/Modal/ConfirmDeleteModal";
import { Modal } from "components/Modal";
import WarningModal from "../WarningModal";
import { TokenSelect } from "./Token";
import { DummyButton } from "components/DummyButtons";
import { MAX_IMAGE_SIZE_IN_MB } from "src/helpers/coreconstants";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { useDebounce } from "use-debounce";

export const CollectionForm = ({ collection, data }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const createCollectionMutation = useCreateCollectionMutation();
  const updateCollectionMutation = useUpdateCollectionMutation();
  const deleteCollectionMutation = useDeleteCollectionMutation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const { addToast } = useToasts();
  const categoryOptions = data.categories;
  const blockChainOptions = data.blockchains;
  const tokenOptions = data.payment_tokens;
  const BlockchainSelectOptions = prepareBlockChainData(blockChainOptions);
  const categorySelectOptions = prepareCategoryData(categoryOptions);
  const tokenSelectOption = prepareTokenData(tokenOptions);

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const [collectionName, setCollectionName] = useState(
    collection ? collection.collection.name : ""
  );
  const [collectionNameError, setCollectionNameError] = useState<
    string | boolean
  >(false);

  const [slug, setSlug] = useState(
    collection ? collection.collection.slug : ""
  );
  const [slugError, setSlugError] = useState<string | boolean>(false);
  const [isUniqueSlug, setUniqueSlug] = useState<boolean>(true);

  const [description, setDescription] = useState(
    collection ? collection.collection.description : ""
  );
  const [descriptionError, setDescriptionError] = useState<boolean | string>(
    false
  );

  const [selectedCategory, setSelectedCategory] = useState<any>(
    collection
      ? getSelectedCategoryData(
          categoryOptions,
          collection.collection.category_id
        )
      : undefined
  );
  const [categoryError, setCategoryError] = useState<string | boolean>(false);

  const [blockchainOption, setBlockchainOption] = useState<any>(undefined);
  const [blockchainValue, setBlockchainValue] = useState<any>(
    collection
      ? getSelectedBlockChainData(
          blockChainOptions,
          collection.collection.blockchain_id
        )
      : undefined
  );
  const [showBlockchain, setShowBlockchain] = useState(false);
  const [blockchainError, setBlockchainError] = useState<string | boolean>(
    false
  );

  const [selectedTokens, setSelectedToken] = useState<any>(
    collection?.token_mappings ? collection?.token_mappings : []
  );
  const [defaultBlockchain, setDefaultBlockchain] = useState<any>(null);

  const [socialLinks, setSocialLinks] = useState({
    site: collection ? collection.social_links.website_link : "",
    discord: collection ? collection.social_links.discord_link : "",
    instagram: collection ? collection.social_links.instagram_link : "",
    medium: collection ? collection.social_links.medium_link : "",
  });

  const ThemeButtonsList = getThemeLists();
  const [selectedTheme, setSelectedTheme] = useState(
    collection
      ? getSelectedTheme(ThemeButtonsList, collection.collection.display_theme)
      : ThemeButtonsList[1]
  );
  const compareTwoArrayObjectAndRemoveDublicateById = (a: any, b: any) => {
    return a.filter(
      (item: any) =>
        b.findIndex((obj: any) => obj?.payment_token?.id === item?.id) === -1
    );
  };
  const [paymentToken, setPaymentToken] = useState<any>(
    collection?.collection?.blockchain?.payment_tokens
      ? compareTwoArrayObjectAndRemoveDublicateById(
          collection?.collection?.blockchain?.payment_tokens,
          selectedTokens
        )
      : []
  );

  const removeToken = (id: number) => {
    const removeFromSelectedToken = selectedTokens.filter((token: any) => {
      return token?.payment_token?.id
        ? token?.payment_token?.id != id
        : token.id != id;
    });
    const addTokenToPayment = selectedTokens.find((token: any) => {
      return token?.payment_token?.id
        ? token?.payment_token?.id == id
        : token.id == id;
    });

    setSelectedToken(removeFromSelectedToken);
    setPaymentToken([...paymentToken, addTokenToPayment]);
  };

  const addToken = (e: any) => {
    if (e.value) {
      const AddToSelectedToken = paymentToken.find((token: any) => {
        return token?.payment_token?.id
          ? token?.payment_token?.id === e.value
          : token.id === e.value;
      });
      const removeFromPaymentToken = paymentToken.filter((token: any) => {
        return token?.payment_token?.id
          ? token?.payment_token?.id != e.value
          : token.id != e.value;
      });

      setSelectedToken([...selectedTokens, AddToSelectedToken]);
      setPaymentToken(removeFromPaymentToken);
    }
  };

  const maxCreatorEarningsPercentage = 10;
  const [creatorEarnings, setCreatorEarnings] = useState<any>(
    collection ? collection.collection.royalties : undefined
  );
  const [creatorEarningsError, setCreatorEarningsError] = useState<
    string | boolean
  >(false);
  const [payoutAddress, setPayoutAddress] = useState(
    collection ? collection.collection.payout_address : undefined
  );
  const [payoutAddressError, setPayoutAddressError] = useState<
    string | boolean
  >(false);

  const [explicitStatus, setExplicitStatus] = useState(
    collection ? collection.collection.is_sensitive : false
  );

  const [selectedLogo, setSelectedLogo] = useState<any>(undefined);
  const [previewLogo, setPreviewLogo] = useState<any>(
    collection ? collection.collection.logo : undefined
  );
  const [logoError, setLogoError] = useState<boolean | string>(false);

  const [selectedFeatured, setSelectedFeatured] = useState<any>(undefined);
  const [previewFeatured, setPreviewFeatured] = useState<any>(
    collection ? collection.collection.feature_image : undefined
  );
  const [featuredImageError, setFeaturedImageError] = useState<
    boolean | string
  >(false);

  const [selectedBanner, setSelectedBanner] = useState<any>(undefined);
  const [previewBanner, setPreviewBanner] = useState<any>(
    collection ? collection.collection.banner_image : undefined
  );
  const [bannerImageError, setBannerImageError] = useState<boolean | string>(
    false
  );

  // create a previewLogo as a side effect, whenever selected file is changed
  const [uploadedImgError, setUploadedImgError] = useState(false);

  const onLogoChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedLogo(undefined);
      !collection && !selectedLogo && setLogoError(t("Logo is required!"));
      return;
    } else {
      setSelectedLogo(e.target.files[0]);
      setPreviewLogo(URL.createObjectURL(e.target.files[0]));
      setLogoError(false);
    }
  };

  const onFeatureChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFeatured(undefined);
      return;
    }
    setSelectedFeatured(e.target.files[0]);
    setPreviewFeatured(URL.createObjectURL(e.target.files[0]));
    setFeaturedImageError(false);
  };

  const onBannerChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedBanner(undefined);
      return;
    }
    setSelectedBanner(e.target.files[0]);
    setPreviewBanner(URL.createObjectURL(e.target.files[0]));
    setBannerImageError(false);
  };

  const handleCollectionNameChange = async (inputValue: any) => {
    try {
      const value = inputValue;
      if (value.length == 0) {
        setCollectionNameError(t("Name is required!"));
        setCollectionName(value);
      } else if (containsSpecialChars(value)) {
        setCollectionNameError(
          t("Name must provide without special characters.")
        );
        setCollectionName(value);
      } else {
        const checked = await checkUniqueCollectionName(
          collection ? collection.collection.id : null,
          value
        );
        if (checked.success == false) {
          setCollectionNameError(t("Name has already been taken!"));
          setCollectionName(value);
        } else {
          setCollectionNameError(false);
          setCollectionName(value);
        }
      }
    } catch (error: any) {
      setCollectionNameError(error.message);
    }
  };
  const [debouncedText] = useDebounce(collectionName, 500);

  useEffect(() => {
    if (debouncedText) handleCollectionNameChange(debouncedText);
  }, [debouncedText]);

  const handleSlugChange = async (e: any) => {
    try {
      const value = e.target.value;
      if (!checkSlug(value) && value.length > 0) {
        setSlugError(
          t("Must only contain lowercase letters,numbers, and hyphens.")
        );
      } else if (value.length === 0) {
        setSlugError(false);
        setSlug(null);
      } else {
        const checked = await checkUniqueCollectionSlug(
          collection ? collection.collection.id : null,
          value
        );
        if (checked.success == false) {
          setSlugError("Url has already been taken!");
          setSlug(value);
        } else {
          setSlugError(false);
          setSlug(value);
        }
      }
    } catch (error: any) {
      setSlugError(error.message);
    }
  };

  const handleDescriptionChange = (e: any) => {
    const value = e.target.value;
    if (value.trim().length > 1000) {
      setDescription(e.target.value);
      setDescriptionError(
        t("Description length will be less than 1000 characters!")
      );
    } else {
      setDescription(e.target.value);
      setDescriptionError(false);
    }
  };
  const handlePayoutAddressChange = (e: any) => {
    const value = e.target.value;
    const isValid = ethers.utils.isAddress(value);
    if (!value) {
      setPayoutAddressError(t("Invalid payout required!"));
    } else if (isValid) {
      setPayoutAddress(ethers.utils.getAddress(value));
      setPayoutAddressError(false);
    } else {
      setPayoutAddressError(t("Invalid payout address!"));
    }
  };

  const handleCreatorEarningsChange = (e: any) => {
    const value = e.target.value;
    if (value > maxCreatorEarningsPercentage) {
      setCreatorEarningsError(t("Creator earnings cannot be greater than 10%"));
    } else {
      setCreatorEarningsError(false);
      setCreatorEarnings(value);
      if (value > 0) {
        if (!payoutAddress) {
          setPayoutAddressError(t("Payout address is required!"));
        } else {
          setPayoutAddressError(false);
        }
      } else {
        setPayoutAddressError(false);
      }
    }
  };

  const handleCategoryChange = (e: any) => {
    if (e && e.value) {
      setSelectedCategory(e);
      setCategoryError(false);
    } else {
      setSelectedCategory(null);
      setCategoryError(t("Category is required!"));
    }
  };

  const handleBlockChainChange = (e: any) => {
    if (e.value) {
      setBlockchainOption(e.value);
      setBlockchainError(false);

      const selectedBlockchain = data.blockchains.find(
        (blockchain: any) => blockchain.id == e.value
      );
      const defaultTokens = selectedBlockchain.payment_tokens?.filter(
        (token: any) => token.is_default === 1
      );
      const notDefaultTokens = selectedBlockchain.payment_tokens?.filter(
        (token: any) => token.is_default === 0
      );
      setDefaultBlockchain(selectedBlockchain);
      setSelectedToken(defaultTokens);
      setPaymentToken(notDefaultTokens);
    } else {
      if (!collection) {
        setBlockchainError(t("Blockchain is required!"));
      } else {
        setBlockchainError(false);
      }
    }
  };

  const checkValid = () => {
    if (collection) {
      return (
        !uploadedImgError &&
        collectionName &&
        !collectionNameError &&
        !slugError &&
        selectedCategory &&
        !categoryError &&
        !logoError &&
        !creatorEarningsError &&
        !payoutAddressError &&
        !descriptionError
      );
    } else {
      return (
        !uploadedImgError &&
        collectionName &&
        !collectionNameError &&
        !slugError &&
        selectedCategory &&
        !categoryError &&
        blockchainOption &&
        !blockchainError &&
        selectedLogo &&
        !logoError &&
        !creatorEarningsError &&
        !payoutAddressError &&
        !descriptionError
      );
    }
  };

  const formRequiredFiledCheck = () => {
    !collectionName &&
      setCollectionNameError(t("Collection name is required!"));
    !selectedCategory && setCategoryError(t("Category is required!"));
    !collection &&
      !blockchainOption &&
      setBlockchainError(t("Blockchain is required!"));
    !collection && !selectedLogo && setLogoError(t("Logo is required!"));
    creatorEarnings > 0 &&
      !payoutAddress &&
      setPayoutAddressError(t("Payout address is required!"));
    description &&
      description.trim().length > 1000 &&
      setDescriptionError(
        t("Description length will be less than 1000 characters!")
      );
  };

  // useEffect(() => {
  //   setIsSubmitting(isSubmitting);
  //   console.log("in Effect: ", isSubmitting);
  // }, [isSubmitting]);

  const formData = {
    name: collectionName.trim(),
    slug: slug,
    logo_file: selectedLogo,
    feature_image_file: selectedFeatured,
    banner_image_file: selectedBanner,
    description: description.trim(),
    category_id: selectedCategory?.value,
    blockchain_id: blockchainOption ? blockchainOption : 0,
    website_link: socialLinks.site,
    discord_link: socialLinks.discord,
    instagram_link: socialLinks.instagram,
    medium_link: socialLinks.medium,
    royalties: creatorEarnings ? parseFloat(creatorEarnings) : 0.0, // or the given number
    payout_address: payoutAddress, // or the given number
    payment_tokens: selectedTokens
      .map((data: any) =>
        data?.payment_token ? data?.payment_token?.id : data.id
      )
      .join(","),
    display_theme: selectedTheme.id,
    is_sensitive: explicitStatus == true ? 1 : 0,
  };

  const [isSubmitting, setIsSubmitting] = useState<any>(false);

  const handleUpdateCollection = async () => {
    await checkOnPageAuthentication(userData.wallet_address, () => {});
    formRequiredFiledCheck();
    const isValid = checkValid();

    await setIsSubmitting(true);

    try {
      if (isValid && collection && collection.collection.id) {
        let message = "";

        await updateCollectionMutation.mutateAsync({
          id: collection.collection.id,
          ...formData,
        });
        message = "Collection updated successfully";

        // if (5 == 5) throw new Error("Damn!! 3 is less than 5!");
        // console.log(message, collection.collection.id, isSubmitting);

        addToast(message, { appearance: "success" });
        Router.push(absPath("collections"));
        setIsSubmitting(false);
      } else {
        addToast(t("Form is not valid"), { appearance: "error" });
        setIsSubmitting(false);
      }
    } catch (error: any) {
      addToast(error.message, { appearance: "error" });
      setIsSubmitting(false);
    }
  };

  const handleCreateCollection = async () => {
    await checkOnPageAuthentication(userData.wallet_address, () => {});
    formRequiredFiledCheck();
    const isValid = checkValid();

    await setIsSubmitting(true);

    try {
      if (isValid) {
        let message = "";

        await createCollectionMutation.mutateAsync({ ...formData });
        message = "Collection created successfully";

        // if (5 !== 5) throw new Error("Damn!! 3 is less than 5!");
        // console.log(message, isSubmitting);

        addToast(message, { appearance: "success" });
        Router.push(absPath("collections"));

        setShowWarning(false);
        setIsSubmitting(false);
      } else {
        addToast(t("Form is not valid"), { appearance: "error" });
        setIsSubmitting(false);
        setShowWarning(false);
      }
    } catch (error: any) {
      addToast(error.message, { appearance: "error" });
      setIsSubmitting(false);
      setShowWarning(false);
    }
  };

  const handleCollectionDeleteOperation = async () => {
    try {
      await checkOnPageAuthentication(userData.wallet_address, () => {});
      await deleteCollectionMutation.mutateAsync({
        id: collection.collection.id,
      });
      addToast(t("Collection deleted successfully"), { appearance: "success" });
      Router.push(absPath("collections"));
    } catch (error: any) {
      addToast(error.message, { appearance: "error" });
    }
  };

  return (
    <>
      {/* onSubmit={handleForm} onSubmit={(e) => e.preventDefault()}*/}
      <div>
        <div className="row justify-content-between">
          {/* Logo */}
          <div className="col-md-5 col-lg-4">
            <ImageUploader
              label="logoImg"
              title={t("Logo image")}
              subtitle={t(
                "This image will also be used for navigation. 350 x 350 recommended."
              )}
              selectedFile={selectedLogo}
              previewItem={previewLogo}
              onChange={onLogoChange}
              setUploadedImgError={setUploadedImgError}
              onClear={() => setSelectedLogo(undefined)}
              required
            />
            {logoError && <InputError error={logoError} />}
          </div>

          {/* Featured */}
          <div className="col-md-7">
            <ImageUploader
              label="featuredImg"
              title="Featured image"
              subtitle={t(
                "This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of NFT. 600 x 400 recommended."
              )}
              selectedFile={selectedFeatured}
              previewItem={previewFeatured}
              onChange={onFeatureChange}
              setUploadedImgError={setUploadedImgError}
              onClear={() => setSelectedFeatured(undefined)}
            />
            {featuredImageError && <InputError error={featuredImageError} />}
          </div>

          {/* Banner */}
          <div className="col-md-12">
            <ImageUploader
              label="bannerImg"
              title="banner image"
              subtitle={t(
                "This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 400 recommended."
              )}
              selectedFile={selectedBanner}
              previewItem={previewBanner}
              onChange={onBannerChange}
              setUploadedImgError={setUploadedImgError}
              onClear={() => setSelectedBanner(undefined)}
            />
            {bannerImageError && <InputError error={bannerImageError} />}
          </div>

          <div className="col">
            {/* Name */}
            <InputField label={t("name")} title={t("Name")} required>
              <Input
                type="text"
                label={t("name")}
                placeholder={t("enter your collection's name")}
                value={collectionName}
                onChange={(e: any) => setCollectionName(e.target.value)}
                required
              />

              {collectionNameError && (
                <InputError error={collectionNameError} />
              )}
            </InputField>
            {/* URL */}
            <InputField
              label={t("url")}
              title={t("URL")}
              subTitle={t(
                "Customize your URL on NFT. Must only contain lowercase letters,numbers, and hyphens."
              )}
            >
              <Input
                type="text"
                label={t("url")}
                prefix="https://nft.io/collection/"
                placeholder={t("the-best-nft-ever")}
                value={slug}
                onChange={(e: any) => handleSlugChange(e)}
              />

              {slugError && <InputError error={slugError} />}
            </InputField>
            {/* Description */}
            <InputField
              label={t("description")}
              title={t("Description")}
              subTitle={
                "Write your descriptiton here." +
                description.length +
                " " +
                "of 1000 characters used."
              }
            >
              {/* <ReactQuillEditor
              description={description}
              setDescription={setDescription}
            /> */}

              <Textarea
                id="description"
                placeholder={t("Write here...")}
                value={description}
                setValue={handleDescriptionChange}
              />
              {descriptionError && <InputError error={descriptionError} />}
            </InputField>

            {/* Category */}
            <InputField
              label={t("category")}
              title={t("Category")}
              subTitle={t(
                "Adding a category will help make your item discoverable on NFT."
              )}
              required
            >
              {categorySelectOptions && (
                <CategorySelect
                  options={categorySelectOptions}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={handleCategoryChange}
                />
              )}
              {categoryError && <InputError error={categoryError} />}
            </InputField>

            {/* Links */}
            <InputField label={t("links")} title={t("Links")}>
              <Input
                type="text"
                label={t("link1")}
                prefix={
                  <span>
                    <MdWeb />
                  </span>
                }
                placeholder={t("yoursite.app")}
                value={socialLinks.site}
                listElement={true}
                onChange={(e: any) =>
                  setSocialLinks({ ...socialLinks, site: e.target.value })
                }
              />

              <Input
                type="text"
                label={t("link2")}
                prefix={
                  <span>
                    <FaDiscord /> discord.gg/
                  </span>
                }
                placeholder={t("my-discord")}
                value={socialLinks.discord}
                listElement={true}
                onChange={(e: any) =>
                  setSocialLinks({ ...socialLinks, discord: e.target.value })
                }
              />

              <Input
                type="text"
                label={t("link3")}
                prefix={
                  <span>
                    <FiInstagram /> instagram.com/
                  </span>
                }
                placeholder={t("ighandler-_-")}
                value={socialLinks.instagram}
                listElement={true}
                onChange={(e: any) =>
                  setSocialLinks({ ...socialLinks, instagram: e.target.value })
                }
              />

              <Input
                type="text"
                label="link4"
                prefix={
                  <span>
                    <BsMedium /> medium.com/@
                  </span>
                }
                placeholder="will-shakespeare"
                listElement={true}
                value={socialLinks.medium}
                onChange={(e: any) =>
                  setSocialLinks({ ...socialLinks, medium: e.target.value })
                }
              />
            </InputField>
            {/* Creator Earnings */}
            <InputField
              label="creatorEarning"
              title={t("Creator Earnings (Royalities)")}
              subTitle={
                <span
                  className="custom-red 
                  d-flex align-items-center
                  justify-content-center
                
                "
                >
                  <GoAlert />
                  <span className="ml-2">
                    {t(
                      " Creator earning will not changeable after creating any item."
                    )}
                  </span>
                  <br />{" "}
                  {/* <a href="percentage-policy" target="_blank" rel="noopener">
                    Learn more about creator earnings.
                  </a>{" "} */}
                </span>
              }
            >
              <Input
                type="number"
                disabled={
                  collection
                    ? collection?.itemCount === 0
                      ? false
                      : true
                    : false
                }
                label="creatorEarning"
                placeholder={t("Percentage fee. e.g 2.5")}
                min={0}
                step="0.01"
                value={creatorEarnings}
                onChange={(e: any) => handleCreatorEarningsChange(e)}
              />

              {creatorEarningsError && (
                <InputError error={creatorEarningsError} />
              )}

              {!creatorEarningsError &&
              creatorEarnings > 0 &&
              creatorEarnings <= maxCreatorEarningsPercentage ? (
                <InputField
                  title={t("Your payout wallet address")}
                  required
                  label="payoutAddress"
                >
                  <Input
                    type="text"
                    required
                    label={t("payoutAddress")}
                    placeholder={t(
                      "Please enter an address, e.g. 0x1ed3... or destination.eth"
                    )}
                    value={payoutAddress}
                    onChange={(e: any) => handlePayoutAddressChange(e)}
                  />
                  {payoutAddressError && (
                    <InputError error={payoutAddressError} />
                  )}
                </InputField>
              ) : collection &&
                collection?.itemCount == 0 &&
                creatorEarnings > 0 &&
                creatorEarnings <= maxCreatorEarningsPercentage ? (
                <InputField
                  title={t("Your payout wallet address")}
                  required
                  label="payoutAddress"
                >
                  <Input
                    type="text"
                    required
                    label={t("payoutAddress")}
                    placeholder={t(
                      "Please enter an address, e.g. 0x1ed3... or destination.eth"
                    )}
                    value={payoutAddress}
                    onChange={(e: any) => handlePayoutAddressChange(e)}
                  />
                  {payoutAddressError && (
                    <InputError error={payoutAddressError} />
                  )}
                </InputField>
              ) : (
                ""
              )}
            </InputField>
            {/* Blockchain */}
            <InputField
              label={t("blockchain")}
              title={t("Blockchain")}
              required
              subTitle={
                <span>
                  {t(
                    "Select the blockchain where you'd like new items from this collection to be added by default."
                  )}
                  {/*<button type="button">*/}
                  {/*  <FiInfo onClick={() => setShowBlockchain(true)} />*/}
                  {/*</button>*/}
                </span>
              }
            >
              <BlockchainSelect
                options={BlockchainSelectOptions}
                selectedOption={blockchainOption}
                value={blockchainValue}
                onChange={handleBlockChainChange}
              />
              {blockchainError && <InputError error={blockchainError} />}
            </InputField>
            {selectedTokens?.length > 0 && (
              <InputField
                label={t("paymentToken")}
                title={t("Payment Token")}
                subTitle={t(
                  "These tokens can be used to buy and sell your items."
                )}
              >
                <SelectedTokens
                  network_name={
                    collection?.collection?.blockchain?.network_name
                      ? collection?.collection?.blockchain?.network_name
                      : defaultBlockchain?.network_name
                  }
                  selsectedPaymentTokens={selectedTokens}
                  removeToken={removeToken}
                />
              </InputField>
            )}
            {paymentToken.length > 0 && (
              <InputField label={t("Token")} title={t("Token")} required>
                <TokenSelect
                  options={paymentToken}
                  onChange={addToken}
                  network_name={
                    collection?.collection?.blockchain?.network_name
                      ? collection?.collection?.blockchain?.network_name
                      : defaultBlockchain?.network_name
                  }
                />
              </InputField>
            )}
            {/* Display Theme */}
            {/* <InputField
              label="theme"
              title="Display theme"
              subTitle={t("Change how your items are shown.")}
            >
              <DisplayTheme
                themes={ThemeButtonsList}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
              />
            </InputField> */}
            {/* Explicit Content */}
            <InputField
              label="explicit"
              title={t("Explicit & sensitive content")}
              subTitle={<ExplicitSubTitle />}
              leftSideContent={
                <ExplicitSwitch
                  enabled={explicitStatus}
                  setEnabled={setExplicitStatus}
                />
              }
            />
            {collection &&
              (!isSubmitting ? (
                <button
                  type="button"
                  className="primary-btn"
                  disabled={!checkValid()}
                  onClick={handleUpdateCollection}
                >
                  {t("Update Collection")}
                </button>
              ) : (
                <DummyButton />
              ))}

            {!collection &&
              (!isSubmitting ? (
                <button
                  type="button"
                  className="primary-btn"
                  disabled={!checkValid()}
                  onClick={() => setShowWarning(true)}
                >
                  {t("Create Collection")}
                </button>
              ) : (
                <DummyButton />
              ))}

            {/* {!isSubmitting && <DummyButton />} */}

            {collection && collection?.itemCount == 0 && (
              <button
                type="button"
                className="primary-btn float-right"
                style={{
                  background: "transparent",
                  border: "1px solid red",
                  color: "red",
                }}
                onClick={() => setShowDeleteConfirm(true)}
              >
                {t("Delete Collection")}
              </button>
            )}
          </div>
        </div>
      </div>

      {showBlockchain && (
        <BlockchainModal
          show={showBlockchain}
          onClose={() => setShowBlockchain(false)}
          title="Blockchain Information"
        />
      )}
      {showDeleteConfirm && (
        <ConfirmDeleteModal
          show={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onSubmit={handleCollectionDeleteOperation}
          description={t("Are you sure to delete this collection?")}
          title={t("Delete Collection")}
        />
      )}

      <Modal
        show={showWarning}
        onClose={() => setShowWarning(false)}
        title={t("Are you sure?")}
      >
        <WarningModal
          submitting={isSubmitting}
          setShow={setShowWarning}
          onSubmit={handleCreateCollection}
          description="Creator earning will not changeable after creating any item."
        />
      </Modal>
    </>
  );
};

const prepareBlockChainData = (blockChainOptions: any) => {
  return (
    blockChainOptions &&
    blockChainOptions.map((data: any) => {
      return {
        value: data.id,
        label: (
          <span className="d-flex align-items-center select_menu">
            <img src={data.logo} width={18} />{" "}
            <h4 className="ml-3 mb-0">
              {data.network_name}
              <br />
              <small>{data.description}</small>
            </h4>
          </span>
        ),
      };
    })
  );
};

const getSelectedBlockChainData = (
  blockChainOptions: any,
  blockchain_id: number
) => {
  let selectedBlockchain = null;
  blockChainOptions.filter((option: any) => {
    if (option.id == blockchain_id) {
      selectedBlockchain = {
        value: option.id,
        label: (
          <span className="d-flex align-items-center">
            <img src={option.logo} width={15} />
            <h4 className="ml-2">
              {option.network_name}
              <br />
              <small>{option.description}</small>
            </h4>
          </span>
        ),
      };
    }
  });
  return selectedBlockchain;
};

const prepareCategoryData = (categoryOptions: any) => {
  return (
    categoryOptions &&
    categoryOptions.map((data: any) => {
      return {
        value: data.id,
        label: (
          <div>
            {" "}
            <img src={data.image} width={20} /> {data.title}
          </div>
        ),
      };
    })
  );
};

const getSelectedCategoryData = (categoryOptions: any, category_id: number) => {
  let selectedCategory = null;
  categoryOptions.filter((option: any) => {
    if (option.id == category_id) {
      selectedCategory = {
        value: option.id,
        label: (
          <div>
            {" "}
            <img src={option.image} width={20} /> {option.title}
          </div>
        ),
      };
    }
  });
  return selectedCategory;
};

const prepareTokenData = (tokenOptions: any) => {
  return (
    tokenOptions &&
    tokenOptions.map((data: any) => {
      return {
        id: data.id,
        logo: data.logo,
        title: data.name,
        symbol: data.token_symbol,
      };
    })
  );
};

const getThemeLists = () => {
  return [
    {
      id: 1,
      title: "padded",
      sub: "Recommended for assets with transparent background",
    },
    {
      id: 2,
      title: "contained",
      sub: "Recommended for assets that are not a 1:1 ratio",
    },
    {
      id: 3,
      title: "covered",
      sub: "Recommended for assets that can extend to the edge",
    },
  ];
};

const getSelectedTheme = (themeList: any, selectedId: number) => {
  return (
    themeList.filter((option: any) => {
      return option.id == selectedId;
    })[0] ?? null
  );
};
//lang ok
