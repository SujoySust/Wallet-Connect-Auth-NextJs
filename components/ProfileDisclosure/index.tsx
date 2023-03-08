import { Disclosure } from "@headlessui/react";
import classes from "./ProfileDisclosure.module.css";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

export const ProfileDisclosure = ({
  title,
  children,
  defaultOpen = false,
  passKey = false,
}: any) => {
  return (
    <Disclosure
      defaultOpen={defaultOpen}
      as="div"
      className={classes.disclosure}
      key={passKey ? new Date().getTime() : ""}
    >
      {({ open }) => (
        <>
          <Disclosure.Button className={classes.panelButton}>
            <span>{title}</span>

            {open ? <FiChevronUp /> : <FiChevronDown />}
          </Disclosure.Button>

          <Disclosure.Panel className={classes.panelBody}>
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
//lang ok
