import { imageAsset } from "src/helpers/functions";
import classes from "./Item.module.css";

export const Item = ({ data }: any) => {
  return (
    <div className="col-md-6 col-sm-6">
      <div className={classes.singleProcess}>
        <img
          className={classes.processIcon}
          src={imageAsset(`assets/images/${data.icon}`)}
          alt={data.title}
        />

        <h3 className={classes.processTitle}>{data.title}</h3>

        <p className={classes.processContent}>{data.subtitle}</p>
      </div>
    </div>
  );
};
//lang ok
