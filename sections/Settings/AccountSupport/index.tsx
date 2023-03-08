import { Disclosure } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useSelector } from "react-redux";
import { SETTINGS_SLUG_CONTRACT_EMAIL } from "src/helpers/slugcontanst";
import { RootState } from "src/store";
import { TabHeader } from "../TabHeader";
import classes from "./AccountSupport.module.css";
export const AccountSupportSettings = () => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const Settings: any = useSelector(
    (state: RootState) => state.settings.settings
  );
  return (
    <>
      <TabHeader title={t("Account Support")} />
      <div className={" " + classes.collapsContainer}>
        {/* <Disclosure as="div" className={classes.disclosure}>
          {({ open }) => (
            <>
              <Disclosure.Button className={classes.panelButton}>
                <span className="d-flex align-items-center">General help</span>
                {open ? <FiChevronUp /> : <FiChevronDown />}
              </Disclosure.Button>

              <Disclosure.Panel className={classes.panelBody}>
                <p>
                  Visit our{" "}
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    {" "}
                    help center{" "}
                  </a>
                  to learn how to get started with buying, selling, and
                  creating.
                </p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure> */}
        <Disclosure as="div" className={classes.disclosure}>
          {({ open }) => (
            <>
              <Disclosure.Button className={classes.panelButton}>
                <span className="d-flex align-items-center">
                  {t("Contact Support")}
                </span>
                {open ? <FiChevronUp /> : <FiChevronDown />}
              </Disclosure.Button>

              <Disclosure.Panel className={classes.panelBody}>
                <p>
                  {t("Can't find the answers you're looking for? Contact to")}
                  <a
                    href={`mailto:${Settings[SETTINGS_SLUG_CONTRACT_EMAIL]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    &nbsp; {Settings[SETTINGS_SLUG_CONTRACT_EMAIL]}
                  </a>
                </p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};
//lang ok
