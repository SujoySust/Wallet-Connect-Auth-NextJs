import { Loading } from "components/Loader/Loading";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import {
  useGetNotificationSettingsEventQuery,
  useGetNotificationSettingsQuery,
  useUserNotificationSettingSaveMutation,
} from "src/graphql/generated";
import { STATUS_ACTIVE } from "src/helpers/coreconstants";
import { checkOnPageAuthentication } from "src/ssr/data";
import { collapseAddress } from "../../../src/helpers/functions";
import { TabHeader } from "../TabHeader";
import { CheckboxItem } from "./CheckboxItem";
import classes from "./Notifications.module.css";

export const NotificationsSettings = ({ userData }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { addToast } = useToasts();
  const [allCheckIds, setAllCheckIds] = useState([]);

  const {
    data: CheckBoxItems,
    isLoading: CheckBoxItemsLoading,
    isSuccess: CheckBoxItemsSuccess,
  } = useGetNotificationSettingsEventQuery(
    {},
    {
      refetchOnWindowFocus: false,
    }
  );
  const {
    data: NotificationSettings,
    isLoading: NotificationSettingsLoading,
    isSuccess: NotificationSettingsSuccess,
    refetch: NotificationSettingsRefetch,
  } = useGetNotificationSettingsQuery(
    {},
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutateAsync } = useUserNotificationSettingSaveMutation();

  useEffect(() => {
    const parsed =
      NotificationSettings?.getNotificationSettings?.events
        ?.split(",")
        .map(function (item) {
          return parseInt(item);
        }) || [];
    var allCheckIdsPrivate = parsed.map((item: any) => {
      if (isNaN(item)) {
        return;
      } else {
        return item;
      }
    });

    //@ts-ignore
    setAllCheckIds(
      //@ts-ignore
      allCheckIdsPrivate[0] === undefined ? [] : allCheckIdsPrivate
    );
    //cleanup
    return () => {
      setAllCheckIds([]);
    };
  }, [NotificationSettingsSuccess, NotificationSettingsSuccess]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await checkOnPageAuthentication(userData.wallet_address, () => {});
    const res = await mutateAsync({
      events: allCheckIds,
    });
    res.userNotificationSettingSave.success === true &&
      addToast(res.userNotificationSettingSave.message, {
        appearance: "success",
        autoDismiss: true,
      });
    res.userNotificationSettingSave.success === false &&
      addToast(res.userNotificationSettingSave.message, {
        appearance: "error",
        autoDismiss: true,
      });
    NotificationSettingsRefetch();
  };
  const onCheckboxChange = (e: any) => {
    const { id, checked }: any = e.target;
    const newCheckIds = [...allCheckIds];
    if (checked) {
      //@ts-ignore
      newCheckIds.push(parseInt(id));
    }
    if (!checked) {
      //@ts-ignore
      newCheckIds.splice(newCheckIds.indexOf(parseInt(id)), 1);
    }
    setAllCheckIds(newCheckIds);
  };
  return (
    <>
      <TabHeader title={t("Notification Settings")} />
      <p className={classes.subtitle}>
        {t("Select which notifications you would like to receive for")}{" "}
        {collapseAddress(userData.wallet_address)}
      </p>
      {CheckBoxItemsLoading && <Loading />}
      {CheckBoxItemsSuccess && !CheckBoxItemsLoading && (
        <form onSubmit={handleSubmit}>
          <ul className={`list-group ${classes.listGroup}`}>
            {CheckBoxItems?.getNotificationSettingsEvent?.map(
              (el: any) =>
                el.status === STATUS_ACTIVE && (
                  <CheckboxItem
                    key={el.id}
                    id={el.id}
                    //@ts-ignore
                    value={allCheckIds.includes(el?.id)}
                    onChange={onCheckboxChange}
                    title={el.title}
                    subtitle={el.description}
                  />
                )
            )}
          </ul>

          <button type="submit" className="primary-btn mt-5">
            {t("Save")}
          </button>
        </form>
      )}
    </>
  );
};
//lang ok
