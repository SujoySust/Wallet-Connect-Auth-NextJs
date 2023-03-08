import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import classes from "./SearchList.module.css";

interface AccountType {
  id: number;
  profile_img?: string | null | undefined;
  username?: string | null | undefined;
}

export const AccountList = ({ accounts }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <ul className={classes.list}>
      <li className={classes.caption}>{t("Accounts")}</li>

      {accounts.map((acc: AccountType) => (
        <li key={acc.id}>
          <Link href={`/profile/${acc.username}`}>
            <a className={classes.asset}>
              <img
                src={acc.profile_img || "/assets/images/default-user.svg"}
                alt="asset"
                className={classes.image}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevent looping
                  currentTarget.src = "/assets/images/default-user.svg";
                }}
              />

              <div>
                <h4>{acc.username}</h4>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
//lang ok
