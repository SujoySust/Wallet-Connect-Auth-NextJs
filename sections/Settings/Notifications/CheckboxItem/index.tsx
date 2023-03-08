import classes from "./CheckboxItem.module.css";

export const CheckboxItem = ({
  id,
  value,
  onChange,
  title,
  subtitle,
  selected,
}: any) => {
  return (
    <li className={`${classes.listGroupItem}`}>
      <input
        type="checkbox"
        name={id}
        id={id}
        // defaultChecked={value}
        checked={value}
        onChange={onChange}
        className={classes.listGroupCheckbox}
      />

      <div className={classes.listGroupContent}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </li>
  );
};
//lang ok
