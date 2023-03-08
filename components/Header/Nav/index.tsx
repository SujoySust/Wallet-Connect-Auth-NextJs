import { useWeb3React } from "@web3-react/core";
import useWallet, { walletConnected } from "hooks/useWallet";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import { absPath } from "../../../src/helpers/functions";
import classes from "./Nav.module.css";

const Nav = () => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const { disConnectWallet } = useWallet();
  const { active } = useWeb3React();

  const { pathname } = useRouter();

  return (
    <nav>
      <ul className={`${classes.mainMenu} main-menu`}>
        <li>
          <Link href={absPath("")}>
            <a className={pathname === "/" ? "active" : ""}>{t("Home")}</a>
          </Link>
          <Link href={absPath("profile")}>
            <a>
              <i className="fas fa-user" /> {t("Profile")}
            </a>
          </Link>
          <Link href={absPath("settings")}>
            <a>
              <i className="fas fa-cog" /> {t("Settings")}
            </a>
          </Link>
          {walletConnected(active) && (
                <button type="button" className="btn btn-danger" onClick={disConnectWallet}>
                {" "}
                <FiLogOut className="mr-3" />
                {t("Logout")}
              </button>
              )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
//lang ok
