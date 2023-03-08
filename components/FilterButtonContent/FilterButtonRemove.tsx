import { FiX } from "react-icons/fi";
import classes from "./FilterButtonContent.module.css";

export const FilterButtonRemove = ({ title, onClick }: any) => {
  return (
    <div>
      {title}{" "}
      <button
        type="button"
        onClick={onClick}
        className={classes.filterButtonRemove}
      >
        <FiX />
      </button>
    </div>
  );
};
//lang ok
