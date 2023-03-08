import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Dialog } from "@headlessui/react";
import classes from "./HeadlessSidebar.module.css";
import { FiX } from "react-icons/fi";

export const HeadlessSidebar = ({ show, onClose, children, title }: any) => {
  const [portalElement, setPortalElement] = useState<any>();

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    const portalElement: any = window?.document.getElementById("drawer-root");
    setPortalElement(portalElement);
    setIsBrowser(true);
  }, []);

  const MainHeadlessSidebar = show ? (
    <Dialog open={show} onClose={onClose} className={classes.dialog}>
      <div className={classes.wrapper}>
        <Dialog.Overlay className={classes.overlay} />

        <div className={classes.container}>
          <Dialog.Title className={classes.title}>
            {title || "Drawer"}

            <button
              type="button"
              className={classes.closeBtn}
              onClick={onClose}
            >
              <FiX />
            </button>
          </Dialog.Title>

          <Dialog.Description as="div">{children}</Dialog.Description>
        </div>
      </div>
    </Dialog>
  ) : null;

  return isBrowser
    ? ReactDOM.createPortal(MainHeadlessSidebar, portalElement)
    : null;
};
//lang ok
