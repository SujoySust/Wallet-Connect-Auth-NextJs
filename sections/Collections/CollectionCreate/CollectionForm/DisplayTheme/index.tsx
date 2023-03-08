import { Dispatch, SetStateAction } from "react";
import { FiCheck } from "react-icons/fi";
import classes from "./DisplayTheme.module.css";

interface ThemeType {
  themes: {
    id: number;
    title: string;
    sub: string;
  }[];
  selectedTheme: {
    id: number;
    title: string;
    sub: string;
  };
  setSelectedTheme: Dispatch<
    SetStateAction<{
      id: number;
      title: string;
      sub: string;
    }>
  >;
}

export const DisplayTheme = ({
  themes,
  selectedTheme,
  setSelectedTheme,
}: ThemeType) => {
  return (
    <>
      {themes.map((el, idx) => (
        <button
          key={el.id + idx}
          type="button"
          className={`${classes.button} ${
            el.id === selectedTheme.id
              ? classes.buttonSelected
              : classes.buttonSelectedNot
          }`}
          onClick={() => setSelectedTheme(el)}
        >
          {el.id === selectedTheme.id && (
            <span className={classes.selectedIcon}>
              {" "}
              <FiCheck />{" "}
            </span>
          )}
          <div className={classes.buttonContent}>
            <img
              src={`/assets/images/create-collection/${el.title}.svg`}
              alt={el.title}
              className={classes.buttonContentImage}
            />

            <div>
              <h3>{el.title}</h3>

              <p>{el.sub}</p>
            </div>
          </div>
        </button>
      ))}
    </>
  );
};
