import { Disclosure } from "@headlessui/react";

import classes from "./ConfirmDelete.module.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Select from "react-select";
import { Modal } from "./index";
import useTranslation from "next-translate/useTranslation";
export const ConfirmDeleteModal = ({
  show,
  onClose,
  title,
  description,
  onSubmit,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  return (
    <Modal show={show} onClose={onClose}>
      <div className={classes.confirmDelete}>
        <h3 className={classes.title}>{title}</h3>

        <p className={classes.learnmore}>{description}</p>
        <div className={`${classes.topSection} pt-4 pb-2`}>
          <button type="button" onClick={onClose}>
            {t("Never mind")}
          </button>
          <button type="button" className={classes.btnsolid} onClick={onSubmit}>
            {t("Proceed")}
          </button>
        </div>
      </div>
    </Modal>
  );
};
//lang ok
