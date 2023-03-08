import classes from "./SearchFilterBar.module.css";
import { FiSearch } from "react-icons/fi";
import { BsGrid3X3Gap, BsGrid } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  isWiderEnable,
  isWiderDisable,
} from "../../src/store/slices/contentWideSlice";
import { RootState } from "../../src/store";
import { SortingMenu } from "./SortingMenu";
import { ListGroup } from "components/ListGroup";

export const SearchFilterBar = ({ setQuery, setSort, query }: any) => {
  const dispatch = useDispatch();
  const isWider = useSelector((state: RootState) => state.contentWide.isWider);

  return (
    <div className={classes.wrapper}>
      {/* Search */}
      <label htmlFor="search" className={classes.inputGroup}>
        <FiSearch />

        <input
          type="text"
          id="search"
          value={query}
          name="search"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <div className={classes.filterGroup}>
        {/* sort */}
        <SortingMenu setSort={setSort} className={classes.sortSelect} />

        {/* display */}
        {/* <div
          className={`list-group list-group-horizontal ${classes.displayGroup}`}
        > */}
        <ListGroup hr={true}>
          <button
            className={`list-group-item ${classes.displayBtn} ${
              isWider ? classes.active : ""
            }`}
            aria-label="display bigger"
            onClick={() => dispatch(isWiderEnable())}
          >
            <BsGrid />
          </button>

          <button
            className={`list-group-item ${classes.displayBtn} ${
              isWider ? "" : classes.active
            }`}
            aria-label="display smaller"
            onClick={() => dispatch(isWiderDisable())}
          >
            <BsGrid3X3Gap />
          </button>
        </ListGroup>
        {/* </div> */}
      </div>
    </div>
  );
};
//lang ok
