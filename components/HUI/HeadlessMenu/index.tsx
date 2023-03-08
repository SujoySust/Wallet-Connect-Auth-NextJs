import { useState } from "react";
import { Menu } from "@headlessui/react";
import { usePopper } from "react-popper";
import classes from "./HeadlessMenu.module.css";
import { FiMenu } from "react-icons/fi";

export const HeadlessMenu = ({
  btnClass,
  btnText,
  icon,
  children,
  wrapperWidth = "100%",
}: any) => {
  const [referenceElement, setReferenceElement] = useState<any>();
  const [popperElement, setPopperElement] = useState<any>();
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <Menu as="div" className={classes.wrapper} style={{ width: wrapperWidth }}>
      <Menu.Button
        ref={setReferenceElement}
        className={btnClass ? btnClass : classes.btn}
      >
        {icon && icon} {btnText ? btnText : <FiMenu />}
      </Menu.Button>

      <Menu.Items
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className={classes.panel}
      >
        <Menu.Item as="div">{children}</Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
//langn ok
