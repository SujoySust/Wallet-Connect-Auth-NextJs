import classes from "./Blockchain.module.css";
import { Disclosure } from "@headlessui/react";
import { Modal } from "../../../../../components/Modal";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Select from "react-select";
import useTranslation from "next-translate/useTranslation";

export const BlockchainModal = ({ show, onClose, title }: any) => {
  const { t } = useTranslation("common");

  return (
    <Modal show={show} onClose={onClose}>
      <div className={classes.blockchain}>
        <h3 className={classes.title}>{title}</h3>

        <p className={classes.learnmore}>
          Learn more about our supported Blockchains
        </p>

        <Disclosure as="div" className={classes.disclosure}>
          {({ open }) => (
            <>
              <Disclosure.Button className={classes.panelButton}>
                <span>{t("Mumbai")}</span>
                {open ? <FiChevronUp /> : <FiChevronDown />}
              </Disclosure.Button>

              <Disclosure.Panel className={classes.panelBody}>
                <span>{t("Mumbai is the testnet of Polygon.")}</span>
                <p>
                  {t(
                    "Polygon PoS is a scaling solution for public blockchains. Based on an adapted implementation of Plasma framework (Plasma MoreVP) - with an account-based implementation, Polygon supports all the existing Ethereum tooling along with faster and cheaper transactions."
                  )}
                </p>

                <a
                  href="https://matic.network/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("Learn more about Polygon")}
                </a>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className={classes.disclosure}>
          {({ open }) => (
            <>
              <Disclosure.Button className={classes.panelButton}>
                <span>{t("Rinkeby")}</span>
                {open ? <FiChevronUp /> : <FiChevronDown />}
              </Disclosure.Button>

              <Disclosure.Panel className={classes.panelBody}>
                <span>{t("Rinkeby is the testnet of Ethereum.")}</span>

                <p>
                  {t(
                    "Launched in 2015, Ethereum is an open-source, blockchain-based, decentralized software platform used for its own cryptocurrency, ether. It enables SmartContracts and Distributed Applications (ĐApps) to be built and run without any downtime, fraud, control, or interference from a third party."
                  )}
                </p>

                <a
                  href="https://ethereum.org/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about Ethereum
                </a>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </Modal>
  );
};

export const BlockchainSelect = ({
  options,
  selectedOption,
  value,
  onChange,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 55,
    }),
  };
  return (
    <Select
      classNamePrefix="profile"
      isSearchable={false}
      name="blockchain"
      placeholder={t("Select")}
      id="blockchain"
      options={options}
      defaultValue={selectedOption}
      value={value}
      isDisabled={!!value}
      onChange={onChange}
      styles={customStyles}
    />
  );
};
