import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FcCheckmark } from "react-icons/fc";
import { FiCopy, FiEye, FiInstagram } from "react-icons/fi";
import { MdWeb } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { useDebounce } from "use-debounce";
import { ImageUploader } from "../../../components/ImageUploader";
import { Input, InputError, InputField } from "../../../components/InputField";
import useWallet from "../../../hooks/useWallet";
import { useUpdateProfileMutation } from "../../../src/graphql/generated";
import {
  MAX_IMAGE_SIZE_IN_MB,
  STATUS_INACTIVE,
} from "../../../src/helpers/coreconstants";
import { containsSpecialChars } from "../../../src/helpers/functions";
import {
  checkOnPageAuthentication,
  checkUniqueEmail,
  checkUniqueUser,
  getAccountByAddress,
} from "../../../src/ssr/data";
import {
  setUserData,
  setUserDataError,
} from "../../../src/store/slices/userDataSlice";
import { TabHeader } from "../TabHeader";
import EmailVerifiedWarning from "./EmailVerifiedWarning";
import classes from "./Profile.module.css";

export const ProfileContent = ({ userData }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const dispatch = useDispatch();
  const { disConnectWallet } = useWallet();
  const { addToast } = useToasts();
  const router = useRouter();
  const updateProfile = useUpdateProfileMutation();

  const [uploadedImgError, setUploadedImgError] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState<any>();
  const [previewPhoto, setPreviewPhoto] = useState<any>(
    userData?.profile_img || undefined
  );

  const onPhotoChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedPhoto(undefined);
      return;
    } else {
      setSelectedPhoto(e.target.files[0]);
      setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
      setUploadedImgError(false);
    }
  };

  const [selectedBannerPhoto, setSelectedBannerPhoto] = useState<any>();
  const [previewBannerPhoto, setPreviewBannerPhoto] = useState<any>(
    userData?.banner_img || undefined
  );

  const onBannerPhotoChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedBannerPhoto(undefined);
      return;
    } else {
      setSelectedBannerPhoto(e.target.files[0]);
      setPreviewBannerPhoto(URL.createObjectURL(e.target.files[0]));
      setUploadedImgError(false);
    }
  };

  // Copy Address
  const [copied, setCopied] = useState(false);

  const handleCopyListener = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  // wallet
  const [wallet, setWallet] = useState("");
  // username
  const [username, setUsername] = useState("");

  const [usernameError, setUsernameError] = useState<boolean | string>(false);

  const handleUsername = async (input: any) => {
    try {
      const value = input.toLowerCase();
      if (value.length == 0) {
        setUsernameError(t("username is required!"));
        setUsername(value);
      } else if (containsSpecialChars(value)) {
        setUsernameError(t("username must have string and numbers only!"));
        setUsername(value);
      } else {
        const checked = await checkUniqueUser(userData.wallet_address, value);
        if (checked.success == false) {
          setUsernameError(t("username has already been taken!"));
          setUsername(value);
        } else {
          setUsernameError(false);
          setUsername(value);
        }
      }
    } catch (error: any) {
      setUsernameError(error.message);
    }
  };

  // bio
  const [bio, setBio] = useState("");

  // email
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | boolean>(false);

  const handleEmail = async (input: any) => {
    const value = input;
    if (value) {
      const checked = await checkUniqueEmail(userData.wallet_address, value);
      if (value.length == 0) {
        setEmailError(false);
        // setEmail(value);
      } else if (checked.success == false) {
        setEmailError(t("email has already been taken!"));
        setEmail(value);
      } else {
        setEmailError(false);
        setEmail(value);
      }
    }
  };
  const [debouncedTextUsername] = useDebounce(username, 500);
  const [debouncedTextEmail] = useDebounce(email, 500);
  // links - social
  const [socialLinks, setSocialLinks] = useState({
    site: "",
    //discord: "",
    instagram: "",
    //medium: "",
  });

  // validation

  const [disableButton, setDisableButton] = useState(false);

  const formIsNotValid = !!usernameError || !!emailError || uploadedImgError;

  useEffect(() => {
    setUsername(userData?.username);
    setEmail(userData?.email);
    setBio(userData?.bio ?? "");
    setWallet(userData?.wallet_address);
    setSocialLinks({
      site: userData?.social_links?.website_link,
      instagram: userData?.social_links?.instagram_link,
    });
    setPreviewPhoto(userData?.profile_img);
    setPreviewBannerPhoto(userData?.banner_img);
  }, [userData]);
  useEffect(() => {
    debouncedTextUsername && handleUsername(debouncedTextUsername);
  }, [debouncedTextUsername]);
  useEffect(() => {
    debouncedTextEmail && handleEmail(debouncedTextEmail);
  }, [debouncedTextEmail]);
  // handle profile update
  const handleProfileUpdate = async (e: any) => {
    e.preventDefault();
    setDisableButton(true);

    const obj = {
      username: username,
      bio: bio,
      email: email,
      instagram_link: socialLinks.instagram,
      website_link: socialLinks.site,
      profile_img_file: selectedPhoto,
      banner_img_file: selectedBannerPhoto,
      phone: null,
    };

    //console.table(obj);

    try {
      await checkOnPageAuthentication(userData.wallet_address, () => {});
      const data = await updateProfile.mutateAsync(obj);
      var emailStatus;
      addToast(data.updateProfile.message, { appearance: "success" });

      await getAccountByAddress(userData.wallet_address)
        .then((userData) => {
          dispatch(setUserData(userData.getAccountByAddress));
          // console.log(
          //   userData.getAccountByAddress.is_email_verified,
          //   "userData.getAccountByAddress"
          // );
        })
        .catch((err) => dispatch(setUserDataError(err)));

      // if (data.updateProfile.success && emailStatus === STATUS_ACTIVE) {
      //   router.push("/profile", undefined, { shallow: true });
      // }

      setDisableButton(false);
    } catch (err: any) {
      setDisableButton(false);

      if (err.code === 401) {
        addToast(err.message, { appearance: "error" });
        disConnectWallet();
      } else addToast(err.message, { appearance: "error" });
    }
  };

  return (
    <>
      <TabHeader
        title={t("Profile Settings")}
        url="/profile"
        btnText={t("Preview")}
        icon={<FiEye />}
      />
      {userData.is_email_verified === STATUS_INACTIVE && userData.email && (
        <EmailVerifiedWarning />
      )}
      <form onSubmit={handleProfileUpdate}>
        <div className="row">
          <div className="col-md-7">
            <InputField label={t("username")} required title={t("Username")}>
              <Input
                label={t("username")}
                placeholder={t("Enter Username")}
                value={username}
                onChange={(e: any) => {
                  setUsername(e.target.value);
                }}
              />

              {usernameError && <InputError error={usernameError} />}
            </InputField>

            <InputField label="bio" title="Bio">
              <textarea
                name="bio"
                id="bio"
                placeholder={t("Write your story...")}
                className={classes.bio}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />

              {bio && bio.length >= 1000 && (
                <InputError
                  error={t("bio should not be more than 1000 characters.")}
                />
              )}
            </InputField>

            <InputField label="email" title="Email">
              <Input
                label="email"
                type="email"
                placeholder={t("Enter email")}
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
              />

              {emailError && <InputError error={emailError} />}
            </InputField>

            {/* Links */}
            <InputField label="links" title="Links">
              <Input
                type="text"
                label="link1"
                prefix={
                  <span>
                    <MdWeb />
                  </span>
                }
                placeholder="yoursite.app"
                listElement={true}
                value={socialLinks.site}
                onChange={(e: any) =>
                  setSocialLinks({ ...socialLinks, site: e.target.value })
                }
              />

              {/* <Input
                type="text"
                label="link2"
                prefix={
                  <span>
                    <FaDiscord /> discord.gg/
                  </span>
                }
                placeholder="my-discord"
                listElement={true}
                onChange={(e: any) =>
                  setSocialLinks({ ...socialLinks, discord: e.target.value })
                }
              /> */}

              <Input
                type="text"
                label="link3"
                prefix={
                  <span>
                    <FiInstagram /> instagram.com/
                  </span>
                }
                placeholder="ighandler-_-"
                listElement={true}
                value={socialLinks.instagram}
                onChange={(e: any) =>
                  setSocialLinks({ ...socialLinks, instagram: e.target.value })
                }
              />

              {/* <Input
                type="text"
                label="link4"
                prefix={
                  <span>
                    <BsMedium /> medium.com/@
                  </span>
                }
                placeholder="will-shakespeare"
                listElement={true}
                onChange={(e: any) =>
                  setSocialLinks({ ...socialLinks, medium: e.target.value })
                }
              /> */}
            </InputField>

            <InputField label="wallet" title="Wallet Address">
              <Input
                label="wallet"
                value={wallet}
                disabled
                postfix={
                  <CopyToClipboard text={wallet} onCopy={handleCopyListener}>
                    {copied ? <FcCheckmark /> : <FiCopy />}
                  </CopyToClipboard>
                }
                onPostfixClick={handleCopyListener}
              />
            </InputField>
          </div>

          <div className="mt-5 mt-md-0 col-md-5">
            <div className={classes.imageUploaders}>
              <ImageUploader
                label="profilePhoto"
                title={t("Profile Image")}
                subtitle={t("Recommended 350 *350")}
                selectedFile={selectedPhoto}
                previewItem={previewPhoto || userData.profile_img}
                setUploadedImgError={setUploadedImgError}
                onChange={onPhotoChange}
                onClear={() => setSelectedPhoto(undefined)}
              />

              <ImageUploader
                label="bannerPhoto"
                title={t("Banner Image")}
                subtitle={t("Recommended 1400 * 400")}
                selectedFile={selectedBannerPhoto}
                previewItem={previewBannerPhoto || userData.banner_img}
                setUploadedImgError={setUploadedImgError}
                onChange={onBannerPhotoChange}
                onClear={() => setSelectedBannerPhoto(undefined)}
              />
            </div>
          </div>

          <div className="col-12">
            <button
              type="submit"
              className={"primary-btn " + classes.submitBtn}
              disabled={formIsNotValid || disableButton}
            >
              {t("Save")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
