import Link from "next/link";
import { absPath, collapseAddress } from "../../../src/helpers/functions";
import { MdWeb } from "react-icons/md";
import { Menu } from "@headlessui/react";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { AiFillMediumCircle } from "react-icons/ai";
import classes from "./ProfileHeader.module.css";
import { HiOutlineCog, HiOutlineShare } from "react-icons/hi";
import {
  FiTwitter,
  FiFacebook,
  FiAtSign,
  FiCopy,
  FiInstagram,
} from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";
import { RcTooltip } from "../../../components/Tooltip/rcTooltip";
import { useState } from "react";
import { Modal } from "../../../components/Modal";
import CopyToClipboard from "react-copy-to-clipboard";
import { useToasts } from "react-toast-notifications";
import { ListGroup } from "components/ListGroup";
import { ImageProfile } from "components/Images";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

export const ProfileHeader = ({ account, me }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { addToast } = useToasts();
  const url = absPath(`profile/${account?.username}`);

  const settings: any = useSelector(
    (state: RootState) => state.settings.settings
  );

  // copy
  const handleCopyListener = () => {
    addToast(t("Copied successfully"), { appearance: "success" });
  };
  // profile image modal
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      <div className={classes.ProfileHeader}>
        <div className={classes.ProfileHeaderContent}>
          <ImageProfile
            src={account.profile_img}
            alt={account.name || account.username}
            className={classes.profileImage}
            onClick={() => setShowImage(true)}
          />

          <div className={classes.profileInfo}>
            <h3>{account.name}</h3>
            <p>
              <FiAtSign />
              {account.username}
            </p>
            { me && <p>{account.email} </p>}
            <p>
              <RcTooltip
                overlay={
                  account.wallet_address ? account.wallet_address : "0_0"
                }
              >
                {collapseAddress(
                  account.wallet_address ? account.wallet_address : "0_0"
                )}
              </RcTooltip>
            </p>
            <p hidden>{account.phone}</p>
          </div>
        </div>

        <div className={classes.header}>
          <ListGroup hr={true}>
            {me && (
              <RcTooltip
                overlay={t("Settings")}
                className={"list-group-item " + classes.socialLink}
              >
                <Link href="/settings">
                  <a className={classes.social} aria-label="settings">
                    <HiOutlineCog />
                  </a>
                </Link>
              </RcTooltip>
            )}

            {account?.social_links?.instagram_link && (
              <RcTooltip
                overlay={t("Instagram")}
                className={"list-group-item " + classes.socialLink}
              >
                <a
                  href={
                    "http://instagram.com/" +
                    account?.social_links?.instagram_link
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.social}
                  aria-label="instagram"
                >
                  <FiInstagram />
                </a>
              </RcTooltip>
            )}
            {account?.social_links?.website_link && (
              <RcTooltip
                overlay={t("Website")}
                className={"list-group-item " + classes.socialLink}
              >
                <a
                  href={"http://" + account?.social_links?.website_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.social}
                  aria-label="website"
                >
                  <MdWeb />
                </a>
              </RcTooltip>
            )}

            {account?.social_links?.discord_link && (
              <RcTooltip
                overlay={t("Discord")}
                className={"list-group-item " + classes.socialLink}
              >
                <a
                  href={
                    "https://discord.gg/" + account?.social_links?.discord_link
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.social}
                  aria-label="discord"
                >
                  <FaDiscord />
                </a>
              </RcTooltip>
            )}

            {account?.social_links?.medium_link && (
              <RcTooltip
                overlay={t("Medium")}
                className={"list-group-item " + classes.socialLink}
              >
                <a
                  href={
                    "https://medium.com/" + account?.social_links?.medium_link
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.social}
                  aria-label="medium"
                >
                  <AiFillMediumCircle />
                </a>
              </RcTooltip>
            )}

            <Menu>
              <RcTooltip
                overlay={t("Share")}
                className={
                  "list-group-item " +
                  classes.socialLink +
                  " " +
                  classes.lastChild
                }
              >
                <Menu.Button
                  as="button"
                  type="button"
                  className={`position-relative ${classes.button}`}
                >
                  <HiOutlineShare aria-label="share button" />
                </Menu.Button>

                <Menu.Items as="div" className={`${classes.dropdownMenu}`}>
                  <CopyToClipboard text={url} onCopy={handleCopyListener}>
                    <Menu.Item
                      as="button"
                      className={`${classes.dropdownItem}`}
                    >
                      <FiCopy style={{ color: "#1d7af2" }} />
                      {t("Copy Link")}
                    </Menu.Item>
                  </CopyToClipboard>

                  <Menu.Item
                    as="a"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${classes.dropdownItem}`}
                  >
                    <FiFacebook style={{ color: "#1d7af2" }} />
                    {t("Share on Facebook")}
                  </Menu.Item>

                  <Menu.Item
                    as="a"
                    href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20account%20on%20${settings?.applicationTitle}&url=${url}`} // &via=${process.env.APP_NAME} for handler
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${classes.dropdownItem}`}
                  >
                    <FiTwitter style={{ color: "#1d9bf0" }} />
                    {t("Share on Twitter")}
                  </Menu.Item>

                  <Menu.Item
                    as="a"
                    href={`https://telegram.me/share/url?url=${url}&text=Check%20out%20this%20item%20on%20${settings?.applicationTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${classes.dropdownItem}`}
                  >
                    <FaTelegramPlane style={{ color: "#1d9bf0" }} />
                    {t("Share on Telegram")}
                  </Menu.Item>
                </Menu.Items>
              </RcTooltip>
            </Menu>
          </ListGroup>
        </div>
      </div>

      {/* Modal for image */}
      <Modal show={showImage} onClose={() => setShowImage(false)}>
        {!account.profile_img ? (
          <p className="text-center mt-3 text-danger">
            {t("User has not uploaded a profile image yet!")}
          </p>
        ) : (
          <div className={classes.profileImageModal}>
            <ImageProfile
              src={account.profile_img}
              alt={account.name || account.username}
              forModal={true}
            />
          </div>
        )}
      </Modal>
    </>
  );
};
