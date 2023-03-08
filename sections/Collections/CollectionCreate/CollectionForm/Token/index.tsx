import classes from "./Token.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import useTranslation from "next-translate/useTranslation";

export const TokenSelect = ({
  options,
  selectedOption,
  value,
  onChange,
  network_name,
}: any) => {
  const [Items, setItems] = useState();
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  useEffect(() => {
    setItems(
      options?.map((item: any) => {
        return {
          value: item?.payment_token?.id ? item?.payment_token?.id : item?.id,
          label: (
            <div className="d-flex align-items-center">
              <img
                src={
                  item?.payment_token?.logo
                    ? item?.payment_token?.logo
                    : item?.logo
                }
                width={15}
              />
              <h4 className="ml-3 mb-0">
                {item?.payment_token?.token_symbol
                  ? item?.payment_token?.token_symbol
                  : item?.token_symbol}
                <br />
                {network_name && <small className="">{network_name}</small>}
              </h4>
            </div>
          ),
        };
      })
    );
  }, [options]);

  return (
    <Select
      classNamePrefix="profile"
      // isSearchable={false}
      name="Select Token"
      placeholder={t("Select")}
      id="token"
      options={Items}
      value={null}
      // defaultValue={selectedOption}
      // value={Items}
      // isDisabled={!Items}
      onChange={onChange}
      // menuIsOpen
    />
  );
};
