import { Fragment, useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { FiInfo } from "react-icons/fi";
import classes from "./HeadlessPopover.module.css";

export const HeadlessPopover = ({ btnClass, btnText, children }: any) => {
  const [referenceElement, setReferenceElement] = useState<any>();
  const [popperElement, setPopperElement] = useState<any>();
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <Popover as={Fragment}>
      <Popover.Button
        ref={setReferenceElement}
        className={btnClass ? btnClass : classes.btn}
      >
        {btnText ? btnText : <FiInfo />}
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className={classes.panel}
      >
        {children}
      </Popover.Panel>
    </Popover>
  );
};
//lang ok
