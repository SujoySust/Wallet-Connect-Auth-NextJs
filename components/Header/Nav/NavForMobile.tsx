import Link from "next/link";
import classes from "./Nav.module.css";
import { absPath } from "../../../src/helpers/functions";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const NavForMobile = ({ onClose }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { pathname } = useRouter();

  return (
    <nav className={`container ${classes.nav}`}>
      <ul className={`${classes.mobileMenu}`}>
        <li>
          <Link href={absPath("")}>
            <a
              className={pathname === "/" ? classes.activeLink : classes.link}
              onClick={onClose}
            >
              {t("Home")}
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavForMobile;
//lang ok
