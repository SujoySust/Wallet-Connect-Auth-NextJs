import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { MIN_COIN_INPUT_AMOUNT } from "src/helpers/coreconstants";
import { ProfileDisclosure } from "../ProfileDisclosure";
import classes from "./SidebarItems.module.css";

export const FilterPrice = ({ prices, setPrices }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const [minPrice, setMinPrice] = useState<any>("");
  const [maxPrice, setMaxPrice] = useState<any>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setPrices([{ minPrice, maxPrice }]);
  };

  useEffect(() => {
    if (prices?.length === 0) {
      setMinPrice("");
      setMaxPrice("");
    }
  }, [prices]);

  return (
    <ProfileDisclosure title={t("Price")}>
      <form onSubmit={handleSubmit}>
        <div className={classes.priceRanges}>
          <input
            type="number"
            name="num1"
            id="num1"
            placeholder="Min"
            min={0}
            step={MIN_COIN_INPUT_AMOUNT}
            // defaultValue={minPrice}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />

          <span>{t("to")}</span>

          <input
            type="number"
            name="num2"
            id="num2"
            placeholder="Max"
            min={0}
            step={MIN_COIN_INPUT_AMOUNT}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        {maxPrice > 0 && minPrice > maxPrice && (
          <small className="text-danger">
            {t("Minimum must be less than maximum")}
          </small>
        )}

        <button
          type="submit"
          className={classes.submitBtn}
          disabled={
            (minPrice <= 0 && maxPrice <= 0) ||
            (maxPrice > 0 && minPrice > maxPrice)
          }
        >
          {t("Apply")}
        </button>
      </form>
    </ProfileDisclosure>
  );
};
