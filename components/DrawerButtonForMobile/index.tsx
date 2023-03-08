import { FiChevronRight } from "react-icons/fi";
import classes from "./DrawerButtonForMobile.module.css";

export const DrawerButtonForMobile = ({ onClick, fixedSidebar }: any) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${classes.drawerBtn} ${
        fixedSidebar ? classes.drawerBtnFixed : ""
      }`}
    >
      <FiChevronRight />
    </button>
  );
};
//lang ok
