import classes from "./Info.module.css";
import { useToasts } from "react-toast-notifications";
import { FiFlag, FiMoreVertical, FiEye, FiEyeOff } from "react-icons/fi";
import { HeadlessPopover } from "../../../../components/HUI/HeadlessPopover";
import { RcTooltip } from "../../../../components/Tooltip/rcTooltip";
import { ListGroup } from "components/ListGroup";
import { FaDiscord } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillMediumCircle } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import {
  useCheckCollectionWatchedByUserQuery,
  useCollectionWatchListToggleMutation,
} from "src/graphql/generated";
import { checkOnPageAuthentication } from "src/ssr/data";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import TinySpinner from "components/Loader/TinySpinner";
import { SETTINGS_SLUG_CONTRACT_EMAIL } from "src/helpers/slugcontanst";
import useTranslation from "next-translate/useTranslation";
import { walletConnected } from "hooks/useWallet";
export const Info = ({ collection, socialLinks, singleCollection }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const { addToast } = useToasts();
  const Settings: any = useSelector((state: RootState) => state.settings);
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const [authenticatedAction, setAutheticateAction] = useState(false);

  const { mutateAsync, isLoading, isError } =
    useCollectionWatchListToggleMutation();

  const { data, isLoading: CheckLoading } =
    useCheckCollectionWatchedByUserQuery(
      {
        collection_id: collection.id,
        user_id: userData?.id,
        user_wallet_address: userData?.wallet_address,
      },
      {
        refetchOnWindowFocus: false,
      }
    );
  const [watchlist, setWatchlist] = useState(singleCollection.is_watched);

  const toggleWatch = async () => {
    if (collection.id && active) {
      setAutheticateAction(false);
      try {
        const res = await checkOnPageAuthentication(
          userData.wallet_address,
          setAutheticateAction
        );
        if (res === true) {
          const mutationResponse = await mutateAsync({
            collectionId: collection.id,
          });
          if (mutationResponse.collectionWatchListToggle.success) {
            setWatchlist(!watchlist);
            addToast(mutationResponse.collectionWatchListToggle.message, {
              appearance: "success",
            });
          } else {
            addToast(mutationResponse.collectionWatchListToggle.message, {
              appearance: "error",
            });
          }
        }
      } catch (error) {
        return;
      }
    }
  };

  useEffect(() => {
    setWatchlist(data?.checkCollectionWatchedByUser);
  }, [data?.checkCollectionWatchedByUser]);

  //connected
  const { active } = useWeb3React();

  // blockchain
  const blockchain = collection?.blockchain;

  return (
    <>
      <div className={classes.header}>
        <ListGroup hr={true}>
          <RcTooltip
            overlay={blockchain?.network_name}
            className={"list-group-item " + classes.socialLink}
          >
            <a
              href={`${blockchain?.explorer_url}/address/${blockchain?.nft_contract}`}
              target="_blank"
              rel="noopener noreferrer"
              // className={"list-group-item " + classes.socialLink}
            >
              <img
                src={blockchain?.logo}
                alt={blockchain?.network_name}
                width={13}
              />
            </a>
          </RcTooltip>
          {walletConnected(active) && (
            <RcTooltip
              overlay={
                watchlist === false
                  ? t("Add to Watch List")
                  : t("Remove from watch list")
              }
              className={"list-group-item " + classes.socialLink}
            >
              {isLoading ? (
                <TinySpinner />
              ) : (
                <button
                  type="button"
                  className={` ${classes.btn} ${classes.social}`}
                  aria-label="refresh"
                  onClick={toggleWatch}
                >
                  {watchlist === false ? <FiEye /> : <FiEyeOff />}
                </button>
              )}
            </RcTooltip>
          )}
          {socialLinks?.discord_link && (
            <RcTooltip
              overlay={"Discord"}
              className={"list-group-item " + classes.socialLink}
            >
              <a
                href={"http://discord.com/" + socialLinks?.discord_link}
                target="_blank"
                className={classes.social}
                aria-label="discord"
                rel="noopener noreferrer"
              >
                <FaDiscord />
              </a>
            </RcTooltip>
          )}
          {socialLinks?.instagram_link && (
            <RcTooltip
              overlay={"Instagram"}
              className={"list-group-item " + classes.socialLink}
            >
              <a
                href={"http://instagram.com/" + socialLinks?.instagram_link}
                target="_blank"
                className={classes.social}
                rel="noopener noreferrer"
                aria-label="instagram"
              >
                <AiFillInstagram />
              </a>
            </RcTooltip>
          )}
          {socialLinks?.medium_link && (
            <RcTooltip
              overlay={"Medium"}
              className={"list-group-item " + classes.socialLink}
            >
              <a
                href={"http://medium.com/" + socialLinks?.medium_link}
                target="_blank"
                className={classes.social}
                rel="noopener noreferrer"
                aria-label="medium"
              >
                <AiFillMediumCircle />
              </a>
            </RcTooltip>
          )}
          {socialLinks?.website_link && (
            <RcTooltip
              overlay={"Website"}
              className={"list-group-item " + classes.socialLink}
            >
              <a
                href={"http://" + socialLinks?.website_link}
                target="_blank"
                className={classes.social}
                rel="noopener noreferrer"
                aria-label="website"
              >
                <CgWebsite />
              </a>
            </RcTooltip>
          )}

          <HeadlessPopover
            btnClass={"list-group-item " + classes.btns}
            btnText={<FiMoreVertical />}
          >
            <a
              href={`mailto:${
                Settings?.settings &&
                Settings?.settings[SETTINGS_SLUG_CONTRACT_EMAIL]
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className={`${classes.popupListItem}`}>
                <FiFlag style={{ marginRight: 12 }} />
                {t("Report")}
              </button>
            </a>
            {/* <div className={`list-group ${classes.popupListGroup}`}>
            </div> */}
          </HeadlessPopover>
        </ListGroup>
      </div>
    </>
  );
};
//lang ok
