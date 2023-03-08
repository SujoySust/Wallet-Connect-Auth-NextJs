import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Dialog } from "@headlessui/react";
import classes from "./Modal.module.css";
import { FiSearch, FiX } from "react-icons/fi";
import { SearchList } from "./SearchList";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

export const Search = ({ show, onClose, query, setQuery }: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  // window checking
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => setIsBrowser(true), []);

  // focus is not working
  // const queryRef = useRef<any>(null);
  // useEffect(() => {
  //   queryRef.current?.focus();
  // }, []);

  // console.log(query);

  const [portalElement, setPortalElement] = useState<any>();
  // move search bar from center to top

  const [showSearchContent, setShowSearchContent] = useState(false);

  useEffect(() => setShowSearchContent(false), []);

  useEffect(() => {
    const portalElement: any = document.getElementById("search-root");
    setPortalElement(portalElement);

    const text = query.trim();
    if (text.length > 2) setShowSearchContent(true);
    else setShowSearchContent(false);
  }, [query]);

  // onsubmit
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // console.log("Submitted: ", query);

    // router push
    onClose();
    setQuery("");
    router.push("/assets?query=" + query);
  };

  const mainSearch = show ? (
    <Dialog open={show} onClose={onClose} className={classes.dialog}>
      <div className={classes.wrapper}>
        <Dialog.Overlay className={classes.overlay} />
        <button
          type="button"
          aria-label="close modal"
          className={classes.closeBtn}
          onClick={onClose}
        >
          <FiX aria-label="close modal" />
        </button>

        <div
          className={`${classes.container} ${
            showSearchContent ? classes.notCentered : classes.centered
          }`}
        >
          <form className={classes.searchInputWrapper} onSubmit={handleSubmit}>
            <FiSearch className={classes.searchIcon} />

            <input
              type="text"
              name="search"
              placeholder={t("Search here") + "..."}
              id="search"
              className={classes.searchInput}
              autoFocus={true}
              // ref={queryRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          {/* search box */}
          {showSearchContent && (
            <SearchList query={query} submit={handleSubmit} onClose={onClose} />
          )}
        </div>
      </div>
    </Dialog>
  ) : null;

  return isBrowser ? ReactDOM.createPortal(mainSearch, portalElement) : null;
};
//lang ok
