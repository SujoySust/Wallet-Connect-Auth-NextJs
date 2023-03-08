import { useEffect, useState } from "react";
import classes from "./Account.module.css";
import NavForMobile from "../Nav/NavForMobile";
import {
  FiAlignJustify,
} from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { useWeb3React } from "@web3-react/core";
import { walletConnected } from "../../../hooks/useWallet";
import { HeadlessSidebar } from "../../HUI/HeadlessSidebar";
import { Connected } from "../../../sections/WalletSidebar/Connected";
import { NotConnected } from "../../../sections/WalletSidebar/NotConnected";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/store";
import { setShowSidebar } from "../../../src/store/slices/walletDrawerSlice";
import {
  initialCheckTheme,
} from "../../../src/store/slices/nightModeSlice";
import useTranslation from "next-translate/useTranslation";
import { Drawer } from "../../Drawer";

export default function Account() {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { active } = useWeb3React();

  const showSidebar = useSelector(
    (state: RootState) => state.sidebar.showSidebar
  );
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const handleToggleMenu = () => setShowMenu(!showMenu);
  // const [nightMode, setNightMode] = useState(false)
  const InitialCheckTheme = () => dispatch(initialCheckTheme());

  // get window size
  useEffect(() => {
    // ToggleNightMode();
    InitialCheckTheme();
  }, []);

  // show search modal
  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => setShowSearch(!showSearch);

  return (
    <>
      <div className="header-right">
        <ul className="header-right-item">
          <li>
            <a
              className={classes.link}
              onClick={() => dispatch(setShowSidebar(true))}
            >
              <IoWalletOutline aria-label="wallet" />
            </a>
          </li>

          <li>
            <button
              className="menu-toggle"
              onClick={handleToggleMenu}
              aria-label="toggle menu bar"
            >
              <FiAlignJustify aria-label="Menu toggle bar" />
            </button>
          </li>
        </ul>
      </div>

      {/* nav for mobile */}
      <Drawer
        show={showMenu}
        onClose={handleToggleMenu}
        onRightSide
      >
        <NavForMobile onClose={handleToggleMenu} />
      </Drawer>

      {/* wallet side bar */}
      {showSidebar && (
        <HeadlessSidebar
          title="My Wallet"
          show={showSidebar}
          onClose={() => dispatch(setShowSidebar(false))}
        >
          {walletConnected(active) ? <Connected /> : <NotConnected />}
        </HeadlessSidebar>
      )}
    </>
  );
}
