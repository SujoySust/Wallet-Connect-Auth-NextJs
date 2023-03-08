import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Dialog } from "@headlessui/react";
import classes from "./Modal.module.css";
import { FiX } from "react-icons/fi";

export const Modal = ({
  show,
  outsideClose = true,
  showClose = true,
  onClose,
  children,
  title,
}: any) => {
  const [portalElement, setPortalElement] = useState<any>();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    const portalElement: any = document.getElementById("modal-root");
    setPortalElement(portalElement);
    setIsBrowser(true);
  }, []);

  const mainModal = show ? (
    <Dialog
      open={show}
      onClose={outsideClose ? onClose : () => {}}
      className={classes.dialog}
    >
      <div className={classes.wrapper}>
        <Dialog.Overlay className={classes.overlay} />

        <div className={classes.container}>
          {showClose && (
            <button
              type="button"
              aria-label="close modal"
              className={classes.closeBtn}
              onClick={onClose}
            >
              <FiX aria-label="close modal" />
            </button>
          )}

          {title && (
            <Dialog.Title className={classes.title}>{title}</Dialog.Title>
          )}

          <Dialog.Description as="div">{children}</Dialog.Description>
        </div>
      </div>
    </Dialog>
  ) : null;

  return isBrowser ? ReactDOM.createPortal(mainModal, portalElement) : null;
};
//lang ok
