import { useState } from "react";
import { Menu } from "@headlessui/react";
import { usePopper } from "react-popper";
import classes from "./OptionMenu.module.css";
import { FiMenu } from "react-icons/fi";

export const OptionMenu = ({ btnClass, btnText, children }: any) => {
  const [referenceElement, setReferenceElement] = useState<any>();
  const [popperElement, setPopperElement] = useState<any>();
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <div className="btn-option-dropdown">
      <Menu as="div" className={classes.wrapper}>
        <Menu.Button
          ref={setReferenceElement}
          className={btnClass ? btnClass : classes.btn}
        >
          {btnText ? btnText : <FiMenu />}
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
    </div>
  );
};
//lang ok
