import classes from "./SelectedTokens.module.css";
import { FiX } from "react-icons/fi";

export const SelectedTokens = ({
  selsectedPaymentTokens,
  removeToken,
  network_name,
}: any) => {
  return (
    <div className={classes.wrapper}>
      {selsectedPaymentTokens?.map((el: any, index: number) => (
        <div key={index} className={classes.item}>
          <div className="d-flex align-items-center">
            <img
              src={el?.logo ? el?.logo : el?.payment_token?.logo}
              width={15}
              alt=""
            />
            <h4 className="ml-3">
              {el?.token_symbol
                ? el?.token_symbol
                : el?.payment_token?.token_symbol}
              {}

              <br />
              {network_name && <small className="">{network_name}</small>}
            </h4>
            {el?.payment_token?.is_default === 0 ? (
              <FiX
                className={classes.remove}
                onClick={() => {
                  removeToken(el?.payment_token?.id);
                }}
              />
            ) : el?.is_default === 0 ? (
              <FiX
                className={classes.remove}
                onClick={() => {
                  removeToken(el?.id);
                }}
                aria-label="remove token"
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
