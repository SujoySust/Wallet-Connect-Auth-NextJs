import Account from "./Account";
import Link from "next/link";
import { imageAsset, absPath } from "../../src/helpers/functions";
import Nav from "./Nav";
import { useAppSettings } from "../../hooks/useAppSettings";
import { RootState } from "src/store";
import { useSelector } from "react-redux";
import { useWindowSize } from "hooks/useWindowSize";
import { SETTINGS_SLUG_APP_LOGO_LARGE } from "src/helpers/slugcontanst";

const HeaderSection = ({settings}: any) => {
  // const setting: any = useSelector((state: RootState) => state.settings);
  const { height, width } = useWindowSize();
  return (
    <header className="header-area">
      <div className="container">
        <div className="header-wrap">
          <div className="brand-area">
            <Link href={absPath("")}>
              <a>
                {settings && settings[SETTINGS_SLUG_APP_LOGO_LARGE] ? <img
                    className="logo-img"
                    src={settings[SETTINGS_SLUG_APP_LOGO_LARGE]}
                    alt="logo"
                  /> : null
                }
              </a>
            </Link>
          </div>

          <div className="menu-area">
            <Nav />
          </div>


          <Account setting= {settings}/>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
//lang ok
